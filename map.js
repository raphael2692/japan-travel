// Mappa dei luoghi: Leaflet + tile Esri (nessuna API key, funzionano anche da file://).
// Ogni pin e ogni giornata hanno un link che apre Google Maps.
// Dati in window.TRIP.luoghi (per giorno) e window.TRIP.hotel[].ll, generati da MASTER-DATA.md.

const ESRI = "https://server.arcgisonline.com/ArcGIS/rest/services/";
// tema scuro: base senza etichette + livello etichette sopra
const TILE_URL = {
  light: [ESRI + "World_Street_Map/MapServer/tile/{z}/{y}/{x}"],
  dark: [ESRI + "Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
         ESRI + "Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}"]
};
const TILE_ATTR = 'Tiles &copy; <a href="https://www.esri.com">Esri</a>, HERE, Garmin, &copy; OpenStreetMap';

const CITY_VIEWS = {
  Tokyo: [[35.6800, 139.7400], 11],
  Kanazawa: [[36.5650, 136.6580], 14],
  Kyoto: [[35.0050, 135.7600], 12],
  Osaka: [[34.6650, 135.4900], 12]
};

function mapTheme() {
  return document.documentElement.getAttribute("data-theme") ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
}

function makeMap(el) {
  // la rotella normale scorre la pagina; il pinch (trackpad = ctrl+rotella, o due dita su touch) zooma la mappa
  const map = L.map(el, { scrollWheelZoom: false, zoomSnap: 0, zoomDelta: 1 });
  const tiles = L.layerGroup().addTo(map);
  function paintTiles() {
    tiles.clearLayers();
    TILE_URL[mapTheme()].forEach(url =>
      L.tileLayer(url, { attribution: TILE_ATTR, maxZoom: 18 }).addTo(tiles));
  }
  paintTiles();
  // le tile seguono il tema chiaro/scuro
  new MutationObserver(paintTiles)
    .observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  el.addEventListener("wheel", e => {
    if (!e.ctrlKey) return;
    e.preventDefault();
    const z = Math.min(map.getMaxZoom(), Math.max(map.getMinZoom(), map.getZoom() - e.deltaY * 0.01));
    map.setZoomAround(map.mouseEventToContainerPoint(e), z, { animate: false });
  }, { passive: false });
  // Safari: blocca lo zoom della pagina durante il pinch sulla mappa
  el.addEventListener("gesturestart", e => e.preventDefault());
  return map;
}

function dayColor(i, last) {
  return `hsl(${tintHue(last ? i / last : 0)}, 78%, 44%)`;
}

function pinIcon(label, color, extra) {
  return L.divIcon({
    className: "map-pin" + (extra ? " " + extra : ""),
    html: `<span style="--c:${color}">${label}</span>`,
    iconSize: [24, 24], iconAnchor: [12, 12], popupAnchor: [0, -12]
  });
}

// per Google si passano i nomi, non le coordinate: altrimenti mostra l'indirizzo più vicino
const gq = name => encodeURIComponent(name + ", Japan");
function gmapsPlace(name) {
  return "https://www.google.com/maps/search/?api=1&query=" + gq(name);
}
function gmapsRoute(points) {
  return "https://www.google.com/maps/dir/" + points.map(p => gq(p[0])).join("/");
}

// anteposizione/posposizione dell'hotel ai punti di un giorno: partenza dall'hotel
// della notte precedente (quello di ieri), arrivo all'hotel di stanotte (g.hotel).
// Nei giorni senza trasferimento sono lo stesso hotel, quindi il percorso torna al punto di partenza.
function routePoints(t, i) {
  const g = t.giorni[i];
  const pts = t.luoghi[g.data] || [];
  const start = i > 0 ? t.giorni[i - 1].hotel : null;
  const end = g.hotel;
  const out = [];
  if (start) out.push([start]);
  out.push(...pts);
  if (end) out.push([end]);
  return out;
}

function shortDate(g) {
  return new Date(g.data + "T00:00:00").toLocaleDateString("it-IT", { day: "2-digit", month: "short" });
}

function addHotels(layer) {
  window.TRIP.hotel.forEach(h => {
    if (!h.ll) return;
    L.marker(h.ll, { icon: pinIcon("宿", "", "hotel"), zIndexOffset: 1000 })
      .bindPopup(`<b>${h.nome}</b><div class="mp-meta">${h.citta} · ${h.dal} → ${h.al}</div>
        <a href="${gmapsPlace(h.nome)}" target="_blank" rel="noopener">Apri in Google Maps ↗</a>`)
      .addTo(layer);
  });
}

