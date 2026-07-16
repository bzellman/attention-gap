// ─────────────────────────────────────────────────────────────────────────────
// Visualization engine: the dot field (single or duel columns, unit scaling,
// dim/bright highlight tiers, zero-highlight variant), the guess-then-reveal
// calibration widget, and a minimal single-series trend chart.
// All colors come from CSS custom properties; all user-derived values pass
// through textContent only.
// ─────────────────────────────────────────────────────────────────────────────

const $ = (sel, root = document) => root.querySelector(sel);
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const fmt = (n) => Math.round(n).toLocaleString("en-US");
const TAU = Math.PI * 2;

function cssColor(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function make(tag, cls, html) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (html != null) node.innerHTML = html; // trusted config strings only
  return node;
}

// Deterministic spread of `count` marks across `total` dots (dim tier).
function spreadIndices(count, total) {
  const out = [];
  for (let i = 0; i < count; i++) {
    const base = Math.floor((i + 0.5) * (total / count));
    const jitter = ((i * 7919) % 601) - 300;
    out.push(clamp(base + jitter, 0, total - 1));
  }
  return out;
}

// Cluster of `count` marks spread evenly through the final stretch (bright tier).
function endIndices(count, total) {
  if (count <= 0) return [];
  const span = Math.min(600, Math.max(60, count * 55));
  const out = [];
  for (let i = 0; i < count; i++) {
    const back = Math.round((i + 0.5) * (span / count));
    out.push(total - 1 - Math.min(back, total - 1));
  }
  return out;
}

