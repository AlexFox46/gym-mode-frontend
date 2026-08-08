/**
 * LIBRERIA MASTER ESERCIZI GYMMODE - 100% RepDB Verificata, Deduplicata ed Esecuzione Garantita
 */

export const EXERCISE_LIBRARY = [
  {
    name: 'Panca Piana',
    aliases: ["panca piana bilanciere", "bench press", "flat bench press", "barbell bench press"],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Petto',
    secondary_muscles: ["Tricipiti", "Spalle"],
    movement_pattern: 'Spinta Orizzontale',
    default_rest_time: 120,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bench-press-start.webp',
    description: "Esercizio fondamentale di spinta orizzontale per lo sviluppo del gran pettorale, deltoidi anteriori e tricipiti.",
    setup: "Sdraiati sulla panca con 5 punti di appoggio (piedi, glutei, spalle, testa). Adduci e deprimi le scapole. Impugna il bilanciere poco più largo delle spalle. Scendi controllato portando la sbarra a sfiorare lo sterno, poi spingi verso l'alto mantenendo l'arco fisiologico."
  },
  {
    name: 'Panca Inclinata Bilanciere',
    aliases: ["panca inclinata", "incline bench press", "panca inclinata bilanciere", "incline barbell bench press"],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Petto',
    secondary_muscles: ["Spalle", "Tricipiti"],
    movement_pattern: 'Spinta Orizzontale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/incline-bench-press-start.webp',
    description: "Variante della panca piana focalizzata sui fasci clavicolari (petto alto) e deltoide anteriore.",
    setup: "Imposta la panca a 30°-45°. Mantieni le scapole adotte e depresse. Abbassa il bilanciere fino alla parte alta del petto (sotto le clavicole) e spingi estendendo le braccia senza perdere l'assetto scapolare."
  },
  {
    name: 'Panca Reclinata Bilanciere',
    aliases: ["panca declinata bilanciere", "decline barbell bench press", "panca declinata", "decline bench press"],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Petto',
    secondary_muscles: ["Tricipiti", "Spalle"],
    movement_pattern: 'Spinta Orizzontale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/decline-bench-press-start.webp',
    description: "Variante della panca piana eseguita su panca reclinata per il massimo reclutamento dei fasci inferiori del pettorale.",
    setup: "Posizionati sulla panca reclinata bloccando le caviglie. Impugna il bilanciere a larghezza spalle, abbassalo controllato alla parte bassa dello sterno e spingi."
  },
  {
    name: 'Spinte Panca Inclinata Manubri',
    aliases: ["spinte manubri inclinata", "incline dumbbell press", "spinte panca 30 manubri", "spinte inclinata manubri", "incline db press"],
    equipment: 'Manubri',
    primary_muscle_group: 'Petto',
    secondary_muscles: ["Spalle", "Tricipiti"],
    movement_pattern: 'Spinta Orizzontale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/incline-db-press-start.webp',
    description: "Ottimo esercizio per il petto alto con ampio ROM (Range of Motion) e lavoro stabilizzatore con manubri.",
    setup: "Panca a 30°. Porta i manubri sulle ginocchia e spingiti indietro per posizionarli al petto. Spingi verso l'alto convergenti senza far toccare i manubri. Mantieni i gomiti leggermente chiusi (a circa 45° rispetto al busto)."
  },
  {
    name: 'Spinte Panca Piana Manubri',
    aliases: ["spinte manubri piana", "dumbbell bench press", "spinte piana manubri", "spinte manubri", "db bench press"],
    equipment: 'Manubri',
    primary_muscle_group: 'Petto',
    secondary_muscles: ["Tricipiti", "Spalle"],
    movement_pattern: 'Spinta Orizzontale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/db-bench-press-start.webp',
    description: "Spinta per il gran pettorale con massimo allungamento e libertà di movimento articolare per le spalle.",
    setup: "Sdraiati con un manubrio per mano. Gomiti a 45° dal busto, petto ben in fuori. Scendi flettendo i gomiti finché avverti un buon allungamento del petto, poi spingi estendendo le braccia."
  },
  {
    name: 'Croci ai Cavi',
    aliases: ["croci cavi alti", "cable flyes", "cable crossover", "croci ai cavi alti", "croci cavi"],
    equipment: 'Cavi',
    primary_muscle_group: 'Petto',
    secondary_muscles: ["Spalle"],
    movement_pattern: 'Isolamento',
    default_rest_time: 75,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/cable-fly-start.webp',
    description: "Esercizio di isolamento a tensione continua per il pettorale in accorciamento e allungamento.",
    setup: "Posiziona i carrelli dei cavi in alto o ad altezza spalle. Fai un passo in avanti mantenendo un piede avanzato per stabilità. Busto leggermente inclinato, gomiti semiflessi. Chiudi le braccia davanti a te come nell'atto di abbracciare un tronco."
  },
  {
    name: 'Croci Manubri Panca Piana',
    aliases: ["croci manubri", "dumbbell flyes", "flat dumbbell fly", "croci su panca piana", "croci manubri piana"],
    equipment: 'Manubri',
    primary_muscle_group: 'Petto',
    secondary_muscles: ["Spalle"],
    movement_pattern: 'Isolamento',
    default_rest_time: 75,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/db-fly-start.webp',
    description: "Esercizio di isolamento in allungamento per i pettorali con manubri.",
    setup: "Sdraiati su panca piana con i manubri sopra il petto. Apri le braccia a semicerchio mantenendo i gomiti leggermente flessi finché avverti allungamento, poi richiudi."
  },
  {
    name: 'Chest Press',
    aliases: ["chest press machine", "macchina petto", "chest press cavi", "chest press macchinario"],
    equipment: 'Macchinario',
    primary_muscle_group: 'Petto',
    secondary_muscles: ["Tricipiti", "Spalle"],
    movement_pattern: 'Spinta Orizzontale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/cable-chest-press-start.webp',
    description: "Spinta guidata per il pettorale, ideale per lavorare in sicurezza con carichi elevati o a cedimento.",
    setup: "Regola l'altezza del sedile affinché le impugnature si trovino all'altezza della parte media del petto. Appoggia bene la schiena allo schienale, deprimi le scapole e spingi le impugnature in avanti in modo controllato."
  },
  {
    name: 'Dip alle Parallele',
    aliases: ["dips", "dip petto", "parallel bar dips", "chest dips", "dip parallele"],
    equipment: 'Corpo Libero',
    primary_muscle_group: 'Petto',
    secondary_muscles: ["Tricipiti", "Spalle"],
    movement_pattern: 'Spinta Verticale',
    default_rest_time: 120,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/dips-start.webp',
    description: "Esercizio a corpo libero multiarticolare per la parte inferiore del petto, deltoidi anteriori e tricipiti.",
    setup: "Impugna le barre parallele ed estendi le braccia. Per enfatizzare il petto, inclina il busto leggermente in avanti a 30° e piega le ginocchia. Scendi finché i gomiti formano un angolo di 90°, poi spingi con forza per tornare alla posizione iniziale."
  },
  {
    name: 'Push-Up / Piegamenti',
    aliases: ["flessioni", "pushups", "piegamenti sulle braccia", "push up", "piegamenti"],
    equipment: 'Corpo Libero',
    primary_muscle_group: 'Petto',
    secondary_muscles: ["Tricipiti", "Addominali", "Spalle"],
    movement_pattern: 'Spinta Orizzontale',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/push-up-start.webp',
    description: "Esercizio a corpo libero per la forza ed il controllo motorio di pettorali, tricipiti e core.",
    setup: "Mani a terra poco più larghe delle spalle, corpo in plank rigido (glutei e addominali contratti). Scendi sfiorando il pavimento con il petto mantenendo i gomiti a 45° rispetto al busto, poi spingi estendendo le braccia."
  },
  {
    name: 'Trazioni alla Sbarra',
    aliases: ["pull up", "pullups", "trazioni pronazione", "trazioni alla sbarra pronate", "trazioni"],
    equipment: 'Corpo Libero',
    primary_muscle_group: 'Dorsali',
    secondary_muscles: ["Bicipiti", "Spalle"],
    movement_pattern: 'Trazione Verticale',
    default_rest_time: 120,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/pull-up-start.webp',
    description: "Esercizio Re del dorso per lo sviluppo del gran dorsale e della larghezza della schiena.",
    setup: "Afferra la sbarra con presa pronata (palmi in avanti) poco più larga delle spalle. Parti da braccia estese, deprimi le scapole e trazionati verso l'alto portando il mento oltre la sbarra."
  },
  {
    name: 'Lat Machine Avanti',
    aliases: ["lat machine", "lat pulldown", "trazioni lat machine", "lat machine presa larga", "lat avanti"],
    equipment: 'Cavi',
    primary_muscle_group: 'Dorsali',
    secondary_muscles: ["Bicipiti", "Spalle"],
    movement_pattern: 'Trazione Verticale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/lat-pulldown-start.webp',
    description: "Fondamentale esercizio di trazione verticale ai cavi per lo sviluppo in larghezza del gran dorsale.",
    setup: "Regola i rulli fermagambe. Impugna la sbarra con presa pronata larga. Busto leggermente inclinato all'indietro (15°), petto ben in fuori. Tira la sbarra verso la parte alta del petto guidando con i gomiti verso il basso."
  },
  {
    name: 'Pulley Basso',
    aliases: ["pulley", "seated cable row", "rematore al cavo basso", "pulley cavo basso", "pulley presa stretta"],
    equipment: 'Cavi',
    primary_muscle_group: 'Dorsali',
    secondary_muscles: ["Bicipiti", "Spalle", "Trapezi"],
    movement_pattern: 'Trazione Orizzontale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/wide-grip-seated-cable-row-start.webp',
    description: "Esercizio di trazione orizzontale a tensione continua per lo spessore del dorsale e muscoli romboidi.",
    setup: "Siediti sulla macchina con le ginocchia leggermente flesse e piedi ben piantati sulle pedane. Impugna il manipolo, mantieni la schiena con le curvature fisiologiche e tira l'impugnatura verso l'ombelico chiudendo le scapole."
  },
  {
    name: 'Rematore con Bilanciere',
    aliases: ["rematore bilanciere", "bent over barbell row", "barbell row", "rematore"],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Dorsali',
    secondary_muscles: ["Bicipiti", "Spalle", "Trapezi"],
    movement_pattern: 'Trazione Orizzontale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/barbell-row-start.webp',
    description: "Multiarticolare fondamentale per lo spessore e la densità muscolare di tutta la schiena.",
    setup: "Fletti il busto a circa 45°, schiena dritta e core ben saldo. Impugna il bilanciere a larghezza spalle. Tira la sbarra verso la parte bassa dell'addome guidando con i gomiti in alto e indietro."
  },
  {
    name: 'Rematore con Manubrio',
    aliases: ["rematore un braccio manubrio", "one arm dumbbell row", "rematore manubrio", "rematore manubri"],
    equipment: 'Manubri',
    primary_muscle_group: 'Dorsali',
    secondary_muscles: ["Bicipiti", "Spalle"],
    movement_pattern: 'Trazione Orizzontale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/single-arm-db-row-start.webp',
    description: "Esercizio unilaterale per il gran dorsale con ampio ROM e lavoro mirato per ciascun lato del corpo.",
    setup: "Appoggia ginocchio e mano dello stesso lato su una panca piana. Con l'altra mano impugna il manubrio. Tira il manubrio verso il fianco portando il gomito verso l'alto e spremendo il dorsale in contrazione."
  },
  {
    name: 'Stacco da Terra',
    aliases: ["stacco", "deadlift", "barbell deadlift", "stacco convenzionale", "trap bar deadlift", "stacco trap bar", "hex bar deadlift"],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Dorsali',
    secondary_muscles: ["Femorali", "Glutei", "Trapezi", "Quadricipiti"],
    movement_pattern: 'Hinge (Cerniera Anca)',
    default_rest_time: 180,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/deadlift-start.webp',
    description: "Il re degli esercizi di forza e catena posteriore, stimola schiena, glutei, femorali e core.",
    setup: "Posizionati con il bilanciere sopra la metà del piede. Afferra la sbarra a larghezza spalle. Abbassa le anche, adduci le scapole, petto in fuori e spingi con le gambe estendendo contemporaneamente anca e ginocchia."
  },
  {
    name: 'Scrollate con Manubri (Shrugs)',
    aliases: ["scrollate manubri", "dumbbell shrugs", "shrugs", "scrollate trapezi", "scrollate"],
    equipment: 'Manubri',
    primary_muscle_group: 'Trapezi',
    secondary_muscles: ["Dorsali"],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/db-shrug-start.webp',
    description: "Esercizio d'isolamento per lo sviluppo e l'ipertrofia del trapezio superiore.",
    setup: "In piedi con un manubrio per mano lungo i fianchi. Eleva le spalle verso le orecchie in modo verticale senza ruotare le articolazioni."
  },
  {
    name: 'Military Press',
    aliases: ["lento avanti", "overhead press", "ohp", "military press bilanciere", "military"],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Spalle',
    secondary_muscles: ["Tricipiti", "Petto"],
    movement_pattern: 'Spinta Verticale',
    default_rest_time: 120,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/ohp-start.webp',
    description: "Esercizio fondamentale di spinta verticale in piedi per le spalle e la stabilità del core.",
    setup: "Bilanciere in appoggio sulle clavicole. Impugnatura poco più larga delle spalle. Glutei e addominali ben contratti. Spingi la sbarra verticalmente sopra la testa estendendo completamente le braccia."
  },
  {
    name: 'Spinte Sopra la Testa Manubri',
    aliases: ["military press manubri", "spinte manubri spalle", "seated dumbbell press", "lento manubri", "dumbbell shoulder press", "spinte spalle manubri", "shoulder press manubri"],
    equipment: 'Manubri',
    primary_muscle_group: 'Spalle',
    secondary_muscles: ["Tricipiti"],
    movement_pattern: 'Spinta Verticale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/seated-db-press-start.webp',
    description: "Spinta verticale per i deltoidi con manubri, garantisce ottimo ROM e stabilità.",
    setup: "Seduto su panca verticale (80°-90°). Porta i manubri all'altezza delle orecchie con gomiti a 90°. Spingi verso l'alto senza far toccare i manubri in cima e scendi controllato."
  },
  {
    name: 'Arnold Press',
    aliases: ["arnold press manubri", "spinte arnold", "arnold press"],
    equipment: 'Manubri',
    primary_muscle_group: 'Spalle',
    secondary_muscles: ["Tricipiti"],
    movement_pattern: 'Spinta Verticale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/arnold-press-start.webp',
    description: "Famosa variante di spinta per le spalle ideata da Arnold Schwarzenegger con rotazione del polso per stimolare tutti e tre i fasci del deltoide.",
    setup: "Seduto con panca a 90°. Parti con i manubri all'altezza del petto e i palmi rivolti verso di te. Durante la spinta ruota i polsi verso l'esterno completando l'estensione in alto."
  },
  {
    name: 'Alzate Laterali Manubri',
    aliases: ["alzate laterali", "lateral raises", "side lateral raise", "alzate laterali manubrio"],
    equipment: 'Manubri',
    primary_muscle_group: 'Spalle',
    secondary_muscles: ["Trapezi"],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/lateral-raise-start.webp',
    description: "Esercizio principe di isolamento per il deltoide laterale per dare larghezza alle spalle.",
    setup: "In piedi con manubri lungo i fianchi. Eleva le braccia verso l'esterno fino ad arrivare all'altezza delle spalle, con gomiti leggermente flessi e pollice leggermente ruotato verso il basso."
  },
  {
    name: 'Alzate Laterali ai Cavi',
    aliases: ["alzate laterali cavo", "cable lateral raise", "alzate laterali al cavo"],
    equipment: 'Cavi',
    primary_muscle_group: 'Spalle',
    secondary_muscles: ["Trapezi"],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/cable-lateral-raise-start.webp',
    description: "Alzate laterali a tensione costante per il deltoide laterale mediante cavo basso.",
    setup: "Posizionati di fianco al cavo basso. Impugna la maniglia con il braccio opposto e solleva lateralmente fino all'altezza della spalla mantenendo il controllo."
  },
  {
    name: 'Face Pull',
    aliases: ["face pull cavi", "facepulls", "facepull", "face pull corda"],
    equipment: 'Cavi',
    primary_muscle_group: 'Spalle',
    secondary_muscles: ["Trapezi", "Dorsali"],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/face-pull-start.webp',
    description: "Fisiosanitario ed estetico: stimola il deltoide posteriore, i rotatori esterni e migliora la postura delle spalle.",
    setup: "Fissa la corda al cavo alto. Impugna la corda con pollici rivolti all'indietro. Tira la corda verso il viso/fronte aprendo i gomiti all'esterno ed extraruotando le spalle."
  },
  {
    name: 'Curl con Bilanciere',
    aliases: ["curl bilanciere", "barbell curl", "biceps barbell curl", "curl bilanciere dritto"],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Bicipiti',
    secondary_muscles: ["Avambracci"],
    movement_pattern: 'Isolamento',
    default_rest_time: 75,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/barbell-curl-start.webp',
    description: "Esercizio base e fondamentale per la massa e la forza dei bicipiti brachiali.",
    setup: "In piedi, impugna il bilanciere a larghezza spalle con palmi in avanti (supinazione). Gomiti stretti ai fianchi. Fletti le braccia portando il bilanciere verso le spalle senza oscillare con il busto."
  },
  {
    name: 'Curl Manubri Alternato',
    aliases: ["curl manubri", "bicep curl", "dumbbell curl", "curl manubri alternato", "curl bicipiti manubri"],
    equipment: 'Manubri',
    primary_muscle_group: 'Bicipiti',
    secondary_muscles: ["Avambracci"],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bicep-curl-start.webp',
    description: "Classico curl con manubri per lavorare singolarmente sui due bicipiti con supinazione del polso.",
    setup: "In piedi con un manubrio per mano. Solleva un manubrio alla volta ruotando il polso verso l'esterno durante la salita (supinazione), strizza il bicipite in cima e scendi controllato."
  },
  {
    name: 'Hammer Curl',
    aliases: ["curl martello", "dumbbell hammer curl", "hammer curls", "curl a martello"],
    equipment: 'Manubri',
    primary_muscle_group: 'Bicipiti',
    secondary_muscles: ["Avambracci"],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/hammer-curl-start.webp',
    description: "Curl a presa neutra per lo sviluppo del brachiale e del brachioradiale (spessore del braccio e avambraccio).",
    setup: "Impugna i manubri con palmi rivolti l'uno verso l'altro (presa neutra a martello). Fletti i gomiti mantenendo la presa neutra per tutto il movimento."
  },
  {
    name: 'Curl Panca Inclinata',
    aliases: ["curl manubri panca inclinata", "incline dumbbell curl", "curl inclinata manubri"],
    equipment: 'Manubri',
    primary_muscle_group: 'Bicipiti',
    secondary_muscles: ["Avambracci"],
    movement_pattern: 'Isolamento',
    default_rest_time: 75,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/incline-db-curl-start.webp',
    description: "Esercizio in massimo allungamento per il capo lungo del bicipite brachiale.",
    setup: "Siediti su panca inclinata a 45°-60°. Lascia cadere le braccia all'indietro verticalmente. Fletti i gomiti senza portare in avanti la spalla."
  },
  {
    name: 'Curl Panca Scott (Preacher Curl)',
    aliases: ["panca scott", "preacher curl", "curl bilanciere sagomato scott", "scott curl"],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Bicipiti',
    secondary_muscles: ["Avambracci"],
    movement_pattern: 'Isolamento',
    default_rest_time: 75,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/preacher-curl-start.webp',
    description: "Esercizio classico su panca Scott per il massimo isolamento del capo breve del bicipite brachiale.",
    setup: "Poggia le braccia sul cuscino della panca Scott. Impugna il bilanciere EZ e fletti le avambracci verso l'alto senza staccare i gomiti dal supporto."
  },
  {
    name: 'Curl Concentrato Manubrio',
    aliases: ["curl concentrato", "concentration curl", "curl concentrato manubrio"],
    equipment: 'Manubri',
    primary_muscle_group: 'Bicipiti',
    secondary_muscles: ["Avambracci"],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/concentration-curl-start.webp',
    description: "Esercizio d'isolamento che elimina qualsiasi compenso del corpo per il bicipite.",
    setup: "Seduto su panca con il gomito poggiato contro l'interno coscia. Fletti il manubrio verso la spalla strizzando il bicipite nel punto di massima contrazione."
  },
  {
    name: 'Pushdown Cavi con Corda',
    aliases: ["pushdown corda", "tricep pushdown", "pushdown cavi", "pushdown tricipiti corda", "pushdown"],
    equipment: 'Cavi',
    primary_muscle_group: 'Tricipiti',
    secondary_muscles: [],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/tricep-pushdown-start.webp',
    description: "Esercizio base ai cavi per l'isolamento del tricipite con focus sul capo laterale e medio.",
    setup: "Impugna la corda al cavo alto. Gomiti bloccati ai lati del costato. Estendi le braccia verso il basso aprendo la corda a fine corsa."
  },
  {
    name: 'French Press',
    aliases: ["french press panca", "lying triceps extension", "skull crusher", "french press bilanciere", "skullcrusher"],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Tricipiti',
    secondary_muscles: [],
    movement_pattern: 'Isolamento',
    default_rest_time: 75,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/lying-tricep-extension-start.webp',
    description: "Esercizio di distensione su panca per lo sviluppo della massa dei tricipiti.",
    setup: "Sdraiati su panca piana con bilanciere EZ a braccia tese sopra le spalle. Piega i gomiti portando la barra verso la fronte/vertice del capo, poi estendi."
  },
  {
    name: 'Estensioni Sopra la Testa Manubrio',
    aliases: ["tricep extension", "triceps extension", "tricep extension manubrio", "french press manubrio", "overhead triceps extension", "estensioni tricipiti sopra testa", "estensione tricipiti sopra la testa", "estensione tricipiti manubrio"],
    equipment: 'Manubri',
    primary_muscle_group: 'Tricipiti',
    secondary_muscles: [],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/single-arm-dumbbell-overhead-tricep-extension-start.webp',
    description: "Estensione sopra la testa per sollecitare in massimo allungamento il capo lungo del tricipite.",
    setup: "Seduto o in piedi. Impugna un manubrio sopra la testa con entrambe le mani (o a un braccio). Abbassa il manubrio dietro il collo flettendo i gomiti e poi riestendi."
  },
  {
    name: 'Squat con Bilanciere',
    aliases: ["squat", "barbell squat", "back squat", "squat bilanciere", "hex bar jump squat", "jump squat", "trap bar jump squat"],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Quadricipiti',
    secondary_muscles: ["Glutei", "Femorali", "Addominali"],
    movement_pattern: 'Spinta Verticale',
    default_rest_time: 120,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/squat-start.webp',
    description: "Esercizio Re per le gambe e la forza globale del corpo.",
    setup: "Bilanciere posizionato sui trapezi. Piedi poco più larghi delle spalle con punte leggermente extraruotate. Scendi rompendo il parallelo con le anche tenendo il petto ben in fuori, poi spingi con tutta la pianta del piede."
  },
  {
    name: 'Leg Press',
    aliases: ["pressa 45", "leg press machine", "pressa per gambe", "horizontal leg press", "single leg press"],
    equipment: 'Macchinario',
    primary_muscle_group: 'Quadricipiti',
    secondary_muscles: ["Glutei", "Femorali"],
    movement_pattern: 'Spinta Orizzontale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/leg-press-start.webp',
    description: "Esercizio fondamentale a macchinario per lo sviluppo della massa delle gambe senza carico assiale sulla colonna.",
    setup: "Siediti sulla pressa con schiena e bacino ben adesi allo schienale. Piedi sulla pedana a larghezza spalle. Sblocca i fermi, scendi piegando le ginocchia fino a 90° e spingi con forza."
  },
  {
    name: 'Leg Extension',
    aliases: ["leg extension machine", "estensioni gambe", "leg extension"],
    equipment: 'Macchinario',
    primary_muscle_group: 'Quadricipiti',
    secondary_muscles: [],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/leg-extension-start.webp',
    description: "Esercizio di isolamento puro per i quadricipiti e il retto femorale.",
    setup: "Regola il rullo sopra le caviglie. Siediti con la schiena appoggiata. Estendi le gambe verso l'alto fino a completare la distensione della ginocchio, mantieni 1 secondo di contrazione di picco e scendi controllato."
  },
  {
    name: 'Stacco Rumeno',
    aliases: ["romanian deadlift", "rdl", "stacco gambe semitese", "stacco rumeno bilanciere"],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Femorali',
    secondary_muscles: ["Glutei", "Dorsali"],
    movement_pattern: 'Hinge (Cerniera Anca)',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/romanian-deadlift-start.webp',
    description: "Esercizio d'eccellenza per la catena posteriore con focus su femorali e glutei in allungamento.",
    setup: "Parti in piedi con bilanciere in mano. Fletti leggermente le ginocchia e spingi indietro il bacino facendo scorrere il bilanciere vicino alle cosce fin sotto le ginocchia, avvertendo il massimo allungamento dei femorali, poi risali."
  },
  {
    name: 'Leg Curl Sdraiato',
    aliases: ["leg curl", "lying leg curl", "leg curl pronato", "leg curl sdraiato"],
    equipment: 'Macchinario',
    primary_muscle_group: 'Femorali',
    secondary_muscles: ["Polpacci"],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/leg-curl-start.webp',
    description: "Isolamento fondamentale per i muscoli bicipite femorale, semitendinoso e semimembranoso.",
    setup: "Sdraiati a pancia in giù sulla macchina con il rullo poggiato sopra il calcagno. Fletti le gambe verso i glutei senza staccare il bacino dal lettino."
  },
  {
    name: 'Hip Thrust',
    aliases: ["hip thrust bilanciere", "barbell hip thrust", "spinta anche panca"],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Glutei',
    secondary_muscles: ["Femorali"],
    movement_pattern: 'Hinge (Cerniera Anca)',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/hip-thrust-start.webp',
    description: "Il miglior esercizio per la massima ipertrofia e forza del grande gluteo.",
    setup: "Appoggia le scapole sul bordo di una panca piana con un bilanciere gommato sul bacino. Piedi a terra a larghezza spalle. Spingi con i glutei verso l'alto estendendo completamente l'anca fino ad allineare cosce e busto."
  },
  {
    name: 'Crunch a Terra',
    aliases: ["crunch addominali", "crunches", "ab crunch", "crunch"],
    equipment: 'Corpo Libero',
    primary_muscle_group: 'Addominali',
    secondary_muscles: [],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/crunches-start.webp',
    description: "Esercizio classico per la flessione del busto e la contrazione del retto addominale.",
    setup: "Sdraiati a terra con le ginocchia flesse. Mani dietro la nuca senza tirare il collo. Stacca le scapole da terra arricciando il busto e contraendo gli addominali."
  },
  {
    name: 'Plank',
    aliases: ["plank isometrico", "front plank", "plank addominali"],
    equipment: 'Corpo Libero',
    primary_muscle_group: 'Addominali',
    secondary_muscles: ["Spalle", "Glutei"],
    movement_pattern: 'Isometria',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/plank-main.webp',
    description: "Esercizio isometrico fondamentale per la stabilità del core e la prevenzione del mal di schiena.",
    setup: "Appoggiati sugli avambracci e sulle punte dei piedi. Mantieni il corpo in una linea retta perfetta tra testa, bacino e talloni con glutei e addome ben serrati."
  },
  {
    name: 'Leg Raise alla Sbarra',
    aliases: ["hanging leg raise", "sollevamento gambe sbarra", "leg raise sbarra", "leg raise"],
    equipment: 'Corpo Libero',
    primary_muscle_group: 'Addominali',
    secondary_muscles: ["Avambracci"],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/hanging-leg-raise-start.webp',
    description: "Esercizio avanzato in sospensione per la parte bassa del retto addominale.",
    setup: "Appenditi alla sbarra con le braccia tese. Solleva le gambe tese (o le ginocchia) in avanti fino a 90° ruotando il bacino verso il petto per ingaggiare gli addominali."
  },
  {
    name: 'Calf Raise in Piedi',
    aliases: ["standing calf raise", "polpacci in piedi", "calf raise bilanciere", "calf raise"],
    equipment: 'Macchinario',
    primary_muscle_group: 'Polpacci',
    secondary_muscles: [],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/standing-calf-raise-start.webp',
    description: "Esercizio di isolamento per il gastrocnemio (polpaccio).",
    setup: "Posiziona l'avampiede sul gradino con i talloni nel vuoto. Estendi le caviglie spingendo sulle punte dei piedi in alto, mantieni la contrazione in cima e scendi fino al massimo allungamento."
  },
];

