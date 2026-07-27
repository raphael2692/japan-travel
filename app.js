// Rendering minimale, condiviso da index.html e giorno.html.
function mdInline(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
    .replace(/\*(.+?)\*/g, "<i>$1</i>");
}

// Immagini di anteprima recuperate al volo (nessuna immagine ospitata sul
// sito). Fonte primaria: Openverse, per poter cercare una foto coerente con
// la stagione (viaggio 18/11-9/12, foliage autunnale) e con l'orario
// dell'attività (mattina/tramonto/notte). Fallback: miniatura Wikipedia
// (sempre pertinente al luogo, ma non alla stagione/ora). Cache in-memory
// per evitare richieste doppie.
const WIKI_IMG_CACHE = {};
function fetchWikiThumb(title) {
  if (WIKI_IMG_CACHE[title] !== undefined) return Promise.resolve(WIKI_IMG_CACHE[title]);
  return fetch("https://en.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(title))
    .then(res => res.ok ? res.json() : null)
    .then(data => {
      const thumb = data && data.thumbnail && data.thumbnail.source ? data.thumbnail.source : null;
      const full = data && data.originalimage && data.originalimage.source ? data.originalimage.source : thumb;
      const result = thumb ? { thumb, full } : null;
      WIKI_IMG_CACHE[title] = result;
      return result;
    })
    .catch(() => { WIKI_IMG_CACHE[title] = null; return null; });
}

function stripDiacritics(s) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

// Estrae dall'orario dell'attività (**HH:MM**) un indizio sul momento della
// giornata, per non usare foto diurne su attività serali/notturne o viceversa.
function timeOfDayKeyword(line) {
  const m = line && line.match(/\*\*(\d{2}):(\d{2})/);
  if (!m) return null;
  const h = parseInt(m[1], 10);
  if (h >= 5 && h <= 8) return "morning";
  if (h >= 17 && h <= 18) return "sunset";
  if (h >= 19 || h <= 4) return "night";
  return null;
}

function buildSeasonalQuery(entry, line) {
  const bits = [stripDiacritics(entry.title), "Japan"];
  if (entry.season) bits.push("autumn foliage");
  const tk = timeOfDayKeyword(line);
  if (tk) bits.push(tk);
  return bits.join(" ");
}

const SEASONAL_IMG_CACHE = {};
function fetchSeasonalThumb(entry, line) {
  const query = buildSeasonalQuery(entry, line);
  if (SEASONAL_IMG_CACHE[query] !== undefined) return Promise.resolve(SEASONAL_IMG_CACHE[query]);
  const url = "https://api.openverse.org/v1/images/?page_size=1&q=" + encodeURIComponent(query);
  return fetch(url)
    .then(res => res.ok ? res.json() : null)
    .then(data => {
      const hit = data && data.results && data.results[0];
      const result = hit && hit.thumbnail ? { thumb: hit.thumbnail, full: hit.url || hit.thumbnail } : null;
      SEASONAL_IMG_CACHE[query] = result;
      return result;
    })
    .catch(() => { SEASONAL_IMG_CACHE[query] = null; return null; });
}

// Prova prima una foto coerente con stagione/ora (Openverse), poi ripiega
// sulla miniatura Wikipedia del luogo se la ricerca non trova nulla.
function fetchThumb(entry, line) {
  return fetchSeasonalThumb(entry, line).then(res => res || fetchWikiThumb(entry.title));
}

// Lightbox condiviso: mostra l'immagine a piena risoluzione al click.
function openLightbox(url) {
  let box = document.getElementById("lightbox");
  if (!box) {
    box = document.createElement("div");
    box.id = "lightbox";
    box.className = "lightbox";
    box.innerHTML = `<img>`;
    box.addEventListener("click", () => box.classList.remove("open"));
    document.body.appendChild(box);
  }
  box.querySelector("img").src = url;
  box.classList.add("open");
}

function makeClickable(img, fullUrl) {
  img.classList.add("clickable-img");
  img.addEventListener("click", () => openLightbox(fullUrl));
}

function findWikiEntry(line, wikiMap) {
  const keys = Object.keys(wikiMap).sort((a, b) => b.length - a.length);
  for (const k of keys) {
    if (line.includes(k)) return wikiMap[k];
  }
  return null;
}

function renderDeadline(d) {
  const div = document.createElement("div");
  div.className = "card deadline" + (d.done ? " done" : "");
  div.innerHTML = `
    <input type="checkbox" disabled ${d.done ? "checked" : ""}>
    <div>
      <div class="d-title">${mdInline(d.titolo)} <span class="tag">${d.tags}</span></div>
      <div class="d-meta">Apre: ${d.apre}${d.oraIt ? " (" + d.oraIt + " IT)" : ""} · Entro: ${d.entro} · ${d.dove}</div>
      ${d.note ? `<div class="d-notes">${d.note.map(n => `<div>${mdInline(n)}</div>`).join("")}</div>` : ""}
    </div>`;
  return div;
}

function renderIndex() {
  const t = window.TRIP;
  document.getElementById("trip-title").textContent = t.title;
  document.getElementById("trip-subtitle").textContent = t.subtitle;

  const scad = document.getElementById("scadenze-list");
  t.scadenze
    .slice()
    .sort((a, b) => a.done - b.done)
    .forEach(d => scad.appendChild(renderDeadline(d)));

  const grid = document.getElementById("days-grid");
  t.giorni.forEach(g => {
    const a = document.createElement("a");
    a.className = "day-tile";
    a.href = "giorno.html?d=" + g.data;
    const dateFmt = new Date(g.data + "T00:00:00").toLocaleDateString("it-IT", { day: "2-digit", month: "short" });
    a.innerHTML = `<img class="day-tile-img" alt="" loading="lazy"><div class="dn">${g.giorno} ${dateFmt}</div><div class="dt">${g.titolo}</div>${g.hotel ? `<div class="dh">🏨 ${g.hotel.split(",")[0]}</div>` : ""}`;
    grid.appendChild(a);

    const line = g.items.find(i => findWikiEntry(i, t.wikiMap || {}));
    const entry = line ? findWikiEntry(line, t.wikiMap || {}) : null;
    if (entry) {
      const img = a.querySelector("img.day-tile-img");
      fetchThumb(entry, line).then(res => { if (res) img.src = res.thumb; else img.remove(); });
    } else {
      a.querySelector("img.day-tile-img").remove();
    }
  });

  const hotels = document.getElementById("hotel-list");
  t.hotel.forEach(h => {
    const div = document.createElement("div");
    div.className = "card hotel-card";
    div.innerHTML = `<b>${h.citta} — ${h.nome}</b>${h.indirizzo}<br>${h.dal} → ${h.al}`;
    hotels.appendChild(div);
  });

  const flights = document.getElementById("flight-list");
  [t.voli.andata, t.voli.ritorno].forEach(f => {
    const div = document.createElement("div");
    div.className = "card flight-card";
    div.innerHTML = mdInline(f);
    flights.appendChild(div);
  });

  const note = document.getElementById("note-rapide");
  Object.values(t.noteRapide).forEach(n => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = mdInline(n);
    note.appendChild(div);
  });
}

