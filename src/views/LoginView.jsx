import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Button } from '../components/UI';

export const LoginView = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Inserisci sia email che password.');
      setLoading(false);
      return;
    }

    try {
      if (isRegistering) {
        // REGISTRAZIONE NUOVO UTENTE
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password,
        });
        if (error) throw error;
        alert('Registrazione completata! Se hai attivato la conferma via email, controlla la tua casella di posta.');
        setIsRegistering(false);
      } else {
        // ACCESSO UTENTE ESISTENTE
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });
        if (error) throw error;
        if (data?.user) {
          onLoginSuccess(data.user);
        }
      }
    } catch (err) {
      setErrorMsg(err.message || 'Si è verificato un errore durante l\'autenticazione.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-neutral-50 dark:bg-neutral-950 px-6 font-sans">
      <div className="w-full max-w-[380px] mx-auto space-y-6">
        {/* Brand Header */}
        <div className="text-center">
          <span className="text-4xl">🏋️‍♂️</span>
          <h1 className="text-2xl font-black text-neutral-950 dark:text-white mt-2 tracking-tight">GYM MODE</h1>
          <p className="text-xs text-neutral-500 uppercase tracking-widest mt-1">One-Hand Training Log</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-light-default dark:shadow-dark-default">
          <h2 className="text-lg font-bold text-neutral-950 dark:text-white mb-4">
            {isRegistering ? 'Crea un account' : 'Accedi al tuo profilo'}
          </h2>

          <form onSubmit={handleAuth} className="space-y-4">
            {/* Input Email */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Email</label>
              <input
                type="email"
                placeholder="nome@esempio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 px-3 border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 rounded-md focus:outline-none focus:ring-2 focus:ring-focus text-sm dark:text-white font-medium"
              />
            </div>

            {/* Input Password */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 px-3 border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 rounded-md focus:outline-none focus:ring-2 focus:ring-focus text-sm dark:text-white font-medium"
              />
            </div>

            {/* Error Banner */}
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-xs font-semibold leading-tight">
                {errorMsg}
              </div>
            )}

            {/* Submit CTA */}
            <Button size="medium" variant="primary" fullWidth type="submit" disabled={loading}>
              {loading ? 'Elaborazione...' : isRegistering ? 'REGISTRATI' : 'ACCEDI'}
            </Button>
          </form>

          {/* Toggle Registrazione / Accesso */}
          <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-center">
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setErrorMsg('');
              }}
              className="text-xs text-success font-bold hover:underline active:scale-95 transition-transform"
            >
              {isRegistering ? 'Hai già un account? Accedi' : 'Non hai un account? Registrati ora'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};