/**
 * CATALOGO COMPLETO REPDB (400 Esercizi)
 */
export const REPDB_FULL_CATALOG = [
  {
    "id": "ab-wheel-rollout",
    "name": "Ab Wheel Rollout",
    "group": "Addominali",
    "equipment": "Corpo Libero",
    "raw_equipment": "ab_wheel",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/ab-wheel-rollout-start.webp"
  },
  {
    "id": "air-bike",
    "name": "Air Bike",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "air_bike",
    "raw_body_part": "full_body",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/air-bike-main.webp"
  },
  {
    "id": "archer-pull-ups",
    "name": "Archer Pull Ups",
    "group": "Dorsali",
    "equipment": "Macchinario",
    "raw_equipment": "pull_up_bar",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/archer-pull-ups-start.webp"
  },
  {
    "id": "archer-push-ups",
    "name": "Archer Push Ups",
    "group": "Petto",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/archer-push-ups-start.webp"
  },
  {
    "id": "arnold-press",
    "name": "Arnold Press",
    "group": "Spalle",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/arnold-press-start.webp"
  },
  {
    "id": "assisted-dips",
    "name": "Machine Assisted Dips",
    "group": "Bicipiti",
    "equipment": "Macchinario",
    "raw_equipment": "dip_machine",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/assisted-dips-start.webp"
  },
  {
    "id": "assisted-pull-ups",
    "name": "Assisted Pull Ups",
    "group": "Dorsali",
    "equipment": "Macchinario",
    "raw_equipment": "assisted_pullup_machine",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/assisted-pull-ups-start.webp"
  },
  {
    "id": "back-extension",
    "name": "Back Extension",
    "group": "Dorsali",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/back-extension-start.webp"
  },
  {
    "id": "ball-leg-curl",
    "name": "Stability Ball Leg Curl",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "stability_ball",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/ball-leg-curl-start.webp"
  },
  {
    "id": "ball-pike",
    "name": "Ball Pike",
    "group": "Addominali",
    "equipment": "Macchinario",
    "raw_equipment": "stability_ball",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/ball-pike-start.webp"
  },
  {
    "id": "band-assisted-pull-ups",
    "name": "Band Assisted Pull Ups",
    "group": "Dorsali",
    "equipment": "Macchinario",
    "raw_equipment": "resistance_band",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/band-assisted-pull-ups-start.webp"
  },
  {
    "id": "band-pull-apart",
    "name": "Band Pull Apart",
    "group": "Spalle",
    "equipment": "Macchinario",
    "raw_equipment": "resistance_band",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/band-pull-apart-start.webp"
  },
  {
    "id": "banded-adductor-stretch",
    "name": "Banded Adductor Stretch",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "resistance_band",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/banded-adductor-stretch-main.webp"
  },
  {
    "id": "banded-ankle-stretch",
    "name": "Banded Ankle Stretch",
    "group": "Polpacci",
    "equipment": "Macchinario",
    "raw_equipment": "resistance_band",
    "raw_body_part": "lower_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/banded-ankle-stretch-main.webp"
  },
  {
    "id": "banded-calf-stretch",
    "name": "Banded Calf Stretch",
    "group": "Polpacci",
    "equipment": "Macchinario",
    "raw_equipment": "resistance_band",
    "raw_body_part": "lower_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/banded-calf-stretch-main.webp"
  },
  {
    "id": "banded-chest-stretch",
    "name": "Banded Chest Stretch",
    "group": "Petto",
    "equipment": "Macchinario",
    "raw_equipment": "resistance_band",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/banded-chest-stretch-main.webp"
  },
  {
    "id": "banded-clamshell",
    "name": "Banded Clamshell",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "loop_band",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/banded-clamshell-start.webp"
  },
  {
    "id": "banded-figure-4-stretch",
    "name": "Banded Figure-4 Stretch",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "resistance_band",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/banded-figure-4-stretch-main.webp"
  },
  {
    "id": "banded-fire-hydrant",
    "name": "Banded Fire Hydrant",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "loop_band",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/banded-fire-hydrant-start.webp"
  },
  {
    "id": "banded-glute-bridge",
    "name": "Banded Glute Bridge",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "loop_band",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/banded-glute-bridge-start.webp"
  },
  {
    "id": "banded-good-morning",
    "name": "Banded Good Morning",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "loop_band",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/banded-good-morning-start.webp"
  },
  {
    "id": "banded-hamstring-stretch",
    "name": "Banded Hamstring Stretch",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "resistance_band",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/banded-hamstring-stretch-main.webp"
  },
  {
    "id": "banded-hip-thrust",
    "name": "Banded Hip Thrust",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "loop_band",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/banded-hip-thrust-start.webp"
  },
  {
    "id": "banded-it-band-stretch",
    "name": "Banded IT-Band Stretch",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "resistance_band",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/banded-it-band-stretch-main.webp"
  },
  {
    "id": "banded-kneeling-hip-thrust",
    "name": "Banded Kneeling Hip Thrust",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "loop_band",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/banded-kneeling-hip-thrust-start.webp"
  },
  {
    "id": "banded-lat-stretch",
    "name": "Banded Lat Stretch",
    "group": "Dorsali",
    "equipment": "Macchinario",
    "raw_equipment": "resistance_band",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/banded-lat-stretch-main.webp"
  },
  {
    "id": "banded-lateral-walk",
    "name": "Banded Lateral Walk",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "loop_band",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/banded-lateral-walk-start.webp"
  },
  {
    "id": "banded-rear-delt-stretch",
    "name": "Banded Rear Delt Stretch",
    "group": "Spalle",
    "equipment": "Macchinario",
    "raw_equipment": "resistance_band",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/banded-rear-delt-stretch-main.webp"
  },
  {
    "id": "banded-romanian-deadlift",
    "name": "Banded Romanian Deadlift",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "loop_band",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/banded-romanian-deadlift-start.webp"
  },
  {
    "id": "banded-seated-hip-abduction",
    "name": "Banded Seated Hip Abduction",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "loop_band",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/banded-seated-hip-abduction-start.webp"
  },
  {
    "id": "banded-shoulder-stretch",
    "name": "Banded Shoulder Stretch",
    "group": "Spalle",
    "equipment": "Macchinario",
    "raw_equipment": "resistance_band",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/banded-shoulder-stretch-main.webp"
  },
  {
    "id": "banded-squat",
    "name": "Banded Squat",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "loop_band",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/banded-squat-start.webp"
  },
  {
    "id": "banded-standing-curl",
    "name": "Banded Standing Curl",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "loop_band",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/banded-standing-curl-start.webp"
  },
  {
    "id": "banded-standing-hip-abduction",
    "name": "Banded Standing Hip Abduction",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "loop_band",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/banded-standing-hip-abduction-start.webp"
  },
  {
    "id": "banded-standing-hip-adduction",
    "name": "Banded Standing Hip Adduction",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "loop_band",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/banded-standing-hip-adduction-start.webp"
  },
  {
    "id": "banded-triceps-stretch",
    "name": "Banded Triceps Stretch",
    "group": "Bicipiti",
    "equipment": "Macchinario",
    "raw_equipment": "resistance_band",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/banded-triceps-stretch-main.webp"
  },
  {
    "id": "barbell-ab-rollout",
    "name": "Barbell Ab Rollout",
    "group": "Addominali",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/barbell-ab-rollout-start.webp"
  },
  {
    "id": "barbell-calf-raise",
    "name": "Barbell Calf Raise",
    "group": "Polpacci",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "lower_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/barbell-calf-raise-start.webp"
  },
  {
    "id": "barbell-curl",
    "name": "Barbell Curl",
    "group": "Bicipiti",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/barbell-curl-start.webp"
  },
  {
    "id": "barbell-front-raise",
    "name": "Barbell Front Raise",
    "group": "Spalle",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/barbell-front-raise-start.webp"
  },
  {
    "id": "barbell-glute-bridge",
    "name": "Barbell Glute Bridge",
    "group": "Quadricipiti",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/barbell-glute-bridge-start.webp"
  },
  {
    "id": "barbell-lunge",
    "name": "Barbell Lunge",
    "group": "Quadricipiti",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/barbell-reverse-lunge-start.webp"
  },
  {
    "id": "barbell-overhead-extension",
    "name": "Barbell Overhead Extension",
    "group": "Bicipiti",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/barbell-overhead-extension-start.webp"
  },
  {
    "id": "barbell-preacher-curl",
    "name": "Barbell Preacher Curl",
    "group": "Bicipiti",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/barbell-preacher-curl-start.webp"
  },
  {
    "id": "barbell-pullover",
    "name": "Barbell Pullover",
    "group": "Dorsali",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/barbell-pullover-start.webp"
  },
  {
    "id": "barbell-rear-delt-row",
    "name": "Barbell Rear Delt Row",
    "group": "Spalle",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/barbell-rear-delt-row-start.webp"
  },
  {
    "id": "barbell-reverse-lunge",
    "name": "Barbell Reverse Lunge",
    "group": "Quadricipiti",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/barbell-reverse-lunge-start.webp"
  },
  {
    "id": "barbell-row",
    "name": "Bent-Over Barbell Row",
    "group": "Dorsali",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/barbell-row-start.webp"
  },
  {
    "id": "battle-ropes",
    "name": "Battle Ropes",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "battle_rope",
    "raw_body_part": "full_body",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/battle-ropes-main.webp"
  },
  {
    "id": "behind-the-back-barbell-shrug",
    "name": "Behind the Back Barbell Shrug",
    "group": "Dorsali",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/behind-the-back-barbell-shrug-start.webp"
  },
  {
    "id": "behind-the-neck-lat-pulldown",
    "name": "Behind-the-Neck Lat Pulldown",
    "group": "Dorsali",
    "equipment": "Macchinario",
    "raw_equipment": "lat_pulldown_machine",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/behind-the-neck-lat-pulldown-start.webp"
  },
  {
    "id": "behind-the-neck-press",
    "name": "Behind the Neck Press",
    "group": "Spalle",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/behind-the-neck-press-start.webp"
  },
  {
    "id": "bench-adductor-stretch",
    "name": "Bench Adductor Stretch",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "flat_bench",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bench-adductor-stretch-main.webp"
  },
  {
    "id": "bench-ankle-stretch",
    "name": "Bench Ankle Stretch",
    "group": "Polpacci",
    "equipment": "Macchinario",
    "raw_equipment": "flat_bench",
    "raw_body_part": "lower_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bench-ankle-stretch-main.webp"
  },
  {
    "id": "bench-bulgarian-split-stretch",
    "name": "Bench Bulgarian Split Stretch",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "flat_bench",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bench-bulgarian-split-stretch-main.webp"
  },
  {
    "id": "bench-calf-stretch",
    "name": "Bench Calf Stretch",
    "group": "Polpacci",
    "equipment": "Macchinario",
    "raw_equipment": "flat_bench",
    "raw_body_part": "lower_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bench-calf-stretch-main.webp"
  },
  {
    "id": "bench-chest-stretch",
    "name": "Bench Chest Stretch",
    "group": "Petto",
    "equipment": "Macchinario",
    "raw_equipment": "flat_bench",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bench-chest-stretch-main.webp"
  },
  {
    "id": "bench-childs-pose",
    "name": "Bench Child's Pose",
    "group": "Dorsali",
    "equipment": "Macchinario",
    "raw_equipment": "flat_bench",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bench-childs-pose-main.webp"
  },
  {
    "id": "bench-couch-stretch",
    "name": "Bench Couch Stretch",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "flat_bench",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bench-couch-stretch-main.webp"
  },
  {
    "id": "bench-dips",
    "name": "Bench Dips",
    "group": "Bicipiti",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bench-dips-start.webp"
  },
  {
    "id": "bench-figure-4-glute-stretch",
    "name": "Bench Figure-4 Glute Stretch",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "flat_bench",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bench-figure-4-glute-stretch-main.webp"
  },
  {
    "id": "bench-hamstring-stretch",
    "name": "Bench Hamstring Stretch",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "flat_bench",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bench-hamstring-stretch-main.webp"
  },
  {
    "id": "bench-lat-stretch",
    "name": "Bench Lat Stretch",
    "group": "Dorsali",
    "equipment": "Macchinario",
    "raw_equipment": "flat_bench",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bench-lat-stretch-main.webp"
  },
  {
    "id": "bench-leg-pull-in",
    "name": "Bench Leg Pull-In",
    "group": "Addominali",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bench-leg-pull-in-start.webp"
  },
  {
    "id": "bench-press",
    "name": "Barbell Bench Press",
    "group": "Petto",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bench-press-start.webp"
  },
  {
    "id": "bench-pull",
    "name": "Bench Pull",
    "group": "Dorsali",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bench-pull-start.webp"
  },
  {
    "id": "bent-arm-barbell-pullover",
    "name": "Bent Arm Barbell Pullover",
    "group": "Dorsali",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bent-arm-barbell-pullover-start.webp"
  },
  {
    "id": "bent-arm-ez-bar-pullover",
    "name": "Bent-Arm EZ-Bar Pullover",
    "group": "Dorsali",
    "equipment": "Bilanciere EZ",
    "raw_equipment": "ez_bar",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bent-arm-ez-bar-pullover-start.webp"
  },
  {
    "id": "bent-over-db-row",
    "name": "Bent-Over Dumbbell Row",
    "group": "Dorsali",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bent-over-db-row-start.webp"
  },
  {
    "id": "bent-over-ez-bar-row",
    "name": "Bent-Over EZ-Bar Row",
    "group": "Dorsali",
    "equipment": "Bilanciere EZ",
    "raw_equipment": "ez_bar",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bent-over-ez-bar-row-start.webp"
  },
  {
    "id": "bicep-curl",
    "name": "Dumbbell Bicep Curl",
    "group": "Bicipiti",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bicep-curl-start.webp"
  },
  {
    "id": "bicycle-crunch",
    "name": "Bicycle Crunch",
    "group": "Addominali",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bicycle-crunch-start.webp"
  },
  {
    "id": "bird-dog-hold",
    "name": "Bird Dog Hold",
    "group": "Addominali",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bird-dog-hold-main.webp"
  },
  {
    "id": "bodyweight-calf-raise",
    "name": "Bodyweight Calf Raise",
    "group": "Polpacci",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "lower_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bodyweight-calf-raise-start.webp"
  },
  {
    "id": "bodyweight-good-morning",
    "name": "Bodyweight Good Morning",
    "group": "Dorsali",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bodyweight-good-morning-start.webp"
  },
  {
    "id": "bodyweight-lateral-raise",
    "name": "Bodyweight Lateral Raise",
    "group": "Spalle",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bodyweight-lateral-raise-start.webp"
  },
  {
    "id": "bodyweight-overhead-press",
    "name": "Bodyweight Overhead Press",
    "group": "Spalle",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bodyweight-overhead-press-start.webp"
  },
  {
    "id": "bodyweight-squat",
    "name": "Bodyweight Squat",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bodyweight-squat-start.webp"
  },
  {
    "id": "box-jump",
    "name": "Box Jump",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "plyo_box",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/box-jump-start.webp"
  },
  {
    "id": "box-squat",
    "name": "Box Squat",
    "group": "Quadricipiti",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/box-squat-start.webp"
  },
  {
    "id": "bulgarian-split-squat",
    "name": "Bulgarian Split Squat",
    "group": "Quadricipiti",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bulgarian-split-squat-start.webp"
  },
  {
    "id": "burpees",
    "name": "Burpees",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "full_body",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/burpees-main.webp"
  },
  {
    "id": "butterfly-stretch",
    "name": "Butterfly Stretch",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/butterfly-stretch-main.webp"
  },
  {
    "id": "cable-bent-over-row",
    "name": "Cable Bent-Over Row",
    "group": "Dorsali",
    "equipment": "Cavi",
    "raw_equipment": "cable",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/cable-bent-over-row-start.webp"
  },
  {
    "id": "cable-chest-press",
    "name": "Cable Chest Press",
    "group": "Petto",
    "equipment": "Cavi",
    "raw_equipment": "cable",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/cable-chest-press-start.webp"
  },
  {
    "id": "cable-crunch",
    "name": "Cable Crunch",
    "group": "Addominali",
    "equipment": "Cavi",
    "raw_equipment": "cable",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/cable-crunch-start.webp"
  },
  {
    "id": "cable-curl",
    "name": "Cable Curl",
    "group": "Bicipiti",
    "equipment": "Cavi",
    "raw_equipment": "cable",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/cable-curl-start.webp"
  },
  {
    "id": "cable-external-rotation",
    "name": "Cable External Rotation",
    "group": "Spalle",
    "equipment": "Cavi",
    "raw_equipment": "cable",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/cable-external-rotation-start.webp"
  },
  {
    "id": "cable-fly",
    "name": "Cable Fly",
    "group": "Petto",
    "equipment": "Cavi",
    "raw_equipment": "cable",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/cable-fly-start.webp"
  },
  {
    "id": "cable-front-raise",
    "name": "Cable Front Raise",
    "group": "Spalle",
    "equipment": "Cavi",
    "raw_equipment": "cable",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/cable-front-raise-start.webp"
  },
  {
    "id": "cable-hammer-curl",
    "name": "Cable Hammer Curl",
    "group": "Bicipiti",
    "equipment": "Cavi",
    "raw_equipment": "cable",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/cable-hammer-curl-start.webp"
  },
  {
    "id": "cable-kickback",
    "name": "Cable Glute Kickback",
    "group": "Quadricipiti",
    "equipment": "Cavi",
    "raw_equipment": "cable",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/cable-kickback-start.webp"
  },
  {
    "id": "cable-lateral-raise",
    "name": "Cable Lateral Raise",
    "group": "Spalle",
    "equipment": "Cavi",
    "raw_equipment": "cable",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/cable-lateral-raise-start.webp"
  },
  {
    "id": "cable-tricep-kickback",
    "name": "Cable Tricep Kickback",
    "group": "Bicipiti",
    "equipment": "Cavi",
    "raw_equipment": "cable",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/cable-tricep-kickback-start.webp"
  },
  {
    "id": "cable-upright-row",
    "name": "Cable Upright Row",
    "group": "Spalle",
    "equipment": "Cavi",
    "raw_equipment": "cable",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/cable-upright-row-start.webp"
  },
  {
    "id": "cable-wrist-curl",
    "name": "Cable Wrist Curl",
    "group": "Avambracci",
    "equipment": "Cavi",
    "raw_equipment": "cable",
    "raw_body_part": "lower_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/cable-wrist-curl-start.webp"
  },
  {
    "id": "captains-chair-knee-raise",
    "name": "Captain's Chair Knee Raise",
    "group": "Addominali",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/captains-chair-knee-raise-start.webp"
  },
  {
    "id": "captains-chair-leg-raise",
    "name": "Captain's Chair Leg Raise",
    "group": "Addominali",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/captains-chair-leg-raise-start.webp"
  },
  {
    "id": "cheat-curl",
    "name": "Cheat Curl",
    "group": "Bicipiti",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/cheat-curl-start.webp"
  },
  {
    "id": "chest-press-machine",
    "name": "Machine Chest Press",
    "group": "Petto",
    "equipment": "Macchinario",
    "raw_equipment": "chest_press_machine",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/chest-press-machine-start.webp"
  },
  {
    "id": "chest-supported-db-row",
    "name": "Chest-Supported Dumbbell Row",
    "group": "Dorsali",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/chest-supported-db-row-start.webp"
  },
  {
    "id": "chest-supported-dumbbell-shrug",
    "name": "Chest Supported Dumbbell Shrug",
    "group": "Dorsali",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/chest-supported-dumbbell-shrug-start.webp"
  },
  {
    "id": "chest-supported-kettlebell-row",
    "name": "Chest-Supported Kettlebell Row",
    "group": "Dorsali",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/chest-supported-kettlebell-row-start.webp"
  },
  {
    "id": "chin-tuck-hold",
    "name": "Chin Tuck Hold",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "full_body",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/chin-tuck-hold-main.webp"
  },
  {
    "id": "chin-ups",
    "name": "Chin-Ups",
    "group": "Dorsali",
    "equipment": "Macchinario",
    "raw_equipment": "pull_up_bar",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/chin-ups-start.webp"
  },
  {
    "id": "clamshells",
    "name": "Clamshells",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/clamshells-start.webp"
  },
  {
    "id": "clap-push-ups",
    "name": "Clap Push-Ups",
    "group": "Petto",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/clap-push-ups-start.webp"
  },
  {
    "id": "clean",
    "name": "Clean",
    "group": "Quadricipiti",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "full_body",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/clean-start.webp"
  },
  {
    "id": "clean-and-jerk",
    "name": "Clean and Jerk",
    "group": "Quadricipiti",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "full_body",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/clean-and-jerk-start.webp"
  },
  {
    "id": "close-grip-barbell-curl",
    "name": "Close-Grip Barbell Curl",
    "group": "Bicipiti",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/close-grip-barbell-curl-start.webp"
  },
  {
    "id": "close-grip-bench-press",
    "name": "Close-Grip Bench Press",
    "group": "Bicipiti",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/close-grip-bench-press-start.webp"
  },
  {
    "id": "close-grip-db-bench-press",
    "name": "Close-Grip Dumbbell Bench Press",
    "group": "Bicipiti",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/close-grip-db-bench-press-start.webp"
  },
  {
    "id": "close-grip-ez-bar-bench-press",
    "name": "Close-Grip EZ-Bar Bench Press",
    "group": "Bicipiti",
    "equipment": "Bilanciere EZ",
    "raw_equipment": "ez_bar",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/close-grip-ez-bar-bench-press-start.webp"
  },
  {
    "id": "close-grip-incline-bench",
    "name": "Close-Grip Incline Bench Press",
    "group": "Bicipiti",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/close-grip-incline-bench-start.webp"
  },
  {
    "id": "close-grip-pull-ups",
    "name": "Close-Grip Pull-Ups",
    "group": "Dorsali",
    "equipment": "Macchinario",
    "raw_equipment": "pull_up_bar",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/close-grip-pull-ups-start.webp"
  },
  {
    "id": "cocoons",
    "name": "Cocoons",
    "group": "Addominali",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/cocoons-start.webp"
  },
  {
    "id": "concentration-curl",
    "name": "Concentration Curl",
    "group": "Bicipiti",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/concentration-curl-start.webp"
  },
  {
    "id": "cross-body-crunch",
    "name": "Cross-Body Crunch",
    "group": "Addominali",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/cross-body-crunch-start.webp"
  },
  {
    "id": "cross-body-hammer-curl",
    "name": "Cross Body Hammer Curl",
    "group": "Bicipiti",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/cross-body-hammer-curl-start.webp"
  },
  {
    "id": "crunches",
    "name": "Crunches",
    "group": "Addominali",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/crunches-start.webp"
  },
  {
    "id": "db-bench-press",
    "name": "Dumbbell Bench Press",
    "group": "Petto",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/db-bench-press-start.webp"
  },
  {
    "id": "db-fly",
    "name": "Dumbbell Fly",
    "group": "Petto",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/db-fly-start.webp"
  },
  {
    "id": "db-lunge",
    "name": "Dumbbell Lunge",
    "group": "Quadricipiti",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/db-lunge-start.webp"
  },
  {
    "id": "db-pullover",
    "name": "Dumbbell Pullover",
    "group": "Petto",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/db-pullover-start.webp"
  },
  {
    "id": "db-reverse-curl",
    "name": "Dumbbell Reverse Curl",
    "group": "Bicipiti",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/db-reverse-curl-start.webp"
  },
  {
    "id": "db-shrug",
    "name": "Dumbbell Shrug",
    "group": "Spalle",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/db-shrug-start.webp"
  },
  {
    "id": "db-skull-crusher",
    "name": "Dumbbell Skull Crusher",
    "group": "Bicipiti",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/db-skull-crusher-start.webp"
  },
  {
    "id": "dead-bug",
    "name": "Dead Bug",
    "group": "Addominali",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/dead-bug-start.webp"
  },
  {
    "id": "dead-hang",
    "name": "Dead Hang",
    "group": "Dorsali",
    "equipment": "Macchinario",
    "raw_equipment": "pull_up_bar",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/dead-hang-main.webp"
  },
  {
    "id": "deadlift",
    "name": "Barbell Deadlift",
    "group": "Dorsali",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/deadlift-start.webp"
  },
  {
    "id": "decline-bench-press",
    "name": "Decline Bench Press",
    "group": "Petto",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/decline-bench-press-start.webp"
  },
  {
    "id": "decline-bench-press-barbell",
    "name": "Decline Barbell Bench Press",
    "group": "Petto",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/decline-bench-press-barbell-start.webp"
  },
  {
    "id": "decline-bench-press-ez-bar",
    "name": "Decline EZ-Bar Bench Press",
    "group": "Petto",
    "equipment": "Bilanciere EZ",
    "raw_equipment": "ez_bar",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/decline-bench-press-ez-bar-start.webp"
  },
  {
    "id": "decline-db-fly",
    "name": "Decline Dumbbell Fly",
    "group": "Petto",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/decline-db-fly-start.webp"
  },
  {
    "id": "decline-push-up",
    "name": "Decline Push-Up",
    "group": "Petto",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/decline-push-up-start.webp"
  },
  {
    "id": "deficit-deadlift",
    "name": "Deficit Deadlift",
    "group": "Dorsali",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/deficit-deadlift-start.webp"
  },
  {
    "id": "deficit-push-ups",
    "name": "Deficit Push Ups",
    "group": "Petto",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/deficit-push-ups-start.webp"
  },
  {
    "id": "diamond-push-ups",
    "name": "Diamond Push Ups",
    "group": "Petto",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/diamond-push-ups-start.webp"
  },
  {
    "id": "dips",
    "name": "Chest Dips",
    "group": "Petto",
    "equipment": "Macchinario",
    "raw_equipment": "dip_station",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/dips-start.webp"
  },
  {
    "id": "double-kettlebell-bicep-curl",
    "name": "Double Kettlebell Bicep Curl",
    "group": "Bicipiti",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/double-kettlebell-bicep-curl-start.webp"
  },
  {
    "id": "double-kettlebell-clean",
    "name": "Double Kettlebell Clean",
    "group": "Spalle",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/double-kettlebell-clean-start.webp"
  },
  {
    "id": "double-kettlebell-dead-clean",
    "name": "Double Kettlebell Dead Clean",
    "group": "Quadricipiti",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "full_body",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/double-kettlebell-dead-clean-start.webp"
  },
  {
    "id": "double-kettlebell-dead-split-snatch",
    "name": "Double Kettlebell Dead Split Snatch",
    "group": "Quadricipiti",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "full_body",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/double-kettlebell-dead-split-snatch-start.webp"
  },
  {
    "id": "double-kettlebell-jerk",
    "name": "Double Kettlebell Jerk",
    "group": "Spalle",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/double-kettlebell-jerk-start.webp"
  },
  {
    "id": "double-kettlebell-overhead-press",
    "name": "Double Kettlebell Overhead Press",
    "group": "Spalle",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/double-kettlebell-overhead-press-start.webp"
  },
  {
    "id": "double-kettlebell-push-press",
    "name": "Double Kettlebell Push Press",
    "group": "Spalle",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/double-kettlebell-push-press-start.webp"
  },
  {
    "id": "double-kettlebell-row",
    "name": "Double Kettlebell Row",
    "group": "Dorsali",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/double-kettlebell-row-start.webp"
  },
  {
    "id": "double-kettlebell-split-jerk",
    "name": "Double Kettlebell Split Jerk",
    "group": "Quadricipiti",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "full_body",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/double-kettlebell-split-jerk-start.webp"
  },
  {
    "id": "double-kettlebell-swing-snatch",
    "name": "Double Kettlebell Swing Snatch",
    "group": "Quadricipiti",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "full_body",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/double-kettlebell-swing-snatch-start.webp"
  },
  {
    "id": "drag-curl",
    "name": "Drag Curl",
    "group": "Bicipiti",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/drag-curl-start.webp"
  },
  {
    "id": "dragon-flag",
    "name": "Dragon Flag",
    "group": "Addominali",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/dragon-flag-start.webp"
  },
  {
    "id": "dumbbell-bench-pull",
    "name": "Dumbbell Bench Pull",
    "group": "Dorsali",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/dumbbell-bench-pull-start.webp"
  },
  {
    "id": "dumbbell-calf-raise",
    "name": "Dumbbell Calf Raise",
    "group": "Polpacci",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "lower_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/dumbbell-calf-raise-start.webp"
  },
  {
    "id": "dumbbell-deadlift",
    "name": "Dumbbell Deadlift",
    "group": "Dorsali",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/dumbbell-deadlift-start.webp"
  },
  {
    "id": "dumbbell-farmers-walk",
    "name": "Dumbbell Farmer's Walk",
    "group": "Quadricipiti",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "full_body",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/dumbbell-farmers-walk-main.webp"
  },
  {
    "id": "dumbbell-floor-press",
    "name": "Dumbbell Floor Press",
    "group": "Petto",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/dumbbell-floor-press-start.webp"
  },
  {
    "id": "dumbbell-front-raise",
    "name": "Dumbbell Front Raise",
    "group": "Spalle",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/dumbbell-front-raise-start.webp"
  },
  {
    "id": "dumbbell-front-squat",
    "name": "Dumbbell Front Squat",
    "group": "Quadricipiti",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/dumbbell-front-squat-start.webp"
  },
  {
    "id": "dumbbell-hip-thrust",
    "name": "Dumbbell Hip Thrust",
    "group": "Quadricipiti",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/dumbbell-hip-thrust-start.webp"
  },
  {
    "id": "dumbbell-pistol-squat",
    "name": "Dumbbell Pistol Squat",
    "group": "Quadricipiti",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/dumbbell-pistol-squat-start.webp"
  },
  {
    "id": "dumbbell-push-press",
    "name": "Dumbbell Push Press",
    "group": "Spalle",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/dumbbell-push-press-start.webp"
  },
  {
    "id": "dumbbell-reverse-fly",
    "name": "Dumbbell Reverse Fly",
    "group": "Spalle",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/dumbbell-reverse-fly-start.webp"
  },
  {
    "id": "dumbbell-romanian-deadlift",
    "name": "Dumbbell Romanian Deadlift",
    "group": "Dorsali",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/dumbbell-romanian-deadlift-start.webp"
  },
  {
    "id": "dumbbell-shoulder-press",
    "name": "Dumbbell Shoulder Press",
    "group": "Spalle",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/dumbbell-shoulder-press-start.webp"
  },
  {
    "id": "dumbbell-side-bend",
    "name": "Dumbbell Side Bend",
    "group": "Addominali",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/dumbbell-side-bend-start.webp"
  },
  {
    "id": "dumbbell-snatch",
    "name": "Dumbbell Snatch",
    "group": "Quadricipiti",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "full_body",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/dumbbell-snatch-start.webp"
  },
  {
    "id": "dumbbell-split-squat",
    "name": "Dumbbell Split Squat",
    "group": "Quadricipiti",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/dumbbell-split-squat-start.webp"
  },
  {
    "id": "dumbbell-tricep-extension",
    "name": "Dumbbell Tricep Extension",
    "group": "Bicipiti",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/dumbbell-tricep-extension-start.webp"
  },
  {
    "id": "dumbbell-upright-row",
    "name": "Dumbbell Upright Row",
    "group": "Spalle",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/dumbbell-upright-row-start.webp"
  },
  {
    "id": "dumbbell-windmill",
    "name": "Dumbbell Windmill",
    "group": "Quadricipiti",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "full_body",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/dumbbell-windmill-start.webp"
  },
  {
    "id": "dumbbell-wrist-curl",
    "name": "Dumbbell Wrist Curl",
    "group": "Avambracci",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "lower_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/dumbbell-wrist-curl-start.webp"
  },
  {
    "id": "ez-bar-curl",
    "name": "EZ-Bar Curl",
    "group": "Bicipiti",
    "equipment": "Bilanciere EZ",
    "raw_equipment": "ez_bar",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/ez-bar-curl-start.webp"
  },
  {
    "id": "ez-bar-front-raise",
    "name": "EZ-Bar Front Raise",
    "group": "Spalle",
    "equipment": "Bilanciere EZ",
    "raw_equipment": "ez_bar",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/ez-bar-front-raise-start.webp"
  },
  {
    "id": "ez-bar-overhead-extension",
    "name": "EZ-Bar Overhead Tricep Extension",
    "group": "Bicipiti",
    "equipment": "Bilanciere EZ",
    "raw_equipment": "ez_bar",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/ez-bar-overhead-extension-start.webp"
  },
  {
    "id": "ez-bar-pullover",
    "name": "EZ Bar Pullover",
    "group": "Dorsali",
    "equipment": "Bilanciere EZ",
    "raw_equipment": "ez_bar",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/ez-bar-pullover-start.webp"
  },
  {
    "id": "ez-bar-reverse-curl",
    "name": "EZ-Bar Reverse Curl",
    "group": "Bicipiti",
    "equipment": "Bilanciere EZ",
    "raw_equipment": "ez_bar",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/ez-bar-reverse-curl-start.webp"
  },
  {
    "id": "ez-bar-reverse-grip-row",
    "name": "EZ Bar Reverse Grip Row",
    "group": "Dorsali",
    "equipment": "Bilanciere EZ",
    "raw_equipment": "ez_bar",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/ez-bar-reverse-grip-row-start.webp"
  },
  {
    "id": "ez-bar-romanian-deadlift",
    "name": "EZ-Bar Romanian Deadlift",
    "group": "Quadricipiti",
    "equipment": "Bilanciere EZ",
    "raw_equipment": "ez_bar",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/ez-bar-romanian-deadlift-start.webp"
  },
  {
    "id": "ez-bar-shrug",
    "name": "EZ-Bar Shrug",
    "group": "Spalle",
    "equipment": "Bilanciere EZ",
    "raw_equipment": "ez_bar",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/ez-bar-shrug-start.webp"
  },
  {
    "id": "ez-bar-spider-curl",
    "name": "EZ Bar Spider Curl",
    "group": "Bicipiti",
    "equipment": "Bilanciere EZ",
    "raw_equipment": "ez_bar",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/ez-bar-spider-curl-start.webp"
  },
  {
    "id": "ez-bar-upright-row",
    "name": "EZ-Bar Upright Row",
    "group": "Spalle",
    "equipment": "Bilanciere EZ",
    "raw_equipment": "ez_bar",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/ez-bar-upright-row-start.webp"
  },
  {
    "id": "face-pull",
    "name": "Cable Face Pull",
    "group": "Spalle",
    "equipment": "Cavi",
    "raw_equipment": "cable",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/face-pull-start.webp"
  },
  {
    "id": "floor-ez-bar-press",
    "name": "Floor EZ-Bar Press",
    "group": "Petto",
    "equipment": "Bilanciere EZ",
    "raw_equipment": "ez_bar",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/floor-ez-bar-press-start.webp"
  },
  {
    "id": "floor-kettlebell-pullover",
    "name": "Floor Kettlebell Pullover",
    "group": "Dorsali",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/floor-kettlebell-pullover-start.webp"
  },
  {
    "id": "floor-press",
    "name": "Floor Press",
    "group": "Petto",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/floor-press-start.webp"
  },
  {
    "id": "flutter-kicks",
    "name": "Flutter Kicks",
    "group": "Addominali",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/flutter-kicks-start.webp"
  },
  {
    "id": "front-lever",
    "name": "Front Lever",
    "group": "Dorsali",
    "equipment": "Macchinario",
    "raw_equipment": "pull_up_bar",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/front-lever-main.webp"
  },
  {
    "id": "front-squat",
    "name": "Front Squat",
    "group": "Quadricipiti",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/front-squat-start.webp"
  },
  {
    "id": "glute-bridge",
    "name": "Glute Bridge",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/glute-bridge-start.webp"
  },
  {
    "id": "glute-kickback",
    "name": "Glute Kickback",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/glute-kickback-start.webp"
  },
  {
    "id": "goblet-squat",
    "name": "Goblet Squat",
    "group": "Quadricipiti",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/goblet-squat-start.webp"
  },
  {
    "id": "good-morning",
    "name": "Good Morning",
    "group": "Quadricipiti",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/good-morning-start.webp"
  },
  {
    "id": "hack-squat",
    "name": "Hack Squat",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "hack_squat",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/hack-squat-start.webp"
  },
  {
    "id": "hack-squat-calf-raise",
    "name": "Hack Squat Calf Raise",
    "group": "Polpacci",
    "equipment": "Macchinario",
    "raw_equipment": "hack_squat",
    "raw_body_part": "lower_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/hack-squat-calf-raise-start.webp"
  },
  {
    "id": "hammer-curl",
    "name": "Dumbbell Hammer Curl",
    "group": "Bicipiti",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/hammer-curl-start.webp"
  },
  {
    "id": "handstand-push-ups",
    "name": "Handstand Push Ups",
    "group": "Spalle",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/handstand-push-ups-start.webp"
  },
  {
    "id": "hang-clean",
    "name": "Hang Clean",
    "group": "Quadricipiti",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "full_body",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/hang-clean-start.webp"
  },
  {
    "id": "hang-power-clean",
    "name": "Hang Power Clean",
    "group": "Quadricipiti",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "full_body",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/hang-power-clean-start.webp"
  },
  {
    "id": "hanging-knee-raise",
    "name": "Hanging Knee Raise",
    "group": "Addominali",
    "equipment": "Macchinario",
    "raw_equipment": "pull_up_bar",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/hanging-knee-raise-start.webp"
  },
  {
    "id": "hanging-leg-raise",
    "name": "Hanging Leg Raise",
    "group": "Addominali",
    "equipment": "Macchinario",
    "raw_equipment": "pull_up_bar",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/hanging-leg-raise-start.webp"
  },
  {
    "id": "hanging-pike",
    "name": "Hanging Pike",
    "group": "Addominali",
    "equipment": "Macchinario",
    "raw_equipment": "pull_up_bar",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/hanging-pike-start.webp"
  },
  {
    "id": "heel-elevated-squat",
    "name": "Heel-Elevated Squat",
    "group": "Quadricipiti",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/heel-elevated-squat-start.webp"
  },
  {
    "id": "hex-bar-deadlift",
    "name": "Hex Bar Deadlift",
    "group": "Dorsali",
    "equipment": "Macchinario",
    "raw_equipment": "trap_bar",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/hex-bar-deadlift-start.webp"
  },
  {
    "id": "high-plank",
    "name": "High Plank",
    "group": "Addominali",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/high-plank-main.webp"
  },
  {
    "id": "hip-abduction",
    "name": "Machine Hip Abduction",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "hip_abduction_machine",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/hip-abduction-start.webp"
  },
  {
    "id": "hip-adduction",
    "name": "Hip Adduction",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "hip_adduction_machine",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/hip-adduction-start.webp"
  },
  {
    "id": "hip-thrust",
    "name": "Barbell Hip Thrust",
    "group": "Quadricipiti",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/hip-thrust-start.webp"
  },
  {
    "id": "horizontal-leg-press",
    "name": "Horizontal Leg Press",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "leg_press",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/horizontal-leg-press-start.webp"
  },
  {
    "id": "incline-bench-ez-bar-press",
    "name": "Incline EZ-Bar Bench Press",
    "group": "Petto",
    "equipment": "Bilanciere EZ",
    "raw_equipment": "ez_bar",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/incline-bench-ez-bar-press-start.webp"
  },
  {
    "id": "incline-bench-press",
    "name": "Incline Barbell Bench Press",
    "group": "Petto",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/incline-bench-press-start.webp"
  },
  {
    "id": "incline-db-curl",
    "name": "Incline Dumbbell Curl",
    "group": "Bicipiti",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/incline-db-curl-start.webp"
  },
  {
    "id": "incline-db-press",
    "name": "Incline Dumbbell Press",
    "group": "Petto",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/incline-db-press-start.webp"
  },
  {
    "id": "incline-dumbbell-fly",
    "name": "Incline Dumbbell Fly",
    "group": "Petto",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/incline-dumbbell-fly-start.webp"
  },
  {
    "id": "incline-hammer-curl",
    "name": "Incline Hammer Curl",
    "group": "Bicipiti",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/incline-hammer-curl-start.webp"
  },
  {
    "id": "incline-push-ups",
    "name": "Incline Push-Up",
    "group": "Petto",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/incline-push-ups-start.webp"
  },
  {
    "id": "inverted-row",
    "name": "Inverted Row",
    "group": "Dorsali",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/inverted-row-start.webp"
  },
  {
    "id": "isometric-neck-side",
    "name": "Isometric Neck Lateral Flexion",
    "group": "Spalle",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/isometric-neck-side-main.webp"
  },
  {
    "id": "jackknife-sit-up",
    "name": "Jackknife Sit-Up",
    "group": "Addominali",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/jackknife-sit-up-start.webp"
  },
  {
    "id": "jump-rope",
    "name": "Jump Rope",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "jump_rope",
    "raw_body_part": "full_body",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/jump-rope-main.webp"
  },
  {
    "id": "jump-squat",
    "name": "Jump Squat",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/jump-squat-start.webp"
  },
  {
    "id": "jumping-jacks",
    "name": "Jumping Jacks",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "full_body",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/jumping-jacks-start.webp"
  },
  {
    "id": "kettlebell-bulgarian-split-squat",
    "name": "Kettlebell Bulgarian Split Squat",
    "group": "Quadricipiti",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/kettlebell-bulgarian-split-squat-start.webp"
  },
  {
    "id": "kettlebell-close-grip-floor-press",
    "name": "Kettlebell Close-Grip Floor Press",
    "group": "Bicipiti",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/kettlebell-close-grip-floor-press-start.webp"
  },
  {
    "id": "kettlebell-deadlift",
    "name": "Kettlebell Deadlift",
    "group": "Dorsali",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/kettlebell-deadlift-start.webp"
  },
  {
    "id": "kettlebell-farmers-walk",
    "name": "Kettlebell Farmer's Walk",
    "group": "Quadricipiti",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "full_body",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/kettlebell-farmers-walk-main.webp"
  },
  {
    "id": "kettlebell-floor-press",
    "name": "Kettlebell Floor Press",
    "group": "Petto",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/kettlebell-floor-press-start.webp"
  },
  {
    "id": "kettlebell-goblet-lunge",
    "name": "Kettlebell Goblet Lunge",
    "group": "Quadricipiti",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/kettlebell-goblet-lunge-start.webp"
  },
  {
    "id": "kettlebell-halo",
    "name": "Kettlebell Halo",
    "group": "Spalle",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/kettlebell-halo-start.webp"
  },
  {
    "id": "kettlebell-hammer-curl",
    "name": "Kettlebell Hammer Curl",
    "group": "Bicipiti",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/kettlebell-hammer-curl-start.webp"
  },
  {
    "id": "kettlebell-hip-thrust",
    "name": "Kettlebell Hip Thrust",
    "group": "Quadricipiti",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/kettlebell-hip-thrust-start.webp"
  },
  {
    "id": "kettlebell-lunge-press",
    "name": "Kettlebell Lunge Press",
    "group": "Quadricipiti",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "full_body",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/kettlebell-lunge-press-start.webp"
  },
  {
    "id": "kettlebell-offset-reverse-lunge-and-press",
    "name": "Kettlebell Offset Reverse Lunge and Press",
    "group": "Quadricipiti",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "full_body",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/kettlebell-offset-reverse-lunge-and-press-start.webp"
  },
  {
    "id": "kettlebell-overhead-tricep-extension",
    "name": "Kettlebell Overhead Tricep Extension",
    "group": "Bicipiti",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/kettlebell-overhead-tricep-extension-start.webp"
  },
  {
    "id": "kettlebell-pistol-squat",
    "name": "Kettlebell Pistol Squat",
    "group": "Quadricipiti",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/kettlebell-pistol-squat-start.webp"
  },
  {
    "id": "kettlebell-pullover",
    "name": "Kettlebell Pullover",
    "group": "Dorsali",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/kettlebell-pullover-start.webp"
  },
  {
    "id": "kettlebell-reverse-lunge",
    "name": "Kettlebell Reverse Lunge",
    "group": "Quadricipiti",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/kettlebell-reverse-lunge-start.webp"
  },
  {
    "id": "kettlebell-rotational-lunge",
    "name": "Kettlebell Rotational Lunge",
    "group": "Quadricipiti",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/kettlebell-rotational-lunge-start.webp"
  },
  {
    "id": "kettlebell-russian-twist",
    "name": "Kettlebell Russian Twist",
    "group": "Addominali",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/kettlebell-russian-twist-start.webp"
  },
  {
    "id": "kettlebell-shrug",
    "name": "Kettlebell Shrug",
    "group": "Dorsali",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/kettlebell-shrug-start.webp"
  },
  {
    "id": "kettlebell-single-leg-deadlift",
    "name": "Kettlebell Single Leg Deadlift",
    "group": "Dorsali",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/kettlebell-single-leg-deadlift-start.webp"
  },
  {
    "id": "kettlebell-skull-crusher",
    "name": "Kettlebell Skull Crusher",
    "group": "Bicipiti",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/kettlebell-skull-crusher-start.webp"
  },
  {
    "id": "kettlebell-sumo-deadlift",
    "name": "Kettlebell Sumo Deadlift",
    "group": "Quadricipiti",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/kettlebell-sumo-deadlift-start.webp"
  },
  {
    "id": "kettlebell-sumo-high-pull",
    "name": "Kettlebell Sumo High Pull",
    "group": "Spalle",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/kettlebell-sumo-high-pull-start.webp"
  },
  {
    "id": "kettlebell-swing",
    "name": "Kettlebell Swing",
    "group": "Quadricipiti",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/kettlebell-swing-start.webp"
  },
  {
    "id": "kettlebell-swing-clean",
    "name": "Kettlebell Swing Clean",
    "group": "Quadricipiti",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "full_body",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/kettlebell-swing-clean-start.webp"
  },
  {
    "id": "kettlebell-turkish-get-ups",
    "name": "Kettlebell Turkish Get Ups",
    "group": "Quadricipiti",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "full_body",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/kettlebell-turkish-get-ups-start.webp"
  },
  {
    "id": "kettlebell-windmills",
    "name": "Kettlebell Windmills",
    "group": "Quadricipiti",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "full_body",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/kettlebell-windmills-start.webp"
  },
  {
    "id": "knee-push-ups",
    "name": "Knee Push Ups",
    "group": "Petto",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/knee-push-ups-start.webp"
  },
  {
    "id": "kneeling-cable-row",
    "name": "Kneeling Cable Row",
    "group": "Dorsali",
    "equipment": "Cavi",
    "raw_equipment": "cable",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/kneeling-cable-row-start.webp"
  },
  {
    "id": "l-sit",
    "name": "L Sit",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "dip_station",
    "raw_body_part": "full_body",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/l-sit-main.webp"
  },
  {
    "id": "landmine-press",
    "name": "Landmine Press",
    "group": "Spalle",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/landmine-press-start.webp"
  },
  {
    "id": "lat-pulldown",
    "name": "Lat Pulldown",
    "group": "Dorsali",
    "equipment": "Cavi",
    "raw_equipment": "cable",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/lat-pulldown-start.webp"
  },
  {
    "id": "lateral-raise",
    "name": "Dumbbell Lateral Raise",
    "group": "Spalle",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/lateral-raise-start.webp"
  },
  {
    "id": "leg-curl",
    "name": "Lying Leg Curl",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "leg_curl",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/leg-curl-start.webp"
  },
  {
    "id": "leg-extension",
    "name": "Leg Extension",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "leg_extension",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/leg-extension-start.webp"
  },
  {
    "id": "leg-press",
    "name": "Leg Press",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "leg_press",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/leg-press-start.webp"
  },
  {
    "id": "lunge",
    "name": "Lunge",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/lunge-start.webp"
  },
  {
    "id": "lying-leg-raise",
    "name": "Lying Leg Raise",
    "group": "Addominali",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/lying-leg-raise-start.webp"
  },
  {
    "id": "lying-tricep-extension",
    "name": "Lying Tricep Extension",
    "group": "Bicipiti",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/lying-tricep-extension-start.webp"
  },
  {
    "id": "machine-bicep-curl",
    "name": "Machine Bicep Curl",
    "group": "Bicipiti",
    "equipment": "Macchinario",
    "raw_equipment": "bicep_curl_machine",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/machine-bicep-curl-start.webp"
  },
  {
    "id": "machine-calf-raise",
    "name": "Machine Calf Raise",
    "group": "Polpacci",
    "equipment": "Macchinario",
    "raw_equipment": "standing_calf_raise_machine",
    "raw_body_part": "lower_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/machine-calf-raise-start.webp"
  },
  {
    "id": "machine-preacher-curl",
    "name": "Machine Preacher Curl",
    "group": "Bicipiti",
    "equipment": "Macchinario",
    "raw_equipment": "preacher_curl_machine",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/machine-preacher-curl-start.webp"
  },
  {
    "id": "machine-shoulder-press",
    "name": "Machine Shoulder Press",
    "group": "Spalle",
    "equipment": "Macchinario",
    "raw_equipment": "shoulder_press_machine",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/machine-shoulder-press-start.webp"
  },
  {
    "id": "medicine-ball-slam",
    "name": "Medicine Ball Slam",
    "group": "Addominali",
    "equipment": "Macchinario",
    "raw_equipment": "slam_ball",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/medicine-ball-slam-start.webp"
  },
  {
    "id": "mountain-climbers",
    "name": "Mountain Climbers",
    "group": "Addominali",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/mountain-climbers-start.webp"
  },
  {
    "id": "muscle-snatch",
    "name": "Muscle Snatch",
    "group": "Quadricipiti",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "full_body",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/muscle-snatch-start.webp"
  },
  {
    "id": "muscle-ups",
    "name": "Muscle Ups",
    "group": "Dorsali",
    "equipment": "Macchinario",
    "raw_equipment": "pull_up_bar",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/muscle-ups-start.webp"
  },
  {
    "id": "negative-pull-ups",
    "name": "Negative Pull Ups",
    "group": "Dorsali",
    "equipment": "Macchinario",
    "raw_equipment": "pull_up_bar",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/negative-pull-ups-start.webp"
  },
  {
    "id": "neutral-grip-pull-ups",
    "name": "Neutral Grip Pull Ups",
    "group": "Dorsali",
    "equipment": "Macchinario",
    "raw_equipment": "pull_up_bar",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/neutral-grip-pull-ups-start.webp"
  },
  {
    "id": "nordic-hamstring-curl",
    "name": "Nordic Hamstring Curl",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "glute_ham_developer",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/nordic-hamstring-curl-start.webp"
  },
  {
    "id": "ohp",
    "name": "Barbell Overhead Press",
    "group": "Spalle",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/ohp-start.webp"
  },
  {
    "id": "one-arm-dumbbell-push-press",
    "name": "One-Arm Dumbbell Push Press",
    "group": "Spalle",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/one-arm-dumbbell-push-press-start.webp"
  },
  {
    "id": "one-arm-dumbbell-swing",
    "name": "One-Arm Dumbbell Swing",
    "group": "Quadricipiti",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "full_body",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/one-arm-dumbbell-swing-start.webp"
  },
  {
    "id": "one-arm-kettlebell-bicep-curl",
    "name": "One Arm Kettlebell Bicep Curl",
    "group": "Bicipiti",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/one-arm-kettlebell-bicep-curl-start.webp"
  },
  {
    "id": "one-arm-kettlebell-bottoms-up-press",
    "name": "One-Arm Kettlebell Bottoms-Up Press",
    "group": "Spalle",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/one-arm-kettlebell-bottoms-up-press-start.webp"
  },
  {
    "id": "one-arm-kettlebell-floor-glute-bridge-press",
    "name": "One Arm Kettlebell Floor Glute Bridge Press",
    "group": "Petto",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/one-arm-kettlebell-floor-glute-bridge-press-start.webp"
  },
  {
    "id": "one-arm-kettlebell-floor-press",
    "name": "One Arm Kettlebell Floor Press",
    "group": "Petto",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/one-arm-kettlebell-floor-press-start.webp"
  },
  {
    "id": "one-arm-kettlebell-front-squat",
    "name": "One Arm Kettlebell Front Squat",
    "group": "Quadricipiti",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/one-arm-kettlebell-front-squat-start.webp"
  },
  {
    "id": "one-arm-kettlebell-push-press",
    "name": "One Arm Kettlebell Push Press",
    "group": "Spalle",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/one-arm-kettlebell-push-press-start.webp"
  },
  {
    "id": "one-arm-kettlebell-row",
    "name": "One Arm Kettlebell Row",
    "group": "Dorsali",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/one-arm-kettlebell-row-start.webp"
  },
  {
    "id": "one-arm-kettlebell-shoulder-press",
    "name": "One Arm Kettlebell Shoulder Press",
    "group": "Spalle",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/one-arm-kettlebell-shoulder-press-start.webp"
  },
  {
    "id": "one-arm-kettlebell-swing",
    "name": "One Arm Kettlebell Swing",
    "group": "Quadricipiti",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "full_body",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/one-arm-kettlebell-swing-start.webp"
  },
  {
    "id": "one-arm-kettlebell-tricep-kickback",
    "name": "One-Arm Kettlebell Tricep Kickback",
    "group": "Bicipiti",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/one-arm-kettlebell-tricep-kickback-start.webp"
  },
  {
    "id": "one-arm-landmine-press",
    "name": "One-Arm Landmine Press",
    "group": "Spalle",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/one-arm-landmine-press-start.webp"
  },
  {
    "id": "one-arm-lat-pulldown",
    "name": "One-Arm Lat Pulldown",
    "group": "Dorsali",
    "equipment": "Cavi",
    "raw_equipment": "cable",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/one-arm-lat-pulldown-start.webp"
  },
  {
    "id": "one-arm-single-leg-dumbbell-romanian-deadlift",
    "name": "One-Arm Single-Leg Dumbbell Romanian Deadlift",
    "group": "Quadricipiti",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/one-arm-single-leg-dumbbell-romanian-deadlift-start.webp"
  },
  {
    "id": "one-arm-single-leg-kettlebell-romanian-deadlift",
    "name": "One-Arm Single-Leg Kettlebell Romanian Deadlift",
    "group": "Quadricipiti",
    "equipment": "Kettlebell",
    "raw_equipment": "kettlebell",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/one-arm-single-leg-kettlebell-romanian-deadlift-start.webp"
  },
  {
    "id": "overhead-squat",
    "name": "Overhead Squat",
    "group": "Quadricipiti",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/overhead-squat-start.webp"
  },
  {
    "id": "overhead-tricep-extension",
    "name": "Overhead Tricep Extension",
    "group": "Bicipiti",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/overhead-tricep-extension-start.webp"
  },
  {
    "id": "pause-deadlift",
    "name": "Pause Deadlift",
    "group": "Dorsali",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/deadlift-start.webp"
  },
  {
    "id": "pause-squat",
    "name": "Pause Squat",
    "group": "Quadricipiti",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/squat-start.webp"
  },
  {
    "id": "paused-bench-press",
    "name": "Paused Bench Press",
    "group": "Petto",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/paused-bench-press-start.webp"
  },
  {
    "id": "paused-incline-bench-press",
    "name": "Paused Incline Bench Press",
    "group": "Petto",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/incline-bench-press-start.webp"
  },
  {
    "id": "pec-deck",
    "name": "Pec Deck",
    "group": "Petto",
    "equipment": "Macchinario",
    "raw_equipment": "pec_deck",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/pec-deck-start.webp"
  },
  {
    "id": "pendlay-row",
    "name": "Pendlay Row",
    "group": "Dorsali",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/pendlay-row-start.webp"
  },
  {
    "id": "pike-push-ups",
    "name": "Pike Push Ups",
    "group": "Spalle",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/pike-push-ups-start.webp"
  },
  {
    "id": "pistol-squat",
    "name": "Pistol Squat",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/pistol-squat-start.webp"
  },
  {
    "id": "planche",
    "name": "Planche",
    "group": "Petto",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/planche-main.webp"
  },
  {
    "id": "plank",
    "name": "Plank",
    "group": "Addominali",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/plank-main.webp"
  },
  {
    "id": "plate-pinch",
    "name": "Plate Pinch",
    "group": "Avambracci",
    "equipment": "Macchinario",
    "raw_equipment": "plates",
    "raw_body_part": "lower_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/plate-pinch-start.webp"
  },
  {
    "id": "preacher-curl",
    "name": "Preacher Curl",
    "group": "Bicipiti",
    "equipment": "Bilanciere EZ",
    "raw_equipment": "ez_bar",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/preacher-curl-start.webp"
  },
  {
    "id": "pseudo-planche-push-ups",
    "name": "Pseudo Planche Push Ups",
    "group": "Petto",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/pseudo-planche-push-ups-start.webp"
  },
  {
    "id": "pull-up",
    "name": "Pull-Up",
    "group": "Dorsali",
    "equipment": "Macchinario",
    "raw_equipment": "pull_up_bar",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/pull-up-start.webp"
  },
  {
    "id": "push-jerk",
    "name": "Push Jerk",
    "group": "Quadricipiti",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "full_body",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/push-jerk-start.webp"
  },
  {
    "id": "push-press",
    "name": "Push Press",
    "group": "Spalle",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/push-press-start.webp"
  },
  {
    "id": "push-up",
    "name": "Push-Up",
    "group": "Petto",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/push-up-start.webp"
  },
  {
    "id": "rack-pull",
    "name": "Rack Pull",
    "group": "Dorsali",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/rack-pull-start.webp"
  },
  {
    "id": "rear-delt-fly",
    "name": "Rear Delt Fly",
    "group": "Spalle",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/rear-delt-fly-start.webp"
  },
  {
    "id": "reverse-crunches",
    "name": "Reverse Crunches",
    "group": "Addominali",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/reverse-crunches-start.webp"
  },
  {
    "id": "reverse-curl",
    "name": "Reverse Curl",
    "group": "Bicipiti",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/reverse-curl-start.webp"
  },
  {
    "id": "reverse-grip-bent-over-row",
    "name": "Reverse Grip Bent Over Row",
    "group": "Dorsali",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/reverse-grip-bent-over-row-start.webp"
  },
  {
    "id": "reverse-lunge",
    "name": "Reverse Lunge",
    "group": "Quadricipiti",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/reverse-lunge-start.webp"
  },
  {
    "id": "reverse-plank",
    "name": "Reverse Plank",
    "group": "Addominali",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/reverse-plank-main.webp"
  },
  {
    "id": "ring-dead-hang",
    "name": "Ring Dead Hang",
    "group": "Dorsali",
    "equipment": "Macchinario",
    "raw_equipment": "rings",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/ring-dead-hang-main.webp"
  },
  {
    "id": "ring-dips",
    "name": "Ring Dips",
    "group": "Petto",
    "equipment": "Macchinario",
    "raw_equipment": "rings",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/ring-dips-start.webp"
  },
  {
    "id": "ring-face-pull",
    "name": "Ring Face Pull",
    "group": "Dorsali",
    "equipment": "Macchinario",
    "raw_equipment": "rings",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/ring-face-pull-start.webp"
  },
  {
    "id": "rings-inverted-row",
    "name": "Rings Inverted Row",
    "group": "Dorsali",
    "equipment": "Macchinario",
    "raw_equipment": "rings",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/rings-inverted-row-start.webp"
  },
  {
    "id": "romanian-deadlift",
    "name": "Romanian Deadlift",
    "group": "Quadricipiti",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/romanian-deadlift-start.webp"
  },
  {
    "id": "rope-climb",
    "name": "Rope Climb",
    "group": "Dorsali",
    "equipment": "Macchinario",
    "raw_equipment": "climbing_rope",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/rope-climb-main.webp"
  },
  {
    "id": "russian-twist",
    "name": "Russian Twist",
    "group": "Addominali",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/russian-twist-start.webp"
  },
  {
    "id": "scapular-pull-ups",
    "name": "Scapular Pull Ups",
    "group": "Dorsali",
    "equipment": "Macchinario",
    "raw_equipment": "pull_up_bar",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/scapular-pull-ups-start.webp"
  },
  {
    "id": "seated-barbell-overhead-press",
    "name": "Seated Barbell Overhead Press",
    "group": "Spalle",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/seated-barbell-overhead-press-start.webp"
  },
  {
    "id": "seated-calf-raise",
    "name": "Seated Calf Raise",
    "group": "Polpacci",
    "equipment": "Macchinario",
    "raw_equipment": "seated_calf_raise_machine",
    "raw_body_part": "lower_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/seated-calf-raise-start.webp"
  },
  {
    "id": "seated-db-press",
    "name": "Seated Dumbbell Shoulder Press",
    "group": "Spalle",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/seated-db-press-start.webp"
  },
  {
    "id": "seated-dumbbell-curl",
    "name": "Seated Dumbbell Curl",
    "group": "Bicipiti",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/seated-dumbbell-curl-start.webp"
  },
  {
    "id": "seated-dumbbell-lateral-raise",
    "name": "Seated Dumbbell Lateral Raise",
    "group": "Spalle",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/seated-dumbbell-lateral-raise-start.webp"
  },
  {
    "id": "seated-dumbbell-tricep-extension",
    "name": "Seated Dumbbell Tricep Extension",
    "group": "Bicipiti",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/seated-dumbbell-tricep-extension-start.webp"
  },
  {
    "id": "seated-leg-curl",
    "name": "Seated Leg Curl",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "leg_curl",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/seated-leg-curl-start.webp"
  },
  {
    "id": "seated-smith-machine-shoulder-press",
    "name": "Seated Smith Machine Shoulder Press",
    "group": "Spalle",
    "equipment": "Macchinario",
    "raw_equipment": "smith_machine",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/seated-smith-machine-shoulder-press-start.webp"
  },
  {
    "id": "shrug",
    "name": "Barbell Shrug",
    "group": "Spalle",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/shrug-start.webp"
  },
  {
    "id": "side-lunge",
    "name": "Side Lunge",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/side-lunge-start.webp"
  },
  {
    "id": "side-lying-hip-abduction",
    "name": "Side-Lying Hip Abduction",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/side-lying-hip-abduction-start.webp"
  },
  {
    "id": "side-lying-hip-adduction",
    "name": "Side Lying Hip Adduction",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/side-lying-hip-adduction-start.webp"
  },
  {
    "id": "side-plank",
    "name": "Side Plank",
    "group": "Addominali",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/side-plank-main.webp"
  },
  {
    "id": "single-arm-db-row",
    "name": "Single-Arm Dumbbell Row",
    "group": "Dorsali",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/single-arm-db-row-start.webp"
  },
  {
    "id": "single-arm-dumbbell-overhead-tricep-extension",
    "name": "Single-Arm Dumbbell Overhead Tricep Extension",
    "group": "Bicipiti",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/single-arm-dumbbell-overhead-tricep-extension-start.webp"
  },
  {
    "id": "single-leg-glute-bridge",
    "name": "Single Leg Glute Bridge",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/single-leg-glute-bridge-start.webp"
  },
  {
    "id": "single-leg-lying-leg-curl",
    "name": "Single Leg Lying Leg Curl",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "leg_curl",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/single-leg-lying-leg-curl-start.webp"
  },
  {
    "id": "single-leg-romanian-deadlift",
    "name": "Single Leg Romanian Deadlift",
    "group": "Dorsali",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/single-leg-romanian-deadlift-start.webp"
  },
  {
    "id": "sit-ups",
    "name": "Sit-Ups",
    "group": "Addominali",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/sit-ups-start.webp"
  },
  {
    "id": "skull-crusher",
    "name": "Skull Crusher",
    "group": "Bicipiti",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/skull-crusher-start.webp"
  },
  {
    "id": "sled-row",
    "name": "Sled Row",
    "group": "Dorsali",
    "equipment": "Macchinario",
    "raw_equipment": "sled",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/sled-row-start.webp"
  },
  {
    "id": "smith-machine-bench-press",
    "name": "Smith Machine Bench Press",
    "group": "Petto",
    "equipment": "Macchinario",
    "raw_equipment": "smith_machine",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/smith-machine-bench-press-start.webp"
  },
  {
    "id": "smith-machine-bent-over-row",
    "name": "Smith Machine Bent Over Row",
    "group": "Dorsali",
    "equipment": "Macchinario",
    "raw_equipment": "smith_machine",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/smith-machine-bent-over-row-start.webp"
  },
  {
    "id": "smith-machine-bulgarian-split",
    "name": "Smith Machine Bulgarian Split Squat",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "smith_machine",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/smith-machine-bulgarian-split-start.webp"
  },
  {
    "id": "smith-machine-calf-raise",
    "name": "Smith Machine Calf Raise",
    "group": "Polpacci",
    "equipment": "Macchinario",
    "raw_equipment": "smith_machine",
    "raw_body_part": "lower_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/smith-machine-calf-raise-start.webp"
  },
  {
    "id": "smith-machine-incline-bench-press",
    "name": "Smith Machine Incline Bench Press",
    "group": "Petto",
    "equipment": "Macchinario",
    "raw_equipment": "smith_machine",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/smith-machine-incline-bench-press-start.webp"
  },
  {
    "id": "smith-machine-rdl",
    "name": "Smith Machine Romanian Deadlift",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "smith_machine",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/smith-machine-rdl-start.webp"
  },
  {
    "id": "smith-machine-reverse-grip-bent-over-row",
    "name": "Smith Machine Reverse Grip Bent Over Row",
    "group": "Dorsali",
    "equipment": "Macchinario",
    "raw_equipment": "smith_machine",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/smith-machine-reverse-grip-bent-over-row-start.webp"
  },
  {
    "id": "smith-machine-shoulder-press",
    "name": "Smith Machine Shoulder Press",
    "group": "Spalle",
    "equipment": "Macchinario",
    "raw_equipment": "smith_machine",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/smith-machine-shoulder-press-start.webp"
  },
  {
    "id": "smith-machine-shrug",
    "name": "Smith Machine Shrug",
    "group": "Dorsali",
    "equipment": "Macchinario",
    "raw_equipment": "smith_machine",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/smith-machine-shrug-start.webp"
  },
  {
    "id": "smith-machine-squat",
    "name": "Smith Machine Squat",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "smith_machine",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/smith-machine-squat-start.webp"
  },
  {
    "id": "snatch",
    "name": "Snatch",
    "group": "Quadricipiti",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "full_body",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/snatch-start.webp"
  },
  {
    "id": "spider-curl",
    "name": "Spider Curl",
    "group": "Bicipiti",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/spider-curl-start.webp"
  },
  {
    "id": "split-jerk",
    "name": "Split Jerk",
    "group": "Quadricipiti",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "full_body",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/split-jerk-start.webp"
  },
  {
    "id": "split-squat",
    "name": "Split Squat",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/split-squat-start.webp"
  },
  {
    "id": "spoto-press",
    "name": "Spoto Press",
    "group": "Petto",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/spoto-press-start.webp"
  },
  {
    "id": "squat",
    "name": "Barbell Back Squat",
    "group": "Quadricipiti",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/squat-start.webp"
  },
  {
    "id": "stability-ball-hip-bridge",
    "name": "Stability Ball Hip Bridge",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "stability_ball",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/stability-ball-hip-bridge-start.webp"
  },
  {
    "id": "stability-ball-knee-tuck",
    "name": "Stability Ball Knee Tuck",
    "group": "Addominali",
    "equipment": "Macchinario",
    "raw_equipment": "stability_ball",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/stability-ball-knee-tuck-start.webp"
  },
  {
    "id": "stability-ball-push-up",
    "name": "Stability Ball Push-Up",
    "group": "Petto",
    "equipment": "Macchinario",
    "raw_equipment": "stability_ball",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/stability-ball-push-up-start.webp"
  },
  {
    "id": "standing-calf-raise",
    "name": "Standing Calf Raise",
    "group": "Polpacci",
    "equipment": "Macchinario",
    "raw_equipment": "standing_calf_raise_machine",
    "raw_body_part": "lower_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/standing-calf-raise-start.webp"
  },
  {
    "id": "step-ups",
    "name": "Step Ups",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/step-ups-start.webp"
  },
  {
    "id": "stiff-leg-deadlift",
    "name": "Stiff Leg Deadlift",
    "group": "Dorsali",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/stiff-leg-deadlift-start.webp"
  },
  {
    "id": "straight-arm-pulldown",
    "name": "Straight-Arm Pulldown",
    "group": "Dorsali",
    "equipment": "Cavi",
    "raw_equipment": "cable",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/straight-arm-pulldown-start.webp"
  },
  {
    "id": "sumo-deadlift",
    "name": "Sumo Deadlift",
    "group": "Dorsali",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/sumo-deadlift-start.webp"
  },
  {
    "id": "sumo-squat",
    "name": "Sumo Squat",
    "group": "Quadricipiti",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/sumo-squat-start.webp"
  },
  {
    "id": "superman",
    "name": "Superman",
    "group": "Dorsali",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/superman-start.webp"
  },
  {
    "id": "svend-press",
    "name": "Svend Press",
    "group": "Petto",
    "equipment": "Macchinario",
    "raw_equipment": "plates",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/svend-press-start.webp"
  },
  {
    "id": "t-bar-row",
    "name": "T-Bar Row",
    "group": "Dorsali",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/t-bar-row-start.webp"
  },
  {
    "id": "thoracic-bridge",
    "name": "Thoracic Bridge",
    "group": "Addominali",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/thoracic-bridge-main.webp"
  },
  {
    "id": "thruster",
    "name": "Thruster",
    "group": "Spalle",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/thruster-start.webp"
  },
  {
    "id": "toes-to-bar",
    "name": "Toes to Bar",
    "group": "Addominali",
    "equipment": "Macchinario",
    "raw_equipment": "pull_up_bar",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/toes-to-bar-start.webp"
  },
  {
    "id": "tricep-kickback",
    "name": "Dumbbell Tricep Kickback",
    "group": "Bicipiti",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/tricep-kickback-start.webp"
  },
  {
    "id": "tricep-pushdown",
    "name": "Cable Tricep Pushdown",
    "group": "Bicipiti",
    "equipment": "Cavi",
    "raw_equipment": "cable",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/tricep-pushdown-start.webp"
  },
  {
    "id": "trx-bicep-curl",
    "name": "TRX Bicep Curl",
    "group": "Bicipiti",
    "equipment": "Macchinario",
    "raw_equipment": "suspension_trainer",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/trx-bicep-curl-start.webp"
  },
  {
    "id": "trx-chest-press",
    "name": "TRX Chest Press",
    "group": "Petto",
    "equipment": "Macchinario",
    "raw_equipment": "suspension_trainer",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/trx-chest-press-start.webp"
  },
  {
    "id": "trx-face-pull",
    "name": "TRX Face Pull",
    "group": "Spalle",
    "equipment": "Macchinario",
    "raw_equipment": "suspension_trainer",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/trx-face-pull-start.webp"
  },
  {
    "id": "trx-hamstring-curl",
    "name": "TRX Hamstring Curl",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "suspension_trainer",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/trx-hamstring-curl-start.webp"
  },
  {
    "id": "trx-lunge",
    "name": "TRX Lunge",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "suspension_trainer",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/trx-lunge-start.webp"
  },
  {
    "id": "trx-pistol-squat",
    "name": "TRX Pistol Squat",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "suspension_trainer",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/trx-pistol-squat-start.webp"
  },
  {
    "id": "trx-plank",
    "name": "TRX Plank",
    "group": "Addominali",
    "equipment": "Macchinario",
    "raw_equipment": "suspension_trainer",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/trx-plank-main.webp"
  },
  {
    "id": "trx-row",
    "name": "TRX Row",
    "group": "Dorsali",
    "equipment": "Macchinario",
    "raw_equipment": "suspension_trainer",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/trx-row-start.webp"
  },
  {
    "id": "trx-side-plank",
    "name": "TRX Side Plank",
    "group": "Addominali",
    "equipment": "Macchinario",
    "raw_equipment": "suspension_trainer",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/trx-side-plank-main.webp"
  },
  {
    "id": "trx-squat",
    "name": "TRX Squat",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "suspension_trainer",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/trx-squat-start.webp"
  },
  {
    "id": "trx-tricep-extension",
    "name": "TRX Triceps Extension",
    "group": "Bicipiti",
    "equipment": "Macchinario",
    "raw_equipment": "suspension_trainer",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/trx-tricep-extension-start.webp"
  },
  {
    "id": "trx-y-fly",
    "name": "TRX Y-Fly",
    "group": "Spalle",
    "equipment": "Macchinario",
    "raw_equipment": "suspension_trainer",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/trx-y-fly-start.webp"
  },
  {
    "id": "upright-row",
    "name": "Barbell Upright Row",
    "group": "Spalle",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "shoulders",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/upright-row-start.webp"
  },
  {
    "id": "v-bar-lat-pulldown",
    "name": "V-Bar Lat Pulldown",
    "group": "Dorsali",
    "equipment": "Macchinario",
    "raw_equipment": "lat_pulldown_machine",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/v-bar-lat-pulldown-start.webp"
  },
  {
    "id": "v-bar-tricep-pushdown",
    "name": "V-Bar Tricep Pushdown",
    "group": "Bicipiti",
    "equipment": "Cavi",
    "raw_equipment": "cable",
    "raw_body_part": "upper_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/v-bar-tricep-pushdown-start.webp"
  },
  {
    "id": "v-sit",
    "name": "V-Sit",
    "group": "Addominali",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/v-sit-main.webp"
  },
  {
    "id": "v-ups",
    "name": "V Ups",
    "group": "Addominali",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/v-ups-start.webp"
  },
  {
    "id": "walking-lunge",
    "name": "Walking Lunge",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/walking-lunge-start.webp"
  },
  {
    "id": "wall-push-ups",
    "name": "Wall Push Ups",
    "group": "Petto",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/wall-push-ups-start.webp"
  },
  {
    "id": "wall-sit",
    "name": "Wall Sit",
    "group": "Quadricipiti",
    "equipment": "Macchinario",
    "raw_equipment": "",
    "raw_body_part": "upper_legs",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/wall-sit-main.webp"
  },
  {
    "id": "weighted-wall-crunch",
    "name": "Weighted Wall Crunch",
    "group": "Addominali",
    "equipment": "Manubri",
    "raw_equipment": "dumbbell",
    "raw_body_part": "core",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/weighted-wall-crunch-start.webp"
  },
  {
    "id": "wide-grip-bench-press",
    "name": "Wide-Grip Bench Press",
    "group": "Petto",
    "equipment": "Bilanciere",
    "raw_equipment": "barbell",
    "raw_body_part": "chest",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/wide-grip-bench-press-start.webp"
  },
  {
    "id": "wide-grip-pull-ups",
    "name": "Wide Grip Pull Ups",
    "group": "Dorsali",
    "equipment": "Macchinario",
    "raw_equipment": "pull_up_bar",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/wide-grip-pull-ups-start.webp"
  },
  {
    "id": "wide-grip-seated-cable-row",
    "name": "Wide Grip Seated Cable Row",
    "group": "Dorsali",
    "equipment": "Cavi",
    "raw_equipment": "cable",
    "raw_body_part": "back",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/wide-grip-seated-cable-row-start.webp"
  },
  {
    "id": "wrist-roller",
    "name": "Wrist Roller",
    "group": "Avambracci",
    "equipment": "Macchinario",
    "raw_equipment": "wrist_roller",
    "raw_body_part": "lower_arms",
    "image_url": "https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/wrist-roller-main.webp"
  }
];

