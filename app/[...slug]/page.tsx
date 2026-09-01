import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import {
  CtaBand,
  FaqList,
  JsonLd,
  navigationPageHeroImages,
  PageHero,
  PageShell,
  SectionHeading,
} from "../components";
import {
  business,
  getServiceByPath,
  projectCases,
  supplementaryProjectCases,
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
      alternates: service.slug === "roof-restoration-brisbane"
        ? {
            canonical: path,
            languages: {
              "en-AU": "/services/roof-restoration-brisbane",
              "zh-Hans-AU": "/zh/brisbane-roof-restoration",
              "x-default": "/services/roof-restoration-brisbane",
            },
          }
        : { canonical: path },
    };
  }

  const metadataByPage: Record<string, Metadata> = {
    "/services": {
      title: "Brisbane Roof Repair Services",
      description:
        "Choose the Brisbane service that matches your problem: roof restoration, leaks, blocked gutters, tile or metal damage, storm damage, urgent help or inspections.",
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
        "View Greater Brisbane roof-leak repair, tile roof restoration, flue penetration and gutter cleaning project case studies.",
    },
    "/about": {
      title: "About Mel One Roof Repairs Brisbane",
      description:
        "About Mel One Maintenance and how roof repair, restoration and gutter enquiries are handled across Greater Brisbane.",
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
  const relatedServiceSlugs: Record<string, string[]> = {
    "roof-restoration-brisbane": [
      "tile-roof-repairs-brisbane",
      "roof-inspections-brisbane",
      "roof-leak-repairs-brisbane",
    ],
    "roof-leak-repairs-brisbane": [
      "emergency-roof-repairs-brisbane",
      "roof-inspections-brisbane",
      "tile-roof-repairs-brisbane",
    ],
    "gutter-cleaning-brisbane": [
      "roof-leak-repairs-brisbane",
      "storm-damage-roof-repairs-brisbane",
      "roof-inspections-brisbane",
    ],
    "emergency-roof-repairs-brisbane": [
      "roof-leak-repairs-brisbane",
      "storm-damage-roof-repairs-brisbane",
      "roof-inspections-brisbane",
    ],
    "storm-damage-roof-repairs-brisbane": [
      "emergency-roof-repairs-brisbane",
      "tile-roof-repairs-brisbane",
      "metal-roof-repairs-brisbane",
    ],
    "tile-roof-repairs-brisbane": [
      "roof-restoration-brisbane",
      "roof-leak-repairs-brisbane",
      "roof-inspections-brisbane",
    ],
    "metal-roof-repairs-brisbane": [
      "roof-leak-repairs-brisbane",
      "storm-damage-roof-repairs-brisbane",
      "roof-inspections-brisbane",
    ],
    "roof-inspections-brisbane": [
      "roof-leak-repairs-brisbane",
      "tile-roof-repairs-brisbane",
      "metal-roof-repairs-brisbane",
    ],
  };
  const related = (relatedServiceSlugs[service.slug] ?? [])
    .map((slug) => services.find((item) => item.slug === slug))
    .filter((item): item is (typeof services)[number] => Boolean(item));
  const projectMatches: Record<string, typeof projectCases> = {
    "roof-restoration-brisbane": [projectCases[0]],
    "tile-roof-repairs-brisbane": [
      supplementaryProjectCases[0],
      projectCases[0],
      projectCases[1],
    ],
    "roof-leak-repairs-brisbane": [
      supplementaryProjectCases[0],
      projectCases[1],
    ],
    "gutter-cleaning-brisbane": [projectCases[2]],
    "roof-inspections-brisbane": [
      supplementaryProjectCases[0],
      projectCases[0],
      projectCases[1],
      projectCases[2],
    ],
  };
  const matchingProjects = projectMatches[service.slug] ?? [];
  const organizationId = `${business.siteUrl}/#organization`;

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
      "@id": organizationId,
      name: business.brandName,
      legalName: business.legalName,
    },
    url: `${business.siteUrl}${service.path}`,
    image: `${business.siteUrl}${
      matchingProjects[0]?.coverImage ?? business.logo
    }`,
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
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: business.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Roof services",
        item: `${business.siteUrl}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `${business.siteUrl}${service.path}`,
      },
    ],
  };

  return (
    <PageShell>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <PageHero
        eyebrow={service.eyebrow}
        title={service.title}
        description={service.description}
        image={service.heroImage}
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
              Serving Petrie Terrace, Brisbane City and surrounding Greater
              Brisbane suburbs.{" "}
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
              title="Does this sound like your roof problem?"
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
              eyebrow="MEL ONE PROJECT CASES"
              title="Real roof work related to this service"
              copy="These completed projects show the customer problem, work carried out and result in clear, practical terms."
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
                    <strong>View project details →</strong>
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
          <SectionHeading
            eyebrow="RELATED SERVICES"
            title="Other roof services that may help"
          />
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
        title="Roof repair services for leaks, damage and maintenance"
        description="Start with the symptom, urgency or roof material you can identify. Each service explains the assessment, likely timing and next step for that problem."
        image={navigationPageHeroImages.services}
      />
      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="ROOF & GUTTER SERVICES"
            title="Find the service that fits what you can see"
            copy="You do not need to diagnose the repair yourself. Choose the closest problem, then use the inspection pathway when the cause is still unclear."
          />
          <div className="service-card-grid">
            {services.map((service, index) => (
              <Link href={service.path} className="service-card" key={service.path}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <strong>View service details →</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-pale">
        <div className="shell">
          <SectionHeading
            eyebrow="CHOOSE YOUR NEXT STEP"
            title="Which service matches your roof problem?"
          />
          <div className="responsive-table">
            <table>
              <thead>
                <tr>
                  <th>What you can see</th>
                  <th>Recommended service</th>
                  <th>What it helps determine</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Faded or weathered tile roof</td>
                  <td>
                    <Link href="/services/roof-restoration-brisbane">
                      Roof restoration
                    </Link>
                  </td>
                  <td>Whether local repairs or a broader restoration is appropriate</td>
                </tr>
                <tr>
                  <td>Water stain or active roof leak</td>
                  <td>
                    <Link href="/services/roof-leak-repairs-brisbane">
                      Roof leak repairs
                    </Link>
                  </td>
                  <td>Where is the water entering?</td>
                </tr>
                <tr>
                  <td>Leaves, standing water or overflowing gutters</td>
                  <td>
                    <Link href="/services/gutter-cleaning-brisbane">
                      Gutter cleaning
                    </Link>
                  </td>
                  <td>Is debris blocking the gutter or roof drainage?</td>
                </tr>
                <tr>
                  <td>Water entering now or loose roofing</td>
                  <td>
                    <Link href="/services/emergency-roof-repairs-brisbane">
                      Emergency roof help
                    </Link>
                  </td>
                  <td>What should I do right now?</td>
                </tr>
                <tr>
                  <td>New damage after hail, wind or intense rain</td>
                  <td>
                    <Link href="/services/storm-damage-roof-repairs-brisbane">
                      Storm damage roof repairs
                    </Link>
                  </td>
                  <td>What changed, and what needs temporary or permanent work?</td>
                </tr>
                <tr>
                  <td>Cracked tiles or loose ridge capping</td>
                  <td>
                    <Link href="/services/tile-roof-repairs-brisbane">
                      Tile roof repairs
                    </Link>
                  </td>
                  <td>Is it a tile, ridge or flashing issue?</td>
                </tr>
                <tr>
                  <td>Loose fasteners, sheet damage or rust</td>
                  <td>
                    <Link href="/services/metal-roof-repairs-brisbane">
                      Metal roof repairs
                    </Link>
                  </td>
                  <td>Is it a fastener, sheet or corrosion issue?</td>
                </tr>
                <tr>
                  <td>The cause or repair priority is unclear</td>
                  <td>
                    <Link href="/services/roof-inspections-brisbane">
                      Roof inspections
                    </Link>
                  </td>
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
        image={navigationPageHeroImages.roofTypes}
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
              View tile roof repair service
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
              View metal roof repair service
            </Link>
          </article>
        </div>
      </section>
      <section className="section section-pale">
        <div className="shell narrow-intro">
          <SectionHeading
            eyebrow="NOT SURE WHICH SERVICE?"
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
        ...serviceRegions.flatMap((region) =>
          region.suburbs.map((suburb) => ({
            "@type": "Place",
            name: `${suburb}, Queensland`,
          })),
        ),
      ],
      provider: {
        "@id": `${business.siteUrl}/#organization`,
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
        image={navigationPageHeroImages.serviceAreas}
      />
      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="BRISBANE SERVICE COVERAGE"
            title="Suburbs grouped by the areas we service"
            copy="Petrie Terrace is the local focus shown on the map. The suburb list below helps Brisbane homeowners confirm whether an enquiry sits within the wider service area."
          />
          <div className="area-card-grid">
            {serviceRegions.map((region, index) => (
              <article
                id={
                  region.suburbs.includes(business.serviceAreaFocus)
                    ? "petrie-terrace"
                    : undefined
                }
                key={region.name}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{region.name} roof repair enquiries</h2>
                <ul className="suburb-list">
                  {region.suburbs.map((suburb) => (
                    <li key={suburb}>{suburb}</li>
                  ))}
                </ul>
                {region.suburbs.includes(business.serviceAreaFocus) ? (
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
            <p className="eyebrow">CONFIRM YOUR SUBURB</p>
            <h2>Attendance depends on the job and safe access.</h2>
          </div>
          <div className="urgent-copy">
            <p>
              Mel One accepts roof and gutter enquiries across the listed
              Brisbane suburbs. Availability is confirmed after checking the
              service type, property access, current weather and team capacity.
              If your suburb is nearby but not listed, contact the team before
              booking.
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
  const gutterPrimaryPair = gutterCleaning.images.filter(
    (image) => image.group === "primary",
  );
  const gutterProcessPhotos = gutterCleaning.images.filter(
    (image) => image.group === "process",
  );
  const gutterAdditionalPair = gutterCleaning.images.filter(
    (image) => image.group === "additional",
  );

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Real Greater Brisbane roof repair, restoration and gutter projects",
    description:
      "Greater Brisbane projects showing roof-leak repair, completed tile roof restoration, flue penetration repair and gutter cleaning.",
    hasPart: [...projectCases, ...supplementaryProjectCases].map((project) => ({
      "@type": "CreativeWork",
      name: project.title,
      description: project.summary,
      image: project.images.map(
        (image) => `${business.siteUrl}${image.src}`,
      ),
      about: project.roofType,
      url: `${business.siteUrl}/projects#${project.slug}`,
    })),
  };

  return (
    <PageShell projectLinkLabel="Roof projects">
      <JsonLd data={projectSchema} />
      <PageHero
        eyebrow="MEL ONE COMPLETED PROJECTS"
        title="See the starting condition and completed work"
        description="Greater Brisbane projects show the customer problem, starting condition, work carried out and completed result."
        image={navigationPageHeroImages.projects}
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
              <dt>Project photos</dt>
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
              <h3>What this project shows</h3>
            </div>
            <ul className="check-list">
              {restoration.work.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <Link
            className="text-link"
            href="/services/roof-restoration-brisbane"
          >
            Explore Brisbane roof restoration
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section
        className="section section-pale project-case-section"
        id={flueRepair.slug}
      >
        <div className="shell project-progress-layout">
          <div>
            {flueRepair.images.map((image) => (
              <figure className="project-progress-image" key={image.src}>
                <div className="project-image-wrap">
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={image.width ?? 1080}
                    height={image.height ?? 1440}
                    loading="lazy"
                  />
                  <span>{image.stage}</span>
                </div>
                <figcaption>{image.caption}</figcaption>
              </figure>
            ))}
          </div>
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
              <div>
                <dt>Project photos</dt>
                <dd>One work-in-progress photo and one matching after view</dd>
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
              <dt>Work shown</dt>
              <dd>Before, cleaning, flow check and finished condition</dd>
            </div>
          </dl>

          <div className="gutter-story-block gutter-story-main">
            <div className="gutter-story-heading">
              <div>
                <p className="eyebrow eyebrow-dark">MAIN COMPARISON</p>
                <h3>Blocked gutter and cleared result</h3>
              </div>
              <p>
                The same gutter below the fascia is shown before and after
                clearing, so the result is easy to compare.
              </p>
            </div>
            <div className="project-gallery project-gallery-pair project-gallery-portrait">
              {gutterPrimaryPair.map((image) => (
                <figure key={image.src}>
                  <div className="project-image-wrap">
                    <img
                      src={image.src}
                      alt={image.alt}
                      width={image.width ?? 1086}
                      height={image.height ?? 1448}
                      loading="lazy"
                    />
                    <span>{image.stage}</span>
                  </div>
                  <figcaption>{image.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="gutter-story-block gutter-story-process">
            <div className="gutter-story-heading">
              <div>
                <p className="eyebrow eyebrow-dark">HOW THE GUTTER WAS CLEARED</p>
                <h3>Cleaning and flow check</h3>
              </div>
              <p>
                These site photos show the gutter being cleared and flushed
                before the connected roof-edge sections were left clear and
                open for water flow.
              </p>
            </div>
            <div className="project-gallery project-gallery-pair project-gallery-portrait">
              {gutterProcessPhotos.map((image) => (
                <figure key={image.src}>
                  <div className="project-image-wrap">
                    <img
                      src={image.src}
                      alt={image.alt}
                      width={image.width ?? 1086}
                      height={image.height ?? 1448}
                      loading="lazy"
                    />
                    <span>{image.stage}</span>
                  </div>
                  <figcaption>{image.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="gutter-story-block">
            <div className="gutter-story-heading">
              <div>
                <p className="eyebrow eyebrow-dark">SAME JOB · SECOND AREA</p>
                <h3>Connected tiled and metal roof section</h3>
              </div>
              <p>
                A second comparison shows the connected gutter beside the
                tiled and metal roof sections on the same property.
              </p>
            </div>
            <div className="project-gallery project-gallery-pair project-gallery-portrait">
              {gutterAdditionalPair.map((image) => (
                <figure key={image.src}>
                  <div className="project-image-wrap">
                    <img
                      src={image.src}
                      alt={image.alt}
                      width={image.width ?? 1086}
                      height={image.height ?? 1448}
                      loading="lazy"
                    />
                    <span>{image.stage}</span>
                  </div>
                  <figcaption>{image.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="project-scope">
            <div>
              <p className="eyebrow eyebrow-dark">COMPLETED GUTTER CLEANING</p>
              <h3>What was completed</h3>
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

      {supplementaryProjectCases.map((project, index) => (
        <section
          className={`section project-case-section${index % 2 === 0 ? "" : " section-pale"}`}
          id={project.slug}
          key={project.slug}
        >
          <div className="shell">
            <div className="project-case-heading">
              <div>
                <p className="eyebrow eyebrow-dark">{project.eyebrow}</p>
                <h2>{project.title}</h2>
              </div>
              <p className="lead-copy">{project.summary}</p>
            </div>
            <dl className="project-facts project-facts-wide">
              <div><dt>Status</dt><dd>{project.status}</dd></div>
              <div><dt>Roof type</dt><dd>{project.roofType}</dd></div>
              <div><dt>Location</dt><dd>{project.location}</dd></div>
              <div><dt>Project photos</dt><dd>{project.images.length}</dd></div>
            </dl>
            <div
              className={[
                "project-gallery",
                project.images.length === 1 ? "project-gallery-single" : "",
                project.images.every(
                  (image) => (image.width ?? 0) < (image.height ?? 0),
                )
                  ? "project-gallery-portrait"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {project.images.map((image) => (
                <figure className="project-photo" key={image.src}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={image.width ?? 1200}
                    height={image.height ?? 900}
                    loading="lazy"
                  />
                  <span className="project-stage">{image.stage}</span>
                  <figcaption>{image.caption}</figcaption>
                </figure>
              ))}
            </div>
            <div className="project-scope">
              <p className="eyebrow eyebrow-dark">PROJECT SCOPE</p>
              <h3>What this project shows</h3>
              <ul className="check-list">
                {project.work.map((item) => (<li key={item}>{item}</li>))}
              </ul>
            </div>
          </div>
        </section>
      ))}

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
        title="About Mel One Maintenance"
        description="We take roof repair, restoration and gutter enquiries across Greater Brisbane, starting with the problem you can see and the practical next step."
        image={navigationPageHeroImages.about}
      />
      <section className="section">
        <div className="shell about-layout">
          <div>
            <SectionHeading
              eyebrow="HOW WE WORK"
              title="Start with the roof problem, then define the work"
            />
            <p className="lead-copy">
              Share when the problem appears, the roof type if known and safe
              photos. We use those details to decide whether the next step is
              advice, an inspection or a clearly defined repair scope. Original
              project photos show how previous work progressed.
            </p>
            <div className="business-principles">
              <article>
                <span>01</span>
                <h3>Start with the symptom</h3>
                <p>Tell us when the problem appears, the roof type and what changed.</p>
              </article>
              <article>
                <span>02</span>
                <h3>Scope before price</h3>
                <p>Height, access, materials and the actual defect shape the quote.</p>
              </article>
              <article>
                <span>03</span>
                <h3>Keep specialist work separate</h3>
                <p>Solar, electrical and other specialist work is identified separately.</p>
              </article>
            </div>
          </div>
          <aside id="company-details" className="business-identity-card">
            <img
              className="about-logo"
              src={business.logo}
              alt="Mel One Maintenance roof repair logo"
              width="512"
              height="512"
            />
            <p className="eyebrow eyebrow-dark">COMPANY &amp; INSURANCE DETAILS</p>
            <h2>{business.legalName}</h2>
            <dl className="identity-list">
              <div>
                <dt>Service name</dt>
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
                <dt>Company registered</dt>
                <dd>ASIC · 8 March 2023</dd>
              </div>
              <div>
                <dt>Insurer</dt>
                <dd>Chubb Insurance Australia Limited</dd>
              </div>
              <div>
                <dt>Public &amp; Products Liability</dt>
                <dd>AUD 20 million</dd>
              </div>
              <div>
                <dt>Policy period</dt>
                <dd>13 April 2026 – 13 April 2027, subject to policy terms</dd>
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
            <p>
              Roof material, access and the proposed repair determine whether a
              regulated licence class is required. Any required class and
              responsible contracting party are confirmed before the quote is
              accepted or work begins.
            </p>
            <a className="button button-navy" href={`tel:${business.phoneHref}`}>
              Call {business.phone}
            </a>
          </aside>
        </div>
      </section>
      <section className="section section-pale" aria-labelledby="customer-priorities-heading">
        <div className="shell">
          <SectionHeading
            eyebrow="BEFORE THE SCOPE IS AGREED"
            title="What Brisbane property owners usually want confirmed"
          />
          <div className="business-principles">
            <article>
              <span>01</span>
              <h3>Is it local or widespread?</h3>
              <p>One displaced tile or loose flashing needs a different response from repeated leaks across several areas.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Can the roof be reached safely?</h3>
              <p>Pitch, height, solar equipment, fragile surfaces and ground access affect inspection and repair planning.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Who handles specialist scope?</h3>
              <p>Electrical, solar, structural and regulated roof-plumbing work is identified separately before work proceeds.</p>
            </article>
          </div>
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
          <h2>Information submitted through the website</h2>
          <p>
            The contact form can send your name, suburb, email address, phone
            number, roof type, preferred timing, enquiry details and optional
            self-reported referral source to Mel One Maintenance. This
            information is used to review the request, confirm service
            availability, discuss inspection needs and prepare a quote or next
            step.
          </p>
          <h2>Direct contact and service providers</h2>
          <p>
            Information sent through the form is delivered to the business
            email account using the website&apos;s hosting and email-delivery
            providers. A copy may remain in the recipient mailbox and provider
            processing records as required to deliver and respond to the
            enquiry. The site does not publish submitted enquiry details.
          </p>
          <h2>Analytics and cookies</h2>
          <p>
            Google Analytics is configured to measure page use and
            non-identifying conversion events, including phone-link clicks,
            email-link clicks and successfully delivered enquiries. Phone
            numbers and email addresses are not sent as analytics event
            parameters. Google Analytics may use cookies or similar
            technologies according to the visitor&apos;s browser and Google
            settings.
          </p>
          <h2>Business identity and contact</h2>
          <p>
            {business.legalName}, ABN {business.abn}, ACN {business.acn}. Office:{" "}
            {business.address.street}, {business.address.locality}{" "}
            {business.address.region} {business.address.postcode}. Contact{" "}
            {business.contactName} at{" "}
            <a href={`mailto:${business.email}`}>{business.email}</a> or{" "}
            <a href={`tel:${business.phoneHref}`}>{business.phone}</a> to ask
            about access or correction of enquiry information held by the
            business.
          </p>
          <p className="policy-updated">Updated: 17 August 2026</p>
        </div>
      </section>
    </PageShell>
  );
}

export default async function CatchAllPage({ params }: PageProps) {
  const { slug } = await params;
  const path = `/${slug.join("/")}`;

  if (path === "/services/roof-repairs-brisbane") {
    permanentRedirect("/");
  }

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

