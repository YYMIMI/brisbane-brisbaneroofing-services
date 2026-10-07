export type RoofSuburbGuide = {
  slug: string; name: string; title: string; description: string; intro: string;
  context: string; source: string;
  sections: { title: string; copy: string; checks: string[] }[];
  comparison: string; enquiry: string;
  services: { href: string; label: string; reason: string }[];
  faqs: { question: string; answer: string }[];
};

export const roofSuburbGuides: RoofSuburbGuide[] = [
  {
    slug: "sunnybank", name: "Sunnybank",
    title: "Sunnybank Roof Repair Enquiry & Inspection Guide",
    description: "Prepare a Sunnybank roof repair enquiry using leak timing, roof material and safe access details. Compare investigation and targeted repairs before wider restoration.",
    intro: "If water appears inside a Sunnybank home, record where and when it appears before choosing a roof repair. Mel One accepts Brisbane roof and gutter enquiries; an inspection determines the source, safe access and repair scope. Attendance is confirmed for the actual job, weather and team availability.",
    context: "Separate houses made up 85.8% of Sunnybank occupied private dwellings in the ABS 2021 Census. This historical context does not identify roof material, age or condition. For your house, explain the roof levels, the affected room and any access around the building.",
    source: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL32694",
    sections: [
      { title: "Follow the rain pattern, not only the ceiling mark", copy: "A ceiling mark may sit away from the roof entry point. Note whether water appears during a brief shower, sustained rain or rain from one direction, and whether a gutter overflows at the same time. These observations guide an inspection; they do not prove a tile, flashing or gutter fault.", checks: ["Photograph the affected room and mark location without opening the ceiling or touching wet fittings.", "Give the date and rain conditions of the latest event, plus any previous repair in that area.", "Describe the roof material only if known; safe ground-level views can help explain the layout."] },
      { title: "Decide between a targeted repair and broader work", copy: "A cracked tile, damaged flashing and general surface deterioration require different scope decisions. Ask what observed defect a proposed repair addresses. Cleaning, repainting or coating should not be treated as evidence that the leak source has been repaired.", checks: ["Ask whether findings support one defined repair or show several affected areas.", "Keep roof work, gutter work and interior drying or repainting identifiable in the quote.", "Include the roof height, clear ground access, solar equipment and any restricted side passage so access can be assessed."] },
    ],
    comparison: "Compare the identified repair location, materials, investigation limits, access method and any follow-up check. If wider restoration is proposed, ask why it is relevant to the inspected condition and which leak repairs are included. Describe continued occupancy so the team can discuss protection and access. Do not climb onto the roof to collect photos.",
    enquiry: "Sunnybank roof enquiry: water appears in [room/location] during [rain pattern]. The roof is [tile/metal/unknown] and the house has [levels]. Previous work was [details/none known]. Ground access is [description], with [solar/other constraints]. Please assess the likely inspection requirements and separate targeted repair from any optional wider roof work.",
    services: [
      { href: "/services/roof-leak-repairs-brisbane", label: "Roof leak repairs", reason: "For water entry and investigation of the source." },
      { href: "/services/tile-roof-repairs-brisbane", label: "Tile roof repairs", reason: "For known tiled-roof damage and repair choices." },
      { href: "/services/metal-roof-repairs-brisbane", label: "Metal roof repairs", reason: "For metal-sheet, fixing and flashing enquiries." },
    ],
    faqs: [
      { question: "Does a ceiling stain in Sunnybank mean I need a full roof restoration?", answer: "A stain does not establish the entry point or the extent of roof work. Describe rain timing and previous repairs, then ask the inspection findings to distinguish a targeted repair from any optional broader restoration." },
      { question: "Should gutter overflow be included in a roof leak enquiry?", answer: "Yes. Say where the gutter overflows and whether it happens when the indoor mark appears. Roof water entry and drainage overflow may need separate checks and separately described work; their timing alone does not establish the cause." },
      { question: "Can I get a final repair price from ground-level photos?", answer: "Photos can help the first discussion, but hidden details, roof access and material condition may require inspection. Confirm what can be assessed from the supplied information and what remains subject to a site check." },
    ],
  },
  {
    slug: "eight-mile-plains", name: "Eight Mile Plains",
    title: "Eight Mile Plains Roof Repair & Shared Access Guide",
    description: "Plan an Eight Mile Plains roof enquiry with approval contacts, shared-roof boundaries and safe access. Define inspection findings and compare roof repair scope.",
    intro: "A roof enquiry in Eight Mile Plains needs a clear description of the water entry and the person who can arrange access. If a roof is shared or managed, establish authorisation before a visit. Mel One confirms the particular roof task, safe access, weather and current availability before booking.",
    context: "In the ABS 2021 Census, 26.1% of occupied private dwellings in Eight Mile Plains were semi-detached, row or terrace houses and townhouses, while 64.4% were separate houses. This is historical context, not a statement that your roof is shared. For a townhouse or managed property, check the roof boundary and approval arrangements that apply to the address.",
    source: "https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL30950",
    sections: [
      { title: "Identify the roof section and the approval contact", copy: "Describe the affected room, roof edge or gutter and whether a neighbouring dwelling or common area is involved. An owner, property manager or body corporate may need to arrange permission for the specific work. Do not assume the visible roof boundary is the responsibility boundary.", checks: ["Say whether the property is a house, townhouse or unit and who manages it.", "Provide relevant roof plans, previous inspection notes or approved access instructions if already available.", "Identify who can authorise inspection, approve the written repair scope and receive the findings."] },
      { title: "Plan access without crossing unapproved areas", copy: "A restricted side passage, shared parking bay or higher roof section can change the access method. Tell the team what can be reached at ground level and what requires permission. The assessment should distinguish what was inspected from areas that could not be safely accessed.", checks: ["Describe gates, stairs, shared driveways and any loading or parking restrictions.", "Mention solar panels, skylights or other roof equipment from safe observations only.", "If water affects more than one dwelling, list each observed location and when it appears without diagnosing a shared cause."] },
    ],
    comparison: "For a managed-property quote, compare the same approved roof section and access scope. Ask for findings, proposed tile, sheet or flashing repairs, gutter work, access equipment and optional restoration to be distinguishable. Clarify who will receive the inspection record and approve any newly found work before it proceeds. Interior making-good may require a separate scope.",
    enquiry: "Eight Mile Plains roof enquiry: this is a [house/townhouse/unit], managed by [owner/manager]. Water appears at [room/roof edge] during [rain conditions]. Access involves [gate/shared driveway/height]. The approval contact is [role], and [plans/previous findings] are available. Please confirm task fit, access requirements and the inspection scope before arranging attendance.",
    services: [
      { href: "/services/roof-inspections-brisbane", label: "Roof inspection enquiries", reason: "For assessment records and defining the work needed." },
      { href: "/services/roof-leak-repairs-brisbane", label: "Roof leak repairs", reason: "For water entry in a defined roof area." },
      { href: "/services/gutter-cleaning-brisbane", label: "Gutter cleaning", reason: "For observed gutter debris or overflow, kept distinct from roof repairs." },
    ],
    faqs: [
      { question: "Who should arrange an Eight Mile Plains townhouse roof inspection?", answer: "Start with the person authorised to arrange access and the requirements for your property. Supply the owner, manager or body corporate instructions that apply. The roof boundary, approval contact and current task suitability need confirmation before booking." },
      { question: "Can one leaking room show a problem in a shared roof?", answer: "It may require investigation, but the wet room does not establish where water entered or who is responsible. Record each observed location and rain timing, then ask for inspected sections and any access limits to be documented." },
      { question: "What should a repair quote for a managed property distinguish?", answer: "Look for the approved roof section, findings, materials, safe access, proposed repairs and excluded work. Separate gutter cleaning, optional restoration and interior finishing. Confirm who approves further work if inspection uncovers additional damage." },
    ],
  },
];
