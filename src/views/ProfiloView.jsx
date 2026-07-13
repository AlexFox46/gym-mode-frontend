import React from 'react';
import { Card, Button, Toggle } from '../components/UI';

export const ProfiloView = ({ settings, onSettingsChange, onLogout }) => {
  const updateSetting = (key, value) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="p-4 space-y-5 pb-12">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-success flex items-center justify-center text-white text-xl font-bold">AF</div>
        <div>
          <h2 className="text-h2 font-bold text-neutral-950 dark:text-white">Il mio profilo</h2>
          <p className="text-xs text-neutral-500">Impostazioni e preferenze locali</p>
        </div>
      </div>

      {/* Sezione Biometrici */}
      <div>
        <span className="text-xs font-bold tracking-wider text-neutral-400 uppercase block mb-1.5">Biometrici</span>
        <Card className="divide-y divide-neutral-200 dark:divide-neutral-800 p-0">
          <div className="flex justify-between items-center p-3">
            <span className="text-sm text-neutral-700 dark:text-neutral-300">Peso Corporeo</span>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold dark:text-white">{settings.weight} kg</span>
              <Button size="small" variant="secondary" onClick={() => updateSetting('weight', settings.weight + 1)}>Modifica</Button>
            </div>
          </div>
          <div className="flex justify-between items-center p-3">
            <span className="text-sm text-neutral-700 dark:text-neutral-300">Altezza</span>
            <span className="font-mono font-bold dark:text-white">{settings.height} cm</span>
          </div>
        </Card>
      </div>

      {/* Sezione Preferenze */}
      <div>
        <span className="text-xs font-bold tracking-wider text-neutral-400 uppercase block mb-1.5">Preferenze</span>
        <Card className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-neutral-700 dark:text-neutral-300">Tema App</span>
            <select 
              value={settings.theme_preference}
              onChange={(e) => updateSetting('theme_preference', e.target.value)}
              className="bg-neutral-50 dark:bg-neutral-800 border rounded p-1 text-sm dark:text-white"
            >
              <option value="System">Sistema</option>
              <option value="Light">Light Mode</option>
              <option value="Dark">Dark Mode</option>
            </select>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-neutral-700 dark:text-neutral-300">Arrotondamento Carichi</span>
            <div className="flex items-center gap-1">
              {[0.5, 1, 2.5].map((step) => (
                <button
                  key={step}
                  type="button"
                  onClick={() => updateSetting('step_increment', step)}
                  className={`px-3 py-1.5 font-mono text-xs font-semibold rounded ${
                    settings.step_increment === step ? 'bg-success text-white' : 'bg-neutral-100 dark:bg-neutral-800 dark:text-white'
                  }`}
                >
                  {step} kg
                </button>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Sezione Feedback Allenamento */}
      <div>
        <span className="text-xs font-bold tracking-wider text-neutral-400 uppercase block mb-1.5">Feedback durante l'allenamento</span>
        <Card className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-neutral-700 dark:text-neutral-300">Vibrazione (Haptic)</span>
            <Toggle checked={settings.vibration} onChange={(val) => updateSetting('vibration', val)} />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-neutral-700 dark:text-neutral-300">Suono fine countdown</span>
            <Toggle checked={settings.prep_sound} onChange={(val) => updateSetting('prep_sound', val)} />
          </div>
        </Card>
      </div>

      {/* Sezione Esportazione Dati e Sicurezza Account */}
      <div className="pt-2">
        <span className="text-xs font-bold tracking-wider text-neutral-400 uppercase block mb-1.5">Azioni Account</span>
        <Card className="space-y-3 bg-neutral-50 dark:bg-neutral-900 border-dashed">
          <Button variant="secondary" fullWidth onClick={() => alert("Esportazione CSV avviata.")}>
            📥 Esporta Storico Logs (CSV)
          </Button>
          <Button variant="destructive" fullWidth onClick={() => alert("Storico eliminato localmente.")}>
            🗑 Cancella Storico Locale
          </Button>
          
          {/* Zona Rossa - Autenticazione Supabase */}
          <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <Button variant="destructive" fullWidth onClick={onLogout}>
              🚪 Disconnetti Account
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

  