/**
 * Mappatura rigorosa attrezzatura tra italiano e RepDB per evitare immagini fuorvianti
 */
const STRICT_EQUIPMENT_MAP = {
  'bilanciere': ['barbell', 'ez_bar'],
  'manubri': ['dumbbell'],
  'cavi': ['cable'],
  'macchinario': ['machine', 'lever'],
  'corpo libero': ['bodyweight'],
  'multipower': ['smith'],
  'kettlebell': ['kettlebell'],
  'elastico': ['band'],
  'bilanciere ez': ['ez_bar', 'barbell']
};

/**
 * Mappatura rigorosa muscoli tra italiano e RepDB
 */
const STRICT_MUSCLE_MAP = {
  'petto': ['chest'],
  'dorsali': ['back', 'lats', 'middle_back', 'lower_back', 'traps'],
  'spalle': ['shoulders'],
  'bicipiti': ['biceps', 'upper_arms'],
  'tricipiti': ['triceps', 'upper_arms'],
  'quadricipiti': ['quadriceps', 'upper_legs'],
  'femorali': ['hamstrings', 'upper_legs'],
  'glutei': ['glutes', 'upper_legs'],
  'addominali': ['abdominals', 'core'],
  'polpacci': ['calves', 'lower_legs'],
  'trapezi': ['traps'],
  'lombari': ['lower_back']
};

