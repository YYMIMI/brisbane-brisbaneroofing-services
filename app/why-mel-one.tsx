type WhyMelOneProps = {
  locale?: "en" | "zh";
};

const COPY = {
  en: {
    eyebrow: "ROOF REPAIR ENQUIRIES",
    title: "The next step depends on the roof, weather and access.",
    intro: "The visible symptom, roof material, weather, access and safety conditions are checked before the repair path is confirmed.",
    items: [
      ["Urgent roof line", "Active leaks and storm damage can be reported by phone 24 hours a day."],
      ["Response for urgent work", "Urgent calls are normally answered within minutes, with a two-hour attendance target subject to weather and safe access."],
      ["Project examples", "Brisbane project photos show tile roof work and completed restoration stages."],
      ["Tile and metal roof work", "The enquiry is matched to the roof material and the problem being reported."],
    ],
  },
  zh: {
    eyebrow: "屋顶维修咨询",
    title: "屋顶材料、天气和通道都会影响下一步。",
    intro: "确认维修路径前，会查看可见症状、屋顶材料、天气、通道和安全条件。 ",
    items: [
      ["紧急屋顶电话", "正在漏水或出现风暴损坏时，可通过 24 小时电话说明情况。"],
      ["紧急情况响应", "紧急电话通常数分钟内回复，并以两小时内到场为目标；需视天气和安全通道而定。"],
      ["项目示例", "布里斯班项目照片展示瓦屋顶工作和已完成的翻新阶段。"],
      ["瓦屋顶与金属屋顶", "按实际屋顶材料和所述问题确认维修路径。"],
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
