# Supabase Schema — Gym Mode
> **Documento vivente.** Aggiornare ogni volta che si modifica il database.
> Ultima revisione: 2026-09-25

---

## Custom Types (ENUM)

```sql
-- Tipo attrezzatura esercizi
TYPE public.equipment_type AS ENUM (...)  -- valori gestiti lato DB

-- Obiettivo scheda allenamento
TYPE public.workout_goal AS ENUM (
  'hypertrophy',   -- Ipertrofia
  'strength',      -- Forza
  'endurance',     -- Resistenza
  'fat_loss'       -- Dimagrimento
)

-- Classificazione serie
TYPE public.set_class AS ENUM (
  'NORMAL',        -- Serie normale
  'WARMUP',        -- Riscaldamento
  'DROP',          -- Drop set
  'FAILURE'        -- Al cedimento
)

-- Tier alternative esercizi
TYPE public.alternative_tier AS ENUM (
  'TIER_1',        -- Sostituto ottimo
  'TIER_2',        -- Sostituto buono
  'TIER_3'         -- Sostituto accettabile
)
```

---

## Tabelle

### `public.profiles`
Profilo utente, collegato a `auth.users` tramite id.

| Colonna | Tipo | Default | Note |
|---|---|---|---|
| `id` | `uuid` | `gen_random_uuid()` | PK — corrisponde a `auth.users.id` |
| `full_name` | `varchar` | null | Nome display |
| `weight_kg` | `numeric` | null | Peso corporeo |
| `height_cm` | `integer` | null | Altezza |
| `created_at` | `timestamptz` | `now() UTC` | |
| `theme_preference` | `varchar` | `'System'` | Valori: `'System'`, `'Dark'`, `'Light'` |
| `weight_unit` | `varchar` | `'kg'` | Valori: `'kg'`, `'lbs'` |
| `weight_step_increment` | `numeric` | `1.00` | Step stepper peso |
| `enable_vibration` | `boolean` | `true` | |
| `enable_prep_sound` | `boolean` | `true` | |
| `prep_sound_seconds` | `integer` | `10` | Secondi countdown suono prep |
| `default_rest_override` | `integer` | `90` | Riposo default override in secondi |

> ⚠️ **Discrepanza nota**: il codice in `App.js` usa `settings.step_increment` (snake_case senza prefisso `weight_`). Verificare allineamento con `weight_step_increment`.

---

### `public.exercises`
Libreria globale degli esercizi (non per-utente).

| Colonna | Tipo | Default | Note |
|---|---|---|---|
| `id` | `uuid` | `gen_random_uuid()` | PK |
| `name` | `varchar` | — | NOT NULL, UNIQUE |
| `movement_pattern` | `varchar` | — | NOT NULL (es. `push`, `pull`, `squat`, `hinge`) |
| `primary_muscle_group` | `varchar` | — | NOT NULL |
| `equipment` | `USER-DEFINED` | — | NOT NULL — enum equipment_type |
| `default_rest_time` | `integer` | `90` | Secondi |
| `created_at` | `timestamptz` | `now() UTC` | |

> **Fetch nel codice**: `supabaseServices.fetchEsercizi()` seleziona `id, name, movement_pattern, primary_muscle_group, equipment, default_rest_time` — ✅ allineato.

---

### `public.workout_schemes`
Schede di allenamento dell'utente.

| Colonna | Tipo | Default | Note |
|---|---|---|---|
| `id` | `uuid` | `gen_random_uuid()` | PK |
| `user_id` | `uuid` | — | FK → `profiles.id` |
| `name` | `varchar` | — | NOT NULL |
| `description` | `text` | null | |
| `is_active` | `boolean` | `false` | Una sola scheda attiva per volta (enforced lato client) |
| `created_at` | `timestamptz` | `now() UTC` | |
| `updated_at` | `timestamptz` | `now() UTC` | |
| `days_count` | `integer` | `2` | Numero giorni nella scheda |
| `routine` | `jsonb` | `{}` | Struttura giorni/esercizi — vedi formato sotto |
| `goal` | `USER-DEFINED` | `'hypertrophy'` | Enum `workout_goal` |

