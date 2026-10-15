"use client";
import { useEffect } from "react";

// Own an empty server/client mount, separate from any pending route hydration.
export function ServiceQaAssets() {
  useEffect(() => {
    if (!document.querySelector('link[data-service-qa-style]')) {
      const stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = "/service-qa/20261014-1/widget.css";
      stylesheet.dataset.serviceQaStyle = "";
      document.head.appendChild(stylesheet);
    }
    if (!document.querySelector('script[data-service-qa]')) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "/service-qa/20261014-1/widget.js";
      script.dataset.serviceQa = "";
      script.dataset.siteOrigin = "https://www.melonebrisbaneroofing.com.au";
      script.dataset.contactEn = "/contact";
      script.dataset.contactZh = "/zh/contact";
      document.body.appendChild(script);
    }
  }, []);
  return <div data-service-qa-mount="" style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem" }} />;
}
