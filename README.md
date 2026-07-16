# The Attention Gap

**Live: https://bzellman.github.io/attention-gap/**

A proportion instrument. Working hypothesis: political engagement is driven less by an issue's direct impact on your life than by its emotional pull — and campaigns on every side know it.

The tool works like a scale you step on before seeing the number:

1. **Your read** — record how the issue feels (perceived impact, emotional charge, engagement actions) *before* seeing any data.
2. **Your footprint** — seven weighted questions measure your actual, material exposure to the issue.
3. **The gap** — your self-reported salience vs. your measured exposure, on one chart.
4. **The scale** — the part that works like a trillion dollars: a scrollable field with one dot per NCAA student-athlete (510,000 of them), and the "fewer than 10" transgender athletes from the NCAA president's Senate testimony waiting at the end.
5. **The proportion** — the arithmetic version: ad spend, airings, laws, and polling on one side; the number of people actually involved on the other.

Issue 01 is transgender women in women's sports. The lens is not partisan and the framing is a mirror, not a verdict: low direct impact doesn't make an issue illegitimate, small numbers are still people, and the same instrument points anywhere emotional pull and actual footprint may have come apart (shark attacks, voter fraud prevalence, book challenges, gas stoves, …).

## Data

Every statistic is dated and linked in the in-app **Sources & notes** panel — NCAA testimony (Dec 2024), AdImpact ad-spend tallies (2024), Utah's official count (2022), Gallup (2023/2025), Movement Advancement Project (2026), and the Supreme Court ruling of June 30, 2026. Counts of transgender athletes are inherently approximate; the app uses the most-cited official statements and draws "fewer than 10" as exactly ten.

Answers never leave the page — there is no server, no analytics, and no account.

## Structure

Static site, no build step:

- `config.js` — all copy, statistics, question weights, milestones, and sources for one issue. New issues are new config entries; the engine doesn't change.
- `app.js` — stage flow, transparent scoring, and a virtualized canvas renderer for the 510,000-dot field.
- `index.html` / `styles.css` — skeleton and dark editorial theme (palette validated for contrast and color-vision deficiency).

Run locally:

```sh
python3 -m http.server 4173
# open http://localhost:4173
```
