import React, { useState, useEffect } from 'react';

// Esercizi biomeccanicamente coerenti per la sostituzione (Chest Press e varianti)
const ALTERNATIVE_EXERCISES = [
  { name: 'CHEST PRESS', type: 'Macchina', target: '4 set × 8 rip @ 80 kg', defaultWeight: 80, defaultReps: 8 },
  { name: 'PANCA PIANA', type: 'Bilanciere', target: '4 set × 8 rip @ 70 kg', defaultWeight: 70, defaultReps: 8 },
  { name: 'SPINTE MANUBRI', type: 'Manubri', target: '4 set × 10 rip @ 24 kg', defaultWeight: 24, defaultReps: 10 },
  { name: 'PEC DECK', type: 'Macchina', target: '4 set × 12 rip @ 50 kg', defaultWeight: 50, defaultReps: 12 }
];

export const AllenatiView = ({ settings }) => {
  // --- STATI PRINCIPALI ---
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const currentExercise = ALTERNATIVE_EXERCISES[exerciseIndex];

  // Stati per Carico e Ripetizioni (inizializzati in base all'esercizio corrente)
  const [currentWeight, setCurrentWeight] = useState(currentExercise.defaultWeight);
  const [currentReps, setCurrentReps] = useState(currentExercise.defaultReps);

  // Stato sessione globale (Iniziato / Non Iniziato)
  const [sessionActive, setSessionActive] = useState(false);
  const [globalTimer, setGlobalTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Stato del recupero (Rest) gestito dal tastone verde centrale
  const [restTime, setRestTime] = useState(90); // 1 minuto e mezzo standard
  const [isRestActive, setIsRestActive] = useState(false);

  // Set Tracker (i pallini della sessione)
  const [currentSet, setCurrentSet] = useState(1);
  const totalSets = 4;
  const [completedSets, setCompletedSets] = useState([false, false, false, false]);

  // Esercizi della sessione (lineette in alto nella card per mostrare i progressi della scheda)
  // Rappresenta: [Esercizio 1 (Attivo), Esercizio 2, Esercizio 3, Esercizio 4]
  const [sessionExercises, setSessionExercises] = useState([true, false, false, false]);

  // --- 1. SINCRO PESO/REPS AL CAMBIO ESERCIZIO ---
  useEffect(() => {
    setCurrentWeight(currentExercise.defaultWeight);
    setCurrentReps(currentExercise.defaultReps);
  }, [exerciseIndex]);

  // --- 2. TIMER DI SESSIONE GLOBALE ---
  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setGlobalTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // --- 3. TIMER DI RECUPERO (TASTONE VERDE) ---
  useEffect(() => {
    let restInterval = null;
    if (isRestActive && restTime > 0) {
      restInterval = setInterval(() => {
        setRestTime((prev) => prev - 1);
      }, 1000);
    } else if (restTime === 0 && isRestActive) {
      setIsRestActive(false);
      setRestTime(90); // Resetta al tempo standard
      if (settings?.prep_sound && window.navigator.vibrate) {
        window.navigator.vibrate([300, 100, 300]);
      }
    }
    return () => clearInterval(restInterval);
  }, [isRestActive, restTime, settings?.prep_sound]);

  // FORMATTER TEMPO (mm:ss)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // --- 4. FIX TOUCH EVENT (Previene il doppio click mobile) ---
  const handleAction = (e, callback) => {
    e.preventDefault();
    e.stopPropagation();
    callback();
  };

  const step = settings?.step_increment || 1;

  // Azione per sostituire l'esercizio con uno biomeccanicamente coerente
  const handleSubstitute = () => {
    setExerciseIndex((prev) => (prev + 1) % ALTERNATIVE_EXERCISES.length);
  };

  // Gestione dell'avvio/registrazione tramite il tastone inferiore
  const handleMainActionButton = () => {
    if (!sessionActive) {
      // Avvia allenamento globale
      setSessionActive(true);
      setIsTimerRunning(true);
    } else {
      // Registra Set corrente
      const updated = [...completedSets];
      updated[currentSet - 1] = true;
      setCompletedSets(updated);

      if (currentSet < totalSets) {
        setCurrentSet((prev) => prev + 1);
        // Avvia in automatico il recupero dal tastone centrale dopo ogni registrazione
        setRestTime(90);
        setIsRestActive(true);
      } else {
        // Fine esercizio / reset
        alert("Esercizio completato! Ottimo lavoro.");
        setCompletedSets([false, false, false, false]);
        setCurrentSet(1);
        setIsRestActive(false);
        setRestTime(90);
        // Passa al prossimo indicatore di esercizio (lineetta della sessione)
        setSessionExercises([false, true, false, false]);
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f0f4f8] dark:bg-neutral-950 p-0 font-sans flex flex-col select-none">
      
      {/* ================= HEADER VERDE (IDENTICO AL TUO SCREENSHOT) ================= */}
      <div className="bg-[#15a34a] text-white px-4 py-3.5 flex items-center justify-between shadow-md">
        <button
          onTouchStart={(e) => handleAction(e, () => setIsTimerRunning(!isTimerRunning))}
          onClick={(e) => handleAction(e, () => setIsTimerRunning(!isTimerRunning))}
          className="border border-white/40 bg-white/10 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-transform"
        >
          <span>⏸</span> {isTimerRunning ? 'Pausa' : 'Riprendi'}
        </button>
        
        <div className="flex items-center gap-1.5 font-mono text-sm font-bold">
          <span>⏱</span>
          <span>{formatTime(globalTimer)}</span>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">

        {/* ================= CARD ESERCIZIO CON SOSTITUISCI & LINEETTE ================= */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-2xl p-4 shadow-sm relative">
          
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-black text-neutral-900 dark:text-white tracking-tight">
                {currentExercise.name}
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                {currentExercise.type} · Target: {currentExercise.target}
              </p>
            </div>

            {/* Tasto Sostituisci Biomeccanico */}
            <button
              onTouchStart={(e) => handleAction(e, handleSubstitute)}
              onClick={(e) => handleAction(e, handleSubstitute)}
              className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-600 dark:text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 active:scale-95"
            >
              🔄 Sostituisci
            </button>
          </div>

          {/* Lineette degli esercizi della sessione + Pallini progressi dei set */}
          <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/60 flex items-center justify-between">
            {/* Lineette indicatrici degli esercizi totali della scheda */}
            <div className="flex items-center gap-1">
              {sessionExercises.map((isActiveEx, idx) => (
                <div
                  key={idx}
                  className={`h-1 rounded-full transition-all ${
                    isActiveEx 
                      ? 'w-7 bg-[#15a34a]' 
                      : 'w-4 bg-neutral-200 dark:bg-neutral-800'
                  }`}
                />
              ))}
            </div>

            {/* Indicatore testuale del set con pallini */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-[#15a34a] uppercase tracking-wider">
                Set {currentSet} di {totalSets}
              </span>
              
              {/* Pallini dei set */}
              <div className="flex items-center gap-1">
                {completedSets.map((isDone, idx) => (
                  <div
                    key={idx}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      isDone 
                        ? 'bg-[#15a34a]' 
                        : currentSet === idx + 1 
                          ? 'bg-neutral-800 dark:bg-white animate-pulse' 
                          : 'bg-neutral-200 dark:bg-neutral-800'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ================= TASTONE VERDE DEL RECUPERO (CENTRAL BLOCK) ================= */}
        <button
          onTouchStart={(e) => handleAction(e, () => setIsRestActive(!isRestActive))}
          onClick={(e) => handleAction(e, () => setIsRestActive(!isRestActive))}
          className={`w-full flex-1 min-h-[160px] rounded-2xl flex flex-col items-center justify-center p-6 shadow-sm border transition-all duration-300 active:scale-[0.99] ${
            isRestActive
              ? 'bg-[#15a34a] border-[#13a851] text-white animate-pulse'
              : 'bg-[#15a34a] border-[#13a851] text-white/90'
          }`}
        >
          <span className="font-mono text-5xl font-black tracking-widest leading-none">
            {isRestActive ? formatTime(restTime) : '-- : --'}
          </span>
          <p className="text-xs font-bold uppercase tracking-wider mt-4 text-center">
            {isRestActive ? 'Recupero in corso • Tocca per interrompere' : 'Premi INIZIA RECUPERO per avviare il timer'}
          </p>
        </button>

        {/* ================= CONTROLLI CARICO E REPS FIXATI ================= */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-2xl p-3 shadow-sm space-y-3">
          
          {/* Selettore Carico */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-neutral-600 dark:text-neutral-400 pl-1">Carico (kg)</span>
            <div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden bg-neutral-50 dark:bg-neutral-800">
              <button
                onTouchStart={(e) => handleAction(e, () => setCurrentWeight(prev => Math.max(0, prev - step)))}
                onClick={(e) => handleAction(e, () => setCurrentWeight(prev => Math.max(0, prev - step)))}
                className="w-11 h-10 flex items-center justify-center font-bold text-neutral-600 dark:text-white border-r border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 active:bg-neutral-100"
              >
                —
              </button>
              <div className="w-24 text-center font-mono font-black text-[#15a34a]">
                {currentWeight} kg
              </div>
              <button
                onTouchStart={(e) => handleAction(e, () => setCurrentWeight(prev => prev + step))}
                onClick={(e) => handleAction(e, () => setCurrentWeight(prev => prev + step))}
                className="w-11 h-10 flex items-center justify-center font-bold text-neutral-600 dark:text-white border-l border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 active:bg-neutral-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Selettore Ripetizioni */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-neutral-600 dark:text-neutral-400 pl-1">Ripetizioni</span>
            <div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden bg-neutral-50 dark:bg-neutral-800">
              <button
                onTouchStart={(e) => handleAction(e, () => setCurrentReps(prev => Math.max(0, prev - 1)))}
                onClick={(e) => handleAction(e, () => setCurrentReps(prev => Math.max(0, prev - 1)))}
                className="w-11 h-10 flex items-center justify-center font-bold text-neutral-600 dark:text-white border-r border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 active:bg-neutral-100"
              >
                —
              </button>
              <div className="w-24 text-center font-mono font-black text-[#15a34a]">
                {currentReps} rip
              </div>
              <button
                onTouchStart={(e) => handleAction(e, () => setCurrentReps(prev => prev + 1))}
                onClick={(e) => handleAction(e, () => setCurrentReps(prev => prev + 1))}
                className="w-11 h-10 flex items-center justify-center font-bold text-neutral-600 dark:text-white border-l border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 active:bg-neutral-100"
              >
                +
              </button>
            </div>
          </div>

        </div>

        {/* ================= BOTTONE D'AZIONE GLOBALE (INIZIA / REGISTRA) ================= */}
        <div className="space-y-2">
          <button
            onTouchStart={(e) => handleAction(e, handleMainActionButton)}
            onClick={(e) => handleAction(e, handleMainActionButton)}
            className="w-full h-14 bg-[#15a34a] hover:bg-[#13a851] text-white font-black rounded-xl text-base uppercase tracking-wider shadow-md transition-all active:scale-[0.98] flex items-center justify-center"
          >
            {!sessionActive ? 'INIZIA ALLENAMENTO' : `REGISTRA SET #${currentSet}`}
          </button>
          
          <p className="text-center text-[11px] text-neutral-500 font-medium">
            {!sessionActive 
              ? 'Premi il bottone verde per iniziare il tuo allenamento' 
              : 'Registra il set completato per avviare il countdown di recupero'}
          </p>
        </div>

      </div>

    </div>
  );
};
