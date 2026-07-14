import React, { useState, useEffect } from 'react';
import { Button, Stepper, Card } from '../components/UI';
import { CheckCircle2, Plus, X, ArrowRight, ArrowLeft } from 'lucide-react';

const EXERCISE_CATALOG = [
  { id: 'e1', name: 'Chest Press', muscle: 'Petto', equipment: 'Macchina' },
  { id: 'e2', name: 'Panca Piana', muscle: 'Petto', equipment: 'Bilanciere' },
  { id: 'e3', name: 'Spinte Manubri piana', muscle: 'Petto', equipment: 'Manubri' },
  { id: 'e4', name: 'Croci Cavi Alti', muscle: 'Petto', equipment: 'Cavi' },
  { id: 'e4b', name: 'Pec Deck', muscle: 'Petto', equipment: 'Macchina' },
  { id: 'e4c', name: 'Dips alle parallele', muscle: 'Petto', equipment: 'Corpo Libero' },
  { id: 'e5', name: 'Lat Machine', muscle: 'Dorso', equipment: 'Macchina' },
  { id: 'e6', name: 'Trazioni', muscle: 'Dorso', equipment: 'Corpo Libero' },
  { id: 'e7', name: 'Rematore Bilanciere', muscle: 'Dorso', equipment: 'Bilanciere' },
  { id: 'e8', name: 'Pulley Basso', muscle: 'Dorso', equipment: 'Cavi' },
  { id: 'e9', name: 'Squat', muscle: 'Gambe', equipment: 'Bilanciere' },
  { id: 'e10', name: 'Leg Press', muscle: 'Gambe', equipment: 'Macchina' },
  { id: 'e11', name: 'Leg Extension', muscle: 'Gambe', equipment: 'Macchina' },
  { id: 'e12', name: 'Affondi', muscle: 'Gambe', equipment: 'Manubri' },
  { id: 'e13', name: 'Military Press', muscle: 'Spalle', equipment: 'Bilanciere' },
  { id: 'e14', name: 'Alzate Laterali', muscle: 'Spalle', equipment: 'Manubri' },
  { id: 'e15', name: 'Curl Bilanciere', muscle: 'Bicipiti', equipment: 'Bilanciere' },
  { id: 'e16', name: 'Push Down', muscle: 'Tricipiti', equipment: 'Cavi' }
];

