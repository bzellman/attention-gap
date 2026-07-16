import { SLIDERS, ENGAGEMENT, VERDICTS, METHODOLOGY_NOTE, EPILOGUE_TAIL } from "./common.js";

export default {
  id: "gas-stoves",
  kicker: "Issue 06 · The gas-stove ban that never was",
  title: "The Gas-Stove Ban",
  card: {
    value: "0",
    label: "stoves banned or confiscated, of 47 million households",
    engine: "right",
    blurb: "One commissioner’s interview, one 48-hour walk-back, two acts of Congress, months of airtime — zero stoves. The control group of this whole instrument."
  },

  perception: {
    heading: "Your read",
    lede: "Before any numbers: how does this issue — the government coming for your gas stove — sit with you right now? Answer from memory of how it felt, not what you suspect the punchline is.",
    sliders: SLIDERS,
    engagement: ENGAGEMENT
  },

  quiz: {
    heading: "Your footprint",
    lede: "Not opinions — exposure. Yes, we’re really asking.",
    questions: [
      { key: "ownStove", text: "Do you own a gas stove?",
        options: [ { label: "Yes", w: 10 }, { label: "No", w: 0 } ] },
      { key: "contacted", text: "Has any government agent, at any level, ever contacted you about your stove?",
        options: [ { label: "Yes", w: 30 }, { label: "No", w: 0 } ] },
      { key: "panicBought", text: "Did you buy, stockpile, or accelerate replacing a stove because of the ban talk?",
        options: [ { label: "Yes", w: 15 }, { label: "No", w: 0 } ] },
      { key: "industry", text: "Do you work for a gas utility, appliance maker, or restaurant that cooks on gas?",
        options: [ { label: "Yes", w: 20 }, { label: "No", w: 0 } ] },
      { key: "newConstruction", text: "Are you a builder or landlord actually subject to a new-construction electrification code (New York’s 2026 rule, Berkeley-style ordinances)? This is the issue’s one real regulatory footprint.",
        options: [ { label: "Yes", w: 25 }, { label: "No", w: 0 }, { label: "Not sure", w: 5 } ] },
      { key: "asthma", text: "Does a child in your home have asthma, with a gas stove in the kitchen? (The health question that started all of this is real.)",
        options: [ { label: "Yes", w: 15 }, { label: "No", w: 0 } ] },
      { key: "replacedHealth", text: "Have you replaced a stove over indoor-air-quality concerns?",
        options: [ { label: "Yes", w: 10 }, { label: "No", w: 0 } ] }
    ]
  },

  gap: { verdicts: VERDICTS, methodologyNote: METHODOLOGY_NOTE },

  calibration: {
    heading: "Calibrate",
    prompt: "Since the uproar began in January 2023: how many American gas stoves have been banned, confiscated, or scheduled for removal by the federal government?",
    inputLabel: "Your guess (stoves)",
    actual: 0,
    actualLabel: "stoves — no ban was ever proposed, drafted, or docketed",
    context: "One CPSC commissioner mused about future options in a Bloomberg interview on January 9, 2023. The commission’s chair and the White House both disavowed a ban within 48 hours. The House passed two protective bills anyway, and the segment ran for months.",
    sourceNote: "CPSC statements, Jan 11, 2023; H.R. 1615 and H.R. 1640, passed June 2023."
  },

  scale: {
    heading: "The scale",
    lede: "Every other module in this instrument asks you to find a small number in a large field. This one is different, and that difference is the point.",
    fieldNote: "Below: America’s 47.1 million gas-stove households — each dot is 100 of them. Somewhere in this field are the stoves the federal government banned. Scroll and find them. Take your time.",
    variant: "field",
    total: 47100000,
    unit: 100,
    unitLabel: "gas-stove households",
    highlights: [],
    counterLabel: "households passed",
    highlightCounterLabel: "stoves banned",
    skipLabel: "I see where this is going — skip ahead",
    skipToDot: 462000,
    milestones: [
      { at: 20000, kicker: "Two million households in", body: "January 9, 2023: one of five CPSC commissioners tells Bloomberg that, for new stoves, “any option is on the table.” By close of business the story is national. Banned so far in this field: check the counter." },
      { at: 120000, kicker: "Twelve million households", body: "January 11, 2023 — 48 hours later: the CPSC chair states, “I am not looking to ban gas stoves,” and the White House concurs. The story accelerates anyway." },
      { at: 235500, kicker: "Halfway", body: "June 2023: the House passes the Gas Stove Protection and Freedom Act and the Save Our Gas Stoves Act on consecutive days — two acts of Congress shielding the field you’re scrolling from a policy no one had proposed." },
      { at: 350000, kicker: "Thirty-five million households", body: "The real regulatory footprint, for the record: New York and some cities restrict gas hookups in NEW construction (New York from 2026). Existing stoves — every dot in this field — untouched by all of it." },
      { at: 430000, kicker: "Almost done", body: "Also real: the science that sparked it. A 2022 peer-reviewed estimate attributed ~12.7% of childhood asthma to gas-stove pollution (the industry disputes it). That question got a fraction of the ban’s airtime — fear of confiscation outdrew care for lungs." }
    ],
    reveal: {
      kicker: "You can stop looking.",
      figure: "0",
      attribution: "— Gas stoves banned, confiscated, or scheduled for either, by any federal action, ever.",
      note: "You just scrolled 47.1 million households hunting for a policy that never existed. The panic was real; its object was not. Keep this module in mind as the control group: this is what a pure attention-gap looks like — fervor with an empty field."
    }
  },

  proportion: {
    heading: "The proportion",
    lede: "The complete anatomy of a phantom: interview to walk-back, 48 hours; walk-back to acts of Congress, five months; policy footprint, zero.",
    tiles: [
      { value: "47.1M", label: "US households with gas stoves (38%)", sub: "EIA Residential Energy Consumption Survey, 2020" },
      { value: "0", label: "federal bans proposed, drafted, or docketed", sub: "CPSC on the record, Jan 11, 2023 — and ever since" },
      { value: "48 hrs", label: "from interview to official walk-back", sub: "Commissioner interview Jan 9; chair and White House disavowal Jan 11, 2023" },
      { value: "2", label: "House bills passed anyway, on consecutive days", sub: "H.R. 1615 & H.R. 1640, June 13–14, 2023" },
      { value: "12.7%", label: "of childhood asthma attributed to gas stoves — the buried real story", sub: "Gruenwald et al., 2022, peer-reviewed; industry-disputed" },
      { value: "New builds only", label: "the actual regulatory footprint (NY 2026, some cities)", sub: "No existing stove affected anywhere" }
    ],
    epilogue: {
      heading: "What this means — and what it doesn’t",
      points: [
        "It does not mean the underlying policy debate is fake: new-construction electrification codes are real, and the indoor-air-quality science is a genuine, unresolved question that deserves the attention the phantom ban absorbed.",
        "It does mean this is the cleanest specimen the attention economy has produced: measurable national fervor — congressional floor votes! — about a policy whose documented footprint is a null set. Every other module makes you hunt for a small number. This one you searched to the last dot for nothing, which is what a certain fraction of your political anger is made of.",
        ...EPILOGUE_TAIL
      ]
    }
  },

  sources: [
    { label: "NBC News — CPSC commissioner’s remarks and the walk-back timeline", date: "Jan 2023", url: "https://www.nbcnews.com/business/consumer/gas-stove-ban-proposal-when-and-why-rcna65078" },
    { label: "CBS News — CPSC chair: “I am not looking to ban gas stoves”", date: "Jan 11, 2023", url: "https://www.cbsnews.com/news/gas-stove-ban-federal-regulators-consumer-product-safety-commission-richard-trumka/" },
    { label: "House Energy & Commerce — passage of H.R. 1615 and H.R. 1640", date: "Jun 2023", url: "https://energycommerce.house.gov/posts/e-and-c-republicans-lead-passage-of-two-bills-to-stop-the-biden-administration-from-banning-gas-stoves" },
    { label: "EIA — 47.1M households with gas cooking (38%)", date: "2020 RECS", url: "https://www.eia.gov/consumption/residential/data/2020/state/pdf/State%20Appliances.pdf" },
    { label: "Gruenwald et al. — population attributable fraction of childhood asthma from gas stoves (~12.7%)", date: "2022", url: "https://www.mdpi.com/1660-4601/20/1/75" },
    { label: "Morrison Foerster — regulatory status review: no federal ban in the works", date: "2024", url: "https://www.mofo.com/resources/insights/240806-is-a-federal-gas-stove-ban-in-the-works-cpsc-says-no" }
  ],
  sourcesNote: "The zero is literal: no federal rulemaking to ban gas stoves has ever been opened. State/city new-construction codes are disclosed in the module because a proportion instrument that hid the issue’s one real footprint would be doing the thing it measures."
};
