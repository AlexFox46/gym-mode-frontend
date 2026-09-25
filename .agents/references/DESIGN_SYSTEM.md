# Design System — Gym Mode
> **Documento vivente.** Aggiornare ogni volta che si introduce un nuovo token visivo o componente.
> Ultima revisione: 2026-09-25

---

## Principi Fondamentali

1. **Dark-first**: l'app è progettata per il tema scuro. Il tema chiaro è secondario.
2. **Mobile-first**: viewport target 390-430px (iPhone standard). Max width: 420px.
3. **Tocco generoso**: area toccabile minima **48×48px** per ogni controllo interattivo.
4. **Contrasto netto**: testo su sfondo sempre ≥ 4.5:1 WCAG AA.
5. **Feedback immediato**: ogni azione ha una risposta visiva (scale, opacity, color) entro 200ms.

---

## Palette Colori (Token Tailwind)

### Primario
| Token | Valore | Uso |
|---|---|---|
| `primary` / `primary.DEFAULT` | `#FF5722` | CTA principale, accenti, icone attive, progress |
| `primary.dark` | `#E64A19` | Hover/pressed state del primario |

> ⚠️ **Non usare mai** colori arancio hardcoded (`#FF5722`, `orange-500`, ecc.). Usare sempre `text-primary`, `bg-primary`, `border-primary`.

### Superfici (Backgrounds)
| Token | Valore | Uso |
|---|---|---|
| `surface` / `surface.DEFAULT` | `#000000` | Background app principale, pagine |
| `surface.secondary` | `#121212` | Card, nav bar, pannelli elevated |
| `surface.tertiary` | `#262626` | Input, chip, elementi interattivi, bordi |

> **Gerarchia**: `surface` (profondo) → `surface-secondary` (elevato) → `surface-tertiary` (controlli).

### Testo
| Token | Valore | Uso |
|---|---|---|
| `text.primary` / `text-text-primary` | `#FFFFFF` | Titoli, valori importanti, testo body |
| `text.secondary` / `text-text-secondary` | `#A3A3A3` | Label, metadati, testo secondario |
| `text.tertiary` / `text-text-tertiary` | `#737373` | Placeholder, testo disabilitato, hint |

> ⚠️ **Bug noto in `tailwind.config.js`**: `text.teriary` ha un typo (manca una `r`). Il token corretto è `text-text-tertiary` ma la config dice `teriary`. Verificare prima di usare.

### Spotter (Feature speciale AI)
| Token | Valore | Uso |
|---|---|---|
| `spotter` / `spotter.DEFAULT` | `#00D2FF` | Colore esclusivo della feature Spotter |
| `spotter.dark` | `#0088A8` | Hover/pressed Spotter |
| `spotter.light` | `#E0F8FF` | Testo su sfondo Spotter scuro |
| `spotter.surface` | `#00232C` | Background sezioni Spotter |
| `spotter.glow` | `rgba(0,210,255,0.4)` | Glow effect Spotter |

> **Regola**: il ciano/azzurro elettrico (`spotter.*`) è **riservato esclusivamente** alla feature Spotter AI. Non usarlo in altri contesti.

---

## Tipografia

| Font | Uso | Classe Tailwind |
|---|---|---|
| **Inter** | Body, UI, label, bottoni | `font-sans` (default) |
| **JetBrains Mono** | Valori numerici (pesi, reps, timer) | `font-mono` |

### Scale tipografica in uso
| Uso | Classe | Note |
|---|---|---|
| Label microcopia | `text-[10px] uppercase tracking-widest font-black` | Nav, chip, badge |
| Label form | `text-xs uppercase tracking-widest font-black` | Label input, sezione |
| Corpo | `text-sm font-semibold` | Testo normale |
| Sottotitolo | `text-base font-bold` | |
| Titolo card | `text-lg font-black` | |
| Valore numerico | `text-xl font-mono font-black` | Stepper, counter |
| Display | `text-2xl+ font-black` | Titoli view principali |

---

## Spaziature e Raggi

| Elemento | Border Radius | Note |
|---|---|---|
| Card container | `rounded-3xl` | 24px |
| Bottone | `rounded-xl` | 12px |
| Input / chip piccoli | `rounded-xl` | 12px |
| Stepper button | `rounded-xl` | 12px |
| Toggle | `rounded-full` | |
| Bottom nav | `rounded-none` o bordo top | |

| Padding | Contesto |
|---|---|
| `p-6` | Card interna |
| `p-4` | Stepper, row interattive |
| `px-8 py-4` | Bottone medium |
| `px-6 py-3` | Bottone small |

---

## Componenti Primitivi (`src/components/UI.jsx`)

