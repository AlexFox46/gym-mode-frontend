import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { LoginView } from './views/LoginView';
import { AllenatiView } from './views/AllenatiView';
import { SchedeView } from './views/SchedeView';
import { ProgressiView } from './views/ProgressiView';
import { ProfiloView } from './views/ProfiloView';
import { Dumbbell, BookOpen, TrendingUp, User } from 'lucide-react'; 

function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('allenati');
  
  const [settings, setSettings] = useState({
    theme_preference: 'Light', 
    step_increment: 1, 
    vibration: true, 
    prep_sound: true
  });

  const [leMieSchede, setLeMieSchede] = useState([]);
  const [schedaAttiva, setSchedaAttiva] = useState(null);
  
  // Stato globale per lo storico degli allenamenti
  const [storicoAllenamenti, setStoricoAllenamenti] = useState([]);
  
  // Stato globale per gli esercizi fetchati da Supabase
  const [esercizi, setEsercizi] = useState([]);

  // Fetch esercizi da Supabase all'avvio
  useEffect(() => {
    const fetchEsercizi = async () => {
      try {
        const { data, error } = await supabase
          .from('exercises')
          .select('id, name, movement_pattern, primary_muscle_group, equipment, default_rest_time')
          .order('name', { ascending: true });
        
        if (error) {
          console.error('Errore nel fetch degli esercizi:', error);
          return;
        }
        
        const eserciziformattati = data.map(ex => ({
          id: ex.id,
          name: ex.name,
          muscle: ex.primary_muscle_group,
          equipment: ex.equipment,
          movement_pattern: ex.movement_pattern,
          default_rest_time: ex.default_rest_time
        }));
        
        setEsercizi(eserciziformattati);
        console.log(`✅ Caricati ${eserciziformattati.length} esercizi da Supabase`);
      } catch (err) {
        console.error('Errore durante il fetch degli esercizi:', err);
      }
    };
    
    fetchEsercizi();
  }, []);

  // Fetch schede dell'utente loggato
  const fetchSchede = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('workout_schemes')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Errore nel fetch delle schede:', error);
        return;
      }
      
      const schedeFormattate = data.map(scheda => ({
        id: scheda.id,
        name: scheda.name,
        daysCount: scheda.days_count || 2,
        routine: scheda.routine || {},
        isActive: scheda.is_active || false
      }));
      
      setLeMieSchede(schedeFormattate);
      
      // Imposta la scheda attiva
      const attiva = schedeFormattate.find(s => s.isActive);
      setSchedaAttiva(attiva || null);
      
      console.log(`✅ Caricate ${schedeFormattate.length} schede da Supabase`);
    } catch (err) {
      console.error('Errore durante il fetch delle schede:', err);
    }
  };

  // Setup real-time listener per schede
  const setupSchedeListener = (userId) => {
    const channel = supabase
      .channel(`workout_schemes:${userId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'workout_schemes',
        filter: `user_id=eq.${userId}`
      }, (payload) => {
        console.log('🔄 Cambio rilevato nelle schede:', payload);
        fetchSchede(userId);
      })
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  };

  // Auth state management
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        fetchSchede(session.user.id);
        setupSchedeListener(session.user.id);
      } else {
        setUser(null);
        setLeMieSchede([]);
        setSchedaAttiva(null);
      }
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        fetchSchede(session.user.id);
        setupSchedeListener(session.user.id);
      } else {
        setUser(null);
        setLeMieSchede([]);
        setSchedaAttiva(null);
      }
      setAuthLoading(false);
    });

    return () => subscription?.unsubscribe();
  }, []);

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

  const handleWorkoutComplete = (logEntry) => {
    setStoricoAllenamenti(prev => [...prev, logEntry]);
    setActiveTab('progressi');
  };

  const handleNavigateToSchede = () => {
    setActiveTab('schede');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-success"></div>
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
