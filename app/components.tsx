import { LocalizedLink as Link } from "@/components/Localized";
import { brandName, business, mainNav, services } from "./site-data";

export function SiteHeader({ goldCoast = false }: { goldCoast?: boolean } = {}) {
  const enquiryHref = goldCoast ? "#request-assessment" : "/contact";
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
            <small>{goldCoast ? "Roofing enquiries" : "Roof Repairs Brisbane"}</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="button button-yellow header-cta" href={enquiryHref}>
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
            <Link className="button button-yellow" href={enquiryHref}>
              Request inspection
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function SiteFooter({
  projectLinkLabel = "Roof project records",
  goldCoast = false,
}: {
  projectLinkLabel?: string;
  goldCoast?: boolean;
} = {}) {
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
              <small>{goldCoast ? "Roofing enquiries" : "Roof Repairs Brisbane"}</small>
            </span>
          </Link>
          {goldCoast ? <p>Gold Coast roof leak enquiries: tell us the suburb and roof problem. Service scope, safe access and availability are confirmed before booking.</p> : <p>
            Roof repair, restoration and gutter cleaning enquiries across
            Greater Brisbane, supported by real project case studies.
          </p>}
          <address className="footer-business">
            <strong>{business.legalName}</strong>
            <span>ABN {business.abn} · ACN {business.acn}</span>
            {goldCoast ? <span>Brisbane office</span> : null}
            <span>
              {business.address.street}, {business.address.locality}{" "}
              {business.address.region} {business.address.postcode}
            </span>
            <a href={`tel:${business.phoneHref}`}>{business.phone}</a>
            <a href={`mailto:${business.email}`}>{business.email}</a>
          </address>
        </div>

        <div>
          <h2>{goldCoast ? "Brisbane repair services" : "Repair services"}</h2>
          <ul>
            {services.map((service) => (
              <li key={service.path}>
                <Link href={service.path}>{service.navLabel}</Link>
              </li>
            ))}
            <li><Link href={goldCoast ? "/zh/services/roof-leak-repairs-gold-coast" : "/zh/brisbane-roof-repairs"} lang="zh-Hans-AU">中文</Link></li>
            <li><Link href="/services/roof-restoration-brisbane">Roof restoration</Link></li>
          </ul>
        </div>

        <div>
          <h2>Roof repairs and enquiries</h2>
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
              <Link href="/projects">{goldCoast ? "Brisbane roof project records" : projectLinkLabel}</Link>
            </li>
            <li>
              <Link href="/about">Service approach</Link>
            </li>
            <li>
              <Link href={goldCoast ? "#request-assessment" : "/contact"}>Prepare a repair request</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
            <li>
              <Link href={goldCoast ? "#how-it-works" : "/thank-you"}>What happens after an enquiry</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 {business.legalName}</span>
        {goldCoast ? <span>Gold Coast roofing enquiries · {business.contactName} · {business.phone}</span> : <span>On-site roof repairs across {business.serviceArea} · Call {business.contactName} on {business.phone}</span>}
      </div>
    </footer>
  );
}

export const navigationPageHeroImages = {
  services: {
    src: "/images/projects/terracotta-roof-overview-after-cleaning.webp", alt: "Wide view of cleaned terracotta roof tiles and ridge caps", width: 1600, height: 1200,
  },
  roofTypes: {
    src: "/images/projects/cleaned-terracotta-roof-work-detail.webp", alt: "Cleaned terracotta roof and metal junction with work materials nearby", width: 1200, height: 1600,
  },
  serviceAreas: {
    src: "/images/projects/terracotta-roof-planes-after-cleaning.webp", alt: "Cleaned terracotta roof planes and ridge lines", width: 1200, height: 1600,
  },
  projects: {
    src: "/images/projects/terracotta-roof-overview-after-cleaning.webp", alt: "Wide view of cleaned terracotta roof tiles and ridge caps", width: 1600, height: 1200,
  },
  about: {
    src: "/images/projects/terracotta-tile-flashing-junction-work.webp", alt: "Lifted terracotta tiles beside metal roof flashing during work", width: 900, height: 1600,
  },
  contact: {
    src: "/images/projects/terracotta-roof-junction-opened.webp", alt: "Open terracotta roof edge beside a dark metal roof junction", width: 1200, height: 1600,
  },
} as const;

export function PageHero({
  eyebrow,
  title,
  description,
  urgent = false,
  callLabel,
  requestLabel = "Request inspection",
  requestHref = "/contact",
  image,
}: {
  eyebrow: string;
  title: string;
  description: string;
  urgent?: boolean;
  callLabel?: string;
  requestLabel?: string;
  requestHref?: string;
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
              {callLabel ?? ["Call ", business.phone]}
            </a>
            <Link className="button button-outline-light" href={requestHref}>
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
  copy = "Not sure whether the roof needs repair or restoration? Call for a free quote.",
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

export function PageShell({
  children,
  projectLinkLabel,
  goldCoast = false,
}: {
  children: React.ReactNode;
  projectLinkLabel?: string;
  goldCoast?: boolean;
}) {
  return (
    <>
      <SiteHeader goldCoast={goldCoast} />
      <main id="main-content">{children}</main>
      <SiteFooter projectLinkLabel={projectLinkLabel} goldCoast={goldCoast} />
      <nav className="mobile-conversion-bar" aria-label="Quick contact">
        <a href={`tel:${business.phoneHref}`}>
          <span>Call now</span>
          <strong>{business.phone}</strong>
        </a>
        <Link href={goldCoast ? "#request-assessment" : "/contact"}>Request inspection</Link>
      </nav>
    </>
  );
}

