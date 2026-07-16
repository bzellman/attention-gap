import { ISSUE } from "./config.js";

// Trust boundary: innerHTML is used ONLY for developer-authored static strings
// from config.js (same trust level as this file). Anything derived from user
// input — slider values, checkbox/radio state, computed scores — is inserted
// exclusively via textContent / property assignment, never string templates.

// ── Utilities ────────────────────────────────────────────────────────────────
const $ = (sel, root = document) => root.querySelector(sel);
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const fmt = (n) => n.toLocaleString("en-US");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

function make(tag, cls, html) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (html != null) node.innerHTML = html; // config.js strings only — see trust boundary note
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

// ── State (exposed for debugging/verification) ───────────────────────────────
const state = {
  perceived: 0,
  emotion: 0,
  engagement: new Set(),
  quiz: {},          // questionKey -> chosen option index
  scores: null
};
window.AG_STATE = state;

// ── Stage 0: hero ────────────────────────────────────────────────────────────
function renderHero() {
  $("#hero-kicker").textContent = ISSUE.kicker;
  $("#hero-title").textContent = ISSUE.title;
  $("#hero-tagline").textContent = ISSUE.tagline;
  const intro = $("#hero-intro");
  ISSUE.intro.forEach((p) => intro.appendChild(make("p", null, p)));
  $("#btn-begin").addEventListener("click", () => reveal("stage-perception", "h-perception"));
}

