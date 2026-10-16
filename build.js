// Genera data.js a partire da MASTER-DATA.md, l'unica fonte di verità del sito.
//   node build.js         → rigenera data.js
//   node build.js --hook  → modalità hook di Claude Code: legge l'evento da stdin
//                           e rigenera solo se l'edit ha toccato MASTER-DATA.md
// Nessuna dipendenza: solo Node.

const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "MASTER-DATA.md");
const OUT = path.join(__dirname, "data.js");
const YEAR = 2026;
const TITLE = "Viaggio di nozze in Giappone";
const SUBTITLE = "18 Novembre - 9 Dicembre 2026";

const MESI = { gennaio: 1, febbraio: 2, marzo: 3, aprile: 4, maggio: 5, giugno: 6, luglio: 7,
  agosto: 8, settembre: 9, ottobre: 10, novembre: 11, dicembre: 12 };

const warnings = [];
const warn = msg => warnings.push(msg);

// --- utilità testo ---

// "--" e "->" del markdown diventano trattini e frecce tipografici
function clean(s) {
  return s
    .replace(/(\d{1,2}:\d{2})\s*--\s*(\d{1,2}:\d{2})/g, "$1 – $2")
    .replace(/\s--\s/g, " — ")
    .replace(/\s*->\s*/g, " → ")
    .trim();
}

const pad = n => String(n).padStart(2, "0");
const iso = (d, m) => `${YEAR}-${pad(m)}-${pad(d)}`;

// "19/11" o "19/11 gio" → "2026-11-19"
function isoFromSlash(s) {
  const m = s.match(/(\d{1,2})\/(\d{1,2})/);
  return m ? iso(+m[1], +m[2]) : null;
}

// "Giovedì 19 novembre" → "gio 19 nov"
function shortDay(s) {
  const m = s.trim().match(/^(\S+)\s+(\d{1,2})\s+(\S+)/);
  return m ? `${m[1].slice(0, 3).toLowerCase()} ${+m[2]} ${m[3].slice(0, 3).toLowerCase()}` : s.trim();
}

// stessa regola usata da map.js: l'ora del luogo cade in [inizio, fine) della voce "**HH:MM – HH:MM**"
const toMin = s => { const m = (s || "").match(/(\d{1,2}):(\d{2})/); return m ? +m[1] * 60 + +m[2] : null; };
function inRange(item, ora) {
  const m = item.match(/^\*\*(\d{1,2}:\d{2})(?:\s*–\s*(\d{1,2}:\d{2}))?\*\*/);
  const t = toMin(ora);
  if (!m || t === null) return false;
  const a = toMin(m[1]), b = m[2] ? toMin(m[2]) : a + 1;
  return t >= a && t < b;
}

// --- struttura del markdown ---

// divide le righe per intestazione di un dato livello ("#", "##", ...)
function splitBy(lines, level) {
  const re = new RegExp("^" + "#".repeat(level) + " (.+)$");
  const out = [];
  let cur = { title: null, lines: [] };
  for (const l of lines) {
    const m = l.match(re);
    if (m) { out.push(cur); cur = { title: m[1].trim(), lines: [] }; }
    else cur.lines.push(l);
  }
  out.push(cur);
  return out.filter(s => s.title);
}

function find(sections, prefix) {
  const s = sections.find(x => x.title.startsWith(prefix));
  if (!s) throw new Error(`Sezione "${prefix}" non trovata in MASTER-DATA.md`);
  return s;
}

function parseTable(lines) {
  const rows = lines.filter(l => /^\s*\|/.test(l));
  if (rows.length < 2) return [];
  const cells = l => l.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map(c => c.trim());
  const head = cells(rows[0]);
  return rows.slice(2).map(r => {
    const c = cells(r), o = {};
    head.forEach((h, i) => { o[h] = c[i] || ""; });
    return o;
  });
}