**Formato `routine` (JSONB)**:
```json
{
  "Giorno 1": [
    {
      "exerciseId": "uuid",
      "name": "Nome Esercizio",
      "sets": 3,
      "reps": "8-12",
      "rest": 90,
      "setClass": "NORMAL"
    }
  ]
}
```

> **Fetch nel codice**: `fetchSchede()` usa `select('*')` — considera di specificare i campi esplicitamente per sicurezza.

---

### `public.scheme_exercises`
Tabella relazionale esercizi↔schede (alternativa strutturata a `routine` JSONB).

| Colonna | Tipo | Default | Note |
|---|---|---|---|
| `id` | `uuid` | `gen_random_uuid()` | PK |
| `scheme_id` | `uuid` | — | NOT NULL, FK → `workout_schemes.id` |
| `exercise_id` | `uuid` | — | NOT NULL, FK → `exercises.id` |
| `execution_order` | `integer` | — | NOT NULL |
| `target_sets` | `integer` | `3` | NOT NULL |
| `target_reps` | `varchar` | — | NOT NULL (es. `"8-12"`, `"5"`) |
| `target_rest` | `integer` | null | Secondi, null = usa default esercizio |
| `preferred_set_class` | `USER-DEFINED` | `'NORMAL'` | Enum `set_class` |
| `created_at` | `timestamptz` | `now() UTC` | |

> ⚠️ **Non usata nel codice**: questa tabella esiste nel DB ma il codice gestisce tutto tramite `routine` JSONB in `workout_schemes`. Valutare se usarla o mantenerla dormiente.

---

### `public.workout_logs`
Log degli allenamenti completati.

| Colonna | Tipo | Default | Note |
|---|---|---|---|
| `id` | `bigint` | `nextval(seq)` | PK — ⚠️ è bigint, non uuid |
| `user_id` | `uuid` | — | NOT NULL, FK → `auth.users.id` |
| `date` | `timestamptz` | `now()` | NOT NULL |
| `scheda_name` | `text` | — | NOT NULL |
| `day_name` | `text` | — | NOT NULL |
| `duration_minutes` | `integer` | `0` | NOT NULL |
| `tonnage` | `real` | `0` | NOT NULL — tonnellaggio totale (kg) |
| `created_at` | `timestamptz` | `now()` | NOT NULL |
| `scheme_id` | `uuid` | null | FK → `workout_schemes.id` |
| `exercises_data` | `jsonb` | `[]` | Snapshot esercizi eseguiti |
| `fatigue_level` | `integer` | null | CHECK: 1-5 |
| `energy_level` | `integer` | null | CHECK: 1-3 |
| `hardest_exercise_id` | `uuid` | null | FK → `exercises.id` |

> ⚠️ **`joint_discomfort` mancante**: il codice in `saveWorkoutLog()` tenta di salvare `joint_discomfort` con un fallback se la colonna non esiste. **La colonna non è nello schema** — il dato viene archiviato in `exercises_data.jointDiscomfort` (JSONB).

> ⚠️ **`id` è bigint** non uuid: attenzione quando si usa `id` in comparazioni — non usare `uuid_generate_v4()`.

---

### `public.set_logs`
Log granulare per singola serie eseguita.

| Colonna | Tipo | Default | Note |
|---|---|---|---|
| `id` | `uuid` | `gen_random_uuid()` | PK |
| `workout_log_id` | `uuid` | — | NOT NULL — ⚠️ FK non dichiarata (bug schema) |
| `exercise_id` | `uuid` | — | NOT NULL, FK → `exercises.id` |
| `is_variant` | `boolean` | `false` | Se è una serie variante/alternativa |
| `set_number` | `integer` | — | NOT NULL |
| `weight_kg` | `numeric` | — | NOT NULL |
| `reps_completed` | `integer` | — | NOT NULL |
| `logged_at` | `timestamptz` | `now()` | |
| `notes` | `text` | null | |

