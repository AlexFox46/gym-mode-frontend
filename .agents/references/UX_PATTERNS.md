# UX Patterns — Gym Mode
> **Documento vivente.** Da completare con i file di design che l'utente fornirà.
> Ultima revisione: 2026-09-25 (versione provvisoria — dedotta dal codice)

---

## Contesto d'Uso

App di tracking allenamento in palestra. L'utente la usa:
- **Prima dell'allenamento**: sceglie la scheda, vede il piano
- **Durante l'allenamento**: registra serie, pesi, riposi — spesso con mani sudate, occhi affaticati, in movimento
- **Dopo l'allenamento**: compila la survey post-workout, vede i progressi

> **Implicazione UX critica**: i controlli durante l'allenamento devono essere enormi, leggibili a colpo d'occhio, azionabili con un pollice solo.

---

## Architettura di Navigazione

### Bottom Tab Bar (4 voci)
```
[Allenati] [Schede] [Spotter] [Progressi]
```
- **Allenati**: avvia/gestisce l'allenamento corrente
- **Schede**: gestione programmi di allenamento
- **Spotter**: consulente AI (feature premium, colore dedicato ciano)
- **Progressi**: storico + impostazioni + profilo

**Regola**: la navigazione principale avviene SOLO tramite tab bar. Non usare back button o stack navigation tra tab.

**Regola**: lo stato di ogni tab viene preservato quando si cambia tab (no reset).

---

## Pattern di Interazione Canonici

### P-01: Stepper Numerico
**Quando usare**: modifica di valori numerici (serie, reps, peso, riposo).

```
[  —  ]   [ 3  ]   [  +  ]
```
- Bottoni: 48×48px minimo
- Valore centrale: `font-mono font-black text-xl`
- Step configurabile (default 1, per peso può essere 0.5 o 2.5)
- Feedback: `active:scale-90`

> ✅ Usare sempre `<Stepper>` da `UI.jsx`. Non reinventare.

---

### P-02: Azione Distruttiva
**Quando usare**: eliminare scheda, rimuovere esercizio, uscire dall'account.

1. Prima azione: bottone `variant="destructive"` o icona trash
2. Sempre richiedere conferma (dialog nativo `window.confirm` o modal dedicato)
3. Mai rendere un'azione distruttiva la CTA principale di una schermata

---

### P-03: Completamento Allenamento
**Flusso**: il completamento di un allenamento è un momento "celebrativo".

1. L'utente preme "Completa Allenamento"
2. Survey post-workout (fatica 1-5, energia 1-3, esercizio più difficile)
3. Feedback visivo di completamento
4. Redirect automatico a tab Progressi

**Regola**: il flusso di completamento non deve bloccarsi su errori Supabase — salva in localStorage come fallback e synca in background.

---

### P-04: Empty State
**Quando usare**: lista vuota, nessun dato disponibile.

Struttura:
```
[Icona neutra, ~40px, text-tertiary]
[Titolo breve, text-secondary, font-bold]
[Spiegazione breve, text-tertiary]
[Opzionale: CTA primaria]
```

Mai mostrare uno stato vuoto senza spiegazione e senza azione possibile.

---

### P-05: Loading State
**Quando usare**: attesa per chiamate Supabase, caricamento iniziale.

- Loading globale (auth): spinner centrato su sfondo `surface`
- Loading locale (lista): skeleton o spinner inline `border-primary`
- **Non bloccare l'intera UI** per loading secondari

---

### P-06: Feedback del Timer di Riposo
**Contesto**: durante l'allenamento, dopo una serie completata.

- Il timer parte automaticamente
- Visual: countdown prominente, `font-mono font-black`
- Feedback sonoro (opzionale, configurabile in settings)
- Feedback haptico (opzionale, configurabile)
- Skip possibile sempre

---

### P-07: Selezione Scheda Attiva
**Regola**: una sola scheda può essere attiva alla volta. L'attivazione di una scheda disattiva automaticamente le altre.

Indicatore visivo per scheda attiva: accent color (`primary`) + badge "Attiva".

---

### P-08: Alternative Esercizi
**Flusso**:
1. Utente tocca un esercizio → apre `ExerciseDetailModal`
2. Modal mostra muscoli interessati (BodyHighlighterSVG) + alternative per tier
3. Utente può selezionare un'alternativa → sostituisce nella scheda corrente

**Regola**: le alternative sono raggruppate per tier (Tier 1 = ottimo → Tier 3 = accettabile).

---

### P-09: Suggerimenti Spotter
**Flusso**:
1. Lo Spotter genera suggerimenti basati sui log passati
2. Ogni suggerimento ha: messaggio leggibile + cambiamenti concreti (JSONB)
3. L'utente può: **Applica** (→ modifica scheda) | **Ignora** (→ `is_dismissed = true`)
4. I suggerimenti applicati/ignorati non riappaiono

**Regola**: il colore ciano (`spotter.*`) è usato SOLO in questo contesto.

---

## Gerarchia dei Contenuti per View

### AllenatiView
```
1. Header scheda attiva (nome + giorno corrente)
2. Lista esercizi del giorno (con stepper serie/reps/peso inline)
3. Timer di riposo (quando attivo, prende prominenza visiva)
4. CTA "Completa Allenamento" (sempre visibile, fixed o sticky)
```

### SchedeView
```
1. Lista schede utente (con badge "Attiva")
2. Bottone "Nuova Scheda" (CTA primaria)
3. Detail scheda selezionata → lista giorni → lista esercizi per giorno
4. Modalità edit: aggiungi/rimuovi esercizi, modifica ordine
```

### ProgressiView
```
1. Riepilogo rapido (allenamenti totali, tonnage totale)
2. Grafico/lista storico allenamenti
3. Sezione Impostazioni (tema, suono, vibrazione, step peso)
4. Logout (bottom, destructive, non prominente)
```

### SpotterView
```
1. Header Spotter con palette ciano
2. Lista suggerimenti pendenti
3. Ogni card: messaggio + azioni [Applica] [Ignora]
```

---

## Pattern Anti (da evitare)

| Anti-pattern | Alternativa corretta |
|---|---|
| Colori hardcoded (`#FF5722`, `orange-*`) | Token Tailwind (`primary`, `text-primary`) |
| Bottoni con `h-8` o area < 44px | `h-[44px]` minimo, usare `<Button size="small">` |
| Logica business nelle views | Spostare in `supabaseServices.js` o hook custom |
| `select('*')` su tabelle Supabase | Specificare i campi necessari |
| Reinventare Button/Card/Toggle nelle views | Importare e usare da `UI.jsx` |
| Mostrare errori Supabase all'utente raw | Messaggi user-friendly + log in console |
| Ciano in contesti non-Spotter | Ciano solo per Spotter feature |
| `window.confirm()` per azioni non-distruttive | Solo per azioni irreversibili |

---

## Da Completare

> [!IMPORTANT]
> Questa sezione è provvisoria. Completare quando l'utente fornisce:
> - Mockup Figma o screenshot delle schermate previste
> - Documenti di design intent
> - Session log con problemi UX identificati

Sezioni da aggiungere:
- [ ] Microanimazioni e transizioni tra view
- [ ] Pattern per notifiche/toast
- [ ] Pattern per onboarding (primo accesso)
- [ ] Gestione errori di rete
- [ ] Accessibilità (a11y) — ARIA labels standard
- [ ] Pattern per input form (validazione, feedback errore)
