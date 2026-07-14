import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { LoginView } from './views/LoginView';
import { AllenatiView } from './views/AllenatiView';
import { SchedeView } from './views/SchedeView';
import { ProgressiView } from './views/ProgressiView';
import { ProfiloView } from './views/ProfiloView';
import { Dumbbell, BookOpen, TrendingUp, User } from 'lucide-react'; // Nuovo Icon Pack

function App() {
  // --- 1. STATI DI AUTENTICAZIONE E SISTEMA ---
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('allenati');
  const [activeSessionDuration, setActiveSessionDuration] = useState(0);
  
  const [settings, setSettings] = useState({
    theme_preference: 'Light', 
    step_increment: 1, 
    vibration: true, 
    prep_sound: true
  });

  // --- 2. STATO GLOBALE DELLE SCHEDE (SINGLE SOURCE OF TRUTH) ---
  // Questi dati ora vivono qui e vengono passati alle viste, garantendo coerenza totale
  const [leMieSchede, setLeMieSchede] = useState([]);
  const [schedaAttiva, setSchedaAttiva] = useState(null);

  // --- EFFETTI DI SISTEMA ---
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    let timer;
    if (user && activeTab === 'allenati') {
      timer = setInterval(() => setActiveSessionDuration((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [user, activeTab]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (settings.theme_preference === 'Dark') root.classList.add('dark');
    else if (settings.theme_preference === 'Light') root.classList.remove('dark');
  }, [settings.theme_preference]);

  // --- HANDLERS ---
  const handleSettingsChange = (updatedSettings) => {
    setSettings(updatedSettings);
  };

  const handleLogout = async () => {
    if (window.confirm("Sei sicuro di voler uscire?")) {
      await supabase.auth.signOut();
      setUser(null);
    }
  };

  // --- RENDER BLOCKERS ---
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-success"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginView onLoginSuccess={(loggedInUser) => setUser(loggedInUser)} />;
  }

  return (
    <div className="app-container">
      <main className="flex-1 overflow-y-auto pb-24">
        {activeTab === 'allenati' && (
          <AllenatiView 
            settings={settings} 
            activeSessionDuration={activeSessionDuration}
            // Passiamo la scheda attiva per fargli generare dinamicamente i giorni (G1, G2...)
            schedaAttiva={schedaAttiva} 
          />
        )}
        {activeTab === 'schede' && (
          <SchedeView 
            // Passiamo lo stato e i modificatori alla vista schede
            schede={leMieSchede}
            setSchede={setLeMieSchede}
            schedaAttiva={schedaAttiva}
            setSchedaAttiva={setSchedaAttiva}
          />
        )}
        {activeTab === 'progressi' && <ProgressiView />}
        {activeTab === 'profilo' && (
          <ProfiloView 
            settings={settings} 
            onSettingsChange={handleSettingsChange} 
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* --- NAVIGAZIONE GLOBALE (CON LUCIDE ICONS) --- */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-[420px] mx-auto bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 h-16 flex justify-around items-center z-40 px-2 shadow-lg">
        
        <button onClick={() => setActiveTab('allenati')} className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${activeTab === 'allenati' ? 'text-success' : 'text-neutral-400'}`}>
          <Dumbbell size={24} strokeWidth={activeTab === 'allenati' ? 2.5 : 2} />
          <span className="font-sans text-[10px] font-bold uppercase mt-1">Allenati</span>
        </button>

        <button onClick={() => setActiveTab('schede')} className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${activeTab === 'schede' ? 'text-success' : 'text-neutral-400'}`}>
          <BookOpen size={24} strokeWidth={activeTab === 'schede' ? 2.5 : 2} />
          <span className="font-sans text-[10px] font-bold uppercase mt-1">Schede</span>
        </button>

        <button onClick={() => setActiveTab('progressi')} className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${activeTab === 'progressi' ? 'text-success' : 'text-neutral-400'}`}>
          <TrendingUp size={24} strokeWidth={activeTab === 'progressi' ? 2.5 : 2} />
          <span className="font-sans text-[10px] font-bold uppercase mt-1">Progressi</span>
        </button>

        <button onClick={() => setActiveTab('profilo')} className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${activeTab === 'profilo' ? 'text-success' : 'text-neutral-400'}`}>
          <User size={24} strokeWidth={activeTab === 'profilo' ? 2.5 : 2} />
          <span className="font-sans text-[10px] font-bold uppercase mt-1">Profilo</span>
        </button>

      </nav>
    </div>
  );
}

export default App;