// ── Stage 1: perception ──────────────────────────────────────────────────────
function renderPerception() {
  const cfg = ISSUE.perception;
  $("#h-perception").textContent = cfg.heading;
  $("#perception-lede").textContent = cfg.lede;

  const sliders = $("#sliders");
  cfg.sliders.forEach((s) => {
    const block = make("div", "slider-block");
    const id = `sl-${s.key}`;
    block.innerHTML = `
      <label for="${id}">${s.label}</label>
      <div class="slider-row">
        <input type="range" id="${id}" min="0" max="10" step="1" value="0"
               aria-describedby="${id}-ends">
        <output class="slider-val" for="${id}">0</output>
      </div>
      <div class="slider-ends" id="${id}-ends"><span>${s.min}</span><span>${s.max}</span></div>`;
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
  cfg.engagement.items.forEach((item) => {
    const row = make("label", "check-row");
    row.innerHTML = `<input type="checkbox" value="${item.key}"><span>${item.label}</span>`;
    row.querySelector("input").setAttribute("aria-label", item.label);
    row.querySelector("input").addEventListener("change", (e) => {
      e.target.checked ? state.engagement.add(item.key) : state.engagement.delete(item.key);
    });
    items.appendChild(row);
  });

  $("#btn-perception").addEventListener("click", () => reveal("stage-quiz", "h-quiz"));
}

// ── Stage 2: quiz ────────────────────────────────────────────────────────────
function renderQuiz() {
  const cfg = ISSUE.quiz;
  $("#h-quiz").textContent = cfg.heading;
  $("#quiz-lede").textContent = cfg.lede;
  const wrap = $("#quiz-questions");

  cfg.questions.forEach((q, qi) => {
    const block = make("fieldset", "q-block");
    block.innerHTML = `<legend class="q-text">${qi + 1}. ${q.text}</legend>`;
    const opts = make("div", "q-options");
    q.options.forEach((opt, oi) => {
      const lab = make("label", "q-opt");
      lab.innerHTML = `<input type="radio" name="q-${q.key}" value="${oi}"><span>${opt.label}</span>`;
      lab.querySelector("input").setAttribute("aria-label", opt.label);
      lab.querySelector("input").addEventListener("change", () => {
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

  $("#btn-quiz").addEventListener("click", () => {
    state.scores = computeScores();
    renderGap();
    reveal("stage-gap", "h-gap");
  });
}

// ── Scoring ──────────────────────────────────────────────────────────────────
function computeScores() {
  const perceived = state.perceived * 10;
  const emotion = state.emotion * 10;
  let engagement = 0;
  ISSUE.perception.engagement.items.forEach((i) => {
    if (state.engagement.has(i.key)) engagement += i.w;
  });
  engagement = clamp(engagement, 0, 100);
  let measured = 0;
  ISSUE.quiz.questions.forEach((q) => {
    const chosen = q.options[state.quiz[q.key]];
    if (chosen) measured += chosen.w;
  });
  measured = clamp(measured, 0, 100);
  const felt = Math.round((perceived + emotion + engagement) / 3);
  return { perceived, emotion, engagement, measured, felt, gap: felt - measured };
}

// ── Stage 3: the gap ─────────────────────────────────────────────────────────
function renderGap() {
  const cfg = ISSUE.gap;
  const s = state.scores;
  $("#h-gap").textContent = cfg.heading;
  $("#gap-lede").textContent = cfg.lede;

  const styles = getComputedStyle(document.documentElement);
  const legend = $("#gap-legend");
  legend.innerHTML = "";
  Object.values(cfg.families).forEach((f) => {
    const key = make("span", "key");
    const swatch = make("span", "swatch");
    swatch.style.background = styles.getPropertyValue(f.colorVar);
    key.append(swatch, f.label);
    legend.appendChild(key);
  });

  const bars = $("#gap-bars");
  bars.innerHTML = "";
  const fills = [];
  cfg.bars.forEach((b) => {
    const family = cfg.families[b.family];
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
    fillEl.style.background = styles.getPropertyValue(family.colorVar);
    const valEl = row.querySelector(".bar-val");
    valEl.textContent = val;
    if (val > 84) valEl.classList.add("bar-val--in");
    bars.appendChild(row);
    fills.push({ fill: fillEl, val: valEl, pct: val });
  });
  // grow the bars on the frame after reveal so the transition runs
  requestAnimationFrame(() =>
    requestAnimationFrame(() =>
      fills.forEach(({ fill, val, pct }) => {
        fill.style.width = pct + "%";
        val.style.left = pct + "%";
      })
    )
  );

  const v = cfg.verdicts;
  const verdict =
    s.measured >= 50 ? v.stakeholder
    : s.gap >= 40 ? v.wide
    : s.gap >= 15 ? v.moderate
    : v.aligned;
  $("#gap-verdict").textContent = verdict.replace("{gap}", Math.max(0, s.gap));

  const meth = $("#methodology");
  meth.replaceChildren(
    make("p", null, cfg.methodologyNote),
    buildTable("Your scores", ["Your scores", ""],
      ISSUE.gap.bars.map((b) => [b.label, `${s[b.key]} / 100`])),
    buildTable("Engagement weights", ["Engagement actions", "Weight"],
      ISSUE.perception.engagement.items.map((i) => [i.label, `+${i.w}`])),
    buildTable("Exposure weights", ["Exposure questions (answer weights)", ""],
      ISSUE.quiz.questions.map((q, i) =>
        [`Q${i + 1} — ${q.options.map((o) => `${o.label} +${o.w}`).join(" · ")}`, ""]))
  );

  // assignment (not addEventListener) so re-running renderGap after answer
  // changes never stacks duplicate listeners
  $("#btn-gap").onclick = onEnterScale;
}

// ── Stage 4: the scale ───────────────────────────────────────────────────────
let scaleEntered = false;
function onEnterScale() {
  if (scaleEntered) {
    reveal("stage-scale-intro", "h-scale");
    return;
  }
  scaleEntered = true;
  const cfg = ISSUE.scale;
  $("#h-scale").textContent = cfg.heading;
  $("#scale-lede").textContent = cfg.lede;
  $("#scale-note").textContent = cfg.fieldNote;
  $("#df-skip").textContent = cfg.skipLabel + " →";
  $("#df-trans-label").textContent = cfg.highlightCounterLabel;

  reveal("stage-scale-intro", "h-scale");
  $("#dotfield").hidden = false;
  renderProportion();
  reveal("stage-proportion");
  $("#colophon").hidden = false;
  initDotField();
}

function initDotField() {
  if (window.AG_DF) { window.AG_DF.layout(); return; } // never double-init listeners
  const cfg = ISSUE.scale;
  const section = $("#dotfield");
  const canvas = $("#df-canvas");
  const ctx = canvas.getContext("2d", { alpha: false });
  const rootStyles = getComputedStyle(document.documentElement);
  const COLOR = {
    page: rootStyles.getPropertyValue("--page").trim(),
    dot: rootStyles.getPropertyValue("--dot").trim(),
    hi: rootStyles.getPropertyValue("--highlight").trim()
  };
  const TOTAL = cfg.total;
  const TAU = Math.PI * 2;

  let pitch, perRow, rows, fieldW, fieldX, fieldH, dpr, tile, vw, vh;
  let hiIdx = [];
  let lastLive = 0;

  function layout() {
    // Guard against degenerate viewports (prerender, hidden iframe, wedged
    // compositor): clamp to sane minimums so field math never goes negative;
    // the resize listener re-runs layout once real dimensions appear.
    vw = Math.max(320, window.innerWidth || document.documentElement.clientWidth);
    vh = Math.max(480, window.innerHeight || document.documentElement.clientHeight);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    pitch = vw < 640 ? 6 : 7;
    const dotSize = pitch - 3;
    fieldW = Math.min(1040, vw - 32);
    perRow = Math.floor(fieldW / pitch);
    fieldW = perRow * pitch;
    fieldX = Math.round((vw - fieldW) / 2);
    rows = Math.ceil(TOTAL / perRow);
    fieldH = rows * pitch;
    section.style.height = fieldH + vh + "px";

    canvas.width = vw * dpr;
    canvas.height = vh * dpr;
    canvas.style.width = vw + "px";
    canvas.style.height = vh + "px";

    tile = document.createElement("canvas");
    tile.width = fieldW * dpr;
    tile.height = pitch * dpr;
    const t = tile.getContext("2d");
    t.scale(dpr, dpr);
    t.fillStyle = COLOR.page;
    t.fillRect(0, 0, fieldW, pitch);
    t.fillStyle = COLOR.dot;
    for (let c = 0; c < perRow; c++) {
      t.beginPath();
      t.arc(c * pitch + pitch / 2, pitch / 2, dotSize / 2, 0, TAU);
      t.fill();
    }

    // ten highlighted athletes, spread through the final ~600 dots
    const offsets = [23, 71, 134, 188, 262, 331, 402, 458, 521, 583];
    hiIdx = offsets.slice(0, cfg.highlighted).map((o) => TOTAL - 1 - o);

    placeMilestones();
    draw();
  }

  function placeMilestones() {
    const wrap = $("#df-marks");
    wrap.innerHTML = "";
    cfg.milestones.forEach((m) => {
      const card = make("aside", "df-milestone");
      card.innerHTML = `<p class="df-kicker">${m.kicker}</p><p>${m.body}</p>`;
      card.style.top = Math.round(Math.floor(m.at / perRow) * pitch) + "px";
      wrap.appendChild(card);
    });
    const r = cfg.reveal;
    const card = make("aside", "df-milestone df-reveal");
    card.innerHTML = `
      <p class="df-kicker">${r.kicker}</p>
      <p class="df-figure">${r.figure}</p>
      <p class="df-attr">${r.attribution}</p>
      <p class="df-note">${r.note}</p>`;
    // rests at 15% viewport height once the field freezes at journey's end
    card.style.top = Math.round(fieldH + vh * 0.15) + "px";
    wrap.appendChild(card);
  }

  function draw() {
    // self-heal if the viewport changed without a resize event
    if (window.innerWidth &&
        (window.innerWidth !== vw || Math.abs(window.innerHeight - vh) >= 120)) {
      layout(); // layout() redraws with fresh dimensions
      return;
    }
    const rect = section.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > vh) return;
    const rawOffset = clamp(-rect.top, 0, fieldH);
    // freeze the field with its final rows resting at ~62% viewport height, so
    // the ten highlighted dots stay in view while the reveal card settles
    const offset = Math.min(rawOffset, Math.max(0, fieldH - Math.round(vh * 0.62)));

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = COLOR.page;
    ctx.fillRect(0, 0, vw, vh);

    const firstRow = Math.floor(offset / pitch);
    const yShift = -(offset - firstRow * pitch);
    const visRows = Math.ceil(vh / pitch) + 1;
    const fullRows = Math.floor(TOTAL / perRow);
    const remainder = TOTAL - fullRows * perRow;

    for (let i = 0; i < visRows; i++) {
      const r = firstRow + i;
      if (r >= rows) break;
      const y = yShift + i * pitch;
      ctx.drawImage(tile, fieldX, y, fieldW, pitch);
      if (r === rows - 1 && remainder > 0) {
        ctx.fillStyle = COLOR.page;
        ctx.fillRect(fieldX + remainder * pitch, y - 0.5, fieldW - remainder * pitch, pitch + 1);
      }
    }

    for (const idx of hiIdx) {
      const r = Math.floor(idx / perRow);
      if (r < firstRow - 1 || r > firstRow + visRows) continue;
      const cx = fieldX + (idx % perRow) * pitch + pitch / 2;
      const cy = yShift + (r - firstRow) * pitch + pitch / 2;
      ctx.beginPath(); ctx.arc(cx, cy, pitch * 1.15, 0, TAU); ctx.fillStyle = COLOR.page; ctx.fill();
      ctx.beginPath(); ctx.arc(cx, cy, pitch * 0.78, 0, TAU); ctx.fillStyle = "#ffffff"; ctx.fill();
      ctx.beginPath(); ctx.arc(cx, cy, pitch * 0.52, 0, TAU); ctx.fillStyle = COLOR.hi; ctx.fill();
    }

    updateHUD(rawOffset);
  }

  function updateHUD(offset) {
    const count = clamp(Math.floor((offset + vh) / pitch) * perRow, 0, TOTAL);
    const transSeen = hiIdx.filter((i) => i < count).length;
    $("#df-count").textContent = fmt(count);
    $("#df-count-label").textContent =
      count === 1 ? cfg.counterLabelSingular : cfg.counterLabelPlural;
    const transEl = $("#df-trans");
    transEl.textContent = fmt(transSeen);
    transEl.classList.toggle("lit", transSeen > 0);
    $("#df-rail-marker").style.top = (offset / fieldH) * 100 + "%";

    const now = performance.now();
    if (now - lastLive > 1000) {
      lastLive = now;
      $("#df-live").textContent =
        `${fmt(count)} of ${fmt(TOTAL)} athletes passed; ${transSeen} transgender athletes seen.`;
    }
  }

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => { ticking = false; draw(); });
    }
  }, { passive: true });

  window.addEventListener("resize", () => {
    // ignore small height jitter from mobile URL bars
    if (window.innerWidth === vw && Math.abs(window.innerHeight - vh) < 120) return;
    layout();
  });

  $("#df-skip").addEventListener("click", () => {
    const row = Math.floor(cfg.skipToDot / perRow);
    window.scrollTo({ top: section.offsetTop + row * pitch - vh * 0.5, behavior: "auto" });
  });

  // if the tab was backgrounded (rAF suspended), repaint on return
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) draw();
  });

  layout();
  window.AG_DF = { draw, layout }; // debug/verification hook
}

