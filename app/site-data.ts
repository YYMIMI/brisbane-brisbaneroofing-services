export type ServicePage = {
  slug: string;
  path: string;
  navLabel: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  description: string;
  intro: string;
  symptoms: string[];
  assessment: string[];
  nextSteps: string[];
  faqs: { question: string; answer: string }[];
};

export const business = {
  entityName: "Mel One Renovations",
  brandName: "Mel One Maintenance",
  siteName: "Mel One Roof Repairs Brisbane",
  siteUrl: "https://www.melonebrisbaneroofing.com.au",
  legalName: "Mel One Property Maintenance Pty Ltd",
  abn: "39 666 325 408",
  acn: "666 325 408",
  contactName: "Shan",
  phone: "0451 819 688",
  phoneHref: "+61451819688",
  email: "melone.maintenance3@gmail.com",
  serviceArea: "Greater Brisbane",
  serviceAreaFocus: "Petrie Terrace",
  googleMapsUrl:
    "https://www.google.com/maps/place/Mel+One+Renovations/@-27.4677227,153.0289747,17z/data=!4m6!3m5!1s0x6b915b94f91493e3:0xb7c3ba1146243943!8m2!3d-27.4677227!4d153.0289747!16s%2Fg%2F11zh9gk28p?hl=en",
  googleMapsEmbedUrl:
    "https://www.google.com/maps?q=Mel+One+Renovations,+40+Creek+St,+Brisbane+City+QLD+4000&output=embed",
  address: {
    street: "40 Creek St",
    locality: "Brisbane City",
    region: "QLD",
    postcode: "4000",
    country: "AU",
  },
  logo: "/brand/mel-one-roof-logo-512.png",
};

export const lastContentUpdate = "2026-08-17";

export const brandName = business.siteName;

export type ProjectCase = {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  status: string;
  roofType: string;
  location: string;
  coverImage: string;
  coverAlt: string;
  images: {
    src: string;
    alt: string;
    caption: string;
    stage: "Before" | "After" | "In progress";
  }[];
  work: string[];
};

export const projectCases: ProjectCase[] = [
  {
    slug: "concrete-tile-roof-restoration",
    eyebrow: "REAL BEFORE & AFTER PROJECT",
    title: "Concrete tile roof restoration around existing solar panels",
    summary:
      "Original site photos record the faded tile finish before work and the completed dark-grey finish across the connected roof sections, including roof areas beside existing solar arrays and vents.",
    status: "Completed project",
    roofType: "Concrete tile roof",
    location: "Greater Brisbane — customer suburb not published",
    coverImage:
      "/images/projects/tile-roof-restoration-after-overview.webp",
    coverAlt:
      "Completed dark-grey concrete tile roof restoration viewed along the main ridge",
    images: [
      {
        src: "/images/projects/tile-roof-restoration-before.webp",
        alt: "Faded brown concrete tile roof before restoration",
        caption:
          "Before: weathered tile finish across the main roof planes and ridge.",
        stage: "Before",
      },
      {
        src: "/images/projects/tile-roof-restoration-after-overview.webp",
        alt: "Dark-grey concrete tile roof after restoration",
        caption:
          "After: completed dark-grey finish across the main roof and ridge lines.",
        stage: "After",
      },
      {
        src: "/images/projects/tile-roof-restoration-before-wide.webp",
        alt: "Wide view of the concrete tile roof and solar panels before restoration",
        caption:
          "Before: the original finish around multiple roof sections and solar arrays.",
        stage: "Before",
      },
      {
        src: "/images/projects/tile-roof-restoration-after-solar.webp",
        alt: "Completed dark-grey tile roof finish around existing solar panels",
        caption:
          "After: restored roof finish beside the existing solar panels and roof vents.",
        stage: "After",
      },
      {
        src: "/images/projects/tile-roof-restoration-after-ridge.webp",
        alt: "Completed roof coating at concrete tile ridge and valley sections",
        caption:
          "After detail: consistent finish across intersecting roof planes and ridge capping.",
        stage: "After",
      },
      {
        src: "/images/projects/tile-roof-restoration-after-panels.webp",
        alt: "Completed dark-grey tile roof restoration beside a solar panel array",
        caption:
          "After detail: completed tile surface and ridge beside the solar array.",
        stage: "After",
      },
    ],
    work: [
      "Recorded the original weathered tile finish before work",
      "Restored the visible tile roof surfaces in a dark-grey finish",
      "Worked across connected roof planes around existing solar arrays, vents and penetrations",
      "Documented the finished ridge, valley and field-tile areas from multiple angles",
    ],
  },
  {
    slug: "flue-penetration-tile-repair",
    eyebrow: "REAL REPAIR-IN-PROGRESS",
    title: "Tile removal and investigation around a flue penetration",
    summary:
      "An original progress photo shows concrete tiles lifted around the flue and flashing area so the roof detail and water-entry path can be inspected before the final repair scope is confirmed.",
    status: "Repair in progress",
    roofType: "Concrete tile roof",
    location: "Greater Brisbane — customer suburb not published",
    coverImage:
      "/images/projects/flue-penetration-tile-repair-in-progress.webp",
    coverAlt:
      "Concrete roof tiles removed around a metal flue penetration during leak investigation",
    images: [
      {
        src: "/images/projects/flue-penetration-tile-repair-in-progress.webp",
        alt: "Lifted concrete roof tiles and exposed flashing around a flue penetration",
        caption:
          "In progress: tiles lifted to expose the flue flashing and surrounding roof detail for inspection.",
        stage: "In progress",
      },
    ],
    work: [
      "Opened the tile area around the flue penetration",
      "Exposed the existing flashing and surrounding tile detail",
      "Inspected the local roof assembly before defining the permanent repair",
      "Recorded the work-in-progress condition without presenting it as a completed outcome",
    ],
  },
  {
    slug: "blocked-gutter-cleaning",
    eyebrow: "REAL GUTTER CLEANING PROJECT",
    title: "Blocked gutter clearing beside tile and metal roof sections",
    summary:
      "Original site photos document dense leaf and organic buildup, moss, standing water and gutter clearing in progress around tile-roof edges and an adjoining metal-roof section. It is presented as in-progress work because no final result photo was supplied.",
    status: "Cleaning documented in progress",
    roofType: "Tile roof, metal roof junctions and perimeter gutters",
    location: "Greater Brisbane — customer suburb not published",
    coverImage:
      "/images/projects/gutter-cleaning-before-packed-debris.webp",
    coverAlt:
      "Perimeter gutter packed with leaves and organic debris before cleaning",
    images: [
      {
        src: "/images/projects/gutter-cleaning-before-packed-debris.webp",
        alt: "Blocked perimeter gutter packed with leaves and organic debris beside a low roof section",
        caption:
          "Before: dense organic material fills the narrow gutter below the fascia.",
        stage: "Before",
      },
      {
        src: "/images/projects/gutter-cleaning-in-progress-hose.webp",
        alt: "Gutter cleaning in progress with a hose and ladder beside the roof edge",
        caption:
          "In progress: the gutter run is being cleared with access and water equipment in place.",
        stage: "In progress",
      },
      {
        src: "/images/projects/gutter-cleaning-in-progress-long-run.webp",
        alt: "Long gutter run beside an older tile roof during clearing work",
        caption:
          "In progress: water and remaining material are visible along the long tile-roof gutter run.",
        stage: "In progress",
      },
      {
        src: "/images/projects/gutter-cleaning-before-roof-junction.webp",
        alt: "Heavy organic buildup in a gutter between tile and adjoining metal roof sections",
        caption:
          "Before: accumulated organic material is visible at the tile-roof and metal-roof junction.",
        stage: "Before",
      },
      {
        src: "/images/projects/gutter-cleaning-in-progress-water-check.webp",
        alt: "Water visible in a gutter channel beside concrete roof tiles during cleaning",
        caption:
          "In progress: the gutter channel is visible with water present after larger debris was moved.",
        stage: "In progress",
      },
    ],
    work: [
      "Recorded blocked gutter runs and roof-edge conditions before removal",
      "Removed accumulated leaves, soil-like organic matter and moss from accessible sections",
      "Used water during clearing and flow observation",
      "Worked along tile-roof edges and adjoining metal-roof junctions",
    ],
  },
];

