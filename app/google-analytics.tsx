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
const attributionKey = "mle_one_attribution_v1";

export type LeadAttribution = {
  hostname: string;
  landing_page: string;
  source: string;
  medium: string;
};

function safeCampaignValue(value: string | null) {
  return (value || "").trim().slice(0, 80).replace(/[^A-Za-z0-9._~-]+/g, "_");
}

export function getLeadAttribution(): LeadAttribution {
  if (typeof window === "undefined") {
    return { hostname: "", landing_page: "", source: "direct", medium: "none" };
  }
  try {
    const stored = window.sessionStorage.getItem(attributionKey);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<LeadAttribution>;
      if (parsed.hostname && parsed.landing_page && parsed.source && parsed.medium) {
        return parsed as LeadAttribution;
      }
    }
  } catch {
    // Attribution must never interrupt navigation or form delivery.
  }
  const params = new URLSearchParams(window.location.search);
  let referrerHostname = "";
  try {
    referrerHostname = document.referrer ? new URL(document.referrer).hostname : "";
  } catch {
    referrerHostname = "";
  }
  const externalReferrer = referrerHostname && referrerHostname !== window.location.hostname;
  const attribution: LeadAttribution = {
    hostname: window.location.hostname,
    landing_page: window.location.pathname,
    source: safeCampaignValue(params.get("utm_source")) || (externalReferrer ? referrerHostname : "direct"),
    medium: safeCampaignValue(params.get("utm_medium")) || (externalReferrer ? "referral" : "none"),
  };
  try {
    window.sessionStorage.setItem(attributionKey, JSON.stringify(attribution));
  } catch {
    // Use current-page attribution if browser storage is unavailable.
  }
  return attribution;
}

export default function GoogleAnalytics() {
  useEffect(() => {
    if (!measurementId) return;
    getLeadAttribution();

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
          ...getLeadAttribution(),
          transport_type: "beacon",
        });
        return;
      }

      window.gtag?.("event", "click_to_call", {
        link_type: "phone",
        page_path: window.location.pathname,
        ...getLeadAttribution(),
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

