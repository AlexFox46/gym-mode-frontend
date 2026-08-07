import React, { useState, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { Card, Button, Stepper } from '../components/UI';
import { Plus, X, Edit2, Trash2, Dumbbell, GripVertical, ChevronUp, ChevronDown, Sparkles, Info } from 'lucide-react';
import { ExerciseDetailModal } from '../components/ExerciseDetailModal';
import { EQUIPMENT_TYPES } from '../data/exerciseLibrary';

const GOAL_OPTIONS = [
  { id: 'hypertrophy', label: 'Ipertrofia', desc: 'Massa muscolare (8-12 rep)' },
  { id: 'strength', label: 'Forza', desc: 'Carichi elevati (1-5 rep)' },
  { id: 'endurance', label: 'Resistenza', desc: 'Volume elevato (15+ rep)' },
  { id: 'maintenance', label: 'Mantenimento', desc: 'Assetto conservativo' }
];

export const SchedeView = ({ schede, setSchede, schedaAttiva, setSchedaAttiva, esercizi = [], userId, editDay, setEditDay }) => {
  const [viewState, setViewState] = useState('list');
  const [newSchedaName, setNewSchedaName] = useState('');
  const [newSchedaDays, setNewSchedaDays] = useState(2);
  const [newSchedaGoal, setNewSchedaGoal] = useState('hypertrophy');
  const [workoutRoutine, setWorkoutRoutine] = useState({});
  const [activeBuilderDay, setActiveBuilderDay] = useState('G1');
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [error, setError] = useState('');
  const [editingExercise, setEditingExercise] = useState(null);
  const [editingExerciseIndex, setEditingExerciseIndex] = useState(null);
  const [editingSchedaId, setEditingSchedaId] = useState(null);
  
  // Stato per Modale Dettaglio Esercizio (i)
  const [detailModalExercise, setDetailModalExercise] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [muscleFilter, setMuscleFilter] = useState('');
  const [equipmentFilter, setEquipmentFilter] = useState('');

  // Drag & Drop / Touch State
  const [draggedExerciseIndex, setDraggedExerciseIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [dragOffsetY, setDragOffsetY] = useState(0);
  const touchStartY = useRef(null);

  // Apertura diretta al giorno specifico se richiesto da AllenatiView
  React.useEffect(() => {
    if (editDay && schedaAttiva) {
      setNewSchedaName(schedaAttiva.name);
      setNewSchedaDays(schedaAttiva.daysCount);
      setWorkoutRoutine(JSON.parse(JSON.stringify(schedaAttiva.routine || {})));
      setActiveBuilderDay(editDay);
      setEditingSchedaId(schedaAttiva.id);
      setViewState('builder');
      if (setEditDay) setEditDay(null);
    }
  }, [editDay, schedaAttiva]);

  // Estrai i muscoli e gli attrezzi unici dagli esercizi Supabase e dalla libreria master
  const muscleGroups = [...new Set(esercizi.map(ex => ex.primary_muscle_group || ex.muscle))].filter(Boolean).sort();
  const equipmentTypes = [...new Set([...EQUIPMENT_TYPES, ...esercizi.map(ex => ex.equipment)])].filter(Boolean).sort();

  const filteredExercises = esercizi.filter(ex => {
    const exMuscle = ex.primary_muscle_group || ex.muscle;
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMuscle = muscleFilter ? exMuscle === muscleFilter : true;
    const matchesEquip = equipmentFilter ? ex.equipment === equipmentFilter : true;
    return matchesSearch && matchesMuscle && matchesEquip;
  });

  const startCreation = () => { 
    setNewSchedaName(''); 
    setNewSchedaDays(2); 
    setNewSchedaGoal('hypertrophy');
    setWorkoutRoutine({});
    setEditingSchedaId(null);
    setViewState('setup'); 
    setError(''); 
  };
  
  const proceedToBuilder = () => { 
    if (!newSchedaName.trim()) { 
      setError('Inserisci un nome scheda'); 
      return; 
    }
    const initialRoutine = {}; 
    for (let i = 1; i <= newSchedaDays; i++) initialRoutine[`G${i}`] = []; 
    setWorkoutRoutine(initialRoutine);
    setActiveBuilderDay('G1'); 
    setViewState('builder'); 
  };

  const addExerciseToDay = (ex) => {
    const newEx = { 
      ...ex, 
      instanceId: Date.now() + Math.random(), 
      sets: 4, 
      reps: 10, 
      weight: 20, 
      rest: ex.default_rest_time || 90 
    };
    setEditingExercise(newEx);
    setEditingExerciseIndex(null);
    setIsCatalogOpen(false);
  };

  const saveExerciseConfiguration = () => {
    if (editingExerciseIndex !== null) {
      const updatedRoutine = [...workoutRoutine[activeBuilderDay]];
      updatedRoutine[editingExerciseIndex] = editingExercise;
      setWorkoutRoutine(prev => ({
        ...prev,
        [activeBuilderDay]: updatedRoutine
      }));
    } else {
      setWorkoutRoutine(prev => ({
        ...prev,
        [activeBuilderDay]: [...(prev[activeBuilderDay] || []), editingExercise]
      }));
    }
    setEditingExercise(null);
    setEditingExerciseIndex(null);
  };

  const deleteExercise = (index) => {
    setWorkoutRoutine(prev => ({
      ...prev,
      [activeBuilderDay]: prev[activeBuilderDay].filter((_, i) => i !== index)
    }));
  };

  const editExercise = (index) => {
    setEditingExercise(JSON.parse(JSON.stringify(workoutRoutine[activeBuilderDay][index])));
    setEditingExerciseIndex(index);
    setIsCatalogOpen(false);
  };

  // =========================================================================
  // LOGICA REORDERING SPOSTAMENTO ESERCIZI (Touch + Mouse Desktop)
  // =========================================================================

  // Spostamento tramite pulsanti Su / Giù (100% Touch-Friendly)
  const moveExercise = (index, direction) => {
    const currentList = [...(workoutRoutine[activeBuilderDay] || [])];
    const targetIndex = index + direction;

    if (targetIndex < 0 || targetIndex >= currentList.length) return;

    const temp = currentList[index];
    currentList[index] = currentList[targetIndex];
    currentList[targetIndex] = temp;

    if (navigator.vibrate) {
      navigator.vibrate(30);
    }

    setWorkoutRoutine(prev => ({
      ...prev,
      [activeBuilderDay]: currentList
    }));
  };

  // Drag Desktop Handlers
  const handleDragStart = (index) => {
    setDraggedExerciseIndex(index);
    setDragOverIndex(index);
    if (navigator.vibrate) navigator.vibrate(40);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedExerciseIndex === null || draggedExerciseIndex === dropIndex) {
      setDraggedExerciseIndex(null);
      setDragOverIndex(null);
      return;
    }
    
    const newRoutine = [...workoutRoutine[activeBuilderDay]];
    const draggedItem = newRoutine[draggedExerciseIndex];
    
    newRoutine.splice(draggedExerciseIndex, 1);
    newRoutine.splice(dropIndex > draggedExerciseIndex ? dropIndex - 1 : dropIndex, 0, draggedItem);
    
    setWorkoutRoutine(prev => ({
      ...prev,
      [activeBuilderDay]: newRoutine
    }));
    
    setDraggedExerciseIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedExerciseIndex(null);
    setDragOverIndex(null);
  };

  // Gestione Touch Drag su Mobile nativa e fluida
  const handleTouchStart = (index, e) => {
    touchStartY.current = e.touches[0].clientY;
    setDraggedExerciseIndex(index);
    setDragOffsetY(0);
    if (navigator.vibrate) navigator.vibrate(40);
  };

  const handleTouchMove = (e) => {
    if (draggedExerciseIndex === null || !touchStartY.current) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStartY.current;
    // Sposta visivamente l'elemento seguendo il dito senza re-renderizzare l'array
    setDragOffsetY(diff);
  };

  const handleTouchEnd = () => {
    if (draggedExerciseIndex === null) return;
    
    // Altezza stimata della card per calcolare lo spostamento
    const itemHeight = 90;
    const jump = Math.round(dragOffsetY / itemHeight);
    
    if (jump !== 0) {
      const currentList = [...(workoutRoutine[activeBuilderDay] || [])];
      let newIndex = draggedExerciseIndex + jump;
      newIndex = Math.max(0, Math.min(currentList.length - 1, newIndex));
      
      if (newIndex !== draggedExerciseIndex) {
        const temp = currentList[draggedExerciseIndex];
        currentList.splice(draggedExerciseIndex, 1);
        currentList.splice(newIndex, 0, temp);
        
        setWorkoutRoutine(prev => ({
          ...prev,
          [activeBuilderDay]: currentList
        }));
        if (navigator.vibrate) navigator.vibrate(30);
      }
    }
    
    setDraggedExerciseIndex(null);
    setDragOffsetY(0);
    touchStartY.current = null;
  };

  const deleteDay = () => {
    const days = Object.keys(workoutRoutine).filter(d => d !== activeBuilderDay);
    const newRoutine = {};
    days.forEach((day, idx) => {
      newRoutine[`G${idx + 1}`] = workoutRoutine[day];
    });
    setWorkoutRoutine(newRoutine);
    setActiveBuilderDay(`G1`);
  };

  // Salva scheda su Supabase
  const saveSchedule = async () => {
    if (!userId) {
      alert('Utente non autenticato');
      return;
    }

    try {
      const schedaData = {
        user_id: userId,
        name: newSchedaName,
        days_count: Object.keys(workoutRoutine).length,
        routine: workoutRoutine,
        is_active: false,
        goal: newSchedaGoal
      };

      if (editingSchedaId) {
        const { error } = await supabase
          .from('workout_schemes')
          .update(schedaData)
          .eq('id', editingSchedaId);
        
        if (error) throw error;
        console.log('✅ Scheda aggiornata');
      } else {
        const { error } = await supabase
          .from('workout_schemes')
          .insert([schedaData]);
        
        if (error) throw error;
        console.log('✅ Scheda creata');
      }

      const { data: allSchede, error: fetchError } = await supabase
        .from('workout_schemes')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (!fetchError && allSchede) {
        const schedeFormattate = allSchede.map(scheda => ({
          id: scheda.id,
          name: scheda.name,
          daysCount: scheda.days_count || 2,
          routine: scheda.routine || {},
          isActive: scheda.is_active || false,
          goal: scheda.goal || 'hypertrophy'
        }));
        setSchede(schedeFormattate);
      }

      setViewState('list');
      setEditingSchedaId(null);
    } catch (err) {
      console.error('Errore nel salvataggio della scheda:', err);
      alert('Errore nel salvataggio della scheda');
    }
  };

  const editScheda = (schedaToEdit) => {
    setNewSchedaName(schedaToEdit.name);
    setNewSchedaDays(schedaToEdit.daysCount);
    setNewSchedaGoal(schedaToEdit.goal || 'hypertrophy');
    setWorkoutRoutine(JSON.parse(JSON.stringify(schedaToEdit.routine)));
    setActiveBuilderDay('G1');
    setEditingSchedaId(schedaToEdit.id);
    setViewState('builder');
  };

  const deleteScheda = async (schedaId) => {
    if (!window.confirm('Sei sicuro di voler eliminare questa scheda?')) return;

    try {
      const { error } = await supabase
        .from('workout_schemes')
        .delete()
        .eq('id', schedaId);
      
      if (error) throw error;
      console.log('✅ Scheda eliminata');

      const { data: allSchede, error: fetchError } = await supabase
        .from('workout_schemes')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (!fetchError && allSchede) {
        const schedeFormattate = allSchede.map(scheda => ({
          id: scheda.id,
          name: scheda.name,
          daysCount: scheda.days_count || 2,
          routine: scheda.routine || {},
          isActive: scheda.is_active || false
        }));
        setSchede(schedeFormattate);
      }
    } catch (err) {
      console.error('Errore nell\'eliminazione della scheda:', err);
      alert('Errore nell\'eliminazione della scheda');
    }
  };

  const activateScheda = async (scheda) => {
    try {
      await supabase
        .from('workout_schemes')
        .update({ is_active: false })
        .eq('user_id', userId);

      const { error } = await supabase
        .from('workout_schemes')
        .update({ is_active: true })
        .eq('id', scheda.id);
      
      if (error) throw error;
      console.log('✅ Scheda attivata');

      const { data: allSchede, error: fetchError } = await supabase
        .from('workout_schemes')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (!fetchError && allSchede) {
        const schedeFormattate = allSchede.map(s => ({
          id: s.id,
          name: s.name,
          daysCount: s.days_count || 2,
          routine: s.routine || {},
          isActive: s.is_active || false
        }));
        setSchede(schedeFormattate);
        setSchedaAttiva(schedeFormattate.find(s => s.isActive) || null);
      }
    } catch (err) {
      console.error('Errore nell\'attivazione della scheda:', err);
      alert('Errore nell\'attivazione della scheda');
    }
  };

  return (
    <div className="max-w-[420px] mx-auto min-h-screen bg-surface p-4 pb-32 text-text-primary select-none touch-manipulation">
      {viewState === 'list' && (
        <>
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-black text-white">Le mie Schede</h1>
            <Button variant="primary" size="medium" onClick={startCreation}>
              <Plus size={16} className="mr-2" />
              NUOVA SCHEDA
            </Button>
          </div>
          <div className="space-y-4">
            {schede.length === 0 ? (
              <div className="text-center py-12 text-text-secondary">
                <p className="text-sm">Nessuna scheda creata. Inizia a costruire la tua!</p>
              </div>
            ) : (
              schede.map((s) => {
                const currentGoalObj = GOAL_OPTIONS.find(g => g.id === (s.goal || 'hypertrophy')) || GOAL_OPTIONS[0];
                return (
                  <Card 
                    key={s.id} 
                    className={`flex justify-between items-center transition-all ${s.isActive ? 'border-2 border-primary' : 'border border-surface-tertiary'}`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{s.name}</span>
                        {s.isActive && (
                          <span className="text-[10px] font-black text-primary uppercase">✓ Attiva</span>
                        )}
                      </div>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-spotter/10 border border-spotter/30 text-spotter text-[10px] font-bold uppercase tracking-wider shadow-spotter-subtle">
                          <Sparkles size={10} />
                          {currentGoalObj.label}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => editScheda(s)}
                        className="p-3 text-text-secondary hover:text-primary active:scale-95 transition-transform"
                        title="Modifica"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => deleteScheda(s.id)}
                        className="p-3 text-text-secondary hover:text-red-500 active:scale-95 transition-transform"
                        title="Elimina"
                      >
                        <Trash2 size={18} />
                      </button>
                      {!s.isActive && (
                        <Button 
                          variant="primary"
                          size="medium"
                          onClick={() => activateScheda(s)}
                        >
                          Attiva
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })
            )}
          </div>
        </>
      )}

      {viewState === 'setup' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-white">Configurazione</h2>
          <div>
            <label className="text-xs font-bold text-text-secondary uppercase mb-2 block ml-1">Nome Scheda</label>
            <input 
              type="text" 
              value={newSchedaName} 
              onChange={(e) => { setNewSchedaName(e.target.value); if(error) setError(''); }} 
              className={`w-full bg-surface-secondary p-4 rounded-2xl text-white border ${error ? 'border-red-500' : 'border-surface-tertiary'}`} 
              placeholder="Es. Scheda Invernale Push-Pull..." 
            />
            {error && <p className="text-red-500 text-[10px] font-black ml-2 mt-1">{error}</p>}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2 ml-1">
              <Sparkles size={14} className="text-spotter" />
              <label className="text-xs font-black text-spotter uppercase tracking-wider">Obiettivo Spotter</label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {GOAL_OPTIONS.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setNewSchedaGoal(g.id)}
                  className={`p-3 rounded-2xl border text-left transition-all active:scale-95 ${
                    newSchedaGoal === g.id
                      ? 'bg-spotter/15 border-spotter text-spotter shadow-spotter-subtle'
                      : 'bg-surface-secondary border-surface-tertiary text-text-secondary hover:border-surface-tertiary/80'
                  }`}
                >
                  <div className="text-xs font-black uppercase tracking-wide mb-0.5">{g.label}</div>
                  <div className="text-[10px] leading-tight text-text-secondary">{g.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <Stepper label="Giorni" value={newSchedaDays} onChange={setNewSchedaDays} step={1} unit="giorni" />
          <Button variant="primary" fullWidth onClick={proceedToBuilder}>Avanti</Button>
        </div>
      )}

      {viewState === 'builder' && (
        <div className="space-y-6">
          {/* Header Builder con Selettore Obiettivo Spotter */}
          <div className="bg-surface-secondary p-4 rounded-2xl border border-surface-tertiary space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-text-secondary">Scheda in modifica</span>
                <h2 className="text-lg font-black text-white">{newSchedaName || 'Nuova Scheda'}</h2>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-spotter uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Sparkles size={12} className="animate-pulse" />
                Obiettivo Spotter:
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {GOAL_OPTIONS.map(g => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setNewSchedaGoal(g.id)}
                    className={`p-2 rounded-xl border text-left text-[11px] font-bold transition-all active:scale-95 ${
                      newSchedaGoal === g.id
                        ? 'bg-spotter/20 border-spotter text-spotter shadow-spotter-subtle'
                        : 'bg-surface border-surface-tertiary text-text-secondary hover:border-surface-tertiary/80'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {Object.keys(workoutRoutine).map(day => (
              <button 
                key={day} 
                onClick={() => setActiveBuilderDay(day)} 
                className={`px-4 py-2.5 rounded-xl font-black text-xs whitespace-nowrap transition-all active:scale-95 ${
                  activeBuilderDay === day 
                    ? 'bg-primary text-white' 
                    : 'bg-transparent border-2 border-primary text-primary hover:opacity-75'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {workoutRoutine[activeBuilderDay]?.length === 0 && (
            <div className="border-2 border-dashed border-surface-tertiary rounded-3xl p-8 text-center space-y-4">
              <Dumbbell size={40} className="text-text-tertiary mx-auto" />
              <div>
                <p className="text-text-primary font-black text-sm">Nessun esercizio aggiunto</p>
                <p className="text-text-secondary text-xs mt-1">Inizia a costruire il tuo allenamento</p>
              </div>
            </div>
          )}

          {/* LISTA ESERCIZI CON SUPPORTO TOUCH DRAG & PULSANTI FRECCIA SU/GIÙ */}
          <div className="space-y-3">
            {workoutRoutine[activeBuilderDay]?.map((ex, idx) => (
                <div
                  key={ex.instanceId}
                  draggable
                  onDragStart={() => handleDragStart(idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDrop={(e) => handleDrop(e, idx)}
                  onDragEnd={handleDragEnd}
                  style={{
                    transform: draggedExerciseIndex === idx ? `translateY(${dragOffsetY}px)` : 'none',
                    zIndex: draggedExerciseIndex === idx ? 50 : 1,
                    position: draggedExerciseIndex === idx ? 'relative' : 'static',
                    transition: draggedExerciseIndex === idx ? 'none' : 'transform 0.3s ease',
                  }}
                  className={`${
                    draggedExerciseIndex === idx ? 'scale-105 opacity-90 shadow-2xl border-2 border-primary rounded-2xl' : 'scale-100 opacity-100'
                  } ${dragOverIndex === idx && draggedExerciseIndex !== idx ? 'border-t-2 border-primary pt-2' : ''}`}
                >
                <Card className="flex items-center gap-2 p-3 bg-surface-secondary border border-surface-tertiary">
                  
                  {/* Maniglia Touch Drag con vibrazione */}
                  <div 
                    onTouchStart={(e) => handleTouchStart(idx, e)}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    className="p-2 touch-none cursor-grab active:cursor-grabbing text-text-tertiary hover:text-primary transition-colors"
                    title="Trascina con il dito per riordinare"
                  >
                    <GripVertical size={20} />
                  </div>

                  {/* Pulsanti Rapidi Touch Su / Giù */}
                  <div className="flex flex-col gap-0.5 border-r border-surface-tertiary pr-2">
                    <button
                      onClick={() => moveExercise(idx, -1)}
                      disabled={idx === 0}
                      className="p-1 text-text-secondary hover:text-primary disabled:opacity-20 active:scale-125 transition-transform"
                      title="Sposta Su"
                    >
                      <ChevronUp size={16} />
                    </button>
                    <button
                      onClick={() => moveExercise(idx, 1)}
                      disabled={idx === (workoutRoutine[activeBuilderDay]?.length - 1)}
                      className="p-1 text-text-secondary hover:text-primary disabled:opacity-20 active:scale-125 transition-transform"
                      title="Sposta Giù"
                    >
                      <ChevronDown size={16} />
                    </button>
                  </div>

                  {/* Info Esercizio */}
                  <div className="flex-1 ml-1">
                    <p className="font-bold text-white text-sm">{ex.name}</p>
                    <p className="text-[10px] text-text-secondary">{ex.sets}×{ex.reps} @ {ex.weight}kg • {ex.rest}s</p>
                  </div>

                  {/* Azioni Info / Modifica / Elimina con touch area generosa */}
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => setDetailModalExercise(ex)}
                      className="p-2 text-text-secondary hover:text-primary active:scale-95 transition-transform"
                      title="Dettagli e Info Esercizio"
                    >
                      <Info size={16} />
                    </button>
                    <button 
                      onClick={() => editExercise(idx)}
                      className="p-2 text-text-secondary hover:text-primary active:scale-95 transition-transform"
                      title="Modifica"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => deleteExercise(idx)}
                      className="p-2 text-text-secondary hover:text-red-500 active:scale-95 transition-transform"
                      title="Elimina"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-2">
            <Button variant="primary" fullWidth onClick={() => setIsCatalogOpen(true)}>
              <Plus size={16} className="mr-2" />
              AGGIUNGI ESERCIZIO
            </Button>
            <Button variant="secondary" fullWidth onClick={saveSchedule}>
              COMPLETA SCHEDA
            </Button>
            <Button 
              variant="destructive" 
              fullWidth 
              onClick={deleteDay}
            >
              <Trash2 size={16} className="mr-2" />
              ELIMINA GIORNATA
            </Button>
          </div>

          {isCatalogOpen && (
            <div className="fixed inset-0 bg-surface z-50 p-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black">Scegli Esercizio</h2>
                <button onClick={() => setIsCatalogOpen(false)} className="p-2"><X size={24}/></button>
              </div>

              <div className="space-y-3 mb-6">
                <input 
                  type="text" 
                  placeholder="Cerca..." 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="w-full bg-surface-secondary p-4 rounded-xl border border-surface-tertiary text-white text-sm" 
                />
                
                <select 
                  value={muscleFilter}
                  onChange={(e) => setMuscleFilter(e.target.value)}
                  className="w-full bg-surface-secondary p-4 rounded-xl border border-surface-tertiary text-white text-sm"
                >
                  <option value="">Tutti i muscoli</option>
                  {muscleGroups.map(m => <option key={m} value={m}>{m}</option>)}
                </select>

                <select 
                  value={equipmentFilter}
                  onChange={(e) => setEquipmentFilter(e.target.value)}
                  className="w-full bg-surface-secondary p-4 rounded-xl border border-surface-tertiary text-white text-sm"
                >
                  <option value="">Tutti gli attrezzi</option>
                  {equipmentTypes.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>

              {filteredExercises.length === 0 ? (
                <div className="text-center py-8 text-text-secondary">
                  <p className="text-sm">Nessun esercizio trovato</p>
                </div>
              ) : (
                filteredExercises.map(ex => (
                  <div 
                    key={ex.id || ex.name} 
                    className="flex justify-between items-center bg-surface-secondary p-4 rounded-xl mb-2 border border-surface-tertiary"
                  >
                    <div className="flex-1 pr-2">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-sm text-white">{ex.name}</p>
                        <button
                          onClick={() => setDetailModalExercise(ex)}
                          className="p-1 text-text-secondary hover:text-primary active:scale-95 transition-transform"
                          title="Dettagli ed Esercizi Simili"
                        >
                          <Info size={16} />
                        </button>
                      </div>
                      <p className="text-[10px] text-text-secondary">{ex.primary_muscle_group || ex.muscle} • {ex.equipment}</p>
                    </div>
                    <button 
                      onClick={() => addExerciseToDay(ex)} 
                      className="bg-primary text-white p-3 rounded-xl hover:opacity-90 active:scale-95 transition-all"
                    >
                      <Plus size={20}/>
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {editingExercise && (
            <div className="fixed inset-x-0 bottom-0 bg-surface border-t border-surface-tertiary p-6 z-[60] rounded-t-3xl shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black">{editingExercise.name}</h2>
                <button onClick={() => { setEditingExercise(null); setEditingExerciseIndex(null); }} className="p-2"><X size={24}/></button>
              </div>
              <div className="space-y-4">
                <Stepper label="Serie" value={editingExercise.sets} onChange={(val) => setEditingExercise({...editingExercise, sets: val})} step={1} unit="set" />
                <Stepper label="Ripetizioni" value={editingExercise.reps} onChange={(val) => setEditingExercise({...editingExercise, reps: val})} step={1} unit="reps" />
                <Stepper label="Peso" value={editingExercise.weight} onChange={(val) => setEditingExercise({...editingExercise, weight: val})} step={2.5} unit="kg" />
                <Stepper label="Recupero" value={editingExercise.rest} onChange={(val) => setEditingExercise({...editingExercise, rest: val})} step={15} unit="s" />
              </div>
              <Button variant="primary" fullWidth onClick={saveExerciseConfiguration} className="mt-6">SALVA IMPOSTAZIONI</Button>
            </div>
          )}

          {/* Modale Dettaglio Esercizio Tooltip (i) */}
          {detailModalExercise && (
            <ExerciseDetailModal
              exercise={detailModalExercise}
              onClose={() => setDetailModalExercise(null)}
              allExercises={esercizi}
              onSelectSimilar={(simEx) => setDetailModalExercise(simEx)}
            />
          )}
        </div>
      )}
    </div>
  );
};
