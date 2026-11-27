# 🔒 Security Audit — gym-mode-frontend
**Data:** 2026-11-27 | **Scope:** Codebase completo (React + Supabase)

---

## Riepilogo Rischi

| Severità | Trovati |
|----------|---------|
| 🔴 Alta | 2 |
| 🟡 Media | 4 |
| 🟢 Bassa / Hardening | 5 |

---

## 🔴 ALTA SEVERITÀ

### [1] `JSON.parse` su dati localStorage senza try/catch
**File:** [`App.js` L56, L124](file:///Users/alessandrofoti/Downloads/gym-mode-frontend-main%202/src/App.js#L56-L56)

```js
// VULNERABILE
const localLogs = JSON.parse(localStorage.getItem('gym_workout_history') || '[]');
```

Se il valore nel localStorage è stato corrotto (da un errore precedente, da un'estensione del browser, o da un XSS in un'altra app sullo stesso dominio), `JSON.parse` lancia un `SyntaxError` non gestito che **blocca tutta l'app al login**.

**Fix:**
```js
const safeParseLocalStorage = (key, fallback = []) => {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    localStorage.removeItem(key); // Pulisce il dato corrotto
    return fallback;
  }
};
const localLogs = safeParseLocalStorage('gym_workout_history');
```

---

### [2] Operazioni DB senza verifica dell'ownership lato client (defense in depth)
**File:** [`supabaseServices.js` L319-L355](file:///Users/alessandrofoti/Downloads/gym-mode-frontend-main%202/src/services/supabaseServices.js#L319-L355), [`SchedeView.jsx` L371-L440](file:///Users/alessandrofoti/Downloads/gym-mode-frontend-main%202/src/views/SchedeView.jsx#L371-L440)

Le funzioni `updateSchedaGoal`, `updateSchedaRoutine`, `deleteScheda`, `activateScheda` e `updateSpotterSuggestionStatus` eseguono operazioni su record identificati **solo dall'`id`** senza verificare prima che l'utente sia autenticato o che possegga il record:

```js
// updateSchedaGoal — nessun controllo userId
export const updateSchedaGoal = async (schedaId, goal) => {
  const { error } = await supabase
    .from('workout_schemes')
    .update({ goal })
    .eq('id', schedaId); // ← nessun .eq('user_id', userId)
```

> [!IMPORTANT]
> La sicurezza reale dipende **esclusivamente dalle RLS (Row Level Security) di Supabase**. Se le policy RLS non sono attive o sono mal configurate, un utente malevolo potrebbe modificare/cancellare dati altrui conoscendo solo l'UUID di un record.

**Fix:** Verificare che le policy RLS siano attive su tutte le tabelle (`workout_schemes`, `workout_logs`, `spotter_suggestions`, `profiles`). Come difesa in profondità, aggiungere `.eq('user_id', userId)` anche nelle funzioni di update/delete del service layer.

---

## 🟡 MEDIA SEVERITÀ

### [3] `localStorage` come fallback per dati sensibili di allenamento
**File:** [`App.js` L123-L125](file:///Users/alessandrofoti/Downloads/gym-mode-frontend-main%202/src/App.js#L123-L125), [`AllenatiView.jsx` L14](file:///Users/alessandrofoti/Downloads/gym-mode-frontend-main%202/src/views/AllenatiView.jsx#L14), [`SchedeView.jsx` L48-L83](file:///Users/alessandrofoti/Downloads/gym-mode-frontend-main%202/src/views/SchedeView.jsx#L48-L83)

Il `localStorage` è accessibile da qualsiasi script JS sulla stessa origine (incluse estensioni browser). I log di allenamento completi (con esercizi, pesi, tonnellate) vengono salvati in chiaro.

**Rischio:** Se in futuro l'app dovesse ospitare contenuti di terze parti o script pubblicitari, i dati utente sarebbero esposti.

**Fix:** Considerare `sessionStorage` per dati temporanei (workout in corso), o cifrare i dati più sensibili prima di persistere su `localStorage`.

---

### [4] `CI=false` nel build script ignora i warning ESLint come errori
**File:** [`package.json` L19](file:///Users/alessandrofoti/Downloads/gym-mode-frontend-main%202/package.json#L19)

```json
"build": "CI=false react-scripts build"
```

`CI=false` disabilita il trattamento dei warning ESLint come errori in fase di build. Questo permette di deployare codice con potenziali warning di sicurezza silenziosamente. Molti strumenti CI/CD impostano `CI=true` automaticamente per garantire build più sicure.

**Fix:** Rimuovere `CI=false`. Se ci sono warning esistenti, risolverli invece di sopprimerli globalmente.

---

### [5] Nessuna validazione della lunghezza minima della password in fase di registrazione
**File:** [`LoginView.jsx` L17-L21](file:///Users/alessandrofoti/Downloads/gym-mode-frontend-main%202/src/views/LoginView.jsx#L17-L21)

```js
if (!email.trim() || !password.trim()) {
  setErrorMsg('Inserisci sia email che password.');
```

Il form di registrazione accetta qualsiasi password non vuota (anche `"a"`). Supabase applica un minimo di 6 caratteri server-side, ma l'errore viene mostrato solo dopo la chiamata di rete.

**Fix:** Aggiungere validazione client-side:
```js
if (isRegistering && password.length < 8) {
  setErrorMsg('La password deve essere di almeno 8 caratteri.');
  setLoading(false);
  return;
}
```

---

### [6] Pulsanti funzionalmente non implementati mostrano `alert()` in produzione
**File:** [`SettingsView.jsx` L94-L98](file:///Users/alessandrofoti/Downloads/gym-mode-frontend-main%202/src/views/SettingsView.jsx#L94-L98), [`ProfiloView.jsx` L92-L96](file:///Users/alessandrofoti/Downloads/gym-mode-frontend-main%202/src/views/ProfiloView.jsx#L92-L96)

```jsx
<Button onClick={() => alert("Esportazione CSV avviata.")}>Esporta Storico</Button>
<Button onClick={() => alert("Storico eliminato.")}>Pulisci Logs</Button>
```

"Pulisci Logs" fa credere all'utente che i dati siano stati eliminati, ma **non elimina nulla**. Questo è un problema di integrità dei dati e di fiducia utente, con potenziali implicazioni GDPR (diritto alla cancellazione).

**Fix:** Implementare le funzionalità reali o rimuovere i pulsanti fino all'implementazione. Usare il componente `Toast` già presente invece di `alert()`.

---

## 🟢 BASSA SEVERITÀ / HARDENING

### [7] Nessun attributo `autocomplete` sugli input del form di login
**File:** [`LoginView.jsx` L71-L89](file:///Users/alessandrofoti/Downloads/gym-mode-frontend-main%202/src/views/LoginView.jsx#L71-L89)

Mancano `autocomplete="email"` e `autocomplete="current-password"` / `autocomplete="new-password"`. Questo peggiora l'UX e può confondere i password manager.

**Fix:**
```jsx
<input type="email" autocomplete="email" ... />
<input type="password" autocomplete={isRegistering ? "new-password" : "current-password"} ... />
```

---

### [8] `console.log` con informazioni operative in produzione
**File:** `App.js` L41, `supabaseServices.js` L82, L272, `SchedeView.jsx` L381, L418

Log tipo `"✅ Caricati 47 esercizi da Supabase"` o `"✅ Profilo creato automaticamente"` espongono nei DevTools informazioni operative che potrebbero aiutare un attaccante nel fingerprinting dell'applicazione.

**Fix:** Usare un utility logger che disabilita i `console.log` in produzione:
```js
const log = process.env.NODE_ENV === 'development' ? console.log : () => {};
```

---

### [9] `.gitignore` non include `.env` base (solo le varianti `.local`)
**File:** [`.gitignore` L16-L19](file:///Users/alessandrofoti/Downloads/gym-mode-frontend-main%202/.gitignore#L16-L19)

Il file `.env` base (senza suffisso) non è incluso nel `.gitignore`. Se qualcuno creasse un file `.env` (senza `.local`), verrebbe committato.

**Fix:**
```gitignore
# Tutti i file di environment
.env
.env.local
.env.development
.env.development.local
.env.test.local
.env.production.local
```

---

### [10] Funzionalità "Elimina Account" duplicata in due view
**File:** [`ProfiloView.jsx` L11-L23](file:///Users/alessandrofoti/Downloads/gym-mode-frontend-main%202/src/views/ProfiloView.jsx#L11-L23), [`SettingsView.jsx` L11-L23](file:///Users/alessandrofoti/Downloads/gym-mode-frontend-main%202/src/views/SettingsView.jsx#L11-L23)

La stessa logica critica (`delete_user` RPC + signOut + reload) è duplicata identicamente in due componenti separati. Se la logica venisse aggiornata in uno solo (es. aggiunta di un secondo `confirm` di sicurezza), l'altra rimarrebbe vulnerabile.

**Fix:** Estrarre in una funzione condivisa in `supabaseServices.js`.

---

### [11] `select('*')` su query con `user_id` già filtrato
**File:** [`supabaseServices.js` L98](file:///Users/alessandrofoti/Downloads/gym-mode-frontend-main%202/src/services/supabaseServices.js#L98), [`SchedeView.jsx` L337, L385, L422](file:///Users/alessandrofoti/Downloads/gym-mode-frontend-main%202/src/views/SchedeView.jsx#L337)

```js
.select('*')   // Recupera tutte le colonne
.eq('user_id', userId)
```

Recuperare `select('*')` include campi non necessari (es. metadati interni), aumenta il payload di rete e potrebbe esporre colonne aggiunte in futuro senza modificare il codice.

**Fix:** Specificare esplicitamente le colonne necessarie (come già fatto correttamente in `fetchWorkoutLogs`).

---

## ✅ Aspetti Positivi Rilevati

- ✅ Credenziali Supabase correttamente gestite tramite variabili d'ambiente (`process.env.REACT_APP_*`)
- ✅ Nessun uso di `dangerouslySetInnerHTML` → XSS non presente
- ✅ Nessun uso di `eval()`
- ✅ Autenticazione delegata interamente a Supabase Auth (best practice)
- ✅ Il `userId` viene filtrato correttamente nelle query principali (`fetchSchede`, `fetchWorkoutLogs`, `saveWorkoutLog`)
- ✅ Nessuna credential hardcodata nel codice sorgente
- ✅ I file `.env.local` sono correttamente esclusi dal `.gitignore`
- ✅ Le password non vengono mai loggate o esposte nel codice

---

## Piano di Priorità Fix

| Priorità | Fix | File |
|----------|-----|------|
| 1 | `safeParseLocalStorage` wrapper | `App.js` |
| 2 | Verificare RLS Supabase su tutte le tabelle | Supabase Dashboard |
| 3 | Aggiungere `.eq('user_id')` in service layer | `supabaseServices.js` |
| 4 | Implementare o rimuovere "Pulisci Logs" / "Esporta" | `SettingsView.jsx` |
| 5 | Aggiungere validazione password minima | `LoginView.jsx` |
| 6 | Rimuovere `CI=false` dal build | `package.json` |
| 7 | Disabilitare `console.log` in prod | `App.js`, `supabaseServices.js` |
| 8 | Aggiungere `.env` base al `.gitignore` | `.gitignore` |
| 9 | Aggiungere `autocomplete` agli input | `LoginView.jsx` |
| 10 | Estrarre logica "Elimina Account" condivisa | `supabaseServices.js` |

---

## ✅ Stato dei fix (2026-11-27)

| # | Problema | Stato | Note |
|---|----------|-------|------|
| 1 | `JSON.parse` localStorage senza try/catch | ✅ Risolto | `safeParseLocalStorage` in `App.js`, con pulizia del dato corrotto |
| 2 | Operazioni DB senza `user_id` | ✅ Risolto nel codice | `user_id` aggiunto a update/delete/activate; `updateSpotterSuggestionStatus` accetta `userId` opzionale. **Da verificare:** policy RLS su Supabase (non verificabile dal codice) |
| 3 | `localStorage` per dati di allenamento | ⏸️ Rimandato | Decisione architetturale: richiede scelta tra `sessionStorage` e cifratura. Nessuna modifica in questo giro |
| 4 | `CI=false` nel build | ✅ Risolto | Rimosso da `package.json` |
| 5 | Validazione password minima | ✅ Risolto | Minimo 8 caratteri lato client in `LoginView.jsx` |
| 6 | Pulsanti placeholder con `alert()` | ✅ Risolto | "Esporta Storico" e "Pulisci Logs" disabilitati con etichetta "in arrivo" in `SettingsView.jsx` e `ProfiloView.jsx` |
| 7 | `autocomplete` sul login | ✅ Risolto | Aggiunti in `LoginView.jsx` |
| 8 | `console.log` in produzione | ✅ Risolto | `devLog` condizionato a `NODE_ENV === 'development'` |
| 9 | `.env` assente dal `.gitignore` | ✅ Risolto | Aggiunto `.env` |
| 10 | "Elimina Account" duplicato | ✅ Risolto | Logica centralizzata in `deleteUserAccount()` |
| 11 | `select('*')` | 🟡 Parziale | Corretto `fetchSchede`. Resta `select('*')` su `spotter_suggestions` in `fetchPendingSpotterSuggestions`: da completare con le colonne effettivamente usate |

Nota: le modifiche sono nel working tree e non sono ancora committate.
