// Rendering minimale, condiviso da index.html e giorno.html.

// --- altezza della nav sticky in cima a index.html, esposta come --navh ---
// senza questo le sezioni ancorate (#mappa, #hotel, ...) finiscono con l'intestazione
// nascosta sotto la nav quando è alta due righe (viewport stretti, nav con 6 voci che va a capo)
function syncNavHeight() {
  const nav = document.querySelector("nav.quicknav");
  if (!nav) return;
  const set = () => document.documentElement.style.setProperty("--navh", nav.offsetHeight + "px");
  set();
  new ResizeObserver(set).observe(nav);
}

// --- tema chiaro/scuro ---
function initTheme() {
  const root = document.documentElement;
  const btn = document.getElementById("theme-toggle");

  function current() {
    return root.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }
  function paint() {
    if (!btn) return;
    const c = current();
    btn.textContent = c === "dark" ? "☀" : "☾";
    const label = c === "dark" ? "Passa al tema chiaro" : "Passa al tema scuro";
    btn.setAttribute("aria-label", label);
    btn.title = label;
  }
  if (btn) {
    btn.addEventListener("click", () => {
      const next = current() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      paint();
    });
  }
  paint();
}

// --- data di oggi (fuso del telefono: in Giappone si aggiorna da solo) ---
const todayIso = () => new Date().toLocaleDateString("sv-SE");

// --- countdown: alla partenza prima del viaggio, al ritorno durante ---
function renderCountdown() {
  const el = document.getElementById("countdown");
  const t = window.TRIP;
  if (!el || !t.partenza) return;
  const dep = new Date(t.partenza), ret = new Date(t.ritorno);
  const fmt = ms => {
    const s = Math.floor(ms / 1000), d = Math.floor(s / 86400);
    const hms = [s / 3600 % 24, s / 60 % 60, s % 60].map(n => String(Math.floor(n)).padStart(2, "0")).join(":");
    return (d ? d + " g " : "") + hms;
  };
  function tick() {
    const now = new Date();
    const i = t.giorni.findIndex(g => g.data === todayIso());
    if (now < dep) el.innerHTML = `Partenza tra <b>${fmt(dep - now)}</b>`;
    else if (now < ret) el.innerHTML = `${i >= 0 ? `Giorno ${i + 1} di ${t.giorni.length} · ` : ""}Rientro tra <b>${fmt(ret - now)}</b>` +
      (i >= 0 ? ` · <a href="giorno.html?d=${t.giorni[i].data}">Oggi →</a>` : "");
    else { el.hidden = true; return; }
    setTimeout(tick, 1000 - now % 1000);
  }
  tick();
}

// --- colore dei pin per giorno: oro (45) all'inizio del viaggio, rosso (8) alla fine ---
function tintHue(ratio) {
  return Math.round(45 - ratio * 37);
}

// markdown minimo: grassetto, corsivo, link, a capo
function mdInline(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
    .replace(/(^|[^*])\*([^*\s][^*]*?)\*/g, "$1<i>$2</i>")
    .replace(/\n/g, "<br>");
}

// righe di un blocco note: "• " = punto elenco, "  • " = sotto-punto
function renderLines(lines) {
  return lines.map(l => {
    const sub = l.startsWith("  • "), bullet = sub || l.startsWith("• ");
    const text = bullet ? l.replace(/^\s*• /, "") : l;
    return `<div class="${bullet ? "li" + (sub ? " sub" : "") : "p"}">${mdInline(text)}</div>`;
  }).join("");
}

function renderDeadline(d) {
  const div = document.createElement("div");
  div.className = "card deadline" + (d.done ? " done" : "");
  div.innerHTML = `
    <input type="checkbox" disabled ${d.done ? "checked" : ""}>
    <div>
      <div class="d-title">${mdInline(d.titolo)} <span class="tag">${d.tags}</span></div>
      ${d.note.length ? `<div class="d-notes">${d.note.map(n => `<div>${mdInline(n)}</div>`).join("")}</div>` : ""}
    </div>`;
  return div;
}