function renderGiorno() {
  const t = window.TRIP;
  const params = new URLSearchParams(location.search);
  const idx = t.giorni.findIndex(g => g.data === params.get("d"));
  const g = idx >= 0 ? t.giorni[idx] : t.giorni[0];

  const dateFmt = new Date(g.data + "T00:00:00").toLocaleDateString("it-IT", { day: "2-digit", month: "long", year: "numeric" });
  document.title = g.titolo + " — Giappone";
  document.getElementById("d-weekday").textContent = g.giorno + " " + dateFmt;
  document.getElementById("d-title").textContent = g.titolo + (g.emoji ? " " + g.emoji : "");
  const hotelEl = document.getElementById("d-hotel");
  if (g.hotel) { hotelEl.textContent = "🏨 " + g.hotel; hotelEl.style.display = "inline-block"; }
  else hotelEl.style.display = "none";

  const notes = document.getElementById("d-notes");
  (g.note || []).forEach(n => {
    const div = document.createElement("div");
    div.className = "callout";
    div.innerHTML = mdInline(n);
    notes.appendChild(div);
  });

  const list = document.getElementById("d-timeline");
  const usedTitles = new Set();
  g.items.forEach(line => {
    const li = document.createElement("li");
    const m = line.match(/^\*\*([^*]+)\*\*\s*(.*)$/);
    const textHtml = m ? `<span class="time">${m[1]}</span> ${mdInline(m[2])}` : mdInline(line);

    const entry = findWikiEntry(line, t.wikiMap || {});
    if (entry && !usedTitles.has(entry.title)) {
      usedTitles.add(entry.title);
      li.className = "has-img";
      li.innerHTML = `<img class="item-thumb" alt="" loading="lazy"><div class="item-text">${textHtml}</div>`;
      const img = li.querySelector("img.item-thumb");
      fetchThumb(entry, line).then(res => {
        if (res) { img.src = res.thumb; makeClickable(img, res.full); }
        else li.querySelector("img.item-thumb").remove();
      });
    } else {
      li.innerHTML = textHtml;
    }
    list.appendChild(li);
  });

  const prev = t.giorni[idx - 1], next = t.giorni[idx + 1];
  const prevA = document.getElementById("nav-prev"), nextA = document.getElementById("nav-next");
  if (prev) { prevA.href = "giorno.html?d=" + prev.data; prevA.textContent = "← " + prev.giorno.slice(0,3) + " " + prev.data.slice(8); }
  else prevA.classList.add("disabled");
  if (next) { nextA.href = "giorno.html?d=" + next.data; nextA.textContent = next.giorno.slice(0,3) + " " + next.data.slice(8) + " →"; }
  else nextA.classList.add("disabled");
}
