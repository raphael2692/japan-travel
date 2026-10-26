// Guida linguistica — contenuti. Scritto A MANO (non è generato da build.js).
// Formati:
//   frase   = [giapponese, romaji, italiano, risposta?, nota?]   (**parola** = parola chiave da cogliere)
//   dialogo = [chi ("S" = staff/altri, "N" = noi), giapponese, romaji, italiano]
//   kanji   = [kanji, lettura, significato]
// Tipi di sezione: sentirai, dire, pattern, dialogo, kanji, nota, cartellini.
window.LINGUA = {
  gruppi: [
    { titolo: "Prima di tutto", ids: ["kit", "numeri", "cartelli"] },
    { titolo: "Ogni giorno", ids: ["konbini", "negozi", "chiacchiere"] },
    { titolo: "Mangiare", ids: ["ristorante", "prenotato", "ramen", "izakaya", "mercati"] },
    { titolo: "Muoversi", ids: ["treni", "shinkansen", "bus-taxi"] },
    { titolo: "Dormire", ids: ["hotel", "takkyubin"] },
    { titolo: "Visitare", ids: ["biglietti", "onsen"] },
    { titolo: "Imprevisti e telefono", ids: ["imprevisti", "telefono"] }
  ],

  // ordine consigliato se c'è poco tempo
  priorita: ["kit", "numeri", "konbini", "ristorante", "treni"],

  situazioni: [
    // ------------------------------------------------------------------ KIT
    {
      id: "kit", emoji: "🧰", titolo: "Kit di sopravvivenza",
      desc: "Le 15 frasi e le 6 strategie che coprono quasi tutto.",
      intro: "Se avete solo venti minuti, studiate questa pagina. Il resto della guida è costruito sopra questi mattoni.",
      sezioni: [
        { tipo: "nota", titolo: "💡 Come capire senza capire tutto", righe: [
          "**Le domande finiscono con «ka?»** (…masu ka? …desu ka?). Se sentite «ka» in fondo, vi stanno chiedendo qualcosa: quasi sempre basta **hai** (sì) oppure **iie, daijōbu desu** (no, grazie).",
          "**Il personale segue un copione.** In ogni situazione le frasi sono nell'ordine in cui arrivano: se una vi sfugge, aspettate la successiva o la **parola in grassetto**.",
          "**Prezzi e numeri sono sempre su un display** (cassa, macchinetta, tablet): guardate lì invece di ascoltare.",
          "**Gesti:** braccia incrociate a X, o mano che sventola davanti al viso = no, non si può, non c'è. Indicare il proprio naso = «io?».",
          "**Se non capite:** «Sumimasen, mō ichido onegaishimasu» (di nuovo), «yukkuri» (piano), oppure tirate fuori il cartellino «rispondete indicando».",
          "**Google Traduttore:** scaricate il giapponese offline; la fotocamera legge menu e cartelli, la modalità conversazione traduce a voce."
        ]},
        { tipo: "dire", frasi: [
          ["すみません", "sumimasen", "Scusi (per chiamare, scusarsi, e anche per ringraziare)"],
          ["ありがとうございます", "arigatō gozaimasu", "Grazie"],
          ["お願いします", "onegaishimasu", "Per favore (quando accettate o chiedete qualcosa)"],
          ["はい", "hai", "Sì / ho capito"],
          ["いいえ、大丈夫です", "iie, daijōbu desu", "No, grazie (il modo gentile di rifiutare)"],
          ["これをください", "kore o kudasai", "Questo, per favore (indicando)"],
          ["二人です", "futari desu", "Siamo in due"],
          ["いくらですか？", "ikura desu ka?", "Quanto costa?"],
          ["トイレはどこですか？", "toire wa doko desu ka?", "Dov'è il bagno?"],
          ["もう一度お願いします", "mō ichido onegaishimasu", "Di nuovo, per favore"],
          ["ゆっくりお願いします", "yukkuri onegaishimasu", "Più piano, per favore"],
          ["分かりません", "wakarimasen", "Non capisco"],
          ["英語は大丈夫ですか？", "eigo wa daijōbu desu ka?", "Va bene in inglese?"],
          ["カードは使えますか？", "kādo wa tsukaemasu ka?", "Si può pagare con carta?"],
          ["ここに書いてもらえますか？", "koko ni kaite moraemasu ka?", "Me lo scrive qui?", "", "Utilissimo per numeri, orari e prezzi."]
        ]},
        { tipo: "sentirai", frasi: [
          ["いらっしゃいませ", "irasshaimase", "Benvenuti", "Non serve rispondere: un sorriso o un cenno."],
          ["少々お待ちください", "shōshō o-machi kudasai", "Attenda un momento"],
          ["かしこまりました", "kashikomarimashita", "Certamente (ho capito, ci penso io)", "", "Vuol dire che la vostra richiesta è andata a buon fine."],
          ["こちらへどうぞ", "kochira e dōzo", "Da questa parte, prego"],
          ["どうぞ", "dōzo", "Prego (tenga / passi / si accomodi)"],
          ["〜はいりますか？", "~ wa **irimasu** ka?", "Le serve …?", "Hai, onegaishimasu / Iie, irimasen", "«Irimasu ka» = serve? È ovunque: busta, scontrino, bacchette."],
          ["大丈夫ですか？", "daijōbu desu ka?", "Va bene? / Tutto a posto?"],
          ["ございません / ありません", "gozaimasen / **arimasen**", "Non c'è / non ne abbiamo"],
          ["できません", "**dekimasen**", "Non è possibile"],
          ["申し訳ございません", "**mōshiwake** gozaimasen", "Siamo spiacenti…", "", "Preannuncia un no."],
          ["ちょっと…", "**chotto**…", "Eh, un po'… (= no, è difficile)", "", "Detto con un sospiro e la testa inclinata è un no gentile."],
          ["結構です", "**kekkō** desu", "No grazie / va bene così"],
          ["ありがとうございました", "arigatō gozaimashita", "Grazie (mentre uscite)"]
        ]},
        { tipo: "pattern", items: [
          { p: "X o kudasai", it: "Mi dia X / X, per favore", ex: [["水をください", "mizu o kudasai", "Dell'acqua, per favore"]] },
          { p: "X o onegaishimasu", it: "X, per favore (vale anche per servizi)", ex: [["お会計をお願いします", "o-kaikei o onegaishimasu", "Il conto, per favore"]] },
          { p: "X de onegaishimasu", it: "Con X / in modo X, per favore", ex: [["カードでお願いします", "kādo de onegaishimasu", "Con la carta, per favore"]] },
          { p: "X wa doko desu ka?", it: "Dov'è X?", ex: [["駅はどこですか？", "eki wa doko desu ka?", "Dov'è la stazione?"]] },
          { p: "X wa arimasu ka?", it: "Avete X? / C'è X?", ex: [["英語のメニューはありますか？", "eigo no menyū wa arimasu ka?", "Avete il menu in inglese?"]] },
          { p: "~te mo ii desu ka?", it: "Posso …?", ex: [["写真を撮ってもいいですか？", "shashin o totte mo ii desu ka?", "Posso fare una foto?"]] }
        ]}
      ]
    },

    // ------------------------------------------------------------------ NUMERI
    {
      id: "numeri", emoji: "🔢", titolo: "Numeri, prezzi, orari e date",
      desc: "Per capire quanto pagare, a che ora e da che binario.",
      intro: "Il giapponese conta a gruppi di 10.000 (man): 15.000 è «ichiman gosen». Prezzi e orari li vedrete quasi sempre scritti, ma al telefono e agli sportelli li sentirete a voce.",
      sezioni: [
        { tipo: "kanji", titolo: "🔤 Numeri e contatori", items: [
          ["一", "ichi", "1"], ["二", "ni", "2"], ["三", "san", "3"], ["四", "yon / shi", "4"], ["五", "go", "5"],
          ["六", "roku", "6"], ["七", "nana / shichi", "7"], ["八", "hachi", "8"], ["九", "kyū", "9"], ["十", "jū", "10"],
          ["百", "hyaku", "100"], ["千", "sen", "1.000"], ["万", "man", "10.000"], ["円", "en", "yen"],
          ["時", "ji", "ora"], ["分", "fun / pun", "minuti"], ["半", "han", "e mezza"],
          ["月", "gatsu", "mese"], ["日", "nichi / ka", "giorno"], ["番線", "bansen", "binario"], ["号車", "gōsha", "carrozza"]
        ]},
        { tipo: "nota", righe: [
          "**Centinaia irregolari:** 300 sanbyaku, 600 roppyaku, 800 happyaku. **Migliaia:** 3.000 sanzen, 8.000 hassen.",
          "**Persone:** hitori (1), **futari (2)**. **Oggetti:** hitotsu, **futatsu**, mittsu (1, 2, 3).",
          "**Giorni del mese irregolari:** 1 tsuitachi, 2 futsuka, 3 mikka, 4 yokka, 5 itsuka, 6 muika, 7 nanoka, 8 yōka, 9 kokonoka, 10 tōka, 20 **hatsuka**, 24 **nijūyokka**. Gli altri: numero + nichi (25 = nijūgo-nichi).",
          "**Orari:** gozen = mattina, gogo = pomeriggio. 13:30 = gogo ichi-ji han. 4 = yo- negli orari (yo-ji), 9 = ku (ku-ji)."
        ]},
        { tipo: "sentirai", frasi: [
          ["千二百円です", "**sen-nihyaku** en desu", "Sono 1.200 yen"],
          ["三千八百五十円になります", "**sanzen-happyaku-gojū** en ni narimasu", "Sono 3.850 yen"],
          ["一万円お預かりします", "**ichiman** en o-azukari shimasu", "Ricevo 10.000 yen", "", "Ripetono la banconota che avete dato."],
          ["六千百五十円のお返しです", "rokusen-hyaku-gojū en no **o-kaeshi** desu", "Ecco 6.150 yen di resto"],
          ["十時半です", "**jū-ji han** desu", "Sono le 10:30"],
          ["十五分ぐらいです", "**jūgo-fun** gurai desu", "Circa 15 minuti"],
          ["三番線です", "**san-bansen** desu", "Binario 3"],
          ["五号車です", "**go-gōsha** desu", "Carrozza 5"],
          ["二十分待ちです", "**nijuppun** machi desu", "20 minuti di attesa"],
          ["十一月二十日", "jūichi-gatsu **hatsuka**", "20 novembre"],
          ["十二月一日", "jūni-gatsu **tsuitachi**", "1° dicembre"]
        ]},
        { tipo: "dire", frasi: [
          ["これを二つください", "kore o **futatsu** kudasai", "Due di questi, per favore"],
          ["二人です", "futari desu", "Siamo in due"],
          ["何時までですか？", "nan-ji made desu ka?", "Fino a che ora?"],
          ["何分ぐらいですか？", "nan-pun gurai desu ka?", "Circa quanti minuti?"]
        ]}
      ]
    },

    // ------------------------------------------------------------------ CARTELLI
    {
      id: "cartelli", emoji: "🔤", titolo: "Cartelli e kanji da riconoscere",
      desc: "Aperto, chiuso, solo contanti, uscita, spingere o tirare.",
      intro: "Non serve saperli scrivere: basta riconoscerne la forma. Sono quelli che vedrete su porte, vetrine, stazioni e menu.",
      sezioni: [
        { tipo: "kanji", titolo: "🔤 Negozi e locali", items: [
          ["営業中", "eigyō-chū", "aperto"], ["準備中", "junbi-chū", "chiuso (in preparazione)"], ["本日休業", "honjitsu kyūgyō", "chiuso oggi"],
          ["定休日", "teikyūbi", "giorno di chiusura"], ["営業時間", "eigyō jikan", "orario"], ["現金のみ", "genkin nomi", "solo contanti"],
          ["予約", "yoyaku", "prenotazione"], ["満席", "manseki", "tutto pieno"], ["空席", "kūseki", "posti liberi"],
          ["税込", "zeikomi", "tasse incluse"], ["税抜", "zeinuki", "tasse escluse (+10%)"], ["無料", "muryō", "gratis"], ["有料", "yūryō", "a pagamento"]
        ]},
        { tipo: "kanji", titolo: "🔤 Porte, bagni e divieti", items: [
          ["入口", "iriguchi", "entrata"], ["出口", "deguchi", "uscita"], ["押", "osu", "spingere"], ["引", "hiku", "tirare"],
          ["お手洗い", "o-tearai", "bagni"], ["男", "otoko", "uomini"], ["女", "onna", "donne"], ["非常口", "hijōguchi", "uscita di emergenza"],
          ["禁煙", "kin'en", "vietato fumare"], ["喫煙所", "kitsuenjo", "area fumatori"], ["立入禁止", "tachiiri kinshi", "vietato l'accesso"], ["撮影禁止", "satsuei kinshi", "vietato fotografare"]
        ]},
        { tipo: "kanji", titolo: "🔤 Giorni della settimana (per le chiusure)", items: [
          ["月", "getsu", "lunedì"], ["火", "ka", "martedì"], ["水", "sui", "mercoledì"], ["木", "moku", "giovedì"],
          ["金", "kin", "venerdì"], ["土", "do", "sabato"], ["日", "nichi", "domenica"], ["祝", "shuku", "festivi"]
        ]},
        { tipo: "nota", righe: [
          "Su una vetrina «定休日 水» vuol dire **chiuso il mercoledì**: a Kanazawa il 25/11 è proprio mercoledì.",
          "Prezzo con **税抜** accanto: alla cassa pagherete il 10% in più (8% per il cibo da asporto)."
        ]}
      ]
    },

    // ------------------------------------------------------------------ KONBINI
    {
      id: "konbini", emoji: "🏪", titolo: "Konbini",
      desc: "7-Eleven, Lawson, FamilyMart: tutti i giorni.",
      intro: "Alla cassa del konbini arrivano sempre le stesse domande, quasi sempre in quest'ordine. Spesso il commesso dice solo la parola chiave con il tono di una domanda: «Atatame?», «Fukuro?».",
      sezioni: [
        { tipo: "sentirai", frasi: [
          ["いらっしゃいませ", "irasshaimase", "Benvenuti"],
          ["お弁当温めますか？", "o-bentō **atatame**masu ka?", "Glielo scaldo?", "Hai, onegaishimasu / Iie, daijōbu desu", "Anche: «Atatame wa?»"],
          ["お箸はお付けしますか？", "**o-hashi** wa o-tsuke shimasu ka?", "Le metto le bacchette?", "Hai, futatsu onegaishimasu", "Anche: supūn (cucchiaio), fōku (forchetta)."],
          ["袋はご利用ですか？", "**fukuro** wa go-riyō desu ka?", "Le serve una busta?", "Hai, onegaishimasu / Iie, daijōbu desu", "Anche: «Fukuro irimasu ka?», «Reji-bukuro wa?». La busta costa 3-5 yen."],
          ["温かいものと冷たいもの、袋をお分けしますか？", "atatakai mono to tsumetai mono, fukuro o **o-wake** shimasu ka?", "Metto caldo e freddo in buste separate?", "Hai / Issho de daijōbu desu (insieme va bene)"],
          ["ポイントカードはお持ちですか？", "**pointo kādo** wa o-mochi desu ka?", "Ha la carta punti?", "Iie / Arimasen", "La domanda più frequente in assoluto."],
          ["お支払い方法は？", "**o-shiharai** hōhō wa?", "Come paga?", "Kādo de / Genkin de / Suica de"],
          ["画面のタッチをお願いします", "**gamen** no tatchi o onegaishimasu", "Tocchi lo schermo, per favore", "", "Sul display rivolto verso di voi scegliete il metodo di pagamento o confermate."],
          ["こちらにタッチしてください", "kochira ni **tatchi** shite kudasai", "Appoggi qui (carta o Suica)"],
          ["年齢確認ボタンを押してください", "**nenrei kakunin** botan o oshite kudasai", "Prema il tasto di conferma dell'età", "", "Per alcolici: toccate «はい» sullo schermo."],
          ["レシートはいりますか？", "**reshīto** wa irimasu ka?", "Vuole lo scontrino?", "Iie, daijōbu desu", "Anche: «Reshīto wa yoroshii desu ka?», che vuol dire «possiamo farne a meno?»: rispondete con kudasai o daijōbu desu, non con hai."],
          ["ありがとうございました", "arigatō gozaimashita", "Grazie"]
        ]},
        { tipo: "dire", frasi: [
          ["温めてください", "atatamete kudasai", "Me lo scaldi, per favore"],
          ["袋はいりません", "fukuro wa irimasen", "Non mi serve la busta"],
          ["Suicaで", "Suica de", "Con la Suica"],
          ["カードで", "kādo de", "Con la carta"],
          ["Suicaにチャージできますか？", "Suica ni chāji dekimasu ka?", "Si può ricaricare la Suica?", "", "Sì, in contanti alla cassa: utile per finire il credito negli ultimi giorni."],
          ["トイレを借りてもいいですか？", "toire o karite mo ii desu ka?", "Posso usare il bagno?"],
          ["ATMはどこですか？", "ētīemu wa doko desu ka?", "Dov'è il bancomat?"]
        ]},
        { tipo: "pattern", items: [
          { p: "X wa irimasen", it: "Non mi serve X", ex: [["レシートはいりません", "reshīto wa irimasen", "Non mi serve lo scontrino"]] },
          { p: "X de", it: "Con X (pagamento)", ex: [["現金で", "genkin de", "In contanti"]] }
        ]},
        { tipo: "dialogo", righe: [
          ["S", "いらっしゃいませ。…お弁当、温めますか？", "irasshaimase. … o-bentō, atatamemasu ka?", "Benvenuti. … Lo scaldo?"],
          ["N", "はい、お願いします。", "hai, onegaishimasu.", "Sì, grazie."],
          ["S", "お箸は何膳お付けしますか？", "o-hashi wa nan-zen o-tsuke shimasu ka?", "Quante paia di bacchette?"],
          ["N", "二つお願いします。", "futatsu onegaishimasu.", "Due, per favore."],
          ["S", "袋はご利用ですか？", "fukuro wa go-riyō desu ka?", "Le serve la busta?"],
          ["N", "いいえ、大丈夫です。", "iie, daijōbu desu.", "No, grazie."],
          ["S", "ポイントカードはお持ちですか？", "pointo kādo wa o-mochi desu ka?", "Ha la carta punti?"],
          ["N", "ないです。カードで。", "nai desu. kādo de.", "No. Con la carta."],
          ["S", "こちらにタッチしてください。…ありがとうございました。", "kochira ni tatchi shite kudasai. … arigatō gozaimashita.", "Appoggi qui. … Grazie."]
        ]}
      ]
    },

    // ------------------------------------------------------------------ NEGOZI
    {
      id: "negozi", emoji: "🛍️", titolo: "Negozi, tax free e pagamento",
      desc: "Taglie, regali, carta di credito, tax free.",
      intro: "Nei negozi il copione cambia poco: offerta di aiuto, prova, pagamento. Con la carta vi chiederanno quasi sempre se pagare in un'unica soluzione: rispondete hai.",
      sezioni: [
        { tipo: "sentirai", frasi: [
          ["何かお探しですか？", "nanika **o-sagashi** desu ka?", "Cerca qualcosa?", "Miteru dake desu (sto solo guardando)"],
          ["ご試着されますか？", "go-**shichaku** saremasu ka?", "Vuole provarlo?"],
          ["サイズはいかがでしたか？", "**saizu** wa ikaga deshita ka?", "Com'era la taglia?", "Chōdo ii desu (perfetta) / Chotto ōkii desu (un po' grande)"],
          ["プレゼント用ですか？", "**purezento**-yō desu ka?", "È un regalo?", "Hai / Iie, jibun-yō desu (è per me)"],
          ["袋はお分けしますか？", "fukuro wa **o-wake** shimasu ka?", "Le do buste separate?", "", "Utile per i souvenir da regalare."],
          ["免税手続きをされますか？", "**menzei** tetsuzuki o saremasu ka?", "Facciamo la pratica tax free?", "Hai, onegaishimasu", "Serve il passaporto, di solito sopra i 5.000 yen."],
          ["パスポートをお願いします", "**pasupōto** o onegaishimasu", "Il passaporto, per favore"],
          ["お支払いは一括でよろしいですか？", "o-shiharai wa **ikkatsu** de yoroshii desu ka?", "Paga in un'unica soluzione?", "Hai", "Le carte giapponesi permettono le rate: per voi la risposta è sempre sì."],
          ["暗証番号を入力してください", "**anshō bangō** o nyūryoku shite kudasai", "Inserisca il PIN"],
          ["こちらにサインをお願いします", "kochira ni **sain** o onegaishimasu", "Firmi qui, per favore"],
          ["在庫を確認してまいります", "**zaiko** o kakunin shite mairimasu", "Vado a controllare in magazzino"],
          ["申し訳ございません、在庫切れです", "mōshiwake gozaimasen, **zaiko-gire** desu", "Spiacenti, è esaurito"]
        ]},
        { tipo: "dire", frasi: [
          ["見ているだけです", "miteru dake desu", "Sto solo guardando"],
          ["試着してもいいですか？", "shichaku shite mo ii desu ka?", "Posso provarlo?"],
          ["もっと大きいのはありますか？", "motto ōkii no wa arimasu ka?", "Ce l'ha più grande?", "", "Più piccolo: motto chiisai no."],
          ["免税できますか？", "menzei dekimasu ka?", "Si può fare il tax free?"],
          ["プレゼント用に包んでください", "purezento-yō ni tsutsunde kudasai", "Me lo incarta da regalo?"],
          ["これにします", "kore ni shimasu", "Prendo questo"]
        ]},
        { tipo: "nota", righe: [
          "⚠️ **Tax free: dal 1° novembre 2026 il sistema dovrebbe cambiare.** Pagherete il prezzo pieno in negozio e la tassa vi verrà rimborsata all'uscita dal Giappone, alla dogana, mostrando la merce. Riverificate prima di partire e tenete gli acquisti tax free nel bagaglio a mano, non aperti."
        ]}
      ]
    },

    // ------------------------------------------------------------------ CHIACCHIERE
    {
      id: "chiacchiere", emoji: "📸", titolo: "Due chiacchiere e foto",
      desc: "Da dove venite, congratulazioni, «ci fa una foto?».",
      intro: "Sono le conversazioni fuori copione più probabili: un anziano curioso in un tempio, un negoziante, qualcuno che vi offre di scattarvi una foto. Le domande sono sempre le stesse cinque o sei.",
      sezioni: [
        { tipo: "sentirai", frasi: [
          ["どちらから来ましたか？", "**dochira kara** kimashita ka?", "Da dove venite?", "Itaria kara desu", "Anche: «Dochira kara irasshaimashita ka?», «O-kuni wa?»"],
          ["日本は初めてですか？", "Nihon wa **hajimete** desu ka?", "È la prima volta in Giappone?", "Hai, hajimete desu"],
          ["旅行ですか？", "**ryokō** desu ka?", "Siete in viaggio?", "Hai, shinkon ryokō desu"],
          ["おめでとうございます！", "**omedetō** gozaimasu!", "Congratulazioni!", "Arigatō gozaimasu!"],
          ["日本語が上手ですね", "Nihongo ga **jōzu** desu ne", "Parla bene il giapponese!", "Iie, mada mada desu", "«Mada mada» (ho ancora tanto da imparare) è la risposta modesta che ci si aspetta."],
          ["写真、撮りましょうか？", "**shashin**, torimashō ka?", "Vi faccio una foto?", "Hai, onegaishimasu!"],
          ["撮りますよー。はい、チーズ！", "**torimasu** yo. hai, chīzu!", "Scatto! Cheese!"],
          ["もう一枚撮りますね", "mō **ichimai** torimasu ne", "Ne faccio un'altra"],
          ["何日ぐらいいるんですか？", "**nan-nichi** gurai iru n desu ka?", "Quanti giorni restate?", "San-shūkan desu (tre settimane)"],
          ["どこに行きましたか？", "**doko** ni ikimashita ka?", "Dove siete stati?", "Kyōto to Kanazawa desu"],
          ["楽しんでくださいね", "**tanoshinde** kudasai ne", "Divertitevi!"],
          ["お気をつけて", "o-ki o **tsukete**", "Fate attenzione / buon viaggio"]
        ]},
        { tipo: "dire", frasi: [
          ["イタリアから来ました", "Itaria kara kimashita", "Veniamo dall'Italia", "", "Oppure «Rōma kara desu»."],
          ["新婚旅行です", "shinkon ryokō desu", "Siamo in viaggio di nozze"],
          ["写真を撮っていただけますか？", "shashin o totte itadakemasu ka?", "Ci può fare una foto?"],
          ["もう一枚お願いします", "mō ichimai onegaishimasu", "Un'altra, per favore"],
          ["撮りましょうか？", "torimashō ka?", "Gliela faccio io?"],
          ["日本が大好きです", "Nihon ga daisuki desu", "Adoriamo il Giappone"],
          ["これは日本語で何と言いますか？", "kore wa Nihongo de nan to iimasu ka?", "Come si dice in giapponese?"]
        ]},
        { tipo: "dialogo", righe: [
          ["S", "写真、撮りましょうか？", "shashin, torimashō ka?", "Vi faccio una foto?"],
          ["N", "はい、お願いします！", "hai, onegaishimasu!", "Sì, grazie!"],
          ["S", "どちらから来ましたか？", "dochira kara kimashita ka?", "Da dove venite?"],
          ["N", "イタリアから来ました。新婚旅行です。", "Itaria kara kimashita. shinkon ryokō desu.", "Dall'Italia. Siamo in viaggio di nozze."],
          ["S", "わあ、おめでとうございます！撮りますよー。はい、チーズ！", "wā, omedetō gozaimasu! torimasu yo. hai, chīzu!", "Oh, congratulazioni! Scatto! Cheese!"],
          ["N", "ありがとうございます！", "arigatō gozaimasu!", "Grazie mille!"]
        ]},
        { tipo: "cartellini", ids: ["nozze", "foto"] }
      ]
    },

    // ------------------------------------------------------------------ RISTORANTE
    {
      id: "ristorante", emoji: "🍽️", titolo: "Ristorante senza prenotazione",
      desc: "Quanti siete, ordinare, il conto.",
      intro: "Il copione di un ristorante giapponese: vi chiedono in quanti siete, vi accompagnano, vi lasciano il menu e aspettano che li chiamiate. Il conto si paga alla cassa vicino all'uscita, portando lo scontrino lasciato sul tavolo. Niente mancia.",
      sezioni: [
        { tipo: "sentirai", frasi: [
          ["何名様ですか？", "**nanmei**-sama desu ka?", "Quanti siete?", "Futari desu (o mostrate due dita)", "Anche: «O-futari-sama desu ka?» (Siete in due?) → hai."],
          ["おタバコは吸われますか？", "o-**tabako** wa suwaremasu ka?", "Fumate?", "Iie"],
          ["ただいま満席です", "tadaima **manseki** desu", "Al momento è tutto pieno"],
          ["こちらにお名前を書いてお待ちください", "kochira ni **o-namae** o kaite o-machi kudasai", "Scrivete il nome qui e aspettate", "", "Lista d'attesa: nome in romaji e numero di persone."],
          ["カウンター席でもよろしいですか？", "**kauntā**-seki demo yoroshii desu ka?", "Va bene al bancone?", "Hai, daijōbu desu"],
          ["こちらへどうぞ", "kochira e dōzo", "Da questa parte"],
          ["お飲み物はいかがなさいますか？", "o-**nomimono** wa ikaga nasaimasu ka?", "Cosa vi porto da bere?"],
          ["ご注文はお決まりですか？", "go-chūmon wa **o-kimari** desu ka?", "Avete deciso?", "Mada desu (non ancora) / Hai"],
          ["お決まりになりましたら、ボタンでお呼びください", "o-kimari ni narimashitara, **botan** de o-yobi kudasai", "Quando avete deciso, chiamateci col pulsante"],
          ["ご注文はタブレットでお願いします", "go-chūmon wa **taburetto** de onegaishimasu", "Ordinate dal tablet, per favore"],
          ["はい、お伺いします", "hai, **o-ukagai** shimasu", "Sì, dica pure", "", "La risposta quando chiamate «sumimasen!»."],
          ["ご注文は以上でよろしいですか？", "go-chūmon wa **ijō** de yoroshii desu ka?", "È tutto?", "Hai"],
          ["少々お時間かかります", "shōshō o-**jikan** kakarimasu", "Ci vorrà un po'"],
          ["お待たせしました", "o-**matase** shimashita", "Ecco a voi (scusate l'attesa)"],
          ["お下げしてもよろしいですか？", "o-**sage** shite mo yoroshii desu ka?", "Posso portare via il piatto?"],
          ["ラストオーダーのお時間です", "**rasuto ōdā** no o-jikan desu", "È l'ora dell'ultimo ordine"],
          ["お会計はレジでお願いします", "o-kaikei wa **reji** de onegaishimasu", "Il conto si paga alla cassa"]
        ]},
        { tipo: "dire", frasi: [
          ["二人です", "futari desu", "Siamo in due"],
          ["英語のメニューはありますか？", "eigo no menyū wa arimasu ka?", "Avete il menu in inglese?"],
          ["おすすめは何ですか？", "osusume wa nan desu ka?", "Cosa ci consiglia?"],
          ["これとこれをください", "kore to kore o kudasai", "Questo e questo"],
          ["お水をお願いします", "o-mizu o onegaishimasu", "Dell'acqua, per favore", "", "L'acqua è gratis, spesso self-service."],
          ["取り皿をください", "torizara o kudasai", "Dei piattini per dividere"],
          ["おいしいです！", "oishii desu!", "È buonissimo!"],
          ["お会計をお願いします", "o-kaikei o onegaishimasu", "Il conto, per favore", "", "Oppure il gesto: due indici incrociati a X."],
          ["ごちそうさまでした", "gochisōsama deshita", "Grazie del pasto (uscendo)"]
        ]},
        { tipo: "pattern", items: [
          { p: "X to Y o kudasai", it: "X e Y, per favore", ex: [["ビールとお茶をください", "bīru to o-cha o kudasai", "Una birra e un tè"]] },
          { p: "X o futatsu", it: "Due X", ex: [["これを二つください", "kore o futatsu kudasai", "Due di questi"]] }
        ]},
        { tipo: "dialogo", righe: [
          ["S", "いらっしゃいませ！何名様ですか？", "irasshaimase! nanmei-sama desu ka?", "Benvenuti! In quanti siete?"],
          ["N", "二人です。", "futari desu.", "Siamo in due."],
          ["S", "こちらへどうぞ。", "kochira e dōzo.", "Da questa parte."],
          ["N", "すみません！", "sumimasen!", "Scusi!"],
          ["S", "はい、お伺いします。", "hai, o-ukagai shimasu.", "Sì, dica pure."],
          ["N", "これとこれをください。あと、お水を二つ。", "kore to kore o kudasai. ato, o-mizu o futatsu.", "Questo e questo. E due acque."],
          ["S", "かしこまりました。以上でよろしいですか？", "kashikomarimashita. ijō de yoroshii desu ka?", "Certo. È tutto?"],
          ["N", "はい。", "hai.", "Sì."],
          ["N", "ごちそうさまでした。お会計お願いします。", "gochisōsama deshita. o-kaikei onegaishimasu.", "Grazie, era buonissimo. Il conto, per favore."],
          ["S", "ありがとうございます。お会計はレジでお願いします。", "arigatō gozaimasu. o-kaikei wa reji de onegaishimasu.", "Grazie. Si paga alla cassa."]
        ]}
      ]
    },

    // ------------------------------------------------------------------ PRENOTATO
    {
      id: "prenotato", emoji: "🍣", titolo: "Ristorante prenotato e omakase",
      desc: "Tan, Mishima-tei, Unagiya Hirokawa, Sushiya Shota.",
      intro: "Nei locali prenotati il copione è più formale: verifica della prenotazione, domanda sulle allergie, lo chef che presenta ogni piatto. Arrivate puntuali: negli omakase tutti iniziano insieme.",
      sezioni: [
        { tipo: "sentirai", frasi: [
          ["ご予約のお客様ですか？", "go-**yoyaku** no o-kyaku-sama desu ka?", "Avete prenotato?", "Hai, Supataro de yoyaku shite imasu"],
          ["お名前を頂戴できますか？", "**o-namae** o chōdai dekimasu ka?", "Il nome, per favore?"],
          ["六時からご予約のスパタロ様ですね", "roku-ji kara go-yoyaku no **Supataro-sama** desu ne", "Spataro, prenotazione delle 6, giusto?", "Hai, sō desu"],
          ["お待ちしておりました", "o-**machi** shite orimashita", "Vi aspettavamo"],
          ["コートをお預かりいたしましょうか？", "**kōto** o o-azukari itashimashō ka?", "Prendo i cappotti?"],
          ["苦手なものやアレルギーはございますか？", "nigate na mono ya **arerugī** wa gozaimasu ka?", "Ci sono cibi che non mangiate o allergie?", "Iie, nan demo taberaremasu"],
          ["こちらは〜でございます", "kochira wa ~ **de gozaimasu**", "Questo è …", "", "Lo chef presenta il piatto: annuite e ditegli «oishii»."],
          ["そのままお召し上がりください", "**sono mama** o-meshiagari kudasai", "Mangiatelo così com'è", "", "Senza soia: è già condito."],
          ["お醤油をつけてお召し上がりください", "o-**shōyu** o tsukete o-meshiagari kudasai", "Con un po' di soia"],
          ["溶き卵につけてお召し上がりください", "**tokitamago** ni tsukete o-meshiagari kudasai", "Intingetelo nell'uovo sbattuto", "", "Il sukiyaki da Mishima-tei."],
          ["熱いのでお気をつけください", "**atsui** no de o-ki o tsuke kudasai", "Attenzione, è caldo"],
          ["お飲み物のおかわりはいかがですか？", "o-nomimono no **o-kawari** wa ikaga desu ka?", "Un altro da bere?"],
          ["追加でいかがですか？", "**tsuika** de ikaga desu ka?", "Volete aggiungere qualcosa?", "", "Nell'omakase: un pezzo extra, a pagamento."],
          ["お口に合いましたか？", "o-kuchi ni **aimashita** ka?", "Vi è piaciuto?", "Hai, totemo oishikatta desu!"]
        ]},
        { tipo: "dire", frasi: [
          ["六時にスパタロで予約しています", "roku-ji ni Supataro de yoyaku shite imasu", "Abbiamo prenotato alle 6 a nome Spataro", "", "Usate il cognome con cui avete prenotato."],
          ["新婚旅行中です", "shinkon ryokō-chū desu", "Siamo in viaggio di nozze"],
          ["何でも食べられます", "nan demo taberaremasu", "Mangiamo di tutto"],
          ["これは何ですか？", "kore wa nan desu ka?", "Cos'è questo?"],
          ["料理の写真を撮ってもいいですか？", "ryōri no shashin o totte mo ii desu ka?", "Possiamo fotografare i piatti?"],
          ["これをもう一つお願いします", "kore o mō hitotsu onegaishimasu", "Un altro di questo, per favore"],
          ["とてもおいしかったです。ごちそうさまでした", "totemo oishikatta desu. gochisōsama deshita", "Era buonissimo. Grazie del pasto"]
        ]},
        { tipo: "nota", righe: [
          "**Sushi omakase:** il nigiri si può mangiare con le mani. Se lo chef l'ha già spennellato, niente soia. Non sciogliete il wasabi nella soia. Profumi forti sconsigliati.",
          "**Sukiyaki:** di solito la cameriera cuoce al tavolo i primi pezzi. Lasciatela fare e seguite i suoi gesti."
        ]},
        { tipo: "dialogo", righe: [
          ["S", "いらっしゃいませ。ご予約のお客様ですか？", "irasshaimase. go-yoyaku no o-kyaku-sama desu ka?", "Benvenuti. Avete prenotato?"],
          ["N", "はい、六時にスパタロで予約しています。", "hai, roku-ji ni Supataro de yoyaku shite imasu.", "Sì, alle 6 a nome Spataro."],
          ["S", "スパタロ様、お待ちしておりました。こちらへどうぞ。", "Supataro-sama, o-machi shite orimashita. kochira e dōzo.", "Signori Spataro, vi aspettavamo. Prego."],
          ["S", "苦手なものやアレルギーはございますか？", "nigate na mono ya arerugī wa gozaimasu ka?", "Allergie o cibi che non mangiate?"],
          ["N", "いいえ、何でも食べられます。実は新婚旅行なんです。", "iie, nan demo taberaremasu. jitsu wa shinkon ryokō nan desu.", "No, mangiamo di tutto. A dire il vero siamo in viaggio di nozze."],
          ["S", "それはおめでとうございます！", "sore wa omedetō gozaimasu!", "Oh, congratulazioni!"],
          ["N", "ありがとうございます。", "arigatō gozaimasu.", "Grazie."]
        ]},
        { tipo: "cartellini", ids: ["prenotazione", "nozze"] }
      ]
    },

    // ------------------------------------------------------------------ RAMEN
    {
      id: "ramen", emoji: "🍜", titolo: "Ramen, caffè e locali veloci",
      desc: "Macchinetta dei biglietti, cottura dei noodle, da asporto.",
      intro: "Nei ramen e nei locali veloci spesso si paga prima, alla macchinetta dei biglietti (食券機, shokkenki): scegliete, pagate, consegnate il biglietto al bancone. Il tasto in alto a sinistra è di solito il piatto della casa.",
      sezioni: [
        { tipo: "kanji", titolo: "🔤 Sulla macchinetta", items: [
          ["食券", "shokken", "biglietto pasto"], ["ラーメン", "rāmen", "ramen"], ["つけ麺", "tsukemen", "noodle da intingere"],
          ["並", "nami", "porzione normale"], ["大盛", "ōmori", "porzione grande"], ["味玉", "ajitama", "uovo marinato"],
          ["替玉", "kaedama", "secondo giro di noodle"], ["トッピング", "toppingu", "aggiunte"], ["ご飯", "gohan", "riso"]
        ]},
        { tipo: "sentirai", frasi: [
          ["先に食券をお買い求めください", "saki ni **shokken** o o-kaimotome kudasai", "Prima comprate il biglietto alla macchinetta"],
          ["食券をお預かりします", "shokken o **o-azukari** shimasu", "Prendo il biglietto"],
          ["麺の硬さはどうしますか？", "men no **katasa** wa dō shimasu ka?", "Come volete i noodle?", "Futsū de (normali) / Katame de (al dente)"],
          ["大盛りにしますか？", "**ōmori** ni shimasu ka?", "Porzione grande?", "Iie, futsū de"],
          ["空いているお席へどうぞ", "**aite iru** o-seki e dōzo", "Sedetevi dove c'è posto"],
          ["後ろに並んでお待ちください", "ushiro ni **narande** o-machi kudasai", "Mettetevi in fila dietro e aspettate"],
          ["スープ割りはいかがですか？", "**sūpu-wari** wa ikaga desu ka?", "Volete allungare la salsa col brodo?", "Hai, onegaishimasu", "Alla fine dello tsukemen (Rokurinsha): si allunga la salsa e la si beve."],
          ["店内でお召し上がりですか？", "**tennai** de o-meshiagari desu ka?", "Mangiate qui?", "Hai / Mochikaeri desu (da asporto)"],
          ["お持ち帰りですか？", "o-**mochikaeri** desu ka?", "Da portare via?"],
          ["ホットとアイス、どちらにしますか？", "**hotto** to **aisu**, dochira ni shimasu ka?", "Caldo o freddo?"],
          ["サイズはいかがなさいますか？", "**saizu** wa ikaga nasaimasu ka?", "Che misura?", "Shōto / Tōru / Gurande (come da Starbucks)"]
        ]},
        { tipo: "dire", frasi: [
          ["普通でお願いします", "futsū de onegaishimasu", "Normale, per favore"],
          ["硬めでお願いします", "katame de onegaishimasu", "Al dente, per favore"],
          ["替玉お願いします", "kaedama onegaishimasu", "Un altro giro di noodle"],
          ["このボタンは何ですか？", "kono botan wa nan desu ka?", "Cos'è questo tasto?"],
          ["ここで食べます", "koko de tabemasu", "Mangiamo qui"],
          ["持ち帰りで", "mochikaeri de", "Da portare via"]
        ]},
        { tipo: "nota", righe: [
          "Fare rumore mangiando i noodle è normale. Se c'è la fila, finito il piatto ci si alza subito.",
          "AFURI Nakameguro accetta solo pagamenti cashless, anche alla macchinetta."
        ]}
      ]
    },

    // ------------------------------------------------------------------ IZAKAYA
    {
      id: "izakaya", emoji: "🏮", titolo: "Izakaya",
      desc: "Otōshi, bevande illimitate, yakitori, ultimo ordine.",
      intro: "All'izakaya si ordina poco alla volta, prima le bevande. Arriva subito un piccolo antipasto non ordinato (otōshi): si paga a testa (300-600 ¥) e non si rifiuta. Nel conto lo troverete: non è un errore.",
      sezioni: [
        { tipo: "sentirai", frasi: [
          ["お通しです", "**o-tōshi** desu", "Ecco l'antipasto della casa"],
          ["とりあえずお飲み物お伺いします", "**toriaezu** o-nomimono o-ukagai shimasu", "Intanto vi prendo da bere"],
          ["飲み放題はいかがですか？", "**nomihōdai** wa ikaga desu ka?", "Volete l'opzione bevande illimitate?", "Iie, daijōbu desu", "Prezzo fisso a testa per 90-120 minuti."],
          ["二時間制となっております", "**niji-kan-sei** to natte orimasu", "Il tavolo è per due ore"],
          ["生でよろしいですか？", "**nama** de yoroshii desu ka?", "Birra alla spina, va bene?"],
          ["塩とタレ、どちらになさいますか？", "**shio** to **tare**, dochira ni nasaimasu ka?", "Yakitori: sale o salsa?", "Shio de / Tare de / O-makase de (decida lei)"],
          ["冷やと熱燗、どちらにしますか？", "**hiya** to **atsukan**, dochira ni shimasu ka?", "Sakè freddo o caldo?"],
          ["チャージ料金がかかります", "**chāji** ryōkin ga kakarimasu", "C'è un costo di coperto"],
          ["ラストオーダーです", "**rasuto ōdā** desu", "Ultimo ordine"],
          ["お席のお時間です", "o-seki no **o-jikan** desu", "Il tempo del tavolo è finito"]
        ]},
        { tipo: "dire", frasi: [
          ["とりあえず生二つ！", "toriaezu nama futatsu!", "Intanto due birre alla spina!"],
          ["乾杯！", "kanpai!", "Cin cin!"],
          ["ハイボールをください", "haibōru o kudasai", "Un highball (whisky e soda)"],
          ["おすすめの日本酒はありますか？", "osusume no nihonshu wa arimasu ka?", "Ci consiglia un sakè?"],
          ["同じものをもう一つ", "onaji mono o mō hitotsu", "Un altro uguale"],
          ["ウーロン茶をください", "ūroncha o kudasai", "Un tè oolong (analcolico)"],
          ["おまかせで", "o-makase de", "Decida lei"]
        ]},
        { tipo: "dialogo", righe: [
          ["S", "いらっしゃいませ！何名様ですか？", "irasshaimase! nanmei-sama desu ka?", "Benvenuti! Quanti siete?"],
          ["N", "二人です。", "futari desu.", "Due."],
          ["S", "お通しです。とりあえずお飲み物お伺いします。", "o-tōshi desu. toriaezu o-nomimono o-ukagai shimasu.", "L'antipasto della casa. Intanto, da bere?"],
          ["N", "生二つください。", "nama futatsu kudasai.", "Due birre alla spina."],
          ["S", "生二つですね、かしこまりました！", "nama futatsu desu ne, kashikomarimashita!", "Due spine, subito!"],
          ["S", "焼き鳥は塩とタレ、どちらになさいますか？", "yakitori wa shio to tare, dochira ni nasaimasu ka?", "Gli yakitori, sale o salsa?"],
          ["N", "おまかせで。", "o-makase de.", "Decida lei."],
          ["S", "そろそろラストオーダーですが…", "sorosoro rasuto ōdā desu ga…", "Tra poco c'è l'ultimo ordine…"],
          ["N", "大丈夫です。お会計お願いします。", "daijōbu desu. o-kaikei onegaishimasu.", "Siamo a posto. Il conto, per favore."]
        ]}
      ]
    },

    // ------------------------------------------------------------------ MERCATI
    {
      id: "mercati", emoji: "🦀", titolo: "Mercati e street food",
      desc: "Omicho, Nishiki, Kuromon, Tsukiji, Ameyoko.",
      intro: "Nei mercati vi chiameranno ad alta voce e vi offriranno assaggi. Regola importante: non si mangia camminando. Si mangia in piedi davanti al banco e si restituiscono lì stecchi e piattini.",
      sezioni: [
        { tipo: "sentirai", frasi: [
          ["いらっしゃい！どうぞ見てってください", "**irasshai**! dōzo mitette kudasai", "Venite! Guardate pure!"],
          ["試食どうぞ", "**shishoku** dōzo", "Prego, assaggio gratis"],
          ["ここで食べていきますか？", "**koko de** tabete ikimasu ka?", "Lo mangiate qui?", "Hai / Mochikaeri desu (da portare via)"],
          ["焼きましょうか？", "**yaki**mashō ka?", "Ve lo griglio?", "Hai, onegaishimasu"],
          ["一本五百円です", "**ippon** gohyaku en desu", "500 yen a spiedino"],
          ["一個三百円です", "**ikko** sanbyaku en desu", "300 yen al pezzo"],
          ["現金のみです", "**genkin nomi** desu", "Solo contanti"],
          ["食べ歩きはご遠慮ください", "**tabearuki** wa go-enryo kudasai", "Per favore, non mangiate camminando", "", "«Go-enryo kudasai» = astenetevi: è un divieto."],
          ["あちらのスペースでお召し上がりください", "**achira** no supēsu de o-meshiagari kudasai", "Mangiatelo in quello spazio là"],
          ["おまけです", "**o-make** desu", "Omaggio!"]
        ]},
        { tipo: "dire", frasi: [
          ["これ一つください", "kore hitotsu kudasai", "Uno di questi"],
          ["これはいくらですか？", "kore wa ikura desu ka?", "Quanto costa questo?"],
          ["ここで食べてもいいですか？", "koko de tabete mo ii desu ka?", "Possiamo mangiarlo qui?"],
          ["焼いてください", "yaite kudasai", "Me lo griglia?"],
          ["二人で分けます", "futari de wakemasu", "Lo dividiamo in due"],
          ["お箸を二つください", "o-hashi o futatsu kudasai", "Due paia di bacchette"]
        ]}
      ]
    },

    // ------------------------------------------------------------------ TRENI
    {
      id: "treni", emoji: "🚇", titolo: "Metro, treni locali e Suica",
      desc: "Annunci, cambi, tornelli, uscite.",
      intro: "Nelle grandi città gli annunci sono anche in inglese. Sui treni locali (Fujikyu, Eizan, Randen, Enoden) spesso no. Imparate a cogliere «mamonaku» (tra poco), «tsugi wa» (prossima) e il nome della vostra fermata.",
      sezioni: [
        { tipo: "sentirai", titolo: "🦻 Annunci in treno e in banchina", frasi: [
          ["まもなく、新宿です", "**mamonaku**, Shinjuku desu", "Tra poco, Shinjuku"],
          ["次は飯田橋です", "**tsugi wa** Iidabashi desu", "Prossima fermata: Iidabashi"],
          ["お出口は右側です", "o-deguchi wa **migi**-gawa desu", "Si scende dal lato destro", "", "Sinistro = hidari."],
          ["大江戸線はお乗り換えです", "Ōedo-sen wa **o-norikae** desu", "Cambio per la linea Oedo"],
          ["ドアが閉まります。ご注意ください", "doa ga **shimarimasu**. go-chūi kudasai", "Le porte si chiudono, attenzione"],
          ["駆け込み乗車はおやめください", "**kakekomi** jōsha wa o-yame kudasai", "Non correte per salire"],
          ["三番線に電車がまいります", "san-bansen ni densha ga **mairimasu**", "Sul binario 3 arriva un treno"],
          ["黄色い線の内側までお下がりください", "kiiroi sen no uchigawa made **o-sagari** kudasai", "State dietro la linea gialla"],
          ["この電車は各駅停車、高尾行きです", "kono densha wa **kakueki teisha**, Takao-**yuki** desu", "Questo treno ferma ovunque, direzione Takao", "", "Kaisoku = rapido, tokkyū = espresso: saltano fermate."],
          ["終点です。お忘れ物のないようご注意ください", "**shūten** desu. o-wasuremono no nai yō go-chūi kudasai", "Capolinea. Non dimenticate nulla"],
          ["ただいま十分ほど遅れております", "tadaima juppun hodo **okurete** orimasu", "Siamo in ritardo di circa 10 minuti"],
          ["運転を見合わせております", "unten o **miawasete** orimasu", "Il servizio è sospeso", "", "Problema serio: cercate un'altra linea o un taxi."],
          ["人身事故の影響で", "**jinshin jiko** no eikyō de", "A causa di un incidente sulla linea", "", "Di solito vuol dire un'ora o più di blocco."]
        ]},
        { tipo: "sentirai", titolo: "🦻 Ai tornelli", frasi: [
          ["残高が不足しています", "**zandaka** ga fusoku shite imasu", "Credito insufficiente", "", "Il tornello si chiude: andate alla macchinetta 精算機 (seisanki) prima dei tornelli."],
          ["精算機で精算してください", "**seisanki** de seisan shite kudasai", "Pagate la differenza alla macchinetta"],
          ["もう一度タッチしてください", "mō ichido **tatchi** shite kudasai", "Appoggiate di nuovo la carta"]
        ]},
        { tipo: "dire", frasi: [
          ["この電車は新宿に止まりますか？", "kono densha wa Shinjuku ni tomarimasu ka?", "Questo treno ferma a Shinjuku?"],
          ["渋谷は何番線ですか？", "Shibuya wa nan-bansen desu ka?", "Da che binario per Shibuya?"],
          ["浅草に行きたいです", "Asakusa ni ikitai desu", "Vorrei andare ad Asakusa"],
          ["乗り換えはどこですか？", "norikae wa doko desu ka?", "Dov'è il cambio?"],
          ["東口はどこですか？", "higashi-guchi wa doko desu ka?", "Dov'è l'uscita est?"],
          ["Suicaが使えません", "Suica ga tsukaemasen", "La Suica non funziona", "", "Allo sportello col personale accanto ai tornelli."]
        ]},
        { tipo: "kanji", titolo: "🔤 In stazione", items: [
          ["出口", "deguchi", "uscita"], ["入口", "iriguchi", "entrata"], ["改札", "kaisatsu", "tornelli"], ["乗換", "norikae", "cambio"],
          ["東口", "higashi-guchi", "uscita est"], ["西口", "nishi-guchi", "uscita ovest"], ["南口", "minami-guchi", "uscita sud"], ["北口", "kita-guchi", "uscita nord"],
          ["番線", "bansen", "binario"], ["行", "yuki", "direzione"], ["各駅停車", "kakueki teisha", "ferma ovunque"], ["快速", "kaisoku", "rapido"],
          ["特急", "tokkyū", "espresso (supplemento)"], ["精算", "seisan", "conguaglio"], ["女性専用車", "josei sen'yō-sha", "carrozza solo donne"]
        ]},
        { tipo: "nota", righe: [
          "**Carrozza solo donne** (女性専用車, segnata in rosa sulla banchina) nelle ore di punta: Raffaele, occhio.",
          "Scale mobili: a Tokyo si sta a **sinistra**, a Osaka a **destra**. In treno non si telefona."
        ]}
      ]
    },

    // ------------------------------------------------------------------ SHINKANSEN
    {
      id: "shinkansen", emoji: "🚄", titolo: "Shinkansen e treni a lunga percorrenza",
      desc: "Posti riservati, cambi, annunci di bordo.",
      intro: "Shinkansen, Fuji Excursion, Thunderbird, Aoniyoshi: annunci lunghi e formali, ma le informazioni utili sono poche (nome del treno, destinazione, carrozze, cambio). Il posto (es. 5号車 7番E) è stampato sul biglietto. Sulla banchina il numero di carrozza è scritto a terra: mettetevi in fila lì.",
      sezioni: [
        { tipo: "sentirai", frasi: [
          ["本日も新幹線をご利用いただきまして、ありがとうございます", "honjitsu mo shinkansen o go-riyō itadakimashite, arigatō gozaimasu", "Grazie per aver scelto lo Shinkansen", "", "Apertura di rito: le informazioni arrivano subito dopo."],
          ["この電車は、のぞみ号、東京行きです", "kono densha wa, **Nozomi-gō**, Tōkyō-**yuki** desu", "Questo è il Nozomi per Tokyo"],
          ["途中の停車駅は、京都、名古屋、品川です", "tochū no **teisha-eki** wa, Kyōto, Nagoya, Shinagawa desu", "Le fermate intermedie sono Kyoto, Nagoya, Shinagawa"],
          ["全席指定席です", "**zenseki shitei-seki** desu", "Tutti i posti sono riservati"],
          ["自由席は1号車から3号車です", "**jiyū-seki** wa ichi-gōsha kara san-gōsha desu", "I posti non riservati sono nelle carrozze 1-3"],
          ["サンダーバードにお乗り換えのお客様は、乗り換え改札へお進みください", "**Sandābādo** ni o-norikae no o-kyaku-sama wa, **norikae kaisatsu** e o-susumi kudasai", "Chi cambia per il Thunderbird vada ai tornelli di interscambio", "", "A Tsuruga, il 26/11."],
          ["切符を拝見いたします", "kippu o **haiken** itashimasu", "Controllo dei biglietti", "", "Raro sullo Shinkansen, comune sui treni turistici."],
          ["窓側と通路側、どちらがよろしいですか？", "**madogawa** to **tsūrogawa**, dochira ga yoroshii desu ka?", "Finestrino o corridoio?", "Madogawa de onegaishimasu"],
          ["隣同士のお席はご用意できません", "**tonaridōshi** no o-seki wa go-yōi dekimasen", "Non ci sono due posti vicini"],
          ["すみません、そこ私の席なんですが", "sumimasen, soko **watashi no seki** nan desu ga", "Scusi, quello è il mio posto", "", "Ricontrollate carrozza e numero sul biglietto."],
          ["まもなく終点、東京です", "mamonaku **shūten**, Tōkyō desu", "Tra poco il capolinea, Tokyo"]
        ]},
        { tipo: "dire", frasi: [
          ["シートを倒してもいいですか？", "shīto o taoshite mo ii desu ka?", "Posso reclinare il sedile?", "", "Si chiede a chi sta dietro: gesto molto apprezzato."],
          ["そこは私たちの席だと思います", "soko wa watashitachi no seki da to omoimasu", "Credo che quelli siano i nostri posti", "", "Mostrando il biglietto."],
          ["隣の席で二人お願いします", "tonari no seki de futari onegaishimasu", "Due posti vicini, per favore"],
          ["富士山はどちら側ですか？", "Fuji-san wa dochira-gawa desu ka?", "Da che lato si vede il Fuji?"],
          ["この切符でこの電車に乗れますか？", "kono kippu de kono densha ni noremasu ka?", "Con questo biglietto posso salire su questo treno?"],
          ["駅弁を二つください", "ekiben o futatsu kudasai", "Due ekiben, per favore", "", "Compratelo prima di salire: su molti Shinkansen il carrello non passa più."]
        ]},
        { tipo: "kanji", titolo: "🔤 Sul biglietto", items: [
          ["号車", "gōsha", "carrozza"], ["番", "ban", "posto"], ["指定席", "shitei-seki", "posto riservato"], ["自由席", "jiyū-seki", "posto libero"],
          ["発", "hatsu", "partenza"], ["着", "chaku", "arrivo"], ["窓側", "madogawa", "finestrino"], ["通路側", "tsūrogawa", "corridoio"]
        ]}
      ]
    },

    // ------------------------------------------------------------------ BUS E TAXI
    {
      id: "bus-taxi", emoji: "🚕", titolo: "Bus e taxi",
      desc: "Bus di Kyoto e Kanazawa, taxi con sportello automatico.",
      intro: "**Bus:** a Kyoto si sale dietro e si paga davanti scendendo, toccando la Suica. Per prenotare la fermata si preme il pulsante. **Taxi:** lo sportello posteriore sinistro si apre e chiude da solo, non toccatelo. Mostrate l'indirizzo dal cartellino.",
      sezioni: [
        { tipo: "sentirai", titolo: "🦻 In autobus", frasi: [
          ["次は銀閣寺道です", "**tsugi wa** Ginkakuji-michi desu", "Prossima fermata: Ginkakuji-michi"],
          ["お降りの方はお近くのボタンでお知らせください", "**o-ori** no kata wa o-chikaku no **botan** de o-shirase kudasai", "Chi scende prema il pulsante più vicino"],
          ["次、止まります", "tsugi, **tomarimasu**", "Prossima fermata prenotata"],
          ["ICカードは乗る時と降りる時にタッチしてください", "IC kādo wa **noru toki** to **oriru toki** ni tatchi shite kudasai", "Toccate la carta salendo e scendendo"],
          ["運賃は降りる時にお支払いください", "unchin wa **oriru toki** ni o-shiharai kudasai", "Si paga scendendo"],
          ["バスが完全に止まってから席をお立ちください", "basu ga kanzen ni **tomatte kara** seki o o-tachi kudasai", "Alzatevi solo a bus fermo"],
          ["発車します、ご注意ください", "**hassha** shimasu, go-chūi kudasai", "Partiamo, attenzione"]
        ]},
        { tipo: "sentirai", titolo: "🦻 In taxi", frasi: [
          ["どちらまで行かれますか？", "**dochira made** ikaremasu ka?", "Dove andiamo?", "Mostrate il cartellino: «kono jūsho made onegaishimasu»"],
          ["シートベルトをお締めください", "**shītoberuto** o o-shime kudasai", "Allacciate la cintura"],
          ["高速道路を使ってもよろしいですか？", "**kōsoku** dōro o tsukatte mo yoroshii desu ka?", "Prendiamo l'autostrada (pedaggio extra)?", "Hai / Iie, shita no michi de (strade normali)"],
          ["この辺りでよろしいですか？", "kono **atari** de yoroshii desu ka?", "Va bene qui?", "Hai, koko de ii desu"],
          ["千八百円です。お支払いは？", "sen-happyaku en desu. **o-shiharai** wa?", "Sono 1.800 yen. Come paga?", "Kādo de onegaishimasu"],
          ["ドア開きます", "doa **akimasu**", "Si apre lo sportello"]
        ]},
        { tipo: "dire", frasi: [
          ["このバスは銀閣寺に行きますか？", "kono basu wa Ginkakuji ni ikimasu ka?", "Questo bus va al Ginkaku-ji?"],
          ["この住所までお願いします", "kono jūsho made onegaishimasu", "A questo indirizzo, per favore"],
          ["ここでいいです", "koko de ii desu", "Qui va bene (si fermi qui)"],
          ["カードでお願いします", "kādo de onegaishimasu", "Con la carta"],
          ["トランクを開けてください", "toranku o akete kudasai", "Mi apre il bagagliaio?"],
          ["領収書をください", "ryōshūsho o kudasai", "La ricevuta, per favore"]
        ]},
        { tipo: "kanji", titolo: "🔤 Sul taxi e sul bus", items: [
          ["空車", "kūsha", "taxi libero"], ["賃走", "chinsō", "occupato"], ["迎車", "geisha", "in arrivo su chiamata"], ["回送", "kaisō", "fuori servizio"],
          ["整理券", "seiriken", "biglietto numerato (se non usate la Suica)"], ["運賃", "unchin", "tariffa"], ["のりば", "noriba", "fermata / imbarco"]
        ]},
        { tipo: "cartellini", ids: ["taxi-0", "taxi-1", "taxi-2", "taxi-3", "taxi-4"] }
      ]
    },

    // ------------------------------------------------------------------ HOTEL
    {
      id: "hotel", emoji: "🏨", titolo: "Hotel",
      desc: "Check-in, deposito bagagli, colazione, valigie spedite.",
      intro: "In hotel di solito parlano inglese, ma le frasi della reception sono sempre le stesse. Al check-in è obbligatorio mostrare il passaporto.",
      sezioni: [
        { tipo: "sentirai", frasi: [
          ["チェックインですか？", "**chekku-in** desu ka?", "Check-in?", "Hai, Supataro desu"],
          ["パスポートをお願いします", "**pasupōto** o onegaishimasu", "I passaporti, per favore"],
          ["こちらにご記入ください", "kochira ni **go-kinyū** kudasai", "Compilate qui"],
          ["チェックインは三時からです", "chekku-in wa **san-ji kara** desu", "Il check-in è dalle 15"],
          ["お荷物をお預かりしましょうか？", "o-nimotsu o **o-azukari** shimashō ka?", "Vi teniamo i bagagli?", "Hai, onegaishimasu"],
          ["お部屋は十一階の1105号室です", "o-heya wa **jūikkai** no sen-hyaku-go **gōshitsu** desu", "La camera è la 1105, all'11° piano", "", "-kai = piano, -gōshitsu = numero di camera."],
          ["朝食は六時半から十時までです", "**chōshoku** wa roku-ji han kara jū-ji made desu", "La colazione è dalle 6:30 alle 10"],
          ["お部屋の準備ができております", "o-heya no **junbi** ga dekite orimasu", "La camera è pronta"],
          ["お荷物が届いております", "o-nimotsu ga **todoite** orimasu", "I vostri bagagli sono arrivati", "", "Le valigie spedite col takkyubin."],
          ["宿泊税を別途いただきます", "**shukuhaku-zei** o betto itadakimasu", "La tassa di soggiorno si paga a parte"],
          ["チェックアウトは十一時です", "**chekku-auto** wa jūichi-ji desu", "Il check-out è alle 11"]
        ]},
        { tipo: "dire", frasi: [
          ["チェックインをお願いします。スパタロです", "chekku-in o onegaishimasu. Supataro desu", "Check-in, per favore. Spataro"],
          ["早くチェックインできますか？", "hayaku chekku-in dekimasu ka?", "Possiamo fare il check-in prima?"],
          ["Wi-Fiのパスワードは何ですか？", "waifai no pasuwādo wa nan desu ka?", "Qual è la password del Wi-Fi?"],
          ["タクシーを呼んでもらえますか？", "takushī o yonde moraemasu ka?", "Ci chiamate un taxi?"],
          ["この辺におすすめの居酒屋はありますか？", "kono hen ni osusume no izakaya wa arimasu ka?", "C'è un izakaya che ci consigliate qui vicino?"],
          ["チェックアウトをお願いします", "chekku-auto o onegaishimasu", "Il check-out, per favore"]
        ]},
        { tipo: "sentirai", titolo: "🦻 Deposito bagagli: cosa vi risponderanno", frasi: [
          ["はい、お預かりできます", "hai, **o-azukari dekimasu**", "Sì, possiamo tenerli"],
          ["何時ごろお戻りですか？", "nan-ji goro **o-modori** desu ka?", "A che ora tornate più o meno?", "Yo-ji goro desu (verso le 4)"],
          ["こちら、お預かり証です", "kochira, **o-azukari-shō** desu", "Ecco il tagliando del deposito", "", "Tenetelo: serve per ritirare i bagagli."],
          ["貴重品はお持ちください", "**kichōhin** wa o-mochi kudasai", "Tenete con voi gli oggetti di valore"],
          ["当日のみお預かりできます", "**tōjitsu nomi** o-azukari dekimasu", "Possiamo tenerli solo in giornata"],
          ["チェックインの日までお預かりします", "chekku-in no hi **made** o-azukari shimasu", "Li teniamo fino al giorno del check-in", "", "La risposta che sperate dal KABIN per le valigie spedite il 23/11."],
          ["申し訳ございません、事前のお預かりはできかねます", "mōshiwake gozaimasen, **jizen** no o-azukari wa **dekikanemasu**", "Spiacenti, non possiamo tenerli prima", "", "«…kanemasu» è un no cortese."],
          ["お荷物が届いております", "o-nimotsu ga **todoite** orimasu", "I vostri bagagli sono arrivati"]
        ]},
        { tipo: "dire", titolo: "🗣️ Deposito bagagli: cosa dire", frasi: [
          ["チェックインの前に荷物を預かってもらえますか？", "chekku-in no **mae** ni nimotsu o azukatte moraemasu ka?", "Potete tenerci i bagagli prima del check-in?"],
          ["チェックアウトの後、荷物を預かってもらえますか？", "chekku-auto no **ato**, nimotsu o azukatte moraemasu ka?", "Dopo il check-out potete tenerci i bagagli?"],
          ["何時まで預かってもらえますか？", "nan-ji made azukatte moraemasu ka?", "Fino a che ora potete tenerli?"],
          ["夕方に取りに来ます", "yūgata ni tori ni kimasu", "Torniamo a prenderli nel tardo pomeriggio", "", "Alle 4 = yo-ji ni; domattina = ashita no asa."],
          ["荷物を取りに来ました。これが預かり証です", "nimotsu o tori ni kimashita. kore ga azukari-shō desu", "Siamo venuti a ritirare i bagagli. Ecco il tagliando"],
          ["チェックインの前に、宅急便で荷物を送ってもいいですか？", "chekku-in no mae ni, takkyūbin de nimotsu o okutte mo ii desu ka?", "Possiamo spedirvi le valigie col takkyubin prima del check-in?"],
          ["宅急便で荷物が届いていますか？", "takkyūbin de nimotsu ga todoite imasu ka?", "Sono arrivate le valigie spedite?"],
          ["コインロッカーはどこですか？", "koin rokkā wa doko desu ka?", "Dove sono gli armadietti a moneta?", "", "In stazione: utili se l'hotel è fuori strada."]
        ]},
        { tipo: "cartellini", ids: ["nozze"] }
      ]
    },

    // ------------------------------------------------------------------ TAKKYUBIN
    {
      id: "takkyubin", emoji: "🧳", titolo: "Spedire le valigie (takkyubin)",
      desc: "23/11 Tokyo → Kyoto, 3/12 Kyoto → Tokyo.",
      intro: "Due spedizioni: **23/11** dall'Edmont al KABIN Kyoto, **3/12** dal KABIN allo Shiba Park Hotel. La reception compila quasi tutto. A voi tocca capire cinque domande: destinazione, data, numero di colli, contenuto vietato, pagamento.",
      sezioni: [
        { tipo: "sentirai", frasi: [
          ["宅急便ですね。こちらの伝票にご記入ください", "takkyūbin desu ne. kochira no **denpyō** ni go-kinyū kudasai", "Spedizione: compilate questa bolla"],
          ["お届け先はどちらですか？", "**o-todoke-saki** wa dochira desu ka?", "Dove la consegniamo?", "Mostrate il cartellino"],
          ["お届け日のご希望はございますか？", "o-todoke-bi no **go-kibō** wa gozaimasu ka?", "Avete un giorno di consegna preferito?", "Nijūgo-nichi de onegaishimasu"],
          ["お時間帯のご指定は？", "o-**jikantai** no go-shitei wa?", "Fascia oraria?", "Gozen-chū (mattina) / Shitei nashi (indifferente)"],
          ["お荷物はおいくつですか？", "o-nimotsu wa **o-ikutsu** desu ka?", "Quanti colli?", "Futatsu desu"],
          ["中に割れ物は入っていますか？", "naka ni **waremono** wa haitte imasu ka?", "C'è qualcosa di fragile dentro?", "Iie"],
          ["スプレー缶やモバイルバッテリーは入っていませんか？", "**supurē-kan** ya **mobairu batterī** wa haitte imasen ka?", "Non ci sono bombolette spray o power bank?", "Hai, haitte imasen", "Domanda negativa: «hai» conferma che NON ci sono. Power bank nello zaino!"],
          ["元払いでよろしいですか？", "**motobarai** de yoroshii desu ka?", "Pagate adesso, va bene?", "Hai", "Chakubarai = paga il destinatario."],
          ["お届け先のお電話番号をお願いします", "o-todoke-saki no **o-denwa bangō** o onegaishimasu", "Il numero di telefono del destinatario"],
          ["一個二千円になります", "**ikko** nisen en ni narimasu", "2.000 yen a collo"],
          ["こちらがお控えです", "kochira ga **o-hikae** desu", "Questa è la vostra ricevuta", "", "Tenetela: c'è il numero di tracking."]
        ]},
        { tipo: "sentirai", titolo: "🦻 Quando chiedete come spedire", frasi: [
          ["フロントで承ります", "**furonto** de uketamawarimasu", "Ci pensiamo noi alla reception"],
          ["コンビニからも送れます", "**konbini** kara mo okuremasu", "Si può spedire anche dal konbini"],
          ["十五時までにお出しいただければ、明日届きます", "jūgo-ji **made ni** o-dashi itadakereba, **ashita** todokimasu", "Se lo consegnate entro le 15, arriva domani"],
          ["明後日の到着になります", "**asatte** no tōchaku ni narimasu", "Arriva dopodomani", "", "Ashita = domani, asatte = dopodomani."],
          ["本日の集荷は終わりました", "honjitsu no **shūka** wa owarimashita", "Il ritiro di oggi è già passato", "", "Partirà domani: arriverà un giorno dopo."]
        ]},
        { tipo: "dire", frasi: [
          ["ここから荷物を送れますか？", "koko kara nimotsu o okuremasu ka?", "Si possono spedire bagagli da qui?"],
          ["京都のホテルに送りたいんですが、どうすればいいですか？", "Kyōto no hoteru ni okuritai n desu ga, dō sureba ii desu ka?", "Vorremmo spedire all'hotel di Kyoto: come dobbiamo fare?"],
          ["いつ届きますか？", "itsu todokimasu ka?", "Quando arriva?"],
          ["何時までに出せばいいですか？", "nan-ji made ni daseba ii desu ka?", "Entro che ora dobbiamo consegnarlo?"],
          ["いくらぐらいですか？", "ikura gurai desu ka?", "Più o meno quanto costa?"],
          ["このスーツケースをこのホテルに送りたいです", "kono sūtsukēsu o kono hoteru ni okuritai desu", "Vorrei spedire questa valigia a questo hotel"],
          ["二つです", "futatsu desu", "Sono due"],
          ["二十五日に届けてください", "nijūgo-nichi ni todokete kudasai", "Consegna il 25, per favore"],
          ["割れ物はありません", "waremono wa arimasen", "Niente di fragile"],
          ["元払いでお願いします", "motobarai de onegaishimasu", "Pago adesso"]
        ]},
        { tipo: "cartellini", ids: ["takkyu-kyoto", "takkyu-tokyo"] }
      ]
    },

    // ------------------------------------------------------------------ BIGLIETTI
    {
      id: "biglietti", emoji: "⛩️", titolo: "Templi, musei e osservatori",
      desc: "Biglietti, scarpe, foto vietate, goshuin.",
      intro: "Il copione è corto: numero di biglietti, prezzo, regole. Le regole sono quelle da capire al volo: togliersi le scarpe, niente foto, non fermarsi nei percorsi a senso unico.",
      sezioni: [
        { tipo: "sentirai", frasi: [
          ["大人二枚ですね", "**otona nimai** desu ne", "Due adulti, giusto?", "Hai", "-mai è il contatore dei biglietti."],
          ["拝観料は五百円です", "**haikanryō** wa gohyaku en desu", "L'ingresso è 500 yen"],
          ["靴を脱いでください", "**kutsu** o nuide kudasai", "Toglietevi le scarpe", "", "Himeji, templi, alcune case storiche."],
          ["靴はこちらの袋にお入れください", "kutsu wa kochira no **fukuro** ni o-ire kudasai", "Mettete le scarpe in questa busta"],
          ["撮影禁止です", "**satsuei kinshi** desu", "Vietato fotografare"],
          ["写真はご遠慮ください", "**shashin** wa go-enryo kudasai", "Niente foto, per favore"],
          ["立ち止まらないでください", "**tachidomaranaide** kudasai", "Non fermatevi", "", "Nei percorsi illuminati a senso unico: Eikando, Rikugien."],
          ["最終入場は四時半です", "**saishū nyūjō** wa yo-ji han desu", "Ultimo ingresso alle 16:30"],
          ["本日の受付は終了しました", "honjitsu no uketsuke wa **shūryō** shimashita", "Per oggi gli ingressi sono chiusi"],
          ["QRコードをご提示ください", "**QR kōdo** o go-teiji kudasai", "Mostrate il QR code"],
          ["大きいお荷物はロッカーへお預けください", "ōkii o-nimotsu wa **rokkā** e o-azuke kudasai", "Lasciate le borse grandi negli armadietti", "", "Shibuya Sky: sulla terrazza non si porta niente in mano."],
          ["最後尾はこちらです", "**saibi** wa kochira desu", "La fine della coda è qui"],
          ["御朱印は書き置きのみです", "**go-shuin** wa **kakioki** nomi desu", "Il goshuin è solo su foglio già pronto", "", "Non lo scrivono sul vostro libretto: vi danno un foglio da incollare."]
        ]},
        { tipo: "dire", frasi: [
          ["大人二人お願いします", "otona futari onegaishimasu", "Due adulti, per favore"],
          ["写真を撮ってもいいですか？", "shashin o totte mo ii desu ka?", "Si possono fare foto?"],
          ["御朱印をお願いします", "go-shuin o onegaishimasu", "Il goshuin, per favore"],
          ["入口はどこですか？", "iriguchi wa doko desu ka?", "Dov'è l'ingresso?"],
          ["何時までですか？", "nan-ji made desu ka?", "Fino a che ora è aperto?"],
          ["ロッカーはどこですか？", "rokkā wa doko desu ka?", "Dove sono gli armadietti?"]
        ]},
        { tipo: "kanji", titolo: "🔤 All'ingresso", items: [
          ["拝観", "haikan", "visita (tempio)"], ["受付", "uketsuke", "biglietteria"], ["大人", "otona", "adulti"], ["順路", "junro", "percorso →"],
          ["最後尾", "saibi", "fine della coda"], ["本日休館", "honjitsu kyūkan", "chiuso oggi"], ["御朱印", "go-shuin", "timbro del tempio"], ["縁結び", "enmusubi", "amuleto per la coppia"]
        ]},
        { tipo: "nota", righe: [
          "**Goshuin:** timbro calligrafico del tempio (300-500 ¥) su un libretto, il goshuinchō: un bel ricordo del viaggio di nozze.",
          "**Al santuario shintoista:** due inchini, due battiti di mani, un inchino. **Omamori 縁結び (enmusubi):** l'amuleto per la coppia."
        ]}
      ]
    },

    // ------------------------------------------------------------------ ONSEN
    {
      id: "onsen", emoji: "♨️", titolo: "Onsen e sento",
      desc: "Regole del bagno, asciugamani, bagno privato per coppie.",
      intro: "Bagni separati per uomini e donne: concordate prima un orario per ritrovarvi fuori. Se volete fare il bagno insieme, chiedete il **kashikiri-buro**, il bagno privato a tempo.",
      sezioni: [
        { tipo: "sentirai", frasi: [
          ["タオルはお持ちですか？", "**taoru** wa o-mochi desu ka?", "Avete l'asciugamano?", "Iie, kashite kudasai (ce lo presta?)"],
          ["靴はこちらの下駄箱へ", "kutsu wa kochira no **getabako** e", "Le scarpe in questo armadietto"],
          ["男湯は右、女湯は左です", "**otoko-yu** wa migi, **onna-yu** wa hidari desu", "Uomini a destra, donne a sinistra"],
          ["入れ墨のある方はご遠慮ください", "**irezumi** no aru kata wa go-enryo kudasai", "Chi ha tatuaggi non può entrare"],
          ["体を洗ってから入ってください", "karada o **aratte kara** haitte kudasai", "Lavatevi prima di entrare in vasca"],
          ["タオルを湯船に入れないでください", "taoru o **yubune** ni irenaide kudasai", "Non mettete l'asciugamano in vasca"],
          ["貸切風呂は四十分です", "**kashikiri-buro** wa yonjuppun desu", "Il bagno privato è per 40 minuti"]
        ]},
        { tipo: "dire", frasi: [
          ["大人二人お願いします", "otona futari onegaishimasu", "Due adulti"],
          ["タオルを貸してください", "taoru o kashite kudasai", "Ci prestate gli asciugamani?"],
          ["貸切風呂はありますか？", "kashikiri-buro wa arimasu ka?", "C'è un bagno privato?"],
          ["小さいタトゥーがありますが、大丈夫ですか？", "chiisai tatū ga arimasu ga, daijōbu desu ka?", "Ho un piccolo tatuaggio, va bene?"]
        ]},
        { tipo: "kanji", titolo: "🔤 Sulle tende", items: [
          ["ゆ / 湯", "yu", "bagno caldo"], ["男", "otoko", "uomini (tenda spesso blu)"], ["女", "onna", "donne (tenda spesso rossa)"],
          ["貸切", "kashikiri", "privato"], ["露天風呂", "rotenburo", "vasca all'aperto"], ["脱衣所", "datsuijo", "spogliatoio"]
        ]},
        { tipo: "nota", righe: [
          "In vasca si entra nudi, dopo essersi lavati seduti agli sgabelli. L'asciugamano piccolo si tiene in testa, mai in acqua.",
          "I colori delle tende cambiano: fidatevi del kanji 男 / 女, non del colore."
        ]}
      ]
    },

    // ------------------------------------------------------------------ IMPREVISTI
    {
      id: "imprevisti", emoji: "🆘", titolo: "Imprevisti",
      desc: "Persi, farmacia, oggetti dimenticati, emergenze.",
      intro: "**Numeri:** 110 polizia, 119 ambulanza e pompieri. **Japan Visitor Hotline** (24h, in inglese): 050-3816-2787. Il **kōban** (交番), posto di polizia di quartiere, aiuta anche con le indicazioni. Gli oggetti dimenticati in treno si ritrovano quasi sempre: chiedete all'ufficio della stazione.",
      sezioni: [
        { tipo: "sentirai", frasi: [
          ["どうしましたか？", "**dō shimashita** ka?", "Cos'è successo?"],
          ["どこが痛いですか？", "doko ga **itai** desu ka?", "Dove le fa male?"],
          ["熱はありますか？", "**netsu** wa arimasu ka?", "Ha la febbre?"],
          ["一日三回、食後に飲んでください", "ichinichi **sankai**, **shokugo** ni nonde kudasai", "Tre volte al giorno, dopo i pasti"],
          ["何をなくしましたか？", "nani o **nakushimashita** ka?", "Cosa ha perso?"],
          ["どこでなくしましたか？", "**doko de** nakushimashita ka?", "Dove l'ha perso?"],
          ["まっすぐ行って、右です", "**massugu** itte, **migi** desu", "Dritto e poi a destra", "", "Hidari = sinistra, kado = angolo, shingō = semaforo."],
          ["地震です。落ち着いて行動してください", "**jishin** desu. ochitsuite kōdō shite kudasai", "Terremoto. Mantenete la calma"],
          ["避難してください", "**hinan** shite kudasai", "Evacuate"]
        ]},
        { tipo: "dire", frasi: [
          ["道に迷いました", "michi ni mayoimashita", "Mi sono perso"],
          ["地図で教えてください", "chizu de oshiete kudasai", "Me lo mostra sulla mappa?"],
          ["薬局はどこですか？", "yakkyoku wa doko desu ka?", "Dov'è una farmacia?"],
          ["頭が痛いです", "atama ga itai desu", "Ho mal di testa", "", "Onaka = pancia, nodo = gola."],
          ["風邪をひきました", "kaze o hikimashita", "Ho preso il raffreddore"],
          ["財布をなくしました", "saifu o nakushimashita", "Ho perso il portafoglio", "", "Sumaho = telefono, pasupōto = passaporto."],
          ["電車に忘れ物をしました", "densha ni wasuremono o shimashita", "Ho dimenticato una cosa in treno"],
          ["助けて！", "tasukete!", "Aiuto!"],
          ["救急車を呼んでください", "kyūkyūsha o yonde kudasai", "Chiamate un'ambulanza"]
        ]},
        { tipo: "kanji", titolo: "🔤 Da riconoscere", items: [
          ["薬", "kusuri", "farmacia / medicine"], ["交番", "kōban", "posto di polizia"], ["病院", "byōin", "ospedale"],
          ["非常口", "hijōguchi", "uscita di emergenza"], ["避難所", "hinanjo", "punto di raccolta"], ["駅事務室", "eki jimushitsu", "ufficio della stazione"]
        ]},
        { tipo: "nota", righe: [
          "**Allerta terremoto sul telefono** (緊急地震速報, kinkyū jishin sokuhō): suono fortissimo pochi secondi prima della scossa. Allontanatevi dai vetri, riparatevi sotto un tavolo."
        ]}
      ]
    },

    // ------------------------------------------------------------------ TELEFONO
    {
      id: "telefono", emoji: "📞", titolo: "Prenotare al telefono",
      desc: "La chiamata al Ninja-dera e ai ristoranti.",
      intro: "Al telefono non c'è il display che vi aiuta: per questo conviene allenarsi su questa pagina prima della chiamata al **Myoryu-ji (+81 76-241-0888, entro il 31/10, tra le 07:00 e le 08:00 italiane)**. Le domande sono sempre le stesse: giorno, ora, persone, nome, telefono.",
      sezioni: [
        { tipo: "sentirai", frasi: [
          ["はい、妙立寺でございます", "hai, **Myōryūji** de gozaimasu", "Pronto, qui Myoryu-ji"],
          ["ご予約ですね", "go-**yoyaku** desu ne", "Una prenotazione, giusto?", "Hai"],
          ["何日の何時がよろしいですか？", "**nan-nichi** no **nan-ji** ga yoroshii desu ka?", "Che giorno e a che ora?"],
          ["何名様ですか？", "**nanmei**-sama desu ka?", "Quante persone?", "Futari desu"],
          ["その時間は空いております", "sono jikan wa **aite** orimasu", "A quell'ora c'è posto"],
          ["その日は満席です", "sono hi wa **manseki** desu", "Quel giorno è tutto pieno"],
          ["一時半はいっぱいですが、二時なら空いています", "ichi-ji han wa **ippai** desu ga, ni-ji **nara** aite imasu", "Alle 13:30 è pieno, ma alle 14 c'è posto", "Sore de onegaishimasu (va bene quello)"],
          ["お名前をお願いします", "**o-namae** o onegaishimasu", "Il nome, per favore"],
          ["お電話番号をお願いします", "o-**denwa bangō** o onegaishimasu", "Il numero di telefono"],
          ["日本語でのご案内になりますが、よろしいですか？", "**Nihongo** de no go-annai ni narimasu ga, yoroshii desu ka?", "La visita è in giapponese, va bene?", "Hai, daijōbu desu", "Al Ninja-dera danno un foglio in inglese."],
          ["当日は十分前にお越しください", "tōjitsu wa **juppun mae** ni o-koshi kudasai", "Il giorno stesso venite 10 minuti prima"],
          ["承りました", "**uketamawarimashita**", "Prenotazione registrata", "", "= fatto!"]
        ]},
        { tipo: "dire", frasi: [
          ["もしもし、予約をしたいんですが", "moshi moshi, yoyaku o shitai n desu ga", "Pronto, vorrei prenotare"],
          ["日本語があまりできません。ゆっくりお願いします", "Nihongo ga amari dekimasen. yukkuri onegaishimasu", "Parlo poco giapponese. Piano, per favore"],
          ["十一月二十五日、水曜日、午後一時半、二人です", "jūichi-gatsu nijūgo-nichi, suiyōbi, gogo ichi-ji han, futari desu", "Mercoledì 25 novembre, 13:30, due persone"],
          ["名前はスパタロです。ス、パ、タ、ロ", "namae wa Supataro desu. su, pa, ta, ro", "Mi chiamo Spataro. Su-pa-ta-ro"],
          ["それでお願いします", "sore de onegaishimasu", "Va bene così"],
          ["ありがとうございます。失礼します", "arigatō gozaimasu. shitsurei shimasu", "Grazie, arrivederci", "", "Il modo standard di chiudere una telefonata."]
        ]},
        { tipo: "nota", righe: [
          "**Numero di telefono:** cifra per cifra. Zero = «zero», 4 = «yon», 7 = «nana», 9 = «kyū»; tra un gruppo e l'altro si dice «no». Per l'Italia: «purasu san kyū no …»."
        ]},
        { tipo: "dialogo", titolo: "💬 La chiamata al Ninja-dera", righe: [
          ["S", "はい、妙立寺でございます。", "hai, Myōryūji de gozaimasu.", "Pronto, Myoryu-ji."],
          ["N", "もしもし、予約をしたいんですが。日本語があまりできません。ゆっくりお願いします。", "moshi moshi, yoyaku o shitai n desu ga. Nihongo ga amari dekimasen. yukkuri onegaishimasu.", "Pronto, vorrei prenotare. Parlo poco giapponese, piano per favore."],
          ["S", "はい、ご予約ですね。何日の何時がよろしいですか？", "hai, go-yoyaku desu ne. nan-nichi no nan-ji ga yoroshii desu ka?", "Certo, una prenotazione. Che giorno e a che ora?"],
          ["N", "十一月二十五日、水曜日、午後一時半、二人です。", "jūichi-gatsu nijūgo-nichi, suiyōbi, gogo ichi-ji han, futari desu.", "Mercoledì 25 novembre, 13:30, due persone."],
          ["S", "十一月二十五日、一時半、お二人様ですね。お名前をお願いします。", "jūichi-gatsu nijūgo-nichi, ichi-ji han, o-futari-sama desu ne. o-namae o onegaishimasu.", "25 novembre, 13:30, due persone. Il nome?"],
          ["N", "スパタロです。ス、パ、タ、ロ。", "Supataro desu. su, pa, ta, ro.", "Spataro. Su-pa-ta-ro."],
          ["S", "お電話番号をお願いします。", "o-denwa bangō o onegaishimasu.", "Il numero di telefono?"],
          ["N", "プラス、三、九、の…", "purasu, san, kyū, no…", "Più, tre, nove…"],
          ["S", "承りました。当日は十分前にお越しください。", "uketamawarimashita. tōjitsu wa juppun mae ni o-koshi kudasai.", "Registrato. Il giorno stesso venite 10 minuti prima."],
          ["N", "ありがとうございます。失礼します。", "arigatō gozaimasu. shitsurei shimasu.", "Grazie, arrivederci."]
        ]}
      ]
    }
  ],

  // Cartellini da mostrare a schermo intero. "hotel" = aggiunge nome e indirizzo presi da data.js.
  // I cartellini taxi-0 … taxi-4 sono generati da lingua.js, uno per hotel.
  cartellini: [
    { id: "indica", titolo: "Rispondete indicando", ja: "日本語があまり分かりません。\n指で指して教えてください。", it: "Non capisco bene il giapponese. Può rispondere indicando?",
      scelte: [["はい", "sì"], ["いいえ", "no"], ["あります", "c'è"], ["ありません", "non c'è"], ["できます", "si può"], ["できません", "non si può"]] },
    { id: "scrivi", titolo: "Me lo scrive?", ja: "ここに書いていただけますか？", it: "Può scriverlo qui? (numeri, orari, prezzi)" },
    { id: "nozze", titolo: "Viaggio di nozze", ja: "新婚旅行中です。", it: "Siamo in viaggio di nozze." },
    { id: "prenotazione", titolo: "Abbiamo prenotato", ja: "スパタロの名前で予約しています。\n二人です。", it: "Abbiamo prenotato a nome Spataro. Siamo in due." },
    { id: "foto", titolo: "Ci fa una foto?", ja: "写真を撮っていただけますか？", it: "Ci può fare una foto?" },
    { id: "takkyu-kyoto", titolo: "Spedizione del 23/11 → Kyoto", hotel: "KABIN Kyoto",
      ja: "このスーツケース2個を、\n下のホテルに送りたいです。\n11月25日に届けてください。\n宿泊者：スパタロ（11月26日チェックイン）", it: "Vorremmo spedire queste 2 valigie all'hotel qui sotto, consegna il 25 novembre. Ospite: Spataro, check-in il 26 novembre." },
    { id: "takkyu-tokyo", titolo: "Spedizione del 3/12 → Tokyo", hotel: "Shiba Park Hotel",
      ja: "このスーツケース2個を、\n下のホテルに送りたいです。\n12月5日に届けてください。\n宿泊者：スパタロ（12月5日チェックイン）", it: "Vorremmo spedire queste 2 valigie all'hotel qui sotto, consegna il 5 dicembre. Ospite: Spataro, check-in il 5 dicembre." }
  ],

  // situazioni utili giorno per giorno (mostrate nella pagina del giorno)
  giorni: {
    "2026-11-18": ["kit", "numeri", "cartelli"],
    "2026-11-19": ["treni", "hotel", "konbini", "izakaya"],
    "2026-11-20": ["shinkansen", "bus-taxi", "ristorante", "izakaya"],
    "2026-11-21": ["biglietti", "prenotato", "mercati", "chiacchiere"],
    "2026-11-22": ["biglietti", "ristorante", "negozi"],
    "2026-11-23": ["takkyubin", "ramen", "prenotato", "negozi"],
    "2026-11-24": ["shinkansen", "hotel", "mercati", "biglietti", "izakaya"],
    "2026-11-25": ["biglietti", "onsen", "ristorante"],
    "2026-11-26": ["shinkansen", "bus-taxi", "hotel", "prenotato"],
    "2026-11-27": ["treni", "prenotato", "biglietti"],
    "2026-11-28": ["biglietti", "bus-taxi", "izakaya"],
    "2026-11-29": ["treni", "ristorante", "chiacchiere"],
    "2026-11-30": ["prenotato", "onsen", "biglietti"],
    "2026-12-01": ["treni", "shinkansen", "mercati"],
    "2026-12-02": ["treni", "biglietti", "ristorante"],
    "2026-12-03": ["takkyubin", "shinkansen", "mercati", "ramen"],
    "2026-12-04": ["treni", "hotel", "mercati", "biglietti"],
    "2026-12-05": ["shinkansen", "hotel", "ramen", "prenotato"],
    "2026-12-06": ["mercati", "negozi", "biglietti", "izakaya"],
    "2026-12-07": ["treni", "biglietti", "izakaya"],
    "2026-12-08": ["treni", "negozi", "prenotato"],
    "2026-12-09": ["hotel", "negozi"]
  }
};
