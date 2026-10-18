// Meteo per giorno, da Open-Meteo (gratuito, senza API key).
// - entro 16 giorni: previsione vera (modelli JMA + ECMWF, scelti da Open-Meteo per il Giappone)
// - oltre: statistica degli ultimi 10 anni per quella località e quel periodo (±3 giorni)
// La località di ogni giorno è il luogo della mappa più vicino a mezzogiorno.

const WX_DAILY = "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum";
const WX_YEARS = 10, WX_SPAN = 3, WX_FORECAST_DAYS = 16;

function wxIcon(code) {
  if (code == null) return "";
  if (code === 0) return "☀️";
  if (code <= 2) return "🌤️";
  if (code === 3) return "☁️";
  if (code <= 48) return "🌫️";
  if (code <= 67 || (code >= 80 && code <= 82)) return code >= 80 ? "🌦️" : "🌧️";
  if (code <= 86) return "🌨️";
  return "⛈️";
}

// [nome, lat, lng] del luogo di riferimento di un giorno
function wxPlace(g) {
  const t = window.TRIP;
  const noon = s => { const m = (s || "").match(/(\d{1,2}):(\d{2})/); return m ? Math.abs(m[1] * 60 + +m[2] - 720) : 9999; };
  const pts = (t.luoghi[g.data] || []).slice().sort((a, b) => noon(a[3]) - noon(b[3]));
  if (pts.length) return pts[0];
  const h = t.hotel.find(h => h.nome === g.hotel);
  return h && h.ll ? [h.nome, h.ll[0], h.ll[1]] : null;
}

function wxCache(key, maxAgeMs, load) {
  try {
    const c = JSON.parse(localStorage.getItem(key));
    if (c && Date.now() - c.at < maxAgeMs) return Promise.resolve(c.data);
  } catch (e) {}
  return load().then(data => {
    try { localStorage.setItem(key, JSON.stringify({ at: Date.now(), data })); } catch (e) {}
    return data;
  });
}

const wxGet = url => fetch(url).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }).then(j => [].concat(j));
const addDays = (iso, n) => { const d = new Date(iso + "T12:00:00Z"); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };

// { "2026-11-20": { fonte, icon, tmax, tmin, pioggia, mm, luogo, ... } }
function loadMeteo() {
  const t = window.TRIP;
  const days = t.giorni.map(g => ({ g, p: wxPlace(g) })).filter(d => d.p);
  const coords = "latitude=" + days.map(d => d.p[1]).join(",") + "&longitude=" + days.map(d => d.p[2]).join(",");
  const first = days[0].g.data, lastDay = days[days.length - 1].g.data;
  const horizon = addDays(todayIso(), WX_FORECAST_DAYS - 1);
  const out = {};

  // statistica storica: un anno per richiesta, tutte le località insieme. Il dataset storico (ERA5)
  // ha celle di ~25 km: si arrotonda a 0,25° e si chiede ogni cella una volta sola.
  const cell = d => [Math.round(d.p[1] * 4) / 4, Math.round(d.p[2] * 4) / 4].join();
  const cells = [...new Set(days.map(cell))];
  const cellCoords = "latitude=" + cells.map(c => c.split(",")[0]).join(",") + "&longitude=" + cells.map(c => c.split(",")[1]).join(",");
  const y0 = +first.slice(0, 4);
  const years = Array.from({ length: WX_YEARS }, (_, k) => y0 - 1 - k);
  // in sequenza: Open-Meteo rifiuta (429) troppe richieste contemporanee
  const clima = wxCache("wx-clima-" + cellCoords, 365 * 864e5, () => years.reduce((acc, y) => acc.then(all =>
    wxGet(`https://archive-api.open-meteo.com/v1/archive?${cellCoords}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Asia%2FTokyo` +
      `&start_date=${addDays(first, -WX_SPAN).replace(/^\d{4}/, y)}&end_date=${addDays(lastDay, WX_SPAN).replace(/^\d{4}/, y)}`)
      .then(r => [...all, r])), Promise.resolve([])));

  // previsione: solo se almeno un giorno del viaggio cade entro l'orizzonte
  const prev = first > horizon || lastDay < todayIso() ? Promise.resolve(null) :
    wxCache("wx-prev-" + coords, 36e5, () =>
      wxGet(`https://api.open-meteo.com/v1/forecast?${coords}&daily=${WX_DAILY}&timezone=Asia%2FTokyo&forecast_days=${WX_FORECAST_DAYS}`));

  const md = s => Date.UTC(2000, +s.slice(5, 7) - 1, +s.slice(8, 10));
  const avg = a => a.reduce((s, v) => s + v, 0) / a.length;
  return Promise.all([clima.catch(() => null), prev.catch(() => null)]).then(([perYear, res]) => {
    days.forEach((d, k) => {
      const base = { luogo: d.p[0], ll: [d.p[1], d.p[2]] };
      const fc = res && res[k].daily, j = fc ? fc.time.indexOf(d.g.data) : -1;
      if (j >= 0 && fc.temperature_2m_max[j] != null) {
        out[d.g.data] = { ...base, fonte: "previsione", icon: wxIcon(fc.weather_code[j]), tmax: fc.temperature_2m_max[j],
          tmin: fc.temperature_2m_min[j], pioggia: fc.precipitation_probability_max[j], mm: fc.precipitation_sum[j] };
        return;
      }
      if (!perYear) return;
      const tx = [], tn = [], mm = [];
      perYear.forEach(r => {
        const dl = r[cells.indexOf(cell(d))].daily;
        dl.time.forEach((day, i) => {
          if (Math.abs(md(day) - md(d.g.data)) <= WX_SPAN * 864e5 && dl.temperature_2m_max[i] != null) {
            tx.push(dl.temperature_2m_max[i]); tn.push(dl.temperature_2m_min[i]); mm.push(dl.precipitation_sum[i] || 0);
          }
        });
      });
      if (!tx.length) return;
      const pioggia = Math.round(100 * mm.filter(v => v >= 1).length / mm.length);
      out[d.g.data] = { ...base, fonte: "storico", tmax: avg(tx), tmin: avg(tn), pioggia, mm: avg(mm),
        icon: pioggia >= 50 ? "🌧️" : pioggia >= 30 ? "🌦️" : "🌤️" };
    });
    return out;
  });
}

