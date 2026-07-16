import { SLIDERS, ENGAGEMENT, VERDICTS, METHODOLOGY_NOTE, EPILOGUE_TAIL } from "./common.js";

export default {
  id: "trans-women-in-sports",
  kicker: "Issue 01 · Transgender women in women’s sports",
  title: "Trans Women in Sports",
  card: {
    value: "< 10",
    label: "transgender athletes among 510,000 NCAA competitors",
    engine: "right",
    blurb: "A $215M ad budget, 27 state laws, and a Supreme Court case — about fewer than ten college athletes."
  },

  perception: {
    heading: "Your read",
    lede: "Before any numbers: how does this issue — transgender women competing in women’s sports — sit with you right now?",
    sliders: SLIDERS,
    engagement: ENGAGEMENT
  },

  quiz: {
    heading: "Your footprint",
    lede: "Not opinions — exposure. Seven questions about your actual, material connection to this issue. “Immediate family” means partner, child, parent, or sibling.",
    questions: [
      { key: "competeSelf", text: "In the past 12 months, have you competed in organized women’s or girls’ sports — school, college, club, or a sanctioned rec league?",
        options: [ { label: "Yes", w: 25 }, { label: "No", w: 0 } ] },
      { key: "familyCompetes", text: "Does an immediate family member currently compete in organized women’s or girls’ sports?",
        options: [ { label: "Yes", w: 15 }, { label: "No", w: 0 } ] },
      { key: "sharedCategory", text: "To your knowledge, have you or an immediate family member ever competed in the same event, league, or division as an openly transgender woman?",
        options: [ { label: "Yes", w: 30 }, { label: "No", w: 0 }, { label: "Not sure", w: 5 } ] },
      { key: "coach", text: "Do you coach, officiate, or administer women’s or girls’ sports?",
        options: [ { label: "Yes", w: 15 }, { label: "No", w: 0 } ] },
      { key: "transFamily", text: "Are you transgender, or is someone in your immediate family? (These policies regulate them directly — exposure runs in both directions.)",
        options: [ { label: "Yes", w: 30 }, { label: "No", w: 0 } ] },
      { key: "scholarship", text: "Is an athletic scholarship or prize money in women’s sports currently a live possibility for you or your child?",
        options: [ { label: "Yes", w: 10 }, { label: "No", w: 0 } ] },
      { key: "knowSomeone", text: "Do you personally know — in real life — anyone affected in either direction: a trans athlete, or an athlete who has competed against one?",
        options: [ { label: "Yes", w: 5 }, { label: "No", w: 0 } ] }
    ]
  },

  gap: { verdicts: VERDICTS, methodologyNote: METHODOLOGY_NOTE },

  scale: {
    heading: "The scale",
    lede: "This is the part of the tool that works like a trillion dollars: a number you can quote but not picture. So don’t picture it — travel it.",
    fieldNote: "Below: one dot for every NCAA student-athlete — 510,000 of them (the figure NCAA president Charlie Baker gave the Senate in December 2024). Somewhere in the field are the transgender athletes he testified to: “less than 10,” drawn here as ten. We’ve placed them at the very end so you can’t miss them. Their positions are illustrative; the count of everything else is to scale. Scroll.",
    variant: "field",
    total: 510000,
    unit: 1,
    unitLabel: "athletes",
    highlights: [ { dots: 10, tier: "bright", label: "transgender athletes" } ],
    counterLabel: "athletes passed",
    highlightCounterLabel: "transgender athletes",
    skipLabel: "I believe the scroll — skip ahead",
    skipToDot: 501000,
    milestones: [
      { at: 5000, kicker: "5,000 in", body: "Every dot so far is a cisgender athlete. Statistically, you haven’t missed anything — at the testified rate, trans athletes are at most 1 in 51,000 of these dots." },
      { at: 75000, kicker: "75,000 — the Utah field", body: "You’ve now passed as many athletes as played high-school sports in the entire state of Utah in 2022. When Utah’s legislature banned trans girls from girls’ sports that year, the state’s own count found four transgender kids among those 75,000. One played girls’ sports." },
      { at: 127500, kicker: "A quarter of the way", body: "In the 2024 cycle, network-TV ads about trans people aired more than 30,000 times — about one airing for every four dots you’ve passed so far." },
      { at: 255000, kicker: "Halfway", body: "“Rarely has so much fear and anger been directed at so few.” — Gov. Spencer Cox (R–Utah), vetoing his state’s ban, March 2022. The legislature overrode him within the week." },
      { at: 382500, kicker: "Three quarters", body: "Republican network-TV spending on anti-trans ads in 2024: roughly $215 million — about $421 for every dot in this field. That figure excludes cable and streaming." },
      { at: 470000, kicker: "470,000 and counting", body: "Still zero. In December 2024, senators asked the NCAA’s president how many transgender athletes were competing among all 510,000. You’re about to see his answer." }
    ],
    reveal: {
      kicker: "There they are.",
      figure: "“Less than 10.”",
      attribution: "— Charlie Baker, president of the NCAA, testifying to the U.S. Senate, December 2024. Drawn here as ten dots.",
      note: "For these ten — and for the women who compete beside them — the stakes are concrete and personal. For the other 340 million of us, they are not. The distance between those two sentences is the attention gap."
    }
  },

  proportion: {
    heading: "The proportion",
    lede: "The scroll was the felt version. Here is the arithmetic version — attention on one side, footprint on the other.",
    tiles: [
      { value: "510,000", label: "NCAA student-athletes", sub: "NCAA president Charlie Baker, Senate testimony, Dec 2024" },
      { value: "< 10", label: "transgender athletes among them", sub: "Same testimony — at most 1 in 51,000 college athletes" },
      { value: "~$215M", label: "GOP network-TV spend on anti-trans ads, 2024", sub: "AdImpact tally; 30,000+ airings; excludes cable & streaming" },
      { value: "~$134", label: "of those ad dollars per trans American", sub: "$215M ÷ 1.6M trans people 13+ (Williams Institute, 2022)" },
      { value: "27", label: "states restrict trans students in school sports", sub: "Upheld by the U.S. Supreme Court, June 30, 2026" },
      { value: "69%", label: "of Americans say trans athletes should play only on birth-sex teams", sub: "Gallup, 2023 (62% in 2021). Opinions are near-universal; direct exposure is near-zero." }
    ],
    epilogue: {
      heading: "What this means — and what it doesn’t",
      points: [
        "It does not mean the issue is fake, or that nobody is affected. For the athletes involved — the fewer-than-ten, and the women who compete beside them — the stakes are real and personal. Small numbers are still people; that cuts in every direction.",
        "An issue touching at most a few dozen competitions a year received more 2024 TV ad money than any other topic in the Trump campaign’s budget — over $21 million in airtime per NCAA trans athlete. Attention at that ratio isn’t tracking impact. It’s tracking emotional pull.",
        ...EPILOGUE_TAIL
      ]
    }
  },

  sources: [
    { label: "The Hill — NCAA president: ‘less than 10’ transgender athletes among 510,000 (Senate testimony)", date: "Dec 2024", url: "https://thehill.com/homenews/lgbtq/5046662-ncaa-president-transgender-athletes-college-sports/" },
    { label: "Truthout / AdImpact — ~$215M GOP network-TV spend on anti-trans ads, 30,000+ airings", date: "Nov 2024", url: "https://truthout.org/articles/republicans-spent-nearly-215m-on-tv-ads-attacking-trans-rights-this-election/" },
    { label: "Gov. Spencer Cox — HB11 veto letter (4 trans kids among 75,000 Utah HS athletes; 1 in girls’ sports)", date: "Mar 2022", url: "https://governor.utah.gov/press/gov-cox-why-im-vetoing-hb11/" },
    { label: "NPR — Utah legislature overrides the veto", date: "Mar 2022", url: "https://www.npr.org/2022/03/25/1088908741/utah-transgender-athletes-veto-override" },
    { label: "Gallup — More say birth gender should dictate sports participation (69%, up from 62%)", date: "Jun 2023", url: "https://news.gallup.com/poll/507023/say-birth-gender-dictate-sports-participation.aspx" },
    { label: "Movement Advancement Project — state bans on transgender youth sports participation (27 states)", date: "2026", url: "https://mapresearch.org/equality-map/bans-on-transgender-youth-participation-in-sports/" },
    { label: "ABC News — Supreme Court upholds state bans on transgender girls in girls’ sports", date: "Jun 30, 2026", url: "https://abcnews.com/Politics/supreme-court-upholds-state-bans-transgender-girls-girls/story?id=134318829" },
    { label: "Williams Institute (UCLA) — ~1.6M Americans age 13+ identify as transgender", date: "2022", url: "https://williamsinstitute.law.ucla.edu/publications/trans-adults-united-states/" }
  ],
  sourcesNote: "Counts of transgender athletes are inherently approximate — disclosure varies and no registry exists. This module uses the most-cited official statements, dated above, and draws “fewer than 10” as exactly ten."
};
