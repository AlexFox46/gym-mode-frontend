import { supabase } from '../supabaseClient';
import { EXERCISE_LIBRARY, getEnrichedExercise } from '../data/exerciseLibrary';

/**
 * Fetch tutti gli esercizi dal database Supabase ed arricchimento con metadati e attrezzature verificate
 * Risolve ed unifica i nomi in inglese verso i nomi canonici in italiano per evitare duplicati.
 */
export const fetchEsercizi = async () => {
  try {
    const { data, error } = await supabase
      .from('exercises')
      .select('id, name, movement_pattern, primary_muscle_group, equipment, default_rest_time')
      .order('name', { ascending: true });

    let fetchedExercises = [];
    if (!error && data && data.length > 0) {
      fetchedExercises = data.map(ex => getEnrichedExercise({
        id: ex.id,
        name: ex.name,
        primary_muscle_group: ex.primary_muscle_group,
        muscle: ex.primary_muscle_group,
        equipment: ex.equipment,
        movement_pattern: ex.movement_pattern,
        default_rest_time: ex.default_rest_time
      })).filter(Boolean);
    }

    // Map per unificare e deduplicare per nome canonico in italiano
    const mergedMap = new Map();

    // 1. Popola con gli esercizi della libreria master in italiano
    EXERCISE_LIBRARY.forEach(libEx => {
      const enriched = getEnrichedExercise(libEx);
      if (enriched && enriched.name) {
        mergedMap.set(enriched.name.toLowerCase(), enriched);
      }
    });

    // 2. Unisci gli esercizi provenienti da Supabase (se un nome inglese come 'Bench Press' corrisponde ad un alias di 'Panca Piana', si converte nel nome italiano e sovrascrive/unifica senza duplicati)
    fetchedExercises.forEach(dbEx => {
      const enriched = getEnrichedExercise(dbEx);
      if (enriched && enriched.name) {
        const key = enriched.name.toLowerCase();
        // Mantiene l'oggetto arricchito con il nome italiano unico
        if (!mergedMap.has(key)) {
          mergedMap.set(key, enriched);
        } else {
          // Unifica preferendo i campi completi
          const existing = mergedMap.get(key);
          mergedMap.set(key, { ...existing, ...enriched, name: existing.name });
        }
      }
    });

    return Array.from(mergedMap.values()).sort((a, b) => a.name.localeCompare(b.name, 'it'));
  } catch (err) {
    console.error('Errore inatteso nel fetch degli esercizi:', err);
    return EXERCISE_LIBRARY.map(ex => getEnrichedExercise(ex));
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
      isActive: scheda.is_active || false,
      goal: scheda.goal || 'hypertrophy'
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

    // Filtra l'esercizio stesso ed unifica gli alernativi in italiano senza duplicati
    const altMap = new Map();
    fallbackEx.forEach(e => {
      if (e.id !== exerciseId) {
        const enriched = getEnrichedExercise(e);
        if (enriched && enriched.name) {
          const key = enriched.name.toLowerCase();
          if (!altMap.has(key)) {
            altMap.set(key, {
              id: enriched.id || e.id,
              name: enriched.name,
              muscle: enriched.primary_muscle_group || e.primary_muscle_group,
              equipment: enriched.equipment || e.equipment
            });
          }
        }
      }
    });

    const grouped = {
      'Sostituti Suggeriti': Array.from(altMap.values())
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
    const payload = {
      user_id: userId,
      scheme_id: logEntry.schemeId || null,
      date: logEntry.date,
      scheda_name: logEntry.schedaName,
      day_name: logEntry.dayName,
      duration_minutes: logEntry.durationMinutes,
      tonnage: logEntry.tonnage || 0,
      exercises_data: {
        routine: logEntry.exercisesData || [],
        jointDiscomfort: logEntry.jointDiscomfort || []
      },
      fatigue_level: logEntry.fatigueLevel || null,
      energy_level: logEntry.energyLevel || null,
      hardest_exercise_id: logEntry.hardestExerciseId || null,
      joint_discomfort: logEntry.jointDiscomfort || []
    };

    let { error } = await supabase
      .from('workout_logs')
      .insert([payload]);

    if (error && (error.message?.includes('joint_discomfort') || error.code === 'PGRST204')) {
      // Fallback se la colonna specifica non esiste nello schema Supabase
      delete payload.joint_discomfort;
      const res = await supabase.from('workout_logs').insert([payload]);
      error = res.error;
    }

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
      .select('id, scheme_id, date, scheda_name, day_name, duration_minutes, tonnage, exercises_data, fatigue_level, energy_level, hardest_exercise_id')
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (error) {
      console.error('Errore nel fetch dello storico allenamenti:', error);
      return [];
    }

    return data.map(log => ({
      id: log.id,
      schemeId: log.scheme_id,
      date: log.date,
      schedaName: log.scheda_name,
      dayName: log.day_name,
      durationMinutes: log.duration_minutes,
      tonnage: log.tonnage,
      exercisesData: Array.isArray(log.exercises_data) ? log.exercises_data : (log.exercises_data?.routine || []),
      jointDiscomfort: log.joint_discomfort || (log.exercises_data && !Array.isArray(log.exercises_data) ? log.exercises_data.jointDiscomfort : []) || [],
      fatigueLevel: log.fatigue_level,
      energyLevel: log.energy_level,
      hardestExerciseId: log.hardest_exercise_id
    }));
  } catch (err) {
    console.error('Errore inatteso nel fetch storico:', err);
    return [];
  }
};

/**
 * Salva o aggiorna la scheda utente con l'obiettivo scelto
 */
export const updateSchedaGoal = async (schedaId, goal) => {
  try {
    const { error } = await supabase
      .from('workout_schemes')
      .update({ goal })
      .eq('id', schedaId);

    if (error) {
      console.error('Errore aggiornamento obiettivo scheda:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Errore inatteso aggiornamento obiettivo:', err);
    return false;
  }
};

/**
 * Recupera i suggerimenti dello Spotter pendenti per una determinata scheda e giorno
 */
export const fetchPendingSpotterSuggestions = async (userId, schemeId, dayName) => {
  try {
    const { data, error } = await supabase
      .from('spotter_suggestions')
      .select('*')
      .eq('user_id', userId)
      .eq('scheme_id', schemeId)
      .eq('day_name', dayName)
      .eq('is_applied', false)
      .eq('is_dismissed', false)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Errore recupero suggerimenti Spotter:', error);
      return [];
    }
    return data;
  } catch (err) {
    console.error('Errore inatteso suggerimenti Spotter:', err);
    return [];
  }
};

/**
 * Aggiorna lo stato di un suggerimento Spotter (accettato / ignorato)
 */
export const updateSpotterSuggestionStatus = async (suggestionId, { isApplied, isDismissed }) => {
  try {
    const { error } = await supabase
      .from('spotter_suggestions')
      .update({ 
        is_applied: isApplied ?? false,
        is_dismissed: isDismissed ?? false 
      })
      .eq('id', suggestionId);

    if (error) {
      console.error('Errore aggiornamento stato suggerimento:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Errore inatteso aggiornamento suggerimento:', err);
    return false;
  }
};

