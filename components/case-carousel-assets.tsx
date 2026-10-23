"use client";
import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global { interface Window { PortfolioCaseCarousel?: { init(root?: Document): void } } }

export function CaseCarouselAssets() {
 const pathname = usePathname();
 useEffect(() => { window.PortfolioCaseCarousel?.init(document); }, [pathname]);
 return <Script src="/case-carousel/case-carousel.js" strategy="afterInteractive" onLoad={() => window.PortfolioCaseCarousel?.init(document)} />;
}
