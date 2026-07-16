import React, { useState, useEffect } from 'react';
import { Button, Stepper, Card } from '../components/UI';
import { CheckCircle2, Plus, X, ArrowRight, ArrowLeft } from 'lucide-react';

// Il catalogo deve essere disponibile. In un progetto reale, lo importeresti da un file esterno.
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
    if (schedaAttiva?.routine?.[activeDay]) {
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
    if (timerStatus === 'running') interval = setInterval(() => setGlobalTimer(prev => prev + 1), 1000);
    else clearInterval(interval);
    return () => clearInterval(interval);
  }, [timerStatus]);

  useEffect(() => {
    let restInterval = null;
    if (isRestActive && restTime > 0) restInterval = setInterval(() => setRestTime(prev => prev - 1), 1000);
    else if (restTime <= 0 && isRestActive) {
      setIsRestActive(false);
      setRestTime(exerciseRest);
      if (settings?.prep_sound && window.navigator.vibrate) window.navigator.vibrate([300, 100, 300]);
    }
    return () => clearInterval(restInterval);
  }, [isRestActive, restTime, settings?.prep_sound, exerciseRest]);

  const handleRegisterSet = () => {
    if (isRestActive) {
      setIsRestActive(false);
      setRestTime(exerciseRest);
    }

    const targetSets = Number(currentExercise.sets) || 1;
    if (currentSet < targetSets) {
      setCurrentSet(prev => prev + 1);
      setRestTime(exerciseRest);
      setIsRestActive(true);
    } else if (exerciseIndex < localRoutine.length - 1) {
      setExerciseIndex(prev => prev + 1);
      setIsRestActive(false);
    } else {
      const totalTonnage = localRoutine.reduce((acc, ex) => acc + (ex.weight * ex.reps * ex.sets), 0);
      onWorkoutComplete({ id: Date.now(), date: new Date().toISOString(), schedaName: schedaAttiva.name, dayName: activeDay, tonnage: (totalTonnage / 1000).toFixed(2) });
    }
  };

  const getTiers = () => {
    if (!currentExercise) return { tier1: [], tier2: [], tier3: [] };
    const alts = EXERCISE_CATALOG.filter(ex => ex.muscle === currentExercise.muscle && ex.name !== currentExercise.name);
    return {
      tier1: alts.filter(ex => ex.equipment === currentExercise.equipment),
      tier2: alts.filter(ex => ['Manubri', 'Bilanciere', 'Corpo Libero'].includes(ex.equipment)),
      tier3: alts.filter(ex => ['Macchina', 'Cavi'].includes(ex.equipment))
    };
  };

  const currentTiers = getTiers();

  return (
    <div className="min-h-screen w-full bg-[#f0f4f8] dark:bg-neutral-950 p-0 font-sans flex flex-col pb-28">
      {/* HEADER */}
      <div className="bg-[#15a34a] text-white px-4 py-3.5 flex items-center justify-between shadow-md">
        <button onClick={() => setTimerStatus(timerStatus === 'running' ? 'paused' : 'running')} className="text-xs font-bold bg-white/10 px-3 py-1 rounded-lg">
          {timerStatus === 'running' ? '⏸ Pausa' : '▶ Avvia'}
        </button>
        <div className="font-mono text-sm font-black">⏱ {Math.floor(globalTimer / 60)}:{String(globalTimer % 60).padStart(2, '0')}</div>
      </div>

      <div className="p-4 flex-1 space-y-4">
        {/* GIORNI */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {schemaDays.map(day => (
            <button key={day} onClick={() => setActiveDay(day)} className={`px-4 py-2 rounded-lg text-xs font-black ${activeDay === day ? 'bg-[#15a34a] text-white' : 'bg-neutral-200'}`}>{day}</button>
          ))}
        </div>

        {currentExercise && (
          <>
            <Card className="p-5 space-y-4">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-xl font-black">{currentExercise.name}</h2>
                  <p className="text-xs font-bold text-neutral-500">{currentExercise.equipment} • {currentExercise.sets} set x {currentExercise.reps} rip</p>
                </div>
                <button onClick={() => setIsBottomSheetOpen(true)} className="text-[10px] font-black uppercase text-[#15a34a]">🔄 Sostituisci</button>
              </div>
              <div className="flex gap-2 justify-center">
                {Array.from({ length: Number(currentExercise.sets) }).map((_, i) => (
                  <div key={i} className={`w-4 h-4 rounded-full ${i < currentSet - 1 ? 'bg-[#15a34a]' : i === currentSet - 1 ? 'bg-neutral-800 animate-pulse' : 'bg-neutral-200'}`} />
                ))}
              </div>
            </Card>

            <button onClick={() => setIsRestActive(!isRestActive)} className={`w-full h-32 rounded-3xl flex flex-col items-center justify-center ${isRestActive ? 'bg-[#15a34a] text-white' : 'bg-neutral-800 text-white'}`}>
              <span className="text-4xl font-black">{isRestActive ? `${Math.floor(restTime / 60)}:${String(restTime % 60).padStart(2, '0')}` : '--:--'}</span>
              <span className="text-[10px] font-bold">{isRestActive ? 'IN RECUPERO' : 'RECUPERO'}</span>
            </button>

            <Card className="p-4 space-y-2">
              <Stepper label="Carico" value={currentWeight} onChange={setCurrentWeight} step={settings?.step_increment || 1} unit="kg" />
              <Stepper label="Reps" value={currentReps} onChange={setCurrentReps} step={1} unit="rip" />
            </Card>

            <Button size="large" fullWidth onClick={handleRegisterSet} className="bg-[#15a34a] text-white font-black h-14 rounded-2xl">
              {isRestActive ? "SALTA RECUPERO & PROSSIMO" : `REGISTRA SET #${currentSet}`}
            </Button>
          </>
        )}
      </div>

      {/* MODALE SLIDESHOW */}
      {isBottomSheetOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-6 h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-xl">Sostituisci Esercizio</h3>
              <button onClick={() => setIsBottomSheetOpen(false)}><X /></button>
            </div>
            
            <div className="flex overflow-x-auto snap-x gap-4 pb-6">
              {[currentTiers.tier1, currentTiers.tier2, currentTiers.tier3].map((tier, idx) => (
                <div key={idx} className="min-w-[280px] snap-center bg-neutral-100 p-4 rounded-2xl">
                  <h4 className="font-black mb-3">Tier {idx + 1}</h4>
                  {tier.map(ex => (
                    <button key={ex.id} onClick={() => { 
                      const newRoutine = [...localRoutine];
                      newRoutine[exerciseIndex] = { ...currentExercise, name: ex.name, equipment: ex.equipment };
                      setLocalRoutine(newRoutine);
                      setIsBottomSheetOpen(false);
                    }} className="block w-full text-left p-3 bg-white mb-2 rounded-lg font-bold text-sm">
                      {ex.name}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
