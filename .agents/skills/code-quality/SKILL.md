---
name: code-quality
description: >
  Agente per la qualità del codice React/JavaScript.
  Identifica pattern problematici, logica duplicata, performance issues,
  e verifica il corretto uso del design system e dei componenti riutilizzabili.
  Attivare prima di fare un commit importante, dopo refactoring, o quando
  si sospettano problemi di performance o manutenibilità.
---

# Code Quality Agent

## Documenti di Riferimento Obbligatori

Prima di qualsiasi operazione, leggi SEMPRE:
1. `.agents/references/PROJECT_MAP.md` — mappa dipendenze
2. `.agents/references/DESIGN_SYSTEM.md` — componenti e token ufficiali

---

## Quando Attivare Questo Agente

- Prima di un **commit rilevante** (review pre-commit)
- Dopo un **refactoring** (verifica che non si siano introdotte regressioni)
- Quando si sospetta **logica duplicata** tra views
- Quando si rileva **lentezza** o comportamento strano (performance review)
- Quando si modifica o aggiunge una **view complessa**
- Per una **code review sistematica** di un file

---

## Checklist Review Codice React

### 1. Struttura e Organizzazione

- [ ] Il componente ha una **singola responsabilità**?
- [ ] Il file ha **meno di ~300 righe**? (Oltre → considera di spezzarlo)
- [ ] La logica pesante è in **funzioni estratte** o **hook custom**, non inline nel render?
- [ ] I **magic numbers** sono costanti nominate? (es. `const MAX_SETS = 5` non `> 5`)
- [ ] C'è codice commentato o debug (`console.log`) che non deve restare?

### 2. Hooks e State Management

- [ ] Ogni `useEffect` ha il **dependency array** corretto?
- [ ] Gli effetti non usano variabili esterne senza includerle nelle dipendenze?
- [ ] C'è **prop drilling** eccessivo (più di 3 livelli)? → Considera Context o stato in App.js
- [ ] Lo stato è al livello **più basso necessario** (non tutto in App.js)?
- [ ] Le funzioni callback passate come props sono **stabili** (`useCallback` se necessario)?
- [ ] I dati derivati sono calcolati con `useMemo` se costosi?

### 3. Componenti e Riutilizzo

- [ ] Il file usa `<Button>` da `UI.jsx` o ha bottoni ad hoc? → Sempre `<Button>`
- [ ] Il file usa `<Card>` da `UI.jsx` o ha div-card custom? → Sempre `<Card>`
- [ ] Il file usa `<Toggle>`, `<Stepper>`, `<Tooltip>` da `UI.jsx` dove appropriato?
- [ ] Ci sono **pattern visivi duplicati** che potrebbero diventare componenti in `UI.jsx`?

### 4. Gestione Errori e Loading