> ⚠️ **Non usata nel codice**: questa tabella esiste ma il codice non scrive/legge da essa. Tutte le serie vanno in `exercises_data` JSONB di `workout_logs`.

> ⚠️ **Bug schema**: `workout_log_id` è uuid ma `workout_logs.id` è bigint — FK implicita incompatibile.

---

### `public.exercise_alternatives`
Relazioni tra esercizi alternativi con tier di qualità.

| Colonna | Tipo | Default | Note |
|---|---|---|---|
| `id` | `uuid` | `gen_random_uuid()` | PK |
| `original_exercise_id` | `uuid` | — | NOT NULL, FK → `exercises.id` |
| `alternative_exercise_id` | `uuid` | — | NOT NULL, FK → `exercises.id` |
| `tier` | `USER-DEFINED` | — | NOT NULL — enum tier |
| `priority_order` | `integer` | — | NOT NULL |
| `reasoning` | `text` | null | Motivazione della sostituzione |
| `created_at` | `timestamptz` | `now()` | |

> **Usata tramite RPC**: `fetchExerciseAlternatives()` chiama `get_exercise_alternatives(p_exercise_id)` — verificare che la funzione RPC esista nel DB.

---

### `public.spotter_suggestions`
Suggerimenti generati dallo Spotter AI per l'utente.

| Colonna | Tipo | Default | Note |
|---|---|---|---|
| `id` | `uuid` | `uuid_generate_v4()` | PK |
| `user_id` | `uuid` | null | FK → `auth.users.id` |
| `scheme_id` | `uuid` | null | FK → `workout_schemes.id` |
| `day_name` | `text` | — | NOT NULL |
| `suggested_changes` | `jsonb` | — | NOT NULL — struttura cambiamenti |
| `message` | `text` | null | Messaggio human-readable |
| `is_applied` | `boolean` | `false` | Suggerimento applicato |
| `is_dismissed` | `boolean` | `false` | Suggerimento ignorato |
| `created_at` | `timestamptz` | `now()` | |

---

## Discrepanze e Bug Noti

| # | Problema | Tabella | Impatto | Priorità |
|---|---|---|---|---|
| 1 | `joint_discomfort` colonna assente | `workout_logs` | Dati persi in JSONB blob | 🔴 Alta |
| 2 | `set_logs.workout_log_id` è uuid ma FK punta a bigint | `set_logs` | FK implicita rotta | 🔴 Alta |
| 3 | `scheme_exercises` non usata dal codice | `scheme_exercises` | Tabella dormiente | 🟡 Media |
| 4 | `set_logs` non usata dal codice | `set_logs` | Tabella dormiente | 🟡 Media |
| 5 | `fetchSchede()` usa `select('*')` | `workout_schemes` | Performance / over-fetch | 🟢 Bassa |
| 6 | `settings.step_increment` vs `weight_step_increment` | `profiles` | Possibile mismatch save | 🔴 Alta |
| 7 | RPC `get_exercise_alternatives` — esistenza non verificata | DB | Fallback silenzioso | 🟡 Media |

---

## Relazioni (ERD testuale)

```
auth.users
  └─ profiles (id = auth.users.id)
  └─ workout_schemes (user_id)
       └─ scheme_exercises (scheme_id)
            └─ exercises (exercise_id)
  └─ workout_logs (user_id)
       └─ workout_schemes (scheme_id)
       └─ exercises (hardest_exercise_id)
       └─ set_logs (workout_log_id) ← ⚠️ tipo incompatibile

exercises
  └─ exercise_alternatives (original_exercise_id, alternative_exercise_id)
  └─ scheme_exercises (exercise_id)
  └─ set_logs (exercise_id)

spotter_suggestions
  └─ auth.users (user_id)
  └─ workout_schemes (scheme_id)
```