function renderIndex() {
  const t = window.TRIP;
  document.getElementById("trip-title").textContent = t.title;
  document.getElementById("trip-subtitle").textContent = t.subtitle;

  const scad = document.getElementById("scadenze-list");
  const table = document.createElement("div");
  table.className = "card table-wrap";
  table.innerHTML = `<table class="scad-table">
    <thead><tr><th>Cosa</th><th>Apre</th><th>Ora IT</th><th>Entro</th><th>Dove</th></tr></thead>
    <tbody>${t.scadenzeTabella.map(r => `<tr><td>${mdInline(r.cosa)}</td><td>${mdInline(r.apre)}</td><td>${r.oraIt}</td><td>${mdInline(r.entro)}</td><td>${mdInline(r.dove)}</td></tr>`).join("")}</tbody>
  </table>`;
  scad.appendChild(table);
  t.scadenze.forEach(grp => {
    const h = document.createElement("h3");
    h.className = "sub-h";
    h.textContent = grp.titolo;
    scad.appendChild(h);
    grp.items.slice().sort((a, b) => a.done - b.done).forEach(d => scad.appendChild(renderDeadline(d)));
  });

  const last = t.giorni.length - 1;
  const grid = document.getElementById("days-grid");
  const today = todayIso();
  t.giorni.forEach((g, i) => {
    const a = document.createElement("a");
    a.className = "day-row" + (g.data === today ? " today" : g.data < today && today <= t.giorni[last].data ? " past" : "");
    a.href = "giorno.html?d=" + g.data;
    const dateFmt = new Date(g.data + "T00:00:00").toLocaleDateString("it-IT", { day: "numeric", month: "short" });
    a.innerHTML = `<span class="dnum">${String(i + 1).padStart(2, "0")}</span>
      <span class="dbody"><span class="dn">${g.giorno} ${dateFmt}${g.hotel ? " · " + g.hotel.split(",")[0] : ""}</span><span class="dt">${g.data === today ? '<span class="today-tag">Oggi</span>' : ""}${g.titolo}</span></span>
      <span class="wx" data-wx="${g.data}"></span>
      <span class="chev" aria-hidden="true">›</span>`;
    grid.appendChild(a);
  });

  const hotels = document.getElementById("hotel-list");
  t.hotel.forEach(h => {
    const div = document.createElement("div");
    div.className = "card hotel-card";
    div.innerHTML = `<b>${h.citta} — ${h.nome}</b>${h.indirizzo}<br>${h.dal} → ${h.al}`;
    hotels.appendChild(div);
  });
  (t.hotelNota || []).forEach(n => {
    const div = document.createElement("div");
    div.className = "callout";
    div.innerHTML = mdInline(n);
    hotels.appendChild(div);
  });

  const flights = document.getElementById("flight-list");
  t.voli.forEach(f => {
    const div = document.createElement("div");
    div.className = "card flight-card";
    div.innerHTML = mdInline(f);
    flights.appendChild(div);
  });

  const note = document.getElementById("note-rapide");
  t.note.forEach(n => {
    const div = document.createElement("div");
    div.className = "card note-card";
    div.innerHTML = `<b>${mdInline(n.titolo)}</b>${renderLines(n.righe)}`;
    note.appendChild(div);
  });
}

// --- ricerca globale ---
function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function stripMd(s) {
  return s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1").replace(/\n/g, " ");
}

