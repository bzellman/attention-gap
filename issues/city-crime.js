import { SLIDERS, ENGAGEMENT, VERDICTS, METHODOLOGY_NOTE, EPILOGUE_TAIL } from "./common.js";

export default {
  id: "city-crime",
  kicker: "Issue 08 · Big-city crime & the subway",
  title: "The City Crime Wave",
  card: {
    value: "1.65",
    label: "major crimes per MILLION subway rides, 2025",
    engine: "both",
    blurb: "NYC, SF, Seattle, LA — the ‘lawless city’ story met the largest homicide drop ever recorded. The subway is the perception gap on rails."
  },

  perception: {
    heading: "Your read",
    lede: "Before any numbers: how does this issue — violent crime in America’s big cities, and on their subways and metros — sit with you right now?",
    sliders: SLIDERS,
    engagement: ENGAGEMENT
  },

  quiz: {
    heading: "Your footprint",
    lede: "Not opinions — exposure. “Immediate family” means partner, child, parent, or sibling.",
    questions: [
      { key: "resident", text: "Do you live in New York, San Francisco, Seattle, or Los Angeles?",
        options: [ { label: "Yes", w: 10 }, { label: "No", w: 0 } ] },
      { key: "transitRider", text: "Do you ride public transit at least weekly?",
        options: [ { label: "Yes", w: 15 }, { label: "No", w: 0 } ] },
      { key: "violentVictim", text: "Have you — or has an immediate family member — been the victim of a violent crime in one of these cities in the past 5 years?",
        options: [ { label: "Yes, I have", w: 30 }, { label: "An immediate family member has", w: 15 }, { label: "No", w: 0 } ] },
      { key: "propertyVictim", text: "Property crime against you or your household — car break-in, package or phone theft — in the past 5 years? (This footprint is real, especially in San Francisco.)",
        options: [ { label: "Yes", w: 15 }, { label: "No", w: 0 } ] },
      { key: "witnessedTransit", text: "Have you personally witnessed violence on transit?",
        options: [ { label: "Yes", w: 15 }, { label: "No", w: 0 }, { label: "Not sure", w: 3 } ] },
      { key: "changedBehavior", text: "Have you changed commutes, moved, or started carrying protection because of crime fear?",
        options: [ { label: "Yes", w: 10 }, { label: "No", w: 0 } ] },
      { key: "knowVictim", text: "Do you personally know — in real life — a victim of violent crime in one of these cities?",
        options: [ { label: "Yes", w: 10 }, { label: "No", w: 0 } ] }
    ]
  },

  gap: { verdicts: VERDICTS, methodologyNote: METHODOLOGY_NOTE },

  trend: {
    heading: "First, the direction — nationally",
    note: "US homicide rate per 100,000. The 2025 figure is the Council on Criminal Justice year-end estimate — the largest one-year drop ever recorded, to the lowest rate in data reaching back to 1900. Points shown are selected anchor years.",
    unit: "per 100k",
    series: [
      { year: 1991, value: 9.8 },
      { year: 2014, value: 4.4 },
      { year: 2019, value: 5.1 },
      { year: 2021, value: 6.8 },
      { year: 2023, value: 5.7 },
      { year: 2025, value: 4.0 }
    ],
    sourceNote: "FBI UCR historical series; Council on Criminal Justice, Year-End 2025 Update (35-city sample; homicide −21% year over year)."
  },

  calibration: {
    heading: "Calibrate",
    prompt: "New York’s subway carried about 1.2 billion rides in 2024. At 2025’s crime rate, how many rides pass, on average, between one major felony and the next? (Major = murder, rape, robbery, felony assault, burglary, grand larceny.)",
    inputLabel: "Your guess (rides between major felonies)",
    invert: true,
    actual: 606000,
    actualLabel: "rides between major felonies — 1.65 per million rides, the lowest in 16 years",
    context: "At a twice-every-workday commute, 606,000 rides is over 1,100 years of commuting between incidents, on average — and most ‘major felonies’ are grand larceny: a phone lifted from a pocket. Meanwhile 78% of New Yorkers say they don’t feel safe riding at night.",
    sourceNote: "MTA/NYPD 2025 (via Gov. Hochul’s office); Citizens Budget Commission survey, March 2024."
  },

  scale: {
    heading: "The scale",
    lede: "This field is a streak: the average distance between two major felonies on the New York subway, dot by dot, ride by ride.",
    fieldNote: "Below: 606,000 dots — one per ride, the average gap between major felonies at 2025’s rate. You board at the top. Somewhere at the end, one ride is marked: statistically, the next incident (most likely a phone theft). Every unmarked dot is a ride where nothing happened. Scroll the gap.",
    variant: "field",
    total: 606000,
    unit: 1,
    unitLabel: "rides",
    highlights: [ { dots: 1, tier: "bright", label: "the next major felony (statistically)" } ],
    counterLabel: "rides without a major crime",
    highlightCounterLabel: "major felonies",
    skipLabel: "I believe the scroll — skip ahead",
    skipToDot: 597000,
    milestones: [
      { at: 30000, kicker: "30,000 rides in", body: "March 2024: 750 National Guard troops deployed into this field’s stations after a spate of covered incidents. 78% of New Yorkers told the Citizens Budget Commission they felt unsafe riding at night. The counter shows what the fear is riding through." },
      { at: 148000, kicker: "148,000 rides", body: "At two rides every workday, you have now commuted for 296 years without a major felony. The average rider’s entire commuting life fits in a fraction of this field." },
      { at: 300000, kicker: "Halfway across the gap", body: "November 2025: zero murders in the transit system. Full-year murders through November: four — in over a billion rides. That’s roughly one per 275 million rides: a different field, 450 times longer than this one." },
      { at: 480000, kicker: "480,000 rides", body: "2025 subway crime is the lowest in 16 years — 1.65 major crimes per million rides, back to pre-pandemic lows per ride. Citywide, 2025 NYC had the fewest shootings ever recorded; LA homicides fell 39%; SF hit historic lows. The wave story outlived the wave by years." }
    ],
    reveal: {
      kicker: "There it is.",
      figure: "One in 606,000.",
      attribution: "— One major felony per ~606,000 rides at 2025’s rate (MTA/NYPD). Most likely offense: grand larceny — a phone, a wallet.",
      note: "The violent subset is rarer; murder, about one per 275 million rides in 2025. Every incident has a victim, and high-profile horrors — a woman burned alive in December 2024 — are real and unforgettable, which is exactly why they anchor perception. The National Guard patrols the field you just scrolled. The felony rides one dot in six hundred thousand."
    }
  },

  proportion: {
    heading: "The proportion",
    lede: "Four cities, one subway, and the largest homicide decline ever measured — against a story that never updated.",
    tiles: [
      { value: "4.0", label: "US homicides per 100k in 2025 — lowest recorded since 1900", sub: "Council on Criminal Justice year-end estimate; largest one-year drop on record" },
      { value: "Fewest ever", label: "shootings in NYC’s recorded history, 2025", sub: "NYPD year-end release; homicides down 20%+" },
      { value: "−39%", label: "LA homicides, 2025", sub: "CCJ 35-city sample; SF and Seattle at or near historic lows" },
      { value: "1.65", label: "major crimes per million subway rides, 2025 — 16-year low", sub: "MTA/NYPD; ~1.2B annual rides; 4 murders through Nov 2025" },
      { value: "78%", label: "of New Yorkers feel unsafe riding the subway at night", sub: "Citizens Budget Commission, March 2024 — fear measured at its peak" },
      { value: "49%", label: "of Americans in 2025 said national crime was rising — lowest since 2001", sub: "Gallup. In almost every year since 1993, majorities said ‘rising’ — including years it halved. Perception can calibrate; it just runs late." }
    ],
    epilogue: {
      heading: "What this means — and what it doesn’t",
      points: [
        "It does not mean city crime is imaginary. The 2020–22 spike was real; property crime in San Francisco was genuinely epidemic before its 2024–25 collapse; and every one of the subway’s 2,211 index crimes in 2024 had a victim. Rare and real are not opposites.",
        "It does mean the story and the statistics decoupled for years — cities posted the largest homicide declines ever recorded while National Guard troops patrolled a system whose per-ride crime rate was hitting 16-year lows. The gap between the 78% who feel unsafe and the one-in-606,000 ride is the purest per-capita illustration this instrument has.",
        ...EPILOGUE_TAIL
      ]
    }
  },

  sources: [
    { label: "Gov. Hochul / MTA — subway crime lowest in 16 years; 1.65 major crimes per million riders (2025)", date: "Dec 2025", url: "https://www.governor.ny.gov/news/safer-subways-governor-hochul-announces-subway-crime-track-reach-lowest-levels-generation-2025" },
    { label: "Brennan Center — 2025 trends in NYC crime and safety (2,211 subway index crimes in 2024; context)", date: "2025", url: "https://www.brennancenter.org/our-work/research-reports/2025-trends-crime-and-safety-new-york-city" },
    { label: "NYPD — fewest murders, shootings in recorded history (2025 year-end)", date: "Jan 2026", url: "https://www.nyc.gov/site/nypd/news/PR009/nypd-fewest-murders-shooting-incidents-shooting-victims-recorded-history-the" },
    { label: "Council on Criminal Justice — Year-End 2025 crime trends (homicide −21%; lowest rate since 1900)", date: "Jan 2026", url: "https://counciloncj.org/crime-trends-in-u-s-cities-year-end-2025-update/" },
    { label: "Citizens Budget Commission — 78% of New Yorkers feel unsafe on the subway at night", date: "Mar 2024", url: "https://cbcny.org/research/straight-new-yorkers-2025" },
    { label: "Washington Post — National Guard deployment to the subway (750 troops)", date: "Mar 2024", url: "https://www.washingtonpost.com/nation/2024/03/07/new-york-subway-national-guard/" },
    { label: "Gallup — 49% say crime rising, lowest since 2001; three decades of majorities before it", date: "Nov 2025", url: "https://news.gallup.com/poll/697124/crime-seen-less-serious-second-straight-year.aspx" }
  ],
  sourcesNote: "‘Major felonies’ is the NYPD transit index-crime definition (murder, rape, robbery, felony assault, burglary, grand larceny) — grand larceny dominates it. Per-ride rates use MTA ridership; 2025 figures are official year-end announcements. San Francisco’s property-crime era is disclosed rather than averaged away."
};
