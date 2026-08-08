/**
 * Libreria Esercizi GymMode
 * Database completo di metadati per esercizi da palestra:
 * - Attrezzatura accurata (Bilanciere, Manubri, Cavi, Macchinario, Corpo Libero, Multipower, Kettlebell)
 * - Gruppo muscolare primario e secondario
 * - Guida sintetizzata e didascalica a cos'è l'esercizio e come settarsi
 * - Colori e codici anatomici per diagrammi muscolari
 */

export const EQUIPMENT_TYPES = [
  'Bilanciere',
  'Manubri',
  'Corpo Libero',
  'Cavi',
  'Macchinario',
  'Multipower',
  'Kettlebell'
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
  'Lombari'
];

export const MUSCLE_COLORS = {
  'Petto': '#EF4444',      // Red
  'Dorsali': '#3B82F6',    // Blue
  'Spalle': '#F59E0B',     // Amber
  'Bicipiti': '#10B981',   // Emerald
  'Tricipiti': '#8B5CF6',  // Purple
  'Quadricipiti': '#EC4899',// Pink
  'Femorali': '#6366F1',   // Indigo
  'Glutei': '#F97316',     // Orange
  'Addominali': '#14B8A6', // Teal
  'Polpacci': '#84CC16',   // Lime
  'Lombari': '#06B6D4'     // Cyan
};

