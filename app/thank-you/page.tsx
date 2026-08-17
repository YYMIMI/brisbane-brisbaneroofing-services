import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "../components";
import { business } from "../site-data";

export const metadata: Metadata = {
  title: { absolute: "Thank You | Mel One Roof Repairs Brisbane" },
  description: "Your Brisbane roofing enquiry has been sent.",
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <PageShell>
      <section style={{ position: "relative", minHeight: 360, display: "grid", placeItems: "center", overflow: "hidden" }}>
        <img src="/images/brisbane-roof-repair-hero.webp" alt="" aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(7, 26, 43, 0.82)" }} />
        <div style={{ position: "relative", padding: 24, textAlign: "center", color: "white" }}>
          <p className="eyebrow">ENQUIRY SENT</p>
          <h1 style={{ marginTop: 16, fontSize: "clamp(3rem, 8vw, 5rem)" }}>Thank you</h1>
        </div>
      </section>
      <section className="section">
        <div className="shell" style={{ maxWidth: 860 }}>
          <h2>Thanks for contacting {business.brandName}.</h2>
          <p>Your enquiry has been submitted successfully. Our team will review the information and use the details you provided to discuss the appropriate next step.</p>
          <p>Thank you for considering our Brisbane roof repair services.</p>
          <Link href="/" className="button button-yellow">Return to home</Link>
        </div>
      </section>
    </PageShell>
  );
}
