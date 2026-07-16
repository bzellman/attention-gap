# The Attention Gap

**Live: https://bzellman.github.io/attention-gap/**

A proportion instrument. Working hypothesis: political engagement is driven less by an issue's direct impact on your life than by its emotional pull — and campaigns on every side know it.

Each module works like a scale you step on before seeing the number:

1. **Your read** — record how the issue feels (perceived impact, emotional charge, engagement actions) *before* seeing any data.
2. **Your footprint** — weighted questions measure your actual, material exposure. Identity stakes score high on purpose: people an issue regulates directly are *supposed* to score high.
3. **The gap** — self-reported salience vs. measured exposure, one chart.
4. **Calibrate** *(most modules)* — guess the key number before you see it.
5. **The scale** — travel the issue's true size dot by dot, the way you'd have to travel a trillion dollars to believe it.
6. **The proportion** — stat tiles, an honest epilogue, and dated sources.

## The eight issues

| Module | Fervor engine | The field | The needle |
|---|---|---|---|
| Trans women in sports | right | 510,000 NCAA athletes | < 10 |
| The ballot (fraud & suppression) | both | 25.5M battleground ballots | < 475 potential cases |
| Police shootings | left | 53.8M annual police contacts | ~1,100 killed; ~42/yr unarmed |
| School-shooter fear | both | 98,577 public schools (95.5% drill) | 78 gunfire incidents |
| Migrant crime | right | 100k vs 100k Texans, side by side | 3 vs 2 homicide convictions |
| The gas-stove ban | right | 47.1M households | 0 — the control group |
| Antisemitism in America | both | 7.5M Jewish Americans | rising: record 1,938 FBI hate crimes; 196 assaults |
| The city crime wave | both | 606,000 subway rides (the gap between felonies) | 1 |

The slate deliberately samples fervor from both coalitions, and one module (antisemitism) runs the instrument against a trend that is genuinely rising — the tool reports shape, not dismissal.

## Method & sourcing

- Official statistics first: FBI, BJS, NCES, EIA, MTA/NYPD, Census, court and wire-service reviews.
- Advocacy data (ADL, Everytown, Heritage, Cato) appears only with a methodology note; citations against interest are flagged as the strongest kind.
- Where counts are contested, the number least favorable to the module's own thesis is used.
- The same sliders, weights, and verdict thresholds run for every issue — no issue gets a friendlier test.
- Everything stays in the browser: no server, no analytics, no accounts.

## Structure

Static site, no build step:

- `issues/*.js` — one config per issue (copy, statistics, quiz weights, milestones, sources). New issues are new files; the engine doesn't change.
- `issues/common.js` — the shared instrument: sliders, engagement weights, verdicts, epilogue tail.
- `engine.js` — the dot field (unit scaling, dim/bright tiers, duel columns, zero variant), calibration widget, trend chart.
- `app.js` — hash router, home page, stage flow, scoring.

Run locally:

```sh
python3 -m http.server 4173
# open http://localhost:4173
```
