import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { LoginView } from './views/LoginView';
import { AllenatiView } from './views/AllenatiView';
import { SchedeView } from './views/SchedeView';
import { ProgressiView } from './views/ProgressiView';
import { ProfiloView } from './views/ProfiloView';
import { Dumbbell, BookOpen, TrendingUp, User } from 'lucide-react';
import { 
  fetchEsercizi, 
  createProfileIfNotExists, 
  fetchSchede, 
  setupSchedeListener,
  saveWorkoutLog,
  fetchWorkoutLogs
} from './services/supabaseServices';

function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('allenati');
  
  const [settings, setSettings] = useState({
    theme_preference: 'Dark', 
    step_increment: 1, 
    vibration: true, 
    prep_sound: true
  });

  const [leMieSchede, setLeMieSchede] = useState([]);
  const [schedaAttiva, setSchedaAttiva] = useState(null);
  const [storicoAllenamenti, setStoricoAllenamenti] = useState([]);
  const [esercizi, setEsercizi] = useState([]);
  const [editDay, setEditDay] = useState(null);

  // Fetch esercizi da Supabase all'avvio
  useEffect(() => {
    fetchEsercizi().then(data => {
      setEsercizi(data);
      console.log(`✅ Caricati ${data.length} esercizi da Supabase`);
    });
  }, []);

  // Handler unificato per la sessione utente
  const handleUserSession = async (session) => {
    if (session?.user) {
      setUser(session.user);
      await createProfileIfNotExists(session.user.id);
      const schede = await fetchSchede(session.user.id);
      setLeMieSchede(schede);
      setSchedaAttiva(schede.find(s => s.isActive) || null);
      // Carica storico allenamenti da Supabase
      const logs = await fetchWorkoutLogs(session.user.id);
      // Merge con eventuali log in localStorage non sincronizzati
      const localLogs = JSON.parse(localStorage.getItem('gym_workout_history') || '[]');
      const mergedLogs = [...logs];
      localLogs.forEach(ll => {
        if (!mergedLogs.find(ml => ml.date === ll.date && ml.dayName === ll.dayName)) {
          mergedLogs.push(ll);
        }
      });
      setStoricoAllenamenti(mergedLogs);
      // Pulisci localStorage dopo la sync
      localStorage.removeItem('gym_workout_history');
    } else {
      setUser(null);
      setLeMieSchede([]);
      setSchedaAttiva(null);
    }
    setAuthLoading(false);
  };

  // Setup Auth Listener e Real-time Schede
  useEffect(() => {
    let unsubscribeSchedeListener = null;

    supabase.auth.getSession().then(({ data: { session } }) => {
      handleUserSession(session);
      if (session?.user) {
        unsubscribeSchedeListener = setupSchedeListener(session.user.id, async () => {
          const schede = await fetchSchede(session.user.id);
          setLeMieSchede(schede);
          setSchedaAttiva(schede.find(s => s.isActive) || null);
        });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      handleUserSession(session);
    });

    return () => {
      subscription?.unsubscribe();
      if (typeof unsubscribeSchedeListener === 'function') {
        unsubscribeSchedeListener();
      }
    };
  }, []);

  // Gestione Tema Light / Dark
  useEffect(() => {
    const root = window.document.documentElement;
    if (settings.theme_preference === 'Dark') root.classList.add('dark');
    else if (settings.theme_preference === 'Light') root.classList.remove('dark');
  }, [settings.theme_preference]);

  const handleSettingsChange = (updatedSettings) => setSettings(updatedSettings);

  const handleLogout = async () => {
    if (window.confirm("Sei sicuro di voler uscire?")) {
      await supabase.auth.signOut();
      setUser(null);
      setLeMieSchede([]);
      setSchedaAttiva(null);
    }
  };

  const handleWorkoutComplete = async (logEntry) => {
    setStoricoAllenamenti(prev => [...prev, logEntry]);
    // Salva su localStorage come fallback immediato
    const currentLogs = JSON.parse(localStorage.getItem('gym_workout_history') || '[]');
    localStorage.setItem('gym_workout_history', JSON.stringify([...currentLogs, logEntry]));
    // Salva su Supabase in background
    if (user?.id) {
      await saveWorkoutLog(user.id, logEntry);
      // Se salvato con successo, rimuovi da localStorage
      localStorage.removeItem('gym_workout_history');
    }
    setActiveTab('progressi');
  };

  const handleNavigateToSchede = (dayToEdit = null) => {
    setEditDay(dayToEdit);
    setActiveTab('schede');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) return <LoginView onLoginSuccess={(loggedInUser) => setUser(loggedInUser)} />;

  return (
    <div className="app-container">
      <main className="flex-1 overflow-y-auto pb-24">
        {activeTab === 'allenati' && (
          <AllenatiView 
            settings={settings} 
            schedaAttiva={schedaAttiva}
            onWorkoutComplete={handleWorkoutComplete}
            onNavigateToSchede={handleNavigateToSchede}
            userId={user?.id}
          />
        )}
        {activeTab === 'schede' && (
          <SchedeView 
            schede={leMieSchede}
            setSchede={setLeMieSchede}
            schedaAttiva={schedaAttiva}
            setSchedaAttiva={setSchedaAttiva}
            esercizi={esercizi}
            userId={user?.id}
            editDay={editDay}
            setEditDay={setEditDay}
          />
        )}
        {activeTab === 'progressi' && (
          <ProgressiView storico={storicoAllenamenti} />
        )}
        {activeTab === 'profilo' && (
          <ProfiloView 
            settings={settings} 
            onSettingsChange={handleSettingsChange} 
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Nav Bar Inferiore con icona piena, arancione e testo bold per la voce attiva */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-[420px] mx-auto bg-surface-secondary border-t border-surface-tertiary h-16 flex justify-around items-center z-40 px-2 shadow-2xl">
        <button 
          onClick={() => setActiveTab('allenati')} 
          className={`flex flex-col items-center justify-center w-16 h-full transition-all ${
            activeTab === 'allenati' ? 'text-primary scale-105' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Dumbbell 
            size={24} 
            strokeWidth={activeTab === 'allenati' ? 2.5 : 1.8} 
            fill={activeTab === 'allenati' ? 'currentColor' : 'none'} 
          />
          <span className={`font-sans text-[10px] uppercase mt-1 tracking-wider ${
            activeTab === 'allenati' ? 'font-black text-primary' : 'font-semibold text-neutral-400'
          }`}>
            Allenati
          </span>
        </button>

        <button 
          onClick={() => setActiveTab('schede')} 
          className={`flex flex-col items-center justify-center w-16 h-full transition-all ${
            activeTab === 'schede' ? 'text-primary scale-105' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <BookOpen 
            size={24} 
            strokeWidth={activeTab === 'schede' ? 2.5 : 1.8} 
            fill={activeTab === 'schede' ? 'currentColor' : 'none'} 
          />
          <span className={`font-sans text-[10px] uppercase mt-1 tracking-wider ${
            activeTab === 'schede' ? 'font-black text-primary' : 'font-semibold text-neutral-400'
          }`}>
            Schede
          </span>
        </button>

        <button 
          onClick={() => setActiveTab('progressi')} 
          className={`flex flex-col items-center justify-center w-16 h-full transition-all ${
            activeTab === 'progressi' ? 'text-primary scale-105' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <TrendingUp 
            size={24} 
            strokeWidth={activeTab === 'progressi' ? 2.5 : 1.8} 
            fill={activeTab === 'progressi' ? 'currentColor' : 'none'} 
          />
          <span className={`font-sans text-[10px] uppercase mt-1 tracking-wider ${
            activeTab === 'progressi' ? 'font-black text-primary' : 'font-semibold text-neutral-400'
          }`}>
            Progressi
          </span>
        </button>

        <button 
          onClick={() => setActiveTab('profilo')} 
          className={`flex flex-col items-center justify-center w-16 h-full transition-all ${
            activeTab === 'profilo' ? 'text-primary scale-105' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <User 
            size={24} 
            strokeWidth={activeTab === 'profilo' ? 2.5 : 1.8} 
            fill={activeTab === 'profilo' ? 'currentColor' : 'none'} 
          />
          <span className={`font-sans text-[10px] uppercase mt-1 tracking-wider ${
            activeTab === 'profilo' ? 'font-black text-primary' : 'font-semibold text-neutral-400'
          }`}>
            Profilo
          </span>
        </button>
      </nav>
    </div>
  );
}

export default App;
