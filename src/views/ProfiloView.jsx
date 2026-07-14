import React from 'react';
import { Card, Button, Toggle } from '../components/UI';
import { supabase } from '../supabaseClient'; 
import { User, Settings, Moon, Smartphone, Bell, Download, Trash2, LogOut, AlertTriangle } from 'lucide-react';

export const ProfiloView = ({ settings, onSettingsChange, onLogout }) => {
  const updateSetting = (key, value) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const handleEliminaAccount = async () => {
    const conferma = window.confirm(
      "ATTENZIONE: Sei sicuro di voler eliminare definitivamente il tuo account? Questa azione è irreversibile."
    );
    
    if (conferma) {
      try {
        const { error } = await supabase.rpc('delete_user');
        if (error) throw error;
        
        alert("Account eliminato con successo.");
        await supabase.auth.signOut();
        window.location.reload(); 
      } catch (err) {
        console.error("Errore durante l'eliminazione:", err);
        alert("Impossibile eliminare l'account: " + err.message);
      }
    }
  };

  return (
    <div className="p-4 space-y-5 pb-28 bg-[#f0f4f8] dark:bg-neutral-950 min-h-screen font-sans">
      
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-[#15a34a] flex items-center justify-center text-white shadow-md">
          <User size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">Il mio Profilo</h2>
          <p className="text-xs font-semibold text-neutral-500 mt-0.5">Gestione account e preferenze</p>
        </div>
      </div>

      {/* PREFERENZE APP */}
      <div>
        <span className="flex items-center gap-1.5 text-[10px] font-black tracking-widest text-neutral-400 uppercase mb-2 ml-1">
          <Settings size={12} /> Preferenze App
        </span>
        <Card className="p-4 space-y-5 border-none ring-1 ring-neutral-200/50 dark:ring-neutral-800 shadow-sm">
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Moon size={18} className="text-neutral-500" />
              <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">Tema Interfaccia</span>
            </div>
            <select 
              value={settings.theme_preference}
              onChange={(e) => updateSetting('theme_preference', e.target.value)}
              className="bg-neutral-100 dark:bg-neutral-800 border-none rounded-lg p-2 text-xs font-bold text-neutral-900 dark:text-white focus:ring-2 focus:ring-[#15a34a]"
            >
              <option value="System">Sistema</option>
              <option value="Light">Light Mode</option>
              <option value="Dark">Dark Mode</option>
            </select>
          </div>

        </Card>
      </div>

      {/* FEEDBACK ALLENAMENTO */}
      <div>
        <span className="flex items-center gap-1.5 text-[10px] font-black tracking-widest text-neutral-400 uppercase mb-2 ml-1">
          <Smartphone size={12} /> Feedback Allenamento
        </span>
        <Card className="p-4 space-y-5 border-none ring-1 ring-neutral-200/50 dark:ring-neutral-800 shadow-sm">
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Smartphone size={18} className="text-neutral-500" />
              <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">Vibrazione (Haptic)</span>
            </div>
            <Toggle checked={settings.vibration} onChange={(val) => updateSetting('vibration', val)} />
          </div>
          
          <div className="flex justify-between items-center pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <Bell size={18} className="text-neutral-500" />
              <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">Suono fine timer</span>
            </div>
            <Toggle checked={settings.prep_sound} onChange={(val) => updateSetting('prep_sound', val)} />
          </div>
          
        </Card>
      </div>

      {/* AZIONI E SICUREZZA */}
      <div className="pt-4">
        <span className="text-[10px] font-black tracking-widest text-neutral-400 uppercase block mb-2 ml-1">Zona Sicurezza</span>
        <Card className="p-4 space-y-3 bg-white dark:bg-neutral-900 border-dashed border-2 border-neutral-200 dark:border-neutral-800 shadow-none">
          
          <Button variant="secondary" fullWidth onClick={() => alert("Esportazione CSV avviata.")} className="gap-2 justify-start rounded-xl text-xs">
            <Download size={16} /> Esporta Storico Logs (CSV)
          </Button>
          
          <Button variant="secondary" fullWidth onClick={() => alert("Storico eliminato localmente.")} className="gap-2 justify-start rounded-xl text-xs text-neutral-600">
            <Trash2 size={16} /> Cancella Storico Locale
          </Button>
          
          <div className="pt-3 mt-3 border-t border-neutral-100 dark:border-neutral-800 space-y-3">
            <Button variant="secondary" fullWidth onClick={onLogout} className="gap-2 justify-center rounded-xl text-xs font-black border-none bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200">
              <LogOut size={16} /> Disconnetti Account
            </Button>
            
            <Button variant="destructive" fullWidth onClick={handleEliminaAccount} className="gap-2 justify-center rounded-xl text-xs font-black shadow-md">
              <AlertTriangle size={16} /> Elimina Account Definitivamente
            </Button>
          </div>
          
        </Card>
      </div>
      
    </div>
  );
};
