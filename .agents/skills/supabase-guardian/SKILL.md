---
name: supabase-guardian
description: >
  Agente per la qualità e la coerenza del database Supabase.
  Audita discrepanze tra schema documentato e codice, genera migration SQL,
  verifica l'allineamento tra il service layer e le tabelle reali.
  Attivare quando si modifica supabaseServices.js, si aggiunge una tabella,
  o si vogliono identificare bug di allineamento DB-codice.
---

# Supabase Guardian Agent

## Documenti di Riferimento Obbligatori

Prima di qualsiasi operazione, leggi SEMPRE:
1. `.agents/references/SUPABASE_SCHEMA.md` — schema autorizzativo documentato
2. `src/services/supabaseServices.js` — service layer corrente
3. `src/supabaseClient.js` — configurazione client

---

## Quando Attivare Questo Agente

- Si aggiunge una **nuova tabella o colonna** al DB
- Si modifica **supabaseServices.js** (nuova funzione, nuova query)
- Si rileva un **errore Supabase** in console (column not found, RLS error, type mismatch)
- Si vuole fare un **audit di allineamento** tra codice e schema
- Si vuole **generare SQL** per una migration
- Si sospetta un problema di **RLS o permessi**

---

## Workflow: Audit Allineamento Codice ↔ DB

### Step 1 — Analisi del service layer
Leggi `src/services/supabaseServices.js` e crea un inventario:

Per ogni funzione, documenta:
```
Funzione: fetchNome()
Tabella: nome_tabella
Operazione: SELECT
Campi usati: id, name, campo1, campo2
Filtri: .eq('user_id', userId)
Dipendenze FK: (nessuna / tabella_correlata)
```

### Step 2 — Confronto con SUPABASE_SCHEMA.md
Per ogni campo usato nel codice, verifica:
- ✅ Esiste nello schema documentato?
- ✅ Il tipo JS corrisponde al tipo SQL? (es. uuid→string, bigint→number, timestamptz→ISO string)
- ✅ Il nome è identico? (snake_case SQL ↔ camelCase JS dopo mapping)
- ✅ I campi NOT NULL nel DB sono sempre valorizzati nel codice?
- ⚠️ Ci sono campi nel DB non usati dal codice (tabelle dormienti)?
- ⚠️ Ci sono campi usati nel codice che non esistono nel DB?

### Step 3 — Report discrepanze
Formatta il report così:

```markdown
## Audit Supabase — [data]

### ✅ Allineato
- fetchEsercizi → exercises: tutti i campi selezionati esistono

### ⚠️ Discrepanze trovate

#### CRITICA: Campo mancante
- **Funzione**: saveWorkoutLog()
- **Campo**: joint_discomfort
- **Problema**: il codice tenta di inserire questo campo ma non esiste nella tabella workout_logs
- **Fix**: aggiungere la colonna O archiviare solo in exercises_data JSONB
- **SQL migration**: `ALTER TABLE workout_logs ADD COLUMN joint_discomfort jsonb;`

#### MEDIA: Tabella dormiente
- **Tabella**: scheme_exercises
- **Problema**: esiste nel DB ma non viene mai usata dal codice
- **Azione**: documentare se è previsto l'uso futuro o schedarne la rimozione
```

---

## Workflow: Aggiunta Nuova Tabella

### Step 1 — Definisci lo schema
Prima di scrivere SQL, documenta in `SUPABASE_SCHEMA.md`:

```markdown
### `public.nome_tabella`
[Descrizione scopo]

| Colonna | Tipo | Default | Note |
|---|---|---|---|
| `id` | `uuid` | `gen_random_uuid()` | PK |
| `user_id` | `uuid` | — | NOT NULL, FK → `profiles.id` |
...
```

### Step 2 — Genera SQL migration

Template:
```sql
-- Migration: [descrizione]
-- Data: [YYYY-MM-DD]
-- Author: [autore]

-- 1. Crea la tabella
CREATE TABLE public.nome_tabella (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  -- altri campi
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT nome_tabella_pkey PRIMARY KEY (id),
  CONSTRAINT nome_tabella_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);

-- 2. RLS
ALTER TABLE public.nome_tabella ENABLE ROW LEVEL SECURITY;

-- 3. Policy: utente vede solo i propri dati
CREATE POLICY "Users can view own data" ON public.nome_tabella
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own data" ON public.nome_tabella
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own data" ON public.nome_tabella
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own data" ON public.nome_tabella
  FOR DELETE USING (auth.uid() = user_id);

-- 4. Indici (se necessari)
CREATE INDEX idx_nome_tabella_user_id ON public.nome_tabella(user_id);
```

### Step 3 — Aggiungi la funzione in supabaseServices.js

