import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { Card, Button, Stepper } from '../components/UI';

export const AllenatiView = ({ settings, onWorkoutComplete, activeSessionDuration }) => {
  // 1. STATI STRUTTURALI (MAPPING SCHEDA ATTIVA)
  const [schedaAttiva, setSchedaAttiva] = useState(null);
  const [activeGiornoIdx, setActiveGiornoIdx] = useState(0); // Chip G1, G2, G3...
  const [activeExIdx, setActiveExIdx] = useState(0);       // Indice esercizio corrente
  const [currentSet, setCurrentSet] = useState(0);         // Set completati per l'ex corrente

  // Stati per i parametri dell'esercizio corrente
  const [weight, setWeight] = useState(80);
  const [reps, setReps] = useState(8);

  // Stati Timer
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPrepTime, setIsPrepTime] = useState(false);

  // 2. STATI DRAGGABLE BOTTOM SHEET (ALTERNATIVE)
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [dragY, setDragY] = useState(0);
  const touchStartY = useRef(0);
  const isDragging = useRef(false);

  // 3. RECUPERO SCHEDA ATTIVA DA SUPABASE (O FALLBACK STRUTTURATO)
  useEffect(() => {
    async function fetchScheda() {
      const { data, error } = await supabase.from('active_workout').select('*').single();
      if (data && !error) {
        setSchedaAttiva(data);
      } else {
        // Fallback speculare con split reali su più giornate
        setSchedaAttiva({
          id: 'scheda-1',
          name: 'Split A',
          giornate: [
            {
              nome: 'Spinta (Petto/Spalle/Tricipiti)',
              esercizi: [
                { id: 'ex-1', name: 'Panca Piana', category: 'Petto', equipment: 'Bilanciere', target_sets: 4, target_reps: 8, rest_time: 120 },
                { id: 'ex-3', name: 'Chest Press Macchina', category: 'Petto', equipment: 'Macchina', target_sets: 3, target_reps: 10, rest_time: 90 },
                { id: 'ex-17', name: 'Alzate Laterali', category: 'Spalle', equipment: 'Manubri', target_sets: 4, target_reps: 12, rest_time: 60 }
              ]
            },
            {
              nome: 'Trazione (Dorso/Bicipiti)',
              esercizi: [
                { id: 'ex-8', name: 'Lat Machine', category: 'Dorso', equipment: 'Macchina', target_sets: 4, target_reps: 8, rest_time: 90 },
                { id: 'ex-7', name: 'Rematore Manubrio', category: 'Dorso', equipment: 'Manubri', target_sets: 3, target_reps: 10, rest_time: 90 }
              ]
            }
          ]
        });
      }
    }
    fetchScheda();
  }, []);

  // Aggiorna i pesi e le rep quando cambia l'esercizio attivo o la giornata
  useEffect(() => {
    if (schedaAttiva?.giornate?.[activeGiornoIdx]?.esercizi?.[activeExIdx]) {
      const ex = schedaAttiva.giornate[activeGiornoIdx].esercizi[activeExIdx];
      setWeight(ex.target_weight || 80);
      setReps(ex.target_reps || 8);
      setCurrentSet(0); // Resetta i pallini quando cambia l'esercizio
    }
  }, [schedaAttiva, activeGiornoIdx, activeExIdx]);

  // Gestione asincrona del Timer
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

  if (!schedaAttiva) return <div className="p-8 text-center text-neutral-500">Caricamento sessione attiva...</div>;

  const giornataCorrente = schedaAttiva.giornate[activeGiornoIdx] || { nome: 'Vuoto', esercizi: [] };
  const esercizioCorrente = giornataCorrente.esercizi[activeExIdx];
  const totaleEsercizi = giornataCorrente.esercizi.length;

  // FUNZIONI DI SALVATAGGIO PROGRESSIVO
  const handleSalvaSerie = () => {
    if (!esercizioCorrente) return;
    
    const nuovoSet = currentSet + 1;
    if (nuovoSet < esercizioCorrente.target_sets) {
      // Avanza il pallino e avvia il recupero
      setCurrentSet(nuovoSet);
      setTimeLeft(esercizioCorrente.rest_time || 90);
      setIsTimerActive(true);
    } else {
      // Esercizio completato! Passa al successivo, resetta i pallini e riempie la lineetta
      setCurrentSet(esercizioCorrente.target_sets);
      setTimeout(() => {
        if (activeExIdx + 1 < totaleEsercizi) {
          setActiveExIdx(activeExIdx + 1);
          setIsTimerActive(false);
        } else {
          alert("Allenamento della giornata completato con successo!");
          onWorkoutComplete();
        }
      }, 300);
    }
  };

  const handleSaltaEsercizio = () => {
    if (activeExIdx + 1 < totaleEsercizi) {
      setActiveExIdx(activeExIdx + 1);
      setIsTimerActive(false);
    } else {
      onWorkoutComplete();
    }
  };

  // 4. GESTIONE EVENTI SWIPE-TO-DISMISS (TOUCH) PER IL BOTTOM SHEET
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const currentY = e.touches[0].clientY;
    const diffY = currentY - touchStartY.current;
    if (diffY > 0) {
      setDragY(diffY); // Consenti solo il trascinamento verso il basso
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    if (dragY > 100) {
      // Raggiunta la soglia di sblocco: chiudi
      setShowSwapModal(false);
    }
    setDragY(0); // Resetta la posizione
  };

  return (
    <div className="flex flex-col h-full p-4 box-border">
      {/* Top Session Bar */}
      <div className="flex justify-between items-center p-3 bg-neutral-900 text-white rounded-lg mb-3 shadow-md">
        <Button size="small" variant="secondary" className="text-white bg-white/10 border-transparent">Riprendi</Button>
        <span className="font-mono text-sm">⏱️ Sessione: {Math.floor(activeSessionDuration / 60).toString().padStart(2, '0')}:{(activeSessionDuration % 60).toString().padStart(2, '0')}</span>
      </div>

      {/* CARD ESERCIZIO MAGGIORATA (COMPACT CONTROLS IN ALTO) */}
      <Card className="flex flex-col gap-3">
        {/* Chips Giornate Cliccabili */}
        <div className="flex flex-wrap gap-1 border-b border-neutral-100 dark:border-neutral-800 pb-2.5">
          {schedaAttiva.giornate.map((g, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setActiveGiornoIdx(idx);
                setActiveExIdx(0);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeGiornoIdx === idx
                  ? 'bg-success text-white'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
              }`}
            >
              G{idx + 1}
            </button>
          ))}
          <span className="text-[11px] font-bold text-neutral-400 self-center ml-auto truncate max-w-[180px]">
            {giornataCorrente.nome}
          </span>
        </div>

        {esercizioCorrente ? (
          <div className="space-y-3">
            {/* Intestazione con pulsante sostituisci */}
            <div className="flex justify-between items-start">
              <div className="flex-1 pr-2">
                <h2 className="text-h2 text-neutral-950 dark:text-white uppercase tracking-tight leading-tight">{esercizioCorrente.name}</h2>
                <div className="text-xs text-neutral-400 mt-0.5">
                  {esercizioCorrente.equipment} · Target: {esercizioCorrente.target_sets}s × {esercizioCorrente.target_reps}r
                </div>
              </div>
              <Button size="small" variant="secondary" onClick={() => setShowSwapModal(true)} className="text-xs h-8">
                Sostituisci ⇄
              </Button>
            </div>

            {/* AVANZAMENTO SERIE (PALLINI) */}
            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1.5">
                Serie completate ({currentSet} di {esercizioCorrente.target_sets})
              </span>
              <div className="flex gap-2">
                {Array.from({ length: esercizioCorrente.target_sets }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                      idx < currentSet
                        ? 'bg-success border-success text-white text-[10px] font-bold'
                        : 'border-neutral-300 dark:border-neutral-700'
                    }`}
                  >
                    {idx < currentSet ? '✓' : ''}
                  </div>
                ))}
              </div>
            </div>

            {/* AVANZAMENTO SCHEDA (LINEETTE PROGRESSIVE) */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1.5">
                Esercizi completati ({activeExIdx} di {totaleEsercizi})
              </span>
              <div className="flex gap-1.5">
                {Array.from({ length: totaleEsercizi }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 flex-1 rounded-sm transition-all duration-300 ${
                      idx < activeExIdx
                        ? 'bg-success'
                        : idx === activeExIdx
                        ? 'bg-neutral-300 dark:bg-neutral-600 animate-pulse'
                        : 'bg-neutral-100 dark:bg-neutral-800'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 text-neutral-400 text-sm italic">Nessun esercizio presente in questo split.</div>
        )}
      </Card>

      {/* HERO TIMER (ORA CLICCABILE QUANDO FERMO) */}
      <div className="my-4 flex-1 flex flex-col justify-center">
        <div 
          onClick={() => {
            if (!isTimerActive && esercizioCorrente) {
              setTimeLeft(esercizioCorrente.rest_time || 90);
              setIsTimerActive(true);
            }
          }}
          className={`p-6 rounded-xl text-center shadow-light-elevated transition-all duration-300 ${
            isTimerActive 
              ? isPrepTime ? 'bg-gradient-to-r from-info to-blue-600 animate-pulse' : 'bg-gradient-to-r from-success to-success-darker'
              : 'bg-neutral-100 dark:bg-neutral-900 border border-dashed border-neutral-300 dark:border-neutral-800 py-8 cursor-pointer active:scale-98'
          }`}
        >
          {isTimerActive ? (
            <div>
              <h1 className="text-h1 font-mono text-white select-none">
                {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
              </h1>
              <div className="flex justify-center gap-3 mt-4" onClick={(e) => e.stopPropagation()}>
                <Button size="small" variant="secondary" className="bg-white/20 border-none text-white hover:bg-white/30" onClick={() => setTimeLeft(t => t + 30)}>+30s</Button>
                <Button size="small" variant="secondary" className="bg-white/20 border-none text-white hover:bg-white/30" onClick={() => setTimeLeft(0)}>Salta</Button>
              </div>
            </div>
          ) : (
            <div>
              <span className="text-h1 font-mono text-neutral-400 dark:text-neutral-600 block">——:——</span>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">Tocca questo blocco per avviare il recupero</p>
            </div>
          )}
        </div>
      </div>

      {/* PERSISTENT DATA ENTRY (ONE-HAND TARGET ZONE) */}
      {esercizioCorrente && (
        <div className="mt-auto bg-white dark:bg-neutral-900 rounded-xl p-4 border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <Stepper label="Carico (kg)" value={weight} onChange={setWeight} step={Number(settings.step_increment) || 1} unit="kg" />
          <Stepper label="Ripetizioni" value={reps} onChange={setReps} step={1} unit="rip" />
          
          <div className="mt-4 flex flex-col gap-2.5">
            <Button size="large" variant="primary" fullWidth onClick={handleSalvaSerie}>
              {currentSet + 1 >= esercizioCorrente.target_sets ? 'COMPLETA ESERCIZIO' : 'SALVA SERIE'}
            </Button>
            <Button size="medium" variant="secondary" fullWidth onClick={handleSaltaEsercizio}>
              SALTA / PROSSIMO
            </Button>
          </div>
        </div>
      )}

      {/* BOTTOM SHEET MODAL DRAGGABLE & SWIPE-TO-DISMISS */}
      {showSwapModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center" onClick={() => setShowSwapModal(false)}>
          <div 
            className="w-full max-w-[420px] bg-white dark:bg-neutral-900 rounded-t-2xl p-5 pb-8 box-border shadow-2xl transition-transform duration-100"
            style={{ transform: `translateY(${dragY}px)` }}
            onClick={e => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Drag Handle Touch Zone */}
            <div className="w-12 h-1.5 bg-neutral-300 dark:bg-neutral-700 rounded-full mx-auto mb-4 cursor-grab active:cursor-grabbing" />
            
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-h3 font-bold text-neutral-900 dark:text-white">Sostituisci esercizio</h3>
              <button onClick={() => setShowSwapModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 font-bold">✕</button>
            </div>

            <div className="flex flex-col gap-2">
              <button 
                type="button" 
                className="w-full p-3.5 text-left border border-neutral-200 dark:border-neutral-800 rounded-lg bg-neutral-50 dark:bg-neutral-950 font-medium text-sm text-neutral-900 dark:text-white active:bg-neutral-100" 
                onClick={() => { 
                  if (schedaAttiva) {
                    const copia = { ...schedaAttiva };
                    copia.giornate[activeGiornoIdx].esercizi[activeExIdx].name = 'Panca Inclinata Manubri';
                    copia.giornate[activeGiornoIdx].esercizi[activeExIdx].equipment = 'Manubri';
                    setSchedaAttiva(copia);
                    setShowSwapModal(false);
                  }
                }}
              >
                Panca Inclinata Manubri (Variante Alt. 1)
              </button>
              
              <button 
                type="button" 
                className="w-full p-3.5 text-left border border-neutral-200 dark:border-neutral-800 rounded-lg bg-neutral-50 dark:bg-neutral-950 font-medium text-sm text-neutral-900 dark:text-white active:bg-neutral-100" 
                onClick={() => { 
                  if (schedaAttiva) {
                    const copia = { ...schedaAttiva };
                    copia.giornate[activeGiornoIdx].esercizi[activeExIdx].name = 'Chest Press Macchina';
                    copia.giornate[activeGiornoIdx].esercizi[activeExIdx].equipment = 'Macchina';
                    setSchedaAttiva(copia);
                    setShowSwapModal(false);
                  }
                }}
              >
                Chest Press Macchina (Variante Alt. 2)
              </button>
            </div>
            
            <p className="text-[11px] text-center text-neutral-400 mt-4">Trascina questa scheda verso il basso per chiuderla</p>
          </div>
        </div>
      )}
    </div>
  );
};