### `<Button>`
```jsx
<Button 
  variant="primary"    // primary | secondary | tertiary | destructive
  size="medium"        // small | medium | large
  fullWidth={false}
  disabled={false}
/>
```
| Variant | Aspetto |
|---|---|
| `primary` | `bg-primary text-white` — CTA principale |
| `secondary` | `border-2 border-primary text-primary` — Azione secondaria |
| `tertiary` | `border-2 border-surface-tertiary text-text-primary` — Azione neutra |
| `destructive` | `bg-red-600 text-white` — Eliminazione/pericolo |

| Size | Height | Uso |
|---|---|---|
| `small` | 44px | Azioni inline, chip azione |
| `medium` | 52px | CTA standard (default) |
| `large` | 64px | CTA primaria hero |

> ✅ **Sempre usare `<Button>`** per azioni. Non creare bottoni custom con classi Tailwind ad hoc nelle views.

### `<Stepper>`
```jsx
<Stepper label="Serie" value={3} onChange={fn} step={1} unit="x" />
```
Controllo +/- per valori numerici. Area tocco: 48×48px.

### `<Card>`
```jsx
<Card className="optional-extra-classes">...</Card>
```
Container elevato con sfondo `surface`, bordo `surface-tertiary`, shadow soffusa.

### `<Toggle>`
```jsx
<Toggle checked={bool} onChange={fn} />
```
Switch on/off. 56×32px.

### `<Tooltip>`
```jsx
<Tooltip text="Descrizione" position="top|bottom">
  <element />
</Tooltip>
```
Funziona sia su hover (desktop) che su tap (mobile).

---

## Pattern Visivi Ricorrenti

### Bottom Nav
- Fixed bottom, `max-w-[420px]`, `h-16`, `bg-surface-secondary`, `border-t border-surface-tertiary`
- 4 voci: icona + label `text-[10px] uppercase tracking-wider`
- Stato attivo: `text-primary scale-105`, icona `strokeWidth={2.5}` + fill
- Stato inattivo: `text-neutral-400`, icona `strokeWidth={1.8}`

### Loading State
```jsx
<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
```

### Sezione Header View
Pattern standard per header di ogni view:
```jsx
<div className="px-5 pt-6 pb-4">
  <h1 className="text-2xl font-black text-text-primary">Titolo</h1>
  <p className="text-sm text-text-secondary mt-1">Sottotitolo</p>
</div>
```

### Row Interattiva (lista)
```jsx
<div className="flex items-center justify-between p-4 bg-surface-secondary rounded-2xl border border-surface-tertiary active:scale-[0.98] transition-all">
```

### Empty State
```jsx
<div className="flex flex-col items-center justify-center py-16 text-center gap-3">
  <IconComponent size={40} className="text-text-tertiary" />
  <p className="text-sm font-bold text-text-secondary">Nessun dato</p>
  <p className="text-xs text-text-tertiary">Messaggio esplicativo</p>
</div>
```

---

## Shadow System

| Token | Valore | Uso |
|---|---|---|
| `shadow-sm` | default Tailwind | Bottoni |
| `shadow-2xl` | default Tailwind | Bottom nav, modal |
| `shadow-[0_4px_20px_-5px_rgba(0,0,0,0.3)]` | custom | Card elevate |
| `shadow-spotter-glow` | `0 0 20px rgba(0,210,255,0.35)` | Elementi Spotter |
| `shadow-spotter-subtle` | `0 0 10px rgba(0,210,255,0.15)` | Accenti Spotter leggeri |

---

## Animazioni

| Classe | Uso |
|---|---|
| `transition-all duration-200` | Default per hover/active |
| `active:scale-[0.98]` | Feedback tap su elementi grandi |
| `active:scale-90` | Feedback tap su bottoni stepper |
| `hover:opacity-75` / `hover:opacity-90` | Hover su elementi interattivi |
| `scale-105` | Item selezionato/attivo (es. nav) |
| `animate-pulse` | Indicatore Spotter AI attivo |
| `animate-spin` | Loading spinner |

---

## Checklist per Nuovo Componente

- [ ] Usa token colore (`text-primary`, `bg-surface`, ecc.) — mai hardcoded
- [ ] Area tocco ≥ 48px per ogni controllo
- [ ] Stato disabled gestito (opacity 50% + `cursor-not-allowed`)
- [ ] Feedback tap con `active:scale-*` o `transition-all`
- [ ] Font: `font-sans` per testo, `font-mono` per numeri
- [ ] Raggi: `rounded-xl` (controlli), `rounded-2xl` (row), `rounded-3xl` (card)
- [ ] Non reinventa `<Button>`, `<Card>`, `<Stepper>`, `<Toggle>`, `<Tooltip>`
