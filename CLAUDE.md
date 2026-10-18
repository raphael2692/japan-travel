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