export const EXERCISE_LIBRARY = [
  // ---------------------------------------------------------------------------
  // PETTO
  // ---------------------------------------------------------------------------
  {
    name: 'Panca Piana',
    aliases: ['panca piana bilanciere', 'bench press', 'flat bench press'],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Petto',
    secondary_muscles: ['Tricipiti', 'Spalle'],
    movement_pattern: 'Spinta Orizzontale',
    default_rest_time: 120,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bench-press-start.webp',
    description: 'Esercizio fondamentale di spinta orizzontale per lo sviluppo del gran pettorale, deltoidi anteriori e tricipiti.',
    setup: 'Sdraiati sulla panca con 5 punti di appoggio (piedi, glutei, spalle, testa). Adduci e deprimi le scapole. Impugna il bilanciere poco più largo delle spalle. Scendi controllato portando la sbarra a sfiorare lo sterno, poi spingi verso l’alto mantenendo l’arco fisiologico.'
  },
  {
    name: 'Panca Inclinata Bilanciere',
    aliases: ['panca inclinata', 'incline bench press'],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Petto',
    secondary_muscles: ['Spalle', 'Tricipiti'],
    movement_pattern: 'Spinta Orizzontale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/incline-bench-press-start.webp',
    description: 'Variante della panca piana focalizzata sui fasci clavicolari (petto alto) e deltoide anteriore.',
    setup: 'Imposta la panca a 30°-45°. Mantieni le scapole adotte e depresse. Abbassa il bilanciere fino alla parte alta del petto (sotto le clavicole) e spingi estendendo le braccia senza perdere l’assetto scapolare.'
  },
  {
    name: 'Spinte Panca Inclinata Manubri',
    aliases: ['spinte manubri inclinata', 'incline dumbbell press'],
    equipment: 'Manubri',
    primary_muscle_group: 'Petto',
    secondary_muscles: ['Spalle', 'Tricipiti'],
    movement_pattern: 'Spinta Orizzontale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/incline-db-press-start.webp',
    description: 'Ottimo esercizio per il petto alto con ampio ROM (Range of Motion) e lavoro stabilizzatore con manubri.',
    setup: 'Panca a 30°. Porta i manubri sulle ginocchia e spingiti indietro per posizionarli al petto. Spingi verso l’alto convergenti senza far toccare i manubri. Mantieni i gomiti leggermente chiusi (a circa 45° rispetto al busto).'
  },
  {
    name: 'Spinte Panca Piana Manubri',
    aliases: ['spinte manubri piana', 'dumbbell bench press'],
    equipment: 'Manubri',
    primary_muscle_group: 'Petto',
    secondary_muscles: ['Tricipiti', 'Spalle'],
    movement_pattern: 'Spinta Orizzontale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/db-bench-press-start.webp',
    description: 'Spinta per il gran pettorale con massimo allungamento e libertà di movimento articolare per le spalle.',
    setup: 'Sdraiati con un manubrio per mano. Gomiti a 45° dal busto, petto ben in fuori. Scendi flettendo i gomiti finché avverti un buon allungamento del petto, poi spingi estendendo le braccia.'
  },
  {
    name: 'Croci ai Cavi',
    aliases: ['croci cavi alti', 'cable flyes', 'cable crossover'],
    equipment: 'Cavi',
    primary_muscle_group: 'Petto',
    secondary_muscles: ['Spalle'],
    movement_pattern: 'Isolamento',
    default_rest_time: 75,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/cable-fly-start.webp',
    description: 'Esercizio di isolamento a tensione continua per il pettorale in accorciamento e allungamento.',
    setup: 'Posiziona i carrelli dei cavi in alto o ad altezza spalle. Fai un passo in avanti mantenendo un piede avanzato per stabilità. Busto leggermente inclinato, gomiti semiflessi. Chiudi le braccia davanti a te come nell’atto di abbracciare un tronco.'
  },
  {
    name: 'Chest Press',
    aliases: ['chest press machine', 'macchina petto'],
    equipment: 'Macchinario',
    primary_muscle_group: 'Petto',
    secondary_muscles: ['Tricipiti', 'Spalle'],
    movement_pattern: 'Spinta Orizzontale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/cable-chest-press-start.webp',
    description: 'Esercizio guidato di spinta su macchinario, ideale per lavorare in sicurezza e ad alto sforzo muscolare.',
    setup: 'Regola l’altezza del sedile affinché le impugnature si trovino a livello della metà del petto. Poggia la schiena, adduci le scapole e spingi le maniglie in avanti estendendo i gomiti.'
  },
  {
    name: 'Dip alle Parallele',
    aliases: ['dip', 'dips', 'distensioni parallele'],
    equipment: 'Corpo Libero',
    primary_muscle_group: 'Petto',
    secondary_muscles: ['Tricipiti', 'Spalle'],
    movement_pattern: 'Spinta Verticale',
    default_rest_time: 120,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/dips-start.webp',
    description: 'Esercizio multiarticolare a corpo libero ad alta intensità per pettorali bassi e tricipiti.',
    setup: 'Impugna le sbarre parallele ed estendi le braccia. Per enfatizzare il petto, inclina il busto leggermente in avanti e allarga di poco i gomiti durante la discesa. Scendi finché la spalla scende poco sotto il gomito, poi spingi.'
  },
  {
    name: 'Push-Up / Piegamenti',
    aliases: ['push up', 'piegamenti sulle braccia', 'flessioni'],
    equipment: 'Corpo Libero',
    primary_muscle_group: 'Petto',
    secondary_muscles: ['Tricipiti', 'Spalle', 'Addominali'],
    movement_pattern: 'Spinta Orizzontale',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/push-up-start.webp',
    description: 'Esercizio fondamentale a corpo libero per la forza ed equilibrio della catena cinetica anteriore.',
    setup: 'Mani a terra alla larghezza delle spalle, corpo in plank rigido con glutei e addome contratti. Scendi portando il petto a pochi centimetri da terra, poi spingi tornando in posizione di partenza.'
  },
  {
    name: 'Panca Piana Multipower',
    aliases: ['panca smith machine', 'panca multipower'],
    equipment: 'Multipower',
    primary_muscle_group: 'Petto',
    secondary_muscles: ['Tricipiti', 'Spalle'],
    movement_pattern: 'Spinta Orizzontale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/smith-machine-bench-press-start.webp',
    description: 'Spinta guidata su guida vincolata per concentrare la tensione sul pettorale escludendo la stabilizzazione.',
    setup: 'Posiziona la panca sotto la barra del multipower al centro dello sterno. Adduci le scapole, sblocca il bilanciere e sfiora il petto durante la fase eccentrica prima di risalire.'
  },

  // ---------------------------------------------------------------------------
  // DORSALI / SCHIENA
  // ---------------------------------------------------------------------------
  {
    name: 'Trazioni alla Sbarra',
    aliases: ['trazioni', 'pull up', 'chin up'],
    equipment: 'Corpo Libero',
    primary_muscle_group: 'Dorsali',
    secondary_muscles: ['Bicipiti', 'Spalle', 'Addominali'],
    movement_pattern: 'Trazione Verticale',
    default_rest_time: 120,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/pull-up-start.webp',
    description: 'Esercizio regina a corpo libero per la larghezza e lo spessore del gran dorsale e muscoli della schiena.',
    setup: 'Afferra la sbarra con presa prona poco più larga delle spalle. Inizia il movimento abbassando le scapole (depressione), poi tira il corpo verso l’alto portando il mento sopra la sbarra e i gomiti verso i fianchi.'
  },
  {
    name: 'Lat Machine Avanti',
    aliases: ['lat machine', 'lat pulldown'],
    equipment: 'Macchinario',
    primary_muscle_group: 'Dorsali',
    secondary_muscles: ['Bicipiti', 'Spalle'],
    movement_pattern: 'Trazione Verticale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/lat-pulldown-start.webp',
    description: 'Trazione guidata verticale essenziale per sviluppare la larghezza del dorsale e il controllo scapolare.',
    setup: 'Regola il blocco cosce. Afferra la sbarra larga. Siediti, petto in fuori e busto leggermente inclinato indietro. Tira la sbarra fino al petto portando i gomiti verso il basso e indietro.'
  },
  {
    name: 'Pulley Basso',
    aliases: ['seated cable row', 'pulley', 'rematore ai cavi'],
    equipment: 'Cavi',
    primary_muscle_group: 'Dorsali',
    secondary_muscles: ['Bicipiti', 'Spalle', 'Lombari'],
    movement_pattern: 'Trazione Orizzontale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/wide-grip-seated-cable-row-start.webp',
    description: 'Remata al cavo basso per stimolare spessore del dorsale, trapezi medi/inferiori e romboidi.',
    setup: 'Siediti con le ginocchia leggermente flesse. Afferra la maniglia. Mantieni la schiena dritta e il petto aperto. Tira la maniglia verso l’addome chiudendo le scapole indietro.'
  },
  {
    name: 'Rematore con Bilanciere',
    aliases: ['rematore bilanciere', 'bent over row', 'barbell row'],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Dorsali',
    secondary_muscles: ['Bicipiti', 'Lombari'],
    movement_pattern: 'Trazione Orizzontale',
    default_rest_time: 100,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/barbell-row-start.webp',
    description: 'Fondamentale multiarticolare di trazione per costruire densità e spessore in tutta la schiena.',
    setup: 'Fletti le ginocchia e inclina il busto in avanti a 45° mantenendo la schiena neutra. Afferra il bilanciere e tiralo verso l’ombelico spingendo i gomiti indietro.'
  },
  {
    name: 'Rematore con Manubrio',
    aliases: ['rematore manubrio', 'single arm dumbbell row'],
    equipment: 'Manubri',
    primary_muscle_group: 'Dorsali',
    secondary_muscles: ['Bicipiti', 'Spalle'],
    movement_pattern: 'Trazione Orizzontale',
    default_rest_time: 75,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/single-arm-db-row-start.webp',
    description: 'Remata unilaterale per correggere asimmetrie ed enfatizzare l’allungamento del gran dorsale.',
    setup: 'Poggia ginocchio e mano omologa sulla panca. Mantieni il busto parallelo al suolo. Tira il manubrio verso l’anca spingendo il gomito indietro verso il soffitto.'
  },
  {
    name: 'Stacco da Terra',
    aliases: ['stacco', 'deadlift', 'barbell deadlift'],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Dorsali',
    secondary_muscles: ['Glutei', 'Femorali', 'Lombari', 'Quadricipiti'],
    movement_pattern: 'Cerniera Anca',
    default_rest_time: 150,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/deadlift-start.webp',
    description: 'Esercizio fondamentale di forza globale che coinvolge l’intera catena cinetica posteriore.',
    setup: 'Posizionati con i piedi a larghezza bacino e il bilanciere a contatto con le tibie. Afferra il bilanciere, compatti i dorsali, alza il petto e spingi via il pavimento estendendo anche e ginocchia in simultanea.'
  },

  // ---------------------------------------------------------------------------
  // SPALLE / DELTOIDI
  // ---------------------------------------------------------------------------
  {
    name: 'Military Press',
    aliases: ['overhead press', 'lento avanti bilanciere', 'ohp'],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Spalle',
    secondary_muscles: ['Tricipiti', 'Addominali'],
    movement_pattern: 'Spinta Verticale',
    default_rest_time: 120,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/ohp-start.webp',
    description: 'Spinta verticale fondamentale in piedi per forza e massa dei deltoidi e stabilità del core.',
    setup: 'Bilanciere appoggiato sulla parte alta del petto, presa poco più larga delle spalle. Contrai addome e glutei. Spingi il bilanciere verticalmente sopra la testa estendendo completamente le braccia.'
  },
  {
    name: 'Spinte Sopra la Testa Manubri',
    aliases: ['lento avanti manubri', 'dumbbell shoulder press'],
    equipment: 'Manubri',
    primary_muscle_group: 'Spalle',
    secondary_muscles: ['Tricipiti'],
    movement_pattern: 'Spinta Verticale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/seated-db-press-start.webp',
    description: 'Spinta da seduto per i deltoidi antero-laterali con ampio range di movimento e lavoro bilanciato.',
    setup: 'Panca a 80-90°. Porta i manubri ad altezza orecchie con i gomiti sotto i polsi. Spingi verso l’alto finché le braccia sono quasi distese sopra la testa.'
  },
  {
    name: 'Alzate Laterali Manubri',
    aliases: ['alzate laterali', 'dumbbell lateral raise'],
    equipment: 'Manubri',
    primary_muscle_group: 'Spalle',
    secondary_muscles: ['Spalle'],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/lateral-raise-start.webp',
    description: 'Isolamento specifico per il capo laterale del deltoide per dare ampiezza alle spalle.',
    setup: 'In piedi o da seduto, busto leggermente inclinato in avanti. Solleva i manubri verso l’esterno portando i gomiti ad altezza spalle, mantenendo una leggera flessione del gomito.'
  },
  {
    name: 'Alzate Laterali ai Cavi',
    aliases: ['alzate laterali cavo', 'cable lateral raise'],
    equipment: 'Cavi',
    primary_muscle_group: 'Spalle',
    secondary_muscles: ['Spalle'],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/cable-lateral-raise-start.webp',
    description: 'Alzate laterali al cavo basso per mantenere costante la tensione muscolare in tutto il ROM.',
    setup: 'Fissa il cavo in basso. Afferra la maniglia con il braccio opposto. Solleva il braccio verso l’esterno fino all’altezza della spalla controllando la fase di discesa.'
  },
  {
    name: 'Face Pull',
    aliases: ['facepull', 'face pull cavi'],
    equipment: 'Cavi',
    primary_muscle_group: 'Spalle',
    secondary_muscles: ['Dorsali'],
    movement_pattern: 'Trazione Orizzontale',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/face-pull-start.webp',
    description: 'Esercizio fondamentale per la salute della spalla, deltoide posteriore e rotatori esterni.',
    setup: 'Cavo alto con corda. Afferra la corda con i pollici rivolti indietro. Tira verso il viso (altezza occhi) separando le estremità della corda ed extra-ruotando le omeri.'
  },
  {
    name: 'Shoulder Press',
    aliases: ['macchina spalle', 'shoulder press machine'],
    equipment: 'Macchinario',
    primary_muscle_group: 'Spalle',
    secondary_muscles: ['Tricipiti'],
    movement_pattern: 'Spinta Verticale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/dumbbell-shoulder-press-start.webp',
    description: 'Spinta verticale guidata per colpire il deltoide in massima sicurezza e stabilità.',
    setup: 'Regola l’altezza della seduta in modo che le impugnature partano all’altezza delle spalle. Spingi verso l’alto controllando il ritorno.'
  },

  // ---------------------------------------------------------------------------
  // BICIPITI
  // ---------------------------------------------------------------------------
  {
    name: 'Curl con Bilanciere',
    aliases: ['curl bilanciere ez', 'barbell curl', 'ez bar curl'],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Bicipiti',
    secondary_muscles: ['Addominali'],
    movement_pattern: 'Isolamento',
    default_rest_time: 75,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/barbell-curl-start.webp',
    description: 'Classico esercizio di forza per lo sviluppo della massa dei bicipiti brachiali.',
    setup: 'In piedi, impugna il bilanciere (dritto o EZ) a larghezza spalle con palmi in avanti. Gomiti vicini ai fianchi. Fletti i gomiti portando la barra verso le spalle senza oscillare col busto.'
  },
  {
    name: 'Curl Manubri Alternato',
    aliases: ['curl manubri', 'dumbbell curl'],
    equipment: 'Manubri',
    primary_muscle_group: 'Bicipiti',
    secondary_muscles: [],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bicep-curl-start.webp',
    description: 'Esercizio versatile per bicipiti con supinazione del polso durante la fase concentrica.',
    setup: 'In piedi o seduto con un manubrio per mano lungo i fianchi. Fletti un braccio ruotando il palmo verso l’alto (supinazione) mentre sali. Alterna le braccia in modo fluido.'
  },
  {
    name: 'Hammer Curl',
    aliases: ['curl martello', 'hammer curl manubri'],
    equipment: 'Manubri',
    primary_muscle_group: 'Bicipiti',
    secondary_muscles: [],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/hammer-curl-start.webp',
    description: 'Variante con presa neutra (a martello) per sviluppare il brachiale e il brachioradiale (avambraccio).',
    setup: 'Presa neutra con i palmi rivolti verso il corpo. Solleva i manubri mantenendo i pollici in avanti senza ruotare il polso.'
  },
  {
    name: 'Curl Panca Inclinata',
    aliases: ['incline dumbbell curl', 'curl panca 45'],
    equipment: 'Manubri',
    primary_muscle_group: 'Bicipiti',
    secondary_muscles: [],
    movement_pattern: 'Isolamento',
    default_rest_time: 75,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/incline-db-curl-start.webp',
    description: 'Mette in massimo allungamento il capo lungo del bicipite grazie all’estensione della spalla.',
    setup: 'Panca inclinata a 45°-60°. Siediti poggiando completamente la schiena e lascia cadere le braccia all’indietro. Fletti i gomiti mantenendo le spalle ferme indietro.'
  },
  {
    name: 'Curl ai Cavi',
    aliases: ['cable curl', 'curl cavo basso'],
    equipment: 'Cavi',
    primary_muscle_group: 'Bicipiti',
    secondary_muscles: [],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/cable-curl-start.webp',
    description: 'Curl a tensione costante in tutto il range di movimento grazie alla resistenza della carrucola.',
    setup: 'Aggancia la barra dritta o sagomata al cavo basso. Mantieni i gomiti fermi lungo le coste e fletti le braccia fino al punto di massima contrazione.'
  },

  // ---------------------------------------------------------------------------
  // TRICIPITI
  // ---------------------------------------------------------------------------
  {
    name: 'Pushdown Cavi con Corda',
    aliases: ['pushdown', 'rope pushdown', 'tricipiti cavo corda'],
    equipment: 'Cavi',
    primary_muscle_group: 'Tricipiti',
    secondary_muscles: [],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/tricep-pushdown-start.webp',
    description: 'Esercizio fondamentale di isolamento per i tricipiti con focus sulla contrazione del capo laterale.',
    setup: 'Cavo alto con corda. Busto leggermente inclinato avanti, gomiti incollati ai fianchi. Spingi la corda verso il basso aprendo le estremità a fine corsa.'
  },
  {
    name: 'French Press',
    aliases: ['skull crusher', 'french press bilanciere ez', 'lying triceps extension'],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Tricipiti',
    secondary_muscles: [],
    movement_pattern: 'Isolamento',
    default_rest_time: 75,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/lying-tricep-extension-start.webp',
    description: 'Esercizio per tricipiti in allungamento su panca, altamente efficace per la massa delle braccia.',
    setup: 'Sdraiati su panca piana con bilanciere EZ. Braccia estese verso il soffitto (inclinati di 15° indietro). Fletti i gomiti portando la sbarra verso la fronte/vertice della testa, poi distendi.'
  },
  {
    name: 'Estensioni Sopra la Testa Manubrio',
    aliases: ['overhead dumbbell triceps extension', 'french press manubrio'],
    equipment: 'Manubri',
    primary_muscle_group: 'Tricipiti',
    secondary_muscles: [],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/single-arm-dumbbell-overhead-tricep-extension-start.webp',
    description: 'Stira e allena in modo specifico il capo lungo del tricipite in posizione di flessione dell’omero.',
    setup: 'Seduto, impugna un manubrio a due mani dietro la testa. Gomiti alti e puntati in avanti. Distendi le braccia spingendo il manubrio verso l’alto.'
  },
  {
    name: 'Dip su Panca',
    aliases: ['bench dips', 'dip panca tricipiti'],
    equipment: 'Corpo Libero',
    primary_muscle_group: 'Tricipiti',
    secondary_muscles: ['Spalle', 'Petto'],
    movement_pattern: 'Spinta Verticale',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/bench-dips-start.webp',
    description: 'Variante accessibile a corpo libero per i tricipiti eseguibile con il supporto di una panca o rialzo.',
    setup: 'Appoggia le mani sul bordo della panca alle spalle del bacino. Gambe distese o piegate davanti a te. Scendi piegando i gomiti a 90° e spingi per risalire.'
  },

  // ---------------------------------------------------------------------------
  // QUADRICIPITI
  // ---------------------------------------------------------------------------
  {
    name: 'Squat con Bilanciere',
    aliases: ['squat', 'back squat', 'barbell squat'],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Quadricipiti',
    secondary_muscles: ['Glutei', 'Femorali', 'Lombari', 'Addominali'],
    movement_pattern: 'Accosciata',
    default_rest_time: 150,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/squat-start.webp',
    description: 'Re degli esercizi per gli arti inferiori per sviluppo muscolare, forza e stabilità sistemica.',
    setup: 'Bilanciere incastrato sui trapezi (High Bar) o deltoidi posteriori (Low Bar). Piedi a larghezza spalle leggermente extracruotati. Scendi piegando ginocchia ed anca infrangendo il parallelo prima di risalire spingendo col centro del piede.'
  },
  {
    name: 'Leg Press',
    aliases: ['pressa 45', 'leg press machine'],
    equipment: 'Macchinario',
    primary_muscle_group: 'Quadricipiti',
    secondary_muscles: ['Glutei', 'Femorali'],
    movement_pattern: 'Accosciata',
    default_rest_time: 100,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/leg-press-start.webp',
    description: 'Accosciata guidata alla pressa per applicare alti carichi sui quadricipiti senza sovraccaricare la colonna.',
    setup: 'Posiziona i piedi sulla pedana a larghezza bacino. Sblocca le sicure. Scendi piegando le ginocchia verso il petto senza staccare l’osso sacro dallo schienale, poi spingi.'
  },
  {
    name: 'Leg Extension',
    aliases: ['leg extension machine', 'macchina quadricipiti'],
    equipment: 'Macchinario',
    primary_muscle_group: 'Quadricipiti',
    secondary_muscles: [],
    movement_pattern: 'Isolamento',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/leg-extension-start.webp',
    description: 'Esercizio di isolamento puro in accorciamento per il retto femorale e i vasti del quadricipite.',
    setup: 'Regola lo schienale per far coincidere il perno della macchina col ginocchio. Rullo sopra le caviglie. Estendi le gambe contraendo al massimo i quadricipiti prima di scendere piano.'
  },
  {
    name: 'Affondi Deambulanti',
    aliases: ['affondi manubri', 'walking lunges', 'affondi'],
    equipment: 'Manubri',
    primary_muscle_group: 'Quadricipiti',
    secondary_muscles: ['Glutei', 'Femorali'],
    movement_pattern: 'Accosciata Unilaterale',
    default_rest_time: 90,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/db-lunge-start.webp',
    description: 'Esercizio dinamico unilaterale eccezionale per equilibrio, quadricipiti e glutei.',
    setup: 'Manubri lungo i fianchi. Fai un passo in avanti e scendi finché il ginocchio posteriore sfiora il suolo formando due angoli a 90°. Spingi col piede anteriore per avanzare col prossimo passo.'
  },

  // ---------------------------------------------------------------------------
  // FEMORALI / GLUTEI
  // ---------------------------------------------------------------------------
  {
    name: 'Stacco Rumeno',
    aliases: ['stacco rumeno bilanciere', 'romanian deadlift', 'rdl'],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Femorali',
    secondary_muscles: ['Glutei', 'Lombari'],
    movement_pattern: 'Cerniera Anca',
    default_rest_time: 100,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/romanian-deadlift-start.webp',
    description: 'Fondamentale per la catena posteriore con focus sull’allungamento dinamico degli ischiocrurali (femorali).',
    setup: 'Parti in piedi con il bilanciere. Mantieni le ginocchia sbloccate ma fisse. Spingi il bacino all’indietro inclinando il busto fino ad avvertire forte tensione sui femorali, poi stringi i glutei per risalire.'
  },
  {
    name: 'Leg Curl Sdraiato',
    aliases: ['lying leg curl', 'leg curl macchinario'],
    equipment: 'Macchinario',
    primary_muscle_group: 'Femorali',
    secondary_muscles: ['Glutei'],
    movement_pattern: 'Isolamento',
    default_rest_time: 75,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/leg-curl-start.webp',
    description: 'Flessione del ginocchio guidata da sdraiato per l’isolamento diretto dei muscoli ischiocrurali.',
    setup: 'Sdraiati a pancia in giù. Posiziona il rullo poco sotto i polpacci. Mantieni il bacino adeso al lettino e fletti le gambe portando i talloni verso i glutei.'
  },
  {
    name: 'Hip Thrust',
    aliases: ['hip thrust bilanciere', 'spinta bacino'],
    equipment: 'Bilanciere',
    primary_muscle_group: 'Glutei',
    secondary_muscles: ['Femorali', 'Quadricipiti'],
    movement_pattern: 'Cerniera Anca',
    default_rest_time: 120,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/hip-thrust-start.webp',
    description: 'Esercizio cardine per la massima ipertrofia e sviluppo di forza del gran gluteo.',
    setup: 'Appoggia le scapole sul bordo di una panca. Posiziona il bilanciere imbottito sulla piega dell’anca. Spingi sui talloni ed estendi il bacino verso l’alto finché il tronco è parallelo al suolo.'
  },

  // ---------------------------------------------------------------------------
  // ADDOMINALI / CORE
  // ---------------------------------------------------------------------------
  {
    name: 'Crunch a Terra',
    aliases: ['crunch', 'addominali a terra'],
    equipment: 'Corpo Libero',
    primary_muscle_group: 'Addominali',
    secondary_muscles: [],
    movement_pattern: 'Flessione Tronco',
    default_rest_time: 45,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/crunches-start.webp',
    description: 'Esercizio base per la flessione della colonna e l’isolamento del retto dell’addome.',
    setup: 'Sdraiati sulla schiena con le ginocchia piegate. Mani dietro la nuca senza tirare il collo. Stacca le spalle da terra avvicinando lo sterno al bacino esalando aria.'
  },
  {
    name: 'Plank',
    aliases: ['plank isometrico', 'core plank'],
    equipment: 'Corpo Libero',
    primary_muscle_group: 'Addominali',
    secondary_muscles: ['Lombari', 'Spalle'],
    movement_pattern: 'Isometria Core',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/plank-start.webp',
    description: 'Tenuta isometrica fondamentale per la stabilità ed anti-estensione della colonna vertebrale.',
    setup: 'Appoggia gli avambracci e le punte dei piedi a terra. Corpo in linea retta dalla testa ai talloni. Contrai glutei e addome senza far cedere il bacino verso il basso.'
  },
  {
    name: 'Leg Raise alla Sbarra',
    aliases: ['hanging leg raise', 'sollevamento gambe sbarra'],
    equipment: 'Corpo Libero',
    primary_muscle_group: 'Addominali',
    secondary_muscles: ['Femorali'],
    movement_pattern: 'Flessione Bacino',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/hanging-leg-raise-start.webp',
    description: 'Esercizio intenso in sospensione per il retto addominale e i flessori dell’anca.',
    setup: 'Appesi alla sbarra con le braccia tese. Senza dondolare, solleva le ginocchia o le gambe tese verso il petto retrovertendo il bacino.'
  },

  // ---------------------------------------------------------------------------
  // POLPACCI
  // ---------------------------------------------------------------------------
  {
    name: 'Ab Sling Fallout',
    aliases: ['ab sling', 'ab fallout', 'sling fallout'],
    equipment: 'Corpo Libero',
    primary_muscle_group: 'Addominali',
    secondary_muscles: ['Lombari', 'Spalle'],
    movement_pattern: 'Isometria / Estensione Core',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/ab-wheel-rollout-start.webp',
    description: 'Esercizio avanzato per la stabilità del core e la resistenza dell’addome alla distensione.',
    setup: 'Aggancia le cinghie o gli slings. Mantieni il corpo in posizione di plank rigida. Scendi in estensione controllando il bacino e richiudi contraendo l’addome.'
  },
  {
    name: 'Calf Raise in Piedi',
    aliases: ['standing calf raise', 'polpacci in piedi'],
    equipment: 'Macchinario',
    primary_muscle_group: 'Polpacci',
    secondary_muscles: [],
    movement_pattern: 'Flessione Plantare',
    default_rest_time: 60,
    image_url: 'https://raw.githubusercontent.com/sergei-argutin/exercise-dataset/main/images/flat/standing-calf-raise-start.webp',
    description: 'Estensione della caviglia in piedi per stimolare il gastrocnemio (gemelli del polpaccio).',
    setup: 'Posiziona gli avampiedi sul gradino e le shoulders sotto i cuscinetti. Scendi in massimo allungamento con i talloni in basso, poi sali sulle punte spingendo forte.'
  }
];

