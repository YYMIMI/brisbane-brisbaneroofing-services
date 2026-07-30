import type { Metadata } from "next";
import Link from "next/link";
import {
  CtaBand,
  FaqList,
  JsonLd,
  PageShell,
  SectionHeading,
} from "./components";
import {
  brandName,
  business,
  projectCases,
  serviceRegions,
  services,
} from "./site-data";

export const metadata: Metadata = {
  title: {
    absolute: "Roof Repairs Brisbane | Leaks, Tile & Metal Roofs | Mel One",
  },
  alternates: {
    canonical: "/",
  },
  description:
    "Roof repairs and gutter cleaning across Greater Brisbane for leaks, blocked gutters, damaged tiles, metal roofing and storm damage. View real project photos.",
};

const homeFaqs = [
  {
    question: "What roof problems can I ask about?",
    answer:
      "You can prepare an enquiry for roof leaks, blocked gutters, cracked or missing tiles, loose ridge capping, metal roof fasteners and flashing, localised corrosion, and storm-related damage. The exact work scope must be confirmed after assessment.",
  },
  {
    question: "Do you cover Brisbane Northside and Southside?",
    answer:
      "Mel One Maintenance accepts enquiries across Greater Brisbane, including Northside, Southside, western and eastern/bayside areas. Attendance is confirmed by suburb after checking the service type, access, weather and crew availability.",
  },
  {
    question: "Can I request urgent roof leak help?",
    answer:
      "Yes. Use the urgent-request pathway for active water entry or recent storm damage. No fixed 24/7 availability or arrival-time claim is made until operating hours are verified.",
  },
  {
    question: "What should I include with my roof repair request?",
    answer:
      "Include your suburb, roof material if known, when the problem appears, whether water is entering now, and photos taken safely from ground level or indoors.",
  },
];

const issueCards = [
  {
    number: "01",
    title: "Water entering after rain",
    copy: "Start with when the leak appears, where the stain is located and whether wind direction changes it.",
    href: "/services/roof-leak-repairs-brisbane",
    link: "Explore roof leak repair",
  },
  {
    number: "02",
    title: "Cracked or missing tiles",
    copy: "Check the tile profile, surrounding roof condition, ridge capping, valleys and flashing before defining the repair.",
    href: "/services/tile-roof-repairs-brisbane",
    link: "Explore tile roof repair",
  },
  {
    number: "03",
    title: "Metal roof leaks or rust",
    copy: "Fasteners, sheet laps, penetrations, flashing and local corrosion are common investigation points.",
    href: "/services/metal-roof-repairs-brisbane",
    link: "Explore metal roof repair",
  },
  {
    number: "04",
    title: "Damage after a storm",
    copy: "Protect people first, document visible changes safely and separate urgent weatherproofing from permanent work.",
    href: "/services/storm-damage-roof-repairs-brisbane",
    link: "Explore storm damage help",
  },
];

