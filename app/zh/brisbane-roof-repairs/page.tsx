import type { Metadata } from "next";
import Link from "next/link";
import {
  CtaBand,
  FaqList,
  JsonLd,
  PageHero,
  PageShell,
  SectionHeading,
} from "../../components";
import { business, projectCases } from "../../site-data";

const path = "/zh/brisbane-roof-repairs";
const englishPath = "/";

export const metadata: Metadata = {
  title: {
    absolute: "布里斯班屋顶维修中文服务 | 漏水、瓦片与金属屋顶 | Mel One",
  },
  description:
    "Mel One 布里斯班屋顶维修中文服务：以多年现场维修与物业维护经验处理屋顶漏水、裂瓦、金属屋顶和风暴损坏咨询，可直接致电或发送表单。",
  alternates: {
    canonical: path,
    languages: {
      "en-AU": englishPath,
      "zh-Hans-AU": path,
      "x-default": englishPath,
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    alternateLocale: ["en_AU"],
    title: "布里斯班屋顶维修中文服务",
    description:
      "根据漏水症状、屋顶材料、损坏范围和现场条件确认布里斯班屋顶维修下一步。",
  },
};

const repairOptions = [
  {
    title: "屋顶漏水维修",
    copy: "适合下雨后出现天花水痕、滴水，或怀疑谷槽、泛水和屋顶穿透点进水的情况。",
    href: "/services/roof-leak-repairs-brisbane",
  },
  {
    title: "瓦片屋顶维修",
    copy: "检查裂瓦、缺瓦、瓦片移位、脊瓦、谷槽和泛水，不先假设只需要更换一片瓦。",
    href: "/services/tile-roof-repairs-brisbane",
  },
  {
    title: "金属屋顶维修",
    copy: "检查松动固定件、板材接缝、局部锈蚀、穿透点和金属屋顶泛水问题。",
    href: "/services/metal-roof-repairs-brisbane",
  },
  {
    title: "风暴损坏屋顶维修",
    copy: "适合大雨、冰雹或强风后出现的新损坏，先区分安全处理、临时保护和永久维修。",
    href: "/services/storm-damage-roof-repairs-brisbane",
  },
  {
    title: "紧急屋顶维修",
    copy: "当水正在进入室内、屋面材料松动或天花下垂时，先处理人员和电气安全，再确认可安排的帮助。",
    href: "/services/emergency-roof-repairs-brisbane",
  },
  {
    title: "屋顶检查",
    copy: "当漏水来源、损坏范围或维修优先级不清楚时，从问题导向的屋顶检查开始。",
    href: "/services/roof-inspections-brisbane",
  },
  {
    title: "天沟清理",
    copy: "适合树叶、泥状有机物、青苔、积水或大雨时天沟溢流等屋面排水问题。",
    href: "/services/gutter-cleaning-brisbane",
  },
  {
    title: "屋顶翻新",
    copy: "当问题涉及较大范围的瓦面老化、准备、维修和新涂层时，另行评估整体屋顶翻新。",
    href: "/services/roof-restoration-brisbane",
  },
];

const advantages = [
  {
    title: "联系方便，有事能找到人",
    copy: "Mel One Property Maintenance Pty Ltd 接受 Greater Brisbane 屋顶维修咨询。电话和表单都可以直接联系，不需要在不同页面之间来回寻找。",
  },
  {
    title: "多年现场维修经验",
    copy: "团队处理过屋顶漏水、裂瓦、金属屋面、风暴损坏和排水问题，会根据实际屋况安排合适的检查和维修方向。",
  },
  {
    title: "不只看水痕位置",
    copy: "漏水点不一定就在水痕正上方。我们会结合屋顶材料、泛水、谷槽、固定件和穿透点寻找原因，再说明适合怎么处理。",
  },
  {
    title: "真实项目可以查看",
    copy: "网站展示 Mel One 自己拍摄的项目照片，包括完成的瓦屋顶翻新和烟道周边维修检查过程，并标明照片对应的施工阶段。",
  },
  {
    title: "漏水时先理清下一步",
    copy: "如果正在进水或刚发生风暴损坏，可以先打电话说明情况。团队会根据天气、安全、通道和当前安排告诉您接下来可以怎么做。",
  },
];

const faqs = [
  {
    question: "屋顶维修和屋顶翻新有什么不同？",
    answer:
      "屋顶维修针对漏水、裂瓦、泛水、固定件、局部锈蚀或风暴损坏等明确问题。屋顶翻新通常涉及较大范围的清洁、准备、维修和表面处理。需要根据实际屋顶状况决定，不能只凭表面现象判断。",
  },
  {
    question: "布里斯班屋顶漏水可以只凭照片报价吗？",
    answer:
      "照片可以帮助确认屋顶类型、可见损坏和紧急程度，但水可能沿着瓦片下方、木构件或保温材料移动。反复或隐藏的漏水通常需要安全现场检查后才能确认原因和范围。",
  },
  {
    question: "可以处理瓦片和金属屋顶吗？",
    answer:
      "网站分别提供瓦片屋顶和金属屋顶的问题路径。请说明屋顶材料；如果不确定，可以从地面安全拍摄屋面全景，不要为了确认材料自行爬上屋顶。",
  },
  {
    question: "紧急屋顶问题多久可以响应？",
    answer:
      "紧急屋顶电话 24 小时开放，团队通常数分钟内回复，布里斯班服务区域内两小时内可到场。屋顶是否能够安全进入仍取决于当时天气和现场条件。",
  },
  {
    question: "联系 Mel One 后，会怎样判断屋顶问题？",
    answer:
      "团队会先了解漏水症状、屋顶材料、问题出现时间和现场条件，再判断适合局部维修、临时保护还是进一步检查。网站也展示真实项目照片，方便您了解以往工作的实际情况。",
  },
  {
    question: "屋顶工作由合适资质的人员完成吗？",
    answer:
      "不同材料和工作范围可能适用不同许可、资质、承包或保险要求。具体范围和负责人员会在报价与安排前确认。",
  },
];

export default function ChineseRoofRepairsPage() {
  const pageUrl = business.siteUrl + path;
  const repairProject = projectCases[1];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": pageUrl + "#service",
    name: "布里斯班屋顶维修中文服务",
    serviceType: "Roof repair",
    inLanguage: "zh-Hans-AU",
    url: pageUrl,
    areaServed: [
      { "@type": "City", name: "Brisbane" },
      { "@type": "Place", name: "Greater Brisbane" },
    ],
    provider: {
      "@type": "Organization",
      name: business.brandName,
      legalName: business.legalName,
      telephone: business.phone,
      email: business.email,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "布里斯班屋顶维修服务",
      itemListElement: repairOptions.map((item) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item.title,
          url: business.siteUrl + item.href,
        },
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "zh-Hans-AU",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <PageShell>
      <article lang="zh-Hans-AU">
        <JsonLd data={serviceSchema} />
        <JsonLd data={faqSchema} />

        <PageHero
          eyebrow="布里斯班屋顶维修 · 中文咨询"
          title="布里斯班屋顶维修中文服务"
          description="屋顶漏水、裂瓦或缺瓦、金属屋顶渗漏与锈蚀、风暴损坏和紧急问题，需要不同的检查与维修路径。先说明您看到的症状、屋顶材料和所在 suburb，再确认下一步。"
          requestLabel="发送屋顶维修咨询"
        />

        <section className="section">
          <div className="shell narrow-intro">
            <p className="lead-copy">
              请提供布里斯班 suburb、物业层数、屋顶材料、问题何时出现，以及从地面或室内安全拍摄的照片。不要为了拍照爬上潮湿、陡峭或受损屋顶，也不要靠近电线、太阳能设备或下垂天花。
            </p>
            <p>
              <Link href={englishPath}>查看英文屋顶维修网站 →</Link>
            </p>
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="屋顶维修怎么开始"
              title="先找出漏水或损坏原因，再决定怎么修"
              copy="把问题出现的时间、屋顶材料和您看到的情况告诉我们。能用局部维修解决的，不会一开始就建议更大的工程。"
            />
            <div className="service-card-grid">
              {advantages.map((item) => (
                <article className="service-card" key={item.title}>
                  <h2>{item.title}</h2>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
            <div className="inline-actions">
              <a className="button button-yellow" href={"tel:" + business.phoneHref}>
                致电 {business.phone}
              </a>
              <Link className="button button-dark" href="/contact">
                填写屋顶维修表单
              </Link>
            </div>
          </div>
        </section>

        <section className="section section-pale">
          <div className="shell">
            <SectionHeading
              eyebrow="按问题选择维修服务"
              title="从您能看到的屋顶问题开始"
              copy="不需要自己诊断原因。选择最接近的情况；如果问题不清楚，可以先安排屋顶检查。"
            />
            <div className="service-card-grid">
              {repairOptions.map((item) => (
                <Link className="service-card" href={item.href} key={item.href}>
                  <span>屋顶维修服务</span>
                  <h2>{item.title}</h2>
                  <p>{item.copy}</p>
                  <strong>查看服务详情 →</strong>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-navy">
          <div className="shell split-section">
            <div>
              <p className="eyebrow">正在漏水或刚发生风暴损坏？</p>
              <h2>先确保人员安全，再处理屋顶维修。</h2>
            </div>
            <div className="urgent-copy">
              <p>
                不要进入积水区域，不要站在下垂天花下方，也不要接触受潮电器或电线。请从安全位置记录水痕、滴水时间和外部可见变化，再说明是否仍在进水。
                紧急屋顶电话 24 小时开放，团队通常数分钟内回复，布里斯班服务区域内两小时内可到场。
              </p>
              <div className="inline-actions">
                <Link
                  className="button button-yellow"
                  href="/services/emergency-roof-repairs-brisbane"
                >
                  查看紧急屋顶步骤
                </Link>
                <Link
                  className="text-link text-link-light"
                  href="/services/storm-damage-roof-repairs-brisbane"
                >
                  查看风暴损坏维修
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="从症状到维修范围"
              title="先确认原因，再决定修什么"
              copy="以下是常见流程；实际检查、材料、天气、通道和工作范围会影响安排。"
            />
            <ol className="process-grid">
              <li>
                <span>01</span>
                <h3>说明问题</h3>
                <p>提供 suburb、屋顶材料、漏水或损坏出现的时间，以及当前是否仍在进水。</p>
              </li>
              <li>
                <span>02</span>
                <h3>发送安全照片</h3>
                <p>地面外观、室内水痕和已知屋顶细节可以帮助准备合适的检查路径。</p>
              </li>
              <li>
                <span>03</span>
                <h3>检查可能原因</h3>
                <p>根据屋顶材料检查瓦片、固定件、接缝、谷槽、泛水、脊线和穿透点。</p>
              </li>
              <li>
                <span>04</span>
                <h3>确认维修范围</h3>
                <p>区分局部维修、临时保护、较大范围修复和整体翻新，并书面确认包含与不包含的项目。</p>
              </li>
            </ol>
          </div>
        </section>

        <section className="section section-project-feature">
          <div className="shell featured-project">
            <div className="project-compare" aria-label="真实布里斯班屋顶维修中项目">
              <figure>
                <div className="project-image-wrap">
                  <img
                    src={repairProject.coverImage}
                    alt={repairProject.coverAlt}
                    width="1080"
                    height="811"
                    loading="lazy"
                  />
                  <span>{repairProject.status}</span>
                </div>
                <figcaption>
                  原始维修中照片：瓦片被移开后，可检查烟道泛水和周边的进水路径。
                </figcaption>
              </figure>
            </div>
            <div className="featured-project-copy">
              <p className="eyebrow eyebrow-dark">真实屋顶维修记录</p>
              <h2>先打开相关位置检查，再确认永久维修范围</h2>
              <p className="lead-copy">
                这张 Greater Brisbane 客户项目照片记录了维修进行中的检查阶段。它不冒充完工结果，也不代表每个漏水问题都有相同原因。
              </p>
              <dl className="project-facts">
                <div>
                  <dt>屋顶类型</dt>
                  <dd>混凝土瓦屋顶</dd>
                </div>
                <div>
                  <dt>记录阶段</dt>
                  <dd>维修进行中</dd>
                </div>
                <div>
                  <dt>区域</dt>
                  <dd>Greater Brisbane</dd>
                </div>
              </dl>
              <Link
                className="button button-dark"
                href={"/projects#" + repairProject.slug}
              >
                查看真实项目记录
              </Link>
            </div>
          </div>
        </section>

        <section className="section section-pale">
          <div className="shell two-column-content">
            <div>
              <SectionHeading
                eyebrow="布里斯班服务范围"
                title="Petrie Terrace 与 Greater Brisbane"
                copy="是否可以受理取决于屋顶问题、物业通道、天气和当前安排。请先提供 suburb 和问题详情。"
              />
              <Link className="text-link" href="/service-areas">
                查看英文 Brisbane 服务区域
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="assessment-card">
              <p className="eyebrow eyebrow-dark">公司与联系资料</p>
              <h2>{business.legalName}</h2>
              <p>
                网站公开 ABN、ACN、布里斯班联系渠道和真实项目照片。具体屋顶材料、工作范围、适用资格和负责人员会在报价与安排前确认。
              </p>
              <a className="button button-yellow" href={"tel:" + business.phoneHref}>
                致电 {business.phone}
              </a>
            </div>
          </div>
        </section>

        <section className="section section-faq">
          <div className="shell faq-layout">
            <SectionHeading
              eyebrow="布里斯班屋顶维修常见问题"
              title="联系前需要知道的事"
            />
            <FaqList items={faqs} />
          </div>
        </section>

        <CtaBand
          eyebrow="中文屋顶维修咨询"
          title="先发送屋顶问题，不要自行爬上去检查"
          copy={"屋顶漏水或损坏，不确定该怎么修？致电说明问题并获取免费报价，我们会帮您判断合适的维修。"}
        />
      </article>
    </PageShell>
  );
}

