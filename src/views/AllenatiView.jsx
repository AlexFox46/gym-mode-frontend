import React, { useState, useEffect } from 'react';
import { Card } from '../components/UI';

export const AllenatiView = ({ settings, activeSessionDuration }) => {
  // --- STATI PRINCIPALI ---
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [globalTimer, setGlobalTimer] = useState(0);

  // Stato del recupero (Rest)
  const [restTime, setRestTime] = useState(0);
  const [isRestActive, setIsRestActive] = useState(false);

  // Dati dell'esercizio attivo (Mock per la struttura UI)
  const [currentWeight, setCurrentWeight] = useState(16);
  const [currentReps, setCurrentReps] = useState(10);
  const [currentSet, setCurrentSet] = useState(1);

  // --- 1. LOGICA TIMER GLOBALE (Fix Blocco) ---
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

  // --- 2. LOGICA TIMER DI RECUPERO ---
  useEffect(() => {
    let restInterval = null;
    if (isRestActive && restTime > 0) {
      restInterval = setInterval(() => {
        setRestTime((prev) => prev - 1);
      }, 1000);
    } else if (restTime === 0 && isRestActive) {
      setIsRestActive(false);
      if (settings.prep_sound && window.navigator.vibrate) {
        window.navigator.vibrate([200, 100, 200]);
      }
    }
    return () => clearInterval(restInterval);
  }, [isRestActive, restTime, settings.prep_sound]);

  // FORMATTER TEMPO (mm:ss)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // --- 3. FIX DOPPIO INPUT (Prevent Mobile Ghost Clicks) ---
  const handleAction = (e, callback) => {
    e.preventDefault();
    e.stopPropagation(); // Blocca la propagazione e l'effetto ghost-click del touch mobile
    callback();
  };

  const step = settings.step_increment || 1;

  return (
    <div className="h-[calc(100vh-4rem)] w-full flex flex-col justify-between bg-neutral-100/60 dark:bg-neutral-950 p-3 select-none overflow-hidden font-sans">
      
      {/* ================= HEADER: TIMER GLOBALE ================= */}
      <div className="flex items-center justify-between bg-white dark:bg-neutral-900 rounded-2xl p-3 shadow-sm border border-neutral-200/50 dark:border-neutral-800">
        <div>
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Sessione Attiva</span>
          <span className="font-mono text-xl font-black text-neutral-900 dark:text-white tracking-tight">
            {formatTime(globalTimer)}
          </span>
        </div>
        
        <button
          onTouchStart={(e) => handleAction(e, () => setIsTimerRunning(!isTimerRunning))}
          onClick={(e) => handleAction(e, () => setIsTimerRunning(!isTimerRunning))}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all active:scale-95 ${
            isTimerRunning 
              ? 'bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400' 
              : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400'
          }`}
        >
          {isTimerRunning ? '⏸ Pausa' : '▶ Avvia'}
        </button>
      </div>

      {/* ================= BENTO CARD: ESERCIZIO ATTIVO ================= */}
      <div className="flex-1 my-3 bg-white dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800 rounded-3xl p-4 shadow-sm flex flex-col justify-between overflow-hidden">
        
        {/* Info Esercizio */}
        <div className="flex justify-between items-start">
          <div>
            <span className="inline-block bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-1">
              Petto / Spalle
            </span>
            <h1 className="text-xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight">
              Spinte su Piana con Manubri
            </h1>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Set Corrente</span>
            <span className="text-2xl font-black text-success tracking-tighter font-mono">#{currentSet}</span>
          </div>
        </div>

        {/* Visualizzazione Timer di Recupero (Se Attivo) */}
        {isRestActive && (
          <div className="my-2 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/40 rounded-2xl p-3 flex items-center justify-between animate-pulse">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">⏱ Tempo di recupero:</span>
            <span className="font-mono text-xl font-black text-amber-600 dark:text-amber-400">{formatTime(restTime)}</span>
          </div>
        )}

        {/* CONTROLLI BI-COLONNA (Carico e Reps) */}
        <div className="grid grid-cols-2 gap-3 my-auto">
          
          {/* Box Selettore Peso */}
          <div className="bg-neutral-50 dark:bg-neutral-950/50 border border-neutral-200/40 dark:border-neutral-800/60 rounded-2xl p-2.5 flex flex-col items-center justify-between shadow-sm">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Carico (kg)</span>
            <span className="text-3xl font-black text-neutral-900 dark:text-white font-mono my-2 tracking-tighter">
              {currentWeight}
            </span>
            <div className="flex gap-2 w-full">
              <button
                onTouchStart={(e) => handleAction(e, () => setCurrentWeight(prev => Math.max(0, prev - step)))}
                onClick={(e) => handleAction(e, () => setCurrentWeight(prev => Math.max(0, prev - step)))}
                className="flex-1 h-9 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl font-mono text-base font-bold text-neutral-700 dark:text-white active:bg-neutral-100"
              >
                -{step}
              </button>
              <button
                onTouchStart={(e) => handleAction(e, () => setCurrentWeight(prev => prev + step))}
                onClick={(e) => handleAction(e, () => setCurrentWeight(prev => prev + step))}
                className="flex-1 h-9 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl font-mono text-base font-bold text-neutral-700 dark:text-white active:bg-neutral-100"
              >
                +{step}
              </button>
            </div>
          </div>

          {/* Box Selettore Ripetizioni */}
          <div className="bg-neutral-50 dark:bg-neutral-950/50 border border-neutral-200/40 dark:border-neutral-800/60 rounded-2xl p-2.5 flex flex-col items-center justify-between shadow-sm">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Ripetizioni</span>
            <span className="text-3xl font-black text-neutral-900 dark:text-white font-mono my-2 tracking-tighter">
              {currentReps}
            </span>
            <div className="flex gap-2 w-full">
              <button
                onTouchStart={(e) => handleAction(e, () => setCurrentReps(prev => Math.max(0, prev - 1)))}
                onClick={(e) => handleAction(e, () => setCurrentReps(prev => Math.max(0, prev - 1)))}
                className="flex-1 h-9 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl font-mono text-base font-bold text-neutral-700 dark:text-white active:bg-neutral-100"
              >
                -1
              </button>
              <button
                onTouchStart={(e) => handleAction(e, () => setCurrentReps(prev => prev + 1))}
                onClick={(e) => handleAction(e, () => setCurrentReps(prev => prev + 1))}
                className="flex-1 h-9 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl font-mono text-base font-bold text-neutral-700 dark:text-white active:bg-neutral-100"
              >
                +1
              </button>
            </div>
          </div>

        </div>

        {/* Mini Storico Log Veloci dell'esercizio */}
        <div className="text-[11px] text-neutral-400 font-medium font-mono flex gap-3 justify-center border-t border-neutral-100 dark:border-neutral-800/50 pt-2">
          <span>Ultimo set: <b className="text-neutral-600 dark:text-neutral-300">16kg x 10</b></span>
          <span>•</span>
          <span>Target: <b className="text-neutral-600 dark:text-neutral-300">4 set x 10-12 reps</b></span>
        </div>

      </div>

      {/* ================= CONTROLLI BASSI: AZIONE & RECUPERO ================= */}
      <div className="space-y-2">
        
        {/* TASTO RECUPERO: Ispirato al pulsante Pesca ad alta gerarchia del riferimento */}
        <button
          onTouchStart={(e) => handleAction(e, () => {
            setRestTime(90); // Imposta 1 minuto e mezzo di recupero standard
            setIsRestActive(true);
          })}
          onClick={(e) => handleAction(e, () => {
            setRestTime(90);
            setIsRestActive(true);
          })}
          className="w-full h-12 bg-[#FFB399] dark:bg-[#E68A6C] text-neutral-950 font-bold rounded-full text-xs uppercase tracking-widest transition-all active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 border border-[#FF9977]"
        >
          ⏱️ Avvia Recupero (1:30)
        </button>

        {/* TASTO CONFERMA SET (LOG) */}
        <button
          onTouchStart={(e) => handleAction(e, () => {
            alert(`Set ${currentSet} salvato: ${currentWeight}kg x ${currentReps}reps`);
            setCurrentSet(prev => prev + 1);
          })}
          onClick={(e) => handleAction(e, () => {
            alert(`Set ${currentSet} salvato: ${currentWeight}kg x ${currentReps}reps`);
            setCurrentSet(prev => prev + 1);
          })}
          className="w-full h-12 bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-black rounded-full text-xs uppercase tracking-widest transition-all active:scale-[0.98] shadow-md"
        >
          ✅ REGISTRA SET #{currentSet}
        </button>

      </div>

    </div>
  );
};
