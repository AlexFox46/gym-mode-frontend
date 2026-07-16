import React from 'react';
import { Card, Button, Toggle } from '../components/UI';
import { supabase } from '../supabaseClient'; 
import { User, Settings, Moon, Smartphone, Bell, Download, Trash2, LogOut, AlertTriangle } from 'lucide-react';

export const ProfiloView = ({ settings, onSettingsChange, onLogout }) => {
  const updateSetting = (key, value) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const handleEliminaAccount = async () => {
    const conferma = window.confirm("ATTENZIONE: Sei sicuro di voler eliminare definitivamente il tuo account?");
    if (conferma) {
      try {
        const { error } = await supabase.rpc('delete_user');
        if (error) throw error;
        await supabase.auth.signOut();
        window.location.reload(); 
      } catch (err) {
        alert("Errore: " + err.message);
      }
    }
  };

  return (
    // Wrapper responsivo centrato
    <div className="max-w-[420px] mx-auto min-h-screen bg-surface p-4 pb-32">
      
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-black shadow-lg">
          <User size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-text-primary tracking-tight">Il mio Profilo</h2>
          <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mt-1">Impostazioni</p>
        </div>
      </div>

      {/* PREFERENZE APP */}
      <div className="space-y-6">
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

        {/* FEEDBACK */}
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
            <Button variant="secondary" fullWidth onClick={() => alert("Esportazione CSV avviata.")}>
              <Download size={16} className="mr-2" /> Esporta Storico
            </Button>
            <Button variant="secondary" fullWidth onClick={() => alert("Storico eliminato.")}>
              <Trash2 size={16} className="mr-2" /> Pulisci Logs
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
