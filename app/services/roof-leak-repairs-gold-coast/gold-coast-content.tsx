import { LocalizedLink as Link } from "@/components/Localized";
import { FaqList, JsonLd, PageHero, PageShell, SectionHeading } from "@/app/components";
import RequestBuilder from "@/app/contact/request-builder";
import { business } from "@/app/site-data";

const copy = {
  en: {
    title: "Roof Leak Repairs Gold Coast",
    description: "Water coming through a ceiling after rain? Tell Riley your Gold Coast suburb, where the water appears and whether it is still entering. We accept roof leak enquiries and confirm the property, work required and availability before booking.",
    call: "Call Riley about a roof leak",
    request: "Request a roof leak assessment",
    language: "中文：黄金海岸屋顶漏水咨询",
    languageHref: "/zh/services/roof-leak-repairs-gold-coast",
    rainEyebrow: "START WITH WHAT YOU CAN SEE",
    rainTitle: "The rain pattern helps; a ceiling mark is not a diagnosis",
    rain: "Tell us whether water appears during rain, after prolonged rain or only when the wind changes. Note the affected room, the first time you noticed it and whether the mark is spreading. Water can travel before it appears inside, so the position of a ceiling stain alone does not identify the entry point.",
    dry: "A leak that has stopped still needs a clear history. Photos taken safely from inside or at ground level, dates of earlier leaks and details of previous repairs can help the roofing team decide what needs checking. Please do not climb onto the roof to collect information.",
    safety: "If water is near electrical fittings, keep away from the affected area. Keep people clear of a sagging or bulging ceiling. Call to explain an active leak; any attendance arrangement depends on safe access, weather and availability.",
    processEyebrow: "ASSESSMENT AND REPAIR",
    processTitle: "Agree on the visit and the work before it starts",
    process: [
      ["1. Describe the property", "Give the Gold Coast suburb, building height, roof type if known and access restrictions. Let us know if a tenant, owner, property manager or body corporate needs to approve the work. Riley's roofing team will confirm whether the request can be accepted and discuss the next step."],
      ["2. Clarify the assessment", "Explain the rainfall pattern and any earlier roof work. Roof coverings, joints, flashings, valleys and roof drainage may be relevant to investigating rain entry. The actual checks depend on the property and the agreed scope; an enquiry or assessment does not automatically include a repair."],
      ["3. Confirm the repair scope", "Before work is arranged, clarify what is included, any access requirements and how the quote will be provided. If temporary protection is discussed, confirm what it covers and what permanent work may still be required. Weather and roof access can affect what can be done safely."],
    ],
    insideEyebrow: "CEILINGS AND WATER DAMAGE",
    insideTitle: "Address the water source before planning the finish",
    inside: "Tell us about wet insulation, ceiling marks or damaged paint, but do not assume a roofing visit includes drying, plastering or repainting. The water source needs to be understood and addressed before the timing of internal repairs is agreed. Drying and internal finish work, where needed, require their own scope and arrangements.",
    boundary: "If the water appears when a shower, tap or other plumbing fixture is used, say so in the enquiry. Rain entry and plumbing leaks need different checks. A description or photo helps with the initial conversation but cannot establish the cause on its own.",
    quoteEyebrow: "PREPARE FOR A QUOTE",
    quoteTitle: "The property and the leak determine the next step",
    quote: "Useful details include the affected area, roof material if known, building height, safe access, previous repairs and whether water is still entering. These can affect assessment time, access arrangements and the repair scope. The team will confirm the suburb and availability before agreeing on a visit; there is no automatic booking or fixed arrival time from submitting this form.",
    faqTitle: "Gold Coast roof leak questions",
    faqs: [
      { question: "Do I need a roofer or a plumber?", answer: "Tell us whether the water follows rain or the use of a plumbing fixture. Rain-related roof entry belongs in this roofing enquiry. If it happens during shower or tap use, explain that first so the right checks can be discussed. Neither a ceiling mark nor a photo establishes the cause remotely." },
      { question: "Can I enquire when the roof is no longer leaking?", answer: "Yes. Record when it leaked, the rain and wind conditions, the room affected and any earlier repair. Whether a visit in dry weather can answer the question depends on the property and the investigation required; the team will discuss this before booking." },
      { question: "Does an assessment include the repair?", answer: "Not automatically. Confirm the assessment scope, any charge and what happens if a repair is identified. Any repair work and quote need to be agreed separately unless they are expressly included in the arrangement." },
      { question: "Can temporary work come before a permanent repair?", answer: "Ask the team about the active leak and the condition of the property. If temporary protection is suitable, its limits and any follow-up work need to be clear. A temporary measure does not establish that the source has been permanently repaired, and safe access and weather still matter." },
      { question: "Will the roofing enquiry include ceiling repairs?", answer: "Ceiling drying, plaster and paint are separate from identifying and repairing the roof entry point. Tell us about internal damage so it can be considered when discussing the sequence, but confirm any internal work and its timing separately." },
    ],
    formEyebrow: "GOLD COAST ROOFING ENQUIRIES",
    formTitle: "Tell Riley about the roof leak",
    formCopy: "Include your suburb, the room or ceiling area, whether water is entering now and how it relates to rain. Mention access restrictions and earlier work. Riley's roofing team will review the details and confirm scope and availability before booking.",
    contactTitle: "Your roofing contact",
    contactNote: "For an active leak, call and describe the situation. An enquiry confirms neither an appointment nor an arrival time.",
    privacy: "Privacy and enquiry information",
  },
  zh: {
    title: "黄金海岸屋顶漏水维修",
    description: "下雨后天花进水？请告诉 Riley 您在黄金海岸的区域、进水位置，以及目前是否仍在漏水。我们承接屋顶漏水咨询，并在预约前确认物业情况、所需工作及可安排时间。",
    call: "致电 Riley 咨询屋顶漏水",
    request: "提交屋顶漏水检查咨询",
    language: "English: Gold Coast roof leak enquiries",
    languageHref: "/services/roof-leak-repairs-gold-coast",
    rainEyebrow: "先说明您观察到的情况",
    rainTitle: "下雨规律有助判断；天花水印不等于漏水诊断",
    rain: "请说明进水发生在下雨时、长时间降雨后，还是仅在风向变化时出现。同时记录受影响房间、首次发现时间，以及水印是否扩大。水可能沿其他位置流动后才在室内显现，因此不能单凭天花水印的位置确定入口。",
    dry: "漏水已经停止，也请保留清楚的记录。从室内或地面安全拍摄的照片、以往漏水日期及曾做过的维修，可帮助屋顶团队讨论需要检查的内容。请勿为了收集资料自行爬上屋顶。",
    safety: "水靠近电气设施时，请远离受影响位置。天花下垂或鼓起时，请让人员离开该区域。正在漏水可先致电说明；到场安排仍需确认安全通道、天气及可安排时间。",
    processEyebrow: "检查与维修安排",
    processTitle: "先确认到访目的，再约定工作范围",
    process: [
      ["1. 说明物业情况", "请提供黄金海岸区域、楼层高度、已知屋顶类型及出入限制。如需租客、业主、物业经理或业主委员会批准，也请一并说明。Riley 的屋顶团队会确认是否可承接，并与您讨论下一步。"],
      ["2. 确认检查内容", "请说明漏水与下雨的关系，以及之前做过的屋顶工作。调查雨水入口时，可能需要考虑屋面、接缝、泛水、屋谷及屋顶排水。实际检查取决于物业情况和约定范围；提交咨询或安排检查，并不自动包含维修。"],
      ["3. 约定维修范围", "安排工作前，请确认包含项目、所需通道及报价方式。如果讨论临时防护，应明确其覆盖范围，以及之后可能仍需进行的永久维修。天气及屋顶通道会影响可安全进行的工作。"],
    ],
    insideEyebrow: "天花与室内水损",
    insideTitle: "先处理进水源，再安排室内修复",
    inside: "请说明保温材料受潮、天花水印或油漆损坏情况，但不要默认屋顶到访包含干燥、石膏或重新油漆。应先了解并处理水源，再商定室内维修时间。如需干燥及室内饰面修复，应另外确认其范围和安排。",
    boundary: "如果用淋浴、龙头或其他用水设施时出现漏水，请在咨询中说明。雨水进入与水管漏水需要不同检查。文字或照片有助于初步沟通，但不能单凭这些资料确定原因。",
    quoteEyebrow: "准备报价资料",
    quoteTitle: "物业情况与漏水表现决定下一步",
    quote: "有用资料包括受影响位置、已知屋面材料、楼层高度、安全通道、以往维修，以及目前是否仍在进水。这些因素会影响检查所需时间、通道安排和维修范围。团队会在约定到访前确认区域及可安排时间；提交表单不代表已经预约，也不构成固定到场时间承诺。",
    faqTitle: "黄金海岸屋顶漏水常见问题",
    faqs: [
      { question: "应该找屋顶师傅还是水管师傅？", answer: "请说明漏水跟随下雨，还是使用用水设施时出现。与雨水有关的屋顶进水可在本屋顶咨询中说明；如果使用淋浴或龙头时漏水，请先明确这一点，以便讨论合适的检查方向。天花水印或照片均不能远程确定原因。" },
      { question: "已经不漏水了，还能咨询吗？", answer: "可以。请记录漏水时间、当时雨势与风向、受影响房间，以及以往维修。干燥天气下的到访是否能解决问题，要视物业情况及所需调查而定，团队会在预约前与您讨论。" },
      { question: "检查是否包含维修？", answer: "不自动包含。请先确认检查范围、可能费用，以及发现需维修项目后的安排。除非明确约定已包含，维修工作与报价均需另外商定。" },
      { question: "可以先做临时处理，再做永久维修吗？", answer: "请向团队说明目前漏水及物业状况。如果适合临时防护，应明确其限制和后续工作。临时措施不代表水源已经永久修复，同时仍需考虑安全通道和天气。" },
      { question: "屋顶咨询是否包含天花修复？", answer: "天花干燥、石膏和油漆，与找出并修复屋顶进水位置属于不同范围。请说明室内损坏，以便讨论先后安排；任何室内工作及其时间应另行确认。" },
    ],
    formEyebrow: "黄金海岸屋顶咨询",
    formTitle: "向 Riley 说明屋顶漏水情况",
    formCopy: "请填写区域、受影响房间或天花位置、目前是否仍在进水，以及与下雨的关系。也请说明出入限制和以往工作。Riley 的屋顶团队会了解资料，在预约前确认工作范围及可安排时间。",
    contactTitle: "屋顶服务联系人",
    contactNote: "正在漏水可致电说明情况。提交咨询不代表已确认预约或到场时间。",
    privacy: "隐私及咨询资料说明",
  },
} as const;