export const services: ServicePage[] = [
  {
    slug: "roof-restoration-brisbane",
    path: "/services/roof-restoration-brisbane",
    navLabel: "Roof restoration",
    title: "Tile roof restoration in Brisbane",
    metaTitle: "Roof Restoration Brisbane | Real Tile Roof Project | Mel One",
    metaDescription:
      "Planning tile roof restoration in Brisbane? Compare a broad restoration with local repair, view a real project and prepare an inspection request.",
    eyebrow: "ROOF RESTORATION BRISBANE",
    description:
      "Broad concrete tile roof restoration planning, supported by original before-and-after project photography.",
    intro:
      "Choose roof restoration when the decision concerns preparation, repairs and a new finish across larger tile-roof areas. The roof condition, ridge details, penetrations, solar equipment and weather window all affect the scope. For one broken tile, a local ridge-capping defect or an isolated leak, start with the tile-repair or roof-leak service instead.",
    symptoms: [
      "A faded or weathered concrete tile finish",
      "Several roof planes showing similar age and surface wear",
      "Ridge, valley or tile repairs needed before coating",
      "A homeowner comparing local repairs with a broader restoration",
    ],
    assessment: [
      "Concrete or terracotta tile construction and overall condition",
      "Repairs and preparation required before restoration work",
      "Ridges, valleys, vents, flues and roof penetrations",
      "Solar arrays, safe access and suitable drying conditions",
    ],
    nextSteps: [
      "Share the Brisbane suburb and safe overview photos",
      "Identify the tile type and any known leak or repair history",
      "Arrange an inspection of the roof surface and repair needs",
      "Review the preparation, repair and finish stages as one defined scope",
    ],
    faqs: [
      {
        question: "Is roof restoration the same as a local roof repair?",
        answer:
          "No. A local repair addresses a defined defect. Restoration is a broader, multi-stage scope that may include preparation, repairs and a new finish across larger roof areas.",
      },
      {
        question: "Can a tile roof be restored around existing solar panels?",
        answer:
          "The supplied Mel One project shows completed restoration work around existing solar arrays. Access and any electrical or solar work must still be separated and assigned to the appropriately licensed trade where required.",
      },
      {
        question: "How long does a tile roof restoration take?",
        answer:
          "It is normally a multi-day, weather-dependent project. Roof size, preparation, repairs, drying, solar equipment and the selected finish determine the confirmed programme.",
      },
    ],
  },
  {
    slug: "roof-leak-repairs-brisbane",
    path: "/services/roof-leak-repairs-brisbane",
    navLabel: "Roof leak repairs",
    title: "Roof leak repairs in Brisbane",
    metaTitle: "Roof Leak Repairs Brisbane | Leak Diagnosis | Mel One",
    metaDescription:
      "Roof leak or flashing problem in Brisbane? See how tile and metal roof water entry is assessed, what affects the quote and how to request an inspection.",
    eyebrow: "ROOF LEAK REPAIRS BRISBANE",
    description:
      "Leak diagnosis and repair planning for Brisbane tile and metal roofs, including valleys, flashing, penetrations and wind-driven rain.",
    intro:
      "Choose this service when the main problem is water entering the property or a suspected valley, flashing or penetration defect. The indoor drip point may not sit directly below the roof defect because water can track along battens, rafters or insulation. If there is no active or recurring leak and the issue is only one damaged tile, start with the tile-repair service instead.",
    symptoms: [
      "Ceiling stains that grow after heavy rain",
      "Drips near lights, vents, skylights or wall junctions",
      "Leaks that appear only when wind drives rain from one direction",
      "Recurring moisture after an earlier patch repair",
    ],
    assessment: [
      "Rain direction and timing of the leak",
      "Valleys, flashings, ridge caps and roof penetrations",
      "Broken tiles or metal sheet laps and fasteners",
      "Internal moisture path where access is safe",
    ],
    nextSteps: [
      "Move belongings away from the affected area",
      "Do not climb onto a wet or storm-damaged roof",
      "Photograph the internal stain and exterior area from ground level",
      "Request an inspection when the source remains unclear",
    ],
    faqs: [
      {
        question: "Why does my roof leak only during heavy rain?",
        answer:
          "Wind-driven rain can enter gaps that stay dry in light rain. Valleys, flashing, penetrations and tile laps are common investigation points, but the source must be checked on the actual roof.",
      },
      {
        question: "Can you diagnose a roof leak from photos?",
        answer:
          "Photos can help triage the problem and identify the roof type, but they may not confirm the full water path. An on-site inspection is often needed for recurring or hidden leaks.",
      },
      {
        question: "Should I enter the roof space to look for the leak?",
        answer:
          "Do not enter a roof space unless it is safe and the electrical requirements are understood. Queensland safety guidance requires careful electrical risk control before roof-space entry.",
      },
    ],
  },
  {
    slug: "gutter-cleaning-brisbane",
    path: "/services/gutter-cleaning-brisbane",
    navLabel: "Gutter cleaning",
    title: "Gutter cleaning for blocked Brisbane roof drainage",
    metaTitle: "Gutter Cleaning Brisbane | Blocked Gutters | Mel One",
    metaDescription:
      "Blocked gutters in Brisbane? See real gutter cleaning photos, common drainage problems, service steps, likely timing and quote factors.",
    eyebrow: "GUTTER CLEANING BRISBANE",
    description:
      "Practical gutter clearing for leaf, organic and moss buildup around Brisbane tile, metal and mixed roof sections.",
    intro:
      "A blocked gutter can hold standing water and overflow at the roof edge, but cleaning alone does not prove that every drainage problem is fixed. The gutter run, outlets, downpipes, roof junctions and any damaged sections need to be considered together.",
    symptoms: [
      "Leaves, soil-like material or plants visible in the gutter",
      "Water spilling over the gutter during heavy rain",
      "Standing water remaining after rain",
      "Moss and organic buildup around roof edges or junctions",
    ],
    assessment: [
      "Gutter length, height, roof pitch and safe access",
      "Roof material and adjoining tile or metal roof sections",
      "Outlets, downpipe flow and signs of standing water",
      "Damage, poor fall or capacity issues that cleaning alone may not solve",
    ],
    nextSteps: [
      "Share the Brisbane suburb and safe photos of the affected gutter",
      "Stay off the roof and do not lean from upper-storey windows",
      "Confirm which gutter runs and flow checks are included in the scope",
      "Arrange a separate assessment if overflow continues after clearing",
    ],
    faqs: [
      {
        question: "How often should gutters be cleaned in Brisbane?",
        answer:
          "There is no useful single schedule for every home. Nearby trees, roof shape, gutter profile, exposure and how quickly organic material returns all affect the interval. Regular visual checks are more reliable than assuming the same interval for every property.",
      },
      {
        question: "Are downpipes included with gutter cleaning?",
        answer:
          "The quoted scope should state whether outlet flow checks or downpipe clearing are included. Removing material from the gutter does not automatically mean a blocked or damaged downpipe has been dismantled or repaired.",
      },
      {
        question: "Will cleaning stop every gutter overflow?",
        answer:
          "Not always. Overflow can also involve gutter capacity, fall, outlet size, downpipe restriction, damaged sections or water arriving from a roof junction. Persistent overflow needs a separate drainage assessment.",
      },
    ],
  },
  {
    slug: "emergency-roof-repairs-brisbane",
    path: "/services/emergency-roof-repairs-brisbane",
    navLabel: "Emergency roof help",
    title: "Urgent help for active roof leaks",
    metaTitle: "Emergency Roof Repairs Brisbane | Active Leak Help | Mel One",
    metaDescription:
      "Active roof leak or recent storm damage in Brisbane? Follow immediate safety steps and contact Mel One for availability and weatherproofing options.",
    eyebrow: "EMERGENCY ROOF REPAIRS BRISBANE",
    description:
      "A clear urgent-response path for active water entry, loose roofing and storm-related roof damage in Brisbane.",
    intro:
      "An urgent roof problem is first about making the property safe and limiting further water entry. Response availability depends on weather, safe access and crew capacity; this site does not claim a fixed 24-hour arrival time.",
    symptoms: [
      "Water actively entering living areas",
      "Tiles, flashing or roof sheets displaced by wind",
      "A ceiling visibly sagging or holding water",
      "Roof damage close to electrical fittings or solar equipment",
    ],
    assessment: [
      "Whether anyone is at immediate risk",
      "Active water entry and proximity to electrical equipment",
      "Loose material that may fall or become windborne",
      "Whether temporary weatherproofing is safe and appropriate",
    ],
    nextSteps: [
      "Keep people away from the affected area",
      "Stay off the roof, especially in rain or high winds",
      "Follow official Queensland emergency and electrical-safety guidance",
      "Send the suburb, roof type, photos and a short description of what is happening",
    ],
    faqs: [
      {
        question: "Is every roof leak an emergency?",
        answer:
          "A small historic stain may be suitable for a planned inspection. Active water entry, sagging ceilings, loose roofing or water near electrical fittings requires more urgent safety attention.",
      },
      {
        question: "Do you guarantee a 24/7 response?",
        answer:
          "No fixed 24/7 response or arrival-time guarantee is published. Mel One confirms availability after checking the suburb, current weather, safe access and crew capacity.",
      },
      {
        question: "What should I send with an urgent request?",
        answer:
          "Send the suburb, whether water is actively entering, the roof material if known, and safe ground-level or internal photos. Do not climb onto the roof to take photos.",
      },
    ],
  },
  {
    slug: "storm-damage-roof-repairs-brisbane",
    path: "/services/storm-damage-roof-repairs-brisbane",
    navLabel: "Storm damage",
    title: "Storm-damaged roof assessment and repair",
    metaTitle: "Storm Damage Roof Repairs Brisbane | Assessment | Mel One",
    metaDescription:
      "Storm-damaged roof in Brisbane? See what to document, how urgent work differs from permanent repair, likely timeframes and quote factors.",
    eyebrow: "STORM DAMAGE ROOF REPAIRS BRISBANE",
    description:
      "A structured path from immediate safety and documentation to roof assessment after heavy rain, hail or damaging wind.",
    intro:
      "Storm damage can involve more than one roof component. The useful first step is to document visible changes from a safe location, protect people and belongings, and separate urgent weatherproofing from permanent repair work.",
    symptoms: [
      "New leaks after hail, wind or intense rain",
      "Broken or missing tiles and disturbed ridge capping",
      "Lifted metal sheets, flashings or roof-edge components",
      "Debris impact or damage around solar and roof penetrations",
    ],
    assessment: [
      "Pre-storm and post-storm condition where evidence exists",
      "Visible impact, displacement and water-entry points",
      "Temporary protection needs",
      "Permanent repair scope and documentation requirements",
    ],
    nextSteps: [
      "Follow current official weather and emergency advice",
      "Photograph damage from a safe position",
      "Keep relevant dates and insurer reference details together",
      "Request an assessment once conditions allow safe access",
    ],
    faqs: [
      {
        question: "Should roof damage be inspected before an insurance claim?",
        answer:
          "Insurer requirements vary. Keep photos, dates and any temporary-protection records, and ask your insurer what evidence they need before permanent work begins.",
      },
      {
        question: "Can temporary weatherproofing be done during a storm?",
        answer:
          "Work should only proceed when conditions and access are safe. Do not climb onto a wet roof or attempt a repair during damaging weather.",
      },
      {
        question: "What if solar panels or cables are affected?",
        answer:
          "Keep away from damaged solar panels, batteries and wiring. Follow Queensland electrical-safety guidance and use appropriately licensed specialists.",
      },
    ],
  },
  {
    slug: "tile-roof-repairs-brisbane",
    path: "/services/tile-roof-repairs-brisbane",
    navLabel: "Tile roof repairs",
    title: "Tile roof repairs in Brisbane",
    metaTitle: "Tile Roof Repairs Brisbane | Tiles & Ridge Capping | Mel One",
    metaDescription:
      "Cracked tiles, loose ridge capping or a tile-roof leak in Brisbane? View real project photos, assessment steps, likely timeframes and quote factors.",
    eyebrow: "TILE ROOF REPAIRS BRISBANE",
    description:
      "Local tile-roof repair assessment for cracked or slipped tiles, ridge capping and damage around nearby roof details.",
    intro:
      "Choose tile roof repairs for individual damaged or missing tiles, local ridge-capping defects and nearby roof details. A leak may still involve valleys, flashing or penetrations, so the surrounding area and water path must be checked. If the work concerns preparation and a new finish across broad roof areas, start with the roof-restoration service instead.",
    symptoms: [
      "Cracked, chipped, slipped or missing tiles",
      "Loose or deteriorated ridge capping",
      "Leaks around valleys, flashing or roof penetrations",
      "Debris or impact damage after a storm",
    ],
    assessment: [
      "Tile profile and availability of compatible replacement tiles",
      "Condition around the damaged tile, not only the visible break",
      "Ridge, valley and flashing details",
      "Signs that water has travelled before appearing indoors",
    ],
    nextSteps: [
      "Identify whether the roof is concrete or terracotta tile if known",
      "Photograph the affected area from ground level",
      "Record when the leak appears and from which room",
      "Arrange safe inspection and a defined repair scope",
    ],
    faqs: [
      {
        question: "Does one broken tile always cause a leak?",
        answer:
          "Not always, and a leak may also have more than one cause. The surrounding tiles, underlay, valleys, flashing and water path should be considered.",
      },
      {
        question: "Can an old roof tile be matched?",
        answer:
          "That depends on the profile, material, condition and availability. A site inspection can help identify a compatible repair approach.",
      },
      {
        question: "Is re-pointing the same as replacing tiles?",
        answer:
          "No. Re-pointing addresses ridge-capping mortar and flexible pointing, while tile replacement addresses individual damaged or missing tiles. The required scope depends on what is failing.",
      },
    ],
  },
  {
    slug: "metal-roof-repairs-brisbane",
    path: "/services/metal-roof-repairs-brisbane",
    navLabel: "Metal roof repairs",
    title: "Metal roof repairs in Brisbane",
    metaTitle: "Metal Roof Repairs Brisbane | Leaks & Rust | Mel One",
    metaDescription:
      "Metal roof leak, loose fasteners or localised rust in Brisbane? Review the repair scope, quote factors and next steps before requesting an inspection.",
    eyebrow: "METAL ROOF REPAIRS BRISBANE",
    description:
      "Metal roof repair assessment for leaks, loose sheets, failed fasteners, flashing defects and localised corrosion.",
    intro:
      "Choose metal roof repairs when the roof material is metal and the concern involves sheets, fasteners, laps, flashing, penetrations or localised corrosion. Water can travel beneath a sheet, so the indoor drip point may not identify the exterior source. Broader replacement or specialist trade work is separated from a local repair scope after inspection.",
    symptoms: [
      "Rust staining or localised corrosion",
      "Loose, backed-out or failed fasteners",
      "Leaks around sheet laps, flashing or penetrations",
      "Lifted or damaged sheets after high wind",
    ],
    assessment: [
      "Metal profile and condition of adjacent sheets",
      "Fasteners, washers, laps and flashing",
      "Compatibility of repair materials",
      "Safe access around solar panels and electrical equipment",
    ],
    nextSteps: [
      "Share clear photos of the roof profile from a safe location",
      "Note whether the issue follows wind-driven rain",
      "Avoid walking on damaged or wet metal roofing",
      "Confirm whether local repair or broader sheet work is appropriate",
    ],
    faqs: [
      {
        question: "Can a rusted metal roof be patched?",
        answer:
          "A local repair may be suitable in some cases, but the remaining metal condition and the cause of corrosion matter. A patch should not hide a broader failure.",
      },
      {
        question: "Why do metal roof screws leak?",
        answer:
          "Fasteners and washers can loosen, deteriorate or sit incorrectly. Movement, age and installation details can all contribute, so the surrounding sheet and fixing pattern should be checked.",
      },
      {
        question: "Do you work around solar panels?",
        answer:
          "Solar equipment changes the access and electrical-safety requirements. The repair scope must identify when a suitably licensed solar or electrical specialist is needed.",
      },
    ],
  },
  {
    slug: "roof-inspections-brisbane",
    path: "/services/roof-inspections-brisbane",
    navLabel: "Roof inspections",
    title: "Roof inspections that start with the problem",
    metaTitle: "Roof Inspections Brisbane | Leak Assessment | Mel One",
    metaDescription:
      "Request a Brisbane roof inspection for leaks, visible damage or storm concerns. See the inspection process, likely timeframes and quote factors.",
    eyebrow: "ROOF INSPECTIONS BRISBANE",
    description:
      "A problem-focused inspection pathway for leaks, visible roof damage, storm concerns and repair planning.",
    intro:
      "A useful roof inspection should answer a decision: what is causing the problem, what needs attention now, and what can be monitored or planned. It should not be a generic list disconnected from the reason you asked for help.",
    symptoms: [
      "A leak source that is not obvious from indoors",
      "Visible roof wear before a repair or maintenance decision",
      "New concerns after severe weather",
      "Recurring problems after an earlier repair",
    ],
    assessment: [
      "The homeowner's description and timing of the issue",
      "Roof material, pitch, access and safety constraints",
      "Relevant flashings, valleys, penetrations and drainage paths",
      "Clear separation of observations, likely causes and recommended next steps",
    ],
    nextSteps: [
      "Explain the problem and the decision you need to make",
      "Share safe photos and any earlier repair information",
      "Confirm the inspection scope before attendance",
      "Use the findings to define repair priorities",
    ],
    faqs: [
      {
        question: "What should a roof inspection cover?",
        answer:
          "The scope should match the concern. For a leak, that means the likely water path and relevant roof details. For storm damage, it may also include visible displacement, impact and documentation.",
      },
      {
        question: "Will I receive photos?",
        answer:
          "The current project library demonstrates before, in-progress and after photography. Confirm the exact inspection photo or written-report deliverable when booking because it depends on the requested scope.",
      },
      {
        question: "Can an inspection be done in bad weather?",
        answer:
          "Roof access depends on safe conditions. Some information can be gathered indoors or from the ground, but wet, windy or storm-damaged roofs may require the inspection to be delayed.",
      },
    ],
  },
];

