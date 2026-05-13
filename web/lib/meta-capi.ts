import { createHash } from "crypto";

function hashUserData(value: string): string {
  const normalized = value.trim().toLowerCase();
  return createHash("sha256").update(normalized).digest("hex");
}

export interface MetaCapiLeadInput {
  event_id: string;
  event_time?: number;
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  client_ip_address?: string;
  client_user_agent?: string;
  fbc?: string;
  fbp?: string;
}

export async function sendMetaConversionLead(
  input: MetaCapiLeadInput
): Promise<{ ok: boolean; skipped?: boolean; error?: string }> {
  const pixelId =
    process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    return { ok: true, skipped: true };
  }

  const user_data: Record<string, string | string[]> = {};
  if (input.email) user_data.em = [hashUserData(input.email)];
  if (input.phone) {
    const digits = input.phone.replace(/\D/g, "");
    if (digits.length >= 10) {
      user_data.ph = [hashUserData(digits.slice(-10))];
    }
  }
  if (input.first_name) user_data.fn = [hashUserData(input.first_name)];
  if (input.last_name) user_data.ln = [hashUserData(input.last_name)];
  if (input.client_ip_address) {
    user_data.client_ip_address = input.client_ip_address;
  }
  if (input.client_user_agent) {
    user_data.client_user_agent = input.client_user_agent;
  }
  if (input.fbc) user_data.fbc = input.fbc;
  if (input.fbp) user_data.fbp = input.fbp;

  const body = {
    data: [
      {
        event_name: "Lead",
        event_time: input.event_time ?? Math.floor(Date.now() / 1000),
        event_id: input.event_id,
        action_source: "website",
        user_data,
      },
    ],
    access_token: accessToken,
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${pixelId}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    if (!res.ok) {
      const text = await res.text();
      return { ok: false, error: text };
    }
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Meta CAPI error",
    };
  }
}