export const AllenatiView = ({ settings, schedaAttiva, onWorkoutComplete }) => {
  const [activeDay, setActiveDay] = useState('G1');
  const schemaDays = schedaAttiva ? Array.from({ length: schedaAttiva.daysCount }, (_, i) => `G${i + 1}`) : [];

  const [localRoutine, setLocalRoutine] = useState([]);
  const [exerciseIndex, setExerciseIndex] = useState(0);

  useEffect(() => {
    if (schedaAttiva && schedaAttiva.routine && schedaAttiva.routine[activeDay]) {
      setLocalRoutine(JSON.parse(JSON.stringify(schedaAttiva.routine[activeDay])));
    } else {
      setLocalRoutine([]);
    }
    setExerciseIndex(0);
  }, [schedaAttiva, activeDay]);

  const currentExercise = localRoutine[exerciseIndex];

  const [currentWeight, setCurrentWeight] = useState(0);
  const [currentReps, setCurrentReps] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);

  const exerciseRest = currentExercise?.rest ? Number(currentExercise.rest) : 90;

  useEffect(() => {
    if (currentExercise) {
      setCurrentWeight(Number(currentExercise.weight) || 0);
      setCurrentReps(Number(currentExercise.reps) || 0);
      setCurrentSet(1);
      setRestTime(exerciseRest); 
    }
  }, [currentExercise, exerciseRest]);

  const [globalTimer, setGlobalTimer] = useState(0);
  const [timerStatus, setTimerStatus] = useState('idle');
  const [restTime, setRestTime] = useState(90);
  const [isRestActive, setIsRestActive] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timerStatus === 'running') interval = setInterval(() => setGlobalTimer((prev) => prev + 1), 1000);
    else clearInterval(interval);
    return () => clearInterval(interval);
  }, [timerStatus]);

  useEffect(() => {
    let restInterval = null;
    if (isRestActive && restTime > 0) restInterval = setInterval(() => setRestTime((prev) => prev - 1), 1000);
    else if (restTime <= 0 && isRestActive) {
      setIsRestActive(false);
      setRestTime(exerciseRest);
      if (settings?.prep_sound && window.navigator.vibrate) window.navigator.vibrate([300, 100, 300]);
    }
    return () => clearInterval(restInterval);
  }, [isRestActive, restTime, settings?.prep_sound, exerciseRest]);

  const handleGlobalTimerAction = (e) => {
    e.preventDefault();
    if (timerStatus === 'idle') setTimerStatus('running');
    else if (timerStatus === 'running') setTimerStatus('paused');
    else if (timerStatus === 'paused') setTimerStatus('running');
  };

  const handleGlobalTimerReset = (e) => {
    e.preventDefault();
    setTimerStatus('idle');
    setGlobalTimer(0);
  };

  const modifyRestTime = (e, amount) => {
    e.preventDefault();
    e.stopPropagation();
    setRestTime((prev) => Math.max(0, prev + amount));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTiers = () => {
    if (!currentExercise) return { tier1: [], tier2: [], tier3: [] };
    const alternatives = EXERCISE_CATALOG.filter(ex => ex.muscle === currentExercise.muscle && ex.name !== currentExercise.name);
    const tier1 = alternatives.filter(ex => ex.equipment === currentExercise.equipment);
    const freeWeights = ['Manubri', 'Bilanciere', 'Corpo Libero'];
    const tier2 = alternatives.filter(ex => freeWeights.includes(ex.equipment) && ex.equipment !== currentExercise.equipment);
    const machines = ['Macchina', 'Cavi'];
    const tier3 = alternatives.filter(ex => machines.includes(ex.equipment) && ex.equipment !== currentExercise.equipment);
    return { tier1, tier2, tier3 };
  };

  const handleSelectAlternative = (newExTemplate) => {
    const updatedExercise = { ...currentExercise, name: newExTemplate.name, equipment: newExTemplate.equipment };
    const newRoutine = [...localRoutine];
    newRoutine[exerciseIndex] = updatedExercise;
    setLocalRoutine(newRoutine); 
    setIsBottomSheetOpen(false);
  };

  const handleRegisterSet = () => {
    const targetSets = Number(currentExercise.sets) || 1;
    
    // Aggiorniamo la copia locale per calcolare il tonnellaggio reale svolto
    const newRoutine = [...localRoutine];
    newRoutine[exerciseIndex] = {
      ...newRoutine[exerciseIndex],
      completedSets: currentSet,
      actualWeight: currentWeight,
      actualReps: currentReps
    };
    setLocalRoutine(newRoutine);

    if (currentSet < targetSets) {
      setCurrentSet((prev) => prev + 1);
      setRestTime(exerciseRest); 
      setIsRestActive(true);
    } else {
      if (exerciseIndex < localRoutine.length - 1) {
        setExerciseIndex(prev => prev + 1);
        setIsRestActive(false);
      } else {
        // --- LOGICA DI COMPLETAMENTO ---
        // Calcola il tonnellaggio totale della sessione (Peso x Reps x Set per ogni esercizio)
        const totalTonnage = newRoutine.reduce((acc, ex) => {
          const w = Number(ex.actualWeight || ex.weight || 0);
          const r = Number(ex.actualReps || ex.reps || 0);
          const s = Number(ex.completedSets || ex.sets || 0);
          return acc + (w * r * s);
        }, 0);

        const logEntry = {
          id: Date.now(),
          date: new Date().toISOString(),
          schedaName: schedaAttiva.name,
          dayName: activeDay,
          tonnage: parseFloat((totalTonnage / 1000).toFixed(2)) // Convertito in tonnellate
        };

        alert(`Sessione completata!\nTonnellaggio: ${logEntry.tonnage} ton`);
        setIsRestActive(false);
        setTimerStatus('idle');
        onWorkoutComplete(logEntry); // Invia ad App.js
      }
    }
  };

  if (!schedaAttiva) {
    return (
      <div className="min-h-screen w-full bg-[#f0f4f8] dark:bg-neutral-950 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight mb-2">Pronto per iniziare?</h2>
        <p className="text-sm text-neutral-500 font-semibold max-w-[280px]">Non hai nessuna scheda attiva. Vai nella sezione <b className="text-[#15a34a]">Schede</b> per crearne una.</p>
      </div>
    );
  }

  const currentTiers = getTiers();

  return (
    <div className="min-h-screen w-full bg-[#f0f4f8] dark:bg-neutral-950 p-0 font-sans flex flex-col select-none overflow-x-hidden">
      
      <div className="bg-[#15a34a] text-white px-4 py-3.5 flex items-center justify-between shadow-md z-10">
        <div className="flex items-center gap-2">
          <button onClick={handleGlobalTimerAction} className="border border-white/40 bg-white/10 px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-transform">
            {timerStatus === 'running' ? '⏸ Pausa' : timerStatus === 'paused' ? '▶ Riprendi' : '▶ Avvia'}
          </button>
          {timerStatus !== 'idle' && (
            <button onClick={handleGlobalTimerReset} className="border border-red-300/40 bg-red-600/30 text-red-100 px-3 py-1.5 rounded-lg text-xs font-bold active:scale-95">
              ⏹️ Stop
            </button>
          )}
        </div>
        <div className="flex items-center gap-1.5 font-mono text-sm font-black tracking-wider">
          <span>⏱</span><span>{formatTime(globalTimer)}</span>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col space-y-4 pb-28">
        
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {schemaDays.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                activeDay === day ? 'bg-[#15a34a] text-white shadow-sm' : 'bg-neutral-200/50 dark:bg-neutral-800 text-neutral-500'
              }`}
            >
              {day}
            </button>
          ))}
          <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400 ml-2 truncate max-w-[120px]">
            {schedaAttiva.name}
          </span>
        </div>

        {!currentExercise ? (
           <div className="text-center py-12 px-4 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-3xl bg-white dark:bg-neutral-900 mt-4">
             <CheckCircle2 size={48} className="mx-auto text-emerald-400 mb-3" />
             <h3 className="text-lg font-black text-neutral-900 dark:text-white">Sessione Libera / Terminata</h3>
             <p className="text-xs text-neutral-500 mt-1 font-semibold">Non ci sono esercizi in programma per il giorno {activeDay}.</p>
           </div>
        ) : (
          <>
            <Card className="p-5 shadow-sm border-none ring-1 ring-neutral-200/50 dark:ring-neutral-800 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight leading-none">{currentExercise.name}</h2>
                  <p className="text-xs text-neutral-500 mt-1.5 font-semibold">
                    {currentExercise.equipment} • Target: {currentExercise.sets} set × {currentExercise.reps} rip
                  </p>
                </div>
                <button
                  onClick={() => setIsBottomSheetOpen(true)}
                  className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-white px-3 py-1.5 rounded-xl text-[10px] font-black flex items-center gap-1 active:scale-95 uppercase tracking-widest shadow-sm"
                >
                  🔄 Sostituisci
                </button>
              </div>

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {localRoutine.map((_, idx) => (
                    <div key={idx} className={`h-1.5 rounded-full transition-all ${
                      idx < exerciseIndex ? 'w-6 bg-[#15a34a]' : idx === exerciseIndex ? 'w-6 bg-[#15a34a] opacity-60' : 'w-3 bg-neutral-200 dark:bg-neutral-700'
                    }`} />
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  {Array.from({ length: Number(currentExercise.sets) || 1 }).map((_, idx) => (
                    <div key={idx} className={`w-3 h-3 rounded-full transition-colors ${
                      idx < currentSet - 1 ? 'bg-[#15a34a]' : idx === currentSet - 1 ? 'bg-neutral-800 dark:bg-white animate-pulse ring-2 ring-neutral-200 dark:ring-neutral-700' : 'bg-neutral-200 dark:bg-neutral-800'
                    }`} />
                  ))}
                </div>
              </div>
            </Card>

            <div className="relative flex flex-col items-center">
              <button onClick={() => setIsRestActive(!isRestActive)} className={`w-full h-40 rounded-3xl flex flex-col items-center justify-center p-6 shadow-sm border transition-all duration-300 active:scale-[0.99] ${isRestActive ? 'bg-[#15a34a] border-[#13a851] text-white animate-pulse' : 'bg-[#15a34a] border-[#13a851] text-white/95'}`}>
                <span className="font-mono text-5xl font-black tracking-widest leading-none">{isRestActive ? formatTime(restTime) : formatTime(exerciseRest)}</span>
                <p className="text-xs font-bold uppercase tracking-wider mt-4 text-center">{isRestActive ? 'Recupero in corso • Tocca x Stop' : 'Avvia timer recupero'}</p>
              </button>
              <div className="flex items-center justify-center gap-2 mt-3 w-full px-2">
                {[-30, -15, 15, 30].map((sec) => (
                  <button key={sec} onClick={(e) => modifyRestTime(e, sec)} className="flex-1 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl text-[11px] font-mono font-bold text-[#15a34a] dark:text-emerald-400 active:scale-95 shadow-sm">
                    {sec > 0 ? `+${sec}s` : `${sec}s`}
                  </button>
                ))}
              </div>
            </div>

            <Card className="shadow-sm p-4 space-y-1 border-none ring-1 ring-neutral-200/50 dark:ring-neutral-800">
              <Stepper label="Carico" value={currentWeight} onChange={(val) => setCurrentWeight(val)} step={settings?.step_increment || 1} unit="kg" />
              <Stepper label="Ripetizioni" value={currentReps} onChange={(val) => setCurrentReps(val)} step={1} unit="rip" />
            </Card>

            <div className="space-y-2">
              <Button variant="primary" size="large" fullWidth onClick={handleRegisterSet} className="h-14 font-black tracking-wider text-base rounded-2xl bg-[#15a34a] border-none text-white shadow-md active:bg-green-700">
                {timerStatus === 'idle' ? 'INIZIA ALLENAMENTO' : `REGISTRA SET #${currentSet}`}
              </Button>
            </div>
          </>
        )}
      </div>

      {isBottomSheetOpen && currentExercise && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end animate-fade-in">
          <div className="absolute inset-0" onClick={() => setIsBottomSheetOpen(false)} />
          <div className="relative w-full max-w-[420px] mx-auto bg-white dark:bg-neutral-900 rounded-t-[2.5rem] pt-6 pb-8 shadow-2xl overflow-hidden">
            <div className="w-12 h-1.5 bg-neutral-300 dark:bg-neutral-700 rounded-full mx-auto mb-6" />
            
            <div className="px-6 mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-neutral-900 dark:text-white">Alternative ({currentExercise.muscle})</h3>
                <p className="text-xs text-neutral-400 font-bold mt-1">Scorri le card. Il target set/reps non cambia.</p>
              </div>
              <button onClick={() => setIsBottomSheetOpen(false)} className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-full active:scale-95"><X size={18}/></button>
            </div>

            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 px-6 no-scrollbar">
              <div className="min-w-[85%] snap-center shrink-0 bg-neutral-50 dark:bg-neutral-800 rounded-3xl p-5 border border-[#15a34a]/30">
                <h4 className="text-[#15a34a] font-black uppercase tracking-widest text-[10px] mb-3 flex items-center justify-between">
                  Tier 1 • Sostituto Diretto <ArrowRight size={12} className="text-neutral-300"/>
                </h4>
                <div className="space-y-2">
                  {currentTiers.tier1.length === 0 ? (
                    <p className="text-xs font-bold text-neutral-400 py-4 text-center">Nessuna opzione.</p>
                  ) : (
                    currentTiers.tier1.map(ex => (
                      <button key={ex.id} onClick={() => handleSelectAlternative(ex)} className="w-full text-left p-3.5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/60 dark:border-neutral-700 shadow-sm flex items-center justify-between">
                        <div>
                          <span className="text-sm font-bold block text-neutral-900 dark:text-white">{ex.name}</span>
                          <span className="text-[10px] font-bold text-neutral-400 mt-0.5">{ex.equipment}</span>
                        </div>
                        <Plus size={18} className="text-[#15a34a]" />
                      </button>
                    ))
                  )}
                </div>
              </div>

              <div className="min-w-[85%] snap-center shrink-0 bg-neutral-50 dark:bg-neutral-800 rounded-3xl p-5 border border-amber-500/30">
                <h4 className="text-amber-500 font-black uppercase tracking-widest text-[10px] mb-3 flex items-center justify-between">
                   <ArrowLeft size={12} className="text-neutral-300"/> Tier 2 • Pesi Liberi <ArrowRight size={12} className="text-neutral-300"/>
                </h4>
                <div className="space-y-2">
                  {currentTiers.tier2.length === 0 ? (
                    <p className="text-xs font-bold text-neutral-400 py-4 text-center">Nessuna opzione.</p>
                  ) : (
                    currentTiers.tier2.map(ex => (
                      <button key={ex.id} onClick={() => handleSelectAlternative(ex)} className="w-full text-left p-3.5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/60 dark:border-neutral-700 shadow-sm flex items-center justify-between">
                        <div>
                          <span className="text-sm font-bold block text-neutral-900 dark:text-white">{ex.name}</span>
                          <span className="text-[10px] font-bold text-neutral-400 mt-0.5">{ex.equipment}</span>
                        </div>
                        <Plus size={18} className="text-[#15a34a]" />
                      </button>
                    ))
                  )}
                </div>
              </div>

              <div className="min-w-[85%] snap-center shrink-0 bg-neutral-50 dark:bg-neutral-800 rounded-3xl p-5 border border-red-500/30">
                <h4 className="text-red-500 font-black uppercase tracking-widest text-[10px] mb-3 flex items-center justify-between">
                   <ArrowLeft size={12} className="text-neutral-300"/> Tier 3 • Macchine / Cavi
                </h4>
                <div className="space-y-2">
                  {currentTiers.tier3.length === 0 ? (
                    <p className="text-xs font-bold text-neutral-400 py-4 text-center">Nessuna opzione.</p>
                  ) : (
                    currentTiers.tier3.map(ex => (
                      <button key={ex.id} onClick={() => handleSelectAlternative(ex)} className="w-full text-left p-3.5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/60 dark:border-neutral-700 shadow-sm flex items-center justify-between">
                        <div>
                          <span className="text-sm font-bold block text-neutral-900 dark:text-white">{ex.name}</span>
                          <span className="text-[10px] font-bold text-neutral-400 mt-0.5">{ex.equipment}</span>
                        </div>
                        <Plus size={18} className="text-[#15a34a]" />
                      </button>
                    ))
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};
