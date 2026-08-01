import type { Metadata } from "next";
import Link from "next/link";
import {
  navigationPageHeroImages,
  PageHero,
  PageShell,
  SectionHeading,
} from "../components";
import { business } from "../site-data";
import RequestBuilder from "./request-builder";

export const metadata: Metadata = {
  title: {
    absolute: "Contact Mel One Roof Repairs Brisbane | Request an Inspection",
  },
  alternates: {
    canonical: "/contact",
  },
  description:
    "Contact Mel One Maintenance about a Greater Brisbane roof leak, tile roof, metal roof, storm damage or inspection request.",
};

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="REQUEST A ROOF INSPECTION"
        title="Prepare the information a roof repair enquiry needs"
        description={`Call ${business.phone}, email ${business.email}, or send the secure online form below directly to the Mel One team.`}
        image={navigationPageHeroImages.contact}
      />
      <section className="section">
        <div className="shell contact-layout">
          <div>
            <SectionHeading
              eyebrow="REPAIR REQUEST"
              title="Tell us what you can see"
              copy="Send the details below directly to the team. Do not climb onto the roof for photos or measurements; ground-level exterior photos and internal signs are enough for the first conversation."
            />
            <div className="contact-points">
              <article>
                <span>01</span>
                <div>
                  <h2>Start with urgency</h2>
                  <p>Say whether water is entering now or the problem is planned.</p>
                </div>
              </article>
              <article>
                <span>02</span>
                <div>
                  <h2>Add the suburb and roof type</h2>
                  <p>Choose tile, metal or not sure. Guessing is not required.</p>
                </div>
              </article>
              <article>
                <span>03</span>
                <div>
                  <h2>Describe when it happens</h2>
                  <p>Heavy rain, wind direction and recurrence can help with triage.</p>
                </div>
              </article>
            </div>
            <div className="direct-contact-card">
              <p className="eyebrow eyebrow-dark">DIRECT CONTACT</p>
              <h2>{business.brandName}</h2>
              <a href={`tel:${business.phoneHref}`}>{business.phone}</a>
              <a href={`mailto:${business.email}`}>{business.email}</a>
              <p>
                {business.legalName}
                <br />
                ABN {business.abn} · ACN {business.acn}
                <br />
                {business.serviceArea}
              </p>
            </div>
          </div>
          <RequestBuilder />
        </div>
      </section>
      <section className="section section-pale" id="petrie-terrace-map">
        <div className="shell local-map-card">
          <div className="local-map-copy">
            <p className="eyebrow eyebrow-dark">LOCAL SERVICE AREA</p>
            <h2>Petrie Terrace and Greater Brisbane.</h2>
            <p>
              Petrie Terrace is a confirmed local service-area focus for Mel
              One roof repair enquiries. The business contact address published
              in our NAP remains {business.address.street},{" "}
              {business.address.locality} {business.address.region}{" "}
              {business.address.postcode}.
            </p>
            <p>
              Nearby inner-Brisbane enquiries include Brisbane City, Spring
              Hill, Paddington, Red Hill, Milton and Auchenflower. Wider
              coverage is listed on the{" "}
              <Link href="/service-areas">Brisbane service areas page</Link>.
            </p>
            <p className="local-map-links">
              Review{" "}
              <Link href="/services/roof-leak-repairs-brisbane">
                roof leak repairs
              </Link>
              ,{" "}
              <Link href="/services/tile-roof-repairs-brisbane">
                tile roof repairs
              </Link>{" "}
              or <Link href="/projects">real project photos</Link>.
            </p>
            <a
              className="button button-navy"
              href={business.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open Petrie Terrace in Google Maps
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="local-map-frame">
            <iframe
              src={business.googleMapsEmbedUrl}
              title="Google map showing Petrie Terrace, Queensland 4000"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
