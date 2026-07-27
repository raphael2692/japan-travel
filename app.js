// Rendering minimale, condiviso da index.html e giorno.html.
function mdInline(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
    .replace(/\*(.+?)\*/g, "<i>$1</i>");
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
    a.innerHTML = `<div class="dn">${g.giorno} ${dateFmt}</div><div class="dt">${g.titolo}</div>${g.hotel ? `<div class="dh">🏨 ${g.hotel.split(",")[0]}</div>` : ""}`;
    grid.appendChild(a);
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
  g.items.forEach(line => {
    const li = document.createElement("li");
    const m = line.match(/^\*\*([^*]+)\*\*\s*(.*)$/);
    if (m) li.innerHTML = `<span class="time">${m[1]}</span> ${mdInline(m[2])}`;
    else li.innerHTML = mdInline(line);
    list.appendChild(li);
  });

  const prev = t.giorni[idx - 1], next = t.giorni[idx + 1];
  const prevA = document.getElementById("nav-prev"), nextA = document.getElementById("nav-next");
  if (prev) { prevA.href = "giorno.html?d=" + prev.data; prevA.textContent = "← " + prev.giorno.slice(0,3) + " " + prev.data.slice(8); }
  else prevA.classList.add("disabled");
  if (next) { nextA.href = "giorno.html?d=" + next.data; nextA.textContent = next.giorno.slice(0,3) + " " + next.data.slice(8) + " →"; }
  else nextA.classList.add("disabled");
}
