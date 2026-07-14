import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { LoginView } from './views/LoginView';
import { AllenatiView } from './views/AllenatiView';
import { SchedeView } from './views/SchedeView';
import { ProgressiView } from './views/ProgressiView';
import { ProfiloView } from './views/ProfiloView';

function App() {
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

  // 1. GESTIONE DELLA SESSIONE UTENTE
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

  // 2. TIMER DI SESSIONE ATTIVA
  useEffect(() => {
    let timer;
    if (user && activeTab === 'allenati') {
      timer = setInterval(() => setActiveSessionDuration((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [user, activeTab]);

  // 3. APPLICAZIONE AUTOMATICA DEL TEMA DARK/LIGHT
  useEffect(() => {
    const root = window.document.documentElement;
    if (settings.theme_preference === 'Dark') root.classList.add('dark');
    else if (settings.theme_preference === 'Light') root.classList.remove('dark');
  }, [settings.theme_preference]);

  // 4. GESTORE AGGIORNAMENTO PREFERENZE LOCALI
  const handleSettingsChange = (updatedSettings) => {
    setSettings(updatedSettings);
  };

  const handleLogout = async () => {
    if (window.confirm("Sei sicuro di voler uscire?")) {
      await supabase.auth.signOut();
      setUser(null);
    }
  };

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
            onWorkoutComplete={() => setActiveTab('progressi')} 
          />
        )}
        {activeTab === 'schede' && <SchedeView />}
        {activeTab === 'progressi' && <ProgressiView />}
        {activeTab === 'profilo' && (
          <ProfiloView 
            settings={settings} 
            onSettingsChange={handleSettingsChange} 
            onLogout={handleLogout}
          />
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-[420px] mx-auto bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 h-16 flex justify-around items-center z-40 px-2 shadow-lg">
        {['allenati', 'schede', 'progressi', 'profilo'].map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)} 
            className={`flex flex-col items-center justify-center w-16 h-full font-sans text-[10px] font-bold transition-colors ${activeTab === tab ? 'text-success' : 'text-neutral-400'}`}
          >
            <span className="text-lg">
              {tab === 'allenati' ? '🏋️‍♂️' : tab === 'schede' ? '📖' : tab === 'progressi' ? '📈' : '👤'}
            </span>
            <span className="uppercase mt-0.5">{tab}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;
