import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Button } from '../components/UI';

export const ResetPasswordView = ({ onDone }) => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (password.length < 8) {
      setErrorMsg('La password deve essere di almeno 8 caratteri.');
      return;
    }
    if (password !== confirm) {
      setErrorMsg('Le password non coincidono.');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      onDone();
    } catch (err) {
      setErrorMsg(err.message || 'Impossibile aggiornare la password.');
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    'h-11 px-3 border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 rounded-md focus:outline-none focus:ring-2 focus:ring-focus text-sm dark:text-white font-medium';
  const labelCls = 'text-[10px] font-bold text-neutral-400 uppercase tracking-wider';

  return (
    <div className="min-h-screen flex flex-col justify-center bg-neutral-50 dark:bg-neutral-950 px-6 font-sans">
      <div className="w-full max-w-[380px] mx-auto space-y-6">
        <div className="text-center">
          <span className="text-4xl">🔑</span>
          <h1 className="text-2xl font-black text-neutral-950 dark:text-white mt-2 tracking-tight">NUOVA PASSWORD</h1>
        </div>
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-light-default dark:shadow-dark-default">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className={labelCls}>Nuova password</label>
              <input type="password" autoComplete="new-password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} />
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelCls}>Conferma password</label>
              <input type="password" autoComplete="new-password" placeholder="••••••••" value={confirm} onChange={(e) => setConfirm(e.target.value)} className={inputCls} />
            </div>
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-xs font-semibold leading-tight">{errorMsg}</div>
            )}
            <Button size="medium" variant="primary" fullWidth type="submit" disabled={loading}>
              {loading ? 'Salvataggio...' : 'SALVA NUOVA PASSWORD'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
