---
name: ux-evaluator
description: >
  Valuta l'usabilità di una view o di un flusso usando le euristiche di Nielsen
  e i principi di Krug. Produce un audit strutturato con severity score (0-10)
  e lista di fix prioritizzati.
  Non tocca codice. Non valuta token visivi. Non gestisce pattern cross-view.
  Attivare quando si vuole sapere "questa interfaccia è usabile?"
---

# UX Evaluator

Responsabilità unica: **questa interfaccia è usabile?**

Non tocca codice, non valuta token, non confronta con altre views. Applica i framework di valutazione UX di Nielsen e Krug per produrre un giudizio strutturato e azionabile.

---

## Framework di Riferimento

Questa skill usa il framework `ux-heuristics` di wondelai. I file di riferimento sono:

```
/Users/alessandrofoti/.gemini/config/plugins/wondelai-skills/ux-heuristics/
├── SKILL.md                    ← Framework principale (Krug + Nielsen + scoring)
└── references/
    ├── audit-template.md       ← Template strutturato per l'audit
    ├── nielsen-heuristics.md   ← 10 euristiche espanse con violazioni e severity
    ├── krug-principles.md      ← Don't Make Me Think + Trunk Test
    ├── dark-patterns.md        ← Pattern manipolativi da riconoscere
    ├── wcag-checklist.md       ← Accessibilità WCAG 2.1 AA
    └── heuristic-conflicts.md  ← Come risolvere conflitti tra euristiche
```

**Leggi sempre `SKILL.md` e `audit-template.md` prima di iniziare un audit.**

---

## Quando Attivare

- Vuoi sapere se una view è intuitiva per l'utente
- Stai ricevendo feedback negativi su un flusso specifico
- Stai per rilasciare una nuova feature importante
- Vuoi identificare i problemi UX prima di passare allo user testing
- Hai dubbi su un pattern di interazione specifico

---

## Workflow di Audit

### Step 1 — Racconta il contesto

Prima di valutare, definisci:
- **Schermata/flusso**: quale view o flusso stai valutando?
- **Utente tipo**: chi usa questa schermata? (es. "atleta che si allena in palestra")
- **Obiettivo principale**: cosa deve riuscire a fare? (es. "loggare una serie di squat")
- **Dispositivo**: mobile, dark mode, una mano occupata dalla bilanciera?

### Step 2 — Quick Diagnostic (10 domande, score iniziale)

Inizia sempre con le 10 domande diagnostiche dal framework. Sottrai punti per ogni "No":

| Domanda | Risposta | Detrazione |
|---|---|---|
| Posso capire immediatamente cosa fa questa schermata? | Sì/No | -1 se No |
| L'azione principale è ovvia? | Sì/No | -2 se No |
| La navigazione è chiara? | Sì/No | -1 se No |
| Il sistema mostra cosa sta succedendo? | Sì/No | -2 se No |
| I messaggi di errore sono utili? | Sì/No | -1 se No |
| L'utente può annullare o tornare indietro? | Sì/No | -1 se No |
| Funziona senza hover? (mobile) | Sì/No | -2 se No |
| Tutti gli elementi interattivi hanno label? | Sì/No | -1 se No |
| Qualcosa mi fa dire "huh?" | Sì → -1 | -1 se Sì |
| Trunk Test: so dove sono nell'app? | Sì/No | -1 se No |

**Score = 10 - somma detrazioni**

### Step 3 — Audit Euristico Completo (10 euristiche Nielsen)

Valuta ogni euristica. Per ogni problema trovato, assegna severity:

| Severity | Descrizione | Priorità |
|---|---|---|
| **0** | Non è un problema | Ignora |
| **1** | Fastidio cosmetic | Fix se c'è tempo |
| **2** | Rallenta o frustra | Pianifica fix |
| **3** | Fallimento significativo del task | Fix presto |
| **4** | Blocca completamente il task | Fix subito |

Le 10 euristiche:
1. **Visibilità stato sistema** — feedback su azioni, loading, errori, successo
2. **Match sistema/mondo reale** — linguaggio utente, non gergo tecnico
3. **Controllo e libertà** — undo, cancel, back sempre disponibili
4. **Consistenza e standard** — stessi termini, stessi pattern, convenzioni piattaforma
5. **Prevenzione errori** — validazione, defaults sensati, warning prima di azioni distruttive
6. **Riconoscimento vs. memorizzazione** — opzioni visibili, icone con label, breadcrumb
7. **Flessibilità ed efficienza** — shortcuts, bulk actions, progressive disclosure
8. **Design estetico e minimalista** — solo ciò che serve, gerarchia chiara, una CTA principale
9. **Recovery dagli errori** — messaggi plain language: cosa è andato storto + come fixare
10. **Help e documentazione** — tooltips contestuali, help searchable, task-focused

### Step 4 — Krug Check (3 leggi + Trunk Test)

- **"Don't Make Me Think"**: c'è qualcosa che richiede sforzo cognitivo non necessario?
- **Click count myth**: ogni click è ovvio e costruisce confidenza?
- **Taglia le parole**: c'è testo che non serve? Happy-talk? Istruzioni che nessuno legge?
- **Trunk Test**: se un utente atterrasse su questa schermata senza contesto, saprebbe dove si trova nell'app?

### Step 5 — Controlla Dark Patterns

- C'è qualcosa che manipola l'utente invece di servirlo?
- Azioni distruttive sono nascoste o difficili da trovare intenzionalmente?
- Il linguaggio usa senso di colpa o urgenza artificiale?

---

## Output Atteso

```markdown
## UX Audit — [Nome Schermata/Flusso]
**Data**: YYYY-MM-DD
**Utente tipo**: ...
**Obiettivo**: ...

### Score: X/10

### Quick Diagnostic
| Domanda | Risposta | Note |
|---|---|---|
| ... | Sì/No | ... |

### Problemi Trovati

| # | Euristica | Problema | Severity | Fix consigliato |
|---|---|---|---|---|
| 1 | #1 Visibilità stato | Nessun feedback dopo aver loggato una serie | 3 - Major | Aggiungere toast/animazione di conferma |
| 2 | #8 Minimalismo | 4 CTA visibili insieme senza gerarchia | 2 - Minor | Una CTA primaria, le altre ghost/secondary |
| 3 | Krug - Think | Label "Spotter" non spiega cosa fa | 2 - Minor | Aggiungere sottotitolo "AI Coach" |

### Sintesi per Severity

**🔴 Severity 4 — Fix subito** (blocca il task)
- Nessuno / Lista

**🟠 Severity 3 — Fix presto**
- ...

**🟡 Severity 2 — Pianifica**
- ...

**🟢 Severity 1 — Cosmetic**
- ...

### Quick Wins (alto impatto, basso sforzo)
1. ...
2. ...

### Cosa NON è un problema
- ... (evita falsi positivi)
```

---

## Regole dell'Audit

1. **Valuta dall'utente, non dal developer** — l'utente non sa come funziona il codice
2. **Ogni problema deve avere un fix concreto** — non basta identificare, proponi la soluzione
3. **Severity onesta** — non tutto è severity 3. Un problema cosmetic è severity 1.
4. **Specifica la frequenza** — un problema che capita 1 volta è meno grave di uno che capita ogni sessione
5. **Non duplicare** `ui-token-guardian` — questa skill non valuta se i colori sono giusti, valuta se l'interfaccia è comprensibile
