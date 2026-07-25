import React, { useState, useEffect, useRef } from 'react';
import { Button, Stepper, Card } from '../components/UI';
import { BookOpen, Repeat2, Play, CheckCircle2, XCircle, Clock, Dumbbell, ArrowLeft, Plus, Info, Pencil } from 'lucide-react';
import { fetchExerciseAlternatives } from '../services/supabaseServices';

// ============================================================================
// HELPER: Persistenza Allenamento in Corso via localStorage
// ============================================================================
const WORKOUT_STORAGE_KEY = 'gym_active_workout';

const saveWorkoutState = (state) => {
  try {
    localStorage.setItem(WORKOUT_STORAGE_KEY, JSON.stringify({
      ...state,
      savedAt: Date.now()
    }));
  } catch (e) {
    console.warn('Errore salvataggio workout state:', e);
  }
};

const loadWorkoutState = () => {
  try {
    const raw = localStorage.getItem(WORKOUT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn('Errore caricamento workout state:', e);
    return null;
  }
};

const clearWorkoutState = () => {
  try {
    localStorage.removeItem(WORKOUT_STORAGE_KEY);
  } catch (e) {
    console.warn('Errore pulizia workout state:', e);
  }
};

// ============================================================================
// COMPONENTE PRINCIPALE
// ============================================================================
export const AllenatiView = ({ settings, schedaAttiva, onWorkoutComplete, onNavigateToSchede, userId }) => {
  const [activeDay, setActiveDay] = useState('G1');
  const schemaDays = schedaAttiva ? Array.from({ length: schedaAttiva.daysCount }, (_, i) => `G${i + 1}`) : [];
  const [localRoutine, setLocalRoutine] = useState([]);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  
  // Riferimento al contenitore per lo slide
  const scrollContainerRef = useRef(null);

  // Stato per la modalità di allenamento attiva (Pre-allenamento vs In corso)
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [workoutStartTime, setWorkoutStartTime] = useState(null);
  const [elapsedWorkoutSeconds, setElapsedWorkoutSeconds] = useState(0);

  // Stato per la schermata dettaglio full-screen
  const [detailDay, setDetailDay] = useState(null);

  // Stato per il recupero tra esercizi
  const [pendingNextExercise, setPendingNextExercise] = useState(false);

  // Tonnage accumulato durante l'allenamento
  const [totalTonnage, setTotalTonnage] = useState(0);

  // Flag per evitare il reset della routine durante il ripristino
  const [isRestoring, setIsRestoring] = useState(false);

  // Reset activeDay quando cambia schedaAttiva
  useEffect(() => {
    if (schedaAttiva && !isRestoring) {
      setActiveDay('G1');
      setIsWorkoutStarted(false);
    }
  }, [schedaAttiva?.id]);

  // Inizializzazione routine quando cambia schedaAttiva o activeDay
  useEffect(() => {
    if (isRestoring) return; // Non resettare durante il ripristino
    if (schedaAttiva?.routine?.[activeDay]) {
      setLocalRoutine(JSON.parse(JSON.stringify(schedaAttiva.routine[activeDay])));
      setExerciseIndex(0);
    } else {
      setLocalRoutine([]);
      setExerciseIndex(0);
    }
  }, [schedaAttiva, activeDay, isRestoring]);

  // =========================================================================
  // RIPRISTINO ALLENAMENTO DA LOCALSTORAGE (al mount)
  // =========================================================================
  useEffect(() => {
    const saved = loadWorkoutState();
    if (saved && saved.isWorkoutStarted && schedaAttiva) {
      // Verifica che la scheda sia ancora la stessa
      if (saved.schedaId === schedaAttiva.id) {
        setIsRestoring(true);
        setActiveDay(saved.activeDay);
        setLocalRoutine(saved.localRoutine);
        setExerciseIndex(saved.exerciseIndex);
        setCurrentSet(saved.currentSet);
        setCurrentWeight(saved.currentWeight);
        setCurrentReps(saved.currentReps);
        setTotalTonnage(saved.totalTonnage || 0);
        setPendingNextExercise(saved.pendingNextExercise || false);
        
        // Ricalcola il tempo trascorso
        const timeSinceSave = Math.floor((Date.now() - saved.savedAt) / 1000);
        setElapsedWorkoutSeconds(saved.elapsedWorkoutSeconds + timeSinceSave);
        setWorkoutStartTime(saved.workoutStartTime);
        
        // Ripristina il timer di recupero
        if (saved.isRestActive && saved.restTime > 0) {
          const restElapsed = Math.floor((Date.now() - saved.savedAt) / 1000);
          const remainingRest = Math.max(0, saved.restTime - restElapsed);
          if (remainingRest > 0) {
            setRestTime(remainingRest);
            setIsRestActive(true);
          } else {
            // Il recupero è finito mentre l'app era chiusa
            setIsRestActive(false);
            if (saved.pendingNextExercise) {
              // Avanza all'esercizio successivo
              setExerciseIndex(saved.exerciseIndex + 1);
              setPendingNextExercise(false);
              setCurrentSet(1);
            }
          }
        }
        
        setIsWorkoutStarted(true);
        
        // Rimuovi il flag di ripristino dopo un tick
        setTimeout(() => setIsRestoring(false), 100);
        console.log('✅ Allenamento ripristinato da localStorage');
      } else {
        clearWorkoutState();
      }
    }
  }, [schedaAttiva?.id]);

  const currentExercise = localRoutine[exerciseIndex];
  const [currentWeight, setCurrentWeight] = useState(0);
  const [currentReps, setCurrentReps] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const exerciseRest = currentExercise?.rest ? Number(currentExercise.rest) : 90;

  // Stato timer di recupero
  const [restTime, setRestTime] = useState(90);
  const [isRestActive, setIsRestActive] = useState(false);

  // Stato per il bottom sheet delle alternative
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [alternatives, setAlternatives] = useState({});
  const [loadingAlternatives, setLoadingAlternatives] = useState(false);

  // Helper per Feedback Aptico & Sonoro
  const triggerHaptic = (pattern = 100) => {
    if (settings?.vibration && typeof window !== 'undefined' && window.navigator?.vibrate) {
      try {
        window.navigator.vibrate(pattern);
      } catch (e) {
        console.log('Vibration error', e);
      }
    }
  };

  const playTimerSound = () => {
    if (!settings?.prep_sound) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch (e) {
      console.log('Audio Context error', e);
    }
  };

  // Gestione Swipe e Cambio Giorno tramite scroll orizzontale
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const scrollLeft = scrollContainerRef.current.scrollLeft;
    const containerWidth = scrollContainerRef.current.offsetWidth;
    const itemWidth = (containerWidth * 0.72) + 12;
    const index = Math.round(scrollLeft / itemWidth);
    
    if (schemaDays[index] && schemaDays[index] !== activeDay) {
      setActiveDay(schemaDays[index]);
      triggerHaptic(10);
    }
  };

  const scrollToDay = (day) => {
    setActiveDay(day);
    const index = schemaDays.indexOf(day);
    if (scrollContainerRef.current && index !== -1) {
       const containerWidth = scrollContainerRef.current.offsetWidth;
       const itemWidth = (containerWidth * 0.72) + 12;
       scrollContainerRef.current.scrollTo({ left: index * itemWidth, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (currentExercise && !isRestoring) {
      setCurrentWeight(Number(currentExercise.weight) || 0);
      setCurrentReps(Number(currentExercise.reps) || 0);
      setCurrentSet(1);
      setRestTime(exerciseRest);
      setIsRestActive(false);
    }
  }, [exerciseIndex, currentExercise?.name]);

  // Gestione Timer Recupero con Suono e Vibrazione alla fine
  useEffect(() => {
    let interval = null;
    if (isRestActive && restTime > 0) {
      interval = setInterval(() => setRestTime(prev => prev - 1), 1000);
    } else if (restTime <= 0 && isRestActive) {
      setIsRestActive(false);
      playTimerSound();
      triggerHaptic([200, 100, 200, 100, 200]);
      
      // Se c'è un esercizio in attesa (recupero tra esercizi), avanza ora
      if (pendingNextExercise) {
        setExerciseIndex(prev => prev + 1);
        setCurrentSet(1);
        setPendingNextExercise(false);
      } else {
        setRestTime(exerciseRest);
      }
    }
    return () => clearInterval(interval);
  }, [isRestActive, restTime, exerciseRest, pendingNextExercise]);

  // Timer della durata totale dell'allenamento
  useEffect(() => {
    let timer = null;
    if (isWorkoutStarted) {
      timer = setInterval(() => {
        setElapsedWorkoutSeconds(prev => prev + 1);
      }, 1000);
    } else if (!isRestoring) {
      setElapsedWorkoutSeconds(0);
    }
    return () => clearInterval(timer);
  }, [isWorkoutStarted]);

  // =========================================================================
  // SALVATAGGIO PERIODICO STATO ALLENAMENTO SU LOCALSTORAGE
  // =========================================================================
  useEffect(() => {
    if (!isWorkoutStarted || isRestoring) return;
    
    const saveState = () => {
      saveWorkoutState({
        isWorkoutStarted,
        activeDay,
        exerciseIndex,
        currentSet,
        currentWeight,
        currentReps,
        localRoutine,
        workoutStartTime,
        elapsedWorkoutSeconds,
        isRestActive,
        restTime,
        pendingNextExercise,
        totalTonnage,
        schedaId: schedaAttiva?.id,
        schedaName: schedaAttiva?.name
      });
    };

    // Salva immediatamente
    saveState();

    // Salva ogni 5 secondi
    const interval = setInterval(saveState, 5000);
    return () => clearInterval(interval);
  }, [isWorkoutStarted, activeDay, exerciseIndex, currentSet, currentWeight, currentReps, 
      isRestActive, restTime, pendingNextExercise, totalTonnage, elapsedWorkoutSeconds, isRestoring]);

  // Avvio allenamento
  const handleStartWorkout = (day = null) => {
    const startDay = day || activeDay;
    if (day) setActiveDay(startDay);
    
    // Inizializza la routine per il giorno selezionato
    if (schedaAttiva?.routine?.[startDay]) {
      setLocalRoutine(JSON.parse(JSON.stringify(schedaAttiva.routine[startDay])));
    }
    
    triggerHaptic(150);
    setIsWorkoutStarted(true);
    setWorkoutStartTime(Date.now());
    setExerciseIndex(0);
    setCurrentSet(1);
    setIsRestActive(false);
    setTotalTonnage(0);
    setPendingNextExercise(false);
    setDetailDay(null);
  };

  // Annulla allenamento
  const handleCancelWorkout = () => {
    if (window.confirm("Vuoi davvero interrompere l'allenamento in corso?")) {
      setIsWorkoutStarted(false);
      setIsRestActive(false);
      setPendingNextExercise(false);
      setTotalTonnage(0);
      clearWorkoutState();
    }
  };

  // Fetch alternative da Supabase con Fallback
  const handleOpenAlternatives = async () => {
    if (!currentExercise) return;
    setShowAlternatives(true);
    setLoadingAlternatives(true);

    try {
      const result = await fetchExerciseAlternatives(
        currentExercise.id,
        currentExercise.muscle,
        currentExercise.movement_pattern
      );
      setAlternatives(result);
    } catch (err) {
      console.error('Errore nel recupero delle alternative:', err);
      setAlternatives({});
    } finally {
      setLoadingAlternatives(false);
    }
  };

  const handleSelectAlternative = (alternativeExercise) => {
    const updatedExercise = {
      ...currentExercise,
      id: alternativeExercise.id,
      name: alternativeExercise.name,
      muscle: alternativeExercise.muscle,
      equipment: alternativeExercise.equipment
    };
    
    const updatedRoutine = [...localRoutine];
    updatedRoutine[exerciseIndex] = updatedExercise;
    setLocalRoutine(updatedRoutine);
    setShowAlternatives(false);
    triggerHaptic(50);
  };

  // REGISTRAZIONE SET O SALTA RECUPERO
  const handleRegisterSet = () => {
    triggerHaptic([80, 40, 80]);

    if (isRestActive) {
      // Se l'utente clicca mentre è in corso il recupero, lo salta
      setIsRestActive(false);
      setRestTime(exerciseRest);
      
      // Se stava aspettando il passaggio al prossimo esercizio, avanza ora
      if (pendingNextExercise) {
        setExerciseIndex(prev => prev + 1);
        setCurrentSet(1);
        setPendingNextExercise(false);
      }
      return;
    }

    // Accumula tonnage per questo set
    const setTonnage = currentWeight * currentReps;
    setTotalTonnage(prev => prev + setTonnage);

    const targetSets = Number(currentExercise.sets) || 1;
    
    if (currentSet < targetSets) {
      // Avanza al set successivo dell'esercizio corrente ed avvia il recupero
      setCurrentSet(prev => prev + 1);
      setRestTime(exerciseRest);
      setIsRestActive(true);
    } else if (exerciseIndex < localRoutine.length - 1) {
      // Esercizio completato — avvia il recupero PRIMA di passare al prossimo
      const completedExerciseRest = exerciseRest;
      setRestTime(completedExerciseRest);
      setIsRestActive(true);
      setPendingNextExercise(true);
    } else {
      // Tutti gli esercizi della giornata completati!
      triggerHaptic([300, 100, 300]);
      setIsWorkoutStarted(false);
      clearWorkoutState();
      onWorkoutComplete({ 
        id: Date.now(), 
        date: new Date().toISOString(), 
        schedaName: schedaAttiva.name, 
        dayName: activeDay, 
        durationMinutes: Math.ceil(elapsedWorkoutSeconds / 60),
        tonnage: Math.round(totalTonnage + setTonnage)
      });
    }
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // -------------------------------------------------------------------------
  // STATO 1: Se non c'è scheda attiva
  // -------------------------------------------------------------------------
  if (!schedaAttiva) {
    return (
      <div className="max-w-[420px] mx-auto min-h-screen bg-surface text-text-primary p-4 pb-32 flex flex-col items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-surface-secondary flex items-center justify-center border-2 border-surface-tertiary mx-auto">
            <BookOpen size={40} className="text-text-tertiary" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-text-primary mb-2">Nessuna Scheda Attiva</h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              Imposta prima le tue schede di esercizi per iniziare ad allenarti!
            </p>
          </div>
          <Button 
            variant="primary" 
            size="large" 
            fullWidth 
            onClick={() => onNavigateToSchede()}
            className="flex items-center justify-center gap-2"
          >
            <BookOpen size={16} />
            VAI ALLE SCHEDE
          </Button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // SCHERMATA DETTAGLIO FULL-SCREEN (quando detailDay !== null)
  // =========================================================================
  if (detailDay !== null) {
    const detailRoutine = schedaAttiva?.routine?.[detailDay] || [];
    
    return (
      <div className="max-w-[420px] mx-auto min-h-screen bg-surface text-text-primary pt-4 pb-32 select-none">
        {/* Header con freccia indietro */}
        <div className="flex items-center gap-3 px-4 mb-6">
          <button 
            onClick={() => setDetailDay(null)}
            className="w-10 h-10 rounded-xl bg-surface-secondary border border-surface-tertiary flex items-center justify-center text-text-secondary hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">{schedaAttiva.name}</span>
            <h1 className="text-xl font-black text-white">Allenamento {detailDay}</h1>
          </div>
        </div>

        <div className="px-4 space-y-5">
          {/* Bottone Avvia Allenamento */}
          <Button 
            size="large" 
            fullWidth 
            onClick={() => handleStartWorkout(detailDay)}
            className="text-black bg-primary font-black py-5 text-base flex items-center justify-center gap-3 shadow-xl hover:opacity-95 transition-all w-full"
          >
            <Play size={20} fill="black" />
            AVVIA ALLENAMENTO
          </Button>

          {/* Header lista esercizi con matita per modifica */}
          <div className="flex items-center justify-between">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-text-secondary">
              Esercizi in programma ({detailRoutine.length})
            </h2>
            <button 
              onClick={() => onNavigateToSchede(detailDay)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-secondary border border-surface-tertiary text-text-secondary hover:text-primary text-xs font-bold transition-colors"
            >
              <Pencil size={12} />
              Modifica
            </button>
          </div>

          {/* Lista completa esercizi */}
          <div className="space-y-2.5">
            {detailRoutine.map((ex, idx) => (
              <div key={ex.instanceId || idx} className="p-3 rounded-2xl bg-surface-secondary border border-surface-tertiary flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-surface-tertiary flex items-center justify-center font-bold text-xs text-primary">#{idx + 1}</div>
                  <div>
                    <h3 className="font-bold text-white text-sm leading-tight">{ex.name}</h3>
                    <p className="text-[10px] text-text-secondary mt-0.5">{ex.sets} set × {ex.reps} rip @ {ex.weight}kg</p>
                  </div>
                </div>
                <span className="text-[10px] text-text-tertiary font-mono bg-surface-tertiary/50 px-2 py-1 rounded-md">{ex.rest || 90}s</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // FASE A: PRE-ALLENAMENTO CAROUSEL SWIPEABLE ("AVVIA ALLENAMENTO" / "GIORNO VUOTO")
  // =========================================================================
  if (!isWorkoutStarted) {
    return (
      <div className="max-w-[420px] mx-auto min-h-screen bg-surface text-text-primary pt-4 pb-32 select-none overflow-hidden">
        {/* Selettore Giorno */}
        <div className="flex gap-2 overflow-x-auto mb-3 px-4 hide-scrollbar">
          {schemaDays.map(day => (
            <button 
              key={day} 
              onClick={() => scrollToDay(day)} 
              className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${activeDay === day ? 'bg-primary text-black shadow-md scale-105' : 'bg-surface-secondary text-text-secondary'}`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Indicatore Swipe tra Tab e Card */}
        <div className="px-4 mb-4 text-center">
          <p className="text-xs text-text-secondary">
            <span className="text-primary font-bold">Scorri col dito</span> per cambiare giorno
          </p>
        </div>

        {/* CONTAINER CAROUSEL SWIPEABLE */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-8 hide-scrollbar -mx-4 items-stretch"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Spacer iniziale per centrare perfettamente G1 */}
          <div className="w-[14%] shrink-0 snap-none" />

          {schemaDays.map(day => {
            const isActive = day === activeDay;
            const dayRoutine = schedaAttiva?.routine?.[day] || [];
            const previewExercises = dayRoutine.slice(0, 3);
            const hasMore = dayRoutine.length > 3;
            
            return (
              <div 
                key={day} 
                className={`w-[72%] snap-center shrink-0 transition-all duration-300 ${isActive ? 'scale-100 opacity-100' : 'scale-[0.92] opacity-40'}`}
              >
                {dayRoutine.length === 0 ? (
                  /* CARD GIORNO VUOTO */
                  <div className="text-center bg-surface-secondary border-2 border-surface-tertiary rounded-3xl p-8 space-y-6">
                    <div className="w-16 h-16 rounded-2xl bg-surface/50 flex items-center justify-center border border-surface-tertiary mx-auto">
                      <Dumbbell size={32} className="text-text-tertiary" />
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-white mb-1">Allenamento {day} Vuoto</h2>
                      <p className="text-text-secondary text-xs">Questo giorno non ha esercizi configurati.</p>
                    </div>
                    <div className="space-y-3 pt-4">
                      <Button variant="primary" fullWidth onClick={() => onNavigateToSchede(day)} className="flex items-center justify-center gap-2 py-4">
                        <Plus size={18} /> AGGIUNGI ESERCIZI
                      </Button>
                      <Button variant="secondary" fullWidth onClick={() => scrollToDay(schemaDays[0] || 'G1')} className="flex items-center justify-center gap-2 py-4 border border-surface-tertiary">
                        <ArrowLeft size={18} /> VAI A G1
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* CARD PRE-ALLENAMENTO COMPATTA */
                  <div className="flex flex-col h-full space-y-3">
                    <Card className="flex-1 bg-surface-secondary border-2 border-surface-tertiary p-4 overflow-hidden">
                      <div className="flex items-center justify-between border-b border-surface-tertiary pb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {schedaAttiva.name}
                        </span>
                        <span className="text-[10px] font-bold text-text-secondary uppercase bg-surface-tertiary px-2.5 py-1 rounded-lg">
                          {dayRoutine.length} Esercizi
                        </span>
                      </div>

                      <div className="mt-3 mb-3 flex items-center justify-between">
                        <div>
                          <h1 className="text-xl font-black text-white">Allenamento {day}</h1>
                          <p className="text-[10px] text-text-secondary mt-0.5">
                            Lista degli esercizi in programma.
                          </p>
                        </div>
                        {/* Bottone Info per schermata dettaglio */}
                        <button
                          onClick={() => setDetailDay(day)}
                          className="w-9 h-9 rounded-xl bg-surface-tertiary/80 flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary/10 transition-all shrink-0"
                          title="Vedi dettagli"
                        >
                          <Info size={18} />
                        </button>
                      </div>

                      {/* Lista esercizi limitata a 3 con gradient fade */}
                      <div className="relative">
                        <div className="space-y-2">
                          {previewExercises.map((ex, idx) => (
                            <div key={ex.instanceId || idx} className="p-2.5 rounded-xl bg-surface/80 border border-surface-tertiary flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div className="w-6 h-6 rounded-md bg-surface-tertiary flex items-center justify-center font-bold text-[10px] text-primary">#{idx + 1}</div>
                                <div>
                                  <h3 className="font-bold text-white text-[11px] leading-tight">{ex.name}</h3>
                                  <p className="text-[9px] text-text-secondary mt-0.5">{ex.sets}s × {ex.reps}r @ {ex.weight}kg</p>
                                </div>
                              </div>
                              <span className="text-[9px] text-text-tertiary font-mono bg-surface-tertiary/50 px-1.5 py-0.5 rounded">{ex.rest || 90}s</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Gradient fade se ci sono più di 3 esercizi */}
                        {hasMore && (
                          <div className="relative mt-1">
                            {/* 4° esercizio parzialmente visibile */}
                            <div className="p-2.5 rounded-xl bg-surface/80 border border-surface-tertiary flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div className="w-6 h-6 rounded-md bg-surface-tertiary flex items-center justify-center font-bold text-[10px] text-primary">#4</div>
                                <div>
                                  <h3 className="font-bold text-white text-[11px] leading-tight">{dayRoutine[3].name}</h3>
                                  <p className="text-[9px] text-text-secondary mt-0.5">{dayRoutine[3].sets}s × {dayRoutine[3].reps}r @ {dayRoutine[3].weight}kg</p>
                                </div>
                              </div>
                            </div>
                            {/* Gradient overlay nero */}
                            <div 
                              className="absolute inset-0 rounded-xl pointer-events-none"
                              style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(28,28,30,0.8) 70%, rgba(28,28,30,1) 100%)' }}
                            />
                          </div>
                        )}

                        {hasMore && (
                          <button 
                            onClick={() => setDetailDay(day)}
                            className="w-full text-center text-[10px] text-primary font-bold mt-2 py-1 hover:underline"
                          >
                            Vedi tutti i {dayRoutine.length} esercizi →
                          </button>
                        )}
                      </div>
                    </Card>

                    <Button 
                      size="large" 
                      fullWidth 
                      onClick={() => handleStartWorkout(day)}
                      className="text-black bg-primary font-black py-4 text-sm flex items-center justify-center gap-3 shadow-xl hover:opacity-95 transition-all w-full"
                    >
                      <Play size={18} fill="black" />
                      AVVIA ALLENAMENTO
                    </Button>
                  </div>
                )}
              </div>
            );
          })}

          {/* Spacer finale per centrare l'ultima card */}
          <div className="w-[14%] shrink-0 snap-none" />
        </div>
      </div>
    );
  }

  // =========================================================================
  // FASE B: ALLENAMENTO IN CORSO (ALLENAMENTO ATTIVO)
  // =========================================================================
  const targetSets = Number(currentExercise?.sets) || 1;
  const nextExercise = pendingNextExercise && localRoutine[exerciseIndex + 1] ? localRoutine[exerciseIndex + 1] : null;

  return (
    <div className="max-w-[420px] mx-auto min-h-screen bg-surface text-text-primary p-4 pb-32">
      {/* Header Allenamento in Corso con Durata Totale e Tasto Annulla */}
      <div className="flex items-center justify-between mb-4 bg-surface-secondary p-3 rounded-2xl border border-surface-tertiary">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-primary animate-pulse" />
          <span className="text-xs font-mono font-bold text-white">{formatTime(elapsedWorkoutSeconds)}</span>
          <span className="text-[10px] text-text-secondary uppercase font-bold ml-1">• {activeDay}</span>
        </div>
        <button 
          onClick={handleCancelWorkout}
          className="text-[10px] font-bold text-red-400 hover:text-red-300 flex items-center gap-1 uppercase tracking-wider"
        >
          <XCircle size={14} /> Termina
        </button>
      </div>

      {/* Badge Stato Corrente: Set vs Recupero */}
      <div className="mb-4 text-center">
        {isRestActive && pendingNextExercise ? (
          <div className="px-4 py-1.5 rounded-full text-xs font-black bg-blue-500/20 text-blue-400 inline-flex items-center gap-2 border border-blue-500/30 animate-pulse">
            <span>🔄</span> RECUPERO — PROSSIMO ESERCIZIO
          </div>
        ) : isRestActive ? (
          <div className="px-4 py-1.5 rounded-full text-xs font-black bg-amber-500/20 text-amber-400 inline-flex items-center gap-2 border border-amber-500/30 animate-pulse">
            <span>⏳</span> IN RECUPERO TRA I SET
          </div>
        ) : (
          <div className="px-4 py-1.5 rounded-full text-xs font-black bg-primary/20 text-primary inline-flex items-center gap-2 border border-primary/30">
            <span>💪</span> ESECUZIONE SET #{currentSet} / {targetSets}
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* CARD ESERCIZIO CON BOTTONE SOSTITUISCI NELL'HEADER */}
        <Card className="relative overflow-hidden border-2 border-surface-tertiary">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Esercizio {exerciseIndex + 1} di {localRoutine.length}</span>
              <h2 className="text-xl font-black text-white leading-tight mt-0.5">{currentExercise.name}</h2>
              <p className="text-text-secondary text-xs font-bold uppercase tracking-widest mt-1">
                {currentExercise.sets} set • {currentExercise.reps} rip
              </p>
            </div>

            {/* BOTTONE SOSTITUISCI A FIANCO AL NOME ESERCIZIO */}
            <button 
              onClick={handleOpenAlternatives}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-surface-secondary border border-surface-tertiary text-primary text-xs font-bold hover:bg-primary/10 transition-colors flex-shrink-0"
              title="Sostituisci esercizio"
            >
              <Repeat2 size={14} />
              <span>Sostituisci</span>
            </button>
          </div>
          
          {/* Visualizzatore Avanzamento Set */}
          <div className="flex gap-2 mt-6">
            {Array.from({ length: targetSets }).map((_, i) => (
              <div 
                key={i} 
                className={`h-2 flex-1 rounded-full transition-all ${
                  i < currentSet - 1 
                    ? 'bg-primary' 
                    : i === currentSet - 1 
                      ? isRestActive ? 'bg-amber-400 animate-pulse' : 'bg-primary animate-pulse' 
                      : 'bg-surface-tertiary'
                }`} 
              />
            ))}
          </div>
        </Card>

        {/* ANTEPRIMA PROSSIMO ESERCIZIO (durante recupero tra esercizi) */}
        {pendingNextExercise && nextExercise && (
          <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
            <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2">Prossimo esercizio</p>
            <h3 className="font-black text-white text-base">{nextExercise.name}</h3>
            <p className="text-xs text-text-secondary mt-0.5">
              {nextExercise.sets} set × {nextExercise.reps} rip @ {nextExercise.weight}kg
            </p>
          </div>
        )}

        {/* TIMER RECUPERO CARD */}
        <div className={`w-full p-6 rounded-3xl border transition-all text-center ${
          isRestActive 
            ? pendingNextExercise
              ? 'border-blue-400 bg-blue-400/10 shadow-[0_0_20px_rgba(96,165,250,0.15)]'
              : 'border-amber-400 bg-amber-400/10 shadow-[0_0_20px_rgba(251,191,36,0.15)]' 
            : 'border-surface-tertiary bg-surface-secondary/50 opacity-80'
        }`}>
          <span className={`text-5xl font-mono font-black ${
            isRestActive 
              ? pendingNextExercise ? 'text-blue-400' : 'text-amber-400' 
              : 'text-text-tertiary'
          }`}>
            {isRestActive ? formatTime(restTime) : formatTime(exerciseRest)}
          </span>
          <p className="text-[10px] font-black uppercase mt-2 tracking-widest text-text-secondary">
            {isRestActive 
              ? pendingNextExercise 
                ? '🔄 Recupero prima del prossimo esercizio' 
                : '⏱️ Recupero Attivo'
              : 'Tempo Recupero Previsto'
            }
          </p>
        </div>

        {/* INPUT PESO E RIPETIZIONI */}
        <Card className={`space-y-4 transition-all ${isRestActive ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
          <Stepper label="Carico (kg)" value={currentWeight} onChange={setCurrentWeight} step={2.5} unit="kg" />
          <Stepper label="Ripetizioni" value={currentReps} onChange={setCurrentReps} step={1} unit="rip" />
        </Card>

        {/* PULSANTE AZIONE PRINCIPALE */}
        <div className="space-y-2">
          {isRestActive ? (
            <Button 
              size="large" 
              fullWidth 
              onClick={handleRegisterSet} 
              className={`text-black font-black py-4 ${pendingNextExercise ? 'bg-blue-400 hover:bg-blue-300' : 'bg-amber-400 hover:bg-amber-300'}`}
            >
              {pendingNextExercise 
                ? `⚡ SALTA RECUPERO & VAI A ${nextExercise?.name?.substring(0, 20) || 'PROSSIMO'}`
                : `⚡ SALTA RECUPERO & VAI AL SET #${currentSet}`
              }
            </Button>
          ) : (
            <Button 
              size="large" 
              fullWidth 
              onClick={handleRegisterSet} 
              className="text-black bg-primary font-black py-4 shadow-lg"
            >
              COMPLETA SET #{currentSet}
            </Button>
          )}
        </div>
      </div>

      {/* BOTTOM SHEET ALTERNATIVE */}
      {showAlternatives && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={() => setShowAlternatives(false)}>
          <div 
            className="fixed inset-x-0 bottom-0 bg-surface border-t border-surface-tertiary rounded-t-3xl max-w-[420px] mx-auto z-50 max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-black text-white">Sostituisci Esercizio</h2>
                  <p className="text-xs text-text-secondary mt-0.5">Sostituto consigliato per: <span className="text-primary font-bold">{currentExercise?.name}</span></p>
                </div>
                <button 
                  onClick={() => setShowAlternatives(false)}
                  className="text-text-secondary hover:text-text-primary text-2xl font-bold p-1"
                >
                  ✕
                </button>
              </div>

              {loadingAlternatives ? (
                <div className="text-center py-12 space-y-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="text-text-secondary text-sm">Ricerca delle migliori alternative su Supabase...</p>
                </div>
              ) : Object.keys(alternatives).length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-text-secondary text-sm">Nessun esercizio alternativo trovato per questo gruppo muscolare.</p>
                </div>
              ) : (
                Object.entries(alternatives).map(([tierName, exercises]) => (
                  <div key={tierName} className="space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-md inline-block">{tierName}</h3>
                    <div className="space-y-2">
                      {exercises.map((ex) => (
                        <button
                          key={ex.id}
                          onClick={() => handleSelectAlternative(ex)}
                          className="w-full text-left bg-surface-secondary p-4 rounded-2xl border border-surface-tertiary hover:border-primary transition-all flex justify-between items-center group"
                        >
                          <div>
                            <p className="font-bold text-white text-sm group-hover:text-primary transition-colors">{ex.name}</p>
                            <p className="text-[10px] text-text-secondary mt-1">{ex.muscle} • {ex.equipment}</p>
                          </div>
                          <span className="text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">Seleziona ➔</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
