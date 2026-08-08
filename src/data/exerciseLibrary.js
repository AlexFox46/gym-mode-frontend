/**
 * LIBRERIA MASTER ESERCIZI GYMMODE - 100% RepDB Verificata & Deduplicata
 * 
 * Ogni esercizio contiene:
 * - Nome univoco ed alias/sinonimi estesi per la ricerca intelligente
 * - Doppia immagine di esecuzione WebP 512px (start pose & peak pose RepDB)
 * - Mappatura rigorosa per il BodyHighlighterSVG (Slide 2)
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
    description: 'Esercizio fondamentale di spinta orizzontale per lo sviluppo del gran pettorale, deltoidi anteriori e tricipiti.',
    setup: 'Sdraiati sulla panca con 5 punti di appoggio (piedi, glutei, spalle, testa). Adduci e deprimi le scapole. Impugna il bilanciere poco più largo delle spalle. Scendi controllato portando la sbarra a sfiorare lo sterno, poi spingi verso l'alto mantenendo l'arco fisiologico.'
  },
  {
    name: 'Panca Inclinata Bilanciere',
    aliases: ["panca inclinata", "incline bench press", "panca inclinata bilanciere"],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Petto',
    secondary_muscles: ["Spalle", "Tricipiti"],
    movement_pattern: 'Spinta Orizzontale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/incline-bench-press-start.webp',
    description: 'Variante della panca piana focalizzata sui fasci clavicolari (petto alto) e deltoide anteriore.',
    setup: 'Imposta la panca a 30°-45°. Mantieni le scapole adotte e depresse. Abbassa il bilanciere fino alla parte alta del petto (sotto le clavicole) e spingi estendendo le braccia senza perdere l'assetto scapolare.'
  },
  {
    name: 'Panca Reclinata Bilanciere',
    aliases: ["panca declinata bilanciere", "decline barbell bench press", "panca declinata"],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Petto',
    secondary_muscles: ["Tricipiti", "Spalle"],
    movement_pattern: 'Spinta Orizzontale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/decline-bench-press-start.webp',
    description: 'Variante della panca piana eseguita su panca reclinata per il massimo reclutamento dei fasci inferiori del pettorale.',
    setup: 'Posizionati sulla panca reclinata bloccando le caviglie. Impugna il bilanciere a larghezza spalle, abbassalo controllato alla parte bassa dello sterno e spingi.'
  },
  {
    name: 'Spinte Panca Inclinata Manubri',
    aliases: ["spinte manubri inclinata", "incline dumbbell press", "spinte panca 30 manubri"],
    equipment: 'Manubri',
    primary_muscle_group: 'Petto',
    secondary_muscles: ["Spalle", "Tricipiti"],
    movement_pattern: 'Spinta Orizzontale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/incline-db-press-start.webp',
    description: 'Ottimo esercizio per il petto alto con ampio ROM (Range of Motion) e lavoro stabilizzatore con manubri.',
    setup: 'Panca a 30°. Porta i manubri sulle ginocchia e spingiti indietro per posizionarli al petto. Spingi verso l'alto convergenti senza far toccare i manubri. Mantieni i gomiti leggermente chiusi (a circa 45° rispetto al busto).'
  },
  {
    name: 'Spinte Panca Piana Manubri',
    aliases: ["spinte manubri piana", "dumbbell bench press", "spinte piana manubri"],
    equipment: 'Manubri',
    primary_muscle_group: 'Petto',
    secondary_muscles: ["Tricipiti", "Spalle"],
    movement_pattern: 'Spinta Orizzontale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/db-bench-press-start.webp',
    description: 'Spinta per il gran pettorale con massimo allungamento e libertà di movimento articolare per le spalle.',
    setup: 'Sdraiati con un manubrio per mano. Gomiti a 45° dal busto, petto ben in fuori. Scendi flettendo i gomiti finché avverti un buon allungamento del petto, poi spingi estendendo le braccia.'
  },
  {
    name: 'Croci ai Cavi',
    aliases: ["croci cavi alti", "cable flyes", "cable crossover", "croci ai cavi alti"],
    equipment: 'Cavi',
    primary_muscle_group: 'Petto',
    secondary_muscles: ["Spalle"],
    movement_pattern: 'Isolamento',
    default_rest_time: 75,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/cable-fly-start.webp',
    description: 'Esercizio di isolamento a tensione continua per il pettorale in accorciamento e allungamento.',
    setup: 'Posiziona i carrelli dei cavi in alto o ad altezza spalle. Fai un passo in avanti mantenendo un piede avanzato per stabilità. Busto leggermente inclinato, gomiti semiflessi. Chiudi le braccia davanti a te come nell'atto di abbracciare un tronco.'
  },
  {
    name: 'Croci Manubri Panca Piana',
    aliases: ["croci manubri", "dumbbell flyes", "flat dumbbell fly", "croci su panca piana"],
    equipment: 'Manubri',
    primary_muscle_group: 'Petto',
    secondary_muscles: ["Spalle"],
    movement_pattern: 'Isolamento',
    default_rest_time: 75,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/db-fly-start.webp',
    description: 'Esercizio di isolamento in allungamento per i pettorali con manubri.',
    setup: 'Sdraiati su panca piana con i manubri sopra il petto. Apri le braccia a semicerchio mantenendo i gomiti leggermente flessi finché avverti allungamento, poi richiudi.'
  },
  {
    name: 'Chest Press',
    aliases: ["chest press machine", "macchina petto", "chest press cavi"],
    equipment: 'Macchinario',
    primary_muscle_group: 'Petto',
    secondary_muscles: ["Tricipiti", "Spalle"],
    movement_pattern: 'Spinta Orizzontale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/cable-chest-press-start.webp',
    description: 'Spinta guidata per il pettorale, ideale per lavorare in sicurezza con carichi elevati o a cedimento.',
    setup: 'Regola l'altezza del sedile affinché le impugnature si trovino all'altezza della parte media del petto. Appoggia bene la schiena allo schienale, deprimi le scapole e spingi le impugnature in avanti in modo controllato.'
  },
  {
    name: 'Dip alle Parallele',
    aliases: ["dips", "dip petto", "parallel bar dips", "chest dips"],
    equipment: 'Corpo Libero',
    primary_muscle_group: 'Petto',
    secondary_muscles: ["Tricipiti", "Spalle"],
    movement_pattern: 'Spinta Verticale',
    default_rest_time: 120,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/dips-start.webp',
    description: 'Esercizio a corpo libero multiarticolare per la parte inferiore del petto, deltoidi anteriori e tricipiti.',
    setup: 'Impugna le barre parallele ed estendi le braccia. Per enfatizzare il petto, inclina il busto leggermente in avanti a 30° e piega le ginocchia. Scendi finché i gomiti formano un angolo di 90°, poi spingi con forza per tornare alla posizione iniziale.'
  },
  {
    name: 'Push-Up / Piegamenti',
    aliases: ["flessioni", "pushups", "piegamenti sulle braccia", "push up"],
    equipment: 'Corpo Libero',
    primary_muscle_group: 'Petto',
    secondary_muscles: ["Tricipiti", "Addominali", "Spalle"],
    movement_pattern: 'Spinta Orizzontale',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/push-up-start.webp',
    description: 'Esercizio a corpo libero per la forza ed il controllo motorio di pettorali, tricipiti e core.',
    setup: 'Mani a terra poco più larghe delle spalle, corpo in plank rigido (glutei e addominali contratti). Scendi sfiorando il pavimento con il petto mantenendo i gomiti a 45° rispetto al busto, poi spingi estendendo le braccia.'
  },
  {
    name: 'Panca Piana Multipower',
    aliases: ["panca piana smith machine", "smith bench press", "multipower bench press"],
    equipment: 'Multipower',
    primary_muscle_group: 'Petto',
    secondary_muscles: ["Tricipiti", "Spalle"],
    movement_pattern: 'Spinta Orizzontale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/smith-machine-bench-press-start.webp',
    description: 'Spinta su panca a traiettoria guidata per il pettorale, permette massimo focus sulla contrazione muscolare.',
    setup: 'Posiziona la panca al centro del Multipower in modo che il bilanciere scenda sulla parte media del petto. Sblocca la barra, scendi controllato e spingi con forza adducendo le scapole.'
  },
  {
    name: 'Pullover con Manubrio',
    aliases: ["pullover manubrio", "dumbbell pullover", "pullover petto dorsali"],
    equipment: 'Manubri',
    primary_muscle_group: 'Petto',
    secondary_muscles: ["Dorsali", "Tricipiti"],
    movement_pattern: 'Trazione Orizzontale',
    default_rest_time: 75,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/db-pullover-start.webp',
    description: 'Esercizio per l'espansione toracica che sollecita il pettorale e il gran dorsale.',
    setup: 'Sdraiati traversale sulla panca poggiando solo la parte alta delle spalle. Impugna un manubrio a due mani, abbassalo dietro la testa sfiorando l'allungamento e riportalo sopra il petto.'
  },
  {
    name: 'Trazioni alla Sbarra',
    aliases: ["pull up", "pullups", "trazioni pronazione", "trazioni alla sbarra pronate"],
    equipment: 'Corpo Libero',
    primary_muscle_group: 'Dorsali',
    secondary_muscles: ["Bicipiti", "Spalle"],
    movement_pattern: 'Trazione Verticale',
    default_rest_time: 120,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/pull-up-start.webp',
    description: 'Esercizio Re del dorso per lo sviluppo del gran dorsale e della larghezza della schiena.',
    setup: 'Afferra la sbarra con presa pronata (palmi in avanti) poco più larga delle spalle. Parti da braccia estese, deprimi le scapole e trazionati verso l'alto portando il mento oltre la sbarra.'
  },
  {
    name: 'Lat Machine Avanti',
    aliases: ["lat machine", "lat pulldown", "trazioni lat machine", "lat machine presa larga"],
    equipment: 'Cavi',
    primary_muscle_group: 'Dorsali',
    secondary_muscles: ["Bicipiti", "Spalle"],
    movement_pattern: 'Trazione Verticale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/lat-pulldown-start.webp',
    description: 'Fondamentale esercizio di trazione verticale ai cavi per lo sviluppo in larghezza del gran dorsale.',
    setup: 'Regola i rulli fermagambe. Impugna la sbarra con presa pronata larga. Busto leggermente inclinato all'indietro (15°), petto ben in fuori. Tira la sbarra verso la parte alta del petto guidando con i gomiti verso il basso.'
  },
  {
    name: 'Pulley Basso',
    aliases: ["pulley", "seated cable row", "rematore al cavo basso", "pulley cavo basso"],
    equipment: 'Cavi',
    primary_muscle_group: 'Dorsali',
    secondary_muscles: ["Bicipiti", "Spalle", "Trapezi"],
    movement_pattern: 'Trazione Orizzontale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/wide-grip-seated-cable-row-start.webp',
    description: 'Esercizio di trazione orizzontale a tensione continua per lo spessore del dorsale e muscoli romboidi.',
    setup: 'Siediti sulla macchina con le ginocchia leggermente flesse e piedi ben piantati sulle pedane. Impugna il manipolo, mantieni la schiena con le curvature fisiologiche e tira l'impugnatura verso l'ombelico chiudendo le scapole.'
  },
  {
    name: 'Rematore con Bilanciere',
    aliases: ["rematore bilanciere", "bent over barbell row", "barbell row"],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Dorsali',
    secondary_muscles: ["Bicipiti", "Spalle", "Trapezi"],
    movement_pattern: 'Trazione Orizzontale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/barbell-row-start.webp',
    description: 'Multiarticolare fondamentale per lo spessore e la densità muscolare di tutta la schiena.',
    setup: 'Fletti il busto a circa 45°, schiena dritta e core ben saldo. Impugna il bilanciere a larghezza spalle. Tira la sbarra verso la parte bassa dell'addome guidando con i gomiti in alto e indietro.'
  },
  {
    name: 'Rematore con Manubrio',
    aliases: ["rematore un braccio manubrio", "one arm dumbbell row", "rematore manubrio"],
    equipment: 'Manubri',
    primary_muscle_group: 'Dorsali',
    secondary_muscles: ["Bicipiti", "Spalle"],
    movement_pattern: 'Trazione Orizzontale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/single-arm-db-row-start.webp',
    description: 'Esercizio unilaterale per il gran dorsale con ampio ROM e lavoro mirato per ciascun lato del corpo.',
    setup: 'Appoggia ginocchio e mano dello stesso lato su una panca piana. Con l'altra mano impugna il manubrio. Tira il manubrio verso il fianco portando il gomito verso l'alto e spremendo il dorsale in contrazione.'
  },
  {
    name: 'Rematore T-Bar',
    aliases: ["t-bar row", "rematore a t", "tbar row"],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Dorsali',
    secondary_muscles: ["Bicipiti", "Spalle"],
    movement_pattern: 'Trazione Orizzontale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/t-bar-row-start.webp',
    description: 'Esercizio fondamentale per lo spessore della schiena e dei dorsali.',
    setup: 'Posizionati sopra la barra T-Bar, fletti il busto a 45° mantenendo la schiena dritta. Tira la barra verso l'addome adducendo bene le scapole.'
  },
  {
    name: 'Stacco da Terra',
    aliases: ["stacco", "deadlift", "barbell deadlift", "stacco convenzionale"],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Dorsali',
    secondary_muscles: ["Femorali", "Glutei", "Trapezi", "Quadricipiti"],
    movement_pattern: 'Hinge (Cerniera Anca)',
    default_rest_time: 180,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/deadlift-start.webp',
    description: 'Il re degli esercizi di forza e catena posteriore, stimola schiena, glutei, femorali e core.',
    setup: 'Posizionati con il bilanciere sopra la metà del piede. Afferra la sbarra a larghezza spalle. Abbassa le anche, adduci le scapole, petto in fuori e spingi con le gambe estendendo contemporaneamente anca e ginocchia.'
  },
  {
    name: 'Scrollate con Manubri (Shrugs)',
    aliases: ["scrollate manubri", "dumbbell shrugs", "shrugs", "scrollate trapezi"],
    equipment: 'Manubri',
    primary_muscle_group: 'Trapezi',
    secondary_muscles: ["Dorsali"],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/db-shrug-start.webp',
    description: 'Esercizio d'isolamento per lo sviluppo e l'ipertrofia del trapezio superiore.',
    setup: 'In piedi con un manubrio per mano lungo i fianchi. Eleva le spalle verso le orecchie in modo verticale senza ruotare le articolazioni.'
  },
  {
    name: 'Military Press',
    aliases: ["lento avanti", "overhead press", "ohp", "military press bilanciere"],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Spalle',
    secondary_muscles: ["Tricipiti", "Petto"],
    movement_pattern: 'Spinta Verticale',
    default_rest_time: 120,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/ohp-start.webp',
    description: 'Esercizio fondamentale di spinta verticale in piedi per le spalle e la stabilità del core.',
    setup: 'Bilanciere in appoggio sulle clavicole. Impugnatura poco più larga delle spalle. Glutei e addominali ben contratti. Spingi la sbarra verticalmente sopra la testa estendendo completamente le braccia.'
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
    description: 'Famosa variante di spinta per le spalle ideata da Arnold Schwarzenegger con rotazione del polso per stimolare tutti e tre i fasci del deltoide.',
    setup: 'Seduto con panca a 90°. Parti con i manubri all'altezza del petto e i palmi rivolti verso di te. Durante la spinta ruota i polsi verso l'esterno completando l'estensione in alto.'
  },
  {
    name: 'Spinte Sopra la Testa Manubri',
    aliases: ["spinte manubri spalle", "seated dumbbell press", "lento manubri"],
    equipment: 'Manubri',
    primary_muscle_group: 'Spalle',
    secondary_muscles: ["Tricipiti"],
    movement_pattern: 'Spinta Verticale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/seated-db-press-start.webp',
    description: 'Spinta verticale per i deltoidi con manubri, garantisce ottimo ROM e stabilità.',
    setup: 'Seduto su panca verticale (80°-90°). Porta i manubri all'altezza delle orecchie con gomiti a 90°. Spingi verso l'alto senza far toccare i manubri in cima e scendi controllato.'
  },
  {
    name: 'Alzate Laterali Manubri',
    aliases: ["alzate laterali", "lateral raises", "side lateral raise"],
    equipment: 'Manubri',
    primary_muscle_group: 'Spalle',
    secondary_muscles: ["Trapezi"],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/lateral-raise-start.webp',
    description: 'Esercizio principe di isolamento per il deltoide laterale per dare larghezza alle spalle.',
    setup: 'In piedi con manubri lungo i fianchi. Eleva le braccia verso l'esterno fino ad arrivare all'altezza delle spalle, con gomiti leggermente flessi e pollice leggermente ruotato verso il basso.'
  },
  {
    name: 'Alzate Laterali ai Cavi',
    aliases: ["alzate laterali cavo", "cable lateral raise"],
    equipment: 'Cavi',
    primary_muscle_group: 'Spalle',
    secondary_muscles: ["Trapezi"],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/cable-lateral-raise-start.webp',
    description: 'Alzate laterali a tensione costante per il deltoide laterale mediante cavo basso.',
    setup: 'Posizionati di fianco al cavo basso. Impugna la maniglia con il braccio opposto e solleva lateralmente fino all'altezza della spalla mantenendo il controllo.'
  },
  {
    name: 'Alzate Frontali Manubri',
    aliases: ["alzate frontali", "front raise", "dumbbell front raise"],
    equipment: 'Manubri',
    primary_muscle_group: 'Spalle',
    secondary_muscles: ["Petto"],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/dumbbell-front-raise-start.webp',
    description: 'Esercizio di isolamento focalizzato sul deltoide anteriore.',
    setup: 'In piedi con manubri poggiati sulle cosce. Solleva un braccio (o entrambi) in avanti fino all'altezza degli occhi mantenendo il gomito quasi disteso.'
  },
  {
    name: 'Face Pull',
    aliases: ["face pull cavi", "facepulls", "facepull"],
    equipment: 'Cavi',
    primary_muscle_group: 'Spalle',
    secondary_muscles: ["Trapezi", "Dorsali"],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/face-pull-start.webp',
    description: 'Fisiosanitario ed estetico: stimola il deltoide posteriore, i rotatori esterni e migliora la postura delle spalle.',
    setup: 'Fissa la corda al cavo alto. Impugna la corda con pollici rivolti all'indietro. Tira la corda verso il viso/fronte aprendo i gomiti all'esterno ed extraruotando le spalle.'
  },
  {
    name: 'Croci Inverse ai Cavi (Rear Delt)',
    aliases: ["deltoidi posteriori cavi", "rear delt fly", "reverse cable fly"],
    equipment: 'Cavi',
    primary_muscle_group: 'Spalle',
    secondary_muscles: ["Dorsali"],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/rear-delt-fly-start.webp',
    description: 'Esercizio di isolamento specifico per il deltoide posteriore e i muscoli interscapolari.',
    setup: 'Incrocia i cavi alti a braccia tese davanti a te. Apri le braccia verso l'esterno e all'indietro concentrando il lavoro sulla parte posteriore della spalla.'
  },
  {
    name: 'Shoulder Press',
    aliases: ["shoulder press macchina", "lever shoulder press", "macchina spalle"],
    equipment: 'Macchinario',
    primary_muscle_group: 'Spalle',
    secondary_muscles: ["Tricipiti"],
    movement_pattern: 'Spinta Verticale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/dumbbell-shoulder-press-start.webp',
    description: 'Spinta guidata per le spalle a macchinario per l'isolamento ed il lavoro in sicurezza.',
    setup: 'Regola il sedile. Impugna le leve all'altezza delle spalle, spingi verso l'alto controllando la discesa senza incassare il collo.'
  },
  {
    name: 'Curl con Bilanciere',
    aliases: ["curl bilanciere", "barbell curl", "biceps barbell curl"],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Bicipiti',
    secondary_muscles: ["Avambracci"],
    movement_pattern: 'Isolamento',
    default_rest_time: 75,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/barbell-curl-start.webp',
    description: 'Esercizio base e fondamentale per la massa e la forza dei bicipiti brachiali.',
    setup: 'In piedi, impugna il bilanciere a larghezza spalle con palmi in avanti (supinazione). Gomiti stretti ai fianchi. Fletti le braccia portando il bilanciere verso le spalle senza oscillare con il busto.'
  },
  {
    name: 'Curl Manubri Alternato',
    aliases: ["curl manubri", "bicep curl", "dumbbell curl", "curl manubri alternato"],
    equipment: 'Manubri',
    primary_muscle_group: 'Bicipiti',
    secondary_muscles: ["Avambracci"],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bicep-curl-start.webp',
    description: 'Classico curl con manubri per lavorare singolarmente sui due bicipiti con supinazione del polso.',
    setup: 'In piedi con un manubrio per mano. Solleva un manubrio alla volta ruotando il polso verso l'esterno durante la salita (supinazione), strizza il bicipite in cima e scendi controllato.'
  },
  {
    name: 'Hammer Curl',
    aliases: ["curl martello", "dumbbell hammer curl", "hammer curls"],
    equipment: 'Manubri',
    primary_muscle_group: 'Bicipiti',
    secondary_muscles: ["Avambracci"],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/hammer-curl-start.webp',
    description: 'Curl a presa neutra per lo sviluppo del brachiale e del brachioradiale (spessore del braccio e avambraccio).',
    setup: 'Impugna i manubri con palmi rivolti l'uno verso l'altro (presa neutra a martello). Fletti i gomiti mantenendo la presa neutra per tutto il movimento.'
  },
  {
    name: 'Curl Panca Inclinata',
    aliases: ["curl manubri panca inclinata", "incline dumbbell curl"],
    equipment: 'Manubri',
    primary_muscle_group: 'Bicipiti',
    secondary_muscles: ["Avambracci"],
    movement_pattern: 'Isolamento',
    default_rest_time: 75,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/incline-db-curl-start.webp',
    description: 'Esercizio in massimo allungamento per il capo lungo del bicipite brachiale.',
    setup: 'Siediti su panca inclinata a 45°-60°. Lascia cadere le braccia all'indietro verticalmente. Fletti i gomiti senza portare in avanti la spalla.'
  },
  {
    name: 'Curl Panca Scott (Preacher Curl)',
    aliases: ["panca scott", "preacher curl", "curl bilanciere sagomato scott"],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Bicipiti',
    secondary_muscles: ["Avambracci"],
    movement_pattern: 'Isolamento',
    default_rest_time: 75,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/preacher-curl-start.webp',
    description: 'Esercizio classico su panca Scott per il massimo isolamento del capo breve del bicipite brachiale.',
    setup: 'Poggia le braccia sul cuscino della panca Scott. Impugna il bilanciere EZ e fletti le avambracci verso l'alto senza staccare i gomiti dal supporto.'
  },
  {
    name: 'Curl Concentrato Manubrio',
    aliases: ["curl concentrato", "concentration curl"],
    equipment: 'Manubri',
    primary_muscle_group: 'Bicipiti',
    secondary_muscles: ["Avambracci"],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/concentration-curl-start.webp',
    description: 'Esercizio d'isolamento che elimina qualsiasi compenso del corpo per il bicipite.',
    setup: 'Seduto su panca con il gomito poggiato contro l'interno coscia. Fletti il manubrio verso la spalla strizzando il bicipite nel punto di massima contrazione.'
  },
  {
    name: 'Curl ai Cavi',
    aliases: ["curl cavo basso", "cable bicep curl", "cable curl"],
    equipment: 'Cavi',
    primary_muscle_group: 'Bicipiti',
    secondary_muscles: ["Avambracci"],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/cable-curl-start.webp',
    description: 'Curl a tensione continua ai cavi per i bicipiti.',
    setup: 'Impugna la barra del cavo basso, gomiti adesi ai fianchi, fletti le braccia mantenendo la tensione costante durante tutto il movimento.'
  },
  {
    name: 'Pushdown Cavi con Corda',
    aliases: ["pushdown corda", "tricep pushdown", "pushdown cavi"],
    equipment: 'Cavi',
    primary_muscle_group: 'Tricipiti',
    secondary_muscles: [],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/tricep-pushdown-start.webp',
    description: 'Esercizio base ai cavi per l'isolamento del tricipite con focus sul capo laterale e medio.',
    setup: 'Impugna la corda al cavo alto. Gomiti bloccati ai lati del costato. Estendi le braccia verso il basso aprendo la corda a fine corsa.'
  },
  {
    name: 'French Press',
    aliases: ["french press panca", "lying triceps extension", "skull crusher"],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Tricipiti',
    secondary_muscles: [],
    movement_pattern: 'Isolamento',
    default_rest_time: 75,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/lying-tricep-extension-start.webp',
    description: 'Esercizio di distensione su panca per lo sviluppo della massa dei tricipiti.',
    setup: 'Sdraiati su panca piana con bilanciere EZ a braccia tese sopra le spalle. Piega i gomiti portando la barra verso la fronte/vertice del capo, poi estendi.'
  },
  {
    name: 'Estensioni Sopra la Testa Manubrio',
    aliases: ["french press manubrio", "overhead triceps extension", "estensioni tricipiti sopra testa"],
    equipment: 'Manubri',
    primary_muscle_group: 'Tricipiti',
    secondary_muscles: [],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/single-arm-dumbbell-overhead-tricep-extension-start.webp',
    description: 'Estensione sopra la testa per sollecitare in massimo allungamento il capo lungo del tricipite.',
    setup: 'Seduto o in piedi. Impugna un manubrio sopra la testa con entrambe le mani (o a un braccio). Abbassa il manubrio dietro il collo flettendo i gomiti e poi riestendi.'
  },
  {
    name: 'Dip su Panca',
    aliases: ["bench dips", "dip tra due panche", "dip panca"],
    equipment: 'Corpo Libero',
    primary_muscle_group: 'Tricipiti',
    secondary_muscles: ["Spalle"],
    movement_pattern: 'Spinta Verticale',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bench-dips-start.webp',
    description: 'Esercizio a corpo libero focalizzato sui tricipiti ed eseguibile ovunque.',
    setup: 'Appoggia le mani sul bordo di una panca dietro la schiena, gambe distese in avanti. Scendi piegando i gomiti fino a 90° e spingi per risalire.'
  },
  {
    name: 'Squat con Bilanciere',
    aliases: ["squat", "barbell squat", "back squat", "squat bilanciere"],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Quadricipiti',
    secondary_muscles: ["Glutei", "Femorali", "Addominali"],
    movement_pattern: 'Spinta Verticale',
    default_rest_time: 120,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/squat-start.webp',
    description: 'Esercizio Re per le gambe e la forza globale del corpo.',
    setup: 'Bilanciere posizionato sui trapezi. Piedi poco più larghi delle spalle con punte leggermente extraruotate. Scendi rompendo il parallelo con le anche tenendo il petto ben in fuori, poi spingi con tutta la pianta del piede.'
  },
  {
    name: 'Hack Squat Macchina',
    aliases: ["hack squat", "hack squat machine"],
    equipment: 'Macchinario',
    primary_muscle_group: 'Quadricipiti',
    secondary_muscles: ["Glutei"],
    movement_pattern: 'Spinta Verticale',
    default_rest_time: 120,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/hack-squat-start.webp',
    description: 'Ottimo macchinario guidato per il lavoro ad alta intensità sui quadricipiti con schiena totalmente supportata.',
    setup: 'Posizionati sullo schienale dell'Hack Squat con le spalle sotto i cuscinetti. Sblocca i fermi e scendi flettendo le ginocchia fin sotto i 90°, poi spingi per risalire.'
  },
  {
    name: 'Front Squat Bilanciere',
    aliases: ["front squat", "squat frontale"],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Quadricipiti',
    secondary_muscles: ["Addominali", "Glutei"],
    movement_pattern: 'Spinta Verticale',
    default_rest_time: 120,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/front-squat-start.webp',
    description: 'Variante di squat con bilanciere posizionato sulle clavicole per una maggiore verticalità del busto e massimo focus sui quadricipiti.',
    setup: 'Appoggia il bilanciere sulle clavicole e sui deltoidi anteriori incrociando le braccia o con presa olimpica. Scendi in accosciata profonda mantenendo i gomiti alti.'
  },
  {
    name: 'Leg Press',
    aliases: ["pressa 45", "leg press machine", "pressa per gambe"],
    equipment: 'Macchinario',
    primary_muscle_group: 'Quadricipiti',
    secondary_muscles: ["Glutei", "Femorali"],
    movement_pattern: 'Spinta Orizzontale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/leg-press-start.webp',
    description: 'Esercizio fondamentale a macchinario per lo sviluppo della massa delle gambe senza carico assiale sulla colonna.',
    setup: 'Siediti sulla pressa con schiena e bacino ben adesi allo schienale. Piedi sulla pedana a larghezza spalle. Sblocca i fermi, scendi piegando le ginocchia fino a 90° e spingi con forza.'
  },
  {
    name: 'Leg Extension',
    aliases: ["leg extension machine", "estensioni gambe"],
    equipment: 'Macchinario',
    primary_muscle_group: 'Quadricipiti',
    secondary_muscles: [],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/leg-extension-start.webp',
    description: 'Esercizio di isolamento puro per i quadricipiti e il retto femorale.',
    setup: 'Regola il rullo sopra le caviglie. Siediti con la schiena appoggiata. Estendi le gambe verso l'alto fino a completare la distensione della ginocchio, mantieni 1 secondo di contrazione di picco e scendi controllato.'
  },
  {
    name: 'Bulgarian Split Squat',
    aliases: ["squat bulgaro", "bulgarian split squat", "split squat"],
    equipment: 'Manubri',
    primary_muscle_group: 'Quadricipiti',
    secondary_muscles: ["Glutei", "Femorali"],
    movement_pattern: 'Spinta Unilaterale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bulgarian-split-squat-start.webp',
    description: 'Esercizio unilaterale eccezionale per lo sviluppo di quadricipiti, glutei ed equilibrio articolare.',
    setup: 'Posiziona il collo di un piede indietro su una panca. Con l'altro piede avanzato, scendi piegando la gamba anteriore fino a formare un angolo di 90°, poi risali.'
  },
  {
    name: 'Affondi Deambulanti',
    aliases: ["affondi manubri", "walking lunges", "affondi in avanzamento"],
    equipment: 'Manubri',
    primary_muscle_group: 'Quadricipiti',
    secondary_muscles: ["Glutei", "Femorali"],
    movement_pattern: 'Spinta Unilaterale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/db-lunge-start.webp',
    description: 'Esercizio dinamico unilaterale per gambe e glutei.',
    setup: 'Fai un passo in avanti e piega entrambe le ginocchia a 90° sfiorando il pavimento con il ginocchio posteriore. Spingi sulla gamba anteriore per fare il passo successivo.'
  },
  {
    name: 'Stacco Rumeno',
    aliases: ["romanian deadlift", "rdl", "stacco gambe semitese"],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Femorali',
    secondary_muscles: ["Glutei", "Dorsali"],
    movement_pattern: 'Hinge (Cerniera Anca)',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/romanian-deadlift-start.webp',
    description: 'Esercizio d'eccellenza per la catena posteriore con focus su femorali e glutei in allungamento.',
    setup: 'Parti in piedi con bilanciere in mano. Fletti leggermente le ginocchia e spingi indietro il bacino facendo scorrere il bilanciere vicino alle cosce fin sotto le ginocchia, avvertendo il massimo allungamento dei femorali, poi risali.'
  },
  {
    name: 'Leg Curl Sdraiato',
    aliases: ["leg curl", "lying leg curl", "leg curl pronato"],
    equipment: 'Macchinario',
    primary_muscle_group: 'Femorali',
    secondary_muscles: ["Polpacci"],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/leg-curl-start.webp',
    description: 'Isolamento fondamentale per i muscoli bicipite femorale, semitendinoso e semimembranoso.',
    setup: 'Sdraiati a pancia in giù sulla macchina con il rullo poggiato sopra il calcagno. Fletti le gambe verso i glutei senza staccare il bacino dal lettino.'
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
    description: 'Il miglior esercizio per la massima ipertrofia e forza del grande gluteo.',
    setup: 'Appoggia le scapole sul bordo di una panca piana con un bilanciere gommato sul bacino. Piedi a terra a larghezza spalle. Spingi con i glutei verso l'alto estendendo completamente l'anca fino ad allineare cosce e busto.'
  },
  {
    name: 'Crunch a Terra',
    aliases: ["crunch addominali", "crunches", "ab crunch"],
    equipment: 'Corpo Libero',
    primary_muscle_group: 'Addominali',
    secondary_muscles: [],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/crunches-start.webp',
    description: 'Esercizio classico per la flessione del busto e la contrazione del retto addominale.',
    setup: 'Sdraiati a terra con le ginocchia flesse. Mani dietro la nuca senza tirare il collo. Stacca le scapole da terra arricciando il busto e contraendo gli addominali.'
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
    description: 'Esercizio isometrico fondamentale per la stabilità del core e la prevenzione del mal di schiena.',
    setup: 'Appoggiati sugli avambracci e sulle punte dei piedi. Mantieni il corpo in una linea retta perfetta tra testa, bacino e talloni con glutei e addome ben serrati.'
  },
  {
    name: 'Leg Raise alla Sbarra',
    aliases: ["hanging leg raise", "sollevamento gambe sbarra", "leg raise sbarra"],
    equipment: 'Corpo Libero',
    primary_muscle_group: 'Addominali',
    secondary_muscles: ["Avambracci"],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/hanging-leg-raise-start.webp',
    description: 'Esercizio avanzato in sospensione per la parte bassa del retto addominale.',
    setup: 'Appenditi alla sbarra con le braccia tese. Solleva le gambe tese (o le ginocchia) in avanti fino a 90° ruotando il bacino verso il petto per ingaggiare gli addominali.'
  },
  {
    name: 'Cable Crunch (Crunch ai Cavi)',
    aliases: ["cable crunch", "crunch cavi", "kneeling cable crunch"],
    equipment: 'Cavi',
    primary_muscle_group: 'Addominali',
    secondary_muscles: [],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/cable-crunch-start.webp',
    description: 'Esercizio a carico progressivo per l'ipertrofia della parete addominale (retto dell'addome).',
    setup: 'Inginocchiati di fronte a un cavo alto con la corda. Impugna le estremità della corda ai lati della testa e arriccia il busto verso il basso contraendo gli addominali.'
  },
  {
    name: 'Ab Sling Fallout',
    aliases: ["ab rollout", "ab wheel fallout", "ruota addominali"],
    equipment: 'Corpo Libero',
    primary_muscle_group: 'Addominali',
    secondary_muscles: ["Dorsali", "Spalle"],
    movement_pattern: 'Anti-Estensione',
    default_rest_time: 75,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/ab-wheel-rollout-start.webp',
    description: 'Esercizio ad altissimo ingaggio della parete addominale per la resistenza anti-estensione della colonna.',
    setup: 'Inginocchiati a terra impugnando le maniglie della ruota (o delle cinghie). Mantieni l'addome contratto ed estendi lentamente il corpo in avanti controllando la discesa.'
  },
  {
    name: 'Calf Raise in Piedi',
    aliases: ["standing calf raise", "polpacci in piedi", "calf raise bilanciere"],
    equipment: 'Macchinario',
    primary_muscle_group: 'Polpacci',
    secondary_muscles: [],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/standing-calf-raise-start.webp',
    description: 'Esercizio di isolamento per il gastrocnemio (polpaccio).',
    setup: 'Posiziona l'avampiede sul gradino con i talloni nel vuoto. Estendi le caviglie spingendo sulle punte dei piedi in alto, mantieni la contrazione in cima e scendi fino al massimo allungamento.'
  },
];

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
  if (g.includes('quadr') || g.includes('quad')) return 'Quadricipiti';
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
      name: matched.name, // Normalizza sempre al nome canonico per evitare duplicati!
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

  // 2. Fallback per esercizi non presenti nella libreria master:
  // Preserva il nome reale senza inventare associazioni errate
  const normMuscle = normalizeMuscleGroup(rawGroup || normInput);
  const fallbackImg = baseObj.image_url || null;
  const fallbackImg1 = fallbackImg ? (fallbackImg.includes('-start.webp') ? fallbackImg.replace('-start.webp', '-peak.webp') : fallbackImg) : null;

  return {
    ...baseObj,
    id: baseObj.id || normInput.replace(/\s+/g, '-'),
    name: baseObj.name || inputName || 'Esercizio',
    equipment: baseObj.equipment || 'Macchinario',
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
