type WhyMelOneProps = {
  locale?: "en" | "zh";
};

const COPY = {
  en: {
    eyebrow: "WHY CHOOSE MEL ONE",
    title: "Roof repair decisions based on the roof in front of us.",
    intro: "The visible symptom, roof material, weather, access and safety conditions all shape the right next step.",
    items: [
      ["24-hour urgent roof line", "Active leaks and storm damage can be reported by phone at any time."],
      ["Fast Brisbane response", "Urgent calls are answered within minutes with a two-hour attendance target, subject to weather and safe access."],
      ["Original Mel One projects", "Real Brisbane project photos show tile roof work and completed restoration stages."],
      ["Tile and metal pathways", "The enquiry is matched to the roof material and the problem rather than a one-size-fits-all package."],
    ],
  },
  zh: {
    eyebrow: "为什么选择 MEL ONE",
    title: "根据眼前屋顶的实际状况决定维修方向。",
    intro: "可见症状、屋顶材料、天气、通道和安全条件，都会影响下一步安排。",
    items: [
      ["24 小时紧急屋顶电话", "正在漏水或出现风暴损坏时，可随时致电说明情况。"],
      ["布里斯班快速响应", "紧急电话通常数分钟内回复，并以两小时内到场为目标；天气和安全通道条件适用。"],
      ["真实 Mel One 项目", "网站使用布里斯班真实项目照片，展示瓦屋顶工作和已完成的翻新阶段。"],
      ["瓦屋顶与金属屋顶分开判断", "按实际屋顶材料和问题选择维修路径，不套用同一种处理方案。"],
    ],
  },
} as const;

export function WhyMelOne({ locale = "en" }: WhyMelOneProps) {
  const copy = COPY[locale];
  return (
    <section className="why-mel-one" aria-labelledby={`why-mel-one-${locale}`}>
      <div className="shell why-mel-one-inner">
        <header className="why-mel-one-heading">
          <p className="eyebrow eyebrow-dark">{copy.eyebrow}</p>
          <h2 id={`why-mel-one-${locale}`}>{copy.title}</h2>
          <p>{copy.intro}</p>
        </header>
        <div className="why-mel-one-grid">
          {copy.items.map(([title, body], index) => (
            <article key={title}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
