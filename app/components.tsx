import Link from "next/link";
import { brandName, business, mainNav, services } from "./site-data";

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="shell nav-shell">
        <Link className="wordmark" href="/" aria-label={`${brandName} home`}>
          <span className="wordmark-mark wordmark-logo" aria-hidden="true">
            <img
              src={business.logo}
              alt="Mel One Maintenance roof repair logo"
              width="48"
              height="48"
            />
          </span>
          <span className="wordmark-copy">
            <strong>{business.brandName}</strong>
            <small>Roof Repairs Brisbane</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="button button-yellow header-cta" href="/contact">
          Request inspection
        </Link>

        <details className="mobile-menu">
          <summary aria-label="Open navigation">
            <span />
            <span />
            <span />
          </summary>
          <nav aria-label="Mobile navigation">
            {mainNav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link className="button button-yellow" href="/contact">
              Request inspection
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Link className="wordmark" href="/">
            <span className="wordmark-mark wordmark-logo" aria-hidden="true">
              <img
                src={business.logo}
                alt="Mel One Maintenance roof repair logo"
                width="48"
                height="48"
              />
            </span>
            <span className="wordmark-copy">
              <strong>{business.brandName}</strong>
              <small>Roof Repairs Brisbane</small>
            </span>
          </Link>
          <p>
            Roof repair, restoration and gutter cleaning enquiries across
            Greater Brisbane, supported by original project photography.
          </p>
          <address className="footer-business">
            <strong>{business.legalName}</strong>
            <span>ABN {business.abn} · ACN {business.acn}</span>
            <span>
              {business.address.street}, {business.address.locality}{" "}
              {business.address.region} {business.address.postcode}
            </span>
            <a href={`tel:${business.phoneHref}`}>{business.phone}</a>
            <a href={`mailto:${business.email}`}>{business.email}</a>
          </address>
        </div>

        <div>
          <h2>Repair services</h2>
          <ul>
            {services.map((service) => (
              <li key={service.path}>
                <Link href={service.path}>{service.navLabel}</Link>
              </li>
            ))}
            <li><Link href="/zh/brisbane-roof-repairs" lang="zh-Hans-AU">布里斯班屋顶维修中文服务</Link></li>
            <li><Link href="/zh/brisbane-roof-restoration" lang="zh-Hans-AU">布里斯班屋顶翻新中文服务</Link></li>
          </ul>
        </div>

        <div>
          <h2>Plan your next step</h2>
          <ul>
            <li>
              <Link href="/service-areas">Brisbane service areas</Link>
            </li>
            <li>
              <Link href="/service-areas#petrie-terrace">
                Petrie Terrace roof repairs
              </Link>
            </li>
            <li>
              <Link href="/projects">Roof project records</Link>
            </li>
            <li>
              <Link href="/about">Service approach</Link>
            </li>
            <li>
              <Link href="/contact">Prepare a repair request</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 {business.legalName}</span>
        <span>{business.serviceArea}, Queensland</span>
      </div>
    </footer>
  );
}

export const navigationPageHeroImages = {
  services: {
    src: "/images/brisbane-roof-repair-services-hero.webp",
    alt: "Representative Brisbane roof leak inspection at a tiled roof valley",
    width: 1672,
    height: 941,
  },
  roofTypes: {
    src: "/images/brisbane-tile-metal-roof-types-hero.webp",
    alt: "Representative Brisbane inspection of tile and metal roof types",
    width: 1672,
    height: 941,
  },
  serviceAreas: {
    src: "/images/brisbane-roof-repair-service-areas-hero.webp",
    alt: "Representative Brisbane roof inspection across local tile and metal roofing",
    width: 1672,
    height: 941,
  },
  projects: {
    src: "/images/brisbane-roof-repair-projects-hero.webp",
    alt: "Representative final inspection of completed Brisbane roof repair work",
    width: 1672,
    height: 941,
  },
  about: {
    src: "/images/brisbane-roof-repair-team-hero.webp",
    alt: "Representative Brisbane roofing team preparing a roof assessment",
    width: 1672,
    height: 941,
  },
  contact: {
    src: "/images/brisbane-roof-inspection-contact-hero.webp",
    alt: "Representative Brisbane roof technician preparing an inspection enquiry",
    width: 1672,
    height: 941,
  },
} as const;

export function PageHero({
  eyebrow,
  title,
  description,
  urgent = false,
  requestLabel = "Request inspection",
  image,
}: {
  eyebrow: string;
  title: string;
  description: string;
  urgent?: boolean;
  requestLabel?: string;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}) {
  return (
    <section
      className={`page-hero ${urgent ? "page-hero-urgent" : ""} ${
        image ? "page-hero-with-image" : ""
      }`}
    >
      {image ? (
        <div className="page-hero-media">
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="eager"
            fetchPriority="high"
          />
        </div>
      ) : null}
      <div className="shell page-hero-inner">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="page-hero-copy">{description}</p>
          <div className="hero-actions">
            <a
              className={`button ${urgent ? "button-yellow" : "button-light"}`}
              href={`tel:${business.phoneHref}`}
            >
              Call {business.phone}
            </a>
            <Link className="button button-outline-light" href="/contact">
              {requestLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow eyebrow-dark">{eyebrow}</p>
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </div>
  );
}

export function CtaBand({
  eyebrow = "REQUEST A ROOF INSPECTION",
  title = "Start with the roof problem you can see",
  copy = "Mel One provides on-site roof services across the relevant Greater Brisbane service area. Initial phone and online form enquiries are free, and the phone is answered seven days a week, including Saturday and Sunday, and the team responds promptly. Share your suburb, roof type, urgency and safe photos so the team can confirm attendance, available timing, the work scope and the next quote step.",
}: {
  eyebrow?: string;
  title?: string;
  copy?: string;
}) {
  return (
    <section className="cta-band">
      <div className="shell cta-band-inner">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{copy}</p>
        </div>
        <Link className="button button-yellow" href="/contact">
          Prepare your request
        </Link>
      </div>
    </section>
  );
}

export function FaqList({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <div className="faq-list">
      {items.map((item) => (
        <details key={item.question}>
          <summary>
            <span>{item.question}</span>
            <span aria-hidden="true">+</span>
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
      <nav className="mobile-conversion-bar" aria-label="Quick contact">
        <a href={`tel:${business.phoneHref}`}>
          <span>Call now</span>
          <strong>{business.phone}</strong>
        </a>
        <Link href="/contact">Request inspection</Link>
      </nav>
    </>
  );
}
