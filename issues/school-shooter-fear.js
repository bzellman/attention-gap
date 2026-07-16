import { SLIDERS, ENGAGEMENT, VERDICTS, METHODOLOGY_NOTE, EPILOGUE_TAIL } from "./common.js";

export default {
  id: "school-shooter-fear",
  kicker: "Issue 04 · School-shooter fear",
  title: "School-Shooter Fear",
  card: {
    value: "95.5%",
    label: "of schools drill for an event that reaches ~0.08% of them",
    engine: "both",
    blurb: "The grief is bottomless and the fear is universal — 47 million children rehearse annually for gunfire that reaches dozens of schools."
  },

  perception: {
    heading: "Your read",
    lede: "Before any numbers: how does this issue — the threat of a shooting at school — sit with you right now? If you’re a parent, answer as one.",
    sliders: SLIDERS,
    engagement: ENGAGEMENT
  },

  quiz: {
    heading: "Your footprint",
    lede: "Not opinions — exposure. “Immediate family” means partner, child, parent, or sibling.",
    questions: [
      { key: "parent", text: "Do you have a child currently enrolled in K-12 school?",
        options: [ { label: "Yes", w: 20 }, { label: "No", w: 0 } ] },
      { key: "realLockdown", text: "Has your child’s school (or yours) ever had a real lockdown — not a drill — for an armed threat on campus?",
        options: [ { label: "Yes", w: 25 }, { label: "No", w: 0 }, { label: "Not sure", w: 5 } ] },
      { key: "staff", text: "Are you — or is an immediate family member — a K-12 teacher, administrator, or school staff member (counselor, psychologist, nurse, aide)?",
        options: [ { label: "Yes, I am", w: 25 }, { label: "An immediate family member is", w: 15 }, { label: "No", w: 0 } ] },
      { key: "districtIncident", text: "Has a shooting with any injury occurred at a school in your district?",
        options: [ { label: "Yes", w: 20 }, { label: "No", w: 0 }, { label: "Not sure", w: 5 } ] },
      { key: "knowPresent", text: "Do you personally know — in real life — anyone who was present at a school shooting?",
        options: [ { label: "Yes", w: 15 }, { label: "No", w: 0 } ] },
      { key: "boughtSafety", text: "Has your family spent money or changed schools because of this fear — bulletproof backpack, private school, homeschooling?",
        options: [ { label: "Yes", w: 15 }, { label: "No", w: 0 } ] },
      { key: "childAnxiety", text: "Does a child in your life show anxiety they attribute to lockdown drills or shooter fear?",
        options: [ { label: "Yes", w: 10 }, { label: "No", w: 0 }, { label: "Not sure", w: 3 } ] }
    ]
  },

  gap: { verdicts: VERDICTS, methodologyNote: METHODOLOGY_NOTE },

  calibration: {
    heading: "Calibrate",
    prompt: "Across America’s roughly 99,000 public schools in 2025, how many people — students, staff, everyone — were killed by gunfire on school grounds? (Broadest tracker: any death, any circumstance, including after-hours.)",
    inputLabel: "Your guess (deaths in 2025)",
    actual: 32,
    actualLabel: "deaths across 78 incidents of gunfire on school grounds in 2025 (Everytown, broadest definition)",
    context: "Everytown’s tracker counts every discharge on school grounds — targeted attacks, after-hours fights in parking lots, accidents, and suicides alike. Narrower federal definitions run lower still. The comparison that matters: ~49.5 million children attend those schools.",
    sourceNote: "Everytown Research gunfire-on-school-grounds tracker, 2025; NCES enrollment."
  },

  scale: {
    heading: "The scale",
    lede: "This field is shorter than the others — schools, not students — because the inversion is the point: nearly every dot rehearses for what almost no dot experiences.",
    fieldNote: "Below: one dot for each of America’s 98,577 public schools. 95.5% of them — nineteen of every twenty dots you pass — ran active-shooter lockdown drills this year. At the end: the 78 dots where any gun was fired on school grounds in 2025, by the broadest count kept. Scroll.",
    variant: "field",
    total: 98577,
    unit: 1,
    unitLabel: "schools",
    highlights: [ { dots: 78, tier: "bright", label: "schools with any gunfire incident (2025, broadest count)" } ],
    counterLabel: "schools passed",
    highlightCounterLabel: "gunfire incidents",
    skipLabel: "I believe the scroll — skip ahead",
    skipToDot: 96000,
    milestones: [
      { at: 10000, kicker: "10,000 schools in", body: "Every one of these dots is a building full of children — about 500 apiece, 49.5 million in all. Roughly 9,550 of the 10,000 you’ve passed drilled those children for an active shooter this year." },
      { at: 35000, kicker: "A third of the way", body: "Uvalde. Parkland. Sandy Hook. Covenant. The grief attached to a handful of these dots is bottomless, and nothing in this field argues otherwise. Calibration exists because grief is general but risk is not: a given school’s chance of any gunfire incident this year is about 1 in 1,260." },
      { at: 60000, kicker: "60,000 schools", body: "Fear’s economy: a multibillion-dollar school-security industry, 95.5% drill coverage, roughly one in three parents telling Gallup they fear for their child’s physical safety at school. The event those numbers orbit is 78 dots wide." },
      { at: 90000, kicker: "Almost there", body: "By the broadest tracker kept, 32 people died from gunfire on school grounds in 2025 — among 49.5 million students. A given child’s odds on a given school day are about one in hundreds of millions. Both sentences before this one are true at once." }
    ],
    reveal: {
      kicker: "There they are.",
      figure: "78 incidents. 32 deaths.",
      attribution: "— Everytown’s broadest count of gunfire on school grounds, 2025, across 98,577 public schools and 49.5 million children.",
      note: "Several of these dots hold unbearable loss; each death was a human being. And: the drills reached about 47 million children — the gunfire reached dozens of schools. Fear’s footprint is roughly a thousand times the event’s. Both truths have to be carried at once, because policy built on either one alone fails."
    }
  },

  proportion: {
    heading: "The proportion",
    lede: "The fear is universal, rehearsed, and monetized. The event is rare, concentrated, and catastrophic where it lands.",
    tiles: [
      { value: "49.5M", label: "children in US public K-12 schools", sub: "NCES enrollment" },
      { value: "98,577", label: "public schools — one dot each in the field above", sub: "NCES" },
      { value: "95.5%", label: "of public schools ran lockdown drills with students", sub: "NCES School Survey on Crime and Safety" },
      { value: "78 / 32", label: "gunfire incidents / deaths on school grounds, 2025", sub: "Everytown tracker — broadest definition kept; federal counts run lower" },
      { value: "~1 in 3", label: "parents fear for their child’s physical safety at school", sub: "Gallup’s long-running parental-fear measure" },
      { value: "507", label: "killed on school grounds since 2013 — every one a person", sub: "Everytown cumulative count, 2013–2025" }
    ],
    epilogue: {
      heading: "What this means — and what it doesn’t",
      points: [
        "It does not mean the deaths are acceptable, the grief is wrong, or prevention is foolish. Thirty-two deaths of children and school staff is thirty-two too many, and the communities holding them owe nobody statistical perspective.",
        "It does mean an entire generation is being raised inside a rehearsal for the rarest danger they face — while the leading actual killers of American children (vehicles, drownings, and firearms outside school) get no drills at all. Fear allocated by headline instead of by hazard is fear a democracy can’t spend where it would save lives.",
        ...EPILOGUE_TAIL
      ]
    }
  },

  sources: [
    { label: "Everytown Research — gunfire on school grounds tracker (78 incidents, 32 deaths in 2025; 507 since 2013)", date: "2025", url: "https://everytownresearch.org/maps/gunfire-on-school-grounds/", note: "Advocacy organization; broadest definition — used here as the ceiling, with that framing disclosed." },
    { label: "NCES — School Survey on Crime and Safety: 95.5% of public schools ran lockdown drills", date: "2021–22", url: "https://nces.ed.gov/fastfacts/display.asp?id=954" },
    { label: "NCES — public school and enrollment counts (~98,577 schools; ~49.5M students)", date: "2021–22", url: "https://nces.ed.gov/programs/coe/indicator/cga/public-school-enrollment" },
    { label: "Education Week — school shooting tracker (narrower definition, for comparison)", date: "2025", url: "https://www.edweek.org/leadership/school-shootings-this-year-how-many-and-where/2025/01" },
    { label: "Gallup — parental fear for child’s safety at school (long-running measure, ~1 in 3 recently)", date: "2024", url: "https://news.gallup.com/poll/187380/parents-children-worry-less-school-safety.aspx" }
  ],
  sourcesNote: "Counting school shootings is definitional: Everytown counts any discharge on school grounds (the number used here, disclosed as the broadest); Education Week counts only incidents with injuries during school activity, and runs far lower. We deliberately used the count least favorable to this module’s thesis."
};
