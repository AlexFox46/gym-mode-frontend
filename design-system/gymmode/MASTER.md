# GymMode Design System — Master Specification

**Versione:** 1.0.0  
**Target:** Web / Mobile Web (Viewport Max 420px)  
**Stile:** Dark Mode Premium / High-Contrast Performance Gym App  

---

## 🎨 Token di Sistema (Colori & Superfici)

### Base & Superfici
- `bg-surface` (`#0A0A0A`): Sfondo primario dell'applicazione.
- `bg-surface-secondary` (`#121212`): Container di schede, form card, modali.
- `bg-surface-tertiary` (`#262626`): Righe di tabella/input inattivi/bordi.
- `bg-surface-hover` (`#1E1E1E`): Stato hover di elementi cliccabili secondari.

### Tipografia & Testo
- `text-text-primary` (`#FFFFFF`): Titoli H1/H2, dati numerici principali, etichette attive.
- `text-text-secondary` (`#A3A3A3`): Sottotitoli, etichette secondarie, testi descrittivi.
- `text-text-tertiary` (`#737373`): Placeholder, unità di misura, metadati secondari.
- `text-text-muted` (`#525252`): Elementi disabilitati o d'archivio.

### Brand & Accenti
- `primary` (`#FF5722`): Arancio Energetico GymMode — CTA primarie, focus ring, stati attivi.
- `primary.dark` (`#E64A19`): Stato hover/active bottoni primari.
- `spotter` (`#00D2FF`): Ciano Elettrico Spotter AI — Riservato esclusivamente a funzionalità o suggerimenti dell'assistente AI.

### Feedback Semantico
- `feedback.success` (`#22C55E`): Serie completate, salvataggio riuscito, PR sbloccato.
- `feedback.error` (`#EF4444`): Errori di rete, eliminazioni, serie fallite.
- `feedback.warning` (`#F59E0B`): Avvisi di serie saltate o dati mancanti.

---

## 📐 Regole di Layout, Spaziature e Forme

- **Raggio Angoli:**
  - Componenti piccoli (bottoni, input): `rounded-xl` (12px)
  - Elementi di riga (stepper, riga esercizio): `rounded-2xl` (16px)
  - Card & Modali: `rounded-3xl` (24px)
- **Tatto & Accessibilità (Mobile-First):**
  - **Area minima di tocco:** `48x48px` (`min-h-[48px] min-w-[48px]`)
  - Feedback tattile su ogni tap: `active:scale-[0.97]` o `active:opacity-80`
- **Tipografia Standard:**
  - Titoli di sezione: `font-black uppercase tracking-wider`
  - Etichette piccolissime: `text-[10px] uppercase font-black tracking-widest`
  - Dati numerici (Kg, Reps, Timer): `font-mono font-black`

---

## 🧩 Componenti Primitivi Uniformati (`src/components/UI.jsx`)

Tutto il codice dell'app deve utilizzare **esclusivamente** i componenti forniti da `src/components/UI.jsx`:

1. `<Button>` — Bottoni con varianti (`primary`, `secondary`, `tertiary`, `ghost`, `destructive`, `spotter`).
2. `<Card>` — Container card elevato con bordo tokenizzato.
3. `<Input>` / `<Select>` — Input form con focus ring arancione/ciano.
4. `<Stepper>` — Contatore a grandi pulsanti + / – per kg e reps.
5. `<Toggle>` — Switch visivo ON/OFF.
6. `<Badge>` — Etichetta di stato/categoria.
7. `<Toast>` — Feedback temporaneo (Successo/Errore).
8. `<Modal>` / `<Drawer>` — Finestra modale con sfocatura di sfondo.
9. `<EmptyState>` — Schermata di cortesia per liste senza elementi.
