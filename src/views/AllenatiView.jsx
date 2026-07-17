import React, { useState, useEffect } from 'react';
import { Button, Stepper, Card } from '../components/UI';
import { BookOpen } from 'lucide-react';

export const AllenatiView = ({ settings, schedaAttiva, onWorkoutComplete, onNavigateToSchede }) => {
  const [activeDay, setActiveDay] = useState('G1');
  const schemaDays = schedaAttiva ? Array.from({ length: schedaAttiva.daysCount }, (_, i) => `G${i + 1}`) : [];
  const [localRoutine, setLocalRoutine] = useState([]);
  const [exerciseIndex, setExerciseIndex] = useState(0);

  // Reset activeDay quando cambia schedaAttiva
  useEffect(() => {
    if (schedaAttiva) {
      setActiveDay('G1');
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

  const currentExercise = localRoutine[exerciseIndex];
  const [currentWeight, setCurrentWeight] = useState(0);
  const [currentReps, setCurrentReps] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const exerciseRest = currentExercise?.rest ? Number(currentExercise.rest) : 90;

  // Stato timer
  const [restTime, setRestTime] = useState(90);
  const [isRestActive, setIsRestActive] = useState(false);

  useEffect(() => {
    if (currentExercise) {
      setCurrentWeight(Number(currentExercise.weight) || 0);
      setCurrentReps(Number(currentExercise.reps) || 0);
      setCurrentSet(1);
      setRestTime(exerciseRest);
    }
  }, [currentExercise, exerciseRest]);

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

  // LOGICA REGISTRAZIONE SET
  const handleRegisterSet = () => {
    if (isRestActive) {
      setIsRestActive(false);
      setRestTime(exerciseRest);
      return;
    }

    const targetSets = Number(currentExercise.sets) || 1;
    
    if (currentSet < targetSets) {
      setCurrentSet(prev => prev + 1);
      setRestTime(exerciseRest);
      setIsRestActive(true);
    } else if (exerciseIndex < localRoutine.length - 1) {
      setExerciseIndex(prev => prev + 1);
      setCurrentSet(1);
      setIsRestActive(false);
    } else {
      onWorkoutComplete({ 
        id: Date.now(), 
        date: new Date().toISOString(), 
        schedaName: schedaAttiva.name, 
        dayName: activeDay, 
        tonnage: 0 
      });
    }
  };

  // Se non c'è scheda attiva
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

  // Se c'è scheda ma il giorno non ha esercizi
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

  return (
    <div className="max-w-[420px] mx-auto min-h-screen bg-surface text-text-primary p-4 pb-32">
      {/* Header Day Selector */}
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

      <div className="space-y-6">
        <Card>
          <h2 className="text-2xl font-black mb-1">{currentExercise.name}</h2>
          <p className="text-text-secondary text-xs font-bold uppercase tracking-widest">{currentExercise.sets} set • {currentExercise.reps} rip</p>
          
          {/* Visualizzatore Set */}
          <div className="flex gap-2 mt-6">
            {Array.from({ length: Number(currentExercise.sets) }).map((_, i) => (
              <div key={i} className={`h-2 flex-1 rounded-full ${i < currentSet - 1 ? 'bg-primary' : i === currentSet - 1 ? 'bg-primary animate-pulse' : 'bg-surface-tertiary'}`} />
            ))}
          </div>
        </Card>

        {/* Timer Card */}
        <button onClick={() => setIsRestActive(!isRestActive)} className={`w-full py-8 rounded-3xl border transition-all ${isRestActive ? 'border-primary bg-primary/10' : 'border-surface-tertiary bg-surface-secondary'}`}>
          <span className="text-5xl font-mono font-black">{isRestActive ? `${Math.floor(restTime / 60)}:${String(restTime % 60).padStart(2, '0')}` : '--:--'}</span>
          <p className="text-[10px] font-black uppercase mt-2 tracking-widest">{isRestActive ? 'In Recupero' : 'Recupero'}</p>
        </button>

        <Card className="space-y-4">
          <Stepper label="Carico (kg)" value={currentWeight} onChange={setCurrentWeight} step={2.5} unit="kg" />
          <Stepper label="Ripetizioni" value={currentReps} onChange={setCurrentReps} step={1} unit="rip" />
        </Card>

        <Button size="large" fullWidth onClick={handleRegisterSet} className="text-black bg-primary">
          {isRestActive ? "SALTA & AVANTI" : `REGISTRA SET #${currentSet}`}
        </Button>
      </div>
    </div>
  );
};
