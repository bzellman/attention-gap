// ─────────────────────────────────────────────────────────────────────────────
// Shared instrument parts. Every issue uses the SAME sliders, engagement
// checklist, verdict logic, and epilogue tail — so scores are comparable
// across issues and no issue gets a friendlier test than another.
// ─────────────────────────────────────────────────────────────────────────────

export const SLIDERS = [
  {
    key: "perceived",
    label: "Setting aside how much it matters morally — how much direct, material effect does this issue have on your own daily life?",
    min: "None at all",
    max: "Shapes my daily life"
  },
  {
    key: "emotion",
    label: "How strongly do you feel when this topic comes up?",
    min: "Indifferent",
    max: "Blood pressure rises"
  }
];

export const ENGAGEMENT = {
  label: "In the past 12 months, which of these have you done about this issue? (Check all that apply — in either direction.)",
  items: [
    { key: "argued",   label: "Argued about it online or in a comment section", w: 15 },
    { key: "posted",   label: "Shared or posted content about it", w: 10 },
    { key: "consumed", label: "Watched or read more than ~5 news pieces or videos about it", w: 10 },
    { key: "talked",   label: "Brought it up with friends or family", w: 10 },
    { key: "voted",    label: "It influenced my vote in at least one election", w: 25 },
    { key: "wrote",    label: "Contacted an elected official or signed a petition about it", w: 15 },
    { key: "attended", label: "Attended a protest, school-board or other public meeting about it", w: 15 }
  ]
};

export const VERDICTS = {
  stakeholder: "You’re one of the few people with genuine, material stakes in this issue. Your attention tracks your life. For most people who will use this tool, it doesn’t.",
  wide: "Your engagement with this issue outruns your measurable exposure to it by {gap} points. That’s not a character flaw — it’s the attention economy working exactly as designed. The next section shows what the issue looks like at actual scale.",
  moderate: "There’s daylight between how present this issue is in your head and how present it is in your life — {gap} points of it. Keep that number in mind as you scroll through the next section.",
  aligned: "Your attention and your exposure are roughly in proportion — rarer than you’d think. See how you sit against the actual scale of the issue."
};

export const METHODOLOGY_NOTE =
  "Scores are computed on your device from the weights shown here. “Salience” bars come straight from your sliders (×10) and checked actions; “exposure” sums the question weights and caps at 100. The same sliders, checklist, and verdict thresholds are used for every issue. Where a question offers separate “I am” and “immediate family” answers, the family weight is deliberately lower — the household shares the stakes, attenuated. Identity questions (e.g., a trans, Jewish, or immigrant family member) score family at full weight, because there the household itself is inside the category. Knowing a victim scales with what happened to them (adjacency +5, non-violent event +10, violence +15, death +25). Fear-response costs — security purchases, changed routines, concealment — count at modest weights: an issue’s fear economy is part of its real footprint, even where the fear outruns the odds.";

// Closing points appended to every issue's epilogue, after its own points.
export const EPILOGUE_TAIL = [
  "Direct impact isn’t the only legitimate reason to care. People rightly care about wars they’ll never see and rights they’ll never need. But it’s worth knowing which kind of caring you’re doing — because attention is a budget, and campaigns on every side are spending yours.",
  "Your feed is not a scale model of the world. This instrument is one way to check it against one."
];

export const SOURCES_BOILERPLATE =
  "Sourcing standard: official statistics first (FBI, BJS, NCES, EIA, MTA/NYPD, court and wire-service reviews); advocacy-organization data appears only with a methodology note, and citations against the citing organization’s interest are flagged — they are the strongest kind.";
