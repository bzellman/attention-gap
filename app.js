import { ISSUES, ORDER, ENGINE_LABELS } from "./issues/index.js";
import { SOURCES_BOILERPLATE } from "./issues/common.js";
import { createDotField, renderCalibration, renderTrendChart } from "./engine.js";

// Trust boundary: innerHTML is used ONLY for developer-authored static strings
// from the issues/ configs (same trust level as this file). Anything derived
// from user input — slider values, checkbox/radio state, computed scores,
// calibration guesses — is inserted exclusively via textContent.

// ── Utilities ────────────────────────────────────────────────────────────────
const $ = (sel, root = document) => root.querySelector(sel);
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

function make(tag, cls, html) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (html != null) node.innerHTML = html; // config strings only
  return node;
}

function buildTable(caption, header, rows) {
  const table = document.createElement("table");
  const cap = make("caption", "visually-hidden");
  cap.textContent = caption;
  table.appendChild(cap);
  const headRow = document.createElement("tr");
  header.forEach((h) => {
    const th = document.createElement("th");
    th.textContent = h;
    headRow.appendChild(th);
  });
  table.appendChild(headRow);
  rows.forEach((cells) => {
    const tr = document.createElement("tr");
    cells.forEach((c) => {
      const td = document.createElement("td");
      td.textContent = c;
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
  return table;
}

function reveal(sectionId, headingId) {
  const section = document.getElementById(sectionId);
  section.hidden = false;
  if (headingId) {
    const h = document.getElementById(headingId);
    h.focus({ preventScroll: true });
    h.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  }
}

// ── Session state (in memory only — nothing persists, nothing leaves) ───────
let state = null;
let currentField = null;
let currentIssue = null;

function freshState() {
  return { perceived: 0, emotion: 0, engagement: new Set(), quiz: {}, scores: null, scaleEntered: false };
}

// ── Router ───────────────────────────────────────────────────────────────────
function route() {
  const m = location.hash.match(/^#\/issue\/([\w-]+)/);
  if (m && ISSUES[m[1]]) showIssue(ISSUES[m[1]]);
  else showHome();
}

function showHome() {
  if (currentField) { currentField.destroy(); currentField = null; }
  currentIssue = null;
  $("#issue-view").hidden = true;
  $("#home-view").hidden = false;
  $("#nav-kicker").textContent = "";
  window.scrollTo(0, 0);
}

// ── Home ─────────────────────────────────────────────────────────────────────
function renderHome() {
  const home = $("#home-view");
  home.innerHTML = `
    <header class="stage hero home-hero">
      <p class="kicker">A proportion instrument</p>
      <h1>The Attention Gap</h1>
      <p class="tagline">How big is an issue in your life — and how big is it, actually?</p>
      <div class="intro">
        <p>Working hypothesis: political engagement is driven less by an issue’s direct impact on your life than by its emotional pull. Campaigns on every side know this. This instrument lets you test it — on yourself, one issue at a time.</p>
        <p>Each module works like a scale you step on before seeing the number: record how the issue feels, measure your actual material exposure, see the gap — then travel the issue’s true size, dot by dot, the way you’d have to travel a trillion dollars to believe it.</p>
        <p>The lens is not partisan and the test is never rigged: the same sliders, the same weights, the same verdict thresholds for every issue — including the one where the trend is genuinely rising. Your answers never leave this page.</p>
      </div>
    </header>
    <section class="stage wide">
      <h2>Pick an issue</h2>
      <p class="lede">Eight modules, sampling fervor from both coalitions. Each takes about five minutes. The chip says where the loudest fear lives — not who’s right.</p>
      <div class="issue-cards" id="issue-cards"></div>
    </section>
    <section class="stage" id="method">
      <h2>Method &amp; sourcing</h2>
      <p>${SOURCES_BOILERPLATE}</p>
      <ul class="method-list">
        <li><strong>Perception before facts.</strong> You record how an issue feels before any number is shown — order matters, and the instrument never anchors you.</li>
        <li><strong>Exposure, not opinions.</strong> The quiz asks what has materially happened to you and yours — never what you believe. Identity stakes score high on purpose: people an issue regulates directly are supposed to score high.</li>
        <li><strong>The same test for every issue.</strong> Identical sliders, engagement weights, and verdict thresholds across all modules — no issue gets a friendlier instrument.</li>
        <li><strong>Ceilings, not cherry-picks.</strong> Where counts are contested we use the number least favorable to our own thesis, flag advocacy sources, and treat citations against interest as the strongest kind.</li>
        <li><strong>Rising lines stay risen.</strong> When a trend is genuinely up, the module says so first, plainly, before anything else. Calibration is about shape, never dismissal.</li>
      </ul>
    </section>
    <footer class="colophon">
      <p>A proportion instrument, not a verdict. All answers stay in your browser — no server, no analytics, no accounts. Issue modules are config-driven; every statistic is dated and linked in each module’s sources panel.</p>
    </footer>`;

  const cards = $("#issue-cards", home);
  ORDER.forEach((issue) => {
    const a = make("a", "issue-card");
    a.href = `#/issue/${issue.id}`;
    a.innerHTML = `
      <p class="ic-value"></p>
      <p class="ic-label"></p>
      <h3 class="ic-title"></h3>
      <p class="ic-blurb"></p>
      <p class="ic-meta"><span class="ic-engine"></span><span class="ic-time">~5 min</span></p>`;
    a.querySelector(".ic-value").textContent = issue.card.value;
    a.querySelector(".ic-label").textContent = issue.card.label;
    a.querySelector(".ic-title").textContent = issue.title;
    a.querySelector(".ic-blurb").textContent = issue.card.blurb;
    a.querySelector(".ic-engine").textContent = ENGINE_LABELS[issue.card.engine] || issue.card.engine;
    a.querySelector(".ic-engine").dataset.engine = issue.card.engine;
    cards.appendChild(a);
  });
}

// ── Issue flow ───────────────────────────────────────────────────────────────
function showIssue(issue) {
  if (currentField) { currentField.destroy(); currentField = null; }
  currentIssue = issue;
  state = freshState();
  window.AG_STATE = state;

  $("#home-view").hidden = true;
  $("#issue-view").hidden = false;
  $("#nav-kicker").textContent = issue.kicker;

  // reset all stages to gated state
  ["stage-perception", "stage-quiz", "stage-gap", "stage-trend", "stage-calibration",
   "stage-scale-intro", "dotfield", "stage-proportion", "issue-colophon"]
    .forEach((id) => { document.getElementById(id).hidden = true; });

  renderIssueHero(issue);
  renderPerception(issue);
  renderQuiz(issue);
  window.scrollTo(0, 0);
}

function renderIssueHero(issue) {
  $("#issue-kicker").textContent = issue.kicker;
  $("#issue-title").textContent = issue.title;
  const intro = $("#issue-intro");
  intro.innerHTML = "";
  intro.appendChild(make("p", null,
    "Answer before you see any numbers — order matters, and nothing you enter leaves this page."));
  $("#btn-begin").onclick = () => reveal("stage-perception", "h-perception");
}

function renderPerception(issue) {
  const cfg = issue.perception;
  $("#h-perception").textContent = cfg.heading;
  $("#perception-lede").textContent = cfg.lede;

  const sliders = $("#sliders");
  sliders.innerHTML = "";
  cfg.sliders.forEach((s) => {
    const block = make("div", "slider-block");
    const id = `sl-${s.key}`;
    block.innerHTML = `
      <label for="${id}"></label>
      <div class="slider-row">
        <input type="range" id="${id}" min="0" max="10" step="1" value="0" aria-describedby="${id}-ends">
        <output class="slider-val" for="${id}">0</output>
      </div>
      <div class="slider-ends" id="${id}-ends"><span></span><span></span></div>`;
    block.querySelector("label").textContent = s.label;
    const ends = block.querySelectorAll(".slider-ends span");
    ends[0].textContent = s.min; ends[1].textContent = s.max;
    const input = block.querySelector("input");
    const out = block.querySelector("output");
    input.addEventListener("input", () => {
      state[s.key] = Number(input.value);
      out.textContent = input.value;
    });
    sliders.appendChild(block);
  });

  $("#engagement-label").textContent = cfg.engagement.label;
  const items = $("#engagement-items");
  items.innerHTML = "";
  cfg.engagement.items.forEach((item) => {
    const row = make("label", "check-row");
    row.innerHTML = `<input type="checkbox"><span></span>`;
    row.querySelector("span").textContent = item.label;
    const cb = row.querySelector("input");
    cb.value = item.key;
    cb.setAttribute("aria-label", item.label);
    cb.addEventListener("change", (e) => {
      e.target.checked ? state.engagement.add(item.key) : state.engagement.delete(item.key);
    });
    items.appendChild(row);
  });

  $("#btn-perception").onclick = () => reveal("stage-quiz", "h-quiz");
}

function renderQuiz(issue) {
  const cfg = issue.quiz;
  $("#h-quiz").textContent = cfg.heading;
  $("#quiz-lede").textContent = cfg.lede;
  const wrap = $("#quiz-questions");
  wrap.innerHTML = "";

  cfg.questions.forEach((q, qi) => {
    const block = make("fieldset", "q-block");
    const legend = make("legend", "q-text");
    legend.textContent = `${qi + 1}. ${q.text}`;
    block.appendChild(legend);
    const opts = make("div", "q-options");
    q.options.forEach((opt, oi) => {
      const lab = make("label", "q-opt");
      lab.innerHTML = `<input type="radio"><span></span>`;
      const input = lab.querySelector("input");
      input.name = `q-${issue.id}-${q.key}`;
      input.value = String(oi);
      input.setAttribute("aria-label", opt.label);
      lab.querySelector("span").textContent = opt.label;
      input.addEventListener("change", () => {
        state.quiz[q.key] = oi;
        syncQuizButton();
      });
      opts.appendChild(lab);
    });
    block.appendChild(opts);
    wrap.appendChild(block);
  });

  function syncQuizButton() {
    const answered = Object.keys(state.quiz).length;
    const total = cfg.questions.length;
    $("#btn-quiz").disabled = answered < total;
    $("#quiz-hint").textContent =
      answered < total ? `${answered} of ${total} answered.` : "All answered — your gap is ready.";
  }
  $("#quiz-hint").textContent = `Answer all ${cfg.questions.length} to continue.`;
  $("#btn-quiz").disabled = true;
  $("#btn-quiz").onclick = () => {
    state.scores = computeScores(issue);
    renderGap(issue);
    reveal("stage-gap", "h-gap");
  };
}

function computeScores(issue) {
  const perceived = state.perceived * 10;
  const emotion = state.emotion * 10;
  let engagement = 0;
  issue.perception.engagement.items.forEach((i) => {
    if (state.engagement.has(i.key)) engagement += i.w;
  });
  engagement = clamp(engagement, 0, 100);
  let measured = 0;
  issue.quiz.questions.forEach((q) => {
    const chosen = q.options[state.quiz[q.key]];
    if (chosen) measured += chosen.w;
  });
  measured = clamp(measured, 0, 100);
  const felt = Math.round((perceived + emotion + engagement) / 3);
  return { perceived, emotion, engagement, measured, felt, gap: felt - measured };
}

const GAP_BARS = [
  { key: "emotion", label: "Emotional charge", family: "felt" },
  { key: "engagement", label: "Engagement (actions)", family: "felt" },
  { key: "perceived", label: "Perceived direct impact", family: "felt" },
  { key: "measured", label: "Measured direct exposure", family: "measured" }
];
const FAMILIES = {
  felt: { label: "Self-reported salience", colorVar: "--felt" },
  measured: { label: "Measured direct exposure", colorVar: "--measured" }
};

function renderGap(issue) {
  const s = state.scores;
  $("#h-gap").textContent = "The gap";
  $("#gap-lede").textContent =
    "Four measures, one scale. The first three are how the issue lives in your head. The last is how it lives in your life.";

  const styles = getComputedStyle(document.documentElement);
  const legend = $("#gap-legend");
  legend.innerHTML = "";
  Object.values(FAMILIES).forEach((f) => {
    const key = make("span", "key");
    const swatch = make("span", "swatch");
    swatch.style.background = styles.getPropertyValue(f.colorVar);
    key.append(swatch, f.label);
    legend.appendChild(key);
  });

  const bars = $("#gap-bars");
  bars.innerHTML = "";
  const fills = [];
  GAP_BARS.forEach((b) => {
    const val = Number(s[b.key]);
    const row = make("div", "bar-row");
    row.innerHTML = `
      <span class="bar-label"></span>
      <span class="bar-track">
        <span class="bar-fill" data-family="${b.family}"></span>
        <span class="bar-val"></span>
      </span>`;
    row.querySelector(".bar-label").textContent = b.label;
    row.querySelector(".bar-track").title = `${b.label}: ${val} of 100`;
    const fillEl = row.querySelector(".bar-fill");
    fillEl.style.background = styles.getPropertyValue(FAMILIES[b.family].colorVar);
    const valEl = row.querySelector(".bar-val");
    valEl.textContent = val;
    if (val > 84) valEl.classList.add("bar-val--in");
    bars.appendChild(row);
    fills.push({ fill: fillEl, val: valEl, pct: val });
  });
  requestAnimationFrame(() => requestAnimationFrame(() =>
    fills.forEach(({ fill, val, pct }) => {
      fill.style.width = pct + "%";
      val.style.left = pct + "%";
    })
  ));

  const v = issue.gap.verdicts;
  const verdict =
    s.measured >= 50 ? v.stakeholder
    : s.gap >= 40 ? v.wide
    : s.gap >= 15 ? v.moderate
    : v.aligned;
  $("#gap-verdict").textContent = verdict.replace("{gap}", Math.max(0, s.gap));

  const meth = $("#methodology");
  meth.replaceChildren(
    make("p", null, issue.gap.methodologyNote),
    buildTable("Your scores", ["Your scores", ""],
      GAP_BARS.map((b) => [b.label, `${s[b.key]} / 100`])),
    buildTable("Engagement weights", ["Engagement actions", "Weight"],
      issue.perception.engagement.items.map((i) => [i.label, `+${i.w}`])),
    buildTable("Exposure weights", ["Exposure questions (answer weights)", ""],
      issue.quiz.questions.map((q, i) =>
        [`Q${i + 1} — ${q.options.map((o) => `${o.label} +${o.w}`).join(" · ")}`, ""]))
  );

  const next = issue.trend ? "trend" : issue.calibration ? "calibration" : "scale";
  $("#btn-gap").textContent = next === "scale" ? "Now see the actual scale →" : "Continue →";
  $("#btn-gap").onclick = () => advanceFrom("gap", issue);
}

function advanceFrom(stage, issue) {
  if (stage === "gap") {
    if (issue.trend) return enterTrend(issue);
    if (issue.calibration) return enterCalibration(issue);
    return enterScale(issue);
  }
  if (stage === "trend") {
    if (issue.calibration) return enterCalibration(issue);
    return enterScale(issue);
  }
  return enterScale(issue);
}

function enterTrend(issue) {
  $("#h-trend").textContent = issue.trend.heading;
  $("#trend-note").textContent = issue.trend.note;
  renderTrendChart(issue.trend);
  $("#btn-trend").onclick = () => advanceFrom("trend", issue);
  reveal("stage-trend", "h-trend");
}

function enterCalibration(issue) {
  $("#h-calibration").textContent = issue.calibration.heading;
  renderCalibration(issue.calibration, () => enterScale(issue));
  reveal("stage-calibration", "h-calibration");
}

function enterScale(issue) {
  if (state.scaleEntered) { reveal("stage-scale-intro", "h-scale"); return; }
  state.scaleEntered = true;
  const cfg = issue.scale;

  $("#h-scale").textContent = cfg.heading;
  $("#scale-lede").textContent = cfg.lede;
  $("#scale-note").textContent = cfg.fieldNote;
  $("#df-skip").textContent = cfg.skipLabel + " →";
  $("#df-count-label").textContent = cfg.counterLabel;
  $("#df-trans-label").textContent = cfg.highlightCounterLabel;
  $("#df-canvas").setAttribute("aria-label", cfg.fieldNote);

  const duelLabels = $("#df-duel-labels");
  if (cfg.variant === "duel") {
    duelLabels.hidden = false;
    const spans = duelLabels.querySelectorAll("span");
    spans[0].textContent = `${cfg.duel.a.label} — ${cfg.duel.a.rateLabel}`;
    spans[1].textContent = `${cfg.duel.b.label} — ${cfg.duel.b.rateLabel}`;
  } else {
    duelLabels.hidden = true;
  }

  renderProportion(issue);
  reveal("stage-scale-intro", "h-scale");
  $("#dotfield").hidden = false;
  $("#stage-proportion").hidden = false;
  $("#issue-colophon").hidden = false;
  currentField = createDotField(cfg);
}

function renderProportion(issue) {
  const cfg = issue.proportion;
  $("#h-proportion").textContent = cfg.heading;
  $("#proportion-lede").textContent = cfg.lede;

  const tiles = $("#tiles");
  tiles.innerHTML = "";
  cfg.tiles.forEach((t) => {
    const tile = make("div", "tile",
      `<p class="t-value"></p><p class="t-label"></p><p class="t-sub"></p>`);
    tile.querySelector(".t-value").textContent = t.value;
    tile.querySelector(".t-label").textContent = t.label;
    tile.querySelector(".t-sub").textContent = t.sub;
    tiles.appendChild(tile);
  });

  $("#epilogue-heading").textContent = cfg.epilogue.heading;
  const pts = $("#epilogue-points");
  pts.innerHTML = "";
  cfg.epilogue.points.forEach((p) => {
    const el = make("p");
    el.textContent = p;
    pts.appendChild(el);
  });

  const list = $("#sources-list");
  list.innerHTML = "";
  issue.sources.forEach((src) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = src.url; a.target = "_blank"; a.rel = "noopener";
    a.textContent = src.label;
    li.appendChild(a);
    const date = make("span", "src-date");
    date.textContent = ` (${src.date})`;
    li.appendChild(date);
    if (src.note) {
      const note = make("span", "src-note");
      note.textContent = ` — ${src.note}`;
      li.appendChild(note);
    }
    list.appendChild(li);
  });
  $("#sources-note").textContent = issue.sourcesNote;

  $("#btn-again").onclick = () => { showIssue(issue); };
  $("#btn-home").onclick = () => { location.hash = "#/"; };
}

// ── Boot ─────────────────────────────────────────────────────────────────────
renderHome();
window.addEventListener("hashchange", route);
route();
