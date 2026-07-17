import React, { useState } from 'react';
import { Card, Button, Stepper } from '../components/UI';
import { Plus, X, Edit2, Trash2, Dumbbell, GripVertical } from 'lucide-react';

export const SchedeView = ({ schede, setSchede, schedaAttiva, setSchedaAttiva, esercizi = [] }) => {
  const [viewState, setViewState] = useState('list');
  const [newSchedaName, setNewSchedaName] = useState('');
  const [newSchedaDays, setNewSchedaDays] = useState(2);
  const [workoutRoutine, setWorkoutRoutine] = useState({});
  const [activeBuilderDay, setActiveBuilderDay] = useState('G1');
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [error, setError] = useState('');
  const [editingExercise, setEditingExercise] = useState(null);
  const [editingExerciseIndex, setEditingExerciseIndex] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [muscleFilter, setMuscleFilter] = useState('');
  const [equipmentFilter, setEquipmentFilter] = useState('');

  // Drag & Drop state
  const [draggedExerciseIndex, setDraggedExerciseIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  // Estrai i muscoli e gli attrezzi unici dagli esercizi Supabase
  const muscleGroups = [...new Set(esercizi.map(ex => ex.muscle))].sort();
  const equipmentTypes = [...new Set(esercizi.map(ex => ex.equipment))].sort();

  const filteredExercises = esercizi.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMuscle = muscleFilter ? ex.muscle === muscleFilter : true;
    const matchesEquip = equipmentFilter ? ex.equipment === equipmentFilter : true;
    return matchesSearch && matchesMuscle && matchesEquip;
  });

  const startCreation = () => { 
    setNewSchedaName(''); 
    setNewSchedaDays(2); 
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

  const handleDragStart = (index) => {
    setDraggedExerciseIndex(index);
    setDragOverIndex(index);
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
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

  const deleteDay = () => {
    const days = Object.keys(workoutRoutine).filter(d => d !== activeBuilderDay);
    const newRoutine = {};
    days.forEach((day, idx) => {
      newRoutine[`G${idx + 1}`] = workoutRoutine[day];
    });
    setWorkoutRoutine(newRoutine);
    setActiveBuilderDay(`G1`);
  };

  const saveScheda = () => {
    const newScheda = { 
      id: Date.now(), 
      name: newSchedaName, 
      daysCount: Object.keys(workoutRoutine).length, 
      routine: workoutRoutine,
      isActive: false
    };
    setSchede([...schede, newScheda]);
    setViewState('list');
  };

  const editScheda = (schedaToEdit) => {
    setNewSchedaName(schedaToEdit.name);
    setNewSchedaDays(schedaToEdit.daysCount);
    setWorkoutRoutine(JSON.parse(JSON.stringify(schedaToEdit.routine)));
    setActiveBuilderDay('G1');
    setViewState('builder');
  };

  const deleteScheda = (schedaId) => {
    setSchede(schede.filter(s => s.id !== schedaId));
    if (schedaAttiva?.id === schedaId) {
      setSchedaAttiva(null);
    }
  };

  const activateScheda = (scheda) => {
    const updatedSchede = schede.map(s => ({
      ...s,
      isActive: s.id === scheda.id
    }));
    setSchede(updatedSchede);
    setSchedaAttiva({ ...scheda, isActive: true });
  };

  return (
    <div className="max-w-[420px] mx-auto min-h-screen bg-surface p-4 pb-32 text-text-primary">
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
              schede.map((s) => (
                <Card 
                  key={s.id} 
                  className={`flex justify-between items-center transition-all ${s.isActive ? 'border-2 border-primary' : 'border border-surface-tertiary'}`}
                >
                  <div className="flex-1">
                    <span className="font-bold text-white">{s.name}</span>
                    {s.isActive && (
                      <span className="ml-2 text-[10px] font-black text-primary uppercase">✓ Attiva</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => editScheda(s)}
                      className="p-2 text-text-secondary hover:text-primary transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => deleteScheda(s.id)}
                      className="p-2 text-text-secondary hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
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
              ))
            )}
          </div>
        </>
      )}

      {viewState === 'setup' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-white">Configurazione</h2>
          <input 
            type="text" 
            value={newSchedaName} 
            onChange={(e) => { setNewSchedaName(e.target.value); if(error) setError(''); }} 
            className={`w-full bg-surface-secondary p-4 rounded-2xl text-white border ${error ? 'border-red-500' : 'border-surface-tertiary'}`} 
            placeholder="Nome Scheda..." 
          />
          {error && <p className="text-red-500 text-[10px] font-black ml-2">{error}</p>}
          <Stepper label="Giorni" value={newSchedaDays} onChange={setNewSchedaDays} step={1} unit="giorni" />
          <Button variant="primary" fullWidth onClick={proceedToBuilder}>Avanti</Button>
        </div>
      )}

      {viewState === 'builder' && (
        <div className="space-y-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {Object.keys(workoutRoutine).map(day => (
              <button 
                key={day} 
                onClick={() => setActiveBuilderDay(day)} 
                className={`px-4 py-2 rounded-xl font-black text-xs whitespace-nowrap transition-all ${
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

          <div className="space-y-3">
            {workoutRoutine[activeBuilderDay]?.map((ex, idx) => (
              <div
                key={ex.instanceId}
                draggable
                onDragStart={() => handleDragStart(idx)}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDrop={(e) => handleDrop(e, idx)}
                onDragEnd={handleDragEnd}
                className={`transition-all cursor-grab active:cursor-grabbing ${
                  draggedExerciseIndex === idx ? 'scale-105 opacity-100 z-20 shadow-xl' : 'scale-100 opacity-100'
                } ${dragOverIndex === idx && draggedExerciseIndex !== idx ? 'border-t-2 border-primary pt-2' : ''}`}
              >
                <Card className="flex items-center gap-3 p-4">
                  <GripVertical size={16} className="text-text-tertiary flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-bold text-white text-sm">{ex.name}</p>
                    <p className="text-[10px] text-text-secondary">{ex.sets}×{ex.reps} @ {ex.weight}kg • {ex.rest}s</p>
                  </div>
                  <button 
                    onClick={() => editExercise(idx)}
                    className="p-2 text-text-secondary hover:text-primary transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => deleteExercise(idx)}
                    className="p-2 text-text-secondary hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </Card>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Button variant="primary" fullWidth onClick={() => setIsCatalogOpen(true)}>
              <Plus size={16} className="mr-2" />
              AGGIUNGI ESERCIZIO
            </Button>
            <Button variant="secondary" fullWidth onClick={saveScheda}>
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
                <button onClick={() => setIsCatalogOpen(false)}><X size={24}/></button>
              </div>

              <div className="space-y-3 mb-6">
                <input 
                  type="text" 
                  placeholder="Cerca..." 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="w-full bg-surface-secondary p-3 rounded-xl border border-surface-tertiary text-white text-sm" 
                />
                
                <select 
                  value={muscleFilter}
                  onChange={(e) => setMuscleFilter(e.target.value)}
                  className="w-full bg-surface-secondary p-3 rounded-xl border border-surface-tertiary text-white text-sm"
                >
                  <option value="">Tutti i muscoli</option>
                  {muscleGroups.map(m => <option key={m} value={m}>{m}</option>)}
                </select>

                <select 
                  value={equipmentFilter}
                  onChange={(e) => setEquipmentFilter(e.target.value)}
                  className="w-full bg-surface-secondary p-3 rounded-xl border border-surface-tertiary text-white text-sm"
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
                    key={ex.id} 
                    className="flex justify-between items-center bg-surface-secondary p-4 rounded-xl mb-2 border border-surface-tertiary"
                  >
                    <div className="flex-1">
                      <p className="font-bold text-sm text-white">{ex.name}</p>
                      <p className="text-[10px] text-text-secondary">{ex.muscle} • {ex.equipment}</p>
                    </div>
                    <button 
                      onClick={() => addExerciseToDay(ex)} 
                      className="bg-primary text-white p-2 rounded-lg hover:opacity-90 transition-opacity"
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
                <button onClick={() => { setEditingExercise(null); setEditingExerciseIndex(null); }}><X size={24}/></button>
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
        </div>
      )}
    </div>
  );
};
