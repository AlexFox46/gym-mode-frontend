# Piano di Risoluzione UX (UX Fix Plan) — GymMode Web App

**Stato:** In attesa di avvio implementativo  
**Basato su:** UX Audit (Nielsen + Krug) & Design System v1.0.0 (`design-system/gymmode/MASTER.md`)

---

## 🎯 Obiettivo
Eliminare l'attrito cognitivo e le perdite accidentali di dati durante l'uso in sala pesi, uniformando ogni view con i componenti standard del Design System (`src/components/UI.jsx`).

---

## 🚩 FASE 1: Resilienza Editor Schede & Prevenzione Perdita Dati (`SchedeView`)
*Priorità: 🔴 Severity 4 (Critico)*

### Problema
Se l'utente sta creando o modificando una scheda e cambia tab (es. clicca su "Spotter" o "Progressi"), le modifiche locali non salvate vengono perse.

### Soluzione Pianificata
1. **Bozza Temporanea Locale (`localStorage` auto-draft):**
   - Salvare automaticamente la bozza dell'editor in `localStorage` ad ogni modifica del form/giorno/esercizio (`gym_scheda_draft`).
   - Se l'utente torna sulla tab "Schede", l'app chiede: *"Hai una bozza non salvata. Vuoi riprenderla?"*.
2. **Standardizzazione UI con Design System:**
   - Sostituire tutti i `<button>` e `<input>` dell'editor schede con `<Button>`, `<Input>`, `<Select>` e `<Card>` di `src/components/UI.jsx`.

---

## 🔔 FASE 2: Feedback Operativo & Notifiche Cloud (`App.js` & `AllenatiView`)
*Priorità: 🟠 Severity 3 (Major)*

### Problema
L'utente non riceve riscontro se una serie o l'allenamento completo è stato sincronizzato con Supabase.

### Soluzione Pianificata
1. **Integrazione Componente `<Toast>` Globale:**
   - Inserire `<Toast>` in `App.js` guidato dallo stato di sync (`saveWorkoutLog`).
   - Messaggio di successo: *"Allenamento salvato nel Cloud!"* con icona verde.
   - Messaggio di errore/offline: *"Salvato in locale (Modalità Offline)"* con avviso visivo.
2. **Prevenzione Invio Accidentale Fine Allenamento:**
   - Inserire il componente `<Modal>` di conferma prima di terminare l'allenamento:
     - Riepilogo: *"Hai completato X serie su Y totali. Vuoi salvare?"*.

---

## 🔍 FASE 3: Catalogo Esercizi & Filtri Muscolari (`SchedeView` / Modal Esercizi)
*Priorità: 🟠 Severity 3 (Major)*

### Problema
La ricerca degli esercizi è solo testuale. Trovare un esercizio per un gruppo muscolare specifico richiede di conoscere il nome esatto.

### Soluzione Pianificata
1. **Filtri Rapidi (Badge Muscolari):**
   - Inserire badge filtrabili sopra la search bar: `[TUTTI]` `[PETTO]` `[DORSO]` `[GAMBE]` `[SPALLE]` `[BRACCIA]`.
   - Utilizzare i componenti `<Badge variant="primary">` per evidenziare il filtro attivo.

---

## ⚙️ FASE 4: Accessibilità Header Impostazioni & Profilo (`App.js` & `ProgressiView`)
*Priorità: 🟠 Severity 3 (Major)*

### Problema
L'accesso alle Impostazioni e al logout è nascosto nella tab "Progressi".

### Soluzione Pianificata
1. **Header Globale Superiore:**
   - Creare un piccolo header fisso in alto con il logo **GymMode**, l'indicatore dello stato della connessione e l'icona ingranaggio per accedere a `<SettingsView>` direttamente da qualsiasi schermata.

---

## 📜 Registro Verifiche & Prossimi Passi
- [x] Design System Master formulato (`design-system/gymmode/MASTER.md`)
- [x] Token Tailwind corretti e completati (`tailwind.config.js`)
- [x] Libreria Componenti Primitivi creata (`src/components/UI.jsx`)
- [x] Piano dei Fix UX approvato (`UX_FIX_PLAN.md`)
- [ ] Implementazione FASE 1 (Resilienza Editor Schede)
- [ ] Implementazione FASE 2 (Feedback Toast & Modali)
- [ ] Implementazione FASE 3 (Filtri Catalogo Esercizi)
- [ ] Implementazione FASE 4 (Header Globale & Settings)
