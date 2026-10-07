import Link from "next/link";
import { CtaBand, FaqList, JsonLd, PageHero, PageShell, SectionHeading } from "./components";
import type { RoofSuburbGuide } from "./suburb-guides";

export function RoofSuburbPage({ guide }: { guide: RoofSuburbGuide }) {
  const faq = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: guide.faqs.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };
  return <PageShell>
    <JsonLd data={faq} />
    <PageHero eyebrow="SOUTHSIDE ROOF ENQUIRY GUIDE" title={`Roof repair enquiries in ${guide.name}`} description={guide.intro} />
    <section className="section"><div className="shell"><p><Link href="/service-areas">All service areas</Link> · <Link href="/service-areas/brisbane-southside">Brisbane Southside</Link></p><SectionHeading eyebrow="DESCRIBE THE ACTUAL PROPERTY" title={`Prepare a roof enquiry for ${guide.name}`} copy={guide.context} /><p><a href={guide.source}>ABS 2021 Census housing context for {guide.name} →</a></p><div className="area-card-grid">{guide.sections.map(section => <article key={section.title}><h2>{section.title}</h2><p>{section.copy}</p><ul>{section.checks.map(check => <li key={check}>{check}</li>)}</ul></article>)}</div></div></section>
    <section className="section section-navy"><div className="shell split-section"><div><p className="eyebrow">COMPARE REPAIR DECISIONS</p><h2>Ask what the inspection supports.</h2></div><div className="urgent-copy"><p>{guide.comparison}</p></div></div></section>
    <section className="section"><div className="shell"><SectionHeading eyebrow="PREPARE YOUR REQUEST" title="Send the observations and access details" copy={guide.enquiry} /><p><Link href="/contact">Use the existing roof enquiry form →</Link></p><SectionHeading eyebrow="RELEVANT SERVICE GUIDES" title="Keep each part of the work clear" /><div className="area-card-grid">{guide.services.map(service => <article key={service.href}><h3><Link href={service.href}>{service.label} →</Link></h3><p>{service.reason}</p></article>)}</div></div></section>
    <section className="section"><div className="shell"><SectionHeading eyebrow="BEFORE BOOKING" title={`${guide.name} roof enquiry questions`} /><FaqList items={guide.faqs} /></div></section>
    <CtaBand title={`Discuss the roof issue at your ${guide.name} property`} />
  </PageShell>;
}
