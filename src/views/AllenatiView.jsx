import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Card, Button, Stepper } from '../components/UI';

export const AllenatiView = ({ settings, onWorkoutComplete, activeSessionDuration }) => {
  const [exercise, setExercise] = useState(null);
  const [currentSet, setCurrentSet] = useState(1);
  const [weight, setWeight] = useState(80);
  const [reps, setReps] = useState(8);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPrepTime, setIsPrepTime] = useState(false);
  const [showSwapModal, setShowSwapModal] = useState(false);

  useEffect(() => {
    async function fetchExercise() {
      const { data, error } = await supabase.from('exercises').select('*').limit(1).single();
      if (data && !error) {
        setExercise(data);
        setWeight(Number(data.target_weight) || 80);
        setReps(Number(data.target_reps) || 8);
      } else {
        setExercise({ id: 'ex-101', name: 'PANCA PIANA', equipment: 'Bilanciere', target_sets: 4, target_reps: 8, target_weight: 80, rest_time: 75 });
      }
    }
    fetchExercise();
  }, []);

  useEffect(() => {
    let interval;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          const nextTime = prev - 1;
          if (nextTime <= (settings.prep_time || 10) && nextTime > 0) setIsPrepTime(true);
          if (nextTime <= 0) { setIsTimerActive(false); setIsPrepTime(false); }
          return nextTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft, settings]);

  if (!exercise) return <div className="p-8 text-center text-neutral-500">Caricamento sessione attiva...</div>;

  return (
    <div className="flex flex-col h-full p-4 box-border">
      {/* Top Session Bar */}
      <div className="flex justify-between items-center p-3 bg-neutral-900 text-white rounded-lg mb-4 shadow-md">
        <Button size="small" variant="secondary" className="text-white bg-white/10 border-transparent">Riprendi</Button>
        <span className="font-mono text-sm">⏱️ Sessione: {Math.floor(activeSessionDuration / 60).toString().padStart(2, '0')}:{(activeSessionDuration % 60).toString().padStart(2, '0')}</span>
      </div>

      {/* Card Esercizio Corrente */}
      <Card>
        <div className="flex justify-between items-start w-full">
          <div className="flex-1 pr-3">
            <h2 className="text-h2 text-neutral-950 dark:text-white uppercase tracking-tight">{exercise.name}</h2>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              {exercise.equipment} · Target: {exercise.target_sets} set × {exercise.target_reps} rip
            </div>
          </div>
          <Button size="small" variant="secondary" onClick={() => setShowSwapModal(true)} className="text-xs h-8">
            Sostituisci ⇄
          </Button>
        </div>

        {/* Indicatori Serie */}
        <div className="flex gap-1.5 mt-4">
          {Array.from({ length: exercise.target_sets || 4 }).map((_, idx) => (
            <div key={idx} className={`h-1.5 flex-1 rounded-sm ${idx < currentSet ? 'bg-success' : 'bg-neutral-200 dark:bg-neutral-800'}`} />
          ))}
        </div>
        <span className="text-xs font-bold text-success block mt-2">Set {currentSet} di {exercise.target_sets || 4}</span>
      </Card>

      {/* Central Hero Timer (Recovery-First Accent) */}
      <div className="my-6 flex-1 flex flex-col justify-center">
        <div className={`p-8 rounded-xl text-center shadow-light-elevated transition-all duration-300 ${
          isTimerActive 
            ? isPrepTime ? 'bg-gradient-to-r from-info to-blue-600 animate-pulse' : 'bg-gradient-to-r from-success to-success-darker'
            : 'bg-neutral-100 dark:bg-neutral-900 border border-dashed border-neutral-300 dark:border-neutral-800 py-10'
        }`}>
          {isTimerActive ? (
            <div>
              <h1 className="text-h1 font-mono text-white select-none">
                {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
              </h1>
              <div className="flex justify-center gap-3 mt-4">
                <Button size="small" variant="secondary" className="bg-white/20 border-none text-white hover:bg-white/30" onClick={() => setTimeLeft(t => t + 30)}>+30s</Button>
                <Button size="small" variant="secondary" className="bg-white/20 border-none text-white hover:bg-white/30" onClick={() => setTimeLeft(0)}>Salta</Button>
              </div>
            </div>
          ) : (
            <div>
              <span className="text-h1 font-mono text-neutral-400 dark:text-neutral-600 block">——:——</span>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">Premi <strong>INIZIA RECUPERO</strong> per attivare il timer</p>
            </div>
          )}
        </div>
      </div>

      {/* Persistent Data Entry Area (One-Hand Target Zone) */}
      <div className="mt-auto bg-white dark:bg-neutral-900 rounded-xl p-4 border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <Stepper label="Carico (kg)" value={weight} onChange={setWeight} step={Number(settings.step_increment) || 1} unit="kg" />
        <Stepper label="Ripetizioni" value={reps} onChange={setReps} step={1} unit="rip" />
        
        <div className="mt-4 flex flex-col gap-2.5">
          {isTimerActive ? (
            <Button size="large" variant="primary" fullWidth onClick={() => { setCurrentSet(s => Math.min(exercise.target_sets, s + 1)); setIsTimerActive(false); }}>SALVA SERIE</Button>
          ) : (
            <Button size="large" variant="primary" fullWidth onClick={() => { setTimeLeft(exercise.rest_time || 75); setIsTimerActive(true); }}>INIZIA RECUPERO</Button>
          )}
          <Button size="medium" variant="secondary" fullWidth onClick={onWorkoutComplete}>TERMINA ALLENAMENTO</Button>
        </div>
      </div>

      {/* Bottom Sheet Modal: Variante Biomeccanica */}
      {showSwapModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end" onClick={() => setShowSwapModal(false)}>
          <div className="w-full max-w-[420px] mx-auto bg-white dark:bg-neutral-900 rounded-t-2xl p-5 box-border" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-neutral-300 dark:bg-neutral-700 rounded-full mx-auto mb-4" />
            <h3 className="text-h3 font-bold mb-4 text-neutral-900 dark:text-white">Alternative disponibili</h3>
            <div className="flex flex-col gap-2">
              <button type="button" className="w-full p-3.5 text-left border border-neutral-200 dark:border-neutral-800 rounded-lg bg-neutral-50 dark:bg-neutral-950 font-medium text-sm text-neutral-900 dark:text-white active:bg-neutral-100" onClick={() => { setExercise({...exercise, name: 'Panca Inclinata Manubri', equipment: 'Manubri'}); setShowSwapModal(false); }}>Panca Inclinata Manubri (Tier 1)</button>
              <button type="button" className="w-full p-3.5 text-left border border-neutral-200 dark:border-neutral-800 rounded-lg bg-neutral-50 dark:bg-neutral-950 font-medium text-sm text-neutral-900 dark:text-white active:bg-neutral-100" onClick={() => { setExercise({...exercise, name: 'Chest Press Macchina', equipment: 'Macchina'}); setShowSwapModal(false); }}>Chest Press Macchina (Tier 2)</button>
            </div>
            <div className="mt-4"><Button variant="secondary" fullWidth onClick={() => setShowSwapModal(false)}>Annulla</Button></div>
          </div>
        </div>
      )}
    </div>
  );
};