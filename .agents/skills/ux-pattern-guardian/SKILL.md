---
name: ux-pattern-guardian
description: >
  Custodisce la coerenza dei pattern di interazione tra le views dell'app.
  Decide se un nuovo pattern è coerente con quelli esistenti, aggiorna
  UX_PATTERNS.md quando emergono nuovi pattern, e usa ui-ux-pro-max per
  validare decisioni di pattern con dati.
  Attivare quando si aggiunge un nuovo flusso, una nuova interazione,
  o si vuole verificare la coerenza cross-view.
---

# UX Pattern Guardian

Responsabilità unica: **i pattern di interazione sono coerenti tra le views?**

Non valuta se il codice usa i token giusti (`ui-token-guardian`).
Non valuta se l'interfaccia è usabile in assoluto (`ux-evaluator`).
Valuta se il modo in cui una nuova feature interagisce è **coerente** con il resto dell'app.

---

## Documenti di Riferimento Obbligatori

Leggi sempre prima di iniziare:
1. `.agents/references/UX_PATTERNS.md` — libreria di pattern canonici del progetto
2. `.agents/references/DESIGN_SYSTEM.md` — principi fondamentali dell'app
3. `design-system/gymmode/MASTER.md` — design system validato

---

## Tool di Ricerca (ui-ux-pro-max)

> ⚠️ **Human in the Loop obbligatorio**: prima di eseguire qualsiasi ricerca, mostra la query, il dominio e la motivazione. Attendi conferma esplicita.

**Formato richiesto prima di ogni ricerca:**
```
🔍 Voglio fare una ricerca ui-ux-pro-max:
   Query: "<testo>"
   Dominio: --domain <dominio>
   Perché: <motivazione>
   Uso previsto: <cosa farò con il risultato>

Procedo?
```

```bash
SEARCH="/Users/alessandrofoti/.gemini/config/plugins/ui-ux-pro-max-skill/.claude/skills/ui-ux-pro-max/scripts/search.py"

# Pattern di interazione specifico
python3 "$SEARCH" "<pattern>" --domain ux

# Best practice React per gesture/touch
python3 "$SEARCH" "<gesture>" --stack react
```

---

## Quando Attivare

- Stai aggiungendo una **nuova interazione** non ancora presente nell'app (es. swipe-to-delete, long press, pull-to-refresh)
- Stai aggiungendo una **nuova view o flusso** e vuoi verificare che usi pattern già stabiliti
- Hai **dubbi di coerenza**: "il flusso di conferma dovrebbe essere un modal o una inline expansion?"
- Vuoi **aggiornare la libreria di pattern** dopo aver trovato un modo migliore di fare qualcosa
- Stai facendo una **review cross-view**: "tutte le views gestiscono gli empty state allo stesso modo?"

---

## Workflow: Verifica Nuovo Pattern

### Step 1 — Descrivi il pattern che vuoi introdurre

Specifica:
- **Interazione**: cosa fa l'utente? (es. "swipe a sinistra su una riga")
- **Risultato atteso**: cosa succede? (es. "appare pulsante elimina")
- **View/contesto**: dove si usa?

### Step 2 — Cerca in `UX_PATTERNS.md`

Cerca se esiste già un pattern simile o canonico:
- Pattern identico → **usa quello**. Non reinventare.
- Pattern simile → **adattalo**. Spiega perché ti discosti.
- Pattern assente → vai allo Step 3.

### Step 3 — Verifica coerenza cross-view

Cerca nelle views esistenti come vengono gestite situazioni simili:

```bash
# Come vengono gestite le azioni distruttive in altri punti?
grep -rn "destructive\|elimina\|delete\|remove\|confirm" src/views/ src/components/

# Come vengono gestiti gli empty state?
grep -rn "empty\|vuoto\|no data\|nessun" src/views/

# Come vengono gestiti i loading state?
grep -rn "loading\|isLoading\|spinner" src/views/
```