export type ServiceContext = {
  brisbaneContext: string;
  localProblems: string[];
  timeline: {
    stage: string;
    timing: string;
    detail: string;
  }[];
  quoteFactors: string[];
  capability: {
    title: string;
    summary: string;
    evidence: string[];
  };
};

export const serviceContextBySlug: Record<string, ServiceContext> = {
  "roof-restoration-brisbane": {
    brisbaneContext:
      "Brisbane tile roofs can show widespread surface wear after long exposure to sun, rain and seasonal storms. A restoration decision should consider the whole roof condition, required repairs, preparation, drying time and the details around ridges, valleys, vents, flues and existing solar arrays.",
    localProblems: [
      "Faded or weathered concrete tile surfaces across several connected roof planes",
      "Broken tiles, ridge or valley details that need repair before surface work",
      "Preparation and coating access around flues, vents and existing solar arrays",
      "Drying and application windows affected by Brisbane weather",
    ],
    timeline: [
      {
        stage: "Roof overview",
        timing: "Before attendance",
        detail:
          "The suburb, roof size, tile type, known leaks and safe overview photos help prepare the inspection.",
      },
      {
        stage: "Condition and repair assessment",
        timing: "One scheduled visit",
        detail:
          "Tiles, ridges, valleys, penetrations, access and surrounding roof condition are checked before the restoration scope is defined.",
      },
      {
        stage: "Preparation and repairs",
        timing: "One or more working days",
        detail:
          "The actual roof determines the cleaning, preparation, repair and drying stages required before the finish is applied.",
      },
      {
        stage: "Finish and completion check",
        timing: "Part of a multi-day scope",
        detail:
          "Suitable weather, drying time, roof complexity and work around solar equipment control the final programme.",
      },
    ],
    quoteFactors: [
      "Concrete or terracotta tile type and total roof area",
      "Preparation, cleaning and repair work required before finishing",
      "Roof height, pitch, access and safety setup",
      "Ridge length, valleys, vents, flues and intersecting roof planes",
      "Existing solar panels and specialist coordination where required",
    ],
    capability: {
      title: "A completed restoration documented from before to after",
      summary:
        "The Mel One project library records the original weathered concrete tile surface and the completed dark-grey finish across connected roof planes around existing solar arrays, vents, ridges and valleys.",
      evidence: [
        "Two original before photographs and four completed roof photographs",
        "Completed dark-grey finish across connected concrete tile roof planes",
        "Work documented beside existing solar panels, vents, ridges and valleys",
        "Only the visible project stages and supplied details are described",
      ],
    },
  },
  "roof-leak-repairs-brisbane": {
    brisbaneContext:
      "A Brisbane roof leak may appear only during heavy or wind-driven rain. The indoor drip point can be lower than the exterior defect because water travels along battens, rafters or insulation. Valleys, ridge details, flashings and penetrations therefore need to be checked against the direction and timing of the rain.",
    localProblems: [
      "Ceiling marks that return during heavy Brisbane rain but stay dry in light showers",
      "Water entry near flues, vents, skylights, solar equipment or wall junctions",
      "Leaks below valleys or ridge intersections where water can travel before appearing indoors",
      "Recurring moisture after an earlier surface seal or patch did not address the water path",
    ],
    timeline: [
      {
        stage: "Leak triage",
        timing: "Before the visit",
        detail:
          "Photos, the room location, rain direction and whether water is entering now help separate urgent safety issues from planned diagnosis.",
      },
      {
        stage: "Leak-source inspection",
        timing: "One scheduled visit where safe",
        detail:
          "Relevant exterior details and accessible internal signs are compared; hidden water paths may need further investigation.",
      },
      {
        stage: "Targeted repair",
        timing: "Commonly several hours to one day",
        detail:
          "Timing depends on access, the failed detail and whether matching tile, flashing or fixing material is available.",
      },
      {
        stage: "Verification",
        timing: "After repair or the next suitable rain event",
        detail:
          "Recurring or wind-direction leaks may require observation or follow-up after the repair.",
      },
    ],
    quoteFactors: [
      "How difficult the water path is to trace",
      "Roof height, pitch and safe access to the suspected area",
      "Tiles, flashing, valley, membrane or metal components involved",
      "Whether internal ceiling or insulation damage is outside the roof scope",
      "Urgent temporary protection versus the permanent repair",
    ],
    capability: {
      title: "Leak investigation that exposes the detail when needed",
      summary:
        "The supplied project photos show the Mel One team lifting concrete tiles around a flue penetration to inspect the existing flashing and surrounding assembly before defining the permanent repair.",
      evidence: [
        "Original in-progress photograph of an opened flue penetration detail",
        "Assessment of the flashing, surrounding tiles and likely water path",
        "Triage based on rain timing, interior symptoms and roof material",
        "No completed-result claim is made from an in-progress image",
      ],
    },
  },
  "gutter-cleaning-brisbane": {
    brisbaneContext:
      "Brisbane gutters can collect leaves, bark, soil-like organic material and moss from surrounding vegetation. During intense rain, a restricted run or outlet may hold water and overflow at the eaves. On homes with joined tile and metal roof sections, the junction and the amount of water arriving at one gutter run also need to be considered.",
    localProblems: [
      "Leaf and organic buildup packed into narrow perimeter gutters",
      "Standing water along gutter runs after rain",
      "Moss and debris accumulating below tile edges and around roof junctions",
      "Overflow that may involve outlets, downpipes, gutter fall or capacity as well as cleaning",
    ],
    timeline: [
      {
        stage: "Photo and access review",
        timing: "Before attendance",
        detail:
          "The suburb, storey height, roof type, visible buildup and safe access help define the cleaning scope.",
      },
      {
        stage: "Gutter condition check",
        timing: "At the start of the visit",
        detail:
          "Accessible runs, roof-edge junctions, outlets and visible standing water are reviewed before material is removed.",
      },
      {
        stage: "Debris removal and flow observation",
        timing: "Often several hours for a straightforward accessible home",
        detail:
          "Timing changes with gutter length, buildup volume, roof height, access and disposal requirements.",
      },
      {
        stage: "Separate repair recommendation",
        timing: "If cleaning exposes another issue",
        detail:
          "Damaged gutters, poor fall, restricted downpipes or roof-junction defects are identified separately rather than presented as automatically repaired.",
      },
    ],
    quoteFactors: [
      "Total gutter length and number of separate roof sections",
      "Single or multi-storey access, roof pitch and required safety controls",
      "Volume and type of leaf, soil-like or moss buildup",
      "Tile, metal or mixed roof edges and difficult junctions",
      "Whether outlet or downpipe checks, disposal or separate repairs are included",
    ],
    capability: {
      title: "Real gutter clearing across mixed roof-edge conditions",
      summary:
        "The supplied Mel One project record shows blocked perimeter gutters, heavy organic buildup at tile and metal roof junctions, equipment in place during cleaning and water present during flow observation. It is documented as in-progress work rather than a claimed finished outcome.",
      evidence: [
        "Original before photographs of dense leaf and organic buildup",
        "In-progress photographs with ladder, hose and accessible gutter runs",
        "Work shown beside tile-roof edges and an adjoining metal-roof section",
        "Cleaning work kept separate from downpipe or gutter repairs not shown in the supplied record",
      ],
    },
  },
  "emergency-roof-repairs-brisbane": {
    brisbaneContext:
      "Urgent Brisbane roof enquiries commonly follow active water entry, severe rain, wind movement or debris impact. The first decision is not cosmetic repair—it is whether people, ceilings, electrical fittings, solar equipment or loose roofing are creating an immediate safety risk.",
    localProblems: [
      "Active water entry near lights, power points or ceiling cavities",
      "Sagging ceiling areas after intense rain",
      "Loose tiles, ridge material, flashing or sheets after damaging wind",
      "Temporary weather protection needed before a permanent repair can be scoped",
    ],
    timeline: [
      {
        stage: "Safety and availability check",
        timing: "At first contact",
        detail:
          "The team confirms the suburb, active hazards, weather conditions and whether safe attendance is possible. No fixed 24/7 arrival promise is made.",
      },
      {
        stage: "Temporary protection",
        timing: "When conditions and access are safe",
        detail:
          "The immediate goal may be to limit further water entry; temporary work is kept separate from the final scope.",
      },
      {
        stage: "Permanent assessment",
        timing: "After the roof can be inspected safely",
        detail:
          "The damaged component and surrounding roof condition are reviewed before permanent materials and labour are priced.",
      },
      {
        stage: "Permanent repair",
        timing: "Confirmed after inspection",
        detail:
          "Weather, material availability, access equipment and specialist trade requirements control the programme.",
      },
    ],
    quoteFactors: [
      "Active hazards and the need for temporary weatherproofing",
      "Weather conditions and whether safe roof access is possible",
      "Height, pitch, loose materials and access equipment",
      "Extent of tile, metal, flashing or penetration damage",
      "Separate electrical, solar, ceiling or insurer requirements",
    ],
    capability: {
      title: "Urgent triage without an invented response-time promise",
      summary:
        "Mel One accepts Greater Brisbane roof enquiries and separates immediate safety, temporary protection and permanent repair. Attendance remains subject to weather, safe access, suburb and crew availability.",
      evidence: [
        "Problem-led triage for active leaks and storm-related roof damage",
        "Clear separation of temporary weather protection from permanent work",
        "Escalation to Queensland emergency services or licensed electrical specialists when the hazard sits outside roof repair scope",
        "No unverified 24/7 or guaranteed-arrival claim",
      ],
    },
  },
  "storm-damage-roof-repairs-brisbane": {
    brisbaneContext:
      "Brisbane storms can combine intense rain, wind and debris. A useful post-storm inspection records what changed, identifies loose or displaced components and distinguishes immediate protection from the permanent roof repair and any insurer documentation.",
    localProblems: [
      "Broken or moved tiles and disturbed ridge capping",
      "Lifted metal sheets, flashings or roof-edge components",
      "New water entry around valleys, solar panels, vents or other penetrations",
      "Debris impact and multiple defects across more than one roof plane",
    ],
    timeline: [
      {
        stage: "Safe documentation",
        timing: "As soon as conditions allow",
        detail:
          "Ground-level and internal photographs, the storm date and visible changes are recorded without climbing onto the roof.",
      },
      {
        stage: "Damage assessment",
        timing: "After severe weather has passed",
        detail:
          "Safe access, displacement, impact points and water-entry risks are reviewed.",
      },
      {
        stage: "Temporary measures",
        timing: "If required and safe",
        detail:
          "Short-term protection is documented separately so it is not mistaken for the permanent repair.",
      },
      {
        stage: "Permanent work",
        timing: "Scheduled after scope and materials are confirmed",
        detail:
          "Large weather events may affect material supply, crew availability and safe working windows.",
      },
    ],
    quoteFactors: [
      "Number of affected roof planes and components",
      "Temporary protection already installed or still required",
      "Tile matching, metal profile availability and disposal",
      "Access, safety controls and debris removal",
      "Photographic records or insurer-requested scope detail",
    ],
    capability: {
      title: "Separate the weather event, temporary work and final repair",
      summary:
        "The Mel One process records visible conditions and keeps urgent protection distinct from the permanent scope. This avoids presenting a quick patch as the full storm repair.",
      evidence: [
        "Original project photography showing the condition and work stage",
        "Assessment pathways for tile, ridge, flashing, metal and penetration damage",
        "Clear scope separation for solar or electrical equipment",
        "Permanent work confirmed only after safe inspection",
      ],
    },
  },
  "tile-roof-repairs-brisbane": {
    brisbaneContext:
      "Concrete and terracotta tile roofs across Greater Brisbane can present with cracked or displaced tiles, ageing ridge details, valley issues and leaks around penetrations. The current Mel One project library includes real examples: a concrete tile restoration around solar arrays and an opened flue detail during leak investigation.",
    localProblems: [
      "Faded or weathered concrete tile surfaces requiring a broader restoration decision",
      "Cracked, chipped, slipped or missing individual tiles",
      "Ridge capping, valley and flashing defects",
      "Leaks around flues, vents and solar-panel roof areas",
    ],
    timeline: [
      {
        stage: "Tile profile and defect check",
        timing: "At inspection",
        detail:
          "The team identifies concrete or terracotta construction, matching-tile needs and the surrounding roof condition.",
      },
      {
        stage: "Local tile or flashing repair",
        timing: "Often several hours to one day",
        detail:
          "Timing depends on access, tile availability and whether the defect is isolated.",
      },
      {
        stage: "Ridge or multi-area work",
        timing: "One or more working days",
        detail:
          "The length of ridge, preparation needs and the number of affected roof planes control the programme.",
      },
      {
        stage: "Roof restoration and coating",
        timing: "Commonly a multi-day, weather-dependent scope",
        detail:
          "Preparation, drying and coating stages require suitable conditions and are confirmed for the actual roof.",
      },
    ],
    quoteFactors: [
      "Concrete or terracotta tile type and availability of compatible replacements",
      "Number of damaged tiles and length of affected ridge or valley",
      "Roof pitch, storeys, access and safety setup",
      "Solar panels, flues, vents and other penetrations",
      "Local repair versus broader cleaning, preparation and coating scope",
    ],
    capability: {
      title: "Concrete tile restoration and repair examples",
      summary:
        "The Mel One project library documents the team working across a connected concrete tile roof around solar arrays, vents, ridges and valleys, plus an in-progress inspection around a flue penetration.",
      evidence: [
        "Two original before photographs and four completed roof photographs",
        "Dark-grey finished surface across connected concrete tile roof planes",
        "Work documented beside existing solar panels and roof vents",
        "Tiles lifted to expose a flue flashing detail during leak investigation",
      ],
    },
  },
  "metal-roof-repairs-brisbane": {
    brisbaneContext:
      "Metal roof leaks in Greater Brisbane are commonly investigated around fasteners and washers, sheet laps, flashings, penetrations and local corrosion. Wind-driven rain can travel beneath the sheet, so the indoor drip point alone is not enough to define the repair.",
    localProblems: [
      "Backed-out or deteriorated fasteners and washers",
      "Local corrosion, rust staining or damaged sheet edges",
      "Leaks at sheet laps, flashings and penetrations",
      "Lifted or displaced sheets following high wind",
    ],
    timeline: [
      {
        stage: "Profile and access check",
        timing: "At inspection",
        detail:
          "The roof profile, sheet condition, fasteners, flashings and nearby solar equipment are reviewed.",
      },
      {
        stage: "Local fastener or flashing work",
        timing: "Often several hours to one day",
        detail:
          "This guide depends on safe access and the problem being limited to a defined area.",
      },
      {
        stage: "Sheet replacement",
        timing: "One or more working days",
        detail:
          "Sheet length, profile matching, lifting access and weather can increase the programme.",
      },
      {
        stage: "Specialist coordination",
        timing: "Confirmed with the scope",
        detail:
          "Solar or electrical disconnection is handled separately by the appropriately licensed trade where required.",
      },
    ],
    quoteFactors: [
      "Metal profile, sheet length and availability",
      "Fastener quantity, flashing detail and extent of corrosion",
      "Roof pitch, height, access and lifting requirements",
      "Solar arrays, wiring and other roof penetrations",
      "Local component repair versus full-sheet replacement",
    ],
    capability: {
      title: "Scope the metal detail before assigning the work",
      summary:
        "Mel One assesses metal-roof enquiries by roof profile, failed component, access and specialist requirements. The current photo library does not include a metal-roof case, so this page explains assessment and scoping without using an unrelated project image.",
      evidence: [
        "Fastener, sheet-lap, flashing and corrosion assessment pathway",
        "Repair-versus-sheet-replacement decision based on surrounding condition",
        "Solar and electrical work separated from the roof scope",
        "Assigned trade and required licence scope confirmed after inspection",
      ],
    },
  },
  "roof-inspections-brisbane": {
    brisbaneContext:
      "A Greater Brisbane roof inspection should answer the homeowner's actual decision: where water is entering, what weather changed, what needs attention now and what can be planned. It should not treat every roof as the same checklist.",
    localProblems: [
      "A ceiling stain with no obvious exterior source",
      "Condition checks after intense rain, wind or debris",
      "Recurring issues after an earlier repair",
      "Uncertainty about local repair, restoration or broader replacement work",
    ],
    timeline: [
      {
        stage: "Pre-inspection brief",
        timing: "Before attendance",
        detail:
          "The concern, roof type, suburb, previous work and safe photos define the inspection focus.",
      },
      {
        stage: "Site inspection",
        timing: "One scheduled visit where safe",
        detail:
          "The relevant roof areas, access constraints and visible internal signs are reviewed.",
      },
      {
        stage: "Findings and priorities",
        timing: "After the inspection",
        detail:
          "Observations are separated from likely causes, immediate priorities and planned work.",
      },
      {
        stage: "Follow-up scope",
        timing: "If hidden or weather-dependent",
        detail:
          "A recurring leak may require further access, an opened detail or observation during a suitable rain event.",
      },
    ],
    quoteFactors: [
      "Targeted leak inspection versus broader condition review",
      "Roof size, pitch, storeys and safe-access requirements",
      "Number of roof planes, penetrations and problem areas",
      "Need for opened details, specialist access or further testing",
      "Level of photographic or written documentation requested",
    ],
    capability: {
      title: "Problem-led inspection with original project documentation",
      summary:
        "Mel One uses the homeowner's symptom and roof type to focus the inspection. The existing case library demonstrates before, in-progress and after photography rather than stock images presented as completed work.",
      evidence: [
        "Original before-and-after photography for a concrete tile restoration",
        "In-progress documentation around a flue penetration",
        "Inspection scope matched to leaks, storm concerns or repair planning",
        "Specialist trade requirements identified separately from the roof inspection scope",
      ],
    },
  },
};