function normText(s) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function buildSearchIndex() {
  const t = window.TRIP;
  const idx = [];

  t.scadenzeTabella.forEach(r => {
    idx.push({ section: "SCADENZE", text: stripMd(`${r.cosa} · apre ${r.apre} · entro ${r.entro} · ${r.dove}`), link: "index.html#scadenze" });
  });
  t.scadenze.forEach(grp => grp.items.forEach(d => {
    idx.push({ section: "SCADENZE", text: stripMd([d.titolo, ...d.note].join(" · ")), link: "index.html#scadenze" });
  }));

  t.hotel.forEach(h => {
    idx.push({ section: "HOTEL", text: `${h.citta} — ${h.nome}, ${h.indirizzo} (${h.dal} → ${h.al})`, link: "index.html#hotel" });
  });

  t.voli.forEach(v => idx.push({ section: "VOLI", text: stripMd(v), link: "index.html#voli" }));

  t.note.forEach(n => n.righe.forEach(r => {
    idx.push({ section: "NOTE — " + stripMd(n.titolo).toUpperCase(), text: stripMd(r.replace(/^\s*• /, "")), link: "index.html#note" });
  }));

  t.giorni.forEach(g => {
    const dateFmt = new Date(g.data + "T00:00:00").toLocaleDateString("it-IT", { day: "2-digit", month: "short" });
    const label = `${g.giorno.toUpperCase()} ${dateFmt} — ${g.titolo}`;
    const link = "giorno.html?d=" + g.data;
    idx.push({ section: label, text: stripMd(g.titolo + (g.hotel ? " · " + g.hotel : "")), link });
    (g.note || []).forEach(n => idx.push({ section: label, text: stripMd(n), link }));
    g.items.forEach(item => idx.push({ section: label, text: stripMd(item), link }));
    (t.pasti[g.data] || []).forEach(p => idx.push({ section: label, text: stripMd(`${p.pasto}: ${p.locale}`), link }));
  });

  // guida linguistica (solo se la pagina carica lingua-data.js)
  (window.LINGUA ? window.LINGUA.situazioni : []).forEach(s => s.sezioni.forEach(sec => (sec.frasi || []).forEach(f => {
    idx.push({ section: "LINGUA — " + s.titolo.toUpperCase(), text: stripMd(`${f[2]} · ${f[1]}`), link: "frasi.html?s=" + s.id });
  })));

  return idx;
}

