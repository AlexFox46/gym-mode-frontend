import React, { useState } from 'react';
import { Card, Button, Stepper } from '../components/UI';
import { Plus, X, Search, CheckCircle2, Circle, Edit2 } from 'lucide-react';

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
  const [error, setError] = useState(''); // Stato errore correttamente inizializzato qui

  const [searchQuery, setSearchQuery] = useState('');
  const [muscleFilter, setMuscleFilter] = useState('');
  const [equipmentFilter, setEquipmentFilter] = useState('');

  const filteredExercises = EXERCISE_CATALOG.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMuscle = muscleFilter ? ex.muscle === muscleFilter : true;
    const matchesEquip = equipmentFilter ? ex.equipment === equipmentFilter : true;
    return matchesSearch && matchesMuscle && matchesEquip;
  });

  const startCreation = () => { setEditingId(null); setNewSchedaName(''); setNewSchedaDays(2); setViewState('setup'); setError(''); };
  
  const proceedToBuilder = () => { 
    if (!newSchedaName.trim()) {
      setError('Devi inserire un nome per la scheda per continuare');
      return;
    }
    const initialRoutine = {}; 
    for (let i = 1; i <= newSchedaDays; i++) initialRoutine[`G${i}`] = []; 
    setWorkoutRoutine(initialRoutine);
    setActiveBuilderDay('G1'); 
    setViewState('builder'); 
  };

  const addExerciseToDay = (ex) => {
    setWorkoutRoutine(prev => ({
      ...prev,
      [activeBuilderDay]: [...(prev[activeBuilderDay] || []), { ...ex, instanceId: Date.now() + Math.random(), sets: 4, reps: 10, weight: 20 }]
    }));
    setIsCatalogOpen(false);
  };

  return (
    <div className="max-w-[420px] mx-auto min-h-screen bg-surface p-4 pb-32 text-text-primary">
      
      {viewState === 'list' && (
        <>
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-black text-white">Le mie Schede</h1>
            <Button variant="primary" onClick={startCreation}><Plus size={16} /></Button>
          </div>
          <div className="space-y-4">
            {schede.map((s) => (
              <Card key={s.id} onClick={() => setSchedaAttiva(s)} className={schedaAttiva?.id === s.id ? 'border-primary' : ''}>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">{s.name}</span>
                  <button onClick={(e) => { e.stopPropagation(); }}><Edit2 size={16} /></button>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {viewState === 'setup' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-white">Configurazione</h2>
          <div className="space-y-2">
            <input 
              type="text" 
              value={newSchedaName} 
              onChange={(e) => { setNewSchedaName(e.target.value); if(error) setError(''); }} 
              className={`w-full bg-surface-secondary p-4 rounded-2xl text-white border ${error ? 'border-red-500' : 'border-surface-tertiary'}`} 
              placeholder="Nome Scheda..." 
            />
            {error && <p className="text-red-500 text-[10px] font-black uppercase ml-2">{error}</p>}
          </div>
          <Stepper label="Giorni" value={newSchedaDays} onChange={setNewSchedaDays} step={1} unit="giorni" />
          <Button variant="primary" fullWidth onClick={proceedToBuilder}>Avanti</Button>
        </div>
      )}

      {viewState === 'builder' && (
        <div className="space-y-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {Object.keys(workoutRoutine).map(day => (
              <button key={day} onClick={() => setActiveBuilderDay(day)} className={`px-4 py-2 rounded-xl font-black text-xs ${activeBuilderDay === day ? 'bg-primary text-black' : 'bg-surface-secondary'}`}>
                {day}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {workoutRoutine[activeBuilderDay]?.map((ex, i) => (
              <Card key={ex.instanceId} className="flex justify-between items-center">
                <span className="font-bold text-sm">{ex.name}</span>
              </Card>
            ))}
            <Button variant="secondary" fullWidth onClick={() => setIsCatalogOpen(true)}>+ Aggiungi Esercizio</Button>
          </div>

          {isCatalogOpen && (
            <div className="fixed inset-0 bg-surface z-50 p-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black">Scegli Esercizio</h2>
                <button onClick={() => setIsCatalogOpen(false)}><X size={24} /></button>
              </div>
              <div className="space-y-4 mb-6">
                <input type="text" placeholder="Cerca..." onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-surface-secondary p-3 rounded-xl border border-surface-tertiary" />
                <div className="grid grid-cols-2 gap-2">
                  <select onChange={(e) => setMuscleFilter(e.target.value)} className="bg-surface-secondary p-3 rounded-xl text-xs font-black uppercase border border-surface-tertiary">
                    <option value="">Tutti i Muscoli</option>
                    {MUSCLE_GROUPS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <select onChange={(e) => setEquipmentFilter(e.target.value)} className="bg-surface-secondary p-3 rounded-xl text-xs font-black uppercase border border-surface-tertiary">
                    <option value="">Attrezzatura</option>
                    {EQUIPMENT_TYPES.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                {filteredExercises.map(ex => (
                  <div key={ex.id} className="flex justify-between items-center bg-surface-secondary p-4 rounded-xl border border-surface-tertiary">
                    <div>
                      <p className="font-bold text-sm text-white">{ex.name}</p>
                      <p className="text-[10px] text-text-secondary uppercase">{ex.muscle} • {ex.equipment}</p>
                    </div>
                    <button onClick={() => addExerciseToDay(ex)} className="bg-primary text-black p-2 rounded-lg">
                      <Plus size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