/**
 * Normalizza qualsiasi stringa di gruppo muscolare (es. "Retto Addominale" -> "Addominali")
 */
export function normalizeMuscleGroup(rawMuscle) {
  if (!rawMuscle) return 'Addominali';
  const m = rawMuscle.toLowerCase().trim();

  if (m.includes('petto') || m.includes('chest') || m.includes('pectoral')) return 'Petto';
  if (m.includes('dorso') || m.includes('dorsal') || m.includes('schiena') || m.includes('lat') || m.includes('back')) return 'Dorsali';
  if (m.includes('spall') || m.includes('deltoid') || m.includes('lento') || m.includes('shoulder')) return 'Spalle';
  if (m.includes('bicipit') || m.includes('biceps') || m.includes('curl')) return 'Bicipiti';
  if (m.includes('tricipit') || m.includes('triceps') || m.includes('french') || m.includes('pushdown')) return 'Tricipiti';
  if (m.includes('quadr') || m.includes('quad') || m.includes('accosciat')) return 'Quadricipiti';
  if (m.includes('femor') || m.includes('ischio') || m.includes('hamstring')) return 'Femorali';
  if (m.includes('glut') || m.includes('glute') || m.includes('hip')) return 'Glutei';
  if (m.includes('addom') || m.includes('abs') || m.includes('core') || m.includes('retto') || m.includes('crunch') || m.includes('sling') || m.includes('fallout') || m.includes('plank')) return 'Addominali';
  if (m.includes('polpacc') || m.includes('calf') || m.includes('calves')) return 'Polpacci';
  if (m.includes('lombar') || m.includes('lower back') || m.includes('erector')) return 'Lombari';
  if (m.includes('trapez') || m.includes('trap')) return 'Trapezi';

  return 'Petto';
}

