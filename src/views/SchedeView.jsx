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
  const [targetRest, setTargetRest] = useState(90);

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
    const schedaAggiornata = { id: editingId || Date.now(), name: newSchedaName.trim(), daysCount: newSchedaDays, routine: workoutRoutine, createdAt: new Date().toISOString() };
    if (editingId) {
      setSchede(schede.map(s => s.id === editingId ? schedaAggiornata : s));
      if (schedaAttiva?.id === editingId) setSchedaAttiva(schedaAggiornata);
    } else {
      setSchede([...schede, schedaAggiornata]);
      if (!schedaAttiva) setSchedaAttiva(schedaAggiornata);
    }
    setViewState('list');
  };

  const confirmAndAddExercise = () => {
    setWorkoutRoutine(prev => ({ ...prev, [activeBuilderDay]: [...(prev[activeBuilderDay] || []), { ...configuringExercise, instanceId: Date.now() + Math.random(), sets: targetSets, reps: targetReps, weight: targetWeight, rest: targetRest }] }));
    setConfiguringExercise(null);
    setIsCatalogOpen(false);
  };

  return (
    <div className="max-w-[420px] mx-auto min-h-screen bg-surface text-text-primary p-4 pb-32">
      {/* 1. LIST VIEW */}
      {viewState === 'list' && (
        <>
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[10px] font-black text-primary uppercase tracking-widest block">Gestione</span>
              <h1 className="text-2xl font-black text-white tracking-tight">Le mie Schede</h1>
            </div>
            <Button variant="primary" size="small" onClick={startCreation}><Plus size={16} className="mr-2" /> Nuova</Button>
          </div>
          <div className="space-y-4">
            {schede.map((scheda) => (
              <Card key={scheda.id} className={schedaAttiva?.id === scheda.id ? 'border-primary ring-1 ring-primary' : ''}>
                <div className="flex items-center justify-between">
                  <div className="flex-1 cursor-pointer flex gap-4" onClick={() => setSchedaAttiva(scheda)}>
                    {schedaAttiva?.id === scheda.id ? <CheckCircle2 className="text-primary" /> : <Circle className="text-text-tertiary" />}
                    <div>
                      <h3 className="font-black text-white">{scheda.name}</h3>
                      <p className="text-[10px] font-bold text-text-secondary uppercase">{scheda.daysCount} Giorni</p>
                    </div>
                  </div>
                  <button onClick={() => handleEditScheda(scheda)} className="text-text-tertiary hover:text-white"><Edit2 size={18} /></button>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* 2. SETUP VIEW */}
      {viewState === 'setup' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-white">Configurazione</h2>
          <input 
            type="text" value={newSchedaName} onChange={(e) => setNewSchedaName(e.target.value)}
            className="w-full bg-surface-secondary border border-surface-tertiary p-4 rounded-2xl text-white" placeholder="Nome Scheda..."
          />
          <Stepper label="Giorni" value={newSchedaDays} onChange={setNewSchedaDays} step={1} unit="giorni" />
          <Button variant="primary" fullWidth onClick={proceedToBuilder}>Avanti</Button>
        </div>
      )}

      {/* 3. BUILDER VIEW */}
      {viewState === 'builder' && (
        <div className="space-y-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {Object.keys(workoutRoutine).map(day => (
              <button key={day} onClick={() => setActiveBuilderDay(day)} className={`px-5 py-2 rounded-xl text-xs font-black ${activeBuilderDay === day ? 'bg-primary text-black' : 'bg-surface-secondary text-text-secondary'}`}>
                {day}
              </button>
            ))}
          </div>
          <Card className="space-y-3">
            {workoutRoutine[activeBuilderDay]?.map((ex, i) => (
              <div key={ex.instanceId} className="flex justify-between items-center bg-surface-secondary p-3 rounded-xl border border-surface-tertiary">
                <span className="font-bold text-sm">{ex.name}</span>
                <span className="text-[10px] text-text-secondary">{ex.sets}x{ex.reps} @ {ex.weight}kg</span>
              </div>
            ))}
            <Button variant="secondary" fullWidth onClick={() => setIsCatalogOpen(true)}><Plus size={16} className="mr-2" /> Aggiungi</Button>
          </Card>
          <Button variant="primary" fullWidth onClick={handleSaveFinalScheda}>Salva Scheda</Button>
        </div>
      )}

      {/* MODALI (Catalog & Config) */}
      {isCatalogOpen && (
        <div className="fixed inset-0 bg-surface z-50 p-6 overflow-y-auto">
          <button onClick={() => setIsCatalogOpen(false)}><X className="text-white" /></button>
          <h2 className="text-2xl font-black my-6">Seleziona Esercizio</h2>
          {EXERCISE_CATALOG.map(ex => (
            <button key={ex.id} onClick={() => setConfiguringExercise(ex)} className="w-full text-left p-4 bg-surface-secondary rounded-2xl mb-2 font-bold">{ex.name}</button>
          ))}
        </div>
      )}

      {configuringExercise && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end">
          <Card className="w-full rounded-t-3xl">
            <h3 className="text-xl font-black mb-4">Configura {configuringExercise.name}</h3>
            <div className="space-y-3 mb-6">
              <Stepper label="Set" value={targetSets} onChange={setTargetSets} />
              <Stepper label="Reps" value={targetReps} onChange={setTargetReps} />
              <Stepper label="Peso" value={targetWeight} onChange={setTargetWeight} unit="kg" />
              <Stepper label="Recupero" value={targetRest} onChange={setTargetRest} unit="s" />
            </div>
            <Button variant="primary" fullWidth onClick={confirmAndAddExercise}>Conferma</Button>
          </Card>
        </div>
      )}
    </div>
  );
};
