import React, { useState } from 'react';
import { Card, Button, Stepper } from '../components/UI';
import { Plus, Trash2, CheckCircle2, Circle, CalendarDays, Search, X, Dumbbell, ChevronRight, Edit2 } from 'lucide-react';

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

const MUSCLE_GROUPS = ['Petto', 'Dorso', 'Gambe', 'Spalle', 'Bicipiti', 'Tricipiti'];
const EQUIPMENT_TYPES = ['Bilanciere', 'Manubri', 'Macchina', 'Cavi', 'Corpo Libero'];

export const SchedeView = ({ schede, setSchede, schedaAttiva, setSchedaAttiva }) => {
  const [viewState, setViewState] = useState('list'); 
  const [editingId, setEditingId] = useState(null); 
  
  const [newSchedaName, setNewSchedaName] = useState('');
  const [newSchedaDays, setNewSchedaDays] = useState(2);
  const [workoutRoutine, setWorkoutRoutine] = useState({}); 
  const [activeBuilderDay, setActiveBuilderDay] = useState('G1');

  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [muscleFilter, setMuscleFilter] = useState('');
  const [equipmentFilter, setEquipmentFilter] = useState('');
  
  const [configuringExercise, setConfiguringExercise] = useState(null);
  const [targetSets, setTargetSets] = useState(4);
  const [targetReps, setTargetReps] = useState(10);
  const [targetWeight, setTargetWeight] = useState(20);
  const [targetRest, setTargetRest] = useState(90); // Stato per il tempo di recupero

  const startCreation = () => {
    setEditingId(null);
    setNewSchedaName('');
    setNewSchedaDays(2);
    setViewState('setup');
  };

  const handleEditScheda = (scheda) => {
    setEditingId(scheda.id);
    setNewSchedaName(scheda.name);
    setNewSchedaDays(scheda.daysCount);
    setWorkoutRoutine(JSON.parse(JSON.stringify(scheda.routine)));
    setActiveBuilderDay('G1');
    setViewState('builder');
  };

  const proceedToBuilder = () => {
    if (!newSchedaName.trim()) return;
    if (!editingId) {
      const initialRoutine = {};
      for (let i = 1; i <= newSchedaDays; i++) initialRoutine[`G${i}`] = [];
      setWorkoutRoutine(initialRoutine);
    }
    setActiveBuilderDay('G1');
    setViewState('builder');
  };

  const handleSaveFinalScheda = () => {
    const schedaAggiornata = {
      id: editingId || Date.now(),
      name: newSchedaName.trim(),
      daysCount: newSchedaDays,
      routine: workoutRoutine,
      createdAt: new Date().toISOString(),
    };

    if (editingId) {
      const schedeAggiornate = schede.map(s => s.id === editingId ? schedaAggiornata : s);
      setSchede(schedeAggiornate);
      if (schedaAttiva?.id === editingId) setSchedaAttiva(schedaAggiornata);
    } else {
      const schedeAggiornate = [...schede, schedaAggiornata];
      setSchede(schedeAggiornate);
      if (!schedaAttiva) setSchedaAttiva(schedaAggiornata);
    }

    setEditingId(null);
    setViewState('list');
  };

  const handleDeleteScheda = (idToRemove) => {
    if (!window.confirm("Eliminare questa scheda?")) return;
    const schedeFiltrate = schede.filter(s => s.id !== idToRemove);
    setSchede(schedeFiltrate);
    if (schedaAttiva && schedaAttiva.id === idToRemove) {
      setSchedaAttiva(schedeFiltrate.length > 0 ? schedeFiltrate[0] : null);
    }
  };

  const openCatalogForDay = (day) => {
    setActiveBuilderDay(day);
    setIsCatalogOpen(true);
    setSearchQuery('');
    setMuscleFilter('');
    setEquipmentFilter('');
  };

  const filteredExercises = EXERCISE_CATALOG.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMuscle = muscleFilter === '' || ex.muscle === muscleFilter;
    const matchesEquipment = equipmentFilter === '' || ex.equipment === equipmentFilter;
    return matchesSearch && matchesMuscle && matchesEquipment;
  });

  const selectExerciseForConfig = (exercise) => {
    setConfiguringExercise(exercise);
    setTargetSets(4);
    setTargetReps(10);
    setTargetWeight(20);
    setTargetRest(90); // Reset del recupero a 90 sec all'apertura
  };

  const confirmAndAddExercise = () => {
    const exerciseToAdd = {
      ...configuringExercise,
      instanceId: Date.now() + Math.random(), 
      sets: targetSets,
      reps: targetReps,
      weight: targetWeight,
      rest: targetRest 
    };

    setWorkoutRoutine(prev => ({
      ...prev,
      [activeBuilderDay]: [...(prev[activeBuilderDay] || []), exerciseToAdd]
    }));

    setConfiguringExercise(null);
    setIsCatalogOpen(false);
  };

  const removeExerciseFromDay = (day, instanceId) => {
    setWorkoutRoutine(prev => ({
      ...prev,
      [day]: prev[day].filter(ex => ex.instanceId !== instanceId)
    }));
  };

  if (viewState === 'list') {
    return (
      <div className="min-h-screen w-full bg-[#f0f4f8] dark:bg-neutral-950 p-4 font-sans space-y-5 pb-28">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-[#15a34a] uppercase tracking-widest block">Gestione Workout</span>
            <h1 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">Le mie Schede</h1>
          </div>
          <Button variant="primary" size="small" onClick={startCreation} className="gap-1.5 rounded-xl font-bold bg-[#15a34a] border-none shadow-md">
            <Plus size={16} /> Nuova
          </Button>
        </div>

        {schede.length === 0 ? (
          <div className="text-center py-12 px-4 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-3xl">
            <CalendarDays size={48} className="mx-auto text-neutral-300 dark:text-neutral-700 mb-3" />
            <h3 className="text-lg font-black text-neutral-700 dark:text-neutral-300">Nessuna scheda</h3>
            <p className="text-xs text-neutral-400 mt-1 font-semibold">Crea il tuo primo programma per iniziare.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {schede.map((scheda) => {
              const isActive = schedaAttiva && schedaAttiva.id === scheda.id;
              return (
                <Card key={scheda.id} className={`p-0 overflow-hidden transition-all duration-200 ${isActive ? 'border-[#15a34a] ring-1 ring-[#15a34a] shadow-md' : 'border-neutral-200 dark:border-neutral-800'}`}>
                  <div className="p-4 flex items-start justify-between">
                    <div className="flex-1 cursor-pointer flex gap-3" onClick={() => setSchedaAttiva(scheda)}>
                      <div className="mt-1">
                        {isActive ? <CheckCircle2 size={24} className="text-[#15a34a]" fill="#15a34a" color="white" /> : <Circle size={24} className="text-neutral-300 dark:text-neutral-600" />}
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-neutral-900 dark:text-white tracking-tight">{scheda.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest bg-neutral-100 dark:bg-neutral-800 text-neutral-500 px-2 py-0.5 rounded-md">
                            <CalendarDays size={12} /> {scheda.daysCount} Giorni
                          </span>
                          {isActive && <span className="text-[10px] font-black uppercase tracking-widest text-[#15a34a] bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-md">Attiva</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleEditScheda(scheda)} className="p-2 text-neutral-400 hover:text-[#15a34a] hover:bg-emerald-50 rounded-xl transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDeleteScheda(scheda.id)} className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  if (viewState === 'setup') {
    return (
      <div className="min-h-screen w-full bg-[#f0f4f8] dark:bg-neutral-950 p-4 font-sans flex flex-col pt-10">
        <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight mb-6">
          {editingId ? 'Modifica Scheda' : 'Crea Nuova Scheda'}
        </h2>
        <Card className="p-5 border-none ring-1 ring-neutral-200/50 shadow-sm space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block">Nome del Programma</label>
            <input
              type="text"
              value={newSchedaName}
              onChange={(e) => setNewSchedaName(e.target.value)}
              className="w-full h-12 px-3 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 rounded-xl text-sm font-bold dark:text-white focus:outline-none focus:ring-2 focus:ring-[#15a34a]"
              autoFocus
            />
          </div>
          <div className="bg-neutral-50 dark:bg-neutral-800/50 p-2 rounded-xl border border-neutral-100 dark:border-neutral-800">
            <Stepper label="Frequenza Settimanale" value={newSchedaDays} onChange={(val) => setNewSchedaDays(Math.min(7, Math.max(1, val)))} step={1} unit="giorni" />
          </div>
        </Card>
        <div className="mt-auto pb-24 space-y-3">
          <Button variant="primary" fullWidth size="large" onClick={proceedToBuilder} disabled={!newSchedaName.trim()} className="rounded-2xl bg-[#15a34a] font-black uppercase tracking-wider">
            Avanti: Crea Workout <ChevronRight size={18} className="ml-1" />
          </Button>
          <Button variant="secondary" fullWidth onClick={() => setViewState('list')} className="rounded-2xl border-none bg-transparent">
            Annulla
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#f0f4f8] dark:bg-neutral-950 p-0 font-sans flex flex-col relative pb-28">
      <div className="bg-white dark:bg-neutral-900 px-4 py-4 border-b border-neutral-200/60 shadow-sm z-10 sticky top-0">
        <span className="text-[10px] font-black text-[#15a34a] uppercase tracking-widest block">Workout Builder</span>
        <h2 className="text-xl font-black text-neutral-900 dark:text-white tracking-tight truncate">{newSchedaName}</h2>
        <div className="flex items-center gap-2 mt-4 overflow-x-auto no-scrollbar">
          {Object.keys(workoutRoutine).map(day => (
            <button
              key={day}
              onClick={() => setActiveBuilderDay(day)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all min-w-[60px] ${
                activeBuilderDay === day ? 'bg-[#15a34a] text-white shadow-md' : 'bg-neutral-100 text-neutral-500'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto space-y-3">
        {!workoutRoutine[activeBuilderDay] || workoutRoutine[activeBuilderDay].length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed border-neutral-200 rounded-3xl bg-white">
            <Dumbbell size={32} className="mx-auto text-neutral-300 mb-2" />
            <p className="text-xs text-neutral-500 font-semibold">Nessun esercizio per {activeBuilderDay}.</p>
          </div>
        ) : (
          workoutRoutine[activeBuilderDay].map((ex, index) => (
            <div key={ex.instanceId} className="bg-white border border-neutral-200/60 rounded-2xl p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-neutral-100 text-neutral-400 font-mono text-[10px] font-bold flex items-center justify-center">
                  {index + 1}
                </span>
                <div>
                  <h4 className="text-sm font-black text-neutral-900">{ex.name}</h4>
                  <p className="text-[10px] font-bold text-neutral-400 mt-0.5">
                    {ex.sets} set × {ex.reps} rip @ {ex.weight}kg • {ex.rest || 90}s rec.
                  </p>
                </div>
              </div>
              <button onClick={() => removeExerciseFromDay(activeBuilderDay, ex.instanceId)} className="text-neutral-400 hover:text-red-500 active:scale-90 p-2">
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
        <button
          onClick={() => openCatalogForDay(activeBuilderDay)}
          className="w-full py-4 border-2 border-dashed border-[#15a34a]/40 bg-[#15a34a]/5 rounded-2xl flex items-center justify-center gap-2 text-[#15a34a] font-black text-xs uppercase tracking-widest active:bg-[#15a34a]/10 transition-colors"
        >
          <Plus size={16} /> Aggiungi Esercizio a {activeBuilderDay}
        </button>
      </div>

      <div className="fixed bottom-[72px] left-0 right-0 p-4 bg-gradient-to-t from-[#f0f4f8] via-[#f0f4f8]/80 to-transparent">
        <Button variant="primary" fullWidth size="large" onClick={handleSaveFinalScheda} className="rounded-2xl bg-[#15a34a] font-black uppercase tracking-wider shadow-lg">
          <CheckCircle2 size={18} className="mr-1.5" /> Salva Intera Scheda
        </Button>
      </div>

      {isCatalogOpen && !configuringExercise && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col animate-fade-in">
          <div className="flex items-center justify-between p-4 border-b border-neutral-100">
            <h3 className="text-lg font-black text-neutral-900">Libreria Esercizi</h3>
            <button onClick={() => setIsCatalogOpen(false)} className="p-2 bg-neutral-100 rounded-full active:scale-95"><X size={18}/></button>
          </div>
          <div className="p-4 space-y-3 bg-neutral-50 border-b border-neutral-200/50">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-3 text-neutral-400" />
              <input 
                type="text" 
                placeholder="Cerca esercizio..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-3 rounded-xl border border-neutral-200 text-sm font-bold focus:ring-2 focus:ring-[#15a34a] outline-none"
              />
            </div>
            <div className="flex gap-2">
              <select value={muscleFilter} onChange={(e) => setMuscleFilter(e.target.value)} className="flex-1 h-9 bg-white border border-neutral-200 rounded-lg text-xs font-bold px-2 outline-none">
                <option value="">Tutti i Muscoli</option>
                {MUSCLE_GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
              <select value={equipmentFilter} onChange={(e) => setEquipmentFilter(e.target.value)} className="flex-1 h-9 bg-white border border-neutral-200 rounded-lg text-xs font-bold px-2 outline-none">
                <option value="">Tutti gli Attrezzi</option>
                {EQUIPMENT_TYPES.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {filteredExercises.length === 0 ? (
              <p className="text-center text-xs font-bold text-neutral-400 mt-10">Nessun esercizio trovato coi filtri attuali.</p>
            ) : (
              filteredExercises.map(ex => (
                <button 
                  key={ex.id}
                  onClick={() => selectExerciseForConfig(ex)}
                  className="w-full text-left p-4 bg-white border border-neutral-200/60 rounded-2xl shadow-sm flex items-center justify-between active:scale-[0.98]"
                >
                  <div>
                    <h4 className="text-sm font-black text-neutral-900">{ex.name}</h4>
                    <p className="text-[10px] font-bold text-neutral-400 mt-0.5">{ex.muscle} • {ex.equipment}</p>
                  </div>
                  <Plus size={18} className="text-[#15a34a]" />
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {configuringExercise && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end animate-fade-in">
          <div className="absolute inset-0" onClick={() => setConfiguringExercise(null)} />
          <div className="relative w-full max-w-[420px] mx-auto bg-white rounded-t-[2.5rem] p-6 shadow-2xl">
            <div className="w-12 h-1.5 bg-neutral-300 rounded-full mx-auto mb-6" />
            <div className="mb-6">
              <span className="text-[10px] font-black text-[#15a34a] uppercase tracking-widest block">Imposta Target</span>
              <h3 className="text-2xl font-black text-neutral-900 tracking-tight">{configuringExercise.name}</h3>
            </div>
            <Card className="shadow-none border border-neutral-200/50 p-2 space-y-1 mb-6">
              <Stepper label="Serie (Set)" value={targetSets} onChange={setTargetSets} step={1} />
              <Stepper label="Ripetizioni" value={targetReps} onChange={setTargetReps} step={1} />
              <Stepper label="Carico base" value={targetWeight} onChange={setTargetWeight} step={2.5} unit="kg" />
              {/* Stepper del recupero aggiunto per coerenza visiva e architetturale */}
              <Stepper label="Recupero" value={targetRest} onChange={setTargetRest} step={15} unit="sec" />
            </Card>
            <div className="flex gap-2 pb-6">
              <Button variant="secondary" fullWidth onClick={() => setConfiguringExercise(null)} className="rounded-2xl">Annulla</Button>
              <Button variant="primary" fullWidth onClick={confirmAndAddExercise} className="rounded-2xl bg-[#15a34a]">Aggiungi a {activeBuilderDay}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
