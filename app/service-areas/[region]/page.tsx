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
export function generateStaticParams(){return serviceRegions.map(region=>({region:slug(region.name)}));}
export async function generateMetadata({params}:{params:Promise<{region:string}>}):Promise<Metadata>{const {region}=await params;const area=serviceRegions.find(item=>slug(item.name)===region);return area?{title:`Roof Repairs in ${area.name} | Mel One`,description:`Roof repair enquiries in ${area.name}, including ${area.suburbs.slice(0,3).join(", ")}. Explore repair choices and request an inspection.`,alternates:{canonical:`/service-areas/${region}`}}:{};}
export default async function RegionPage({params}:{params:Promise<{region:string}>}){
  const {region}=await params;const area=serviceRegions.find(item=>slug(item.name)===region);if(!area)notFound();
  return <PageShell><PageHero eyebrow="BRISBANE ROOF SERVICE AREA" title={`Roof repair enquiries in ${area.name}`} description={advice[area.name]} image={navigationPageHeroImages.serviceAreas}/>
    <section className="section"><div className="shell"><p><Link href="/service-areas">← All Brisbane service areas</Link></p><SectionHeading eyebrow="POPULAR SUBURBS" title={`Find your ${area.name} suburb`} copy="Use the property suburb and roof symptom when asking about a repair. An actual inspection confirms the materials and access."/><div className="area-card-grid"><article><ul className="suburb-list">{area.suburbs.map(suburb=><li id={slug(suburb)} key={suburb}><Link href={`/contact?suburb=${encodeURIComponent(suburb)}`}>{suburb} →</Link></li>)}</ul></article></div></div></section>
    <section className="section section-navy"><div className="shell split-section"><div><p className="eyebrow">COMPARE THE RIGHT WORK</p><h2>Repair the fault before choosing a larger roof scope.</h2></div><div className="urgent-copy"><p>{advice[area.name]}</p><p>Describe the roof material, affected interior space, when water appears and any safe photos. Ask the quote to separate roof repair, gutter work, access and any coating or internal finish.</p></div></div></section>
    <section className="section"><div className="shell"><SectionHeading eyebrow="SERVICE GUIDES" title="Find the roof issue" copy="Start with the roof material and the work you actually need."/><div className="area-card-grid"><article><Link href="/services/roof-leak-repairs-brisbane">Roof leak repairs →</Link></article><article><Link href="/services/tile-roof-repairs-brisbane">Tile roof repairs →</Link></article><article><Link href="/services/metal-roof-repairs-brisbane">Metal roof repairs →</Link></article></div><p><a href={`tel:${business.phoneHref}`}>Call {business.phone}</a></p></div></section><CtaBand/>
  </PageShell>;
}