export default function GoldCoastRoofLeakPage({ locale = "en" }: { locale?: "en" | "zh" } = {}) {
  const text = copy[locale];
  const path = `${locale === "zh" ? "/zh" : ""}/services/roof-leak-repairs-gold-coast`;
  const url = `${business.siteUrl}${path}`;
  return (
    <PageShell goldCoast>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "WebPage", "@id": `${url}#webpage`, url, name: text.title, description: text.description, inLanguage: locale === "zh" ? "zh-Hans-AU" : "en-AU" },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: business.brandName, item: `${business.siteUrl}${locale === "zh" ? "/zh/brisbane-roof-repairs" : "/"}` },
            { "@type": "ListItem", position: 2, name: text.title, item: url },
          ] },
          { "@type": "FAQPage", mainEntity: text.faqs.map(faq => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
        ],
      }} />
      <PageHero eyebrow={text.formEyebrow} title={text.title} description={text.description} callLabel={text.call} requestLabel={text.request} requestHref="#request-assessment" />
      <section className="section">
        <div className="shell split-section">
          <div><SectionHeading eyebrow={text.rainEyebrow} title={text.rainTitle} /><Link href={text.languageHref} lang="zh-Hans-AU">{text.language}</Link></div>
          <div className="urgent-copy"><p>{text.rain}</p><p>{text.dry}</p><p>{text.safety}</p></div>
        </div>
      </section>
      <section className="section section-pale" id="how-it-works">
        <div className="shell">
          <SectionHeading eyebrow={text.processEyebrow} title={text.processTitle} />
          <div className="area-card-grid">{text.process.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>
        </div>
      </section>
      <section className="section"><div className="shell split-section"><SectionHeading eyebrow={text.insideEyebrow} title={text.insideTitle} /><div className="urgent-copy"><p>{text.inside}</p><p>{text.boundary}</p></div></div></section>
      <section className="section section-pale"><div className="shell split-section"><SectionHeading eyebrow={text.quoteEyebrow} title={text.quoteTitle} /><div className="urgent-copy"><p>{text.quote}</p></div></div></section>
      <section className="section"><div className="shell"><SectionHeading eyebrow="FAQ" title={text.faqTitle} /><FaqList items={[...text.faqs]} /></div></section>
      <section className="section section-pale" id="request-assessment">
        <div className="shell contact-layout">
          <div>
            <SectionHeading eyebrow={text.formEyebrow} title={text.formTitle} copy={text.formCopy} />
            <div className="direct-contact-card"><h3>{text.contactTitle}</h3><p>Riley · <a href={`tel:${business.phoneHref}`}>{business.phone}</a></p><p>{text.contactNote}</p><Link href="/privacy">{text.privacy}</Link></div>
          </div>
          <RequestBuilder enquiryArea="gold-coast" />
        </div>
      </section>
    </PageShell>
  );
}
