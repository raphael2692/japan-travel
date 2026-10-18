// Illustrazioni pixel-art del sito, disegnate da codice su una griglia e
// convertite in SVG (un <path> per colore). I colori sono variabili CSS
// --px-<chiave> definite in style.css per tema chiaro e scuro.
//   - banner in testata (solo index): Fuji, colline autunnali, lago, torii
//   - sfondo fisso: Kyoto a sinistra (acero, pagoda, lanterna, torii),
//     Tokyo a destra (Skytree, grattacieli, Tokyo Tower), foglie che cadono

function rng(seed) {
  return () => {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function pxCanvas(w, h) {
  const g = Array.from({ length: h }, () => new Array(w).fill(""));
  const c = {
    w, h,
    get: (x, y) => (x >= 0 && y >= 0 && x < w && y < h) ? g[y][x] : "",
    set(x, y, k) {
      x = Math.round(x); y = Math.round(y);
      if (x >= 0 && y >= 0 && x < w && y < h) g[y][x] = k;
    },
    rect(x, y, rw, rh, k) { for (let j = 0; j < rh; j++) for (let i = 0; i < rw; i++) c.set(x + i, y + j, k); },
    hline(x0, x1, y, k) { for (let x = Math.round(x0); x <= Math.round(x1); x++) c.set(x, y, k); },
    vline(x, y0, y1, k) { for (let y = Math.round(y0); y <= Math.round(y1); y++) c.set(x, y, k); },
    svg(cls, align) {
      const paths = {};
      g.forEach((row, y) => {
        let x = 0;
        while (x < w) {
          const k = row[x];
          if (!k) { x++; continue; }
          let e = x;
          while (e + 1 < w && row[e + 1] === k) e++;
          (paths[k] = paths[k] || []).push(`M${x} ${y}h${e - x + 1}v1h${x - e - 1}z`);
          x = e + 1;
        }
      });
      return `<svg class="${cls}" viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges" preserveAspectRatio="${align || "xMidYMax meet"}" aria-hidden="true">` +
        Object.entries(paths).map(([k, d]) => `<path fill="var(--px-${k})" d="${d.join("")}"/>`).join("") + "</svg>";
    }
  };
  return c;
}

// --- elementi ---

function drawPagoda(c, cx, base) {
  c.rect(cx - 15, base - 3, 31, 3, "st");
  c.hline(cx - 15, cx + 15, base - 3, "stl");
  c.hline(cx - 15, cx + 15, base - 1, "std");
  let y = base - 3;
  const bodyHalf = [6, 5, 5, 4, 4], roofHalf = [13, 12, 11, 10, 9];
  for (let i = 0; i < 5; i++) {
    const hb = bodyHalf[i], bh = i === 0 ? 8 : 5;
    // corpo: pareti chiare, pilastri rossi, porta o grata scura, balaustra
    c.rect(cx - hb, y - bh, hb * 2 + 1, bh, "wl");
    c.vline(cx - hb, y - bh, y - 1, "rd");
    c.vline(cx + hb, y - bh, y - 1, "rdd");
    if (i === 0) {
      c.rect(cx - 2, y - 6, 5, 6, "ink");
      c.vline(cx, y - 6, y - 1, "rdd");
      c.vline(cx - 4, y - bh, y - 1, "rd"); c.vline(cx + 4, y - bh, y - 1, "rdd");
    } else {
      for (let x = cx - 2; x <= cx + 2; x++) c.set(x, y - 3, (x + i) % 2 ? "ink" : "rdd");
      c.hline(cx - hb - 1, cx + hb + 1, y - 1, "rdd");
    }
    c.hline(cx - hb, cx + hb, y - bh, "ink"); // ombra delle mensole sotto il tetto
    y -= bh;
    // tetto con le gronde rialzate alle estremità
    const hr = roofHalf[i];
    c.hline(cx - hr, cx + hr, y - 1, "rfl");
    c.set(cx - hr - 1, y - 2, "rfl"); c.set(cx + hr + 1, y - 2, "rfl");
    c.set(cx - hr - 2, y - 3, "rfl"); c.set(cx + hr + 2, y - 3, "rfl");
    c.hline(cx - hr, cx + hr, y - 2, "rf");
    c.hline(cx - hr + 2, cx + hr - 2, y - 3, "rf");
    c.hline(cx + 1, cx + hr - 2, y - 3, "rfd");
    c.hline(cx + 1, cx + hr, y - 2, "rfd");
    c.hline(cx - hr + 4, cx + hr - 4, y - 4, "rfd");
    y -= 4;
  }
  // pinnacolo (sorin) con anelli dorati e gioiello in cima
  c.vline(cx, y - 15, y, "ink");
  for (let k = 0; k < 5; k++) c.hline(cx - 1, cx + 1, y - 2 - k * 2, "gd");
  c.rect(cx - 1, y - 17, 3, 2, "gd");
  c.set(cx, y - 18, "gd");
}

function drawMaple(c, cx, base, seed, scale) {
  const r = rng(seed), s = scale || 1;
  // tronco e rami
  c.rect(cx - 1, base - Math.round(22 * s), 3, Math.round(22 * s), "tr");
  c.vline(cx + 1, base - Math.round(22 * s), base - 1, "trd");
  c.set(cx - 2, base - 1, "tr"); c.set(cx + 2, base - 1, "trd");
  for (let k = 0; k < 6 * s; k++) { c.set(cx - 2 - k, base - 18 * s - k, "tr"); c.set(cx + 2 + k, base - 17 * s - k, "trd"); }
  // chioma: unione di cerchi, gialla in alto e rossa in basso, ombra in basso a destra
  const blobs = [[0, -31, 11], [-8, -25, 8], [8, -26, 8], [-2, -41, 7], [6, -36, 7], [-7, -35, 6]]
    .map(([dx, dy, rr]) => [cx + dx * s, base + dy * s, rr * s]);
  const top = Math.min(...blobs.map(b => b[1] - b[2])), bot = Math.max(...blobs.map(b => b[1] + b[2]));
  for (let y = Math.floor(top); y <= bot; y++) {
    for (let x = cx - 20 * s; x <= cx + 20 * s; x++) {
      const inside = blobs.some(([bx, by, br]) => (x - bx) ** 2 + (y - by) ** 2 <= br * br);
      if (!inside || r() < .05) continue;
      const v = (y - top) / (bot - top) + (r() - .5) * .45;
      const shade = (x - cx) + (y - top) > 26 * s && r() < .7;
      c.set(x, y, shade ? "lmd" : v < .3 ? "ly" : v < .62 ? "lo" : "lm");
    }
  }
  // foglie cadute a terra
  for (let k = 0; k < 9 * s; k++) c.set(cx - 14 * s + r() * 28 * s, base - (r() < .5 ? 1 : 0), ["lm", "lo", "ly"][k % 3]);
}

function drawTorii(c, x0, base, w, hgt) {
  const top = base - hgt;
  c.hline(x0 - 1, x0 + w, top, "ink");
  c.set(x0 - 2, top - 1, "ink"); c.set(x0 + w + 1, top - 1, "ink");
  c.hline(x0, x0 + w - 1, top + 1, "rd");
  c.hline(x0 + 1, x0 + w - 2, top + 2, "rdd");
  const mid = x0 + Math.floor(w / 2);
  c.rect(mid - 1, top + 3, 3, 3, "rd");
  c.hline(x0, x0 + w - 1, top + 6, "rd");
  c.hline(x0, x0 + w - 1, top + 7, "rdd");
  [x0 + 3, x0 + w - 6].forEach(px => {
    c.rect(px, top + 3, 3, hgt - 3, "rd");
    c.vline(px + 2, top + 3, base - 1, "rdd");
    c.rect(px, base - 2, 3, 2, "ink");
  });
}

function drawLantern(c, cx, base) {
  c.hline(cx - 3, cx + 3, base - 1, "std");
  c.rect(cx - 1, base - 5, 3, 4, "st");
  c.hline(cx - 2, cx + 2, base - 6, "stl");
  c.rect(cx - 2, base - 9, 5, 3, "st");
  c.rect(cx - 1, base - 9, 3, 2, "win");
  c.hline(cx - 3, cx + 3, base - 10, "std");
  c.hline(cx - 2, cx + 2, base - 11, "st");
  c.set(cx, base - 12, "stl");
}

function drawTokyoTower(c, cx, base, H) {
  const top = base - H;
  for (let y = top; y < base; y++) {
    const t = (base - y) / H;
    const band = Math.floor((base - y) / 7) % 2;
    if (t > .8) { // antenna
      c.set(cx, y, band ? "tw" : "to");
      if (t < .9) c.set(cx + 1, y, "tod");
      continue;
    }
    const hw = Math.round(1 + 14 * Math.pow(1 - t, 2.4));
    for (let x = cx - hw; x <= cx + hw; x++) {
      const right = x > cx;
      const col = band ? (right ? "twd" : "tw") : (right ? "tod" : "to");
      const edge = x <= cx - hw + (t < .13 ? 2 : 0) || x >= cx + hw - (t < .13 ? 2 : 0);
      if (t < .13 && !edge) continue; // arco tra le gambe
      const lattice = (x - cx + y) % 4 === 0 || (x - cx - y + 400) % 4 === 0;
      const tie = (base - y) % 11 === 0;
      if (edge || lattice || tie) c.set(x, y, col);
    }
  }
  // osservatori: principale e "top deck"
  [[.36, 4, 3], [.62, 3, 2]].forEach(([t, hgt, extra]) => {
    const y = Math.round(base - H * t);
    const hw = Math.round(1 + 14 * Math.pow(1 - t, 2.4)) + extra;
    c.rect(cx - hw, y - hgt, hw * 2 + 1, hgt, "dk");
    c.hline(cx - hw + 1, cx + hw - 1, y - hgt + 1, "win");
    c.hline(cx - hw, cx + hw, y - hgt, "tw");
  });
}

function drawSkytree(c, cx, base, H) {
  for (let y = base - H; y < base; y++) {
    const t = (base - y) / H;
    if (t > .84) { c.set(cx, y, "sk"); continue; }
    const hw = Math.round(1 + 3.4 * (1 - t));
    for (let x = cx - hw; x <= cx + hw; x++) {
      const edge = x === cx - hw || x === cx + hw;
      if (edge || (x + y) % 3 === 0) c.set(x, y, x > cx ? "skd" : "sk");
    }
  }
  [[.57, 3, 4], [.74, 2, 3]].forEach(([t, hgt, extra]) => {
    const y = Math.round(base - H * t), hw = Math.round(1 + 3.4 * (1 - t)) + extra;
    c.rect(cx - hw, y - hgt, hw * 2 + 1, hgt, "dk");
    c.hline(cx - hw + 1, cx + hw - 1, y - hgt + 1, "win");
  });
}

function drawBuilding(c, b, r) {
  const top = b.base - b.h;
  c.rect(b.x, top, b.w, b.h, "bd");
  c.rect(b.x + b.w - 2, top, 2, b.h, "bds");
  c.hline(b.x, b.x + b.w - 1, top, "bdl");
  for (let y = top + 3; y < b.base - 3; y += 3) {
    for (let x = b.x + 2; x < b.x + b.w - 3; x += 3) {
      c.rect(x, y, 2, 1, r() < .42 ? "win" : "wnd");
    }
  }
  c.rect(b.x + Math.floor(b.w / 2) - 1, b.base - 3, 3, 3, "dk"); // ingresso
  if (b.roof === "ant") { c.vline(b.x + 3, top - 7, top - 1, "dk"); c.set(b.x + 3, top - 8, "to"); }
  if (b.roof === "tank") { c.rect(b.x + b.w - 6, top - 3, 4, 3, "bds"); c.hline(b.x + b.w - 6, b.x + b.w - 3, top - 3, "bdl"); }
  if (b.roof === "step") { c.rect(b.x + 2, top - 4, b.w - 4, 4, "bd"); c.hline(b.x + 2, b.x + b.w - 3, top - 4, "bdl"); }
}

// --- scene ---

function kyotoScene() {
  const c = pxCanvas(104, 96), base = 92;
  drawMaple(c, 15, base, 7);
  drawPagoda(c, 48, base);
  drawLantern(c, 67, base);
  drawTorii(c, 74, base, 22, 26);
  c.rect(0, base, 104, 4, "gnd");
  c.hline(0, 103, base, "gndl");
  return c.svg("bg-kyoto-art", "xMinYMax meet");
}

function tokyoScene() {
  const c = pxCanvas(112, 124), base = 120, r = rng(42);
  drawSkytree(c, 14, base, 116);
  [{ x: 24, w: 13, h: 58, roof: "ant" }, { x: 36, w: 11, h: 44, roof: "step" },
   { x: 46, w: 13, h: 72, roof: "tank" }, { x: 96, w: 14, h: 54, roof: "ant" }]
    .forEach(b => drawBuilding(c, { ...b, base }, r));
  drawTokyoTower(c, 76, base, 108);
  [{ x: 57, w: 10, h: 26 }, { x: 86, w: 11, h: 20, roof: "tank" }, { x: 0, w: 9, h: 30, roof: "step" }]
    .forEach(b => drawBuilding(c, { ...b, base }, r));
  c.rect(0, base, 112, 4, "gnd");
  c.hline(0, 111, base, "gndl");
  return c.svg("bg-tokyo-art", "xMaxYMax meet");
}

function heroScene() {
  const W = 192, H = 60, c = pxCanvas(W, H), r = rng(11);
  const lake = 47;
  // cielo a bande con dithering tra una banda e l'altra; stelle visibili solo col tema scuro
  const bands = ["sky1", "sky2", "sky3", "sky4"];
  for (let y = 0; y < lake; y++) {
    const f = y / lake * (bands.length - 1), i = Math.floor(f), frac = f - i;
    for (let x = 0; x < W; x++) {
      const next = frac > .5 && (x + y) % 2 === 0 && frac < .85 ? bands[i + 1] : frac >= .85 ? bands[i + 1] : bands[i];
      c.set(x, y, next || bands[i]);
    }
  }
  for (let k = 0; k < 26; k++) c.set(Math.floor(r() * W), Math.floor(r() * 30), "star");
  // astro: sole di giorno, luna di notte (stesso disegno, colori da tema)
  const ox = 160, oy = 13;
  for (let y = -7; y <= 7; y++) for (let x = -7; x <= 7; x++) {
    const d = x * x + y * y;
    if (d <= 49) c.set(ox + x, oy + y, d > 30 && x + y > 2 ? "orbd" : (x + y < -5 && d < 30 ? "orbl" : "orb"));
  }
  // nuvole
  [[118, 20, 14], [26, 12, 18], [170, 26, 10]].forEach(([x, y, w]) => {
    c.hline(x, x + w, y, "cl"); c.hline(x + 3, x + w - 4, y - 1, "cl"); c.hline(x + 6, x + w - 8, y - 2, "cl");
  });
  // Fuji: neve con bordo frastagliato, versante destro in ombra
  const px = 72, peak = 8;
  for (let y = peak; y < lake; y++) {
    const hw = Math.round(2 + (y - peak) * 1.55 + Math.pow((y - peak) / 12, 2) * 3);
    for (let x = px - hw; x <= px + hw; x++) {
      const snowLine = 21 + Math.sin(x * .9) * 2.2 + Math.sin(x * .37) * 1.5 + (x > px ? -1 : 0);
      const right = x > px + (y - peak) * .15;
      const gully = Math.round(Math.abs(Math.sin(x * 2.3) * Math.sin(x * .7)) * 5) - (x % 2);
      const snow = y < snowLine + gully;
      c.set(x, y, snow ? (right ? "fsd" : "fs") : (right ? "fbd" : "fb"));
    }
  }
  // colline lontane e vicine, boschi autunnali
  for (let x = 0; x < W; x++) {
    const far = Math.round(37 + Math.sin(x / 11) * 2.5 + Math.sin(x / 4.7) * 1.2);
    for (let y = far; y < lake; y++) c.set(x, y, r() < .12 ? "h1d" : "h1");
    const near = Math.round(41 + Math.sin(x / 8 + 2) * 2.5 + Math.sin(x / 3.1) * 1.2);
    for (let y = near; y < lake; y++) c.set(x, y, r() < .22 ? "h2d" : "h2");
    if (r() < .32) c.set(x, near - 1, ["lm", "lo", "ly", "lmd"][Math.floor(r() * 4)]);
    if (r() < .18) c.set(x, near, ["lo", "ly"][Math.floor(r() * 2)]);
  }
  // alberelli di acero sulle rive
  [[8, .45], [182, .5], [138, .38]].forEach(([x, s], i) => drawMaple(c, x, lake, 20 + i, s));
  // lago con riflessi e riflesso del Fuji
  for (let y = lake; y < H; y++) for (let x = 0; x < W; x++) {
    const ry = lake - (y - lake) * 1.6;
    const refl = c.get(x, Math.round(ry));
    const reflected = (refl === "fs" || refl === "fsd") && y < lake + 8;
    c.set(x, y, reflected && (x + y) % 2 ? "lkl" : "lk");
  }
  for (let k = 0; k < 40; k++) {
    const x = Math.floor(r() * (W - 6)), y = lake + 2 + Math.floor(r() * (H - lake - 3));
    c.hline(x, x + 2 + Math.floor(r() * 4), y, "lkl");
  }
  c.hline(0, W - 1, lake, "lkd");
  // torii nel lago
  drawTorii(c, 108, lake + 7, 12, 15);
  return c.svg("hero-art-svg", "xMidYMid meet");
}

// --- montaggio ---

function initBgScene() {
  const hero = document.getElementById("hero-art");
  if (hero && !hero.firstChild) hero.innerHTML = heroScene();

  if (document.querySelector(".bg-scene")) return;
  const wrap = document.createElement("div");
  wrap.className = "bg-scene";
  wrap.setAttribute("aria-hidden", "true");
  const leafColors = ["var(--px-lm)", "var(--px-lo)", "var(--px-ly)", "var(--px-lmd)"];
  const r = rng(3);
  const leaves = Array.from({ length: 9 }, (_, i) =>
    `<svg class="bg-leaf" viewBox="0 0 11 11" style="left:${(r() * 96).toFixed(1)}%;fill:${leafColors[i % 4]};` +
    `--dur:${(16 + r() * 14).toFixed(1)}s;--delay:-${(r() * 30).toFixed(1)}s;--sway:${(20 + r() * 40).toFixed(0)}px;--size:${(9 + r() * 7).toFixed(0)}px">` +
    `<use href="#leaf-momiji"></use></svg>`).join("");
  wrap.innerHTML = `
    <div class="bg-leaves">${leaves}</div>
    <div class="bg-layer bg-kyoto">${kyotoScene()}</div>
    <div class="bg-layer bg-tokyo">${tokyoScene()}</div>`;
  document.body.prepend(wrap);
}
