import React, { useState, useEffect } from 'react';
import { Button, Stepper, Card } from '../components/UI';
import { BookOpen, Repeat2, Play, CheckCircle2, XCircle, Clock, Dumbbell } from 'lucide-react';
import { fetchExerciseAlternatives } from '../services/supabaseServices';

export const AllenatiView = ({ settings, schedaAttiva, onWorkoutComplete, onNavigateToSchede }) => {
  const [activeDay, setActiveDay] = useState('G1');
  const schemaDays = schedaAttiva ? Array.from({ length: schedaAttiva.daysCount }, (_, i) => `G${i + 1}`) : [];
  const [localRoutine, setLocalRoutine] = useState([]);
  const [exerciseIndex, setExerciseIndex] = useState(0);

  // Stato per la modalità di allenamento attiva (Pre-allenamento vs In corso)
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [workoutStartTime, setWorkoutStartTime] = useState(null);
  const [elapsedWorkoutSeconds, setElapsedWorkoutSeconds] = useState(0);

  // Reset activeDay quando cambia schedaAttiva
  useEffect(() => {
    if (schedaAttiva) {
      setActiveDay('G1');
      setIsWorkoutStarted(false);
    }
  }, [schedaAttiva?.id]);

  // Inizializzazione routine quando cambia schedaAttiva o activeDay
  useEffect(() => {
    if (schedaAttiva?.routine?.[activeDay]) {
      setLocalRoutine(JSON.parse(JSON.stringify(schedaAttiva.routine[activeDay])));
      setExerciseIndex(0);
    } else {
      setLocalRoutine([]);
      setExerciseIndex(0);
    }
  }, [schedaAttiva, activeDay]);

  // Timer della durata totale dell'allenamento
  useEffect(() => {
    let timer = null;
    if (isWorkoutStarted) {
      timer = setInterval(() => {
        setElapsedWorkoutSeconds(prev => prev + 1);
      }, 1000);
    } else {
      setElapsedWorkoutSeconds(0);
    }
    return () => clearInterval(timer);
  }, [isWorkoutStarted]);

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

  useEffect(() => {
    if (currentExercise) {
      setCurrentWeight(Number(currentExercise.weight) || 0);
      setCurrentReps(Number(currentExercise.reps) || 0);
      setCurrentSet(1);
      setRestTime(exerciseRest);
      setIsRestActive(false);
    }
  }, [exerciseIndex, currentExercise?.name]);

  // Gestione Timer Recupero
  useEffect(() => {
    let interval = null;
    if (isRestActive && restTime > 0) {
      interval = setInterval(() => setRestTime(prev => prev - 1), 1000);
    } else if (restTime <= 0 && isRestActive) {
      setIsRestActive(false);
      setRestTime(exerciseRest);
    }
    return () => clearInterval(interval);
  }, [isRestActive, restTime, exerciseRest]);

  // Avvio allenamento
  const handleStartWorkout = () => {
    setIsWorkoutStarted(true);
    setWorkoutStartTime(Date.now());
    setExerciseIndex(0);
    setCurrentSet(1);
    setIsRestActive(false);
  };

  // Annulla allenamento
  const handleCancelWorkout = () => {
    if (window.confirm("Vuoi davvero interrompere l'allenamento in corso?")) {
      setIsWorkoutStarted(false);
      setIsRestActive(false);
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
  };

  // REGISTRAZIONE SET O SALTA RECUPERO
  const handleRegisterSet = () => {
    if (isRestActive) {
      // Se l'utente clicca mentre è in corso il recupero, lo salta e avanza
      setIsRestActive(false);
      setRestTime(exerciseRest);
      return;
    }

    const targetSets = Number(currentExercise.sets) || 1;
    
    if (currentSet < targetSets) {
      // Avanza al set successivo dell'esercizio corrente ed avvia il recupero
      setCurrentSet(prev => prev + 1);
      setRestTime(exerciseRest);
      setIsRestActive(true);
    } else if (exerciseIndex < localRoutine.length - 1) {
      // Esercizio completato, avanza al prossimo esercizio
      setExerciseIndex(prev => prev + 1);
      setCurrentSet(1);
      setIsRestActive(false);
    } else {
      // Tutti gli esercizi della giornata completati!
      setIsWorkoutStarted(false);
      onWorkoutComplete({ 
        id: Date.now(), 
        date: new Date().toISOString(), 
        schedaName: schedaAttiva.name, 
        dayName: activeDay, 
        durationMinutes: Math.ceil(elapsedWorkoutSeconds / 60),
        tonnage: 0 
      });
    }
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // SECONTENITORE 1: Se non c'è scheda attiva
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
            onClick={onNavigateToSchede}
            className="flex items-center justify-center gap-2"
          >
            <BookOpen size={16} />
            VAI ALLE SCHEDE
          </Button>
        </div>
      </div>
    );
  }

  // SECONTENITORE 2: Se la scheda attiva non ha esercizi per il giorno
  if (localRoutine.length === 0) {
    return (
      <div className="max-w-[420px] mx-auto min-h-screen bg-surface text-text-primary p-4 pb-32">
        <div className="flex gap-2 overflow-x-auto mb-6">
          {schemaDays.map(day => (
            <button 
              key={day} 
              onClick={() => setActiveDay(day)} 
              className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${activeDay === day ? 'bg-primary text-black' : 'bg-surface-secondary text-text-secondary'}`}
            >
              {day}
            </button>
          ))}
        </div>
        <div className="text-center mt-20 space-y-4">
          <p className="text-text-secondary text-sm">Questo giorno non ha esercizi configurati.</p>
          <Button variant="secondary" onClick={() => setActiveDay(schemaDays[0])}>
            Torna a {schemaDays[0]}
          </Button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // FASE A: PRE-ALLENAMENTO ("AVVIA ALLENAMENTO")
  // =========================================================================
  if (!isWorkoutStarted) {
    return (
      <div className="max-w-[420px] mx-auto min-h-screen bg-surface text-text-primary p-4 pb-32">
        {/* Selettore Giorno */}
        <div className="flex gap-2 overflow-x-auto mb-6">
          {schemaDays.map(day => (
            <button 
              key={day} 
              onClick={() => setActiveDay(day)} 
              className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${activeDay === day ? 'bg-primary text-black shadow-md' : 'bg-surface-secondary text-text-secondary'}`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Card di Presentazione Scheda */}
        <Card className="mb-6 space-y-3 bg-surface-secondary border border-surface-tertiary">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
              {schedaAttiva.name}
            </span>
            <span className="text-[10px] font-bold text-text-secondary uppercase">
              {localRoutine.length} Esercizi
            </span>
          </div>
          <h1 className="text-2xl font-black text-white">Allenamento {activeDay}</h1>
          <p className="text-xs text-text-secondary">
            Pronto per la sessione? Rivedi la scheda qui sotto e premi Avvia quando sei pronto.
          </p>
        </Card>

        {/* Lista degli esercizi previsti */}
        <div className="space-y-3 mb-8">
          <h2 className="text-xs font-black uppercase tracking-widest text-text-secondary ml-1">Esercizi In programma</h2>
          {localRoutine.map((ex, idx) => (
            <Card key={ex.instanceId || idx} className="p-4 flex items-center justify-between bg-surface-secondary/80 border border-surface-tertiary">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-surface-tertiary flex items-center justify-center font-bold text-xs text-primary">
                  #{idx + 1}
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">{ex.name}</h3>
                  <p className="text-[10px] text-text-secondary">{ex.sets} set × {ex.reps} rip @ {ex.weight}kg</p>
                </div>
              </div>
              <span className="text-[10px] text-text-tertiary font-mono">{ex.rest || 90}s rec</span>
            </Card>
          ))}
        </div>

        {/* Pulsante Principale: AVVIA ALLENAMENTO */}
        <Button 
          size="large" 
          fullWidth 
          onClick={handleStartWorkout}
          className="text-black bg-primary font-black py-5 text-base flex items-center justify-center gap-3 shadow-xl hover:opacity-95 transition-all"
        >
          <Play size={20} fill="black" />
          AVVIA ALLENAMENTO
        </Button>
      </div>
    );
  }

  // =========================================================================
  // FASE B: ALLENAMENTO IN CORSO (ALLENAMENTO ATTIVO)
  // =========================================================================
  const targetSets = Number(currentExercise?.sets) || 1;

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
        {isRestActive ? (
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

        {/* TIMER RECUPERO CARD */}
        <div className={`w-full p-6 rounded-3xl border transition-all text-center ${
          isRestActive 
            ? 'border-amber-400 bg-amber-400/10 shadow-[0_0_20px_rgba(251,191,36,0.15)]' 
            : 'border-surface-tertiary bg-surface-secondary/50 opacity-80'
        }`}>
          <span className={`text-5xl font-mono font-black ${isRestActive ? 'text-amber-400' : 'text-text-tertiary'}`}>
            {isRestActive ? formatTime(restTime) : formatTime(exerciseRest)}
          </span>
          <p className="text-[10px] font-black uppercase mt-2 tracking-widest text-text-secondary">
            {isRestActive ? '⏱️ Recupero Attivo' : 'Tempo Recupero Previsto'}
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
              className="text-black bg-amber-400 hover:bg-amber-300 font-black py-4"
            >
              ⚡ SALTA RECUPERO & VAI AL SET #{currentSet}
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