### Step 4 — Valuta coerenza con i principi fondamentali

Verifica che il nuovo pattern rispetti:
- **Mobile-first**: funziona con una mano? Con un pollice?
- **Touch target 48px**: l'area toccabile è abbastanza grande?
- **Feedback immediato**: l'utente sa cosa è successo entro 200ms?
- **Reversibilità**: l'azione può essere annullata? (preferire undo a confirmation dialog)
- **Gerarchia azioni**: azione primaria sempre più prominente di quella secondaria
- **Navigazione**: non rompe la tab bar? Il back funziona?

### Step 5 — Decisione

Produci una delle tre decisioni:

**✅ APPROVA** — il pattern è coerente, si può procedere
```
Pattern: [nome]
Decisione: APPROVATO
Motivazione: coerente con P-XX già stabilito in UX_PATTERNS.md
Nota implementativa: [eventuali dettagli]
```

**🔄 ADATTA** — il pattern esiste ma va modificato
```
Pattern: [nome]
Decisione: ADATTA
Problema: [perché non va usato as-is]
Adattamento: [come modificarlo per essere coerente]
```

**🆕 NUOVO** — il pattern non esiste, va aggiunto alla libreria
```
Pattern: [nome]
Decisione: NUOVO PATTERN
Proposta: [descrizione del pattern da adottare come standard]
Da aggiungere a UX_PATTERNS.md come P-XX
```

---

## Workflow: Aggiornamento UX_PATTERNS.md

Quando viene approvato o stabilito un nuovo pattern:

1. **Assegna ID**: `P-XX` (incrementale rispetto all'ultimo)
2. **Documenta con il formato standard**:

```markdown
### P-XX: [Nome Pattern]
**Trigger**: [cosa fa l'utente]
**Risposta**: [cosa fa il sistema]
**Dove si usa**: [views/contesti]
**Implementazione canonica**: [componente o codice di riferimento]
**Anti-pattern**: [cosa NON fare]
**Razionale**: [perché questa scelta]
```

3. **Aggiorna il documento** con il nuovo pattern
4. **Notifica** che il pattern è ora lo standard — le views future dovranno seguirlo

---

## Workflow: Review Cross-View

Per verificare la coerenza tra tutte le views:

```bash
# Lista tutte le views
ls src/views/

# Confronta come gestiscono gli stessi casi
grep -rn "empty state\|loading\|error\|confirm" src/views/ | sort
```

Produci una tabella di coerenza:

```markdown
## Review Cross-View — [Data]

| Pattern | WorkoutView | EserciziView | ProgressiView | Coerente? |
|---|---|---|---|---|
| Empty state | ✅ icona+testo | ✅ icona+testo | ❌ solo testo | ⚠️ No |
| Loading | ✅ spinner | ❌ assente | ✅ spinner | ⚠️ No |
| Delete confirm | ✅ modal | ✅ modal | ✅ modal | ✅ Sì |

### Incoerenze da risolvere
1. ...
```

---

## Incoerenze Note Esistenti

> Aggiornare quando si trovano nuove incoerenze o si risolvono quelle esistenti.

### PATTERN-001 🟡 — Settings dentro ProgressiView
- **Problema**: le Impostazioni sono raggiungibili solo da ProgressiView, non da una tab dedicata
- **Impatto**: l'utente non sa dove trovare le impostazioni
- **Pattern corretto**: Settings in tab dedicata o accessibile da ProfiloView

### PATTERN-002 🟡 — ProfiloView e SettingsView non raggiungibili
- **Problema**: views esistenti ma non linkate dalla navigazione principale
- **Pattern corretto**: ogni view raggiungibile dalla tab bar o da un percorso prevedibile

### PATTERN-003 🟢 — Validare pattern di undo
- **Problema**: non è chiaro se le azioni distruttive (elimina workout, elimina esercizio) hanno undo
- **Da verificare**: audit delle view che hanno delete actions