const deg = v => Math.round(v) + "°";

// index.html: icona e temperature accanto a ogni giorno
function renderMeteoIndex() {
  loadMeteo().then(m => document.querySelectorAll("[data-wx]").forEach(el => {
    const w = m[el.dataset.wx];
    if (!w) return;
    el.innerHTML = `${w.icon} ${deg(w.tmax)}<small>${deg(w.tmin)}</small>`;
    el.title = (w.fonte === "previsione" ? "Previsione" : "Media storica") + ` · pioggia ${w.pioggia}%`;
  }));
}

// giorno.html: riquadro meteo, con andamento orario quando c'è la previsione
function renderMeteoGiorno(g) {
  const box = document.getElementById("d-meteo");
  if (!box) return;
  loadMeteo().then(m => {
    const w = m[g.data];
    if (!w) return;
    const giorni = Math.round((new Date(g.data) - new Date(todayIso())) / 864e5);
    const affid = giorni <= 3 ? "alta" : giorni <= 7 ? "media" : "bassa";
    const fonte = w.fonte === "previsione"
      ? `Previsione Open-Meteo · affidabilità ${affid} (${giorni <= 0 ? "oggi" : "tra " + giorni + " g"})`
      : `Media ${WX_YEARS} anni (±${WX_SPAN} giorni) · previsione vera dal ${new Date(addDays(g.data, -(WX_FORECAST_DAYS - 1))).toLocaleDateString("it-IT", { day: "numeric", month: "short" })}`;
    box.innerHTML = `
      <div class="wx-main"><span class="wx-icon">${w.icon}</span><span class="wx-t">${deg(w.tmax)} <small>${deg(w.tmin)}</small></span>
        <span class="wx-rain">${w.fonte === "previsione" ? "Pioggia " + w.pioggia + "%" : "Pioggia in " + w.pioggia + "% dei giorni"}<br><small>${w.mm.toFixed(1)} mm</small></span></div>
      <div class="wx-hours" id="wx-hours"></div>
      <div class="wx-src">${fonte} · ${w.luogo}</div>`;
    box.hidden = false;
    if (w.fonte !== "previsione") return;
    wxGet(`https://api.open-meteo.com/v1/forecast?latitude=${w.ll[0]}&longitude=${w.ll[1]}&hourly=weather_code,temperature_2m,precipitation_probability&timezone=Asia%2FTokyo&start_date=${g.data}&end_date=${g.data}`)
      .then(([r]) => {
        const h = r.hourly;
        document.getElementById("wx-hours").innerHTML = [6, 9, 12, 15, 18, 21].map(i =>
          `<div><small>${i}:00</small>${wxIcon(h.weather_code[i])}<b>${deg(h.temperature_2m[i])}</b><small>${h.precipitation_probability[i]}%</small></div>`).join("");
      }).catch(() => {});
  });
}
