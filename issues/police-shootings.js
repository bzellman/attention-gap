import { SLIDERS, ENGAGEMENT, VERDICTS, METHODOLOGY_NOTE, EPILOGUE_TAIL } from "./common.js";

export default {
  id: "police-shootings",
  kicker: "Issue 03 · Police shootings of unarmed people",
  title: "Police Shootings",
  card: {
    value: "~100×",
    label: "average overestimate of unarmed police shootings",
    engine: "left",
    blurb: "The killings are real and each one is a person. The number in most people’s heads is two orders of magnitude from the documented count."
  },

  perception: {
    heading: "Your read",
    lede: "Before any numbers: how does this issue — police shootings of unarmed people — sit with you right now?",
    sliders: SLIDERS,
    engagement: ENGAGEMENT
  },

  quiz: {
    heading: "Your footprint",
    lede: "Not opinions — exposure. “Immediate family” means partner, child, parent, or sibling.",
    questions: [
      { key: "stopped", text: "In the past 5 years, have you been stopped by police — traffic or street?",
        options: [ { label: "Yes", w: 10 }, { label: "No", w: 0 } ] },
      { key: "weaponDrawn", text: "Has an officer ever drawn a weapon on you, or on an immediate family member?",
        options: [ { label: "Yes, on me", w: 30 }, { label: "On an immediate family member", w: 15 }, { label: "No", w: 0 }, { label: "Not sure", w: 5 } ] },
      { key: "officerFamily", text: "Are you — or is an immediate family member — a sworn law-enforcement officer?",
        options: [ { label: "Yes, I am", w: 30 }, { label: "An immediate family member is", w: 20 }, { label: "No", w: 0 } ] },
      { key: "forceUsed", text: "Have you — or has an immediate family member — been arrested with physical force used?",
        options: [ { label: "Yes, I have", w: 25 }, { label: "An immediate family member has", w: 15 }, { label: "No", w: 0 } ] },
      { key: "knowKilled", text: "Do you personally know — in real life — anyone killed or seriously injured by police?",
        options: [ { label: "Yes", w: 25 }, { label: "No", w: 0 } ] },
      { key: "neighborhood", text: "Does your daily routine pass through heavy, visible police enforcement activity?",
        options: [ { label: "Yes", w: 10 }, { label: "No", w: 0 } ] },
      { key: "professional", text: "Do you work in criminal justice, civil-rights law, or police oversight?",
        options: [ { label: "Yes", w: 15 }, { label: "No", w: 0 } ] }
    ]
  },

  gap: { verdicts: VERDICTS, methodologyNote: METHODOLOGY_NOTE },

  calibration: {
    heading: "Calibrate",
    prompt: "In a typical recent year, how many unarmed people — of all races — did American police fatally shoot? (Washington Post definition: no gun, knife, vehicle, or replica.)",
    inputLabel: "Your guess (people per year)",
    actual: 42,
    actualLabel: "per year — 421 people across the 2015–2024 decade (Washington Post Fatal Force)",
    context: "In one 2021 academic survey, the average respondent’s estimate for unarmed Black men alone was roughly 1,800 per year — about 100× the documented count for that group, which has ranged from single digits to a few dozen annually.",
    sourceNote: "Washington Post Fatal Force database (2015–2024); perception survey via Skeptic Research Center, 2021."
  },

  scale: {
    heading: "The scale",
    lede: "To see how rare any police shooting is — and how much rarer an unarmed one — you have to travel the denominator: contact with police itself.",
    fieldNote: "Below: the roughly 53.8 million Americans who have contact with police in a year (BJS Police–Public Contact Survey) — each dot is 100 people. At the end, eleven dots hold the ~1,100 people police shoot dead in a typical year. The unarmed among them wouldn’t fill half of one dot. Scroll.",
    variant: "field",
    total: 53800000,
    unit: 100,
    unitLabel: "police contacts",
    highlights: [ { dots: 11, tier: "bright", label: "killed by police gunfire (≈100 people per dot)" } ],
    counterLabel: "contacts passed",
    highlightCounterLabel: "fatal-shooting dots",
    skipLabel: "I believe the scroll — skip ahead",
    skipToDot: 528000,
    milestones: [
      { at: 20000, kicker: "Two million contacts in", body: "About one in five American adults has police contact in a given year — traffic stops mostly. You will pass your own dot somewhere in this field." },
      { at: 134500, kicker: "A quarter of the way", body: "The summer of 2020 produced the largest protest movement in American history — an estimated 15 to 26 million participants. The number at its center is eleven dots ahead of you." },
      { at: 269000, kicker: "Halfway", body: "The Washington Post counted every fatal police shooting in America for a decade — more than 10,000 — then shut the database down on January 1, 2025. Successor counts (Mapping Police Violence) continue, and 2024 was the highest year on record." },
      { at: 403500, kicker: "Three quarters", body: "The disparity, plainly: Black Americans are killed by police at roughly 2 to 2.8 times the per-capita rate of white Americans. A rare event can still be an unequal one. Both facts fit in the same field." },
      { at: 500000, kicker: "50 million contacts", body: "Almost there. Eleven dots hold everyone killed by police gunfire in a typical year. Hold your survey answer in your head — the average guess for unarmed Black men alone would light eighteen full dots." }
    ],
    reveal: {
      kicker: "There they are.",
      figure: "≈ 1,100 a year.",
      attribution: "— Washington Post Fatal Force count, of ~53.8 million annual police contacts. Eleven dots; each dot is 100 human beings.",
      note: "The unarmed subset of a typical year — around 42 people — would not fill half of one dot. Scope honesty: this module measures one narrow number because it’s the number people cite. Stops, searches, non-lethal force, and incarceration have footprints thousands of times wider than this field can show. Proportion cuts both ways."
    }
  },

  proportion: {
    heading: "The proportion",
    lede: "The event is rare, the disparity is real, and the public number is wrong by a couple of orders of magnitude. All three at once.",
    tiles: [
      { value: "53.8M", label: "Americans with police contact per year", sub: "BJS Police–Public Contact Survey" },
      { value: "~1,100", label: "fatal police shootings per year — 2024 was a record", sub: "Washington Post Fatal Force, 2015–2024 (10,000+ total)" },
      { value: "421", label: "unarmed people in the full 2015–2024 decade", sub: "Same database — roughly 42 per year, all races" },
      { value: "~100×", label: "average overestimate of the unarmed count", sub: "Skeptic Research Center survey, 2021 (~1,800/yr guessed for unarmed Black men alone)" },
      { value: "2–2.8×", label: "Black Americans’ per-capita rate vs white Americans", sub: "WaPo Fatal Force analysis — the disparity is real even when the count is misestimated" },
      { value: "15–26M", label: "participants in the 2020 protests — largest in US history", sub: "Crowd Counting Consortium estimates, summer 2020" }
    ],
    epilogue: {
      heading: "What this means — and what it doesn’t",
      points: [
        "It does not mean policing has no problem. The racial disparity in these shootings is documented in the same database that documents their rarity, and the far wider footprints of policing — stops, force, incarceration — are real, common, and not what this module measured.",
        "It does mean the specific number at the center of a national convulsion lives in most heads at 100× its documented size — and a movement built on a real injustice is weakened, not helped, when its central statistic can be fact-checked into a headline. Calibration is ammunition for whichever side has the truth.",
        ...EPILOGUE_TAIL
      ]
    }
  },

  sources: [
    { label: "Washington Post — Fatal Force database, 2015–2024 (10,000+ shootings; 421 unarmed; 2024 record)", date: "closed Jan 2025", url: "https://www.washingtonpost.com/graphics/investigations/police-shootings-database/" },
    { label: "BJS — Police–Public Contact Survey (~53.8M residents with police contact per year)", date: "2022 release", url: "https://bjs.ojp.gov/library/publications/contacts-between-police-and-public-2020" },
    { label: "Skeptic Research Center — public estimates of unarmed shootings (~100× documented count)", date: "2021", url: "https://www.skeptic.com/research-center/reports/Research-Report-CUPES-007.pdf" },
    { label: "City Journal — analysis of perception vs the WaPo database", date: "2021", url: "https://www.city-journal.org/article/fact-checking-the-washington-post-police-shooting-database" },
    { label: "Mapping Police Violence — successor count after WaPo’s database closed", date: "ongoing", url: "https://mappingpoliceviolence.org/" },
    { label: "Crowd Counting Consortium (via NYT) — 15–26M protest participants, summer 2020", date: "Jul 2020", url: "https://www.nytimes.com/interactive/2020/07/03/us/george-floyd-protests-crowd-size.html" }
  ],
  sourcesNote: "“Unarmed” uses the Post’s coding: no gun, knife, vehicle, or replica present. Reasonable people dispute edge cases in both directions; no defensible coding moves the total by more than a factor of two — the perception gap is a factor of a hundred."
};
