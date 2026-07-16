import React, { useState, useEffect } from 'react';
import { Button, Stepper, Card } from '../components/UI';
import { X } from 'lucide-react';

const EXERCISE_CATALOG = [
  { id: 'e1', name: 'Chest Press', muscle: 'Petto', equipment: 'Macchina' },
  { id: 'e2', name: 'Panca Piana', muscle: 'Petto', equipment: 'Bilanciere' },
  { id: 'e3', name: 'Spinte Manubri piana', muscle: 'Petto', equipment: 'Manubri' },
  { id: 'e4', name: 'Croci Cavi Alti', muscle: 'Petto', equipment: 'Cavi' },
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
  const [currentWeight, setCurrentWeight] = useState(0);
  const [currentReps, setCurrentReps] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [restTime, setRestTime] = useState(90);
  const [isRestActive, setIsRestActive] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const currentExercise = localRoutine[exerciseIndex];
  const exerciseRest = currentExercise?.rest ? Number(currentExercise.rest) : 90;

  useEffect(() => {
    if (schedaAttiva?.routine?.[activeDay]) {
      setLocalRoutine(JSON.parse(JSON.stringify(schedaAttiva.routine[activeDay])));
    } else {
      setLocalRoutine([]);
    }
    setExerciseIndex(0);
  }, [schedaAttiva, activeDay]);

  useEffect(() => {
    if (currentExercise) {
      setCurrentWeight(Number(currentExercise.weight) || 0);
      setCurrentReps(Number(currentExercise.reps) || 0);
      setCurrentSet(1);
      setRestTime(exerciseRest);
    }
  }, [currentExercise, exerciseRest]);

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

  const handleRegisterSet = () => {
    if (isRestActive) {
      setIsRestActive(false);
      setRestTime(exerciseRest);
    }
    if (currentSet < (Number(currentExercise.sets) || 1)) {
      setCurrentSet(prev => prev + 1);
      setRestTime(exerciseRest);
      setIsRestActive(true);
    } else if (exerciseIndex < localRoutine.length - 1) {
      setExerciseIndex(prev => prev + 1);
      setIsRestActive(false);
    } else {
      onWorkoutComplete({ id: Date.now(), date: new Date().toISOString(), schedaName: schedaAttiva.name, dayName: activeDay, tonnage: 0 });
    }
  };

  return (
    <div className="max-w-[420px] mx-auto min-h-screen bg-surface text-text-primary p-4 pb-32">
      <div className="flex gap-2 overflow-x-auto mb-6">
        {schemaDays.map(day => (
          <button key={day} onClick={() => setActiveDay(day)} className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase ${activeDay === day ? 'bg-primary text-black' : 'bg-surface-secondary text-text-secondary'}`}>
            {day}
          </button>
        ))}
      </div>

      {currentExercise ? (
        <div className="space-y-6">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-black">{currentExercise.name}</h2>
              <button onClick={() => setIsBottomSheetOpen(true)} className="text-primary text-[10px] font-black uppercase">Sostituisci</button>
            </div>
            <div className="flex gap-2">
              {Array.from({ length: Number(currentExercise.sets) }).map((_, i) => (
                <div key={i} className={`h-2 flex-1 rounded-full ${i < currentSet - 1 ? 'bg-primary' : i === currentSet - 1 ? 'bg-primary animate-pulse' : 'bg-surface-tertiary'}`} />
              ))}
            </div>
          </Card>

          <button onClick={() => setIsRestActive(!isRestActive)} className="w-full py-8 bg-surface-secondary rounded-3xl border border-surface-tertiary text-center">
            <span className="text-5xl font-mono font-black">{isRestActive ? `${Math.floor(restTime / 60)}:${String(restTime % 60).padStart(2, '0')}` : '--:--'}</span>
            <p className="text-[10px] font-black uppercase mt-2 tracking-widest">{isRestActive ? 'In Recupero' : 'Recupero'}</p>
          </button>

          <div className="grid grid-cols-4 gap-2">
            {[-30, -15, 15, 30].map(amt => (
              <button key={amt} onClick={() => setRestTime(p => Math.max(0, p + amt))} className="bg-surface-secondary py-3 rounded-xl text-xs font-black text-text-secondary border border-surface-tertiary">
                {amt > 0 ? '+' : ''}{amt}s
              </button>
            ))}
          </div>

          <Card className="space-y-4">
            <Stepper label="Carico (kg)" value={currentWeight} onChange={setCurrentWeight} step={2.5} unit="kg" />
            <Stepper label="Ripetizioni" value={currentReps} onChange={setCurrentReps} step={1} unit="rip" />
          </Card>

          <Button size="large" fullWidth onClick={handleRegisterSet} className="text-black bg-primary">
            {isRestActive ? "SALTA & AVANTI" : `REGISTRA SET #${currentSet}`}
          </Button>
        </div>
      ) : <div className="text-center mt-20 text-text-secondary">Nessun esercizio.</div>}

      {/* MODALE SOSTITUISCI */}
      {isBottomSheetOpen && (
        <div className="fixed inset-0 bg-surface z-50 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black">Sostituisci Esercizio</h2>
            <button onClick={() => setIsBottomSheetOpen(false)}><X /></button>
          </div>
          {['Prima Scelta', 'Seconda Scelta', 'Terza Scelta'].map((label, idx) => (
            <div key={label} className="mb-6">
              <h4 className="text-[10px] font-black text-text-secondary uppercase mb-2">{label}</h4>
              <button onClick={() => { /* Logica sostituzione */ setIsBottomSheetOpen(false); }} className="w-full text-left p-4 bg-surface-secondary rounded-2xl font-bold border border-surface-tertiary">
                Esercizio Alternativo {idx + 1}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