export const serviceRegions = [
  {
    name: "Inner Brisbane",
    suburbs: [
      "Petrie Terrace",
      "Brisbane City",
      "Spring Hill",
      "Paddington",
      "Red Hill",
      "Milton",
      "Auchenflower",
      "West End",
      "South Brisbane",
      "New Farm",
    ],
  },
  {
    name: "Brisbane Northside",
    suburbs: [
      "Ashgrove",
      "Alderley",
      "Everton Park",
      "Stafford",
      "Kedron",
      "Chermside",
      "Nundah",
      "Windsor",
      "Clayfield",
    ],
  },
  {
    name: "Brisbane Southside",
    suburbs: [
      "Coorparoo",
      "Carindale",
      "Holland Park",
      "Mount Gravatt",
      "Moorooka",
      "Tarragindi",
      "Sunnybank",
      "Eight Mile Plains",
    ],
  },
  {
    name: "Brisbane West",
    suburbs: [
      "Toowong",
      "Indooroopilly",
      "Kenmore",
      "Chapel Hill",
      "The Gap",
      "Jindalee",
      "Oxley",
      "Fig Tree Pocket",
    ],
  },
  {
    name: "Brisbane East & Bayside",
    suburbs: [
      "Bulimba",
      "Morningside",
      "Cannon Hill",
      "Tingalpa",
      "Wakerley",
      "Wynnum",
      "Manly",
    ],
  },
];

export const mainNav = [
  { label: "Services", href: "/services" },
  { label: "Roof Types", href: "/roof-types" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function getServiceByPath(path: string) {
  return services.find((service) => service.path === path);
}
