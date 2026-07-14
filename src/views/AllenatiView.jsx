import React, { useState, useEffect } from 'react';
import { Card } from '../components/UI';

export const AllenatiView = ({ settings, activeSessionDuration }) => {
  // --- STATI (Identici a prima, funzionanti) ---
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [globalTimer, setGlobalTimer] = useState(0);
  const [restTime, setRestTime] = useState(0);
  const [isRestActive, setIsRestActive] = useState(false);

  const [currentWeight, setCurrentWeight] = useState(16);
  const [currentReps, setCurrentReps] = useState(10);
  const [currentSet, setCurrentSet] = useState(1);

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
        window.navigator.vibrate([200, 100, 200]);
      }
    }
    return () => clearInterval(restInterval);
  }, [isRestActive, restTime, settings.prep_sound]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // --- FIX MOBILE (Previene il doppio scatto di 2 in 2) ---
  const handleAction = (e, callback) => {
    e.preventDefault();
    e.stopPropagation();
    callback();
  };

  const step = settings.step_increment || 1;

  return (
    <div className="min-h-screen w-full bg-neutral-100/60 dark:bg-neutral-950 p-4 pb-28 font-sans space-y-4">
      
      {/* 1. TIMER SESSIONE (Lineare, pulito, alto contrasto) */}
      <div className="flex items-center justify-between bg-white dark:bg-neutral-900 rounded-2xl p-4 shadow-sm border border-neutral-200/50 dark:border-neutral-800">
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

      {/* 2. CARD ESERCIZIO (Struttura classica lineare, senza griglie bento asimmetriche) */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800 rounded-2xl p-5 shadow-sm space-y-4">
        
        {/* Intestazione semplice */}
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest block mb-1">
              Esercizio Attivo
            </span>
            <h1 className="text-xl font-bold text-neutral-900 dark:text-white leading-tight">
              Spinte su Piana con Manubri
            </h1>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Set</span>
            <span className="text-xl font-mono font-black text-neutral-900 dark:text-white">#{currentSet}</span>
          </div>
        </div>

        {/* Barra Recupero Lineare (Compare solo se attiva) */}
        {isRestActive && (
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200/30 rounded-xl p-3 flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">⏱️ Recupero in corso:</span>
            <span className="font-mono text-lg font-black text-amber-600 dark:text-amber-400">{formatTime(restTime)}</span>
          </div>
        )}

        {/* SELETTORE PESO (Riga singola, classico) */}
        <div className="flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800/50 pt-4">
          <span className="text-sm font-bold text-neutral-500 dark:text-neutral-400">Carico</span>
          <div className="flex items-center gap-3">
            <button
              onTouchStart={(e) => handleAction(e, () => setCurrentWeight(prev => Math.max(0, prev - step)))}
              onClick={(e) => handleAction(e, () => setCurrentWeight(prev => Math.max(0, prev - step)))}
              className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-xl font-mono font-bold text-neutral-800 dark:text-white flex items-center justify-center text-lg active:scale-95"
            >
              -
            </button>
            <span className="font-mono text-xl font-black text-neutral-900 dark:text-white w-16 text-center">
              {currentWeight} <span className="text-xs text-neutral-400 font-sans">kg</span>
            </span>
            <button
              onTouchStart={(e) => handleAction(e, () => setCurrentWeight(prev => prev + step))}
              onClick={(e) => handleAction(e, () => setCurrentWeight(prev => prev + step))}
              className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-xl font-mono font-bold text-neutral-800 dark:text-white flex items-center justify-center text-lg active:scale-95"
            >
              +
            </button>
          </div>
        </div>

        {/* SELETTORE RIPETIZIONI (Riga singola, classico) */}
        <div className="flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800/50 pt-4">
          <span className="text-sm font-bold text-neutral-500 dark:text-neutral-400">Ripetizioni</span>
          <div className="flex items-center gap-3">
            <button
              onTouchStart={(e) => handleAction(e, () => setCurrentReps(prev => Math.max(0, prev - 1)))}
              onClick={(e) => handleAction(e, () => setCurrentReps(prev => Math.max(0, prev - 1)))}
              className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-xl font-mono font-bold text-neutral-800 dark:text-white flex items-center justify-center text-lg active:scale-95"
            >
              -
            </button>
            <span className="font-mono text-xl font-black text-neutral-900 dark:text-white w-16 text-center">
              {currentReps}
            </span>
            <button
              onTouchStart={(e) => handleAction(e, () => setCurrentReps(prev => prev + 1))}
              onClick={(e) => handleAction(e, () => setCurrentReps(prev => prev + 1))}
              className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-xl font-mono font-bold text-neutral-800 dark:text-white flex items-center justify-center text-lg active:scale-95"
            >
              +
            </button>
          </div>
        </div>

      </div>

      {/* 3. PULSANTI D'AZIONE (Fissi in fondo con gerarchia chiara e colori dei tuoi screenshot) */}
      <div className="space-y-3 pt-2">
        
        {/* Pulsante Recupero: Stile pesca ad alto contrasto dal tuo riferimento */}
        <button
          onTouchStart={(e) => handleAction(e, () => {
            setRestTime(90);
            setIsRestActive(true);
          })}
          onClick={(e) => handleAction(e, () => {
            setRestTime(90);
            setIsRestActive(true);
          })}
          className="w-full h-12 bg-[#FFB399] dark:bg-[#E68A6C] text-neutral-950 font-bold rounded-xl text-xs uppercase tracking-widest border border-[#FF9977]/30 shadow-sm flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          ⏱️ Avvia Recupero (1:30)
        </button>

        {/* Pulsante Registra Set: Solido, scuro, primario */}
        <button
          onTouchStart={(e) => handleAction(e, () => {
            alert(`Set ${currentSet} registrato: ${currentWeight}kg x ${currentReps} reps`);
            setCurrentSet(prev => prev + 1);
          })}
          onClick={(e) => handleAction(e, () => {
            alert(`Set ${currentSet} registrato: ${currentWeight}kg x ${currentReps} reps`);
            setCurrentSet(prev => prev + 1);
          })}
          className="w-full h-12 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-bold rounded-xl text-xs uppercase tracking-widest shadow-md active:scale-[0.98]"
        >
          ✅ Registra Set #{currentSet}
        </button>

      </div>

    </div>
  );
};
