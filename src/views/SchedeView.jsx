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

  const proceedToBuilder
