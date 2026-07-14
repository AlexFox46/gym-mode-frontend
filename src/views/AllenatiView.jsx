import React, { useState, useEffect } from 'react';
import { Card, Toggle } from '../components/UI';

export const AllenatiView = ({ settings, activeSessionDuration }) => {
  // --- STATI PRINCIPALI ---
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [globalTimer, setGlobalTimer] = useState(0);
  
  // Recupero (Rest)
  const [restTime, setRestTime] = useState(0);
  const [isRestActive, setIsRestActive] = useState(false);

  // Esercizio Attivo
  const [currentWeight, setCurrentWeight] = useState(16);
  const [currentReps, setCurrentReps] = useState(10);
  const [currentSet, setCurrentSet] = useState(1);
  const totalSets = 4; // Target fisso per la visualizzazione dei pallini

  // Switch di tipo esercizio/serie (Warmup vs Target)
  const [isWarmup, setIsWarmup] = useState(false);

  // Stato dei singoli set (Switch/Checkbox per ogni pallino)
  const [completedSets, setCompletedSets] = useState([false, false, false, false]);

  // --- TIMER GENERALE ---
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

  // --- TIMER RECUPERO ---
  useEffect(() => {
    let restInterval = null;
    if (isRestActive && restTime > 0) {
      restInterval = setInterval(() => {
        setRestTime((prev) => prev - 1);
      }, 1000);
    } else if (restTime === 0 && isRestActive) {
      setIsRestActive(false);
      if (settings.prep_sound && window.navigator.vibrate) {
        window.navigator.vibrate([300, 100, 300]);
      }
    }
    return () => clearInterval(restInterval);
  }, [isRestActive, restTime, settings.prep_sound]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // --- FIX MOBILE (Previene il doppio scatto) ---
  const handleAction = (e, callback) => {
    e.preventDefault();
    e.stopPropagation();
    callback();
  };

  const step = settings.step_increment || 1;

  // Gestione click sul singolo pallino dei progressi
  const toggleSetFromDot = (index) => {
    const updated = [...completedSets];
    updated[index] = !updated[index];
    setCompletedSets(updated);
    
    // Aggiorna automaticamente il set corrente basandosi sul primo non completato
    const nextSet = updated.findIndex(val => val === false);
    setCurrentSet(nextSet === -1 ? totalSets : nextSet + 1);
  };

  return (
    <div className="min-h-screen w-full bg-neutral-100/60 dark:bg-neutral-950 p-4 pb-28 font-sans space-y-4">
      
      {/* 1. HEADER & TIMER SESSIONE */}
      <div className="flex items-center justify-between bg-white dark:bg-neutral-900 rounded-2xl p-3.5 shadow-sm border border-neutral-200/50 dark:border-neutral-800">
        <div>
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Sessione Attiva</span>
          <span className="font-mono text-2xl font-black text-neutral-900 dark:text-white">
            {formatTime(globalTimer)}
          </span>
        </div>
        <button
          onTouchStart={(e) => handleAction(e, () => setIsTimerRunning(!isTimerRunning))}
          onClick={(e) => handleAction(e, () => setIsTimerRunning(!isTimerRunning))}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl ${
            isTimerRunning 
              ? 'bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400' 
              : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400'
          }`}
        >
          {isTimerRunning ? '⏸ Pausa' : '▶ Avvia'}
        </button>
      </div>

      {/* 2. CARD ESERCIZIO PRINCIPALE */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800 rounded-3xl p-5 shadow-sm space-y-5">
        
        {/* Info & Switch Tipo Serie */}
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest block mb-1">
              Petto / Spalle
            </span>
            <h1 className="text-xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight">
              Spinte su Piana con Manubri
            </h1>
          </div>
          
          {/* Switch negli esercizi: Selettore Warmup / Target */}
          <div className="flex flex-col items-end gap-1">
            <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Warmup</span>
            <Toggle 
              checked={isWarmup} 
              onChange={(val) => setIsWarmup(val)} 
            />
          </div>
        </div>

        {/* PROGRESSI CON I PALLINI E LE LINEETTE (Set Tracker) */}
        <div className="py-2 border-t border-b border-neutral-100 dark:border-neutral-800/50">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-3 text-center">
            Tracciamento Set ({completedSets.filter(Boolean).length}/{totalSets})
          </span>
          
          <div className="flex items-center justify-center gap-2">
            {completedSets.map((isDone, idx) => {
              const isActive = currentSet === idx + 1;
              return (
                <React.Fragment key={idx}>
                  {/* Pallino */}
                  <button
                    onTouchStart={(e) => handleAction(e, () => toggleSetFromDot(idx))}
                    onClick={(e) => handleAction(e, () => toggleSetFromDot(idx))}
                    className={`w-9 h-9 rounded-full font-mono text-xs font-bold transition-all flex items-center justify-center border-2 ${
                      isDone 
                        ? 'bg-success border-success text-white' 
                        : isActive
                          ? 'bg-white dark:bg-neutral-900 border-neutral-900 dark:border-white text-neutral-900 dark:text-white ring-4 ring-neutral-100 dark:ring-neutral-800'
                          : 'bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-400'
                    }`}
                  >
                    {isDone ? '✓' : idx + 1}
                  </button>
                  
                  {/* Lineetta di collegamento tra i pallini (esclusa l'ultima) */}
                  {idx < totalSets - 1 && (
                    <div className={`h-[3px] w-6 rounded-full transition-colors ${
                      completedSets[idx] && completedSets[idx + 1]
                        ? 'bg-success'
                        : completedSets[idx]
                          ? 'bg-neutral-400 dark:bg-neutral-600'
                          : 'bg-neutral-200 dark:bg-neutral-800'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* REGOLATORI CARICO & REPS (Lineari, stabili, facili) */}
        <div className="space-y-4">
          {/* Peso */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-neutral-500 dark:text-neutral-400">Carico</span>
            <div className="flex items-center gap-3">
              <button
                onTouchStart={(e) => handleAction(e, () => setCurrentWeight(prev => Math.max(0, prev - step)))}
                onClick={(e) => handleAction(e, () => setCurrentWeight(prev => Math.max(0, prev - step)))}
                className="w-11 h-11 bg-neutral-100 dark:bg-neutral-800 rounded-2xl font-mono font-bold text-neutral-800 dark:text-white flex items-center justify-center text-lg active:scale-90"
              >
                -
              </button>
              <span className="font-mono text-2xl font-black text-neutral-900 dark:text-white w-20 text-center">
                {currentWeight}<span className="text-xs font-normal text-neutral-400 ml-0.5">kg</span>
              </span>
              <button
                onTouchStart={(e) => handleAction(e, () => setCurrentWeight(prev => prev + step))}
                onClick={(e) => handleAction(e, () => setCurrentWeight(prev => prev + step))}
                className="w-11 h-11 bg-neutral-100 dark:bg-neutral-800 rounded-2xl font-mono font-bold text-neutral-800 dark:text-white flex items-center justify-center text-lg active:scale-90"
              >
                +
              </button>
            </div>
          </div>

          {/* Ripetizioni */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-neutral-500 dark:text-neutral-400">Ripetizioni</span>
            <div className="flex items-center gap-3">
              <button
                onTouchStart={(e) => handleAction(e, () => setCurrentReps(prev => Math.max(0, prev - 1)))}
                onClick={(e) => handleAction(e, () => setCurrentReps(prev => Math.max(0, prev - 1)))}
                className="w-11 h-11 bg-neutral-100 dark:bg-neutral-800 rounded-2xl font-mono font-bold text-neutral-800 dark:text-white flex items-center justify-center text-lg active:scale-90"
              >
                -
              </button>
              <span className="font-mono text-2xl font-black text-neutral-900 dark:text-white w-20 text-center">
                {currentReps}
              </span>
              <button
                onTouchStart={(e) => handleAction(e, () => setCurrentReps(prev => prev + 1))}
                onClick={(e) => handleAction(e, () => setCurrentReps(prev => prev + 1))}
                className="w-11 h-11 bg-neutral-100 dark:bg-neutral-800 rounded-2xl font-mono font-bold text-neutral-800 dark:text-white flex items-center justify-center text-lg active:scale-90"
              >
                +
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 3. CONTROLLI DI RECUPERO E SALVATAGGIO */}
      <div className="flex flex-col items-center gap-4 pt-2">
        
        {/* IL TASTONE GIGANTE DEL RECUPERO (Pulsante circolare tattile) */}
        <div className="relative flex items-center justify-center w-full py-2">
          <button
            onTouchStart={(e) => handleAction(e, () => {
              setRestTime(90);
              setIsRestActive(!isRestActive);
            })}
            onClick={(e) => handleAction(e, () => {
              setRestTime(90);
              setIsRestActive(!isRestActive);
            })}
            className={`w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-lg transition-all duration-300 active:scale-95 border-4 ${
              isRestActive
                ? 'bg-[#FFB399] dark:bg-[#E68A6C] border-[#FF9977] text-neutral-950 animate-pulse'
                : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white'
            }`}
          >
            {isRestActive ? (
              <>
                <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-800/70">Recupero</span>
                <span className="font-mono text-3xl font-black leading-none my-1">{formatTime(restTime)}</span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-800/70">Tocca x Stop</span>
              </>
            ) : (
              <>
                <span className="text-2xl mb-1">⏱️</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-center leading-tight">
                  Avvia<br />Recupero
                </span>
                <span className="text-[9px] font-mono font-bold text-neutral-400 dark:text-neutral-500 mt-1">1:30</span>
              </>
            )}
          </button>
        </div>

        {/* TASTO REGISTRA SET (Pill-button scuro primario) */}
        <button
          onTouchStart={(e) => handleAction(e, () => {
            // Segna come completato il set corrente nell'array
            const updated = [...completedSets];
            updated[currentSet - 1] = true;
            setCompletedSets(updated);

            alert(`Set ${currentSet} registrato: ${currentWeight}kg x ${currentReps} reps (${isWarmup ? 'Warmup' : 'Target'})`);
            
            // Incrementa il set attivo
            if (currentSet < totalSets) {
              setCurrentSet(prev => prev + 1);
            }
          })}
          onClick={(e) => handleAction(e, () => {
            const updated = [...completedSets];
            updated[currentSet - 1] = true;
            setCompletedSets(updated);

            alert(`Set ${currentSet} registrato: ${currentWeight}kg x ${currentReps} reps (${isWarmup ? 'Warmup' : 'Target'})`);
            
            if (currentSet < totalSets) {
              setCurrentSet(prev => prev + 1);
            }
          })}
          className="w-full h-13 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-black rounded-full text-xs uppercase tracking-widest shadow-md active:scale-[0.98]"
        >
          ✅ REGISTRA SET #{currentSet}
        </button>

      </div>

    </div>
  );
};
