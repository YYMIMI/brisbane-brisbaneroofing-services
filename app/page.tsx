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
    languages: {
      "en-AU": "/",
      "zh-Hans-AU": "/zh/brisbane-roof-repairs",
      "x-default": "/",
    },
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
      "Mel One Maintenance accepts enquiries across Greater Brisbane, including suburbs such as Ashgrove, Chermside, Coorparoo, Carindale, Indooroopilly, Wynnum and Manly. Attendance is confirmed after checking the service type, access, weather and crew availability.",
  },
  {
    question: "Can I request urgent roof leak help?",
    answer:
      "Yes. The emergency roof line is open 24 hours a day. The team responds within minutes and can attend within two hours across the Brisbane service area.",
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
    url: business.siteUrl,
    publisher: {
      "@id": `${business.siteUrl}/#organization`,
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
      "@id": `${business.siteUrl}/#organization`,
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
            <h1>Roof repairs in Brisbane that start with the real problem.</h1>
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
              fetchPriority="high"
            />
            <figcaption>
              <span>ORIGINAL MEL ONE PROJECT</span>
              <strong>Concrete tile roof restoration</strong>
              <small>Completed project • Greater Brisbane</small>
              <Link href={`/projects#${featuredProject.slug}`}>
                View project photos
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
            <Link href="/services/roof-restoration-brisbane">
              Tile roof restoration
            </Link>
            <span aria-hidden="true">•</span>
            <Link href="/services/tile-roof-repairs-brisbane">Tile roof repairs</Link>
            <span aria-hidden="true">•</span>
            <Link href="/services/metal-roof-repairs-brisbane">
              Metal roofs
            </Link>
            <span aria-hidden="true">•</span>
            <Link href="/services/storm-damage-roof-repairs-brisbane">
              Storm damage
            </Link>
            <span aria-hidden="true">•</span>
            <Link href="/zh/brisbane-roof-repairs" lang="zh-Hans-AU">
              中文屋顶维修
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
            <span>Eligible work · 10-year workmanship warranty</span>
            <a href={`tel:${business.phoneHref}`}>{business.phone}</a>
          </div>
        </div>
      </section>

      <section className="section section-light" id="services">
        <div className="shell">
          <SectionHeading
            eyebrow="START WITH THE SYMPTOM"
            title="What is happening with your roof?"
            copy="Choose the closest visible problem, or start with a roof inspection when the cause is not clear."
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
              Call the 24-hour emergency line for a response within minutes and
              attendance within two hours across the Brisbane service area.
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

      <section className="section section-pale">
        <div className="shell service-planning-layout">
          <div>
            <SectionHeading
              eyebrow="PLANNING A BRISBANE ROOF REPAIR"
              title="Indicative timing follows the actual roof condition"
              copy="A contained repair may take several hours or one working day. Multi-area repairs or restoration work usually require more time, suitable weather and confirmed material availability."
            />
            <ol className="timeline-list">
              <li>
                <span>01</span>
                <div>
                  <h3>Photo and symptom review</h3>
                  <strong>Before attendance</strong>
                  <p>
                    The suburb, roof type, leak timing and safe photos help
                    prepare the right inspection pathway.
                  </p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>On-roof assessment</h3>
                  <strong>One scheduled visit where safe</strong>
                  <p>
                    Weather, access and the surrounding roof condition
                    determine whether the likely cause can be confirmed.
                  </p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>Defined repair or restoration scope</h3>
                  <strong>Confirmed after assessment</strong>
                  <p>
                    Local repairs, temporary protection and broader restoration
                    are priced and scheduled as separate scopes.
                  </p>
                </div>
              </li>
            </ol>
          </div>
          <aside className="quote-factors-card">
            <p className="eyebrow eyebrow-dark">WHAT AFFECTS THE QUOTE</p>
            <h2>Why two Brisbane roof repairs can cost differently</h2>
            <ul className="check-list">
              <li>Tile, metal or mixed roof construction</li>
              <li>Roof height, pitch, access and required safety controls</li>
              <li>Local damage versus defects across several roof sections</li>
              <li>Valleys, flashing, flues, vents and solar arrays</li>
              <li>Material matching and temporary weather protection</li>
            </ul>
            <p className="quote-note">
              Mel One confirms the repair scope before giving a
              project-specific price. Photos help prepare the visit but do not
              replace safe access when the cause is hidden.
            </p>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="BRISBANE ROOF SERVICES"
            title="A clear next step for each roof problem"
            copy="Review the service that matches the leak, roof material, storm damage, blocked gutter or restoration decision you are dealing with."
          />
          <p className="service-area-link">
            A cracked or missing tile, a local ridge-capping defect or a nearby flashing issue
            belongs with <Link href="/services/tile-roof-repairs-brisbane">Tile Roof Repairs</Link>.
            Preparation, repairs and a new finish across broader weathered tile-roof areas belongs
            with <Link href="/services/roof-restoration-brisbane">Tile Roof Restoration</Link>.
          </p>
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
                <dt>Project photos</dt>
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
                <ul className="suburb-list">
                  {region.suburbs.map((suburb) => (
                    <li key={suburb}>{suburb}</li>
                  ))}
                </ul>
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