/**
 * Trova o arricchisce i metadati di un esercizio tramite il nome o alias (Matching Rigoroso)
 */
export function getEnrichedExercise(exerciseObjOrName) {
  const inputName = typeof exerciseObjOrName === 'string' 
    ? exerciseObjOrName 
    : (exerciseObjOrName?.name || '');

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

  // 2. Fallback per esercizi non presenti nella libreria master:
  // Non inventare associazioni: imposta l'immagine a null anziché mostrare esercizi errati
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
  const currentNameNorm = enrichedCurrent.name.toLowerCase();

  // Unifica la lista di ricerca tra la libreria master e gli esercizi eventualmente caricati
  const pool = [...EXERCISE_LIBRARY];
  availableList.forEach(item => {
    if (!pool.some(p => p.name.toLowerCase() === item.name.toLowerCase())) {
      pool.push(getEnrichedExercise(item));
    }
  });

  // Filtra l'esercizio stesso
  const candidates = pool.filter(ex => ex.name.toLowerCase() !== currentNameNorm);

  // Punteggio di affinità
  const scored = candidates.map(ex => {
    const enrichedCandidate = getEnrichedExercise(ex);
    let score = 0;
    if (enrichedCandidate.primary_muscle_group === enrichedCurrent.primary_muscle_group) {
      score += 10;
    }
    if (enrichedCandidate.movement_pattern === enrichedCurrent.movement_pattern) {
      score += 5;
    }
    // Se ha attrezzatura diversa è un ottimo sostituto (es. bilanciere vs manubri)
    if (enrichedCandidate.equipment !== enrichedCurrent.equipment) {
      score += 2;
    }
    return { exercise: enrichedCandidate, score };
  });

  // Ordina per punteggio decrescente e ritorna i primi 4
  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(item => item.exercise);
}
