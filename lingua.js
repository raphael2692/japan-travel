// Guida linguistica: pagine delle situazioni, audio, quiz di ascolto e cartellini.
// I contenuti sono in lingua-data.js (scritto a mano, non generato da build.js).
// Usa mdInline, escapeHtml e todayIso di app.js.

const lgData = () => window.LINGUA;
const lgSit = id => lgData().situazioni.find(s => s.id === id);
const lgPlain = s => (s || "").replace(/\*\*/g, "").replace(/〜/g, "");
const lgAttr = s => escapeHtml(s).replace(/"/g, "&quot;");
const lgOrder = () => lgData().gruppi.flatMap(g => g.ids);
const lgGroupOf = id => lgData().gruppi.find(g => g.ids.includes(id));
const lgCount = s => s.sezioni.reduce((n, sec) => n + (sec.frasi ? sec.frasi.length : 0), 0);
const lgDayLabel = iso => new Date(iso + "T00:00:00").toLocaleDateString("it-IT", { weekday: "short", day: "numeric", month: "numeric" });

// --- audio: sintesi vocale del browser con voce giapponese ---
let lgVoice = null;
function lgPickVoice() {
  if (!("speechSynthesis" in window)) return false;
  const vs = speechSynthesis.getVoices();
  lgVoice = vs.find(v => /^ja/i.test(v.lang)) || null;
  return vs.length > 0;
}

// si risolve a fine lettura (o subito, se l'audio non c'è)
function lgSpeak(text, { slow = false, pitch = 1 } = {}) {
  return new Promise(resolve => {
    if (!("speechSynthesis" in window)) return resolve();
    lgPickVoice();
    const u = new SpeechSynthesisUtterance(lgPlain(text));
    u.lang = "ja-JP";
    if (lgVoice) u.voice = lgVoice;
    u.rate = slow ? 0.6 : 0.95;
    u.pitch = pitch;
    u.onend = u.onerror = () => resolve();
    speechSynthesis.speak(u);
  });
}

function lgStop() {
  if ("speechSynthesis" in window) speechSynthesis.cancel();
}

// avviso se il dispositivo non ha una voce giapponese
function lgVoiceCheck(el, onMissing) {
  if (!el) return;
  const warn = msg => { el.innerHTML = msg; el.hidden = false; if (onMissing) onMissing(); };
  if (!("speechSynthesis" in window)) return warn("🔇 Questo browser non ha la sintesi vocale: l'audio non funzionerà. Provate con Chrome o Safari.");
  const check = () => {
    if (!lgPickVoice() || lgVoice) return;
    warn("🔇 <b>Su questo dispositivo manca la voce giapponese</b>, quindi l'audio potrebbe non funzionare." +
      "<br><b>Android:</b> Impostazioni → Sistema → Lingue → Sintesi vocale → Motore Google → Installa dati vocali → Giapponese (scaricatelo: funzionerà anche offline)." +
      "<br><b>iPhone:</b> Impostazioni → Accessibilità → Contenuti letti → Voci → Giapponese." +
      "<br><b>Windows:</b> Impostazioni → Ora e lingua → Lingua → aggiungi Giapponese con la sintesi vocale.");
  };
  check();
  if (speechSynthesis.addEventListener) speechSynthesis.addEventListener("voiceschanged", check);
}

// --- preferenze di visualizzazione (romaji, italiano nascosto per allenarsi) ---
function lgPref(key, def) {
  try { const v = localStorage.getItem("lg-" + key); return v === null ? def : v === "1"; } catch (e) { return def; }
}
function lgSetPref(key, val) {
  try { localStorage.setItem("lg-" + key, val ? "1" : "0"); } catch (e) {}
}
function lgApplyPrefs() {
  document.body.classList.toggle("lg-no-ro", !lgPref("ro", true));
  document.body.classList.toggle("lg-hide-it", !lgPref("it", true));
}

function lgToggles(el) {
  if (!el) return;
  const items = [["ro", "Romaji"], ["it", "Italiano"]];
  el.innerHTML = items.map(([k, label]) => `<button type="button" class="chip" data-pref="${k}" aria-pressed="${lgPref(k, true)}">${label}</button>`).join("") +
    `<span class="lg-toggle-hint">Togliete l'italiano per allenarvi: si rivela toccandolo.</span>`;
  el.addEventListener("click", e => {
    const b = e.target.closest("[data-pref]");
    if (!b) return;
    const val = !lgPref(b.dataset.pref, true);
    lgSetPref(b.dataset.pref, val);
    b.setAttribute("aria-pressed", val);
    lgApplyPrefs();
  });
}

// --- comportamenti comuni: pulsanti audio, dialoghi, italiano da rivelare ---
function lgInit() {
  lgApplyPrefs();
  document.addEventListener("click", e => {
    const say = e.target.closest("button[data-say]");
    if (say) {
      lgStop();
      lgSpeak(say.dataset.say, { slow: !!say.dataset.slow });
      return;
    }
    const dlg = e.target.closest(".lg-dlg-play");
    if (dlg) {
      lgStop();
      const lines = [...dlg.nextElementSibling.querySelectorAll(".lg-line")];
      (async () => {
        for (const l of lines) {
          l.classList.add("playing");
          await lgSpeak(l.dataset.say, { pitch: l.dataset.chi === "N" ? 0.85 : 1.15 });
          l.classList.remove("playing");
        }
      })();
      return;
    }
    const it = e.target.closest(".lg-it");
    if (it && document.body.classList.contains("lg-hide-it")) it.classList.toggle("show");
  });
}

// --- blocchi ---
function lgPlayBtns(text) {
  const t = lgAttr(lgPlain(text));
  return `<span class="lg-play"><button type="button" class="lg-btn" data-say="${t}" aria-label="Ascolta">▶</button>` +
    `<button type="button" class="lg-btn" data-say="${t}" data-slow="1" aria-label="Ascolta lentamente">🐢</button></span>`;
}

function lgPhrase([ja, ro, it, r, n]) {
  return `<div class="lg-ph">
    <div class="lg-ph-body">
      <div class="lg-ja" lang="ja">${mdInline(ja)}</div>
      <div class="lg-ro">${mdInline(ro)}</div>
      <div class="lg-it">${mdInline(it)}</div>
      ${r ? `<div class="lg-r">↳ ${mdInline(r)}</div>` : ""}
      ${n ? `<div class="lg-n">${mdInline(n)}</div>` : ""}
    </div>${lgPlayBtns(ja)}</div>`;
}

const LG_TITOLI = {
  sentirai: "🦻 Cosa sentirete", dire: "🗣️ Cosa dire", pattern: "🧩 Pattern da riusare", dialogo: "💬 Dialogo di esempio",
  kanji: "🔤 Da riconoscere", nota: "💡 Da sapere", cartellini: "🪧 Cartellini da mostrare"
};

function lgSection(sec) {
  const h = `<h2 class="lg-h">${sec.titolo || LG_TITOLI[sec.tipo]}</h2>`;
  switch (sec.tipo) {
    case "sentirai":
    case "dire":
      return h + (sec.tipo === "sentirai" && !sec.titolo ? `<p class="hint">Nell'ordine in cui di solito arrivano. In grassetto la parola da cogliere.</p>` : "") +
        `<div class="lg-list">${sec.frasi.map(lgPhrase).join("")}</div>`;
    case "pattern":
      return h + sec.items.map(p => `<div class="card lg-pat"><div class="lg-pat-p">${escapeHtml(p.p)}</div><div class="lg-pat-it">${mdInline(p.it)}</div>${p.ex.map(lgPhrase).join("")}</div>`).join("");
    case "dialogo":
      return h + `<button type="button" class="link-btn lg-dlg-play">▶ Ascolta tutto il dialogo</button><div class="lg-dlg">` +
        sec.righe.map(([chi, ja, ro, it]) => `<div class="lg-line ${chi === "N" ? "noi" : "loro"}" data-say="${lgAttr(lgPlain(ja))}" data-chi="${chi}">
          <span class="lg-who">${chi === "N" ? "Voi" : "Loro"}</span>
          <div class="lg-ph-body"><div class="lg-ja" lang="ja">${mdInline(ja)}</div><div class="lg-ro">${mdInline(ro)}</div><div class="lg-it">${mdInline(it)}</div></div>
          ${lgPlayBtns(ja)}</div>`).join("") + `</div>`;
    case "kanji":
      return h + `<div class="lg-kanji">${sec.items.map(([k, ro, it]) =>
        `<button type="button" class="lg-k" data-say="${lgAttr(k.split(" / ").pop())}"><span class="lg-k-g" lang="ja">${escapeHtml(k)}</span><span class="lg-k-ro">${escapeHtml(ro)}</span><span class="lg-k-it">${escapeHtml(it)}</span></button>`).join("")}</div>`;
    case "nota":
      return h + `<div class="callout lg-nota">${sec.righe.map(r => `<p>${mdInline(r)}</p>`).join("")}</div>`;
    case "cartellini":
      return h + `<div class="lg-cardlinks">${sec.ids.map(lgCardById).filter(Boolean).map(c =>
        `<a class="card lg-cardlink" href="cartellini.html#${c.id}"><b>${escapeHtml(c.titolo)}</b><span lang="ja">${escapeHtml(c.ja.split("\n")[0])}</span></a>`).join("")}</div>`;
  }
  return "";
}

// --- cartellini: quelli scritti a mano + uno per hotel, con l'indirizzo preso da data.js ---
function lgCards() {
  const hotels = ((window.TRIP && window.TRIP.hotel) || []).map((h, i) => ({
    id: "taxi-" + i, titolo: "Taxi → " + h.nome, ja: "このホテルまでお願いします。", it: "A questo hotel, per favore.", hotel: h.nome
  }));
  return lgData().cartellini.concat(hotels);
}
const lgCardById = id => lgCards().find(c => c.id === id);
const lgHotel = nome => ((window.TRIP && window.TRIP.hotel) || []).find(h => h.nome === nome);

function lgCardHtml(c) {
  const h = c.hotel && lgHotel(c.hotel);
  return `<div class="lg-big" lang="ja">${escapeHtml(c.ja).replace(/\n/g, "<br>")}</div>
    ${h ? `<div class="lg-big-addr"><b>${escapeHtml(h.nome)}</b><br>${escapeHtml(h.indirizzo)}</div>` : ""}
    ${c.scelte ? `<div class="lg-scelte">${c.scelte.map(([ja, it]) => `<div class="lg-scelta"><span lang="ja">${ja}</span><small>${it}</small></div>`).join("")}</div>` : ""}
    <div class="lg-big-it">${escapeHtml(c.it)}</div>`;
}

// --- lingua.html: indice ---
function renderLinguaIndex() {
  const L = lgData();
  lgVoiceCheck(document.getElementById("lg-voice"));

  const today = (L.giorni[todayIso()] || []).map(lgSit).filter(Boolean);
  const oggi = document.getElementById("lg-oggi");
  if (today.length) {
    oggi.innerHTML = `<h2 class="sub-h">Oggi vi servono</h2><div class="chips">${today.map(s => `<a class="chip" href="frasi.html?s=${s.id}">${s.emoji} ${s.titolo}</a>`).join("")}</div>`;
  }

  document.getElementById("lg-prio").innerHTML = "⏱️ <b>Poco tempo?</b> Studiate in quest'ordine: " +
    L.priorita.map((id, i) => `${i + 1}. <a href="frasi.html?s=${id}">${lgSit(id).titolo}</a>`).join(" · ") +
    ". Le altre situazioni ripassatele la sera prima, dalla pagina del giorno.";

  document.getElementById("lg-groups").innerHTML = L.gruppi.map(g => `
    <h2 class="sub-h">${g.titolo}</h2>
    <div class="lg-grid">${g.ids.map(lgSit).map(s => `
      <a class="card lg-sit" href="frasi.html?s=${s.id}">
        <span class="lg-sit-e">${s.emoji}</span>
        <span class="lg-sit-b"><b>${s.titolo}</b><span>${s.desc}</span></span>
        <span class="lg-sit-n">${lgCount(s) || ""}</span>
      </a>`).join("")}</div>`).join("");
}

// --- frasi.html?s=id: una situazione ---
function renderSituazione() {
  const L = lgData();
  const order = lgOrder();
  const id = new URLSearchParams(location.search).get("s");
  const s = lgSit(id) || lgSit(order[0]);
  document.title = s.titolo + " — Giapponese";

  const g = lgGroupOf(s.id);
  document.getElementById("lg-eyebrow").textContent = g ? g.titolo : "";
  document.getElementById("lg-title").textContent = s.emoji + " " + s.titolo;
  document.getElementById("lg-intro").innerHTML = mdInline(s.intro || "");

  const days = Object.keys(L.giorni).filter(d => L.giorni[d].includes(s.id));
  document.getElementById("lg-days").innerHTML = days.length
    ? `<span class="lg-days-l">Vi serve:</span>` + days.map(d => `<a class="chip${d === todayIso() ? " on" : ""}" href="giorno.html?d=${d}">${lgDayLabel(d)}</a>`).join("")
    : "";

  lgToggles(document.getElementById("lg-toggles"));
  lgVoiceCheck(document.getElementById("lg-voice"));

  const hasQuiz = s.sezioni.some(sec => sec.tipo === "sentirai");
  document.getElementById("lg-body").innerHTML = s.sezioni.map(lgSection).join("") +
    (hasQuiz ? `<a class="link-btn lg-quiz-link" href="quiz.html?s=${s.id}">🎧 Allenate l'orecchio su questa situazione</a>` : "");

  const i = order.indexOf(s.id);
  const prev = lgSit(order[i - 1]), next = lgSit(order[i + 1]);
  const prevA = document.getElementById("nav-prev"), nextA = document.getElementById("nav-next");
  if (prev) { prevA.href = "frasi.html?s=" + prev.id; prevA.textContent = "← " + prev.emoji + " " + prev.titolo; } else prevA.classList.add("disabled");
  if (next) { nextA.href = "frasi.html?s=" + next.id; nextA.textContent = next.emoji + " " + next.titolo + " →"; } else nextA.classList.add("disabled");
}

// --- quiz.html: ascolti una frase del personale e scegli cosa vuol dire ---
function lgPool(filter) {
  const out = [];
  lgData().situazioni.forEach(s => {
    if (filter !== "all" && s.id !== filter) return;
    s.sezioni.forEach((sec, si) => {
      if (sec.tipo === "sentirai") sec.frasi.forEach((f, fi) => out.push({ s, f, key: `${s.id}:${si}:${fi}` }));
    });
  });
  return out;
}

function lgShuffle(a) {
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

function renderQuiz() {
  const L = lgData();
  const $ = id => document.getElementById(id);
  const sel = $("q-filter");
  let filter = new URLSearchParams(location.search).get("s") || "all";
  if (!lgSit(filter)) filter = "all";

  sel.innerHTML = `<option value="all">Tutte le situazioni</option>` +
    L.gruppi.map(g => `<optgroup label="${g.titolo}">${g.ids.map(lgSit).filter(s => lgPool(s.id).length).map(s => `<option value="${s.id}">${s.emoji} ${s.titolo}</option>`).join("")}</optgroup>`).join("");
  sel.value = filter;

  let wrong = {};
  try { wrong = JSON.parse(localStorage.getItem("lg-quiz-wrong")) || {}; } catch (e) {}
  const saveWrong = () => { try { localStorage.setItem("lg-quiz-wrong", JSON.stringify(wrong)); } catch (e) {} };

  let pool = [], cur = null, last = null, ok = 0, tot = 0, answered = false;

  function score() {
    const toReview = pool.filter(p => wrong[p.key]).length;
    $("q-score").textContent = (tot ? `${ok} su ${tot} giuste` : "") + (toReview ? ` · ${toReview} da ripassare` : "");
  }

  function pick() {
    const review = pool.filter(p => wrong[p.key] && p !== last);
    if (review.length && Math.random() < 0.4) return review[Math.floor(Math.random() * review.length)];
    const rest = pool.length > 1 ? pool.filter(p => p !== last) : pool;
    return rest[Math.floor(Math.random() * rest.length)];
  }

  function next(play) {
    answered = false;
    cur = last = pick();
    const right = cur.f[2];
    // distrattori dalla stessa situazione (più realistico), poi da tutte
    const same = lgShuffle(lgPool(cur.s.id).map(p => p.f[2]).filter(t => t !== right));
    const all = lgShuffle(lgPool("all").map(p => p.f[2]).filter(t => t !== right && !same.includes(t)));
    const opts = lgShuffle([right, ...[...new Set(same.concat(all))].slice(0, 3)]);

    $("q-sit").textContent = cur.s.emoji + " " + cur.s.titolo;
    $("q-shown").hidden = !lgPref("qtext", false);
    $("q-shown").innerHTML = `<div class="lg-ja" lang="ja">${mdInline(cur.f[0])}</div><div class="lg-ro">${mdInline(cur.f[1])}</div>`;
    $("q-text").textContent = $("q-shown").hidden ? "Mostra il testo" : "Nascondi il testo";
    $("q-opts").innerHTML = opts.map(o => `<button type="button" class="lg-opt" data-ok="${o === right}">${mdInline(o)}</button>`).join("");
    $("q-fb").hidden = true;
    $("q-next").hidden = true;
    score();
    if (play) { lgStop(); lgSpeak(cur.f[0]); }
  }

  function load() {
    pool = lgPool(filter);
    last = null;
    next(false);
  }

  sel.addEventListener("change", () => {
    filter = sel.value;
    history.replaceState(null, "", filter === "all" ? "quiz.html" : "quiz.html?s=" + filter);
    load();
  });
  $("q-play").addEventListener("click", () => { lgStop(); lgSpeak(cur.f[0]); });
  $("q-slow").addEventListener("click", () => { lgStop(); lgSpeak(cur.f[0], { slow: true }); });
  $("q-text").addEventListener("click", () => {
    const show = $("q-shown").hidden;
    $("q-shown").hidden = !show;
    lgSetPref("qtext", show);
    $("q-text").textContent = show ? "Nascondi il testo" : "Mostra il testo";
  });
  $("q-opts").addEventListener("click", e => {
    const b = e.target.closest(".lg-opt");
    if (!b || answered) return;
    answered = true;
    const good = b.dataset.ok === "true";
    tot++;
    if (good) { ok++; if (wrong[cur.key]) { wrong[cur.key]--; if (!wrong[cur.key]) delete wrong[cur.key]; } }
    else wrong[cur.key] = (wrong[cur.key] || 0) + 2;
    saveWrong();
    $("q-opts").querySelectorAll(".lg-opt").forEach(o => o.classList.add(o.dataset.ok === "true" ? "right" : o === b ? "wrong" : "dim"));
    const [ja, ro, it, r, n] = cur.f;
    $("q-fb").innerHTML = `<div class="lg-q-res">${good ? "✓ Giusto" : "✗ Era: " + mdInline(it)}</div>
      <div class="lg-ja" lang="ja">${mdInline(ja)}</div><div class="lg-ro">${mdInline(ro)}</div>
      ${r ? `<div class="lg-r">↳ ${mdInline(r)}</div>` : ""}${n ? `<div class="lg-n">${mdInline(n)}</div>` : ""}`;
    $("q-fb").hidden = false;
    $("q-next").hidden = false;
    score();
  });
  $("q-next").addEventListener("click", () => next(true));

  lgVoiceCheck($("q-voice"), () => { if (!lgPref("qtext", false)) $("q-text").click(); });
  load();
}

// --- cartellini.html: frasi da mostrare a schermo intero ---
function renderCartellini() {
  const list = document.getElementById("lg-cardlist");
  const ov = document.getElementById("lg-overlay");
  const body = document.getElementById("lg-ov-body");
  const cards = lgCards();

  list.innerHTML = cards.map(c => `<a class="card lg-cardlink" href="#${c.id}"><b>${escapeHtml(c.titolo)}</b><span lang="ja">${escapeHtml(c.ja.split("\n")[0])}</span></a>`).join("");

  function show() {
    const c = lgCardById(location.hash.slice(1));
    if (!c) { ov.hidden = true; document.body.classList.remove("lg-ov-open"); return; }
    body.innerHTML = lgCardHtml(c);
    document.getElementById("lg-ov-say").dataset.say = lgPlain(c.ja);
    ov.hidden = false;
    document.body.classList.add("lg-ov-open");
  }
  document.getElementById("lg-ov-close").addEventListener("click", () => {
    lgStop();
    history.replaceState(null, "", location.pathname + location.search);
    show();
  });
  addEventListener("hashchange", show);
  show();
}