// disegna i luoghi di un giorno: pin numerati + linea tratteggiata nell'ordine di visita.
// Ritorna i marker, nello stesso ordine dei luoghi.
function addDay(layer, g, i, last, numberBy) {
  const pts = window.TRIP.luoghi[g.data] || [];
  const color = dayColor(i, last);
  if (pts.length > 1) {
    L.polyline(pts.map(p => [p[1], p[2]]), { color, weight: 2.5, opacity: .75, dashArray: "5 6" }).addTo(layer);
  }
  return pts.map((p, k) => {
    const label = numberBy === "step" ? k + 1 : String(i + 1).padStart(2, "0");
    return L.marker([p[1], p[2]], { icon: pinIcon(label, color) })
      .bindPopup(`<b>${numberBy === "step" ? k + 1 + ". " : ""}${p[0]}</b><div class="mp-meta">${g.giorno.slice(0, 3)} ${shortDate(g)}${p[3] ? " · " + p[3] : ""}</div>
        <a href="${gmapsPlace(p[0])}" target="_blank" rel="noopener">Apri in Google Maps ↗</a>
        ${numberBy === "step" ? "" : ` · <a href="giorno.html?d=${g.data}">Giorno →</a>`}`)
      .addTo(layer);
  });
}

// --- index.html: mappa complessiva con filtro per giorno ---
function renderMappa() {
  const el = document.getElementById("map");
  if (!el || !window.L) return;
  const t = window.TRIP;
  const last = t.giorni.length - 1;
  const map = makeMap(el);
  const hotels = L.layerGroup().addTo(map);
  addHotels(hotels);
  const layer = L.featureGroup().addTo(map);

  const select = document.getElementById("map-day");
  const routeLink = document.getElementById("map-route");
  t.giorni.forEach((g, i) => {
    if (!(t.luoghi[g.data] || []).length) return;
    const o = document.createElement("option");
    o.value = g.data;
    o.textContent = `${String(i + 1).padStart(2, "0")} · ${g.giorno.slice(0, 3)} ${shortDate(g)} — ${g.titolo}`;
    select.appendChild(o);
  });

  function draw() {
    layer.clearLayers();
    const d = select.value;
    if (d === "all") {
      t.giorni.forEach((g, i) => addDay(layer, g, i, last, "day"));
      routeLink.hidden = true;
    } else {
      const i = t.giorni.findIndex(g => g.data === d);
      addDay(layer, t.giorni[i], i, last, "step");
      const routePts = routePoints(t, i);
      routeLink.href = gmapsRoute(routePts);
      routeLink.hidden = routePts.length < 2;
    }
    if (layer.getLayers().length) map.fitBounds(layer.getBounds(), { padding: [30, 30], maxZoom: 15 });
  }
  select.addEventListener("change", draw);

  document.querySelectorAll("[data-city]").forEach(b => {
    b.addEventListener("click", () => {
      const v = CITY_VIEWS[b.dataset.city];
      map.setView(v[0], v[1]);
    });
  });

  draw();
}

// --- giorno.html: mappa del singolo giorno, collegata alla timeline ---

const toMin = s => { const m = (s || "").match(/(\d{1,2}):(\d{2})/); return m ? +m[1] * 60 + +m[2] : null; };

// voce della timeline la cui fascia "HH:MM – HH:MM" contiene l'ora del luogo
// (stessa regola dei controlli in build.js)
function itemForTime(items, ora) {
  const t = toMin(ora);
  if (t === null) return null;
  return items.find(li => {
    const m = li.dataset.range.match(/(\d{1,2}:\d{2})(?:\s*–\s*(\d{1,2}:\d{2}))?/);
    const a = toMin(m[1]), b = m[2] ? toMin(m[2]) : a + 1;
    return t >= a && t < b;
  }) || null;
}

function flash(el) {
  el.classList.remove("hl");
  void el.offsetWidth;
  el.classList.add("hl");
}

function renderMappaGiorno() {
  const box = document.getElementById("d-map-box");
  if (!box || !window.L) return;
  const t = window.TRIP;
  const params = new URLSearchParams(location.search);
  const idx = Math.max(0, t.giorni.findIndex(g => g.data === params.get("d")));
  const g = t.giorni[idx];
  const pts = t.luoghi[g.data] || [];
  if (!pts.length) { box.hidden = true; return; }

  const mapEl = document.getElementById("d-map");
  const map = makeMap(mapEl);
  const hotels = L.layerGroup().addTo(map);
  addHotels(hotels);
  const layer = L.featureGroup().addTo(map);
  const markers = addDay(layer, g, idx, t.giorni.length - 1, "step");
  map.fitBounds(layer.getBounds(), { padding: [30, 30], maxZoom: 15 });

  const route = document.getElementById("d-map-route");
  const routePts = routePoints(t, idx);
  route.href = gmapsRoute(routePts);
  route.hidden = routePts.length < 2;

  // ogni voce della timeline riceve il numero del pin (o dei pin) che le corrisponde:
  // click sul numero → la mappa va al pin; click sul pin → la voce si illumina
  const items = [...document.querySelectorAll("#d-timeline li[data-range]")];
  const color = dayColor(idx, t.giorni.length - 1);
  pts.forEach((p, k) => {
    const li = itemForTime(items, p[3]);
    if (!li) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pin-ref";
    btn.style.setProperty("--c", color);
    btn.textContent = k + 1;
    btn.title = p[0] + " — mostra sulla mappa";
    btn.addEventListener("click", () => {
      mapEl.scrollIntoView({ behavior: "smooth", block: "center" });
      map.setView(markers[k].getLatLng(), Math.max(map.getZoom(), 15));
      markers[k].openPopup();
    });
    li.querySelector(".pin-refs").appendChild(btn);
    markers[k].on("click", () => flash(li));
  });
}
