"use client";

import { useEffect, useRef } from "react";
import { trackPageView, trackViewContent } from "@/lib/tracking";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function AnalyticsProvider() {
  const viewContentSent = useRef(false);

  useEffect(() => {
    trackPageView();
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_path: window.location.pathname,
        page_location: window.location.href,
      });
    }

    const onScroll = () => {
      if (viewContentSent.current) return;
      const doc = document.documentElement;
      const scrolled =
        ((doc.scrollTop + doc.clientHeight) / doc.scrollHeight) * 100;
      if (scrolled >= 50) {
        viewContentSent.current = true;
        trackViewContent();
        window.removeEventListener("scroll", onScroll, { capture: true } as AddEventListenerOptions);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll, true);
  }, []);

  return null;
}
