import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { LoginView } from './views/LoginView';
import { AllenatiView } from './views/AllenatiView';
import { SchedeView } from './views/SchedeView';
import { ProgressiView } from './views/ProgressiView';
import { ProfiloView } from './views/ProfiloView';
import { Button } from './components/UI';

function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  
  const [activeTab, setActiveTab] = useState('allenati');
  const [activeSessionDuration, setActiveSessionDuration] = useState(0);
  
  const [settings, setSettings] = useState({
    id: 'user-default', 
    weight: 82, 
    height: 182, 
    theme_preference: 'Light', 
    weight_unit: 'kg', 
    step_increment: 1, 
    vibration: true, 
    prep_sound: true, 
    prep_time: 10
  });

  // Stati temporanei per la schermata di onboarding
  const [onboardWeight, setOnboardWeight] = useState('70');
  const [onboardHeight, setOnboardHeight] = useState('170');
  const [onboardSaving, setOnboardSaving] = useState(false);

  // 1. GESTIONE DELLA SESSIONE UTENTE E VERIFICA BIOMETRICI
  const checkUserProfile = async (userId) => {
    setProfileLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error || !data) {
        // Se non trova il profilo, lancia l'onboarding biometrico
        setNeedsOnboarding(true);
      } else {
        // Sincronizza i dati letti dal DB con lo stato globale
        setSettings(prev => ({
          ...prev,
          id: userId,
          weight: Number(data.weight),
          height: Number(data.height)
        }));
        setNeedsOnboarding(false);
      }
    } catch (err) {
      console.error("Errore durante il recupero del profilo:", err);
      setNeedsOnboarding(true);
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    // Controlla la sessione iniziale
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        checkUserProfile(currentUser.id);
      } else {
        setAuthLoading(false);
      }
    });

    // Ascolta i cambi di stato di autenticazione
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        checkUserProfile(currentUser.id);
      } else {
        setNeedsOnboarding(false);
        setAuthLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sblocca la schermata di caricamento iniziale solo quando l'auth e il profilo sono definiti
  useEffect(() => {
    if (!authLoading && !profileLoading) {
      // Fine del caricamento totale
    }
  }, [authLoading, profileLoading]);

  useEffect(() => {
    if (user && !profileLoading) {
      setAuthLoading(false);
    }
  }, [user, profileLoading]);

  // 2. TIMER DI SESSIONE ATTIVA
  useEffect(() => {
    let timer;
    if (user && !needsOnboarding && activeTab === 'allenati') {
      timer = setInterval(() => setActiveSessionDuration((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [user, needsOnboarding, activeTab]);

  // 3. APPLICAZIONE AUTOMATICA DEL TEMA DARK/LIGHT
  useEffect(() => {
    const root = window.document.documentElement;
    if (settings.theme_preference === 'Dark') root.classList.add('dark');
    else if (settings.theme_preference === 'Light') root.classList.remove('dark');
  }, [settings.theme_preference]);

  // 4. AZIONE DI ONBOARDING (SCRITTURA SU SUPABASE)
  const handleSaveOnboarding = async (e) => {
    e.preventDefault();
    if (!user) return;
    setOnboardSaving(true);

    const numericWeight = parseFloat(onboardWeight);
    const numericHeight = parseFloat(onboardHeight);

    if (isNaN(numericWeight) || isNaN(numericHeight) || numericWeight <= 0 || numericHeight <= 0) {
      alert("Inserisci valori biometrici validi.");
      setOnboardSaving(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .insert([{
          id: user.id,
          weight: numericWeight,
          height: numericHeight
        }]);

      if (error) throw error;

      // Aggiorna lo stato globale ed esce dall'onboarding
      setSettings(prev => ({
        ...prev,
        id: user.id,
        weight: numericWeight,
        height: numericHeight
      }));
      setNeedsOnboarding(false);
    } catch (err) {
      console.error("Errore salvataggio onboarding:", err);
      alert("Si è verificato un errore nel salvare i tuoi dati. Riprova.");
    } finally {
      setOnboardSaving(false);
    }
  };

  // 5. GESTORE AGGIORNAMENTO DELLE IMPOSTAZIONI + SINCRONIZZAZIONE DB PER I BIOMETRICI
  const handleSettingsChange = async (updatedSettings) => {
    setSettings(updatedSettings);

    // Se i dati modificati includono peso o altezza, li sincronizziamo su Supabase
    if (user && !needsOnboarding) {
      try {
        await supabase
          .from('profiles')
          .update({
            weight: Number(updatedSettings.weight),
            height: Number(updatedSettings.height),
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);
      } catch (err) {
        console.error("Sincronizzazione DB fallita:", err);
      }
    }
  };

  // Logout sicuro
  const handleLogout = async () => {
    if (window.confirm("Sei sicuro di voler uscire?")) {
      await supabase.auth.signOut();
      setUser(null);
      setNeedsOnboarding(false);
    }
  };

  // Loader di transizione
  if (authLoading || (user && profileLoading && !needsOnboarding)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-success"></div>
      </div>
    );
  }

  // PROTECTION GUARD: Se non c'è sessione attiva
  if (!user) {
    return <LoginView onLoginSuccess={(loggedInUser) => setUser(loggedInUser)} />;
  }

  // INTERFACCIA ONBOARDING BIOMETRICO (Visualizzata subito dopo la registrazione)
  if (needsOnboarding) {
    return (
      <div className="min-h-screen flex flex-col justify-center bg-neutral-50 dark:bg-neutral-950 px-6 font-sans">
        <div className="w-full max-w-[380px] mx-auto space-y-6">
          <div className="text-center">
            <span className="text-4xl">📐</span>
            <h1 className="text-2xl font-black text-neutral-950 dark:text-white mt-2 tracking-tight">Parametri Fisici</h1>
            <p className="text-xs text-neutral-500 uppercase tracking-widest mt-1">Configura il tuo profilo biometrico</p>
          </div>

          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-md">
            <form onSubmit={handleSaveOnboarding} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Peso Attuale (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="Es. 78.5"
                  value={onboardWeight}
                  onChange={(e) => setOnboardWeight(e.target.value)}
                  className="h-11 px-3 border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 rounded-md text-sm dark:text-white font-mono font-bold"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Altezza (cm)</label>
                <input
                  type="number"
                  placeholder="Es. 180"
                  value={onboardHeight}
                  onChange={(e) => setOnboardHeight(e.target.value)}
                  className="h-11 px-3 border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 rounded-md text-sm dark:text-white font-mono font-bold"
                  required
                />
              </div>

              <Button size="medium" variant="primary" fullWidth type="submit" disabled={onboardSaving}>
                {onboardSaving ? 'Salvataggio...' : 'COMPLETA CONFIGURAZIONE'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // RENDERING PRINCIPALE DELL'APPLICAZIONE DIETRO AUTENTICAZIONE E ONBOARDING COMPLETATO
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

      {/* Persistent Bottom Tab Bar */}
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