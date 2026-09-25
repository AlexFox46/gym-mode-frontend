# Project Map — Gym Mode
> **Documento vivente.** Aggiornare ogni volta che si aggiunge, rimuove o modifica un file.
> Ultima revisione: 2026-09-25

---

## Struttura ad Albero

```
gym-mode-frontend/
├── src/
│   ├── App.js                          # Root — router a tab, auth, stato globale
│   ├── supabaseClient.js               # Singleton client Supabase
│   ├── index.js                        # Entry point React DOM
│   ├── index.css                       # CSS globale + font imports
│   ├── App.css                         # Stili base app-container
│   │
│   ├── components/
│   │   ├── UI.jsx                      # Libreria componenti primitivi riutilizzabili
│   │   ├── BodyHighlighterSVG.jsx      # SVG interattivo muscoli (usato in ExerciseDetailModal)
│   │   ├── ExerciseDetailModal.jsx     # Modal dettaglio esercizio (usato in AllenatiView, SchedeView)
│   │   ├── bodyFrontData.js            # Dati SVG corpo anteriore (usato in BodyHighlighterSVG)
│   │   └── bodyBackData.js             # Dati SVG corpo posteriore (usato in BodyHighlighterSVG)
│   │
│   ├── views/
│   │   ├── LoginView.jsx               # Schermata login/signup
│   │   ├── AllenatiView.jsx            # Tab allenamento (la più complessa - 51KB)
│   │   ├── SchedeView.jsx              # Tab gestione schede (34KB)
│   │   ├── ProgressiView.jsx           # Tab progressi + settings + logout
│   │   ├── SpotterView.jsx             # Tab Spotter AI
│   │   ├── ProfiloView.jsx             # Vista profilo (non montata da App.js - ⚠️)
│   │   └── SettingsView.jsx            # Vista settings (non montata da App.js - ⚠️)
│   │
│   ├── services/
│   │   └── supabaseServices.js         # Tutte le chiamate Supabase
│   │
│   └── data/
│       └── exerciseLibrary.js          # Libreria esercizi locale (173KB - master data)
│
├── public/
├── tailwind.config.js                  # Token design system (colori, font, shadow)
├── package.json
└── .agents/                            # Sistema qualità (questo stesso sistema)
    ├── skills/
    └── references/
```

---

## Mappa Dipendenze per File

### `src/App.js`
**Importa da:**
- `./supabaseClient` → singleton Supabase
- `./views/LoginView`
- `./views/AllenatiView`
- `./views/SchedeView`
- `./views/ProgressiView`
- `./views/SpotterView`
- `./services/supabaseServices` → `fetchEsercizi`, `createProfileIfNotExists`, `fetchSchede`, `setupSchedeListener`, `saveWorkoutLog`, `fetchWorkoutLogs`
- `lucide-react` → `Dumbbell`, `BookOpen`, `TrendingUp`, `Sparkles`

**Stato gestito:**
- `user`, `authLoading` — sessione auth
- `activeTab` — routing tra tab
- `settings` — preferenze utente (tema, vibrazione, suono, step_increment)
- `leMieSchede`, `schedaAttiva` — schede workout
- `storicoAllenamenti` — log allenamenti
- `esercizi` — libreria esercizi
- `editDay` — giorno da editare passato a SchedeView

**Props passate verso le views:**

| View | Props ricevute |
|---|---|
| `AllenatiView` | `settings`, `schedaAttiva`, `onWorkoutComplete`, `onNavigateToSchede`, `userId` |
| `SchedeView` | `schede`, `setSchede`, `schedaAttiva`, `setSchedaAttiva`, `esercizi`, `userId`, `editDay`, `setEditDay` |
| `SpotterView` | `schedaAttiva` |
| `ProgressiView` | `storico`, `user`, `settings`, `onSettingsChange`, `onLogout`, `onNavigateToSpotter` |

> ⚠️ **Problema**: `ProgressiView` riceve `settings` e `onSettingsChange` — significa che gestisce le settings dentro una view di progressi. Considerare di separare in `SettingsView` dedicata.

---

