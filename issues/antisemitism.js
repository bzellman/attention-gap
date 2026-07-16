import { SLIDERS, ENGAGEMENT, VERDICTS, METHODOLOGY_NOTE, EPILOGUE_TAIL } from "./common.js";

export default {
  id: "antisemitism",
  kicker: "Issue 07 · Antisemitism in America",
  title: "Antisemitism in America",
  card: {
    value: "1,938",
    label: "FBI anti-Jewish hate crimes in 2024 — a record, again",
    engine: "both",
    blurb: "The one module where the line goes up. The trend is real and recently lethal; the instrument measures the danger’s shape, not whether to care."
  },

  perception: {
    heading: "Your read",
    lede: "Before any numbers: how does this issue — antisemitism in the United States — sit with you right now? One honest note first: unlike most issues in this instrument, the measured trend here is genuinely rising. Answer as you are.",
    sliders: SLIDERS,
    engagement: ENGAGEMENT
  },

  quiz: {
    heading: "Your footprint",
    lede: "Not opinions — exposure. “Immediate family” means partner, child, parent, or sibling.",
    questions: [
      { key: "jewish", text: "Are you Jewish, or is someone in your immediate family?",
        options: [ { label: "Yes", w: 30 }, { label: "No", w: 0 } ] },
      { key: "targeted", text: "In the past two years, have you — or has an immediate family member — been targeted (slur, threat, harassment, vandalism) for being, or being taken to be, Jewish?",
        options: [ { label: "Yes, personally", w: 30 }, { label: "An immediate family member was", w: 15 }, { label: "No", w: 0 } ] },
      { key: "institution", text: "Has a synagogue, school, or Jewish institution you attend hired armed security, or been threatened or vandalized?",
        options: [ { label: "Yes", w: 20 }, { label: "No", w: 0 }, { label: "Not sure", w: 5 } ] },
      { key: "knowVictim", text: "Do you personally know — in real life — a victim of an antisemitic assault?",
        options: [ { label: "Yes", w: 15 }, { label: "No", w: 0 } ] },
      { key: "concealed", text: "Have you altered visible Jewish identity in public — kippah, jewelry, Hebrew — out of safety concern?",
        options: [ { label: "Yes", w: 20 }, { label: "No", w: 0 }, { label: "Not applicable", w: 0 } ] },
      { key: "campus", text: "Did you personally witness antisemitic harassment during the 2023–25 campus protest wave? (If you were targeted yourself, that’s already counted above.)",
        options: [ { label: "Yes", w: 10 }, { label: "No", w: 0 } ] },
      { key: "witnessed", text: "If you’re not Jewish: have you ever witnessed an antisemitic act in person?",
        options: [ { label: "Yes", w: 5 }, { label: "No / Not applicable", w: 0 } ] }
    ]
  },

  gap: { verdicts: VERDICTS, methodologyNote: METHODOLOGY_NOTE },

  trend: {
    heading: "First, the truth about the direction",
    note: "FBI-reported anti-Jewish hate crime incidents (single-bias). Reporting participation by police agencies varies by year; the recent climb outpaces any reporting artifact. This instrument does not flatten rising lines.",
    unit: "incidents",
    series: [
      { year: 2014, value: 609 },
      { year: 2016, value: 684 },
      { year: 2018, value: 835 },
      { year: 2020, value: 676 },
      { year: 2022, value: 1124 },
      { year: 2023, value: 1832 },
      { year: 2024, value: 1938 }
    ],
    sourceNote: "FBI Hate Crime Statistics, 2014–2024. 2024 is the highest count since records began in 1991 — the fourth consecutive record."
  },

  calibration: {
    heading: "Calibrate",
    prompt: "The ADL logged a record 9,354 antisemitic incidents in 2024 — its broadest count, spanning harassment, vandalism, and assault. How many of the 9,354 were physical assaults?",
    inputLabel: "Your guess (assaults in 2024)",
    actual: 196,
    actualLabel: "physical assaults — about 2% of incidents; harassment and vandalism are the other 98%",
    context: "Calibration here isn’t about whether the threat is real — the FBI’s stricter criminal count set a record the same year, and 2025 brought murders in Washington and Boulder. It’s about the danger’s shape: overwhelmingly harassment and property crime, with violence rare but rising (FBI: assaults up 21% in 2024).",
    sourceNote: "ADL Audit of Antisemitic Incidents 2024; FBI Hate Crime Statistics 2024."
  },

  scale: {
    heading: "The scale",
    lede: "Hold both truths while you scroll: the line above is rising, and the field below is enormous.",
    fieldNote: "Below: America’s 7.5 million Jews — each dot is 15 people. Scattered through the whole field, dim marks: the ADL’s 9,354 incidents of 2024, its broadest count (≈624 marks, as if each incident touched a distinct set of 15 people — a simplification in fear’s favor). At the end, bright marks: the 196 physical assaults (≈13). Scroll.",
    variant: "field",
    total: 7500000,
    unit: 15,
    unitLabel: "Jewish Americans",
    highlights: [
      { dots: 624, tier: "dim", label: "ADL incidents 2024 (broadest count)" },
      { dots: 13, tier: "bright", label: "physical assaults 2024" }
    ],
    counterLabel: "people passed",
    highlightCounterLabel: "incident-marks",
    skipLabel: "I believe the scroll — skip ahead",
    skipToDot: 470000,
    milestones: [
      { at: 40000, kicker: "600,000 people in", body: "Say the direction plainly: FBI-recorded anti-Jewish hate crimes set records in 2022, 2023, and 2024. Jews are about 2% of Americans and absorbed roughly 69% of religion-based hate crimes in 2024. Nothing in this field disputes the line — the field is about its denominator." },
      { at: 160000, kicker: "2.4 million people", body: "2025 was lethal: two young people murdered outside the Capital Jewish Museum in Washington in May; a firebomb attack in Boulder in June killed one. Some dots in this field are gone. That is what ‘rare but rising’ means, and why nobody gets to wave this module at a grieving community." },
      { at: 300000, kicker: "Halfway", body: "Methodology, in the open: the ADL’s 9,354 includes some anti-Israel protest expression under criteria it broadened after October 7 — contested, including by Jewish critics. The FBI’s narrower criminal count (1,938) set a record anyway. We show both, labeled." },
      { at: 430000, kicker: "6.5 million people", body: "The shape of the 9,354: mostly harassment and vandalism. Physical assaults: 196 — up 21% by the FBI’s count, and still roughly 1 for every 38,000 Jewish Americans in a year. Fear rounds up; that is fear’s job. An instrument’s job is the actual shape." }
    ],
    reveal: {
      kicker: "Both things are true.",
      figure: "Record highs. Rare events.",
      attribution: "— FBI: 1,938 anti-Jewish hate crimes in 2024, the fourth consecutive record. ADL: 9,354 incidents, 196 of them assaults, across 7.5 million people.",
      note: "This is the module that proves the instrument isn’t a debunking machine: the trend is real, rising, and recently murderous — and one person’s annual odds of antisemitic assault were roughly 1 in 38,000. Calibration is not comfort. It’s knowing the danger’s actual shape, so vigilance goes where it protects people instead of where it merely burns."
    }
  },

  proportion: {
    heading: "The proportion",
    lede: "Rising line, vast denominator, concentrated pain — all three on the table at once.",
    tiles: [
      { value: "1,938", label: "FBI anti-Jewish hate crimes, 2024 — record, 4th straight", sub: "FBI Hate Crime Statistics; +5.8% over 2023, assaults +21%" },
      { value: "69%", label: "of religion-based hate crimes target Jews — 2% of the population", sub: "FBI 2024" },
      { value: "9,354", label: "incidents in ADL’s broadest 2024 count", sub: "Record; methodology broadened post-Oct 7 — disclosed and contested" },
      { value: "196", label: "physical assaults among them (~2%)", sub: "ADL Audit 2024 — the violent core, rare and rising" },
      { value: "3", label: "killed in antisemitic attacks, 2025 (DC and Boulder)", sub: "Capital Jewish Museum shooting, May 2025; Boulder firebombing, June 2025" },
      { value: "77%", label: "of American Jews felt less safe after Oct 7, 2023", sub: "AJC State of Antisemitism survey — the fear is measured too, and it is rational to the trend" }
    ],
    epilogue: {
      heading: "What this means — and what it doesn’t",
      points: [
        "It does not mean the alarm is overblown in direction. This is the instrument’s control case in reverse: a fear whose line genuinely rises, whose 2025 dead have names, and whose stakeholders — who will score high on the exposure quiz — are calibrated, not captured.",
        "It does mean shape still matters. A community planning security budgets, and a country arguing about campus policy and deportations in this issue’s name, are both better served by ‘harassment-heavy, violence rare but up 21%’ than by an undifferentiated siren — because resources aimed at the actual shape protect actual people.",
        ...EPILOGUE_TAIL
      ]
    }
  },

  sources: [
    { label: "ADL press release — FBI 2024: anti-Jewish hate crimes at record 1,938, ~69% of religion-based", date: "Aug 2025", url: "https://www.adl.org/resources/press-release/anti-jewish-hate-crimes-comprised-nearly-70-all-religion-based-hate-crimes" },
    { label: "Axios — FBI 2024 hate crime data release", date: "Aug 2025", url: "https://www.axios.com/2025/08/05/hate-crimes-2024-black-antisemitism-muslim-fbi" },
    { label: "ADL — Audit of Antisemitic Incidents 2024 (9,354; 196 assaults)", date: "Apr 2025", url: "https://www.adl.org/resources/report/audit-antisemitic-incidents-2024", note: "Advocacy organization; post-Oct 7 methodology broadening disclosed above." },
    { label: "Jewish Currents — critical examination of the ADL audit methodology", date: "2024", url: "https://jewishcurrents.org/the-adls-antisemitism-findings-explained", note: "Included so the count’s main critique is one click away." },
    { label: "Pew Research Center — 7.5 million US Jews (2.5% of population)", date: "2021", url: "https://www.pewresearch.org/religion/2021/05/11/the-size-of-the-u-s-jewish-population/" },
    { label: "AJC — State of Antisemitism in America (77% feel less safe post-Oct 7)", date: "2024", url: "https://www.ajc.org/news/ajc-antisemitism-has-become-part-of-american-jews-daily-life" }
  ],
  sourcesNote: "Two counts are shown throughout and never merged: the FBI’s (criminal incidents reported by police agencies — stricter, undercounts by design) and the ADL’s (self-reports plus media plus its contested post-2023 criteria — broader, ceiling by design). The truth is bracketed between them, and both set records in 2024."
};
