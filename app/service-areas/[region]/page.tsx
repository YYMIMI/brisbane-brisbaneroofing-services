import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, PageHero, PageShell, SectionHeading, navigationPageHeroImages } from "../../components";
import { serviceRegions, business } from "../../site-data";

const slug=(value:string)=>value.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const advice:Record<string,string>={
  "Inner Brisbane":"For a roof leak in a terrace, unit or managed property, include safe ground-level photos, the affected room and any shared roof or access arrangements. Keep source investigation separate from interior making-good in the quote.",
  "Brisbane Northside":"For tiled roofs, identify whether the concern is a broken tile, ridge detail, valley or gutter. A defined repair can be compared with broader restoration after the surrounding roof condition is checked.",
  "Brisbane Southside":"When water appears after rain, note the wind direction if known and whether it follows heavy or light showers. Roof, flashing and gutter checks should be scoped against the symptom rather than assuming the visible ceiling mark is the entry point.",
  "Brisbane West":"For steep roofs or multi-level homes, note site access and any solar equipment from a safe position. Access method, local repairs and coating work should be separately described before a wider restoration is chosen.",
  "Brisbane East & Bayside":"For exposed roof and gutter surfaces, compare targeted leak or fixing repairs with full-area cleaning or restoration only after the roof material and condition are understood. Include safe access and weather constraints in the proposed scope.",
};
const quoteQuestions:Record<string,{scenario:string;checks:string[];scope:string}>={
  "Inner Brisbane":{
    scenario:"If a leak is showing in a unit or terrace, establish whether the roof is private, common property or managed by a strata contact before arranging access.",
    checks:["Which room shows staining, and does it occur only with wind-driven rain or after every shower?","Can the roof or gutter be viewed safely from the ground, and who can grant access to shared areas?","Has anyone already opened a ceiling, applied sealant or documented the affected roof section?"],
    scope:"Ask who will authorise investigation, how access is arranged, and whether interior repairs are a separate quote. A ceiling stain alone does not identify the roof entry point.",
  },
  "Brisbane Northside":{
    scenario:"For a tiled-roof enquiry, a broken tile, ridge, valley and gutter fault call for different materials and checks; describe the visible symptom before requesting restoration.",
    checks:["Is the tile cracked, displaced or missing, or is the problem only visible indoors?","Does the leak recur in the same place after earlier repairs?","Are there solar panels, roof penetrations or steep sections near the suspected area?"],
    scope:"Request a separate explanation of tile or flashing repair, access equipment and any proposed wider restoration. A coating should not be treated as proof that a leak source is fixed.",
  },
  "Brisbane Southside":{
    scenario:"Where water enters after rain, the wet ceiling area can be downstream of the actual entry point. The timing and rain direction help frame an inspection without claiming a cause.",
    checks:["Does the mark appear during heavy rain, after prolonged rain or only when wind comes from one side?","Is water also overflowing a gutter or downpipe?","What is the roof material, and can you provide wide and close photos taken from a safe position?"],
    scope:"Ask the roofer to distinguish roof-surface, flashing and drainage findings. Interior drying and making-good should be identified separately if needed.",
  },
  "Brisbane West":{
    scenario:"For a high, steep or multi-level roof, the access plan can affect both inspection and price. Explain the site constraints before comparing repair quotes.",
    checks:["How many levels are at the affected roof edge, and is there clear ground access?","Are solar panels, skylights or fragile roof sections close to the suspected fault?","Is the request for one leak, general maintenance or a full-surface finish?"],
    scope:"Compare the proposed access method and defined repair with any optional cleaning or coating. Ask what cannot be assessed until safe access is available.",
  },
  "Brisbane East & Bayside":{
    scenario:"For exposed roof and gutter areas, first separate water entry, surface deterioration and drainage overflow; each points to a different inspection path.",
    checks:["Is the concern a leak indoors, visible corrosion or paint failure, or overflowing gutters?","Does water pool at a valley or discharge point during rain?","Are roof sheets, fixings or gutter joints visibly affected in safe ground-level photos?"],
    scope:"Ask whether targeted roof or gutter work addresses the observed defect before accepting a full-area restoration. Confirm material compatibility and weather-dependent scheduling in the written scope.",
  },
};
export function generateStaticParams(){return serviceRegions.map(region=>({region:slug(region.name)}));}
export async function generateMetadata({params}:{params:Promise<{region:string}>}):Promise<Metadata>{const {region}=await params;const area=serviceRegions.find(item=>slug(item.name)===region);return area?{title:`Roof Repairs in ${area.name} | Mel One`,description:`Roof repair enquiries in ${area.name}, including ${area.suburbs.slice(0,3).join(", ")}. Explore repair choices and request an inspection.`,alternates:{canonical:`/service-areas/${region}`}}:{};}
export default async function RegionPage({params}:{params:Promise<{region:string}>}){
  const {region}=await params;const area=serviceRegions.find(item=>slug(item.name)===region);if(!area)notFound();const rfq=quoteQuestions[area.name];
  return <PageShell><PageHero eyebrow="BRISBANE ROOF SERVICE AREA" title={`Roof repair enquiries in ${area.name}`} description={advice[area.name]} image={navigationPageHeroImages.serviceAreas}/>
    <section className="section"><div className="shell"><p><Link href="/service-areas">← All Brisbane service areas</Link></p><SectionHeading eyebrow="POPULAR SUBURBS" title={`Find your ${area.name} suburb`} copy="Use the property suburb and roof symptom when asking about a repair. An actual inspection confirms the materials and access."/><div className="area-card-grid"><article><ul className="suburb-list">{area.suburbs.map(suburb=><li id={slug(suburb)} key={suburb}><Link href={`/contact?suburb=${encodeURIComponent(suburb)}`}>{suburb} →</Link></li>)}</ul></article></div></div></section>
    <section className="section section-navy"><div className="shell split-section"><div><p className="eyebrow">COMPARE THE RIGHT WORK</p><h2>Repair the fault before choosing a larger roof scope.</h2></div><div className="urgent-copy"><p>{advice[area.name]}</p><p>Describe the roof material, affected interior space, when water appears and any safe photos. Ask the quote to separate roof repair, gutter work, access and any coating or internal finish.</p></div></div></section>
    <section className="section"><div className="shell"><SectionHeading eyebrow="BEFORE REQUESTING A ROOF QUOTE" title={`What to put in a roof enquiry for ${area.name}`} copy={rfq.scenario}/><div className="area-card-grid"><article><h3>Details that change the assessment</h3><ul>{rfq.checks.map(check=><li key={check}>{check}</li>)}</ul></article><article><h3>Compare the written scope</h3><p>{rfq.scope}</p><p>Include the property suburb and a contact who can discuss access. Avoid climbing onto the roof to collect photos.</p></article></div><p><Link href="/contact">Send the roof details →</Link></p></div></section>
    <section className="section"><div className="shell"><SectionHeading eyebrow="SERVICE GUIDES" title="Find the roof issue" copy="Start with the roof material and the work you actually need."/><div className="area-card-grid"><article><Link href="/services/roof-leak-repairs-brisbane">Roof leak repairs →</Link></article><article><Link href="/services/tile-roof-repairs-brisbane">Tile roof repairs →</Link></article><article><Link href="/services/metal-roof-repairs-brisbane">Metal roof repairs →</Link></article></div><p><a href={`tel:${business.phoneHref}`}>Call {business.phone}</a></p></div></section><CtaBand/>
  </PageShell>;
}
