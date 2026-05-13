import { NextRequest, NextResponse } from "next/server";
import { leadPayloadSchema } from "@/lib/validation";
import { sendMetaConversionLead } from "@/lib/meta-capi";

export async function POST(req: NextRequest) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = leadPayloadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const data = parsed.data;
  const webhookUrl = process.env.WEBHOOK_URL;

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      return NextResponse.json(
        { error: "Webhook delivery failed" },
        { status: 502 }
      );
    }
  }

  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim();
  const ua = req.headers.get("user-agent") ?? undefined;

  await sendMetaConversionLead({
    event_id: data.event_id,
    email: data.email,
    phone: data.telephone,
    first_name: data.prenom,
    last_name: data.nom,
    client_ip_address: ip,
    client_user_agent: ua,
  });

  return NextResponse.json({ success: true });
}
