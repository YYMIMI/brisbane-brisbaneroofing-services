import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, FaqList, JsonLd, PageHero, PageShell, SectionHeading } from "../../components";
import { business, projectCases } from "../../site-data";

const path = "/zh/brisbane-roof-restoration";
const englishPath = "/services/roof-restoration-brisbane";

export const metadata: Metadata = {
  title: { absolute: "布里斯班屋顶翻新中文服务 | 瓦屋顶检查与修复" },
  description: "布里斯班瓦屋顶翻新中文咨询：褪色风化、脊瓦和谷槽、裂瓦、渗漏痕迹、烟道与太阳能板周边。先检查整体状况，再确认局部维修或完整翻新。",
  alternates: { canonical: path, languages: { "en-AU": englishPath, "zh-Hans-AU": path, "x-default": englishPath } },
  openGraph: { type: "website", locale: "zh_CN", alternateLocale: ["en_AU"], title: "布里斯班屋顶翻新中文服务", description: "根据真实屋顶状况、通道和天气安排翻新范围。" },
};

const faqs = [
  { question: "屋顶褪色就一定要完整翻新吗？", answer: "不一定。外观褪色、局部裂瓦、脊瓦问题和持续渗漏代表不同范围。先检查瓦片、固定、脊线、谷槽、穿透点和排水，再判断局部维修或整体翻新。" },
  { question: "可以只凭照片报价吗？", answer: "照片适合初步判断屋顶类型、可见问题和通道，但无法确认隐藏渗水路径、瓦片下方状况或所有高处细节。最终范围通常需要安全检查后确认。" },
  { question: "翻新需要几天？", answer: "时间受屋顶面积、维修量、清洁和干燥、材料、太阳能板或烟道周边细节以及布里斯班天气影响。确认范围后才会给出项目安排。" },
  { question: "屋顶工作由持牌人员完成吗？", answer: "不同屋顶材料和工作范围可能适用不同许可、资质或承包要求。我们会在报价和安排前确认具体范围、所需类别以及负责该项工作的合适人员。" },
];

const inspectionPoints = [
  "瓦片是否开裂、移位或表面大面积风化",
  "脊瓦、谷槽、天沟和排水出口的实际状况",
  "烟道、通风口、天窗和太阳能板周边的穿透细节",
  "天花水痕是否与可见屋面问题相对应",
  "安全通道、屋顶坡度、高度和天气窗口",
];

export default function ChineseRoofRestorationPage() {
  const pageUrl = `${business.siteUrl}${path}`;
  const project = projectCases[0];
  const serviceSchema = { "@context": "https://schema.org", "@type": "Service", "@id": `${pageUrl}#service`, name: "布里斯班屋顶翻新中文服务", serviceType: "Tile roof restoration", inLanguage: "zh-Hans-AU", url: pageUrl, areaServed: [{ "@type": "City", name: "Brisbane" }, { "@type": "Place", name: "Greater Brisbane" }], provider: { "@type": "Organization", name: business.brandName, legalName: business.legalName, telephone: business.phone, email: business.email } };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "zh-Hans-AU", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };

  return (
    <PageShell>
      <article lang="zh-Hans-AU">
        <JsonLd data={serviceSchema} /><JsonLd data={faqSchema} />
        <PageHero eyebrow="布里斯班瓦屋顶翻新 · 中文咨询" title="先判断局部维修，还是需要整体翻新。" description="屋顶褪色并不自动等于完整翻新。我们根据瓦片、脊线、谷槽、渗漏痕迹、穿透点、排水和安全通道确认实际范围，再说明下一步。" requestLabel="发送屋顶咨询" />

        <section className="section"><div className="shell narrow-intro"><p className="lead-copy">请提供 suburb、物业层数、屋顶材料、问题出现时间，以及从地面安全拍摄的全景和细节照片。不要为了拍照爬上潮湿、陡峭或受损屋顶，也不要靠近太阳能板、电线或不稳定天花。</p></div></section>

        <section className="section section-pale"><div className="shell two-column-content"><div><SectionHeading eyebrow="检查重点" title="不是只看表面颜色" /><ul className="check-list">{inspectionPoints.map((item) => <li key={item}>{item}</li>)}</ul></div><div className="assessment-card"><p className="eyebrow eyebrow-dark">如何决定范围</p><h2>局部修复和整体翻新解决的问题不同</h2><p>少量破瓦、局部脊线或单一穿透点问题，可能适合针对性维修。若表面、脊瓦、多个细节和防护层普遍老化，则需要评估更完整的清洁、维修、准备和涂层范围。</p><Link className="button button-yellow" href="/contact">发送照片与区域</Link></div></div></section>

        <section className="section"><div className="shell"><SectionHeading eyebrow="从咨询到施工" title="每一步都以现场事实为准" copy="以下是常见流程，不是未经检查的固定承诺。" /><ol className="number-list">{[
          "发送 suburb、屋顶类型、层数、可见症状和安全照片。",
          "确认是否适合受理、紧急程度、通道和是否需要现场检查。",
          "检查屋面、脊线、谷槽、穿透点、排水及需要修复的部位。",
          "书面确认维修、清洁、准备、涂层、材料和不包含的项目。",
          "根据天气窗口安排工作，完成后核对已确认的范围。",
        ].map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>)}</ol></div></section>

        <section className="section section-project-feature"><div className="shell"><SectionHeading eyebrow="真实项目照片" title="参考已完成的布里斯班瓦屋顶项目" copy="照片用于展示真实工作和项目阶段，不代表每个屋顶都需要相同方法。" /><div className="service-project-grid"><Link href={`/projects#${project.slug}`} className="service-project-card"><div className="service-project-image"><img src={project.coverImage} alt={project.coverAlt} width="1080" height="811" loading="lazy" /><span>{project.status}</span></div><div><p className="eyebrow eyebrow-dark">{project.eyebrow}</p><h3>{project.title}</h3><p>{project.summary}</p><strong>查看项目详情 →</strong></div></Link></div></div></section>

        <section className="section section-navy"><div className="shell capability-layout"><div><p className="eyebrow">公司与服务边界</p><h2>Mel One Property Maintenance Pty Ltd</h2><p>网站公开公司名称、ABN、ACN、布里斯班联系渠道和真实项目照片。具体屋顶材料、工作范围、适用资格、承包责任和保险要求会在报价前确认。</p></div><ul className="capability-list"><li>Greater Brisbane 咨询，重点包括 Petrie Terrace</li><li>联系电话 {business.phone}</li><li>一般咨询尽快回复，现场与天气安排另行确认</li><li><Link href="/about">查看公司与保险说明 →</Link></li></ul></div></section>

        <section className="section section-faq"><div className="shell faq-layout"><SectionHeading eyebrow="常见问题" title="预约检查前需要知道的事" /><FaqList items={faqs} /><p><Link href={englishPath}>查看英文 Roof Restoration Owner Page →</Link></p></div></section>
        <CtaBand eyebrow="中文屋顶咨询" title="先发送屋顶状况，不要自行爬上去检查" copy={`提供 suburb、物业层数、屋顶材料和安全照片，或致电 ${business.phone}。我们会确认是否适合受理、检查方式和当前安排。`} />
      </article>
    </PageShell>
  );
}