### `src/supabaseClient.js`
**Importata da:** `App.js`, `services/supabaseServices.js`
**Esporta:** `supabase` (client singleton)
**Dipende da:** variabili env `REACT_APP_SUPABASE_URL`, `REACT_APP_SUPABASE_ANON_KEY`

---

### `src/services/supabaseServices.js`
**Importa da:**
- `../supabaseClient` → `supabase`
- `../data/exerciseLibrary` → `EXERCISE_LIBRARY`, `getEnrichedExercise`

**Esporta (funzioni):**
| Funzione | Tabella/RPC Supabase | Chiamata da |
|---|---|---|
| `fetchEsercizi()` | `exercises` | `App.js` |
| `createProfileIfNotExists(userId)` | `profiles` | `App.js` |
| `fetchSchede(userId)` | `workout_schemes` | `App.js` |
| `setupSchedeListener(userId, cb)` | `workout_schemes` (realtime) | `App.js` |
| `fetchExerciseAlternatives(id, muscle, pattern)` | `exercises`, RPC `get_exercise_alternatives` | `ExerciseDetailModal.jsx` |
| `saveWorkoutLog(userId, logEntry)` | `workout_logs` | `App.js` |
| `fetchWorkoutLogs(userId)` | `workout_logs` | `App.js` |
| `updateSchedaGoal(schedaId, goal)` | `workout_schemes` | Non trovata nel codice ⚠️ |
| `fetchPendingSpotterSuggestions(userId, schemeId, dayName)` | `spotter_suggestions` | `SpotterView.jsx` (probabile) |
| `updateSpotterSuggestionStatus(id, {isApplied, isDismissed})` | `spotter_suggestions` | `SpotterView.jsx` (probabile) |

---

### `src/components/UI.jsx`
**Importata da:** (da verificare nelle views)
**Esporta:** `Button`, `Stepper`, `Card`, `Toggle`, `Tooltip`
**Non dipende da:** nessun file interno

> ✅ **Regola**: ogni nuovo componente riutilizzabile va aggiunto qui, non nelle views.

---

### `src/components/ExerciseDetailModal.jsx`
**Importa da:**
- `../services/supabaseServices` → `fetchExerciseAlternatives`
- `./BodyHighlighterSVG`
- `lucide-react`

**Usato in:** `AllenatiView.jsx`, `SchedeView.jsx`

---

### `src/components/BodyHighlighterSVG.jsx`
**Importa da:**
- `./bodyFrontData`
- `./bodyBackData`

**Usato in:** `ExerciseDetailModal.jsx`

---

### `src/data/exerciseLibrary.js`
**Importata da:** `services/supabaseServices.js`
**Esporta:** `EXERCISE_LIBRARY` (array), `getEnrichedExercise` (funzione)
**Dimensione:** 173KB — considera lazy loading se il bundle cresce

---

### Views non montate in `App.js`

| File | Stato | Note |
|---|---|---|
| `ProfiloView.jsx` | ⚠️ Orfana | Non importata né montata in App.js |
| `SettingsView.jsx` | ⚠️ Orfana | Non importata né montata in App.js |

---

## Flusso Dati Principale

```
Supabase DB
    ↓ (via supabaseServices.js)
App.js (stato globale)
    ↓ (props)
┌───────────────────────────────┐
│ AllenatiView  SchedeView      │
│ ProgressiView  SpotterView    │
└───────────────────────────────┘
    ↓ (callbacks verso App.js)
onWorkoutComplete → saveWorkoutLog → Supabase
onNavigateToSchede → setActiveTab
onSettingsChange → setSettings
onLogout → supabase.auth.signOut()
```

---

## Regole per Aggiornare Questa Mappa

Quando **aggiungi un file**:
1. Aggiungi la voce nell'albero di directory
2. Crea la sezione "dipendenze" con import/export
3. Aggiorna le sezioni dei file che lo importano

Quando **rimuovi un file**:
1. Rimuovi dalla directory tree
2. Rimuovi la sezione dipendenze
3. Aggiorna tutti i file che lo importavano

Quando **aggiungi un export** a un file esistente:
1. Aggiorna la tabella "Esporta" del file
2. Aggiorna i file che lo importano nella colonna "Chiamata da"

Quando **aggiungi una prop** a una view:
1. Aggiorna la tabella "Props passate verso le views" in `App.js`
