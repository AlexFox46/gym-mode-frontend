import React, { useState, useEffect, useRef } from 'react';

// Database degli esercizi con le alternative strutturate rigidamente in Tier Biomeccanici
const EXERCISE_DATABASE = {
  'CHEST PRESS': {
    name: 'CHEST PRESS',
    type: 'Macchina',
    target: '4 set × 8 rip @ 80 kg',
    defaultWeight: 80,
    defaultReps: 8,
    tiers: {
      tier1: [
        { name: 'CHEST PRESS CONVERGENTE', type: 'Macchina', target: '4 set × 8 rip @ 40+40 kg', defaultWeight: 40, defaultReps: 8 },
        { name: 'SPINTE MACCHINA INCLINATA', type: 'Macchina', target: '4 set × 10 rip @ 60 kg', defaultWeight: 60, defaultReps: 10 }
      ],
      tier2: [
        { name: 'PANCA PIANA BILANCIERE', type: 'Bilanciere', target: '4 set × 8 rip @ 80 kg', defaultWeight: 80, defaultReps: 8 },
        { name: 'SPINTE SU PIANA CON MANUBRI', type: 'Manubri', target: '4 set × 8 rip @ 32+32 kg', defaultWeight: 32, defaultReps: 8 }
      ],
      tier3: [
        { name: 'PEC DECK / CROCI', type: 'Cavi/Macchina', target: '3 set × 12 rip @ 50 kg', defaultWeight: 50, defaultReps: 12 },
        { name: 'DIPS AL CORPO LIBERO', type: 'Parallele', target: '4 set × max rip @ BW', defaultWeight: 0, defaultReps: 10 }
      ]
    }
  }
};

