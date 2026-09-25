---
name: ui-token-guardian
description: >
  Verifica che il codice React usi correttamente i token del design system
  (colori, tipografia, spaziature, componenti UI.jsx). Non valuta UX, non
  valuta pattern — guarda solo il codice.
  Attivare dopo aver scritto o modificato un componente/view, prima di un commit.
---

# UI Token Guardian

Responsabilità unica: **il codice rispetta il design system?**

Non valuta UX, non valuta pattern di interazione. Guarda esclusivamente se il codice usa i token e i componenti corretti.

---

## Documenti di Riferimento Obbligatori

Leggi prima di iniziare qualsiasi review:
1. `.agents/references/DESIGN_SYSTEM.md` — token Tailwind, componenti, regole tipografiche
2. `design-system/gymmode/MASTER.md` — design system validato da ui-ux-pro-max
3. `tailwind.config.js` — token effettivi configurati
4. `src/components/UI.jsx` — componenti primitivi disponibili

---

## Come Eseguire una Review

### Step 1 — Grep per violazioni automatiche

```bash
TARGET="src/views/NomeView.jsx"  # o src/components/NomeComponente.jsx

# 1. Colori hardcoded (il peccato più comune)
grep -n "bg-\[#\|text-\[#\|border-\[#\|fill-\[#\|stroke-\[#" "$TARGET"

# 2. Colori Tailwind NON tokenizzati (es. orange-500, gray-800)
grep -n "bg-orange\|bg-gray\|bg-zinc\|bg-neutral\|bg-white\|bg-black\b" "$TARGET"
grep -n "text-orange\|text-gray\|text-zinc\|text-neutral\|text-white\b\|text-black\b" "$TARGET"

# 3. Font size non standard
grep -n "text-\[" "$TARGET"

# 4. Altezze e larghezze hardcoded
grep -n "h-\[\|w-\[" "$TARGET"

# 5. Componenti primitivi usati invece di quelli custom
grep -n "<button\b\|<input\b\|<select\b" "$TARGET"
```

### Step 2 — Checklist manuale

**🎨 Colori e Token**
- [ ] Tutti i colori usano token semantici (`text-primary`, `bg-surface`, `text-text-secondary`)?
- [ ] Nessun colore hardcoded (`#FF5722`, `bg-orange-500`, `bg-[#262626]`)?
- [ ] Il ciano (`text-spotter`, `bg-spotter`) è usato SOLO in contesti Spotter AI?
- [ ] La gerarchia superfici è corretta? (`bg-surface` → `bg-surface-secondary` → `bg-surface-tertiary`)
- [ ] Gli stati hover/pressed usano `primary.dark` o le varianti corrette?

**📝 Tipografia**
- [ ] Titoli principali: `font-black`?
- [ ] Label: `text-[10px] uppercase tracking-widest font-black`?
- [ ] Valori numerici (pesi, reps, serie): `font-mono`?
- [ ] Body text: `font-sans` (Inter)?
- [ ] Testo secondario: `text-text-secondary`?
- [ ] Testo terziario: `text-text-tertiary`? (⚠️ verifica typo nel config: `teriary` vs `tertiary`)

**📐 Spaziature e Layout**
- [ ] Card: `rounded-3xl` e `p-6`?
- [ ] Bottoni: `rounded-xl`?
- [ ] Row interattive: `rounded-2xl`?
- [ ] Padding laterale views: `px-5`?
- [ ] Gap tra elementi: usa scale Tailwind standard (no valori arbitrari `gap-[13px]`)?

**🧩 Componenti**
- [ ] Bottoni: usa `<Button>` con la variant corretta (`default`, `ghost`, `destructive`)?
- [ ] Toggle on/off: usa `<Toggle>`?
- [ ] Valori numerici editabili: usa `<Stepper>`?
- [ ] Contenitori card elevati: usa `<Card>`?
- [ ] Nessun `<button>` o `<div onClick>` raw dove esiste il primitivo?

**👆 Interazione**
- [ ] Ogni elemento toccabile ha `active:scale-95` o `active:opacity-70` (feedback touch)?
- [ ] Area toccabile ≥ 48×48px? (usa `min-h-[48px] min-w-[48px]`)
- [ ] Elementi disabled: `opacity-50 cursor-not-allowed pointer-events-none`?
- [ ] Transizioni: `transition-all duration-200` o `duration-150`?

**🌑 Empty & Loading States**
- [ ] Se la lista può essere vuota, c'è un empty state (icona + messaggio + eventuale CTA)?
- [ ] Se c'è un'operazione asincrona, c'è uno spinner (`border-primary animate-spin`)?

---

## Output Atteso

Produci un report strutturato:

```
## UI Token Review — [NomeFile]
**Data**: YYYY-MM-DD

### ✅ Corretto
- ...

### ❌ Violazioni trovate

| # | Linea | Problema | Fix |
|---|-------|---------|-----|
| 1 | L.42  | `bg-[#262626]` hardcoded | → `bg-surface-tertiary` |
| 2 | L.87  | `<button className="...">` raw | → `<Button variant="ghost">` |
| 3 | L.103 | `text-orange-500` | → `text-primary` |

### Severity
- 🔴 Critico (blocca commit): N violazioni
- 🟡 Medio (da fixare prima del merge): N violazioni
- 🟢 Cosmetic (fix when time): N violazioni

### Prossimi passi
1. ...
```

---

## Bug Noti da Verificare Sempre

| Bug | Posizione | Impatto |
|---|---|---|
| Typo `text.teriary` | `tailwind.config.js` | `text-text-tertiary` non funziona |
| Colori Spotter usati fuori contesto | Varie views | Incoerenza visiva |
| `<button>` raw invece di `<Button>` | Componenti vecchi | Inconsistenza stile |
