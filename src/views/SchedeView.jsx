import React, { useState } from 'react';
import { Card, Button, Stepper } from '../components/UI';
import { Plus, Trash2, CheckCircle2, Circle, CalendarDays, Search, X, Dumbbell, ChevronRight, Edit2 } from 'lucide-react';

// ... [Mantieni il tuo EXERCISE_CATALOG, MUSCLE_GROUPS e EQUIPMENT_TYPES invariati]

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

  const startCreation = () => { setEditingId(null); setNewSchedaName(''); setNewSchedaDays(2); setViewState('setup'); };
  const handleEditScheda = (scheda) => { setEditingId(scheda.id); setNewSchedaName(scheda.name); setNewSchedaDays(scheda.daysCount); setWorkoutRoutine(JSON.parse(JSON.stringify(scheda.routine))); setActiveBuilderDay('G1'); setViewState('builder'); };
  const proceedToBuilder = () => { if (!newSchedaName.trim()) return; if (!editingId) { const initialRoutine = {}; for (let i = 1; i <= newSchedaDays; i++) initialRoutine[`G${i}`] = []; setWorkoutRoutine(initialRoutine); } setActiveBuilderDay('G1'); setViewState('builder'); };

  const handleSaveFinalScheda = () => {
    const schedaAggiornata = { id: editingId || Date.now(), name: newSchedaName.trim(), daysCount: newSchedaDays, routine: workoutRoutine, createdAt: new Date().toISOString() };
    if (editingId) { setSchede(schede.map(s => s.id === editingId ? schedaAggiornata : s)); if (schedaAttiva?.id === editingId) setSchedaAttiva(schedaAggiornata); } 
    else { setSchede([...schede, schedaAggiornata]); if (!schedaAttiva) setSchedaAttiva(schedaAggiornata); }
    setViewState('list');
  };

  const confirmAndAddExercise = () => {
    setWorkoutRoutine(prev => ({ ...prev, [activeBuilderDay]: [...(prev[activeBuilderDay] || []), { ...configuringExercise, instanceId: Date.now() + Math.random(), sets: targetSets, reps: targetReps, weight: targetWeight, rest: targetRest }] }));
    setConfiguringExercise(null); setIsCatalogOpen(false);
  };

  return (
    <div className="max-w-[420px] mx-auto min-h-screen bg-surface text-text-primary p-4 pb-32">
      {/* VIEW LISTA */}
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
                <div className="flex items-start justify-between">
                  <div className="flex-1 cursor-pointer flex gap-4" onClick={() => setSchedaAttiva(scheda)}>
                    {schedaAttiva?.id === scheda.id ? <CheckCircle2 className="text-primary" /> : <Circle className="text-text-tertiary" />}
                    <div>
                      <h3 className="font-black text-white">{scheda.name}</h3>
                      <p className="text-[10px] font-bold text-text-secondary uppercase">{scheda.daysCount} Giorni</p>
                    </div>
                  </div>
                  <button onClick={() => handleEditScheda(scheda)} className="p-2 text-text-tertiary hover:text-white"><Edit2 size={18} /></button>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* VIEW SETUP */}
      {viewState === 'setup' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-white">Configurazione</h2>
          <input type="text" value={newSchedaName} onChange={(e) => setNewSchedaName(e.target.value)} className="w-full bg-surface-secondary border border-surface-tertiary p-4 rounded-2xl text-white" placeholder="Nome Scheda..." />
          <Stepper label="Giorni" value={newSchedaDays} onChange={setNewSchedaDays} step={1} unit="giorni" />
          <Button variant="primary" fullWidth onClick={proceedToBuilder}>Avanti</Button>
        </div>
      )}

      {/* VIEW BUILDER */}
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
                <span className="font-bold text-sm text-white">{ex.name}</span>
                <span className="text-[10px] text-text-secondary">{ex.sets}x{ex.reps} @ {ex.weight}kg</span>
              </div>
            ))}
            <Button variant="secondary" fullWidth onClick={() => setIsCatalogOpen(true)}><Plus size={16} className="mr-2" /> Aggiungi</Button>
          </Card>
          <Button variant="primary" fullWidth onClick={handleSaveFinalScheda}>Salva Scheda</Button>
        </div>
      )}
    </div>
  );
};
