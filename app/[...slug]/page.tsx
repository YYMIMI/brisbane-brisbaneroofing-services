import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CtaBand,
  FaqList,
  JsonLd,
  PageHero,
  PageShell,
  SectionHeading,
} from "../components";
import {
  business,
  getServiceByPath,
  projectCases,
  serviceContextBySlug,
  serviceRegions,
  services,
} from "../site-data";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

const staticPages = [
  "services",
  "roof-types",
  "service-areas",
  "projects",
  "about",
  "privacy",
];

export function generateStaticParams() {
  return [
    ...staticPages.map((slug) => ({ slug: [slug] })),
    ...services.map((service) => ({
      slug: service.path.split("/").filter(Boolean),
    })),
  ];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const path = `/${slug.join("/")}`;
  const service = getServiceByPath(path);

  if (service) {
    return {
      title: { absolute: service.metaTitle },
      description: service.metaDescription,
      alternates: {
        canonical: path,
      },
    };
  }

  const metadataByPage: Record<string, Metadata> = {
    "/services": {
      title: "Brisbane Roof Repair Services",
      description:
        "Choose the Brisbane service page that matches your problem: roof leaks, blocked gutters, tile or metal roof damage, storm damage, urgent repairs or inspections.",
    },
    "/roof-types": {
      title: "Tile & Metal Roof Repairs Brisbane",
      description:
        "Understand how Brisbane tile roof and metal roof repair enquiries differ, including common symptoms and assessment points.",
    },
    "/service-areas": {
      title: "Petrie Terrace & Brisbane Roof Repair Areas",
      description:
        "Petrie Terrace is a confirmed Mel One roof repair service-area focus, with wider Greater Brisbane attendance confirmed by suburb and job requirements.",
    },
    "/projects": {
      title: "Brisbane Roof Repair Projects",
      description:
        "View original Brisbane project photography including tile roof restoration, flue penetration investigation and gutter cleaning in progress.",
    },
    "/about": {
      title: "About Mel One Roof Repairs Brisbane",
      description:
        "Mel One Maintenance is the service brand of Mel One Property Maintenance Pty Ltd, accepting roof repair enquiries across Greater Brisbane.",
    },
    "/privacy": {
      title: "Privacy | Mel One Maintenance",
      description:
        "Privacy information for Mel One Maintenance roof repair enquiries in Greater Brisbane.",
      robots: { index: true, follow: true },
    },
  };

  const pageMetadata = metadataByPage[path] ?? {};

  return {
    ...pageMetadata,
    alternates: {
      canonical: path,
    },
  };
}

