---
name: file-scaffolding
description: >
  Agente per la gestione delle dipendenze tra file, scaffolding di nuovi file
  e propagazione degli aggiornamenti quando un file collegato cambia.
  Attivare quando si aggiunge un nuovo file, si modifica un'interfaccia/export,
  o si vuole capire l'impatto di una modifica su altri file del progetto.
---

# File Scaffolding & Connectivity Agent

## Documenti di Riferimento Obbligatori

Prima di qualsiasi operazione, leggi SEMPRE:
1. `.agents/references/PROJECT_MAP.md` — mappa completa delle dipendenze
2. `.agents/references/DESIGN_SYSTEM.md` — per scaffolding di nuovi componenti
3. `.agents/references/UX_PATTERNS.md` — per scaffolding di nuove views

---

## Quando Attivare Questo Agente

- Si aggiunge un **nuovo file** (view, componente, servizio, hook)
- Si **modifica un export** da un file esistente (nuova funzione, nuova prop, renamed export)
- Si **rimuove** un file o un export
- Si vuole sapere **cosa impatta** la modifica di un file specifico
- Si vuole creare uno **scaffolding corretto** per un nuovo file

---

## Workflow: Nuovo File

### Step 1 — Classifica il file
Determina il tipo:
- **View** → `src/views/NomeView.jsx`
- **Componente riutilizzabile** → `src/components/NomeComponente.jsx`
- **Servizio Supabase** → aggiunta a `src/services/supabaseServices.js`
- **Hook custom** → `src/hooks/useNomeHook.js` (crea la cartella se non esiste)
- **Dato/costante** → `src/data/nomeFile.js`

### Step 2 — Genera lo scaffolding

**Template View:**
```jsx
import React, { useState, useEffect } from 'react';
// Importa solo i componenti UI necessari
// import { Button, Card } from '../components/UI';

/**
 * NomeView
 * @description [Descrizione scopo della view]
 * @param {Object} props
 * @param {string} props.userId - ID utente autenticato
 * // Documenta ogni prop ricevuta
 */
export const NomeView = ({ userId }) => {
  return (
    <div className="flex flex-col min-h-full bg-surface">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-black text-text-primary">Titolo</h1>
        <p className="text-sm text-text-secondary mt-1">Sottotitolo</p>
      </div>

      {/* Content */}
      <div className="px-5 flex-1">
        {/* TODO */}
      </div>
    </div>
  );
};
```

**Template Componente:**
```jsx
import React from 'react';

/**
 * NomeComponente
 * @description [Descrizione]
 * @param {Object} props
 */
export const NomeComponente = ({ /* props */ }) => {
  return (
    <div>
      {/* contenuto */}
    </div>
  );
};
```

**Template Hook:**
```js
import { useState, useEffect } from 'react';

/**
 * useNomeHook
 * @description [Descrizione]
 * @param {string} userId
 * @returns {{ data, loading, error }}
 */
export const useNomeHook = (userId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // implementazione
  }, [userId]);

  return { data, loading, error };
};
```

### Step 3 — Aggiorna PROJECT_MAP.md
Dopo aver creato il file:
1. Aggiungi la voce nell'albero directory
2. Crea la sezione dipendenze (cosa importa, cosa esporta)
3. Aggiorna le sezioni dei file che lo useranno

---

## Workflow: Modifica Export Esistente

### Step 1 — Identifica i consumatori
Cerca in `PROJECT_MAP.md` chi importa il file modificato.

Poi verifica con ricerca nel codice:
```bash
grep -r "from '../services/supabaseServices'" src/
grep -r "from '../components/UI'" src/
```

### Step 2 — Analizza l'impatto
Per ogni consumatore, verifica:
- Usa l'export che è cambiato?
- Il cambiamento è breaking (nome, firma, struttura) o additive?
- Se breaking: aggiorna il consumatore
- Se additive: nessuna azione richiesta

### Step 3 — Propaga le modifiche
Per ogni file impattato:
1. Apri il file
2. Aggiorna l'import se il nome è cambiato
3. Aggiorna i siti di chiamata se la firma è cambiata
4. Verifica che il file compili (nessun import non risolto)

### Step 4 — Aggiorna PROJECT_MAP.md
Rifletti i nuovi export nella mappa.

---

## Workflow: Aggiunta View a App.js

Quando si aggiunge una nuova view al routing:

1. **Aggiungi l'import** in cima a `App.js`:
```jsx
import { NuovaView } from './views/NuovaView';
```

2. **Aggiungi lo stato activeTab** (se necessario):
Il valore di `activeTab` per la nuova tab.

3. **Monta la view nel render**:
```jsx
{activeTab === 'nuova' && (
  <NuovaView
    userId={user?.id}
    // altre props necessarie
  />
)}
```

4. **Aggiungi il bottone nella nav bar**:
```jsx
<button
  onClick={() => setActiveTab('nuova')}
  className={`flex flex-col items-center justify-center w-16 h-full transition-all ${
    activeTab === 'nuova' ? 'text-primary scale-105' : 'text-neutral-400 hover:text-neutral-200'
  }`}
>
  <IconName
    size={22}
    strokeWidth={activeTab === 'nuova' ? 2.5 : 1.8}
  />
  <span className={`font-sans text-[10px] uppercase mt-1 tracking-wider ${
    activeTab === 'nuova' ? 'font-black text-primary' : 'font-semibold text-neutral-400'
  }`}>
    Label
  </span>
</button>
```

5. **Aggiorna PROJECT_MAP.md** con le nuove props.

---

## Checklist per Ogni Operazione

- [ ] Ho letto `PROJECT_MAP.md` prima di iniziare
- [ ] Il nuovo file segue il template corretto per il suo tipo
- [ ] Ho verificato con grep chi importa i file modificati
- [ ] Ho aggiornato tutti i consumatori impattati da modifiche breaking
- [ ] Ho aggiornato `PROJECT_MAP.md` per riflettere il nuovo stato
- [ ] Il nuovo file usa i token del design system (no colori hardcoded)
- [ ] Il nuovo file importa da `UI.jsx` invece di reinventare componenti
