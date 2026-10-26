Fai sempre riferimento a  @MASTER-DATA.md per il piano di viaggio. 
Se l'utente fa dei cambiamenti, aggiorna @MASTER-DATA.md.

## Il sito è generato da MASTER-DATA.md

- `data.js` è **generato** da `build.js` a partire da MASTER-DATA.md: non modificarlo mai a mano.
- Un hook (`.claude/settings.json`) rilancia `node build.js` dopo ogni modifica a MASTER-DATA.md. Se lavori fuori da Claude Code, lancialo a mano.
- Leggi sempre l'output della build: i `⚠` segnalano incoerenze (hotel senza coordinate, luoghi della mappa che non cadono in nessuna fascia oraria del programma, intestazioni di giorno non riconosciute). Vanno risolti.
- Quando aggiungi, togli o sposti un luogo nel piano giornaliero, aggiorna anche la tabella **"Mappa — coordinate dei luoghi"** in fondo a MASTER-DATA.md. La colonna `Ora` deve cadere nella fascia `HH:MM -- HH:MM` della voce corrispondente: è così che il sito collega pin e voci della timeline.
- Il parser dipende dalla struttura di MASTER-DATA.md: intestazioni `# ` di sezione, giorni come `## Giorno DD mese -- Titolo`, voci orarie come `- **HH:MM -- HH:MM** ...`, hotel del giorno come `- 🏨 **Nome**`, tabelle markdown per scadenze, pasti e mappa. Mantieni questi formati.
- Il countdown del sito legge gli orari di decollo dalla sezione **Voli** (`giorno mese, HH:MM ... (FCO)`): primo volo = partenza, ultimo = ritorno, fuso preso dal codice aeroporto (`FUSO` in build.js).
- Il meteo (`meteo.js`, Open-Meteo, senza chiave) usa per ogni giorno il luogo della tabella mappa più vicino alle 12:00.

## Guida linguistica (lingua.html, frasi.html, quiz.html, cartellini.html)

- I contenuti stanno in `lingua-data.js`, **scritto a mano** (non generato): situazioni, frasi, dialoghi, kanji, cartellini. Il formato delle tuple è descritto in cima al file. Il rendering è in `lingua.js`.
- Principio: prima **capire** (sezione «sentirai», nell'ordine in cui arrivano le frasi, con la parola chiave in `**grassetto**`), poi rispondere. I dialoghi sono scritti per due persone (viaggio di nozze).
- `LINGUA.giorni` collega ogni data alle situazioni utili quel giorno: se cambi il piano in MASTER-DATA.md (nuovi treni, ristoranti prenotati, spedizioni bagagli), aggiorna anche questa mappa e, se serve, i cartellini.
- I cartellini taxi e quelli delle spedizioni prendono nome e indirizzo degli hotel da `data.js`: si aggiornano da soli se cambia un hotel.
- L'audio usa la sintesi vocale del browser (voce `ja-JP`), senza servizi esterni.
