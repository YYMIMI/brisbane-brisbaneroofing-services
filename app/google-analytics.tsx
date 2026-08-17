"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const measurementId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "G-2FKG0LZ2V1";

export default function GoogleAnalytics() {
  useEffect(() => {
    if (!measurementId) return;

    function handleDocumentClick(event: MouseEvent) {
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>(
              'a[href^="tel:"], a[href^="mailto:"]',
            )
          : null;

      if (!target) return;

      const linkUrl = target.getAttribute("href") || "";

      if (linkUrl.startsWith("mailto:")) {
        window.gtag?.("event", "email_click", {
          link_type: "email",
          page_path: window.location.pathname,
          transport_type: "beacon",
        });
        return;
      }

      window.gtag?.("event", "click_to_call", {
        link_type: "phone",
        page_path: window.location.pathname,
        transport_type: "beacon",
      });
    }

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  if (!measurementId) return null;

  const initScript =
    "window.dataLayer = window.dataLayer || [];" +
    "window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};" +
    "window.gtag('js', new Date());" +
    "window.gtag('config', " +
    JSON.stringify(measurementId) +
    ");";

  return (
    <>
      <Script
        src={
          "https://www.googletagmanager.com/gtag/js?id=" +
          encodeURIComponent(measurementId)
        }
        strategy="afterInteractive"
      />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: initScript }}
      />
    </>
  );
}
