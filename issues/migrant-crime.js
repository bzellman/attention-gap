import { SLIDERS, ENGAGEMENT, VERDICTS, METHODOLOGY_NOTE, EPILOGUE_TAIL } from "./common.js";

export default {
  id: "migrant-crime",
  kicker: "Issue 05 · Migrant crime",
  title: "Migrant Crime",
  card: {
    value: "2.2 vs 3.0",
    label: "homicide convictions per 100k — undocumented vs native-born (Texas)",
    engine: "right",
    blurb: "The 2024 cycle’s dominant fear. The only state that actually tracks it found the feared group offends less."
  },

  perception: {
    heading: "Your read",
    lede: "Before any numbers: how does this issue — crime committed by immigrants, especially undocumented immigrants — sit with you right now?",
    sliders: SLIDERS,
    engagement: ENGAGEMENT
  },

  quiz: {
    heading: "Your footprint",
    lede: "Not opinions — exposure. “Immediate family” means partner, child, parent, or sibling.",
    questions: [
      { key: "victimViolent", text: "Have you been the victim of a violent crime in the past 5 years?",
        options: [ { label: "Yes", w: 15 }, { label: "No", w: 0 } ] },
      { key: "offenderImmigrant", text: "If yes — was the offender, to your actual knowledge (not inference), an immigrant?",
        options: [ { label: "Yes", w: 15 }, { label: "No / Not applicable", w: 0 }, { label: "Not sure", w: 3 } ] },
      { key: "familyVictim", text: "Has an immediate family member been the victim of a crime by an undocumented person, to your knowledge?",
        options: [ { label: "Yes", w: 15 }, { label: "No", w: 0 }, { label: "Not sure", w: 3 } ] },
      { key: "immigrantFamily", text: "Are you an immigrant, or is someone in your immediate family? (Enforcement policy regulates them directly — exposure runs both directions.)",
        options: [ { label: "Yes", w: 25 }, { label: "No", w: 0 } ] },
      { key: "border", text: "Do you live within 50 miles of the southern border?",
        options: [ { label: "Yes", w: 10 }, { label: "No", w: 0 } ] },
      { key: "professional", text: "Do you work in law enforcement, immigration courts, or border security?",
        options: [ { label: "Yes", w: 20 }, { label: "No", w: 0 } ] },
      { key: "knowDetained", text: "Do you personally know — in real life — anyone detained or deported?",
        options: [ { label: "Yes", w: 10 }, { label: "No", w: 0 } ] }
    ]
  },

  gap: { verdicts: VERDICTS, methodologyNote: METHODOLOGY_NOTE },

  calibration: {
    heading: "Calibrate",
    prompt: "Texas is the only state that records immigration status all the way through criminal conviction. Native-born Texans are convicted of homicide at 3.0 per 100,000 per year. What’s the rate for undocumented immigrants in Texas?",
    inputLabel: "Your guess (per 100,000 per year)",
    actual: 2.2,
    actualLabel: "per 100,000 — 26% below the native-born rate (2013–2022)",
    context: "Not a survey, not a model: state Department of Public Safety conviction records, analyzed by the libertarian Cato Institute. A 150-year census analysis (NBER) finds immigrants have never been incarcerated at higher rates than the US-born — not in any decade since 1870.",
    sourceNote: "Cato Institute analysis of Texas DPS records, 2013–2022; Abramitzky et al., NBER Working Paper 31440."
  },

  scale: {
    heading: "The scale",
    lede: "This one isn’t a needle hunt — it’s a rate comparison, so the field splits in two. Same scale, same decade, same crime, side by side.",
    fieldNote: "Two fields of 100,000 dots each — one dot per person. Left: native-born Texans, with their decade-average annual homicide convictions lit. Right: undocumented immigrants in Texas, same. The lit dots are rounded to whole people (3.0 → 3, 2.2 → 2). Scroll; the answer is at the end of both.",
    variant: "duel",
    duel: {
      a: { label: "Native-born Texans", total: 100000, highlights: 3, rateLabel: "3.0 per 100k" },
      b: { label: "Undocumented immigrants (TX)", total: 100000, highlights: 2, rateLabel: "2.2 per 100k" }
    },
    unit: 1,
    unitLabel: "people (each field)",
    counterLabel: "people passed, each field",
    highlightCounterLabel: "homicide convictions",
    skipLabel: "I believe the scroll — skip ahead",
    skipToDot: 97000,
    milestones: [
      { at: 15000, kicker: "15,000 people into both fields", body: "Why Texas? Because it’s the only state whose justice system records immigration status from arrest through conviction — and because no one accuses Texas of going easy on the question. The analysis is by the libertarian Cato Institute, from state DPS records." },
      { at: 50000, kicker: "Halfway up both fields", body: "The long view: economists matched 150 years of census records (1870–2020). In no decade — not one — have immigrants been incarcerated at a higher rate than the US-born. Today, legal immigrants are jailed at roughly a quarter of the native rate." },
      { at: 85000, kicker: "Nearly there", body: "Individual tragedies are real, and one carries a federal statute: the Laken Riley Act, the first law of the second Trump term, January 2025. Grief deserves names. Policy deserves rates. The two fields ahead show the rates." }
    ],
    reveal: {
      kicker: "There they are.",
      figure: "3 vs 2.",
      attribution: "— Annual homicide convictions per 100,000: native-born Texans 3.0, undocumented immigrants 2.2 (Texas DPS records, 2013–2022, via Cato).",
      note: "If anything, the lit dots are rarer on the feared side of the ledger. The 2024 campaign’s dominant theme asked voters to fear the right-hand field. Every murder in either field is a person whose family’s grief is total — and rates, not anecdotes, are how a country knows what to fear at scale."
    }
  },

  proportion: {
    heading: "The proportion",
    lede: "The loudest fear of the 2024 cycle, against the only conviction-level data any state keeps.",
    tiles: [
      { value: "2.2 vs 3.0", label: "homicide convictions per 100k: undocumented vs native-born", sub: "Texas DPS records 2013–2022, via Cato Institute" },
      { value: "26%", label: "less likely to be convicted of homicide (undocumented vs native)", sub: "Same analysis" },
      { value: "150 yrs", label: "of census data: immigrants never jailed at higher rates", sub: "Abramitzky et al., NBER 31440 (1870–2020)" },
      { value: "~74%", label: "lower incarceration rate for legal immigrants vs US-born", sub: "Cato, national incarceration analysis" },
      { value: "No. 1", label: "immigration’s rank among 2024 campaign themes", sub: "Dominant ad and rally topic of the cycle; Laken Riley Act signed Jan 2025" },
      { value: "47.8M", label: "immigrants living in the US — the feared field’s real size", sub: "Census Bureau, 2023" }
    ],
    epilogue: {
      heading: "What this means — and what it doesn’t",
      points: [
        "It does not mean no immigrant commits crimes, or that victims’ families owe anyone context. Individual cases are real, and some are monstrous. Nothing about a rate consoles the family inside an anecdote.",
        "It does mean the feared group offends less, by the best data any state keeps — collected by Texas and analyzed by libertarians, neither famous for immigrant sympathy. A fear that survives contact with its own side’s best evidence isn’t running on evidence.",
        ...EPILOGUE_TAIL
      ]
    }
  },

  sources: [
    { label: "Cato Institute — Illegal Immigrant Murderers in Texas, 2013–2022 (2.2 vs 3.0 per 100k)", date: "2024", url: "https://www.cato.org/policy-analysis/illegal-immigrant-murderers-texas-2013-2022", note: "Libertarian think tank analyzing official Texas DPS conviction records — the only state-level status-through-conviction data in the country." },
    { label: "Abramitzky, Boustan et al. — Law-Abiding Immigrants: The Incarceration Gap, 1870–2020 (NBER 31440)", date: "2023", url: "https://www.nber.org/papers/w31440" },
    { label: "Cato Institute — Illegal Immigrant Incarceration Rates, 2010–2024", date: "2025", url: "https://www.cato.org/briefing-paper/illegal-immigrant-incarceration-rates-2010-2024-demographics-american-imprisonment" },
    { label: "Congress.gov — Laken Riley Act (P.L. 119-1, first law of the 119th Congress)", date: "Jan 2025", url: "https://www.congress.gov/bill/119th-congress/senate-bill/5" },
    { label: "Census Bureau — foreign-born population (~47.8M)", date: "2023", url: "https://www.census.gov/topics/population/foreign-born.html" }
  ],
  sourcesNote: "Conviction rates undercount total offending everywhere, for everyone — the comparison is valid because the same justice system produced both numbers. Rounding in the fields (3.0→3, 2.2→2) slightly flatters the native-born side; exact rates are shown on the field labels."
};
