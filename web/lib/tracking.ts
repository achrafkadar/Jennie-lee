"use client";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function generateEventId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export function pushDataLayer(data: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}

export function trackPageView() {
  pushDataLayer({
    event: "page_view",
    page_path: window.location.pathname,
    page_url: window.location.href,
  });
}

export function trackViewContent() {
  pushDataLayer({ event: "view_content", content_name: "landing_scroll_50" });
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "ViewContent", {
      content_name: "scroll_50_percent",
    });
  }
}

export function trackLead(payload: {
  event_id: string;
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
}) {
  pushDataLayer({
    event: "generate_lead",
    event_id: payload.event_id,
    lead_source: "meta_google_landing",
  });
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq(
      "track",
      "Lead",
      {
        content_name: "estimation_form",
      },
      { eventID: payload.event_id }
    );
  }
  if (typeof window !== "undefined" && window.gtag) {
    const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
    const conv = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
    if (adsId && conv) {
      window.gtag("event", "conversion", {
        send_to: `${adsId}/${conv}`,
        transaction_id: payload.event_id,
      });
    }
    window.gtag("event", "generate_lead", {
      event_id: payload.event_id,
    });
  }
}