export const AllenatiView = ({ settings }) => {
  // --- STATI DELLA SCHEDA E GIORNI ---
  const [activeDay, setActiveDay] = useState('G1');
  const schemaDays = ['G1', 'G2', 'G3', 'G4'];

  // --- STATI ESERCIZIO ATTIVO & SOSTITUZIONI ---
  const [currentExercise, setCurrentExercise] = useState({
    name: 'CHEST PRESS',
    type: 'Macchina',
    target: '4 set × 8 rip @ 80 kg',
    defaultWeight: 80,
    defaultReps: 8
  });
  
  const [currentWeight, setCurrentWeight] = useState(80);
  const [currentReps, setCurrentReps] = useState(8);

  // Bottom Sheet (Cassetto della sostituzione dal basso)
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [touchStartClientY, setTouchStartClientY] = useState(null);

  // --- STATI TIMER GLOBALE (TRE STATI: AVVIA, PAUSA, INTERROMPI/RESET) ---
  const [globalTimer, setGlobalTimer] = useState(0);
  const [timerStatus, setTimerStatus] = useState('idle'); // 'idle' | 'running' | 'paused'

  // --- STATI RECUPERO (TASTONE VERDE) ---
  const [restTime, setRestTime] = useState(90);
  const [isRestActive, setIsRestActive] = useState(false);

  // --- STATI TRACCIAMENTO SET (PALLINI) ---
  const [currentSet, setCurrentSet] = useState(1);
  const totalSets = 4;
  const [completedSets, setCompletedSets] = useState([false, false, false, false]);

  // --- STATI TRACCIAMENTO SESSIONE (LINEETTE ESERCIZI) ---
  const [completedExercises, setCompletedExercises] = useState([true, false, false, false]);

  // --- 1. LOGICA TIMER GLOBALE (TRE STATI) ---
  useEffect(() => {
    let interval = null;
    if (timerStatus === 'running') {
      interval = setInterval(() => {
        setGlobalTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerStatus]);

  const handleGlobalTimerAction = (e) => {
    e.preventDefault();
    if (timerStatus === 'idle') {
      setTimerStatus('running');
    } else if (timerStatus === 'running') {
      setTimerStatus('paused');
    } else if (timerStatus === 'paused') {
      setTimerStatus('running');
    }
  };

  const handleGlobalTimerReset = (e) => {
    e.preventDefault();
    setTimerStatus('idle');
    setGlobalTimer(0);
  };

  // --- 2. LOGICA TIMER DI RECUPERO ---
  useEffect(() => {
    let restInterval = null;
    if (isRestActive && restTime > 0) {
      restInterval = setInterval(() => {
        setRestTime((prev) => prev - 1);
      }, 1000);
    } else if (restTime <= 0 && isRestActive) {
      setIsRestActive(false);
      setRestTime(90);
      if (settings?.prep_sound && window.navigator.vibrate) {
        window.navigator.vibrate([300, 100, 300]);
      }
    }
    return () => clearInterval(restInterval);
  }, [isRestActive, restTime, settings?.prep_sound]);

  const modifyRestTime = (e, amount) => {
    e.preventDefault();
    e.stopPropagation();
    setRestTime((prev) => Math.max(0, prev + amount));
  };

  // FORMATTER mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // --- 3. FIX ERGONOMIA ED EVENTI MOBILE ---
  const handleAction = (e, callback) => {
    e.preventDefault();
    e.stopPropagation();
    callback();
  };

  const step = settings?.step_increment || 1;

  // --- 4. GESTIONE SOSTITUZIONE ESERCIZIO ---
  const selectAlternative = (exercise) => {
    setCurrentExercise(exercise);
    setCurrentWeight(exercise.defaultWeight);
    setCurrentReps(exercise.defaultReps);
    setIsBottomSheetOpen(false);
  };

  // Swipe-down per chiudere il Bottom Sheet
  const handleTouchStart = (e) => {
    setTouchStartClientY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (touchStartClientY !== null) {
      const currentY = e.touches[0].clientY;
      if (currentY - touchStartClientY > 100) { // Trascinamento verso il basso > 100px
        setIsBottomSheetOpen(false);
        setTouchStartClientY(null);
      }
    }
  };

  // Registrazione dei Set
  const handleRegisterSet = () => {
    const updated = [...completedSets];
    updated[currentSet - 1] = true;
    setCompletedSets(updated);

    if (currentSet < totalSets) {
      setCurrentSet((prev) => prev + 1);
      setRestTime(90);
      setIsRestActive(true);
    } else {
      alert("Esercizio completato!");
      setCompletedSets([false, false, false, false]);
      setCurrentSet(1);
      setIsRestActive(false);
      setRestTime(90);
      setCompletedExercises([false, true, false, false]);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f0f4f8] dark:bg-neutral-950 p-0 font-sans flex flex-col select-none relative overflow-x-hidden">
      
      {/* ================= HEADER VERDE (MANTENUTO E PERFEZIONATO) ================= */}
      <div className="bg-[#15a34a] text-white px-4 py-3.5 flex items-center justify-between shadow-md z-10">
        <div className="flex items-center gap-2">
          {/* Tasto Azione Timer */}
          <button
            onTouchStart={handleGlobalTimerAction}
            onClick={handleGlobalTimerAction}
            className="border border-white/40 bg-white/10 px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-transform"
          >
            {timerStatus === 'running' ? '⏸ Pausa' : timerStatus === 'paused' ? '▶ Riprendi' : '▶ Avvia'}
          </button>
          
          {/* Tasto Reset/Interrompi */}
          {timerStatus !== 'idle' && (
            <button
              onTouchStart={handleGlobalTimerReset}
              onClick={handleGlobalTimerReset}
              className="border border-red-300/40 bg-red-600/30 text-red-100 px-3 py-1.5 rounded-lg text-xs font-bold active:scale-95"
            >
              ⏹️ Interrompi
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-1.5 font-mono text-sm font-black tracking-wider">
          <span>⏱</span>
          <span>{formatTime(globalTimer)}</span>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between space-y-4 pb-28">

        {/* ================= CARD ESERCIZIO INGRANDITA CON CHIPS GIORNO ================= */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-3xl p-5 shadow-sm space-y-4">
          
          {/* Riga Superiore: Chips dei Giorni d'Allenamento */}
          <div className="flex items-center gap-1.5 border-b border-neutral-100 dark:border-neutral-800/60 pb-3">
            {schemaDays.map((day) => (
              <button
                key={day}
                onTouchStart={(e) => handleAction(e, () => setActiveDay(day))}
                onClick={(e) => handleAction(e, () => setActiveDay(day))}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                  activeDay === day
                    ? 'bg-[#15a34a] text-white shadow-sm'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
                {currentExercise.name}
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-semibold">
                {currentExercise.type} · Target: {currentExercise.target}
              </p>
            </div>

            {/* Pulsante Sostituisci (Apre il Bottom Sheet) */}
            <button
              onTouchStart={(e) => handleAction(e, () => setIsBottomSheetOpen(true))}
              onClick={(e) => handleAction(e, () => setIsBottomSheetOpen(true))}
              className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-white px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 active:scale-95 shadow-sm"
            >
              🔄 Sostituisci
            </button>
          </div>

          {/* Lineette degli esercizi e Pallini per i set */}
          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/60 flex items-center justify-between">
            <div className="flex items-center gap-1">
              {completedExercises.map((isDoneEx, idx) => (
                <div
                  key={idx}
                  className={`h-1 rounded-full transition-all ${
                    isDoneEx 
                      ? 'w-7 bg-[#15a34a]' 
                      : 'w-4 bg-neutral-200 dark:bg-neutral-800'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-[#15a34a] uppercase tracking-wider">
                Set {currentSet} di {totalSets}
              </span>
              <div className="flex items-center gap-1.5">
                {completedSets.map((isDone, idx) => (
                  <div
                    key={idx}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      isDone 
                        ? 'bg-[#15a34a]' 
                        : currentSet === idx + 1 
                          ? 'bg-neutral-800 dark:bg-white animate-pulse ring-2 ring-neutral-200' 
                          : 'bg-neutral-200 dark:bg-neutral-800'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ================= TASTONE VERDE CON PULSANTI RAPIDI +/- TEMPO ================= */}
        <div className="relative flex flex-col items-center">
          
          {/* Pulsante Centrale del Recupero (Interazione pulita) */}
          <button
            onClick={() => setIsRestActive(!isRestActive)}
            className={`w-full h-40 rounded-3xl flex flex-col items-center justify-center p-6 shadow-sm border transition-all duration-300 active:scale-[0.99] ${
              isRestActive
                ? 'bg-[#15a34a] border-[#13a851] text-white animate-pulse'
                : 'bg-[#15a34a] border-[#13a851] text-white/95'
            }`}
          >
            <span className="font-mono text-5xl font-black tracking-widest leading-none">
              {isRestActive ? formatTime(restTime) : '-- : --'}
            </span>
            <p className="text-xs font-bold uppercase tracking-wider mt-4 text-center">
              {isRestActive ? 'Recupero in corso • Tocca per interrompere' : 'Premi qui per avviare il timer di recupero'}
            </p>
          </button>

          {/* Regolatori Rapidi del Tempo di Recupero (-30, -15, +15, +30) */}
          <div className="flex items-center justify-center gap-2 mt-3 w-full px-2">
            {[-30, -15, 15, 30].map((sec) => (
              <button
                key={sec}
                onTouchStart={(e) => modifyRestTime(e, sec)}
                onClick={(e) => modifyRestTime(e, sec)}
                className="flex-1 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl text-[11px] font-mono font-bold text-[#15a34a] dark:text-emerald-400 active:scale-95 shadow-sm"
              >
                {sec > 0 ? `+${sec}s` : `${sec}s`}
              </button>
            ))}
          </div>

        </div>

        {/* ================= REGOLATORI CARICO & RIPETIZIONI ================= */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-2xl p-4 shadow-sm space-y-3">
          {/* Peso */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-black text-neutral-600 dark:text-neutral-400 pl-1">Carico (kg)</span>
            <div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden bg-neutral-50 dark:bg-neutral-800">
              <button
                onTouchStart={(e) => handleAction(e, () => setCurrentWeight(prev => Math.max(0, prev - step)))}
                onClick={(e) => handleAction(e, () => setCurrentWeight(prev => Math.max(0, prev - step)))}
                className="w-11 h-10 flex items-center justify-center font-bold text-neutral-600 dark:text-white border-r border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 active:bg-neutral-100"
              >
                —
              </button>
              <div className="w-24 text-center font-mono font-black text-[#15a34a] dark:text-emerald-400">
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

          {/* Ripetizioni */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-black text-neutral-600 dark:text-neutral-400 pl-1">Ripetizioni</span>
            <div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden bg-neutral-50 dark:bg-neutral-800">
              <button
                onTouchStart={(e) => handleAction(e, () => setCurrentReps(prev => Math.max(0, prev - 1)))}
                onClick={(e) => handleAction(e, () => setCurrentReps(prev => Math.max(0, prev - 1)))}
                className="w-11 h-10 flex items-center justify-center font-bold text-neutral-600 dark:text-white border-r border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 active:bg-neutral-100"
              >
                —
              </button>
              <div className="w-24 text-center font-mono font-black text-[#15a34a] dark:text-emerald-400">
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

        {/* ================= BOTTONE D'AZIONE GLOBALE ================= */}
        <div className="space-y-2">
          <button
            onTouchStart={(e) => handleAction(e, handleRegisterSet)}
            onClick={(e) => handleAction(e, handleRegisterSet)}
            className="w-full h-14 bg-[#15a34a] hover:bg-[#13a851] text-white font-black rounded-2xl text-base uppercase tracking-wider shadow-md active:scale-[0.98] flex items-center justify-center"
          >
            {timerStatus === 'idle' ? 'INIZIA ALLENAMENTO' : `REGISTRA SET #${currentSet}`}
          </button>
          <p className="text-center text-[10px] text-neutral-400 font-extrabold uppercase tracking-widest">
            {timerStatus === 'idle' ? 'Premi per iniziare la sessione' : 'Registra il set per avviare il countdown'}
          </p>
        </div>

      </div>

      {/* ================= NATIVE-LIKE BOTTOM SHEET (IL CASSETTO DELLA SOSTITUZIONE) ================= */}
      {isBottomSheetOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end animate-fade-in">
          {/* Sfondo cliccabile per chiudere */}
          <div className="absolute inset-0" onClick={() => setIsBottomSheetOpen(false)} />
          
          {/* Contenitore Sheet */}
          <div 
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            className="relative w-full max-w-[420px] mx-auto bg-white dark:bg-neutral-900 rounded-t-[2.5rem] p-6 shadow-2xl z-10 transition-transform duration-300 max-h-[85vh] overflow-y-auto"
          >
            {/* Handle Bar per il feedback di trascinamento */}
            <div className="w-12 h-1.5 bg-neutral-300 dark:bg-neutral-700 rounded-full mx-auto mb-6" />

            <div className="space-y-5">
              <div>
                <h3 className="text-xl font-black text-neutral-900 dark:text-white">Seleziona Esercizio Alternativo</h3>
                <p className="text-xs text-neutral-400 uppercase tracking-widest mt-1 font-bold">Varianti biomeccanicamente coerenti</p>
              </div>

              {/* TIER 1 */}
              <div className="space-y-2">
                <span className="text-[10px] font-black tracking-widest text-emerald-600 dark:text-emerald-400 uppercase block">Tier 1 • Sostituto Diretto</span>
                {EXERCISE_DATABASE['CHEST PRESS'].tiers.tier1.map((ex) => (
                  <button
                    key={ex.name}
                    onClick={() => selectAlternative(ex)}
                    className="w-full text-left p-3.5 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-200/50 dark:border-neutral-700 flex justify-between items-center hover:bg-neutral-100"
                  >
                    <div>
                      <span className="text-sm font-bold block text-neutral-900 dark:text-white">{ex.name}</span>
                      <span className="text-xs text-neutral-400">{ex.type}</span>
                    </div>
                    <span className="text-xs text-[#15a34a] font-mono font-bold">{ex.target}</span>
                  </button>
                ))}
              </div>

              {/* TIER 2 */}
              <div className="space-y-2">
                <span className="text-[10px] font-black tracking-widest text-amber-600 dark:text-amber-400 uppercase block">Tier 2 • Ottima Alternativa</span>
                {EXERCISE_DATABASE['CHEST PRESS'].tiers.tier2.map((ex) => (
                  <button
                    key={ex.name}
                    onClick={() => selectAlternative(ex)}
                    className="w-full text-left p-3.5 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-200/50 dark:border-neutral-700 flex justify-between items-center hover:bg-neutral-100"
                  >
                    <div>
                      <span className="text-sm font-bold block text-neutral-900 dark:text-white">{ex.name}</span>
                      <span className="text-xs text-neutral-400">{ex.type}</span>
                    </div>
                    <span className="text-xs text-amber-600 font-mono font-bold">{ex.target}</span>
                  </button>
                ))}
              </div>

              {/* TIER 3 */}
              <div className="space-y-2">
                <span className="text-[10px] font-black tracking-widest text-red-500 uppercase block">Tier 3 • Sostituto Emergenza</span>
                {EXERCISE_DATABASE['CHEST PRESS'].tiers.tier3.map((ex) => (
                  <button
                    key={ex.name}
                    onClick={() => selectAlternative(ex)}
                    className="w-full text-left p-3.5 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-200/50 dark:border-neutral-700 flex justify-between items-center hover:bg-neutral-100"
                  >
                    <div>
                      <span className="text-sm font-bold block text-neutral-900 dark:text-white">{ex.name}</span>
                      <span className="text-xs text-neutral-400">{ex.type}</span>
                    </div>
                    <span className="text-xs text-red-500 font-mono font-bold">{ex.target}</span>
                  </button>
                ))}
              </div>

              {/* Tasto Chiudi in basso al centro */}
              <div className="pt-4 flex justify-center">
                <button
                  onClick={() => setIsBottomSheetOpen(false)}
                  className="px-6 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-xs font-black uppercase tracking-widest rounded-full shadow-md active:scale-95"
                >
                  Chiudi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