export function createDotField(scaleCfg) {
  const section = $("#dotfield");
  const canvas = $("#df-canvas");
  const ctx = canvas.getContext("2d", { alpha: false });
  const abort = new AbortController();
  const COLOR = {
    page: cssColor("--page"), dot: cssColor("--dot"),
    bright: cssColor("--highlight"), dim: cssColor("--highlight-dim")
  };

  const isDuel = scaleCfg.variant === "duel";
  const unit = scaleCfg.unit || 1;
  // Columns: one full-width field, or two half-width fields (duel).
  const columns = isDuel
    ? [scaleCfg.duel.a, scaleCfg.duel.b].map((c) => ({
        total: c.total,
        bright: endIndices(c.highlights, c.total),
        dim: []
      }))
    : [{
        total: scaleCfg.total,
        bright: endIndices(
          (scaleCfg.highlights.find((h) => h.tier === "bright") || { dots: 0 }).dots,
          Math.ceil(scaleCfg.total / unit)
        ),
        dim: spreadIndices(
          (scaleCfg.highlights.find((h) => h.tier === "dim") || { dots: 0 }).dots,
          Math.ceil(scaleCfg.total / unit)
        )
      }];
  // In dot space every column holds total/unit dots.
  columns.forEach((c) => { c.dots = Math.ceil(c.total / (isDuel ? 1 : unit)); });

  let pitch, perRow, rows, colW, gapW, fieldW, fieldX, fieldH, dpr, vw, vh, tiles;
  let lastLive = 0;

  function layout() {
    vw = Math.max(320, window.innerWidth || document.documentElement.clientWidth);
    vh = Math.max(480, window.innerHeight || document.documentElement.clientHeight);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    pitch = vw < 640 ? 6 : 7;
    const dotSize = pitch - 3;
    fieldW = Math.min(1040, vw - 32);
    gapW = isDuel ? Math.max(24, Math.floor(fieldW * 0.06)) : 0;
    colW = isDuel ? Math.floor((fieldW - gapW) / 2) : fieldW;
    perRow = Math.floor(colW / pitch);
    colW = perRow * pitch;
    fieldW = isDuel ? colW * 2 + gapW : colW;
    fieldX = Math.round((vw - fieldW) / 2);
    rows = Math.max(...columns.map((c) => Math.ceil(c.dots / perRow)));
    fieldH = rows * pitch;
    section.style.height = fieldH + vh + "px";

    canvas.width = vw * dpr; canvas.height = vh * dpr;
    canvas.style.width = vw + "px"; canvas.style.height = vh + "px";

    tiles = columns.map(() => {
      const t = document.createElement("canvas");
      t.width = colW * dpr; t.height = pitch * dpr;
      const tc = t.getContext("2d");
      tc.scale(dpr, dpr);
      tc.fillStyle = COLOR.page; tc.fillRect(0, 0, colW, pitch);
      tc.fillStyle = COLOR.dot;
      for (let c = 0; c < perRow; c++) {
        tc.beginPath(); tc.arc(c * pitch + pitch / 2, pitch / 2, dotSize / 2, 0, TAU); tc.fill();
      }
      return t;
    });

    placeMilestones();
    draw();
  }

  function placeMilestones() {
    const wrap = $("#df-marks");
    wrap.innerHTML = "";
    (scaleCfg.milestones || []).forEach((m) => {
      const card = make("aside", "df-milestone");
      card.innerHTML = `<p class="df-kicker"></p><p></p>`;
      card.children[0].textContent = m.kicker;
      card.children[1].textContent = m.body;
      card.style.top = Math.round(Math.floor(m.at / perRow) * pitch) + "px";
      wrap.appendChild(card);
    });
    const r = scaleCfg.reveal;
    const card = make("aside", "df-milestone df-reveal");
    card.innerHTML = `<p class="df-kicker"></p><p class="df-figure"></p><p class="df-attr"></p><p class="df-note"></p>`;
    card.children[0].textContent = r.kicker;
    card.children[1].textContent = r.figure;
    card.children[2].textContent = r.attribution;
    card.children[3].textContent = r.note;
    card.style.top = Math.round(fieldH + vh * 0.15) + "px";
    wrap.appendChild(card);
  }

  function colX(i) { return fieldX + i * (colW + gapW); }

  function drawMark(cx, cy, color) {
    ctx.beginPath(); ctx.arc(cx, cy, pitch * 1.15, 0, TAU); ctx.fillStyle = COLOR.page; ctx.fill();
    ctx.beginPath(); ctx.arc(cx, cy, pitch * 0.78, 0, TAU); ctx.fillStyle = "#ffffff"; ctx.fill();
    ctx.beginPath(); ctx.arc(cx, cy, pitch * 0.52, 0, TAU); ctx.fillStyle = color; ctx.fill();
  }

  function drawDim(cx, cy) {
    ctx.beginPath(); ctx.arc(cx, cy, pitch * 0.55, 0, TAU); ctx.fillStyle = COLOR.dim; ctx.fill();
  }

  function draw() {
    if (abort.signal.aborted) return;
    if (window.innerWidth &&
        (window.innerWidth !== vw || Math.abs(window.innerHeight - vh) >= 120)) {
      layout(); // self-heal if the viewport changed without a resize event
      return;
    }
    const rect = section.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > vh) return;
    const rawOffset = clamp(-rect.top, 0, fieldH);
    // freeze with the final rows resting at ~62% viewport height
    const offset = Math.min(rawOffset, Math.max(0, fieldH - Math.round(vh * 0.62)));

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = COLOR.page;
    ctx.fillRect(0, 0, vw, vh);

    const firstRow = Math.floor(offset / pitch);
    const yShift = -(offset - firstRow * pitch);
    const visRows = Math.ceil(vh / pitch) + 1;

    columns.forEach((col, ci) => {
      const x = colX(ci);
      const fullRows = Math.floor(col.dots / perRow);
      const remainder = col.dots - fullRows * perRow;
      const colRows = Math.ceil(col.dots / perRow);
      for (let i = 0; i < visRows; i++) {
        const r = firstRow + i;
        if (r >= colRows) break;
        const y = yShift + i * pitch;
        ctx.drawImage(tiles[ci], x, y, colW, pitch);
        if (r === colRows - 1 && remainder > 0) {
          ctx.fillStyle = COLOR.page;
          ctx.fillRect(x + remainder * pitch, y - 0.5, colW - remainder * pitch, pitch + 1);
        }
      }
      const drawSet = (indices, bright) => {
        for (const idx of indices) {
          const r = Math.floor(idx / perRow);
          if (r < firstRow - 1 || r > firstRow + visRows) continue;
          const cx = x + (idx % perRow) * pitch + pitch / 2;
          const cy = yShift + (r - firstRow) * pitch + pitch / 2;
          bright ? drawMark(cx, cy, COLOR.bright) : drawDim(cx, cy);
        }
      };
      drawSet(col.dim, false);
      drawSet(col.bright, true);
    });

    updateHUD(rawOffset);
  }

  function updateHUD(offset) {
    const dotCount = clamp(Math.floor((offset + vh) / pitch) * perRow, 0, columns[0].dots);
    const realCount = clamp(dotCount * (isDuel ? 1 : unit), 0, isDuel ? columns[0].total : scaleCfg.total);
    const marksPassed = columns.reduce((sum, col) =>
      sum + col.bright.filter((i) => i < dotCount).length + col.dim.filter((i) => i < dotCount).length, 0);
    $("#df-count").textContent = fmt(realCount);
    const transEl = $("#df-trans");
    transEl.textContent = fmt(marksPassed);
    transEl.classList.toggle("lit", marksPassed > 0);
    $("#df-rail-marker").style.top = (offset / fieldH) * 100 + "%";

    const now = performance.now();
    if (now - lastLive > 1000) {
      lastLive = now;
      $("#df-live").textContent =
        `${fmt(realCount)} ${scaleCfg.unitLabel} passed; ${marksPassed} highlighted marks seen.`;
    }
  }

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => { ticking = false; draw(); });
    }
  }, { passive: true, signal: abort.signal });

  window.addEventListener("resize", () => {
    if (window.innerWidth === vw && Math.abs(window.innerHeight - vh) < 120) return;
    layout();
  }, { signal: abort.signal });

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) draw();
  }, { signal: abort.signal });

  $("#df-skip").addEventListener("click", () => {
    const row = Math.floor(scaleCfg.skipToDot / perRow);
    window.scrollTo({ top: section.offsetTop + row * pitch - vh * 0.5, behavior: "auto" });
  }, { signal: abort.signal });

  layout();
  const api = { layout, draw, destroy: () => abort.abort() };
  window.AG_DF = api; // debug/verification hook
  return api;
}