// ── Stage 5: proportion ──────────────────────────────────────────────────────
function renderProportion() {
  const cfg = ISSUE.proportion;
  $("#h-proportion").textContent = cfg.heading;
  $("#proportion-lede").textContent = cfg.lede;

  const tiles = $("#tiles");
  tiles.innerHTML = "";
  cfg.tiles.forEach((t) => {
    tiles.appendChild(make("div", "tile",
      `<p class="t-value">${t.value}</p><p class="t-label">${t.label}</p><p class="t-sub">${t.sub}</p>`));
  });

  $("#epilogue-heading").textContent = cfg.epilogue.heading;
  const pts = $("#epilogue-points");
  pts.innerHTML = "";
  cfg.epilogue.points.forEach((p) => pts.appendChild(make("p", null, p)));
  const chips = $("#planned-chips");
  chips.innerHTML = "";
  cfg.epilogue.plannedIssues.forEach((c) => chips.appendChild(make("span", "chip", c)));
  $("#planned-note").textContent = cfg.epilogue.plannedNote;

  const list = $("#sources-list");
  list.innerHTML = "";
  ISSUE.sources.forEach((s) => {
    list.appendChild(make("li", null,
      `<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a> <span class="src-date">(${s.date})</span>`));
  });
  $("#sources-note").textContent = ISSUE.sourcesNote;

  $("#btn-restart").addEventListener("click", () => location.reload());
}

// ── Boot ─────────────────────────────────────────────────────────────────────
renderHero();
renderPerception();
renderQuiz();
