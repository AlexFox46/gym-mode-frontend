import { supabase } from '../supabaseClient';

/**
 * Fetch tutti gli esercizi dal database Supabase
 */
export const fetchEsercizi = async () => {
  try {
    const { data, error } = await supabase
      .from('exercises')
      .select('id, name, movement_pattern, primary_muscle_group, equipment, default_rest_time')
      .order('name', { ascending: true });

    if (error) {
      console.error('Errore nel fetch degli esercizi:', error);
      return [];
    }

    return data.map(ex => ({
      id: ex.id,
      name: ex.name,
      muscle: ex.primary_muscle_group,
      equipment: ex.equipment,
      movement_pattern: ex.movement_pattern,
      default_rest_time: ex.default_rest_time
    }));
  } catch (err) {
    console.error('Errore inatteso nel fetch degli esercizi:', err);
    return [];
  }
};

/**
 * Assicura che esista un profilo utente nel DB
 */
export const createProfileIfNotExists = async (userId) => {
  try {
    const { error: selectError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();

    if (selectError && selectError.code === 'PGRST116') {
      const { error: insertError } = await supabase
        .from('profiles')
        .insert([{ id: userId }]);

      if (insertError) {
        console.error('Errore nella creazione del profilo:', insertError);
        return false;
      }
      console.log('✅ Profilo creato automaticamente');
    }
    return true;
  } catch (err) {
    console.error('Errore nel controllo profilo:', err);
    return false;
  }
};

/**
 * Fetch delle schede dell'utente
 */
export const fetchSchede = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('workout_schemes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Errore nel fetch delle schede:', error);
      return [];
    }

    return data.map(scheda => ({
      id: scheda.id,
      name: scheda.name,
      daysCount: scheda.days_count || 2,
      routine: scheda.routine || {},
      isActive: scheda.is_active || false
    }));
  } catch (err) {
    console.error('Errore inatteso nel fetch delle schede:', err);
    return [];
  }
};

/**
 * Imposta un listener real-time sulle schede dell'utente
 */
export const setupSchedeListener = (userId, onUpdate) => {
  const channel = supabase
    .channel(`workout_schemes:${userId}`)
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'workout_schemes',
      filter: `user_id=eq.${userId}`
    }, () => {
      onUpdate();
    })
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

/**
 * Recupera le alternative di un esercizio con sistema di fallback intelligente
 */
export const fetchExerciseAlternatives = async (exerciseId, muscle, movementPattern) => {
  const tierNames = {
    'TIER_1': 'Sostituti Ottimi (Tier 1)',
    'TIER_2': 'Sostituti Buoni (Tier 2)',
    'TIER_3': 'Sostituti Accettabili (Tier 3)'
  };

  // 1. Tenta la chiamata RPC di Supabase se definita
  if (exerciseId) {
    try {
      const { data: altIds, error: rpcError } = await supabase
        .rpc('get_exercise_alternatives', {
          p_exercise_id: exerciseId
        });

      if (!rpcError && altIds && altIds.length > 0) {
        const ids = altIds.map(a => a.alternative_exercise_id);
        const { data: exercises } = await supabase
          .from('exercises')
          .select('id, name, primary_muscle_group, equipment, movement_pattern')
          .in('id', ids);

        if (exercises && exercises.length > 0) {
          const grouped = {};
          altIds.forEach(alt => {
            const ex = exercises.find(e => e.id === alt.alternative_exercise_id);
            if (ex) {
              const tierLabel = tierNames[alt.tier] || alt.tier || 'Alternativi Suggeriti';
              if (!grouped[tierLabel]) grouped[tierLabel] = [];
              grouped[tierLabel].push({
                id: ex.id,
                name: ex.name,
                muscle: ex.primary_muscle_group,
                equipment: ex.equipment
              });
            }
          });
          if (Object.keys(grouped).length > 0) return grouped;
        }
      }
    } catch (err) {
      console.warn('RPC get_exercise_alternatives non riuscita, attivo il fallback:', err);
    }
  }

  // 2. FALLBACK ROBUSTO: Se RPC non c'è o non restituisce dati, cerca per gruppo muscolare / pattern
  try {
    let query = supabase.from('exercises').select('id, name, primary_muscle_group, equipment, movement_pattern');
    
    if (muscle) {
      query = query.eq('primary_muscle_group', muscle);
    }

    const { data: fallbackEx, error: fallbackErr } = await query.limit(10);

    if (fallbackErr || !fallbackEx || fallbackEx.length === 0) {
      return {};
    }

    // Filtra l'esercizio stesso
    const filtered = fallbackEx.filter(e => e.id !== exerciseId);

    const grouped = {
      'Sostituti Suggeriti': filtered.map(ex => ({
        id: ex.id,
        name: ex.name,
        muscle: ex.primary_muscle_group,
        equipment: ex.equipment
      }))
    };

    return grouped;
  } catch (fallbackErr) {
    console.error('Errore nel fallback delle alternative:', fallbackErr);
    return {};
  }
};

/**
 * Salva un log di allenamento completato su Supabase
 */
export const saveWorkoutLog = async (userId, logEntry) => {
  try {
    const { error } = await supabase
      .from('workout_logs')
      .insert([{
        user_id: userId,
        date: logEntry.date,
        scheda_name: logEntry.schedaName,
        day_name: logEntry.dayName,
        duration_minutes: logEntry.durationMinutes,
        tonnage: logEntry.tonnage || 0
      }]);

    if (error) {
      console.error('Errore nel salvataggio del log allenamento:', error);
      return false;
    }
    console.log('✅ Log allenamento salvato su Supabase');
    return true;
  } catch (err) {
    console.error('Errore inatteso nel salvataggio log:', err);
    return false;
  }
};

/**
 * Recupera lo storico degli allenamenti dell'utente da Supabase
 */
export const fetchWorkoutLogs = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('workout_logs')
      .select('id, date, scheda_name, day_name, duration_minutes, tonnage')
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (error) {
      console.error('Errore nel fetch dello storico allenamenti:', error);
      return [];
    }

    return data.map(log => ({
      id: log.id,
      date: log.date,
      schedaName: log.scheda_name,
      dayName: log.day_name,
      durationMinutes: log.duration_minutes,
      tonnage: log.tonnage
    }));
  } catch (err) {
    console.error('Errore inatteso nel fetch storico:', err);
    return [];
  }
};
