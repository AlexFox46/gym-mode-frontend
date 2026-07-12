import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function App() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      const { data, error } = await supabase
        .from('exercises')
        .select('id, name, primary_muscle_group, equipment');
      
      if (error) {
        console.error('Errore:', error);
      } else {
        setExercises(data || []);
      }
      setLoading(false);
    };

    fetchExercises();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Gym Mode - Esercizi</h1>
      {loading ? (
        <p>Caricamento...</p>
      ) : (
        <ul>
          {exercises.map(ex => (
            <li key={ex.id}>
              <strong>{ex.name}</strong> - {ex.primary_muscle_group} ({ex.equipment})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}