function highlightSnippet(text, q) {
  const safe = escapeHtml(text);
  const i = normText(text).indexOf(q);
  let snippet = safe;
  if (i >= 0 && text.length > 110) {
    const start = Math.max(0, i - 30);
    const end = Math.min(text.length, i + q.length + 50);
    snippet = (start > 0 ? "…" : "") + escapeHtml(text.slice(start, end)) + (end < text.length ? "…" : "");
  } else if (text.length > 110) {
    snippet = safe.slice(0, 110) + "…";
  }
  const re = new RegExp("(" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
  return q ? snippet.replace(re, "<mark>$1</mark>") : snippet;
}

function renderSearch() {
  const root = document.getElementById("global-search");
  if (!root) return;
  root.innerHTML = `
    <div class="search-wrap">
      <input type="text" id="search-input" placeholder="Cerca nel piano di viaggio …" autocomplete="off">
      <div id="search-results" class="search-results"></div>
    </div>`;

  const input = document.getElementById("search-input");
  const results = document.getElementById("search-results");
  const index = buildSearchIndex();

  function close() { results.classList.remove("open"); results.innerHTML = ""; }

  function runSearch() {
    const q = normText(input.value.trim());
    if (q.length < 2) { close(); return; }
    const matches = index.filter(r => normText(r.text).includes(q)).slice(0, 30);
    if (!matches.length) {
      results.innerHTML = `<div class="search-empty">Nessun risultato per "${escapeHtml(input.value.trim())}"</div>`;
      results.classList.add("open");
      return;
    }
    results.innerHTML = matches.map(m => `
      <a class="search-result" href="${m.link}">
        <div class="sr-section">${m.section}</div>
        <div class="sr-text">${highlightSnippet(m.text, q)}</div>
      </a>`).join("");
    results.classList.add("open");
  }

  input.addEventListener("input", runSearch);
  input.addEventListener("focus", () => { if (input.value.trim().length >= 2) runSearch(); });
  input.addEventListener("keydown", e => {
    if (e.key === "Escape") { input.blur(); close(); }
    if (e.key === "Enter") {
      const first = results.querySelector(".search-result");
      if (first) location.href = first.getAttribute("href");
    }
  });
  document.addEventListener("click", e => {
    if (!root.contains(e.target)) close();
  });
}

function renderGiorno() {
  const t = window.TRIP;
  const params = new URLSearchParams(location.search);
  const idx = t.giorni.findIndex(g => g.data === params.get("d"));
  const g = idx >= 0 ? t.giorni[idx] : t.giorni[0];

  const dateFmt = new Date(g.data + "T00:00:00").toLocaleDateString("it-IT", { day: "2-digit", month: "long", year: "numeric" });
  document.title = g.titolo + " — Giappone";

  document.getElementById("d-weekday").textContent = (g.data === todayIso() ? "Oggi · " : "") + g.giorno + " " + dateFmt;
  document.getElementById("d-title").textContent = g.titolo + (g.emoji ? " " + g.emoji : "");
  const hotelEl = document.getElementById("d-hotel");
  hotelEl.textContent = g.hotel || "";
  hotelEl.hidden = !g.hotel;

  if (window.renderMeteoGiorno) renderMeteoGiorno(g);

  const notes = document.getElementById("d-notes");
  (g.note || []).forEach(n => {
    const div = document.createElement("div");
    div.className = "callout";
    div.innerHTML = mdInline(n);
    notes.appendChild(div);
  });

  const list = document.getElementById("d-timeline");
  g.items.forEach(line => {
    const li = document.createElement("li");
    const m = line.match(/^\*\*([^*]+)\*\*\s*(.*)$/);
    if (line.startsWith("• ")) li.className = "sub";
    li.innerHTML = m ? `<span class="time">${m[1]}</span><span class="pin-refs"></span> ${mdInline(m[2])}` : mdInline(line.replace(/^• /, ""));
    if (m && /^\d{1,2}:\d{2}/.test(m[1])) li.dataset.range = m[1];
    list.appendChild(li);
  });

  const lingua = window.LINGUA ? (window.LINGUA.giorni[g.data] || []).map(id => window.LINGUA.situazioni.find(s => s.id === id)).filter(Boolean) : [];
  const linguaBox = document.getElementById("d-lingua");
  if (linguaBox && lingua.length) {
    linguaBox.innerHTML = `<h2 class="sub-h">Giapponese per oggi</h2><div class="chips">` +
      lingua.map(s => `<a class="chip" href="frasi.html?s=${s.id}">${s.emoji} ${s.titolo}</a>`).join("") + `</div>`;
  }

  const pasti = t.pasti[g.data] || [];
  const pastiBox = document.getElementById("d-pasti");
  if (pastiBox && pasti.length) {
    pastiBox.innerHTML = `<h2 class="sub-h">Pasti</h2>` + pasti.map(p => `
      <div class="card meal">
        <div class="meal-head"><span class="meal-time">${p.pasto}${p.ingresso ? " · " + p.ingresso : ""}</span>${p.prenotazione ? `<span class="meal-book">${mdInline(p.prenotazione)}</span>` : ""}</div>
        <div>${mdInline(p.locale)}</div>
        ${p.tabelog ? `<div class="meal-links">${mdInline(p.tabelog)}</div>` : ""}
        ${p.note ? `<div class="meal-note">${mdInline(p.note)}</div>` : ""}
      </div>`).join("");
  }

  const prev = t.giorni[idx - 1], next = t.giorni[idx + 1];
  const prevA = document.getElementById("nav-prev"), nextA = document.getElementById("nav-next");
  if (prev) { prevA.href = "giorno.html?d=" + prev.data; prevA.textContent = "← " + prev.giorno.slice(0,3) + " " + prev.data.slice(8); }
  else prevA.classList.add("disabled");
  if (next) { nextA.href = "giorno.html?d=" + next.data; nextA.textContent = next.giorno.slice(0,3) + " " + next.data.slice(8) + " →"; }
  else nextA.classList.add("disabled");
}
