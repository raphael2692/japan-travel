// Unica fonte dati del sito. Aggiornare qui = aggiornare tutto il sito.
// Formato testo: supporta **grassetto** ed emoji, renderizzati da app.js.
window.TRIP = {
  title: "Viaggio di nozze in Giappone",
  subtitle: "18 Novembre - 9 Dicembre 2026",

  legenda: [
    "🌟 Da non perdere", "🔄 Sacrificabile", "🌤️ Meteo-dipendente",
    "🎫 Prenotazione fissa, non si tocca", "✅ Nessuna prenotazione, decidibile sul momento"
  ],

  voli: {
    andata: "**Mer 18 nov, 15:05 → 11:20(+1)** Roma Fiumicino (FCO) → Tokyo Haneda (HND) — ITA Airways AZ 792 — PNR ZE3QEF",
    ritorno: "**Mer 09 dic, 13:20 → 20:25** Tokyo Haneda (HND) → Roma Fiumicino (FCO) — ITA Airways AZ 793 — PNR ZE3QEF"
  },

  hotel: [
    { citta: "Tokyo (1a tappa)", nome: "Hotel Metropolitan Edmont", indirizzo: "3-chome-10-8 Iidabashi, Chiyoda City, Tokyo 102-8130", dal: "gio 19 nov", al: "mar 24 nov" },
    { citta: "Kanazawa", nome: "Lian Kanazawa", indirizzo: "15-58 Yasuecho, Kanazawa, Ishikawa 920-0854", dal: "mar 24 nov", al: "gio 26 nov" },
    { citta: "Kyoto", nome: "KABIN Kyoto", indirizzo: "Shimogyo Ward, Ebisuyacho 187, Kyoto 600-8062", dal: "gio 26 nov", al: "ven 4 dic" },
    { citta: "Osaka", nome: "Aloft by Marriott Osaka Dojima", indirizzo: "2 Chome-1-31 Dojimahama, Kita Ward, Osaka 530-0004", dal: "ven 4 dic", al: "sab 5 dic" },
    { citta: "Tokyo (2a tappa)", nome: "Shiba Park Hotel", indirizzo: "1-chome-5-10 Shibakoen, Minato City, Tokyo 105-0011", dal: "sab 5 dic", al: "mer 9 dic" }
  ],

  // Checklist prenotazioni/scadenze — done: gestito da Claude su richiesta ("segna fatto X")
  scadenze: [
    { id: "kaiseki", titolo: "THE KAISEKI — cena 26/11, Kyoto", tags: "🌟🎫", apre: "26 set", entro: "15 ott", dove: "sito / Tablecheck", done: false,
      note: ["💡 Chiedete il turno 17:30-18:00 per rientrare nella finestra cena."] },
    { id: "mishima", titolo: "Mishima-tei — cena 03/12, Kyoto (sukiyaki wagyu A5)", tags: "🌟🎫", apre: "3 ott", entro: "10 ott", dove: "sito ufficiale / Tablecheck", done: false,
      note: ["💡 Chiedete il primo turno disponibile, idealmente 17:45.", "⚠️ Verificate: alcune case storiche aprono a 3 mesi."] },
    { id: "kawaguchiko-bus", titolo: "Bus/treno per Kawaguchiko (20/11)", tags: "🎫🌤️", apre: "20 ott", oraIt: "03:00", entro: "1 nov", dove: "Japan Bus Online / JR (Fuji Excursion)", done: false,
      note: ["Posti riservati, si esauriscono specie in stagione foliage."] },
    { id: "ninjadera", titolo: "Ninja-dera Myoryu-ji — 25/11, Kanazawa", tags: "🌟🎫", apre: "subito", entro: "31 ott", dove: "telefono / web", done: false,
      note: ["Prenotazione obbligatoria, gruppo guidato in giapponese con libretto inglese."] },
    { id: "hokuriku", titolo: "Shinkansen Hokuriku, Tokyo→Kanazawa (24/11)", tags: "🎫🌤️", apre: "24 ott", oraIt: "03:00", entro: "10 nov", dove: "Ekinet", done: false,
      note: ["💡 Sedili lato sinistro senso di marcia per le Alpi Giapponesi dopo Itoigawa: chiedete esplicitamente \"left side, mountain view\"."] },
    { id: "roppongi", titolo: "Cena fine viaggio, Roppongi (08/12)", tags: "🌟🎫", apre: "1 nov", entro: "15 nov", dove: "sito / concierge", done: false,
      note: ["💡 Chiedete il turno delle 17:30."] },
    { id: "odaiba", titolo: "Ristorante panoramico Odaiba (05/12)", tags: "🌟🎫", apre: "1 nov", entro: "15 nov", dove: "sito / concierge", done: false,
      note: ["💡 Chiedete il turno delle 17:30: si vede comunque il Rainbow Bridge illuminato."] },
    { id: "aoniyoshi", titolo: "Treno Aoniyoshi, Nara→Kyoto (01/12)", tags: "🌟🎫", apre: "1 nov", oraIt: "02:30", entro: "subito, si esaurisce", dove: "Kintetsu online", done: false,
      note: ["💡 Carrozze 1 o 4, sedili singoli/doppi inclinati verso le vetrate.", "⚠️ Sito alle 02:25 con account e carta già salvati, si esaurisce in pochi minuti."] },
    { id: "tokaido", titolo: "Shinkansen Tokaido, Osaka→Tokyo (05/12)", tags: "🎫🌤️", apre: "5 nov", oraIt: "02:00", entro: "20 nov", dove: "smartEX", done: false,
      note: ["💡 Posti D o E, lato Fuji in entrambe le direzioni."] },
    { id: "teamlab", titolo: "teamLab Botanical Garden — 04/12, Osaka", tags: "🌟🎫", apre: "appena disponibile", entro: "20 nov", dove: "solo online", done: false,
      note: ["Museo notturno all'aperto, apre ~17:30, ultimo ingresso ~20:30."] },
    { id: "rikugien", titolo: "Illuminazione Rikugien — 06/12, Tokyo", tags: "🌟🎫", apre: "fine ott", entro: "25 nov", dove: "sito ufficiale", done: false,
      note: ["Biglietto a numero chiuso, ~1.000¥ online / 1.200¥ in loco."] },
    { id: "shibuyasky", titolo: "Shibuya Sky (22/11)", tags: "🌟🎫", apre: "8 nov, 00:00 JST", oraIt: "7 nov ore 16:00", entro: "stesso istante", dove: "Klook consigliato", done: false,
      note: ["⚠️ Il sito ufficiale rifiuta molte carte estere: Klook accetta carte europee e ha cancellazione gratuita fino a 24h prima.", "💡 Slot da puntare: ingresso 15:40 o 16:00."] },
    { id: "vjw", titolo: "Visit Japan Web", tags: "🎫", apre: "quando volete", entro: "16 nov", dove: "visitjapan-web.digital.go.jp", done: false,
      note: ["Generare i QR code prima di salire sull'aereo."] },
    { id: "kirara", titolo: "Trenino Eizan \"Kirara\", Kurama/Kibune (29/11)", tags: "✅", apre: "—", entro: "nessuna scadenza", dove: "in stazione", done: false,
      note: ["Nessuna prenotazione: verificate in loco gli orari e sedete lato vetrate."] }
  ],

  noteRapide: {
    trasporti: "**Il JR Pass nazionale non conviene** (~48.000¥/persona di biglietti singoli vs 80.000¥ del pass 7gg). Comprate biglietti singoli. IC card: **Suica su Apple Wallet**.",
    soldi: "Portate **contanti**: templi, giardini, mercati e ristoranti tradizionali spesso cash-only. Prelievi ai bancomat **7-Eleven** o uffici postali.",
    meteo: "Tokyo 8-16°C sereno. Kyoto mattine 3-6°C (albe fredde davvero). **Kanazawa piove moltissimo**, ombrello sempre. Kawaguchiko sotto zero all'alba.",
    affollamento: "**21-23 novembre**: ponte di tre giorni in Giappone (Labor Thanksgiving 23/11). Tokyo molto piena in quei giorni.",
    takkyubin: "Spedizione bagagli: **23/11 entro 07:45** da Metropolitan Edmont → KABIN Kyoto (arrivo 24-25/11). **03/12 entro 08:00** da KABIN Kyoto → Shiba Park Hotel (arrivo 4-5/12)."
  },

  giorni: [
    { data: "2026-11-18", giorno: "Mercoledì", titolo: "Partenza", hotel: null,
      items: [
        "**15:05** Volo ITA Airways AZ 792, Roma Fiumicino → Tokyo Haneda. 🎫",
        "📌 Codici QR di *Visit Japan Web* già generati prima dell'imbarco. 🎫"
      ] },

    { data: "2026-11-19", giorno: "Giovedì", titolo: "Arrivo a Tokyo e primo assaggio", hotel: "Hotel Metropolitan Edmont",
      note: ["🍽️ ⚠️ Eccezione pranzo: l'atterraggio a mezzogiorno passato rende impossibile pranzare entro le 12:00 oggi."],
      items: [
        "**11:20 – 13:00** Arrivo a Haneda, immigrazione, dogana, eSIM/Pocket Wi-Fi, attivazione Suica. 🎫",
        "**13:00 – 13:45** 🍜 Pranzo veloce: ramen o gyoza vicino a Haneda o stazione.",
        "**13:45 – 14:30** Trasferimento in hotel.",
        "**14:30 – 15:00** Check-in / deposito bagagli, Hotel Metropolitan Edmont, Iidabashi.",
        "**15:15 – 16:15** 🌟✅ Koishikawa Korakuen Gardens — primo foliage. ⚠️ Chiude 17:00, ultimo ingresso 16:30.",
        "**16:30 – 17:15** Riposo breve in hotel.",
        "**17:30 – 19:30** 🍶 Cena: izakaya a Kagurazaka.",
        "**19:45 – 21:00** ✅ Passeggiata serale nei vicoli di Kagurazaka."
      ] },

    { data: "2026-11-20", giorno: "Venerdì", titolo: "Monte Fuji e Lago Kawaguchiko", emoji: "🌤️", hotel: "Hotel Metropolitan Edmont",
      note: [
        "🔄 Alternativa relax: se il volo vi ha distrutti o meteo coperto, mattinata lenta a Tokyo + un giardino (es. Shinjuku Gyoen). ⚠️ Il trasporto è 🎫, verificate la policy di cancellazione prima di dare buca.",
        "⚠️ La Chureito Pagoda è a Shimoyoshida, non a Kawaguchiko: fermata diversa sulla Fujikyu Railway.",
        "🍽️ Nessuna cena fissa: il rientro arriva verso le 19:00, gestitela libera in zona hotel."
      ],
      items: [
        "**07:00 – 09:15** 🎫 Bus espresso da Shinjuku o treno Fuji Excursion fino a Fujisan Station/Kawaguchiko.",
        "**09:15 – 09:35** Fujikyu Railway fino a Shimoyoshida.",
        "**09:45 – 11:15** 🌟🌤️✅ Chureito Pagoda — vista iconica del Fuji, 400 gradini. Mattina = miglior visibilità.",
        "**11:15 – 11:35** Rientro in treno a Kawaguchiko.",
        "**11:45 – 12:45** 🍲 Pranzo: Houtou Fudo, noodles in brodo di miso.",
        "**13:00 – 14:15** 🔄🌤️✅ Mt. Fuji Panoramic Ropeway sul lago.",
        "**14:30 – 16:15** 🌟✅ Momiji Kairo — corridoio di aceri illuminato al tramonto, sponda nord. ⚠️ Festival di solito fino al 23/11 circa.",
        "**16:45 – 19:00** Rientro a Tokyo."
      ] },

    { data: "2026-11-21", giorno: "Sabato", titolo: "Tokyo Est: tradizioni, utensili e vicoli retrò", hotel: "Hotel Metropolitan Edmont",
      note: ["⚠️ Primo giorno del ponte di tre giorni: Asakusa sarà molto affollata, arrivare alle 08:30."],
      items: [
        "**08:30 – 10:00** 🌟✅ Senso-ji, Asakusa, e Nakamise-dori.",
        "**10:15 – 11:15** 🔄✅ Kappabashi Kitchen Town — utensili e sampuru. ⚠️ Molti negozi chiusi la domenica.",
        "**11:30 – 12:30** 🍣 Pranzo: unagi da Unagi Maekawa o tempura ad Asakusa.",
        "**13:00 – 14:15** 🔄✅ Crociera sul Sumida verso Hamarikyu (o solo giardini, chiude 17:00).",
        "**14:30 – 16:15** 🌟✅ Yanaka Ginza, quartiere nostalgico.",
        "**16:30 – 17:30** 🌟✅ Yanaka Ginza al tramonto.",
        "**17:45 – 19:45** 🍢 Cena: izakaya tradizionale tra Yanaka e Ueno."
      ] },

    { data: "2026-11-22", giorno: "Domenica", titolo: "Harajuku, Shimokitazawa e Shibuya", hotel: "Hotel Metropolitan Edmont",
      note: ["🍽️ ⚠️ Eccezione cena: Shibuya Sky (🎫, orario fisso) tiene fino alle 18:30, oggi si entra a cena subito dopo l'uscita."],
      items: [
        "**08:00 – 09:30** 🌟✅ Meiji Jingu — santuario nel bosco urbano, tranquillo la domenica presto.",
        "**09:45 – 11:00** ✅ Harajuku e Takeshita Street.",
        "**11:00 – 11:45** 🥞 Pranzo: crepes/street food ad Harajuku.",
        "**12:00 – 13:30** 🔄✅ Shimokitazawa (vintage) o, in alternativa, Nezu Museum.",
        "**13:45 – 15:15** Tempo libero prima di Shibuya Sky.",
        "**15:40 – 18:30** 🌟🎫 Shibuya Sky — non sacrificabile, slot già pagato. ⚠️ ingresso 15:40 o 16:00, tramonto 16:30, no limite permanenza.",
        "**18:30 – 19:15** ✅ Shibuya Crossing e Hachiko (versione breve).",
        "**19:15 – 21:15** 🥩 Cena: yakiniku o tonkatsu a Shibuya."
      ] },

    { data: "2026-11-23", giorno: "Lunedì", titolo: "Festa nazionale: Shinjuku Gyoen e Nakameguro", hotel: "Hotel Metropolitan Edmont",
      note: [
        "🚨 Spedizione bagagli 1a tappa: entro le 07:45 in reception → KABIN Kyoto. ⚠️ verificare che takkyubin operi nel festivo.",
        "⚠️ Shinjuku Gyoen normalmente chiuso il lunedì: oggi apre perché festivo, verificare sul sito ufficiale."
      ],
      items: [
        "**08:30 – 11:00** 🌟✅ Shinjuku Gyoen National Garden — entrata all'apertura.",
        "**11:30 – 13:30** 🍜 Pranzo: AFURI Nakameguro (yuzu shio ramen) + Starbucks Reserve Roastery.",
        "**14:00 – 16:00** 🔄✅ Daikanyama e Nakameguro, Tsutaya Books.",
        "**16:15 – 17:00** Buffer verso Yurakucho-Ginza.",
        "**17:15 – 19:15** 🥩 Cena: yakiniku/izakaya a Omoide Yokocho, Shinjuku (prenotare, è festivo).",
        "**19:30 – 21:00** ✅ Ebisu Garden Place — luminarie, lampadario Baccarat, Sky Lounge gratuita al 38° piano."
      ] },

    { data: "2026-11-24", giorno: "Martedì", titolo: "Trasferimento a Kanazawa, modalità leggera", emoji: "🎒🌤️", hotel: "Lian Kanazawa",
      items: [
        "**07:30 – 10:00** 🎫🌤️ Hokuriku Shinkansen Tokyo→Kanazawa (~2h30, Kagayaki). Posti lato sinistro per le Alpi. Solo bagaglio a mano.",
        "**10:00 – 10:45** Deposito bagagli al Lian Kanazawa.",
        "**11:00 – 12:45** 🌟 Pranzo: Omicho Market — kaisen-don e nodoguro.",
        "**13:00 – 14:00** ✅ Castello di Kanazawa e parco.",
        "**14:00 – 15:15** 🌟✅ Seisonkaku Villa — residenza Edo 1863. ⚠️ ultimo ingresso 16:30, chiusa il mercoledì. Vietato fotografare interno.",
        "**15:15 – 16:45** 🌟✅ Kenrokuen Garden — yukitsuri già installati. 💡 ingresso libero primissime ore del mattino.",
        "**17:00 – 19:00** 🥢 Cena: cucina Kaga Ryori.",
        "**19:15 – 20:30** ✅ Higashi Chaya e Kazuemachi, quartieri geisha illuminati.",
        "💡 Verificate se attiva l'illuminazione serale gratuita del Kenrokuen."
      ] },

    { data: "2026-11-25", giorno: "Mercoledì", titolo: "Kanazawa: samurai, ninja e artigianato", hotel: "Lian Kanazawa",
      items: [
        "**09:00 – 10:45** 🌟✅ Nagamachi, quartiere samurai, e Nomura Family Samurai House.",
        "**10:45 – 11:15** 🔄✅ Oyama Shrine, portale a vetrate colorate.",
        "**11:30 – 12:30** 🍛 Pranzo: Kanazawa curry o soba locale.",
        "**13:30 – 14:45** 🌟🎫 Myoryu-ji, Ninja-dera — solo su prenotazione, visita guidata a orario fisso.",
        "**14:45 – 15:30** ✅ Teramachi e Nishi Chaya.",
        "**15:45 – 16:45** 🔄✅ Kutani-yaki Kosen Kiln o Kaga Yuzen Center. ⚠️ verificare chiusure.",
        "**17:00 – 19:00** 🍶 Cena centro Kanazawa.",
        "**19:15 – 20:45** 🔄✅ Onsen/sento locale o riposo — prima finestra onsen del viaggio."
      ] },

    { data: "2026-11-26", giorno: "Giovedì", titolo: "Trasferimento a Kyoto e riunione bagagli", hotel: "KABIN Kyoto",
      items: [
        "**07:30 – 09:50** ✅ Hokuriku Shinkansen fino a Tsuruga, cambio, Thunderbird per Kyoto (~2h10 tot).",
        "**10:00 – 11:00** Check-in KABIN Kyoto, ritiro valigie takkyubin.",
        "**11:30 – 13:30** 🍢 Pranzo: Nishiki Market.",
        "**14:00 – 16:00** 🌟✅ Maruyama Park e Yasaka Shrine.",
        "**16:15 – 17:30** 🌟✅ Gion e Hanamikoji Street al tramonto. ⚠️ vietato fotografare nelle stradine private.",
        "**17:45 – 20:15** 🌟🎫 Cena: THE KAISEKI — non sacrificabile, turno 17:45."
      ] },

    { data: "2026-11-27", giorno: "Venerdì", titolo: "Picco foliage: Fushimi Inari all'alba, Tofuku-ji e Uji", emoji: "🍁", hotel: "KABIN Kyoto",
      note: ["🔄 Alternativa relax: tutte le voci sono ✅. Se preferite dormire, spostate Fushimi Inari più tardi o saltate Uji."],
      items: [
        "**06:30 – 09:00** 🌟✅ Fushimi Inari Taisha all'alba, silenzio prima dei bus. 💡 salite fino al belvedere Yotsutsuji.",
        "**09:15 – 11:00** 🌟✅ Tofuku-ji, ponte Tsutenkyo nel rosso. ⚠️ divieto foto dal ponte in alta stagione, verificare ingressi anticipati a pagamento.",
        "**11:15 – 11:35** Treno per Uji (~20 min).",
        "**11:45 – 12:45** 🍵 Pranzo: soba al tè matcha a Uji.",
        "**13:00 – 15:15** 🔄✅ Byodo-in e degustazione matcha — sacrificabile se stanchi.",
        "**15:30 – 16:30** Rientro a Kyoto.",
        "**17:00 – 19:00** 🥩 Cena tipica a Kyoto."
      ] },

    { data: "2026-11-28", giorno: "Sabato", titolo: "Lago Biwa o Kyoto Est, e foliage serale a Eikando", hotel: "KABIN Kyoto",
      note: [
        "⚠️ Enryaku-ji: mezza giornata piena. Funicolari per Monte Hiei chiudono per l'inverno inizio dicembre, verificare.",
        "🍽️ ⚠️ Opzione A: pranzo dopo rientro (~13:00-13:30). Entrambe le opzioni: cena dopo Eikando, ~19:15."
      ],
      items: [
        "**Opzione A — Monte Hiei:**",
        "**08:00 – 13:00** 🔄✅ Enryaku-ji e vista sul Lago Biwa.",
        "**13:00 – 14:00** 🍱 Pranzo in zona o a Otsu.",
        "**14:00 – 15:00** Rientro a Kyoto.",
        "**Opzione B — alternativa (consigliata se stanchi/piove), classici Kyoto nord-est:**",
        "**09:00 – 10:15** ✅ Nanzen-ji e acquedotto in mattoni rossi.",
        "**10:30 – 11:30** ✅ Sentiero della Filosofia.",
        "**11:45 – 12:45** 🍱 Pranzo lungo il sentiero.",
        "**13:00 – 14:30** ✅ Ginkaku-ji, Padiglione d'Argento.",
        "**14:45 – 16:00** Pausa o rientro lento verso Eikando.",
        "**Serata, comune a entrambe:**",
        "**17:00 – 18:45** 🌟✅ Eikando Zenrinji illuminato. ⚠️ biglietto serale separato, presentatevi alle 17:00 (non 16:30 né 18:00).",
        "**19:00 – 21:00** 🏮 Cena: Pontocho Alley."
      ] },

    { data: "2026-11-29", giorno: "Domenica", titolo: "Kurama, Kibune e tunnel di aceri", hotel: "KABIN Kyoto",
      items: [
        "**08:00 – 10:30** 🌟✅ Eizan Railway verso Kurama e Kurama-dera.",
        "**10:30 – 11:45** 🔄✅ Trekking leggero fino a Kibune e santuario Kifune. ⚠️ verificare sentiero aperto.",
        "**11:45 – 12:45** 🍲 Pranzo: nabe/zuppa calda sul fiume a Kibune.",
        "**13:00 – 14:30** Tempo libero a Kibune.",
        "**15:00 – 16:30** 🌟✅ Rientro col trenino Kirara attraverso il Momiji-no-Tunnel. ⚠️ fine novembre tardino, picco a metà mese.",
        "**17:00 – 19:00** 🥢 Cena: izakaya o ramen a Kyoto.",
        "**19:15 – 20:15** ✅ Relax in centro Kyoto."
      ] },

    { data: "2026-11-30", giorno: "Lunedì", titolo: "Higashiyama all'alba e illuminazioni a Kodai-ji", hotel: "KABIN Kyoto",
      items: [
        "**07:00 – 09:00** 🌟✅ Kiyomizu-dera (apre 06:00) — terrazza quasi vuota alle 07:00.",
        "**09:15 – 11:00** 🌟✅ Ninenzaka e Sannenzaka, semideserte prima delle 10:30.",
        "**11:15 – 12:15** 🍡 Pranzo: casa da tè tradizionale.",
        "**12:30 – 14:00** 🔄✅ Hokan-ji, Pagoda di Yasaka.",
        "**14:00 – 16:00** 🔄✅ Riposo in hotel o onsen/sento — seconda finestra onsen del viaggio.",
        "**16:30 – 18:15** 🥟 Cena: gyoza o obanzai.",
        "**18:30 – 20:00** 🌟✅ Kodai-ji Illuminations — bambù e aceri riflessi. ⚠️ verificare illuminazione ancora attiva."
      ] },

    { data: "2026-12-01", giorno: "Martedì", titolo: "Gita a Nara, col treno panoramico Aoniyoshi al rientro", hotel: "KABIN Kyoto",
      note: ["⚠️ Giornata invertita: l'Aoniyoshi Kyoto→Nara parte solo verso le 10:55, quindi si va a Nara ordinario e si torna con l'Aoniyoshi in luce dorata."],
      items: [
        "**07:50 – 08:35** ✅ Limited express Kintetsu o JR, Kyoto→Nara.",
        "**09:00 – 11:45** 🌟✅ Nara Park coi cervi, Todai-ji, Kasuga Taisha.",
        "**11:45 – 12:45** 🍣 Pranzo: kaki-no-ha sushi o udon a Naramachi.",
        "**13:00 – 14:30** 🔄✅ Naramachi, quartiere storico.",
        "**14:45 – 15:45** Tempo libero prima dell'Aoniyoshi.",
        "**15:55 – 16:30** 🌟🎫 AONIYOSHI, Kintetsu Nara→Kyoto — non sacrificabile, posto già pagato. Carrozze 1 o 4.",
        "**17:00 – 19:00** 🍱 Cena a Kyoto."
      ] },

    { data: "2026-12-02", giorno: "Mercoledì", titolo: "Arashiyama all'alba: bambù, scimmie, giardini zen e Padiglione d'Oro", emoji: "🐒✨", hotel: "KABIN Kyoto",
      note: ["🔄 Alternativa relax: ultima alba del viaggio, il pomeriggio è la parte più sacrificabile."],
      items: [
        "**07:15 – 08:20** 🌟✅ Arashiyama Bamboo Grove prima della folla.",
        "**08:30 – 09:45** 🌟✅ Tenryu-ji, giardino zen di Muso Soseki. ⚠️ apre 08:30 in punto.",
        "**10:00 – 11:15** 🍱 Pranzo: Bread, Espresso & Arashiyama Garden.",
        "**11:30 – 13:15** 🔄✅ Scegliete: (a) 🌟 Kinkaku-ji e Ryoan-ji (~20-25min bus), oppure (b) Gio-ji e Otagi Nenbutsu-ji (più intime, ~2km tra loro).",
        "**13:30 – 14:00** ☕ Pausa caffè lungo il fiume.",
        "**14:30 – 15:45** 🔄🐒✅ Arashiyama Monkey Park Iwatayama. ⚠️ in inverno chiude presto, salire entro le 14:45.",
        "**16:00 – 17:15** ✅ Ponte Togetsukyo al tramonto.",
        "**17:30 – 19:30** 🥢 Cena: okonomiyaki o ramen."
      ] },

    { data: "2026-12-03", giorno: "Giovedì", titolo: "Himeji, wagyu A5 e spedizione bagagli per Tokyo", hotel: "KABIN Kyoto",
      note: ["🚨 Spedizione bagagli 2a tappa: ⚠️ entro le 08:00 (non 10:00) → Shiba Park Hotel. Preparare tutto la sera prima."],
      items: [
        "**08:30 – 09:30** ✅ Shinkansen Kyoto→Himeji (~50min, Hikari).",
        "**09:45 – 11:45** 🌟✅ Castello di Himeji. 💡 scale ripide, si entra scalzi, scarpe comode.",
        "**11:45 – 12:45** 🍱 Pranzo: anago o soba a Himeji.",
        "**13:00 – 14:00** 🌟✅ Giardini Koko-en.",
        "**14:15 – 15:45** Rientro in Shinkansen a Kyoto.",
        "**16:00 – 17:30** Pomeriggio libero.",
        "**17:45 – 20:15** 🌟🎫 Cena culmine: Mishima-tei, sukiyaki/teppanyaki wagyu A5 — non sacrificabile, turno 17:45-18:00."
      ] },

    { data: "2026-12-04", giorno: "Venerdì", titolo: "Trasferimento a Osaka, modalità leggera", emoji: "🎒", hotel: "Aloft by Marriott Osaka Dojima",
      note: ["🍽️ ⚠️ teamLab richiede il buio, apre 17:30: cena a Dotonbori necessariamente dopo le 19:15."],
      items: [
        "**08:30 – 09:30** ✅ JR Special Rapid Kyoto→Osaka (~30min). Deposito bagagli Aloft Dojima.",
        "**10:15 – 11:45** 🌟✅ Kuromon Market e Shinsekai con Tsutenkaku Tower.",
        "**11:45 – 12:45** 🍢 Pranzo: kushikatsu a Shinsekai. 💡 non si intinge due volte.",
        "**13:00 – 15:15** 🔄 Osaka Aquarium Kaiyukan — sacrificabile, non comprare biglietto in anticipo se in dubbio.",
        "**15:15 – 16:10** Trasferimento Osakako→Nagai (~50min con cambio a Hommachi).",
        "**17:30 – 19:15** 🌟🎫 teamLab Botanical Garden — non sacrificabile. ⚠️ esperienza all'aperto e al freddo.",
        "**19:30 – 22:00** 🐙 Dotonbori: neon, Glico Man, takoyaki, okonomiyaki."
      ] },

    { data: "2026-12-05", giorno: "Sabato", titolo: "Ritorno a Tokyo e riunione bagagli", emoji: "🌤️", hotel: "Shiba Park Hotel",
      items: [
        "**08:30 – 11:00** 🎫🌤️ Shinkansen Tokaido Shin-Osaka→Tokyo (~2h30, Nozomi). Posti D o E per il Fuji, visibile ~40min dopo Nagoya.",
        "**11:00 – 11:40** Arrivo Shiba Park Hotel, ritiro valigie takkyubin. ⚠️ check-in vero dalle 15:00, chiedere early check-in.",
        "**11:45 – 12:45** 🍣 Pranzo: Tokyo Ramen Street o sushi a Ginza.",
        "**13:00 – 15:00** 🔄✅ Tokyo Tower e Zojo-ji, dietro l'hotel.",
        "**15:15 – 17:15** 🌟✅ Odaiba: baia di Tokyo, Statua della Libertà, Gundam.",
        "**17:30 – 19:30** 🌟🎫 Cena: ristorante panoramico con vista Rainbow Bridge — turno 17:30."
      ] },

    { data: "2026-12-06", giorno: "Domenica", titolo: "Akihabara, Ginza e illuminazione notturna al Rikugien", hotel: "Shiba Park Hotel",
      note: ["💡 Regola di scambio: se i ginkgo del Gaien sono già al picco stamattina, scambiate questa mattinata con quella dell'8/12."],
      items: [
        "**09:30 – 11:30** 🌟✅ Akihabara. 💡 la domenica Chuo-dori diventa isola pedonale nel pomeriggio.",
        "**11:45 – 12:45** 🍛 Pranzo: katsu curry ad Akihabara.",
        "**13:00 – 14:30** 🔄✅ Marunouchi e Stazione di Tokyo.",
        "**14:45 – 16:00** 🌟✅ Ginza con luminarie.",
        "**16:00 – 17:30** 🍻 Cena: izakaya a Yurakucho o vicino Komagome.",
        "**17:30 – 18:00** Trasferimento a Komagome (~25min).",
        "**18:00 – 19:30** 🌟🎫 Illuminazione notturna del Rikugien. ⚠️ biglietto a numero chiuso, comprare online in anticipo."
      ] },

    { data: "2026-12-07", giorno: "Lunedì", titolo: "Gita a Kamakura ed Enoshima", hotel: "Shiba Park Hotel",
      items: [
        "**08:00 – 09:15** ✅ Treno Tokyo→Kamakura (~1h, linea Yokosuka).",
        "**09:30 – 11:45** 🌟✅ Kotoku-in (Grande Buddha) e Hase-dera coi giardini a terrazze.",
        "**11:45 – 12:45** 🐟 Pranzo: shirasu-don.",
        "**13:00 – 15:45** 🔄✅ Trenino Enoden fino a Enoshima, vista Fuji al tramonto dal ponte — sacrificabile.",
        "**16:00 – 17:15** Rientro a Tokyo.",
        "**17:30 – 19:30** 🥢 Cena a Tokyo."
      ] },

    { data: "2026-12-08", giorno: "Martedì", titolo: "Ginkgo, Palazzo Imperiale e Roppongi", hotel: "Shiba Park Hotel",
      note: ["⚠️ Picco ginkgo Meiji Jingu Gaien di solito metà nov-primi dic: se il 6/12 già al massimo, scambiare le due mattinate."],
      items: [
        "**09:30 – 11:00** 🌟✅ Meiji Jingu Gaien, viale dei ginkgo.",
        "**11:15 – 12:00** 🍝 Pranzo: bistrot ad Aoyama.",
        "**12:15 – 13:15** 🔄✅ Chidorigafuchi e fossati del Palazzo Imperiale.",
        "**13:30 – 15:00** ✅ Aoyama e Omotesando.",
        "**15:15 – 17:15** 🌟✅ Roppongi Hills: Tokyo City View e mercatini natalizi.",
        "**17:30 – 20:00** 🌟🎫 Cena di fine viaggio a Roppongi, luci di Keyakizaka Street e Tokyo Tower — non sacrificabile, turno 17:30.",
        "💡 Stasera fate i conti col bagaglio: la reception può spedire una valigia direttamente all'aeroporto."
      ] },

    { data: "2026-12-09", giorno: "Mercoledì", titolo: "Rientro in Italia", hotel: null,
      items: [
        "**08:30 – 09:30** Check-out e colazione.",
        "**09:30 – 10:15** Trasferimento a Haneda (taxi ~25-30min o Monorail da Hamamatsucho).",
        "**10:15 – 13:20** Imbarco e ultimi acquisti. 💡 Terminal 3 ha zona artigianato in stile Edo.",
        "**13:20 – 20:25** 🛫 Volo ITA Airways AZ 793 per Roma Fiumicino. 🎫"
      ] }
  ]
};