/**
 * Normalizza il gruppo muscolare per il matching anatomico
 */
export function normalizeMuscleGroup(rawGroup) {
  if (!rawGroup) return 'Generico';
  const g = rawGroup.trim().toLowerCase();
  
  if (g.includes('pett') || g.includes('chest')) return 'Petto';
  if (g.includes('dors') || g.includes('schiena') || g.includes('back') || g.includes('lat')) return 'Dorsali';
  if (g.includes('spall') || g.includes('deltoid') || g.includes('shoulder')) return 'Spalle';
  if (g.includes('bicip') || g.includes('bicep')) return 'Bicipiti';
  if (g.includes('tricip') || g.includes('tricep')) return 'Tricipiti';
  if (g.includes('quadr') || g.includes('quad') || g.includes('leg')) return 'Quadricipiti';
  if (g.includes('femor') || g.includes('hamstring') || g.includes('ischio')) return 'Femorali';
  if (g.includes('glut') || g.includes('glute')) return 'Glutei';
  if (g.includes('addom') || g.includes('core') || g.includes('abs')) return 'Addominali';
  if (g.includes('polp') || g.includes('calf') || g.includes('calves')) return 'Polpacci';
  if (g.includes('trap') || g.includes('shrug')) return 'Trapezi';
  if (g.includes('lomb') || g.includes('lower back')) return 'Lombari';
  if (g.includes('avambr') || g.includes('forearm')) return 'Avambracci';

  return 'Generico';
}