export default function Home() {
  const featuredProject = projectCases[0];

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brandName,
    inLanguage: "en-AU",
    description:
      "A focused Brisbane roof repair and gutter cleaning website for leaks, blocked gutters, tile and metal roof problems, inspections and storm damage.",
    publisher: {
      "@id": "#mel-one-property-maintenance",
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Roof repairs in Brisbane",
    serviceType: "Roof repair",
    areaServed: {
      "@type": "City",
      name: "Brisbane",
    },
    provider: {
      "@type": "Organization",
      "@id": "#mel-one-property-maintenance",
      name: business.brandName,
      legalName: business.legalName,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Brisbane roof repair services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
        },
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <PageShell>
      <JsonLd data={websiteSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />

      <section className="home-hero">
        <div className="shell home-hero-inner">
          <div className="home-hero-copy">
            <p className="eyebrow">ROOF REPAIRS • GREATER BRISBANE</p>
            <h1>Roof repairs that start with the real problem.</h1>
            <p className="hero-lead">
              Help for roof leaks, cracked tiles, metal roof damage and
              storm-related problems—with original project photography,
              practical next steps and a scope based on the roof in front of us.
            </p>
            <ul className="hero-proof-list" aria-label="Service proof points">
              <li>Original project photos</li>
              <li>Greater Brisbane enquiries</li>
              <li>Tile and metal roof pathways</li>
            </ul>
            <div className="hero-actions">
              <a className="button button-yellow" href={`tel:${business.phoneHref}`}>
                Call {business.phone}
              </a>
              <Link className="button button-light" href="/contact">
                Request a roof inspection
              </Link>
            </div>
            <Link
              className="hero-urgent-link"
              href="/services/emergency-roof-repairs-brisbane"
            >
              Active leak or storm damage? View urgent roof steps
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <figure className="home-hero-project">
            <img
              src={featuredProject.coverImage}
              alt={featuredProject.coverAlt}
              width="1080"
              height="811"
            />
            <figcaption>
              <span>ORIGINAL MEL ONE PROJECT</span>
              <strong>Concrete tile roof restoration</strong>
              <small>Completed project • Greater Brisbane</small>
              <Link href={`/projects#${featuredProject.slug}`}>
                View project evidence
                <span aria-hidden="true">→</span>
              </Link>
            </figcaption>
          </figure>
        </div>
        <div className="intent-strip" aria-label="Main roof repair categories">
          <div className="shell">
            <Link href="/services/roof-leak-repairs-brisbane">Roof leaks</Link>
            <span aria-hidden="true">•</span>
            <Link href="/services/gutter-cleaning-brisbane">
              Gutter cleaning
            </Link>
            <span aria-hidden="true">•</span>
            <Link href="/services/tile-roof-repairs-brisbane">Tile roofs</Link>
            <span aria-hidden="true">•</span>
            <Link href="/services/metal-roof-repairs-brisbane">
              Metal roofs
            </Link>
            <span aria-hidden="true">•</span>
            <Link href="/services/storm-damage-roof-repairs-brisbane">
              Storm damage
            </Link>
          </div>
        </div>
      </section>

      <section className="business-trust-strip" aria-label="Verified business details">
        <div className="shell business-trust-inner">
          <img
            src={business.logo}
            alt="Mel One Maintenance roof repair logo"
            width="96"
            height="96"
          />
          <div>
            <strong>{business.brandName}</strong>
            <span>{business.legalName}</span>
          </div>
          <div>
            <small>Business registration</small>
            <strong>ABN {business.abn}</strong>
            <span>ACN {business.acn}</span>
          </div>
          <div>
            <small>Service area</small>
            <strong>{business.serviceArea}</strong>
            <a href={`tel:${business.phoneHref}`}>{business.phone}</a>
          </div>
        </div>
      </section>

      <section className="section section-light" id="services">
        <div className="shell">
          <SectionHeading
            eyebrow="START WITH THE SYMPTOM"
            title="What is happening with your roof?"
            copy="These pages match the way Brisbane homeowners search: by the visible problem, urgency, roof material and the decision they need to make."
          />
          <div className="issue-grid">
            {issueCards.map((item) => (
              <article className="issue-card" key={item.title}>
                <span className="card-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <Link href={item.href}>
                  {item.link}
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-navy">
        <div className="shell split-section">
          <div>
            <p className="eyebrow">ACTIVE LEAK OR RECENT STORM DAMAGE?</p>
            <h2>Make the situation safe before thinking about the repair.</h2>
          </div>
          <div className="urgent-copy">
            <p>
              Stay off wet or damaged roofing. Keep people away from sagging
              ceilings, loose materials and affected electrical equipment.
              Follow official Queensland safety advice when severe weather is
              active.
            </p>
            <div className="inline-actions">
              <Link
                className="button button-yellow"
                href="/services/emergency-roof-repairs-brisbane"
              >
                View urgent roof steps
              </Link>
              <a
                className="text-link text-link-light"
                href="https://www.electricalsafety.qld.gov.au/electrical-safety-home/electrical-safety-during-storms"
                target="_blank"
                rel="noreferrer"
              >
                Queensland electrical safety
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="SERVICE INTENT"
            title="One useful page for each roof repair decision"
            copy="Each service page adds its own Brisbane problems, work stages, indicative timing, quote factors, FAQs and team capability instead of repeating the same template copy."
          />
          <div className="service-list">
            {services.map((service, index) => (
              <Link className="service-row" href={service.path} key={service.path}>
                <span className="service-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <strong>{service.title}</strong>
                  <small>{service.description}</small>
                </span>
                <span className="service-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section section-project-feature"
        id="real-project"
      >
        <div className="shell featured-project">
          <div className="project-compare" aria-label="Real roof project before and after">
            {featuredProject.images.slice(0, 2).map((image) => (
              <figure key={image.src}>
                <div className="project-image-wrap">
                  <img
                    src={image.src}
                    alt={image.alt}
                    width="1080"
                    height="811"
                    loading="lazy"
                  />
                  <span>{image.stage}</span>
                </div>
                <figcaption>{image.caption}</figcaption>
              </figure>
            ))}
          </div>
          <div className="featured-project-copy">
            <p className="eyebrow eyebrow-dark">{featuredProject.eyebrow}</p>
            <h2>{featuredProject.title}</h2>
            <p className="lead-copy">{featuredProject.summary}</p>
            <dl className="project-facts">
              <div>
                <dt>Roof type</dt>
                <dd>{featuredProject.roofType}</dd>
              </div>
              <div>
                <dt>Evidence</dt>
                <dd>Original before and after photos</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{featuredProject.location}</dd>
              </div>
            </dl>
            <Link className="button button-dark" href="/projects">
              View the complete project
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-pale">
        <div className="shell area-layout">
          <SectionHeading
            eyebrow="BRISBANE SERVICE AREAS"
            title="Petrie Terrace and Greater Brisbane"
            copy="Petrie Terrace is a confirmed local service-area focus. Mel One also accepts enquiries across Greater Brisbane, with attendance confirmed by service type, access, weather and team availability."
          />
          <div className="region-grid">
            {serviceRegions.map((region) => (
              <article key={region.name}>
                <h3>{region.name}</h3>
                <p>{region.suburbs.join(" • ")}</p>
              </article>
            ))}
          </div>
          <Link className="text-link" href="/service-areas">
            View confirmed Brisbane service areas
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="A CLEAR REPAIR PATH"
            title="From symptom to defined scope"
          />
          <ol className="process-grid">
            <li>
              <span>01</span>
              <h3>Describe the issue</h3>
              <p>
                Share the suburb, roof type, when the issue appears and whether
                water is entering now.
              </p>
            </li>
            <li>
              <span>02</span>
              <h3>Add safe photos</h3>
              <p>
                Ground-level exterior photos and internal stains can help
                prepare the right next step.
              </p>
            </li>
            <li>
              <span>03</span>
              <h3>Assess the cause</h3>
              <p>
                Separate the visible symptom from the likely roof detail or
                water path causing it.
              </p>
            </li>
            <li>
              <span>04</span>
              <h3>Confirm the scope</h3>
              <p>
                Review what needs attention now, what can wait and which
                licensed trade scope applies.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section className="section section-faq">
        <div className="shell faq-layout">
          <SectionHeading
            eyebrow="BRISBANE ROOF REPAIR FAQ"
            title="Useful answers before you request an inspection"
          />
          <FaqList items={homeFaqs} />
        </div>
      </section>

      <CtaBand />
    </PageShell>
  );
}