// blocco libero (paragrafi, elenchi, citazioni) → righe di testo; "• " marca i punti elenco
function parseBlock(lines) {
  const out = [];
  for (let l of lines) {
    if (/^#/.test(l) || /^---\s*$/.test(l)) continue;
    l = l.replace(/^>\s?/, "");
    if (!l.trim()) continue;
    const b = l.match(/^(\s*)(?:[-*]|\d+\.)\s+(.+)$/);
    out.push(b ? (b[1].length ? "  • " : "• ") + clean(b[2]) : clean(l));
  }
  return out;
}

// --- sezioni ---

function parseLegenda(lines) {
  const out = [];
  let on = false;
  for (const l of lines) {
    if (l.includes("Legenda priorità")) { on = true; continue; }
    if (!on) continue;
    const m = l.match(/^>\s*-\s*(.+)$/);
    if (!m) break;
    out.push(clean(m[1].split(" -- ")[0]).replace(/\*\*/g, ""));
  }
  return out;
}

function parseChecklist(lines) {
  const items = [];
  let cur = null;
  for (const l of lines) {
    let m = l.match(/^- \[([ xX])\]\s*(.+)$/);
    if (m) {
      let rest = m[2], titolo = "";
      const tm = rest.match(/^\*\*(.+?)\*\*\s*(.*)$/);
      if (tm) { titolo = tm[1]; rest = tm[2]; }
      const [tags, ...note] = rest.split(" -- ");
      cur = { titolo: clean(titolo || tags), tags: titolo ? tags.trim() : "", done: m[1] !== " ",
        note: note.length ? [clean(note.join(" -- "))] : [] };
      items.push(cur);
      continue;
    }
    m = l.match(/^\s+-\s+(.+)$/);
    if (m && cur) cur.note.push(clean(m[1]));
  }
  return items;
}

function parseHotel(lines, coords) {
  const hotel = [], nota = [];
  let cur = null;
  for (const l of lines) {
    let m = l.match(/^\d+\.\s+\*\*(.+?)\*\*/);
    if (m) {
      const [citta, nome] = m[1].includes(":") ? m[1].split(/:\s*/) : [m[1], m[1]];
      cur = { citta, nome, indirizzo: "", dal: "", al: "", sub: 0 };
      hotel.push(cur);
      continue;
    }
    m = l.match(/^\s+-\s+(.+)$/);
    if (m && cur) {
      if (cur.sub++ === 0) cur.indirizzo = m[1].trim();
      else { const [a, b] = m[1].split(" -- "); cur.dal = shortDay(a); cur.al = shortDay(b || ""); }
      continue;
    }
    if (/^>/.test(l)) nota.push(...parseBlock([l]));
  }
  hotel.forEach(h => {
    delete h.sub;
    const c = coords[h.nome];
    if (c) h.ll = c; else warn(`Hotel senza coordinate nella tabella mappa: ${h.nome}`);
  });
  return { hotel, nota };
}

function parseVoli(lines) {
  const out = [];
  for (const l of lines) {
    if (!l.trim() || /^---/.test(l)) continue;
    if (/^\*\*/.test(l)) out.push(clean(l));
    else if (out.length) out[out.length - 1] += " · " + clean(l);
  }
  return out;
}

function parsePasti(section) {
  const pasti = {};
  const add = (d, p) => (pasti[d] = pasti[d] || []).push(p);
  for (const sub of splitBy(section.lines, 2)) {
    for (const r of parseTable(sub.lines)) {
      const d = isoFromSlash(r["Data"] || "");
      if (!d) continue;
      const cell = s => (s && s !== "—" && s !== "-") ? clean(s.replace(/<br\s*\/?>/g, "\n")) : "";
      add(d, { pasto: r["Pasto"], ingresso: cell(r["Ingresso"]), locale: cell(r["Locale proposto"]),
        prenotazione: cell(r["Prenotazione"]), tabelog: cell(r["Tabelog"]), note: cell(r["Note"]) });
    }
    // spuntini: ogni punto elenco che cita una data viene agganciato a quel giorno
    if (sub.title.startsWith("Spuntini")) {
      for (const l of sub.lines) {
        const m = l.match(/^-\s+(.+)$/);
        const d = m && isoFromSlash(m[1]);
        if (d) add(d, { pasto: "Spuntino", ingresso: "", locale: clean(m[1]), prenotazione: "", tabelog: "", note: "" });
      }
    }
  }
  return pasti;
}

function parseGiorno(sec) {
  const hm = sec.title.match(/^(\S+)\s+(\d{1,2})\s+(\S+)\s+--\s+(.+)$/);
  if (!hm || !MESI[hm[3].toLowerCase()]) { warn(`Intestazione giorno non riconosciuta: "${sec.title}"`); return null; }
  let titolo = hm[4].trim(), emoji;
  const em = titolo.match(/^(.*?)\s+([\p{Extended_Pictographic}️‍]+)$/u);
  if (em) { titolo = em[1]; emoji = em[2]; }

  const g = { data: iso(+hm[2], MESI[hm[3].toLowerCase()]), giorno: hm[1], titolo: clean(titolo), hotel: null };
  if (emoji) g.emoji = emoji;
  const note = [], items = [];
  let quote = null;

  for (const l of sec.lines) {
    if (/^>/.test(l)) {
      const t = l.replace(/^>\s?/, "");
      const b = t.match(/^\s*-\s+(.+)$/);
      const line = b ? "• " + clean(b[1]) : clean(t);
      if (quote === null) { quote = line; note.push(quote); }
      else note[note.length - 1] = (quote += "\n" + line);
      continue;
    }
    quote = null;
    if (!l.trim() || /^---\s*$/.test(l)) continue;
    const h = l.match(/^-\s+🏨\s+\*\*(.+?)\*\*/);
    if (h) { g.hotel = h[1]; continue; }
    const top = l.match(/^-\s+(.+)$/);
    const nested = l.match(/^\s+-\s+(.+)$/);
    if (top) items.push(clean(top[1]));
    else if (nested) items.push("• " + clean(nested[1]));
    else items.push(clean(l));
  }
  if (note.length) g.note = note;
  g.items = items;
  return g;
}

function parseMappa(section) {
  const subs = splitBy(section.lines, 2);
  const hotelCoords = {};
  parseTable(find(subs, "Hotel").lines).forEach(r => { hotelCoords[r["Hotel"]] = [+r["Lat"], +r["Lng"]]; });
  const luoghi = {};
  parseTable(find(subs, "Luoghi").lines).forEach(r => {
    const d = isoFromSlash(r["Data"]);
    if (!d || isNaN(+r["Lat"]) || isNaN(+r["Lng"])) { warn(`Riga mappa non valida: ${JSON.stringify(r)}`); return; }
    (luoghi[d] = luoghi[d] || []).push([r["Luogo"], +r["Lat"], +r["Lng"], r["Ora"]]);
  });
  return { hotelCoords, luoghi };
}

// --- main ---

function build() {
  const md = fs.readFileSync(SRC, "utf8").split(/\r?\n/);
  const top = splitBy(md, 1);

  const check = find(top, "Check-list");
  const checkSubs = splitBy(check.lines, 2);
  const mappa = parseMappa(find(top, "Mappa"));
  const { hotel, nota: hotelNota } = parseHotel(find(top, "Hotel").lines, mappa.hotelCoords);

  const scadenzeTabella = parseTable(find(checkSubs, "Scadenze").lines).map(r => ({
    cosa: clean(r["Cosa"]), apre: clean(r["Apre"]),
    oraIt: r["Ora italiana"] === "--" ? "" : r["Ora italiana"],
    entro: clean(r["Fare entro"]), dove: clean(r["Dove"])
  }));
  const scadenze = checkSubs
    .map(s => ({ titolo: s.title, items: parseChecklist(s.lines) }))
    .filter(s => s.items.length);

  const note = [];
  splitBy(find(top, "Note pratiche").lines, 2).forEach(s => note.push({ titolo: clean(s.title), righe: parseBlock(s.lines) }));
  const bag = find(top, "Strategia spedizione");
  splitBy(bag.lines, 2).forEach(s => note.push({ titolo: "Bagagli — " + clean(s.title), righe: parseBlock(s.lines) }));
  checkSubs.filter(s => /^(Piano B|Riepilogo)/.test(s.title))
    .forEach(s => note.push({ titolo: clean(s.title), righe: parseBlock(s.lines) }));

  const giorni = splitBy(find(top, "Piano completo").lines, 2).map(parseGiorno).filter(Boolean);

  // controlli di coerenza
  const date = new Set(giorni.map(g => g.data));
  Object.keys(mappa.luoghi).forEach(d => { if (!date.has(d)) warn(`Luoghi mappa per una data senza giornata: ${d}`); });
  giorni.forEach(g => {
    if (g.hotel && !hotel.some(h => h.nome === g.hotel)) warn(`Hotel del ${g.data} non presente nella lista hotel: ${g.hotel}`);
    if (!mappa.luoghi[g.data] && g.data !== giorni[0].data) warn(`Nessun luogo in mappa per il ${g.data}`);
    // ogni luogo deve cadere nella fascia oraria di un punto del programma (così il sito li collega)
    (mappa.luoghi[g.data] || []).forEach(p => {
      if (!g.items.some(it => inRange(it, p[3]))) warn(`${g.data}: "${p[0]}" (${p[3]}) non cade in nessuna fascia oraria del programma`);
    });
  });

  const trip = {
    title: TITLE, subtitle: SUBTITLE,
    legenda: parseLegenda(check.lines),
    voli: parseVoli(find(top, "Voli").lines),
    hotel, hotelNota,
    scadenzeTabella, scadenze, note,
    pasti: parsePasti(find(top, "Pasti")),
    luoghi: mappa.luoghi,
    giorni
  };

  fs.writeFileSync(OUT,
    "// GENERATO da build.js a partire da MASTER-DATA.md — NON modificare a mano.\n" +
    "// Per cambiare il sito: modificare MASTER-DATA.md e lanciare `node build.js`.\n" +
    "window.TRIP = " + JSON.stringify(trip, null, 2) + ";\n");

  console.log(`data.js rigenerato: ${giorni.length} giorni, ${hotel.length} hotel, ` +
    `${scadenze.reduce((n, s) => n + s.items.length, 0)} prenotazioni, ` +
    `${Object.values(trip.pasti).flat().length} pasti, ${Object.values(mappa.luoghi).flat().length} luoghi in mappa.`);
  warnings.forEach(w => console.warn("⚠ " + w));
}

if (process.argv.includes("--hook")) {
  let input = "";
  process.stdin.on("data", c => { input += c; });
  process.stdin.on("end", () => {
    let file = "";
    try { file = JSON.parse(input).tool_input.file_path || ""; } catch (e) { /* evento non leggibile: ignora */ }
    if (!/MASTER-DATA\.md$/i.test(file)) return;
    try { build(); } catch (e) { console.error("build.js: " + e.message); process.exit(1); }
  });
} else {
  build();
}