Segui questo pattern:
```js
/**
 * [Descrizione della funzione]
 * @param {string} userId - UUID utente
 * @returns {Promise<Array>}
 */
export const fetchNomeTabella = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('nome_tabella')
      .select('id, campo1, campo2')  // MAI select('*') in produzione
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Errore nel fetch di nome_tabella:', error);
      return [];
    }

    // Mappa snake_case → camelCase
    return data.map(row => ({
      id: row.id,
      campo1: row.campo1,
      campo2: row.campo2,
    }));
  } catch (err) {
    console.error('Errore inatteso:', err);
    return [];
  }
};
```

### Step 4 — Aggiorna SUPABASE_SCHEMA.md
Aggiungi la nuova tabella al documento con tutti i campi e le FK.

---

## Workflow: Aggiunta Nuova Colonna

### Step 1 — SQL migration
```sql
-- Aggiungi colonna
ALTER TABLE public.nome_tabella
ADD COLUMN nome_colonna tipo DEFAULT valore;

-- Se NOT NULL su tabella esistente, usa default temporaneo:
ALTER TABLE public.nome_tabella
ADD COLUMN nome_colonna tipo NOT NULL DEFAULT valore;
```

### Step 2 — Aggiorna il codice
- In `supabaseServices.js`: aggiungi il campo nella `select()` e nel mapping
- In `SUPABASE_SCHEMA.md`: aggiorna la tabella con la nuova colonna

---

## Checklist RLS (Row Level Security)

Per ogni tabella che contiene dati utente:
- [ ] RLS abilitata: `ALTER TABLE ... ENABLE ROW LEVEL SECURITY`
- [ ] Policy SELECT: l'utente vede solo i propri dati
- [ ] Policy INSERT: l'utente può inserire solo con il proprio `user_id`
- [ ] Policy UPDATE: l'utente aggiorna solo i propri record
- [ ] Policy DELETE: l'utente elimina solo i propri record
- [ ] Le policy usano `auth.uid()` non un parametro passato dal client

---

## Bug Noti da Risolvere

> Questi sono i problemi identificati nell'audit iniziale (2026-09-25).
> Rimuovere la voce quando il bug è risolto.

### BUG-001 🔴 — joint_discomfort mancante
**Tabella**: `workout_logs`
**Problema**: il codice in `saveWorkoutLog()` tenta di inserire `joint_discomfort` con un fallback, ma la colonna non esiste.
**Fix proposto**:
```sql
ALTER TABLE public.workout_logs
ADD COLUMN joint_discomfort jsonb DEFAULT '[]'::jsonb;
```
Poi rimuovere il blocco try/catch di fallback in `saveWorkoutLog()`.

### BUG-002 🔴 — Tipo incompatibile set_logs.workout_log_id
**Tabella**: `set_logs`
**Problema**: `workout_log_id` è `uuid` ma `workout_logs.id` è `bigint` — FK implicita rotta.
**Fix proposto**:
```sql
-- Opzione A: converti workout_logs.id a uuid
-- Opzione B: converti set_logs.workout_log_id a bigint
ALTER TABLE public.set_logs
ALTER COLUMN workout_log_id TYPE bigint USING workout_log_id::text::bigint;

-- Poi aggiungi FK esplicita
ALTER TABLE public.set_logs
ADD CONSTRAINT set_logs_workout_log_id_fkey 
FOREIGN KEY (workout_log_id) REFERENCES public.workout_logs(id);
```

### BUG-003 🔴 — settings.step_increment vs weight_step_increment
**Tabella**: `profiles`
**Problema**: il codice usa `settings.step_increment` ma la colonna nel DB è `weight_step_increment`.
**Fix**: verificare dove il profilo viene letto/scritto e allineare i nomi.

### BUG-004 🟡 — scheme_exercises e set_logs dormienti
**Tabelle**: `scheme_exercises`, `set_logs`
**Problema**: esistono nel DB ma non sono mai usate dal codice.
**Decisione richiesta**: usarle per dati più strutturati, o rimuoverle?

### BUG-005 🟡 — RPC get_exercise_alternatives
**Problema**: il codice chiama `supabase.rpc('get_exercise_alternatives')` ma non è verificato se la funzione esiste nel DB.
**Fix**: verificare in Supabase Dashboard → Database → Functions.

---

## Regole Generali

1. **Mai `select('*')`** su tabelle in produzione — specifica sempre i campi
2. **Sempre RLS** su tabelle con dati utente
3. **Sempre mapping snake_case → camelCase** nel service layer
4. **Sempre try/catch** attorno alle chiamate Supabase
5. **Log errori** con `console.error('[nome funzione]:', error)` — mai swallowing silenzioso
6. **Fallback** per funzionalità critiche (es. localStorage per i log)
7. **Aggiorna SUPABASE_SCHEMA.md** ogni volta che il DB cambia