/**
 * Trova un esercizio RepDB SOLO SE c'è corrispondenza REALE E RIGOROSA su:
 * 1. Attrezzatura (es. Cavi vs Cavi, Manubri vs Manubri)
 * 2. Gruppo Muscolare (es. Petto vs Petto)
 * 3. Nome / Azione del movimento (Punteggio >= 5 per evitare associazioni errate)
 * Se non c'è una corrispondenza esatta, restituisce NULL lasciando l'esercizio senza illustrazione visiva.
 */
export function findMatchingRepDBExercise(inputName, targetEquipment, targetMuscleGroup) {
  if (!inputName || typeof inputName !== 'string') return null;

  const normInput = inputName.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').trim();
  const keywords = normInput.split(/\s+/).filter(k => k.length > 2);
  if (keywords.length === 0) return null;

  const normEquip = (targetEquipment || '').toLowerCase().trim();
  const normMuscle = (targetMuscleGroup || '').toLowerCase().trim();

  const allowedRepdbEquip = STRICT_EQUIPMENT_MAP[normEquip] || null;
  const allowedRepdbMuscles = STRICT_MUSCLE_MAP[normMuscle] || null;

  let bestMatch = null;
  let maxScore = 0;

  for (const item of REPDB_FULL_CATALOG) {
    // 1. FILTRO RIGOROSO ATTREZZATURA: Se l'esercizio richiede Cavi e RepDB è corpo libero/manubri -> SCARTA!
    if (allowedRepdbEquip && !allowedRepdbEquip.some(eq => item.raw_equipment && item.raw_equipment.includes(eq))) {
      continue;
    }

    // 2. FILTRO RIGOROSO MUSCOLO: Se l'esercizio è per Petto e RepDB è Dorsali -> SCARTA!
    if (allowedRepdbMuscles && !allowedRepdbMuscles.some(m => item.raw_body_part && item.raw_body_part.includes(m))) {
      continue;
    }

    // 3. Punteggio parole chiave del nome del movimento
    const itemNorm = (item.id + ' ' + item.name).toLowerCase().replace(/-/g, ' ');
    let score = 0;

    for (const kw of keywords) {
      if (itemNorm.includes(kw)) {
        score += kw.length > 4 ? 3 : 2;
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestMatch = item;
    }
  }

  // Richiede un punteggio di confidenza minimo di 5 per garantire che l'associazione sia VERA e CORRETTA
  return maxScore >= 5 ? bestMatch : null;
}

/**
 * Arricchisce e unifica qualsiasi esercizio con metadati, sinonimi, illustrazioni 2D/3D RepDB e Anatomia
 */
export function getEnrichedExercise(exerciseObjOrName) {
  if (!exerciseObjOrName) return null;

  const inputName = typeof exerciseObjOrName === 'string' 
    ? exerciseObjOrName 
    : (exerciseObjOrName.name || '');

  const normInput = inputName.trim().toLowerCase();
  const rawGroup = typeof exerciseObjOrName === 'object' 
    ? (exerciseObjOrName.primary_muscle_group || exerciseObjOrName.muscle || '') 
    : '';
  const rawEquipment = typeof exerciseObjOrName === 'object' 
    ? (exerciseObjOrName.equipment || '') 
    : '';

  // 1. Cerca corrispondenza RIGOROSA per nome esatto o per alias nella libreria master
  const matched = EXERCISE_LIBRARY.find(item => 
    item.name.toLowerCase() === normInput ||
    (item.aliases && item.aliases.some(a => a.toLowerCase() === normInput))
  );

  const baseObj = typeof exerciseObjOrName === 'object' ? exerciseObjOrName : { name: inputName };

  if (matched) {
    const img0 = matched.image_url;
    const img1 = img0 ? (img0.includes('-start.webp') ? img0.replace('-start.webp', '-peak.webp') : img0) : null;
    return {
      ...baseObj,
      id: baseObj.id || matched.name.toLowerCase().replace(/\s+/g, '-'),
      name: baseObj.name || matched.name,
      equipment: baseObj.equipment || matched.equipment,
      primary_muscle_group: matched.primary_muscle_group,
      muscle: matched.primary_muscle_group,
      secondary_muscles: matched.secondary_muscles || [],
      movement_pattern: matched.movement_pattern || 'Generico',
      default_rest_time: baseObj.default_rest_time || matched.default_rest_time || 90,
      image_url: img0,
      images: img0 ? (img1 && img1 !== img0 ? [img0, img1] : [img0]) : [],
      description: matched.description,
      setup: matched.setup
    };
  }

  // 2. Matching Dinamico RepDB (solo se la corrispondenza è vera, corretta e verificata a 3 vie)
  const normMuscle = normalizeMuscleGroup(rawGroup || normInput);
  const repdbMatch = findMatchingRepDBExercise(inputName, rawEquipment, normMuscle);

  const fallbackImg = baseObj.image_url || (repdbMatch ? repdbMatch.image_url : null);
  const fallbackImg1 = fallbackImg ? (fallbackImg.includes('-start.webp') ? fallbackImg.replace('-start.webp', '-peak.webp') : fallbackImg) : null;

  return {
    ...baseObj,
    id: baseObj.id || normInput.replace(/\s+/g, '-'),
    name: baseObj.name || inputName || 'Esercizio',
    equipment: baseObj.equipment || (repdbMatch ? repdbMatch.equipment : 'Macchinario'),
    primary_muscle_group: normMuscle,
    muscle: normMuscle,
    secondary_muscles: baseObj.secondary_muscles || [],
    movement_pattern: baseObj.movement_pattern || 'Esecuzione Controllata',
    default_rest_time: baseObj.default_rest_time || 90,
    image_url: fallbackImg,
    images: fallbackImg ? (fallbackImg1 && fallbackImg1 !== fallbackImg ? [fallbackImg, fallbackImg1] : [fallbackImg]) : [],
    description: baseObj.description || `Esercizio specifico focalizzato sullo sviluppo del gruppo muscolare ${normMuscle}.`,
    setup: baseObj.setup || 'Mantieni una postura stabile con la schiena dritta. Esegui il movimento in modo fluido e controlla sia la fase concentrica che quella eccentrica.'
  };
}

/**
 * Restituisce una lista di esercizi simili (stesso gruppo muscolare o movement pattern)
 */
export function getSimilarExercises(currentEx, availableList = EXERCISE_LIBRARY) {
  const enrichedCurrent = getEnrichedExercise(currentEx);
  if (!enrichedCurrent) return [];
  const currentNameNorm = enrichedCurrent.name.toLowerCase();

  const pool = [...EXERCISE_LIBRARY];
  availableList.forEach(item => {
    if (!pool.some(p => p.name.toLowerCase() === item.name.toLowerCase())) {
      pool.push(getEnrichedExercise(item));
    }
  });

  const candidates = pool.filter(ex => ex.name.toLowerCase() !== currentNameNorm);

  const scored = candidates.map(ex => {
    const enrichedCandidate = getEnrichedExercise(ex);
    let score = 0;
    if (enrichedCandidate.primary_muscle_group === enrichedCurrent.primary_muscle_group) {
      score += 10;
    }
    if (enrichedCandidate.movement_pattern === enrichedCurrent.movement_pattern) {
      score += 5;
    }
    if (enrichedCandidate.equipment !== enrichedCurrent.equipment) {
      score += 2;
    }
    return { exercise: enrichedCandidate, score };
  });

  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(item => item.exercise);
}

export const EQUIPMENT_TYPES = [
  'Bilanciere',
  'Manubri',
  'Corpo Libero',
  'Cavi',
  'Macchinario',
  'Multipower',
  'Kettlebell',
  'Elastico',
  'Bilanciere EZ'
];

export const MUSCLE_GROUPS = [
  'Petto',
  'Dorsali',
  'Spalle',
  'Bicipiti',
  'Tricipiti',
  'Quadricipiti',
  'Femorali',
  'Glutei',
  'Addominali',
  'Polpacci',
  'Trapezi',
  'Lombari',
  'Avambracci'
];

export const MUSCLE_COLORS = {
  'Petto': '#EF4444',
  'Dorsali': '#3B82F6',
  'Spalle': '#F59E0B',
  'Bicipiti': '#10B981',
  'Tricipiti': '#8B5CF6',
  'Quadricipiti': '#EC4899',
  'Femorali': '#6366F1',
  'Glutei': '#F43F5E',
  'Addominali': '#06B6D4',
  'Polpacci': '#84CC16',
  'Trapezi': '#D97706',
  'Lombari': '#64748B',
  'Avambracci': '#14B8A6',
  'Generico': '#94A3B8'
};
