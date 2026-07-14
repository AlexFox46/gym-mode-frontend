import React, { useState, useEffect } from 'react';
import { Button, Stepper, Card } from '../components/UI';
import { CheckCircle2, Dumbbell } from 'lucide-react';

export const AllenatiView = ({ settings, schedaAttiva }) => {
  const [activeDay, setActiveDay] = useState('G1');
  
  const schemaDays = schedaAttiva 
    ? Array.from({ length: schedaAttiva.daysCount }, (_, i) => `G${i + 1}`) 
    : [];

  // Il motore dati reale: estrae l'array di esercizi del giorno corrente
  const routineDelGiorno = schedaAttiva?.routine?.[activeDay] || [];
  
  // Traccia quale esercizio stiamo eseguendo nell'array
  const [exerciseIndex, setExerciseIndex] = useState(0);
  
  const currentExercise = routineDelGiorno[exerciseIndex]; // Esercizio reale
  
  const [currentWeight, setCurrentWeight] = useState(0);
  const [currentReps, setCurrentReps] = useState(0);

  const [globalTimer, setGlobalTimer] = useState(0);
  const [timerStatus, setTimerStatus] = useState('idle');

  const [restTime, setRestTime] = useState(90);
  const [isRestActive, setIsRestActive] = useState(false);

  const [currentSet, setCurrentSet] = useState(1);
  const [completedSets, setCompletedSets] = useState([]);

  // Reset dinamico quando cambi giorno o scheda
  useEffect(() => {
    setActiveDay('G1');
    setExerciseIndex(0);
  }, [schedaAttiva]);

  useEffect(() => {
    setExerciseIndex(0);
  }, [activeDay]);

  // Sincronizza i dati UI con l'esercizio corrente della scheda
  useEffect(() => {
    if (currentExercise) {
      setCurrentWeight(currentExercise.weight);
      setCurrentReps(currentExercise.reps);
      setCurrentSet(1);
      setCompletedSets(Array(currentExercise.sets).fill(false));
    }
  }, [currentExercise]);

  useEffect(() => {
    let interval = null;
    if (timerStatus === 'running') {
      interval = setInterval(() => setGlobalTimer((prev) => prev + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerStatus]);

  useEffect(() => {
    let restInterval = null;
    if (isRestActive && restTime > 0) {
      restInterval = setInterval(() => setRestTime((prev) => prev - 1), 1000);
    } else if (restTime <= 0 && isRestActive) {
      setIsRestActive(false);
      setRestTime(90);
      if (settings?.prep_sound && window.navigator.vibrate) window.navigator.vibrate([300, 100, 300]);
    }
    return () => clearInterval(restInterval);
  }, [isRestActive, restTime, settings?.prep_sound]);

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

  const handleRegisterSet = () => {
    const updated = [...completedSets];
    updated[currentSet - 1] = true;
    setCompletedSets(updated);

    if (currentSet < currentExercise.sets) {
      setCurrentSet((prev) => prev + 1);
      setRestTime(90);
      setIsRestActive(true);
    } else {
      // Esercizio finito, passa al prossimo nell'array
      if (exerciseIndex < routineDelGiorno.length - 1) {
        setExerciseIndex(prev => prev + 1);
        setIsRestActive(false);
        setRestTime(90);
      } else {
        // Giorno completato!
        alert("Sessione completata! Tutto registrato.");
        setIsRestActive(false);
        setTimerStatus('idle');
        // Qui in futuro faremo push su App.js storicoAllenamenti
      }
    }
  };

  if (!schedaAttiva) {
    return (
      <div className="min-h-screen w-full bg-[#f0f4f8] dark:bg-neutral-950 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-black text-neutral-900 tracking-tight mb-2">Pronto per iniziare?</h2>
        <p className="text-sm text-neutral-500 font-semibold max-w-[280px]">Non hai nessuna scheda attiva. Vai nella sezione <b className="text-[#15a34a]">Schede</b> per crearne una.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#f0f4f8] dark:bg-neutral-950 p-0 font-sans flex flex-col select-none overflow-x-hidden">
      
      {/* HEADER TIMER */}
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
        {/* NAVIGATORE GIORNI */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {schemaDays.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                activeDay === day ? 'bg-[#15a34a] text-white shadow-sm' : 'bg-neutral-200/50 text-neutral-500'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* CONTENUTO DINAMICO */}
        {!currentExercise ? (
           <div className="text-center py-12 px-4 border-2 border-dashed border-neutral-200 rounded-3xl bg-white mt-4">
             <CheckCircle2 size={48} className="mx-auto text-emerald-400 mb-3" />
             <h3 className="text-lg font-black text-neutral-900">Sessione Libera</h3>
             <p className="text-xs text-neutral-500 mt-1 font-semibold">Non ci sono (altri) esercizi in programma in {activeDay}.</p>
           </div>
        ) : (
          <>
            <Card className="p-5 shadow-sm border-none ring-1 ring-neutral-200/50">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-black text-neutral-900 tracking-tight">{currentExercise.name}</h2>
                  <p className="text-xs text-neutral-500 mt-1 font-semibold">Target: {currentExercise.sets} set × {currentExercise.reps} rip @ {currentExercise.weight}kg</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block">Avanzamento</span>
                  <span className="text-sm font-black text-[#15a34a]">{exerciseIndex + 1} / {routineDelGiorno.length}</span>
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-xs font-black text-[#15a34a] uppercase tracking-wider">Set {currentSet} di {currentExercise.sets}</span>
                <div className="flex items-center gap-1.5">
                  {completedSets.map((isDone, idx) => (
                    <div key={idx} className={`w-3 h-3 rounded-full transition-colors ${isDone ? 'bg-[#15a34a]' : currentSet === idx + 1 ? 'bg-neutral-800 animate-pulse ring-2 ring-neutral-200' : 'bg-neutral-200'}`} />
                  ))}
                </div>
              </div>
            </Card>

            <div className="relative flex flex-col items-center">
              <button onClick={() => setIsRestActive(!isRestActive)} className={`w-full h-40 rounded-3xl flex flex-col items-center justify-center p-6 shadow-sm border transition-all duration-300 active:scale-[0.99] ${isRestActive ? 'bg-[#15a34a] border-[#13a851] text-white animate-pulse' : 'bg-[#15a34a] border-[#13a851] text-white/95'}`}>
                <span className="font-mono text-5xl font-black tracking-widest leading-none">{isRestActive ? formatTime(restTime) : '-- : --'}</span>
                <p className="text-xs font-bold uppercase tracking-wider mt-4 text-center">{isRestActive ? 'Recupero in corso' : 'Avvia timer recupero'}</p>
              </button>
              <div className="flex items-center justify-center gap-2 mt-3 w-full px-2">
                {[-30, -15, 15, 30].map((sec) => (
                  <button key={sec} onClick={(e) => modifyRestTime(e, sec)} className="flex-1 py-2 border border-neutral-200 bg-white rounded-xl text-[11px] font-mono font-bold text-[#15a34a] active:scale-95 shadow-sm">
                    {sec > 0 ? `+${sec}s` : `${sec}s`}
                  </button>
                ))}
              </div>
            </div>

            <Card className="shadow-sm p-4 space-y-1 border-none ring-1 ring-neutral-200/50">
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
    </div>
  );
};