// ── Calibration: guess before you see ────────────────────────────────────────
export function renderCalibration(cfg, onContinue) {
  const wrap = $("#calibration-body");
  wrap.innerHTML = `
    <p class="cal-prompt"></p>
    <div class="cal-input-row">
      <label class="visually-hidden" for="cal-input"></label>
      <input id="cal-input" type="number" min="0" step="any" inputmode="decimal" placeholder="Your guess">
      <button class="btn primary" id="cal-lock" type="button">Lock in my guess</button>
    </div>
    <div class="cal-result" id="cal-result" hidden>
      <p class="cal-numbers"><span class="cal-guess"></span><span class="cal-vs">vs</span><span class="cal-actual"></span></p>
      <p class="cal-verdict"></p>
      <p class="cal-context"></p>
      <p class="fine-note cal-source"></p>
      <button class="btn primary" id="cal-continue" type="button">Now travel the scale →</button>
    </div>`;
  wrap.querySelector(".cal-prompt").textContent = cfg.prompt;
  wrap.querySelector("label").textContent = cfg.inputLabel;
  wrap.querySelector(".cal-context").textContent = cfg.context;
  wrap.querySelector(".cal-source").textContent = "Source: " + cfg.sourceNote;

  const input = wrap.querySelector("#cal-input");
  const lock = wrap.querySelector("#cal-lock");
  const result = wrap.querySelector("#cal-result");

  function reveal() {
    const guess = Number(input.value);
    if (!Number.isFinite(guess) || input.value.trim() === "") { input.focus(); return; }
    input.disabled = true; lock.disabled = true;
    wrap.querySelector(".cal-guess").textContent = `you: ${guess.toLocaleString("en-US")}`;
    wrap.querySelector(".cal-actual").textContent =
      `actual: ${cfg.actual.toLocaleString("en-US")} — ${cfg.actualLabel}`;
    const v = wrap.querySelector(".cal-verdict");
    if (cfg.actual === 0) {
      v.textContent = guess === 0
        ? "Exactly right — hold that thought for the field below."
        : "The actual number is zero. Whatever you guessed, the gap is infinite — that’s this issue’s whole story.";
    } else if (guess <= 0) {
      v.textContent = "You guessed at or below zero — the real number is small, but it isn’t nothing. The dots below are people.";
    } else {
      // "heat" = how much more dangerous/frequent the guess implies vs the data.
      // For inverted questions (bigger number = safer), low guesses run hot.
      const heat = cfg.invert ? cfg.actual / guess : guess / cfg.actual;
      const x = heat >= 10 || heat <= 0.1
        ? Math.round(heat >= 1 ? heat : 1 / heat)
        : (heat >= 1 ? heat : 1 / heat).toFixed(1);
      v.textContent =
        heat >= 1.5 ? `Your sense of this runs about ${x}× hotter than the documented number. You’re in large company — that multiple is the attention gap, measured on yourself.`
        : heat <= 0.67 ? `Your sense of this runs about ${x}× cooler than the documented number — worth knowing in that direction too.`
        : "You were within about ±50% — genuinely well calibrated. See how the scale feels anyway.";
    }
    result.hidden = false;
    result.querySelector("#cal-continue").addEventListener("click", onContinue, { once: true });
  }
  lock.addEventListener("click", reveal);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") reveal(); });
}

