import { SLIDERS, ENGAGEMENT, VERDICTS, METHODOLOGY_NOTE, EPILOGUE_TAIL } from "./common.js";

export default {
  id: "the-ballot",
  kicker: "Issue 02 · Voter fraud & voter suppression",
  title: "The Ballot",
  card: {
    value: "< 475",
    label: "potential fraud cases in 25.5M battleground ballots",
    engine: "both",
    blurb: "Each coalition fears the other side’s ballot behavior. The AP hand-counted one monster; researchers can’t find the other at scale either."
  },

  perception: {
    heading: "Your read",
    lede: "This module runs both directions at once: fraud at the ballot box (the right’s fear) and suppression of eligible voters (the left’s). Answer for whichever version of the issue lives in your head — or both.",
    sliders: SLIDERS,
    engagement: ENGAGEMENT
  },

  quiz: {
    heading: "Your footprint",
    lede: "Not opinions — exposure, in either direction. “Immediate family” means partner, child, parent, or sibling.",
    questions: [
      { key: "witnessedFraud", text: "Have you personally witnessed someone cast, or attempt to cast, a ballot you knew to be fraudulent?",
        options: [ { label: "Yes", w: 30 }, { label: "No", w: 0 }, { label: "Not sure", w: 5 } ] },
      { key: "turnedAway", text: "Have you ever been turned away from voting, or had your registration rejected or purged, when you believed you were eligible?",
        options: [ { label: "Yes", w: 30 }, { label: "No", w: 0 }, { label: "Not sure", w: 5 } ] },
      { key: "electionWorker", text: "Do you — or does an immediate family member — work in election administration: poll worker, clerk, canvass board, election official?",
        options: [ { label: "Yes, I do", w: 25 }, { label: "An immediate family member does", w: 15 }, { label: "No", w: 0 } ] },
      { key: "familyEither", text: "Has an immediate family member experienced either of the first two?",
        options: [ { label: "Yes", w: 15 }, { label: "No", w: 0 }, { label: "Not sure", w: 5 } ] },
      { key: "documents", text: "Have you ever had to obtain new documents (ID, citizenship papers) specifically in order to vote?",
        options: [ { label: "Yes", w: 15 }, { label: "No", w: 0 } ] },
      { key: "knowCharged", text: "Do you personally know — in real life — anyone charged with or convicted of an election crime?",
        options: [ { label: "Yes", w: 10 }, { label: "No", w: 0 } ] },
      { key: "knowBlocked", text: "Do you personally know anyone who tried to vote and couldn’t?",
        options: [ { label: "Yes", w: 10 }, { label: "No", w: 0 }, { label: "Not sure", w: 3 } ] }
    ]
  },

  gap: { verdicts: VERDICTS, methodologyNote: METHODOLOGY_NOTE },

  calibration: {
    heading: "Calibrate",
    prompt: "The Heritage Foundation maintains America’s best-known database of proven election fraud — built specifically to document the problem. Across 44 years of American elections, every level, every state: how many proven cases does it hold?",
    inputLabel: "Your guess (number of cases)",
    actual: 1465,
    actualLabel: "proven cases, 1982–2023 — all elections, all states",
    context: "That’s the count from the organization most motivated to find them, spanning elections in which billions of ballots were cast. A citation against interest is the strongest kind.",
    sourceNote: "Heritage Foundation Election Fraud Database, as tallied late 2023."
  },

  scale: {
    heading: "The scale",
    lede: "In 2021 the Associated Press did what almost nobody arguing about this has done: went to every election office in all six disputed battlegrounds and counted.",
    fieldNote: "Below: the 25.5 million ballots cast in Arizona, Georgia, Michigan, Nevada, Pennsylvania, and Wisconsin in 2020 — each dot is 50 ballots. The AP found fewer than 475 potentially fraudulent ballots among them. That’s nine and a half dots; we lit ten, rounding the fear’s way. They’re at the end. Scroll.",
    variant: "field",
    total: 25500000,
    unit: 50,
    unitLabel: "ballots",
    highlights: [ { dots: 10, tier: "bright", label: "potential fraud (≈50 ballots per dot)" } ],
    counterLabel: "ballots passed",
    highlightCounterLabel: "fraud dots (≈50 ballots each)",
    skipLabel: "I believe the scroll — skip ahead",
    skipToDot: 501000,
    milestones: [
      { at: 5000, kicker: "A quarter-million ballots in", body: "The AP asked every county election official in all six states for every case of potential fraud they had identified. Roughly 80% of counties reported none at all. Every dot so far: clean." },
      { at: 127500, kicker: "6.4 million ballots", body: "More than Biden’s national popular-vote margin. Heritage’s own database — built to prove the problem exists — holds 1,465 proven cases. From 44 years of American elections. Combined." },
      { at: 255000, kicker: "Halfway — now the mirror", body: "The other coalition’s fear is suppression, not fraud. The most careful peer-reviewed estimates (Cantoni & Pons, QJE 2021) find strict ID laws have effects on turnout and fraud statistically indistinguishable from zero. Both monsters are small. Both fears are billboard-sized." },
      { at: 382500, kicker: "Three quarters", body: "The SAVE Act — proof-of-citizenship paperwork for all 160+ million registered voters — passed the House in April 2025 and again in February 2026, aimed at the dots you’re still hunting." },
      { at: 470000, kicker: "23.5 million ballots and counting", body: "The AP’s total came to 0.15% of Biden’s margin in those states — even if every case had been a real vote, counted, and for one side. Mostly, they weren’t counted at all." }
    ],
    reveal: {
      kicker: "There they are.",
      figure: "Fewer than 475.",
      attribution: "— Associated Press review of every potential 2020 fraud case in all six disputed battlegrounds (25.5 million ballots), December 2021. Ten dots, rounded up.",
      note: "Many were Trump voters; most ballots were flagged and never counted. For election clerks, fraud is a real, small part of the job. For everyone else it decided nothing — and consumed everything, up to and including January 6th."
    }
  },

  proportion: {
    heading: "The proportion",
    lede: "Attention on one side, documented footprint on the other — for both versions of the fear.",
    tiles: [
      { value: "25.5M", label: "ballots in the six disputed 2020 battlegrounds", sub: "AP canvass of 300+ local election offices, Dec 2021" },
      { value: "< 475", label: "potential fraud cases among them — 0.0019%", sub: "Same review; equal to 0.15% of the deciding margin" },
      { value: "1,465", label: "proven fraud cases in 44 years, nationwide", sub: "Heritage Foundation’s own database (late 2023) — citation against interest" },
      { value: "≈ 0", label: "detectable turnout effect of strict voter-ID laws", sub: "Cantoni & Pons, Quarterly Journal of Economics, 2021 — the suppression mirror" },
      { value: "2×", label: "House passages of the SAVE Act (2025, 2026)", sub: "Proof-of-citizenship paperwork for 160M+ registered voters; stalled in Senate" },
      { value: "~30%", label: "of Americans still believe 2020 was stolen", sub: "Consistent finding across major polls since 2021 — belief without documented footprint" }
    ],
    epilogue: {
      heading: "What this means — and what it doesn’t",
      points: [
        "It does not mean elections need no security, or that no one is ever wrongly turned away. Both happen; both are documented in the hundreds, not the millions. Systems that process 158 million ballots should investigate every case — and did.",
        "It does mean both coalitions have spent a decade organizing rage around numbers that fit in ten dots. Fraud fear produced January 6th and paperwork for 160 million people; suppression fear produced boycotts of a state that then set turnout records. The ballot is the rare issue where each side can run this module and feel the other side’s vertigo.",
        ...EPILOGUE_TAIL
      ]
    }
  },

  sources: [
    { label: "AP (via The Hill) — Fewer than 475 potential fraud cases across six 2020 battlegrounds", date: "Dec 2021", url: "https://thehill.com/homenews/presidential-campaign/585901-ap-finds-fewer-than-475-cases-of-potential-voter-fraud-in-six/" },
    { label: "PBS NewsHour — AP review: far too little fraud to tip the 2020 election", date: "Dec 2021", url: "https://www.pbs.org/newshour/politics/ap-review-finds-far-too-little-vote-fraud-to-tip-2020-election-to-trump" },
    { label: "Heritage Foundation — Election Fraud Database (~1,465 proven cases over 44 years, all elections)", date: "2023", url: "https://www.heritage.org/voterfraud", note: "Cited against interest — the database exists to document fraud." },
    { label: "Cantoni & Pons — Strict ID laws: no detectable effect on registration, turnout, or fraud (QJE)", date: "2021", url: "https://www.nber.org/papers/w25522" },
    { label: "Congress.gov — H.R.22, the SAVE Act (House passage; Senate status)", date: "2025–2026", url: "https://www.congress.gov/bill/119th-congress/house-bill/22" }
  ],
  sourcesNote: "“Potential” fraud means cases referred for review — the AP counted the broadest defensible set. The Heritage figure is that organization’s own tally, used here precisely because it is a ceiling claimed by the side most motivated to find more."
};
