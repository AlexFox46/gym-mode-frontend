import React from 'react';
import { Card, Button, Toggle } from '../components/UI';
import { deleteUserAccount } from '../services/supabaseServices';
import { Settings, Moon, Smartphone, Bell, Download, Trash2, LogOut, AlertTriangle, ArrowLeft } from 'lucide-react';

export const SettingsView = ({ settings, onSettingsChange, onLogout, onBack }) => {
  const updateSetting = (key, value) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const handleEliminaAccount = async () => {
    const primaConferma = window.confirm('ATTENZIONE: Sei sicuro di voler eliminare definitivamente il tuo account?');
    if (!primaConferma) return;
    const secondaConferma = window.confirm('Questa azione è irreversibile. Tutti i tuoi dati verranno cancellati. Continuare?');
    if (!secondaConferma) return;
    try {
      await deleteUserAccount();
      window.location.reload();
    } catch (err) {
      alert('Errore durante l\'eliminazione dell\'account: ' + err.message);
    }
  };

  return (
    <div className="max-w-[420px] mx-auto min-h-screen bg-surface p-4 pb-32 select-none animate-fadeIn">
      {/* HEADER CON PULSANTE INDIETRO */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-2xl bg-surface-secondary flex items-center justify-center text-white border border-surface-tertiary hover:border-primary active:scale-95 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-2xl font-black text-text-primary tracking-tight">Impostazioni</h2>
          <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mt-0.5">Preferenze e Account</p>
        </div>
      </div>

      {/* SEZIONI IMPOSTAZIONI */}
      <div className="space-y-6">
        {/* PREFERENZE APP */}
        <div>
          <span className="flex items-center gap-2 text-[10px] font-black tracking-widest text-text-secondary uppercase mb-3 ml-1">
            <Settings size={14} /> Preferenze
          </span>
          <Card>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Moon size={20} className="text-text-tertiary" />
                <span className="text-sm font-bold text-text-primary">Tema Interfaccia</span>
              </div>
              <select 
                value={settings.theme_preference}
                onChange={(e) => updateSetting('theme_preference', e.target.value)}
                className="bg-surface-tertiary border-none rounded-xl p-2 text-[11px] font-black text-white focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="System">Sistema</option>
                <option value="Light">Light Mode</option>
                <option value="Dark">Dark Mode</option>
              </select>
            </div>
          </Card>
        </div>

        {/* FEEDBACK & NOTIFICHE */}
        <div>
          <span className="flex items-center gap-2 text-[10px] font-black tracking-widest text-text-secondary uppercase mb-3 ml-1">
            <Smartphone size={14} /> Feedback
          </span>
          <Card className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Smartphone size={20} className="text-text-tertiary" />
                <span className="text-sm font-bold text-text-primary">Vibrazione (Haptic)</span>
              </div>
              <Toggle checked={settings.vibration} onChange={(val) => updateSetting('vibration', val)} />
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-surface-tertiary">
              <div className="flex items-center gap-3">
                <Bell size={20} className="text-text-tertiary" />
                <span className="text-sm font-bold text-text-primary">Suono fine timer</span>
              </div>
              <Toggle checked={settings.prep_sound} onChange={(val) => updateSetting('prep_sound', val)} />
            </div>
          </Card>
        </div>

        {/* AZIONI E SICUREZZA */}
        <div>
          <span className="text-[10px] font-black tracking-widest text-text-secondary uppercase mb-3 ml-1 block">Zona Sicurezza</span>
          <div className="space-y-3">
            <Button variant="secondary" fullWidth disabled title="Funzionalità in arrivo">
              <Download size={16} className="mr-2" /> Esporta Storico (in arrivo)
            </Button>
            <Button variant="secondary" fullWidth disabled title="Funzionalità in arrivo">
              <Trash2 size={16} className="mr-2" /> Pulisci Logs (in arrivo)
            </Button>
            <Button variant="secondary" fullWidth onClick={onLogout} className="mt-6 bg-surface-tertiary">
              <LogOut size={16} className="mr-2" /> Esci
            </Button>
            <Button variant="destructive" fullWidth onClick={handleEliminaAccount}>
              <AlertTriangle size={16} className="mr-2" /> Elimina Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