// ── Trend chart: single series, direct-labeled anchors ───────────────────────
export function renderTrendChart(cfg) {
  const wrap = $("#trend-body");
  const W = 640, H = 240, padL = 16, padR = 40, padT = 28, padB = 34;
  const xs = cfg.series.map((p) => p.year);
  const ys = cfg.series.map((p) => p.value);
  const xMin = Math.min(...xs), xMax = Math.max(...xs);
  const yMax = Math.max(...ys) * 1.12;
  const X = (yr) => padL + ((yr - xMin) / (xMax - xMin)) * (W - padL - padR);
  const Y = (v) => H - padB - (v / yMax) * (H - padT - padB);

  const line = cssColor("--felt");
  const grid = cssColor("--hair");
  const inkMuted = cssColor("--muted");
  const ink = cssColor("--ink");

  const pts = cfg.series.map((p) => `${X(p.year).toFixed(1)},${Y(p.value).toFixed(1)}`).join(" ");
  const peak = cfg.series.reduce((a, b) => (b.value > a.value ? b : a));
  const first = cfg.series[0], last = cfg.series[cfg.series.length - 1];
  const labeled = new Set([first, last, peak]);

  const gridLines = [0.5, 1].map((f) => {
    const y = Y(yMax * f / 1.12);
    return `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="${grid}" stroke-width="1"/>`;
  }).join("");

  const dots = cfg.series.map((p) => {
    const label = labeled.has(p)
      ? `<text x="${X(p.year)}" y="${Y(p.value) - 12}" text-anchor="middle" fill="${ink}" font-size="13" font-weight="700">${p.value.toLocaleString("en-US")}</text>`
      : "";
    return `<circle cx="${X(p.year)}" cy="${Y(p.value)}" r="4.5" fill="${line}" stroke="${cssColor("--surface")}" stroke-width="2"/>
      <text x="${X(p.year)}" y="${H - padB + 18}" text-anchor="middle" fill="${inkMuted}" font-size="11">${p.year}</text>${label}`;
  }).join("");

  wrap.innerHTML = `
    <figure class="trend-figure">
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${cfg.heading}: ${cfg.series.map((p) => `${p.year}: ${p.value}`).join(", ")}">
        ${gridLines}
        <line x1="${padL}" y1="${H - padB}" x2="${W - padR}" y2="${H - padB}" stroke="${cssColor("--baseline")}" stroke-width="1"/>
        <polyline points="${pts}" fill="none" stroke="${line}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
        ${dots}
      </svg>
      <figcaption class="fine-note"></figcaption>
    </figure>`;
  wrap.querySelector("figcaption").textContent = cfg.sourceNote;
}