- [ ] Ogni chiamata async ha gestione dell'errore (`try/catch` o `.catch()`)?
- [ ] Gli stati di loading sono gestiti? (spinner/skeleton durante l'attesa)
- [ ] Gli errori mostrano **messaggi user-friendly** (non raw Supabase errors)?
- [ ] Le operazioni critiche hanno **fallback** in caso di errore di rete?

### 5. Performance

- [ ] I componenti che ricevono array/oggetti come props re-renderano troppo? → `React.memo`
- [ ] Le liste lunghe usano **virtualizzazione** (se > 100 items)?
- [ ] Le immagini/asset pesanti sono caricate in **lazy loading**?
- [ ] `exerciseLibrary.js` (173KB) è importato solo dove necessario?

### 6. Qualità Generale

- [ ] Tutte le **props sono documentate** (JSDoc o PropTypes)?
- [ ] I nomi di funzioni e variabili sono **descrittivi** (non `data`, `item`, `temp`)?
- [ ] Il codice è **leggibile senza commenti** (i commenti spiegano il "perché", non il "cosa")?
- [ ] Non ci sono `any` impliciti o `undefined` non gestiti?

---

## Workflow: Review di un File

### Step 1 — Analisi statica

```bash
# Cerca colori hardcoded (dovrebbero essere token Tailwind)
grep -n "#FF5722\|#000000\|#121212\|#262626\|#FFFFFF\|#A3A3A3" src/views/NomeView.jsx

# Cerca console.log dimenticati
grep -n "console.log" src/views/NomeView.jsx

# Cerca select('*') in supabaseServices
grep -n "select('\*')" src/services/supabaseServices.js

# Cerca bottoni creati senza <Button>
grep -n "<button " src/views/NomeView.jsx
```

### Step 2 — Analisi del codice

Leggi il file e documenta:

```markdown
## Review: NomeView.jsx — [data]

### ✅ Punti positivi
- ...

### ⚠️ Issues trovate

#### ISSUE-001 [ALTA] — Bottone custom invece di <Button>
- **Linea**: 142
- **Problema**: `<button className="bg-primary ...">` invece di `<Button variant="primary">`
- **Fix**: Sostituire con `<Button variant="primary" onClick={...}>Testo</Button>`

#### ISSUE-002 [MEDIA] — useEffect senza cleanup
- **Linea**: 78
- **Problema**: listener Supabase non rimosso al unmount
- **Fix**: Aggiungere return con cleanup function

#### ISSUE-003 [BASSA] — Magic number
- **Linea**: 203
- **Problema**: `> 5` senza contesto
- **Fix**: `const MAX_FATIGUE_LEVEL = 5;` estratto sopra il componente
```

### Step 3 — Applica le fix per priorità

Priorità di intervento:
1. 🔴 **ALTA**: Bug funzionali, memory leak, errori silenti
2. 🟡 **MEDIA**: Pattern anti, logica duplicata, prop drilling
3. 🟢 **BASSA**: Style, naming, commenti

---

## Pattern Problematici Specifici del Progetto

### Anti-pattern: Logica Supabase nelle Views
```jsx
// ❌ Sbagliato — logica DB direttamente nella view
const handleSave = async () => {
  const { error } = await supabase.from('workout_schemes').update(...);
};

// ✅ Corretto — tramite service layer
import { updateScheda } from '../services/supabaseServices';
const handleSave = async () => {
  await updateScheda(schedeId, data);
};
```

### Anti-pattern: Colori hardcoded
```jsx
// ❌ Sbagliato
<div className="bg-[#FF5722] text-[#FFFFFF]">

// ✅ Corretto
<div className="bg-primary text-white">
```

### Anti-pattern: Bottoni senza componente
```jsx
// ❌ Sbagliato
<button className="bg-primary text-white h-[52px] px-8 rounded-xl font-black uppercase">
  Salva
</button>

// ✅ Corretto
<Button variant="primary">Salva</Button>
```

### Anti-pattern: useEffect senza cleanup per listener
```jsx
// ❌ Sbagliato
useEffect(() => {
  const channel = supabase.channel(...).subscribe();
}, [userId]);

// ✅ Corretto
useEffect(() => {
  const channel = supabase.channel(...).subscribe();
  return () => supabase.removeChannel(channel);
}, [userId]);
```

### Anti-pattern: select('*')
```js
// ❌ Sbagliato — over-fetch
const { data } = await supabase.from('workout_schemes').select('*');

// ✅ Corretto — seleziona solo i campi necessari
const { data } = await supabase
  .from('workout_schemes')
  .select('id, name, is_active, days_count, routine, goal');
```

### Anti-pattern: Errore Supabase non gestito
```js
// ❌ Sbagliato — errore silente
const { data } = await supabase.from('profiles').select('id');
return data;

// ✅ Corretto
const { data, error } = await supabase.from('profiles').select('id');
if (error) {
  console.error('fetchProfile error:', error);
  return null;
}
return data;
```

---

## Issues Note nel Codice Esistente

> Aggiornare questa sezione man mano che si trovano e risolvono i problemi.

### EXISTING-001 🟡 — ProfiloView e SettingsView orfane
- **File**: `src/views/ProfiloView.jsx`, `src/views/SettingsView.jsx`
- **Problema**: esistono ma non sono montate in `App.js`
- **Azione**: decidere se integrarle o rimuoverle

### EXISTING-002 🟡 — Settings gestite in ProgressiView
- **File**: `src/views/ProgressiView.jsx`
- **Problema**: la view Progressi gestisce anche le impostazioni — violazione single responsibility
- **Azione**: separare le settings in `SettingsView.jsx` e montarla correttamente

### EXISTING-003 🟡 — AllenatiView troppo grande (51KB)
- **File**: `src/views/AllenatiView.jsx`
- **Problema**: 51KB suggerisce troppa logica in un singolo file
- **Azione**: audit interno per identificare sottocomponenti estraibili

### EXISTING-004 🟡 — SchedeView troppo grande (34KB)
- **File**: `src/views/SchedeView.jsx`
- **Problema**: simile ad AllenatiView
- **Azione**: audit interno

### EXISTING-005 🟢 — fetchSchede usa select('*')
- **File**: `src/services/supabaseServices.js` linea ~97
- **Problema**: `select('*')` su workout_schemes
- **Fix**: specificare i campi: `select('id, name, is_active, days_count, routine, goal, created_at')`

---

## Regole Generali

1. **Nessuna logica Supabase nelle views** — tutto in `supabaseServices.js`
2. **Nessun colore hardcoded** — sempre token Tailwind
3. **Sempre `<Button>`, `<Card>`, `<Stepper>`, `<Toggle>`, `<Tooltip>`** da `UI.jsx`
4. **Ogni useEffect con listener ha il suo cleanup**
5. **Nessun `select('*')`** nelle query Supabase
6. **Nessun `console.log`** in produzione (solo `console.error` per errori reali)
7. **Documentare ogni prop** con JSDoc nei componenti pubblici