function ServiceDetailPage({
  service,
}: {
  service: NonNullable<ReturnType<typeof getServiceByPath>>;
}) {
  const isUrgent = service.slug === "emergency-roof-repairs-brisbane";
  const isGutterCleaning = service.slug === "gutter-cleaning-brisbane";
  const serviceContext = serviceContextBySlug[service.slug];
  const related = services
    .filter((item) => item.path !== service.path)
    .slice(isUrgent ? 0 : 1, isUrgent ? 3 : 4);
  const matchingProjects =
    service.slug === "roof-repairs-brisbane"
      ? projectCases
      : service.slug === "tile-roof-repairs-brisbane"
        ? [projectCases[0], projectCases[1]]
        : service.slug === "roof-leak-repairs-brisbane"
          ? [projectCases[1], projectCases[2]]
          : service.slug === "gutter-cleaning-brisbane"
            ? [projectCases[2]]
            : [];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.navLabel,
    description: service.description,
    areaServed: {
      "@type": "AdministrativeArea",
      name: business.serviceArea,
    },
    provider: {
      "@type": "Organization",
      "@id": "#mel-one-property-maintenance",
      name: business.brandName,
      legalName: business.legalName,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((item) => ({
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
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <PageHero
        eyebrow={service.eyebrow}
        title={service.title}
        description={service.description}
        urgent={isUrgent}
        requestLabel={
          isGutterCleaning ? "Request gutter cleaning" : "Request inspection"
        }
      />

      <section className="section">
        <div className="shell narrow-intro">
          <p className="lead-copy">{service.intro}</p>
        </div>
      </section>

      <section className="service-local-band">
        <div className="shell service-local-layout">
          <div>
            <p className="eyebrow">GREATER BRISBANE CONTEXT</p>
            <h2>How this service connects to local roof problems</h2>
            <p>{serviceContext.brisbaneContext}</p>
            <p className="service-area-inline-link">
              Serving Petrie Terrace and Greater Brisbane.{" "}
              <Link href="/service-areas#petrie-terrace">
                View the confirmed service-area details →
              </Link>
            </p>
          </div>
          <div className="local-problem-card">
            <p className="eyebrow eyebrow-dark">COMMON LOCAL CALL-OUTS</p>
            <ul className="check-list">
              {serviceContext.localProblems.map((problem) => (
                <li key={problem}>{problem}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-pale section-tight-top">
        <div className="shell two-column-content">
          <div>
            <SectionHeading
              eyebrow="COMMON SIGNS"
              title="When this page matches your problem"
            />
            <ul className="check-list">
              {service.symptoms.map((symptom) => (
                <li key={symptom}>{symptom}</li>
              ))}
            </ul>
          </div>
          <div className="assessment-card">
            <p className="eyebrow eyebrow-dark">WHAT NEEDS ASSESSMENT</p>
            <h2>Look beyond the first visible symptom</h2>
            <ul>
              {service.assessment.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {isUrgent ? (
        <section className="safety-band">
          <div className="shell safety-grid">
            <div>
              <p className="eyebrow">SAFETY BEFORE REPAIR</p>
              <h2>Do not climb onto a wet or storm-damaged roof.</h2>
            </div>
            <div>
              <p>
                If conditions are dangerous, use official Queensland emergency
                channels. Keep clear of damaged powerlines, wet electrical
                equipment, solar panels and unstable ceilings.
              </p>
              <div className="official-links">
                <a
                  href="https://www.ses.qld.gov.au/ses-assistance"
                  target="_blank"
                  rel="noreferrer"
                >
                  Queensland SES guidance ↗
                </a>
                <a
                  href="https://www.electricalsafety.qld.gov.au/electrical-safety-home/electrical-safety-during-storms"
                  target="_blank"
                  rel="noreferrer"
                >
                  Electrical safety during storms ↗
                </a>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="YOUR NEXT STEPS"
            title={
              isGutterCleaning
                ? "Prepare a useful gutter cleaning request"
                : "Prepare a useful repair request"
            }
            copy={
              isGutterCleaning
                ? "Good photos and access details help define which gutter runs, outlets and flow checks belong in the cleaning scope."
                : "Good information reduces back-and-forth and helps decide whether the issue needs urgent triage, an inspection or a planned repair discussion."
            }
          />
          <ol className="number-list">
            {service.nextSteps.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-pale">
        <div className="shell service-planning-layout">
          <div>
            <SectionHeading
              eyebrow="SERVICE STEPS & INDICATIVE TIMING"
              title={
                isGutterCleaning
                  ? "How the job moves from enquiry to gutter clearing"
                  : "How the job moves from enquiry to repair"
              }
              copy="These ranges are planning guides, not fixed promises. The confirmed programme follows inspection and depends on weather, access, materials and the final scope."
            />
            <ol className="timeline-list">
              {serviceContext.timeline.map((item, index) => (
                <li key={item.stage}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{item.stage}</h3>
                    <strong>{item.timing}</strong>
                    <p>{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <aside className="quote-factors-card">
            <p className="eyebrow eyebrow-dark">WHAT AFFECTS THE QUOTE</p>
            <h2>
              {isGutterCleaning
                ? "Why two gutter cleaning jobs can cost differently"
                : "Why two similar roof problems can cost differently"}
            </h2>
            <ul className="check-list">
              {serviceContext.quoteFactors.map((factor) => (
                <li key={factor}>{factor}</li>
              ))}
            </ul>
            <p className="quote-note">
              {isGutterCleaning
                ? "Mel One confirms the gutter runs, access, disposal and any outlet or flow checks before giving a project-specific price. Separate damage or drainage repairs are quoted as a different scope."
                : "Mel One confirms the repair scope before giving a project-specific price. Photos can help triage the request but do not replace safe roof access where the cause is hidden."}
            </p>
          </aside>
        </div>
      </section>

      <section className="section section-navy">
        <div className="shell capability-layout">
          <div>
            <p className="eyebrow">TEAM CAPABILITY FOR THIS SERVICE</p>
            <h2>{serviceContext.capability.title}</h2>
            <p>{serviceContext.capability.summary}</p>
          </div>
          <ul className="capability-list">
            {serviceContext.capability.evidence.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {matchingProjects.length > 0 ? (
        <section className="section section-project-feature">
          <div className="shell">
            <SectionHeading
              eyebrow="ORIGINAL PROJECT PHOTOGRAPHY"
              title="Real roof work related to this service"
              copy="These are original project images. The descriptions stay within what the supplied photos and project stage actually show."
            />
            <div className="service-project-grid">
              {matchingProjects.map((project) => (
                <Link
                  href={`/projects#${project.slug}`}
                  className="service-project-card"
                  key={project.slug}
                >
                  <div className="service-project-image">
                    <img
                      src={project.coverImage}
                      alt={project.coverAlt}
                      width="1080"
                      height="811"
                      loading="lazy"
                    />
                    <span>{project.status}</span>
                  </div>
                  <div>
                    <p className="eyebrow eyebrow-dark">{project.eyebrow}</p>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                    <strong>View project evidence →</strong>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section section-faq">
        <div className="shell faq-layout">
          <SectionHeading
            eyebrow={`${service.navLabel.toUpperCase()} FAQ`}
            title="Questions homeowners ask before booking"
          />
          <FaqList items={service.faqs} />
        </div>
      </section>

      <section className="section related-section">
        <div className="shell">
          <SectionHeading eyebrow="RELATED SERVICES" title="Compare the next closest intent" />
          <div className="related-grid">
            {related.map((item) => (
              <Link href={item.path} key={item.path}>
                <span className="eyebrow eyebrow-dark">{item.eyebrow}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <strong>View service →</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow={
          isGutterCleaning ? "REQUEST GUTTER CLEANING" : undefined
        }
        title={
          isGutterCleaning
            ? "Start with the gutter condition you can see"
            : undefined
        }
        copy={
          isGutterCleaning
            ? "Share your Brisbane suburb, property height, roof type and safe photos of the affected gutter. Mel One will confirm the cleaning scope, access needs and availability."
            : undefined
        }
      />
    </PageShell>
  );
}

function ServicesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="BRISBANE ROOF & GUTTER SERVICES"
        title="Choose the page that matches the problem"
        description="Each page has one primary user intent: broad repair, active leak, blocked gutters, emergency help, storm damage, a roof material or an inspection decision."
      />
      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="SERVICE MATRIX"
            title="Closely related services, clearly separated"
            copy="This structure lets a homeowner move from a broad search to the page that best reflects the symptom and urgency without repeating the same content across multiple URLs."
          />
          <div className="service-card-grid">
            {services.map((service, index) => (
              <Link href={service.path} className="service-card" key={service.path}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <strong>Open service page →</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-pale">
        <div className="shell">
          <SectionHeading
            eyebrow="PAGE-TO-INTENT MAP"
            title="What each page is designed to answer"
          />
          <div className="responsive-table">
            <table>
              <thead>
                <tr>
                  <th>Primary search intent</th>
                  <th>Best page</th>
                  <th>User decision</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Roof repairs Brisbane</td>
                  <td>General roof repairs</td>
                  <td>Who can assess and repair this?</td>
                </tr>
                <tr>
                  <td>Roof leak repair Brisbane</td>
                  <td>Roof leak repairs</td>
                  <td>Where is the water entering?</td>
                </tr>
                <tr>
                  <td>Gutter cleaning Brisbane</td>
                  <td>Gutter cleaning</td>
                  <td>Is debris blocking the gutter or roof drainage?</td>
                </tr>
                <tr>
                  <td>Emergency roof repair Brisbane</td>
                  <td>Emergency roof help</td>
                  <td>What should I do right now?</td>
                </tr>
                <tr>
                  <td>Tile roof repairs Brisbane</td>
                  <td>Tile roof repairs</td>
                  <td>Is it a tile, ridge or flashing issue?</td>
                </tr>
                <tr>
                  <td>Metal roof repairs Brisbane</td>
                  <td>Metal roof repairs</td>
                  <td>Is it a fastener, sheet or corrosion issue?</td>
                </tr>
                <tr>
                  <td>Roof inspection Brisbane</td>
                  <td>Roof inspections</td>
                  <td>What needs repair and what can wait?</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <CtaBand />
    </PageShell>
  );
}

function RoofTypesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="ROOF TYPES BRISBANE"
        title="Tile and metal roofs need different repair thinking"
        description="The visible symptom may look similar indoors, but the exterior details, materials and safe repair scope can be very different."
      />
      <section className="section">
        <div className="shell roof-type-grid">
          <article>
            <span className="type-label">TILE ROOFS</span>
            <h2>Concrete and terracotta tile roof problems</h2>
            <p>
              Typical investigation points include broken or slipped tiles,
              ridge capping, valleys, flashing, penetrations and the path water
              takes beneath the tile surface.
            </p>
            <ul className="check-list">
              <li>Cracked, chipped or missing tiles</li>
              <li>Loose ridge capping or deteriorated pointing</li>
              <li>Valley and flashing leaks</li>
              <li>Storm or debris impact</li>
            </ul>
            <Link className="button button-navy" href="/services/tile-roof-repairs-brisbane">
              Tile roof repair page
            </Link>
          </article>
          <article>
            <span className="type-label type-label-yellow">METAL ROOFS</span>
            <h2>Metal sheet, fixing and flashing problems</h2>
            <p>
              Typical investigation points include fasteners and washers,
              sheet laps, flashings, roof penetrations, local corrosion and
              weather damage.
            </p>
            <ul className="check-list">
              <li>Loose or failed roof fasteners</li>
              <li>Corrosion and rust staining</li>
              <li>Sheet lap or flashing leaks</li>
              <li>Lifted or damaged roofing after wind</li>
            </ul>
            <Link className="button button-navy" href="/services/metal-roof-repairs-brisbane">
              Metal roof repair page
            </Link>
          </article>
        </div>
      </section>
      <section className="section section-pale">
        <div className="shell narrow-intro">
          <SectionHeading
            eyebrow="NOT SURE WHICH PAGE?"
            title="Describe the roof rather than guessing the repair"
            copy="If you do not know the roof material or leak source, send a clear ground-level photo and explain when the issue appears. An inspection request is a better starting point than choosing a repair method yourself."
          />
          <Link className="button button-yellow" href="/services/roof-inspections-brisbane">
            View roof inspections
          </Link>
        </div>
      </section>
      <CtaBand />
    </PageShell>
  );
}

function ServiceAreasPage() {
  const areaSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Brisbane roof repair service areas",
    about: {
      "@type": "Service",
      name: "Roof repairs",
      areaServed: [
        {
          "@type": "Place",
          name: business.serviceAreaFocus,
          hasMap: business.googleMapsUrl,
        },
        {
          "@type": "AdministrativeArea",
          name: business.serviceArea,
        },
      ],
      provider: {
        "@id": "#mel-one-property-maintenance",
      },
    },
  };

  return (
    <PageShell>
      <JsonLd data={areaSchema} />
      <PageHero
        eyebrow="ROOF REPAIRS BRISBANE SERVICE AREAS"
        title="Petrie Terrace and Greater Brisbane roof repairs"
        description="Petrie Terrace is a confirmed local service-area focus. Mel One also accepts roof repair enquiries across Greater Brisbane, with attendance confirmed by job requirements."
      />
      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="CONFIRMED SERVICE AREA"
            title="A real local focus, with wider Brisbane coverage"
            copy="Petrie Terrace is now published as a confirmed service-area focus. Other Greater Brisbane suburbs remain subject to service type, access, weather and team availability."
          />
          <div className="area-card-grid">
            {serviceRegions.map((region, index) => (
              <article
                id={region.name === business.serviceAreaFocus ? "petrie-terrace" : undefined}
                key={region.name}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{region.name} roof repair enquiries</h2>
                <p>{region.suburbs.join(" • ")}</p>
                {region.name === business.serviceAreaFocus ? (
                  <Link href="/contact#petrie-terrace-map">
                    View Petrie Terrace map →
                  </Link>
                ) : (
                  <Link href="/contact">Confirm your suburb →</Link>
                )}
              </article>
            ))}
            <article>
              <span>{String(serviceRegions.length + 1).padStart(2, "0")}</span>
              <h2>Brisbane City office</h2>
              <p>
                {business.address.street}, {business.address.locality}{" "}
                {business.address.region} {business.address.postcode}
              </p>
              <a href={`tel:${business.phoneHref}`}>
                Call {business.phone} →
              </a>
            </article>
          </div>
        </div>
      </section>
      <section className="section section-navy">
        <div className="shell split-section">
          <div>
            <p className="eyebrow">WHY THE SUBURB LIST IS CONTROLLED</p>
            <h2>Real coverage matters more than a long keyword list.</h2>
          </div>
          <div className="urgent-copy">
            <p>
              Mel One publishes Petrie Terrace as a real service-area focus and
              Greater Brisbane as the wider coverage area. Additional suburb
              pages will only be added when actual attendance, a locally
              relevant case or genuinely different local guidance supports
              them.
            </p>
          </div>
        </div>
      </section>
      <CtaBand />
    </PageShell>
  );
}

function ProjectsPage() {
  const restoration = projectCases[0];
  const flueRepair = projectCases[1];
  const gutterCleaning = projectCases[2];

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Real Greater Brisbane roof repair, restoration and gutter projects",
    description:
      "Original project photography showing completed tile roof restoration, an in-progress flue penetration repair and gutter cleaning in progress.",
    hasPart: projectCases.map((project) => ({
      "@type": "CreativeWork",
      name: project.title,
      description: project.summary,
      image: project.images.map((image) => image.src),
      about: project.roofType,
    })),
  };

  return (
    <PageShell>
      <JsonLd data={projectSchema} />
      <PageHero
        eyebrow="REAL ROOF & GUTTER PROJECT PHOTOGRAPHY"
        title="See the condition, work stage and documented result"
        description="Original Greater Brisbane customer-project images are grouped by the work they actually show. Customer suburb, material brand and unsupported repair outcomes are not published."
      />

      <section
        className="section project-case-section"
        id={restoration.slug}
      >
        <div className="shell">
          <div className="project-case-heading">
            <div>
              <p className="eyebrow eyebrow-dark">{restoration.eyebrow}</p>
              <h2>{restoration.title}</h2>
            </div>
            <p className="lead-copy">{restoration.summary}</p>
          </div>

          <dl className="project-facts project-facts-wide">
            <div>
              <dt>Status</dt>
              <dd>{restoration.status}</dd>
            </div>
            <div>
              <dt>Roof type</dt>
              <dd>{restoration.roofType}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{restoration.location}</dd>
            </div>
            <div>
              <dt>Evidence</dt>
              <dd>Two before and four after photos</dd>
            </div>
          </dl>

          <div className="project-gallery">
            {restoration.images.map((image) => (
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

          <div className="project-scope">
            <div>
              <p className="eyebrow eyebrow-dark">VISIBLE PROJECT SCOPE</p>
              <h3>What this project record shows</h3>
            </div>
            <ul className="check-list">
              {restoration.work.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <Link
            className="text-link"
            href="/services/tile-roof-repairs-brisbane"
          >
            Explore tile roof repair decisions
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section
        className="section section-pale project-case-section"
        id={flueRepair.slug}
      >
        <div className="shell project-progress-layout">
          <figure className="project-progress-image">
            <div className="project-image-wrap">
              <img
                src={flueRepair.images[0].src}
                alt={flueRepair.images[0].alt}
                width="1080"
                height="1440"
                loading="lazy"
              />
              <span>{flueRepair.images[0].stage}</span>
            </div>
            <figcaption>{flueRepair.images[0].caption}</figcaption>
          </figure>
          <div>
            <p className="eyebrow eyebrow-dark">{flueRepair.eyebrow}</p>
            <h2>{flueRepair.title}</h2>
            <p className="lead-copy">{flueRepair.summary}</p>
            <dl className="project-facts">
              <div>
                <dt>Status</dt>
                <dd>{flueRepair.status}</dd>
              </div>
              <div>
                <dt>Roof type</dt>
                <dd>{flueRepair.roofType}</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{flueRepair.location}</dd>
              </div>
            </dl>
            <ul className="check-list project-progress-list">
              {flueRepair.work.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="inline-actions">
              <Link
                className="button button-dark"
                href="/services/roof-leak-repairs-brisbane"
              >
                View roof leak repairs
              </Link>
              <Link
                className="text-link"
                href="/services/tile-roof-repairs-brisbane"
              >
                Tile roof repairs
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section project-case-section"
        id={gutterCleaning.slug}
      >
        <div className="shell">
          <div className="project-case-heading">
            <div>
              <p className="eyebrow eyebrow-dark">{gutterCleaning.eyebrow}</p>
              <h2>{gutterCleaning.title}</h2>
            </div>
            <p className="lead-copy">{gutterCleaning.summary}</p>
          </div>

          <dl className="project-facts project-facts-wide">
            <div>
              <dt>Status</dt>
              <dd>{gutterCleaning.status}</dd>
            </div>
            <div>
              <dt>Roof type</dt>
              <dd>{gutterCleaning.roofType}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{gutterCleaning.location}</dd>
            </div>
            <div>
              <dt>Evidence</dt>
              <dd>Two before and three in-progress photos</dd>
            </div>
          </dl>

          <div className="project-gallery project-gallery-portrait">
            {gutterCleaning.images.map((image) => (
              <figure key={image.src}>
                <div className="project-image-wrap">
                  <img
                    src={image.src}
                    alt={image.alt}
                    width="1080"
                    height="1440"
                    loading="lazy"
                  />
                  <span>{image.stage}</span>
                </div>
                <figcaption>{image.caption}</figcaption>
              </figure>
            ))}
          </div>

          <div className="project-scope">
            <div>
              <p className="eyebrow eyebrow-dark">DOCUMENTED CLEANING SCOPE</p>
              <h3>What the original project photos show</h3>
            </div>
            <ul className="check-list">
              {gutterCleaning.work.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="inline-actions">
            <Link
              className="button button-dark"
              href="/services/gutter-cleaning-brisbane"
            >
              View gutter cleaning
            </Link>
            <Link
              className="text-link"
              href="/services/roof-leak-repairs-brisbane"
            >
              Roof leak diagnosis
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Need help with a similar roof or gutter problem?"
        copy="Share the roof type, what changed, when the issue appears and photos taken safely from ground level or indoors. The exact cleaning or repair scope still needs to be assessed on the property."
      />
    </PageShell>
  );
}

function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="ABOUT MEL ONE MAINTENANCE"
        title="A real business behind the Brisbane roof repair service"
        description="Mel One Maintenance is the public service brand of Mel One Property Maintenance Pty Ltd, accepting roof repair enquiries across Greater Brisbane."
      />
      <section className="section">
        <div className="shell about-layout">
          <div>
            <SectionHeading
              eyebrow="SERVICE APPROACH"
              title="Assess the roof detail, define the scope, document the work"
            />
            <p className="lead-copy">
              Mel One separates the homeowner&apos;s symptom from the likely
              cause, then checks the roof material, access, surrounding
              condition and any specialist trade requirements. The project
              library uses original before, in-progress and after photographs.
            </p>
            <div className="business-principles">
              <article>
                <span>01</span>
                <h3>Problem-led inspection</h3>
                <p>Leak timing, roof type and weather pattern guide the assessment.</p>
              </article>
              <article>
                <span>02</span>
                <h3>Scope before price</h3>
                <p>Height, access, materials and the actual defect shape the quote.</p>
              </article>
              <article>
                <span>03</span>
                <h3>Trade boundaries</h3>
                <p>Solar, electrical and other specialist work is identified separately.</p>
              </article>
            </div>
          </div>
          <aside className="business-identity-card">
            <img
              className="about-logo"
              src={business.logo}
              alt="Mel One Maintenance roof repair logo"
              width="512"
              height="512"
            />
            <p className="eyebrow eyebrow-dark">VERIFIED BUSINESS IDENTITY</p>
            <h2>{business.legalName}</h2>
            <dl className="identity-list">
              <div>
                <dt>Public brand</dt>
                <dd>{business.brandName}</dd>
              </div>
              <div>
                <dt>ABN</dt>
                <dd>{business.abn}</dd>
              </div>
              <div>
                <dt>ACN</dt>
                <dd>{business.acn}</dd>
              </div>
              <div>
                <dt>Office</dt>
                <dd>
                  {business.address.street}, {business.address.locality}{" "}
                  {business.address.region} {business.address.postcode}
                </dd>
              </div>
              <div>
                <dt>Service area</dt>
                <dd>{business.serviceArea}</dd>
              </div>
            </dl>
            <a className="button button-navy" href={`tel:${business.phoneHref}`}>
              Call {business.phone}
            </a>
          </aside>
        </div>
      </section>
      <CtaBand />
    </PageShell>
  );
}

function PrivacyPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="PRIVACY"
        title="How this roof repair website handles enquiry information"
        description={`${business.legalName} operates this site under the ${business.brandName} public service brand.`}
      />
      <section className="section">
        <div className="shell policy-copy">
          <h2>Current website form behaviour</h2>
          <p>
            The contact page lets a visitor prepare and copy a roof repair
            summary on their own device. The website does not send or store the
            entered name, suburb, contact details, photos or message.
          </p>
          <h2>Direct contact</h2>
          <p>
            If you phone or email Mel One Maintenance, the information you
            choose to provide is used to respond to the enquiry, confirm service
            availability, assess the requested work and prepare a quote or next
            step. Contact {business.contactName} at{" "}
            <a href={`mailto:${business.email}`}>{business.email}</a> or{" "}
            <a href={`tel:${business.phoneHref}`}>{business.phone}</a> for an
            access or correction request.
          </p>
          <h2>Business identity</h2>
          <p>
            {business.legalName}, ABN {business.abn}, ACN {business.acn}. Office:{" "}
            {business.address.street}, {business.address.locality}{" "}
            {business.address.region} {business.address.postcode}.
          </p>
          <h2>Analytics and cookies</h2>
          <p>
            No business analytics, advertising or call-tracking identifier is
            currently configured on this site. This notice should be revised
            before those tools or a server-side enquiry form are activated.
          </p>
          <p className="policy-updated">Updated: 30 July 2026</p>
        </div>
      </section>
    </PageShell>
  );
}

export default async function CatchAllPage({ params }: PageProps) {
  const { slug } = await params;
  const path = `/${slug.join("/")}`;
  const service = getServiceByPath(path);

  if (service) {
    return <ServiceDetailPage service={service} />;
  }

  switch (path) {
    case "/services":
      return <ServicesPage />;
    case "/roof-types":
      return <RoofTypesPage />;
    case "/service-areas":
      return <ServiceAreasPage />;
    case "/projects":
      return <ProjectsPage />;
    case "/about":
      return <AboutPage />;
    case "/privacy":
      return <PrivacyPage />;
    default:
      notFound();
  }
}
