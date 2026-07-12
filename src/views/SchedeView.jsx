import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Card, Button } from '../components/UI';

export const SchedeView = () => {
  // 1. STATO DELLE SCHEDE (Meso-cicli strutturati su più giornate)
  const [schede, setSchede] = useState([
    { 
      id: '1', 
      name: 'Split A', 
      active: true, 
      desc: 'Creato 3 settimane fa · Ultimo: 2 giorni fa',
      giornate: [
        {
          nome: 'Giorno 1 - Spinta (Petto/Spalle/Tricipiti)',
          esercizi: [
            { id: 'ex-1', name: 'Panca Piana', category: 'Petto', equipment: 'Bilanciere', chosen_sets: 4, chosen_reps: 8, chosen_rest: 120, chosen_progression: 'NORMAL' },
            { id: 'ex-3', name: 'Chest Press Macchina', category: 'Petto', equipment: 'Macchina', chosen_sets: 3, chosen_reps: 10, chosen_rest: 90, chosen_progression: 'NORMAL' },
            { id: 'ex-17', name: 'Alzate Laterali', category: 'Spalle', equipment: 'Manubri', chosen_sets: 4, chosen_reps: 12, chosen_rest: 60, chosen_progression: 'DROP_SET' }
          ]
        },
        {
          nome: 'Giorno 2 - Trazione (Dorso/Bicipiti)',
          esercizi: [
            { id: 'ex-8', name: 'Lat Machine', category: 'Dorso', equipment: 'Macchina', chosen_sets: 4, chosen_reps: 8, chosen_rest: 90, chosen_progression: 'NORMAL' },
            { id: 'ex-7', name: 'Rematore Manubrio', category: 'Dorso', equipment: 'Manubri', chosen_sets: 3, chosen_reps: 10, chosen_rest: 90, chosen_progression: 'BACK_OFF' }
          ]
        }
      ]
    },
    { 
      id: '2', 
      name: 'Leg Day Focus', 
      active: false, 
      desc: 'Creato 2 mesi fa · Ultimo: 1 mese fa',
      giornate: [
        {
          nome: 'Giorno 1 - Gambe Complete',
          esercizi: [
            { id: 'ex-11', name: 'Squat Bilanciere', category: 'Gambe', equipment: 'Bilanciere', chosen_sets: 4, chosen_reps: 6, chosen_rest: 180, chosen_progression: 'NORMAL' },
            { id: 'ex-13', name: 'Leg Press', category: 'Gambe', equipment: 'Macchina', chosen_sets: 3, chosen_reps: 10, chosen_rest: 90, chosen_progression: 'NORMAL' }
          ]
        }
      ]
    }
  ]);

  // 2. STATI DI EDITING E CREAZIONE
  const [isEditing, setIsEditing] = useState(false);
  const [currentSchedaId, setCurrentSchedaId] = useState(null); // null = nuova scheda, string = modifica esistente
  const [schedaName, setSchedaName] = useState('');
  const [giornate, setGiornate] = useState([{ nome: 'Giorno 1', esercizi: [] }]);
  const [activeGiornataIndex, setActiveGiornataIndex] = useState(0);

  // 3. STATI FILTRI DIZIONARIO ESESCIZI
  const [dizionarioEsercizi, setDizionarioEsercizi] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tutti');
  const [selectedEquipment, setSelectedEquipment] = useState('Tutti');

  const categorie = ['Tutti', 'Petto', 'Dorso', 'Gambe', 'Spalle', 'Braccia', 'Core'];
  const attrezzature = ['Tutti', 'Macchina', 'Cavi', 'Manubri', 'Bilanciere', 'Corpo Libero'];

  useEffect(() => {
    async function fetchDizionario() {
      const { data, error } = await supabase.from('exercises').select('*');
      if (data && !error && data.length > 0) {
        setDizionarioEsercizi(data);
      } else {
        setDizionarioEsercizi([
          { id: 'ex-1', name: 'Panca Piana', category: 'Petto', equipment: 'Bilanciere' },
          { id: 'ex-2', name: 'Panca Inclinata Manubri', category: 'Petto', equipment: 'Manubri' },
          { id: 'ex-3', name: 'Chest Press Macchina', category: 'Petto', equipment: 'Macchina' },
          { id: 'ex-4', name: 'Fly Cavi Petto', category: 'Petto', equipment: 'Cavi' },
          { id: 'ex-5', name: 'Push-up Petto', category: 'Petto', equipment: 'Corpo Libero' },
          { id: 'ex-6', name: 'Rematore Bilanciere', category: 'Dorso', equipment: 'Bilanciere' },
          { id: 'ex-7', name: 'Rematore Manubrio', category: 'Dorso', equipment: 'Manubri' },
          { id: 'ex-8', name: 'Lat Machine', category: 'Dorso', equipment: 'Macchina' },
          { id: 'ex-9', name: 'Pulley Basso', category: 'Dorso', equipment: 'Cavi' },
          { id: 'ex-10', name: 'Trazioni alla Sbarra', category: 'Dorso', equipment: 'Corpo Libero' },
          { id: 'ex-11', name: 'Squat Bilanciere', category: 'Gambe', equipment: 'Bilanciere' },
          { id: 'ex-13', name: 'Leg Press', category: 'Gambe', equipment: 'Macchina' }
        ]);
      }
    }
    if (isEditing) fetchDizionario();
  }, [isEditing]);

  // INIZIALIZZA MODALITÀ NUOVA SCHEDA
  const handleNuovaScheda = () => {
    setCurrentSchedaId(null);
    setSchedaName('');
    setGiornate([{ nome: 'Giorno 1', esercizi: [] }]);
    setActiveGiornataIndex(0);
    setIsEditing(true);
  };

  // 4. FIX: ABILITA LA MODIFICA DI UNA SCHEDA ESISTENTE
  const handleModificaScheda = (scheda) => {
    setCurrentSchedaId(scheda.id);
    setSchedaName(scheda.name);
    // Carica le giornate e gli esercizi reali salvati in memoria
    setGiornate(scheda.giornate ? JSON.parse(JSON.stringify(scheda.giornate)) : [{ nome: 'Giorno 1', esercizi: [] }]);
    setActiveGiornataIndex(0);
    setIsEditing(true);
  };

  const toggleAttiva = (id) => {
    setSchede(schede.map(s => s.id === id ? { ...s, active: true } : { ...s, active: false }));
  };

  const eliminaScheda = (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questa scheda? Non perderai lo storico dei log associati.")) {
      setSchede(schede.filter(s => s.id !== id));
    }
  };

  // GESTIONE MULTI-GIORNATA
  const aggiungiGiornata = () => {
    const nuovoIndice = giornate.length + 1;
    setGiornate([...giornate, { nome: `Giorno ${nuovoIndice}`, esercizi: [] }]);
    setActiveGiornataIndex(giornate.length);
  };

  const rimuoviGiornata = (indexIndex) => {
    if (giornate.length <= 1) return;
    const filtrate = giornate.filter((_, i) => i !== indexIndex);
    setGiornate(filtrate);
    setActiveGiornataIndex(Math.max(0, indexIndex - 1));
  };

  const aggiungiEsercizioAGiornata = (ex) => {
    const copiaGiornate = [...giornate];
    copiaGiornate[activeGiornataIndex].esercizi.push({
      ...ex,
      chosen_sets: 4,
      chosen_reps: 8,
      chosen_rest: 90,
      chosen_progression: 'NORMAL' // Iniezione pattern predittivo di base
    });
    setGiornate(copiaGiornate);
  };

  const updateExerciseParam = (exIdx, field, value) => {
    const copiaGiornate = [...giornate];
    copiaGiornate[activeGiornataIndex].esercizi[exIdx][field] = value;
    setGiornate(copiaGiornate);
  };

  const rimuoviEsercizioDaGiornata = (exIdx) => {
    const copiaGiornate = [...giornate];
    copiaGiornate[activeGiornataIndex].esercizi = copiaGiornate[activeGiornataIndex].esercizi.filter((_, i) => i !== exIdx);
    setGiornate(copiaGiornate);
  };

  // SALVATAGGIO COMBINATO (UPDATE O INSERT)
  const salvaScheda = () => {
    if (!schedaName.trim()) return alert("Inserisci un nome per la scheda.");
    
    const haEsercizi = giornate.some(g => g.esercizi.length > 0);
    if (!haEsercizi) return alert("Aggiungi almeno un esercizio in una giornata.");

    if (currentSchedaId) {
      // Logica di Modifica (Aggiornamento record esistente)
      setSchede(schede.map(s => s.id === currentSchedaId ? {
        ...s,
        name: schedaName,
        giornate: giornate
      } : s));
      alert("Scheda modificata con successo!");
    } else {
      // Logica di Inserimento Nuova
      setSchede([...schede, {
        id: crypto.randomUUID(),
        name: schedaName,
        active: false,
        desc: 'Creato adesso · Ultimo: Mai',
        giornate: giornate
      }]);
      alert("Nuova scheda multi-giorno creata!");
    }
    setIsEditing(false);
  };

  const eserciziFiltrati = dizionarioEsercizi.filter((ex) => {
    const matchSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'Tutti' || ex.category === selectedCategory;
    const matchEquipment = selectedEquipment === 'Tutti' || ex.equipment === selectedEquipment;
    return matchSearch && matchCategory && matchEquipment;
  });

  // --- INTERFACCIA EDITOR MULTI-GIORNO (CREAZIONE / MODIFICA) ---
  if (isEditing) {
    return (
      <div className="p-4 space-y-4 font-sans animate-fade-in pb-28">
        <div className="flex justify-between items-center border-b border-neutral-200 dark:border-neutral-800 pb-3">
          <h2 className="text-h3 font-bold text-neutral-950 dark:text-white">
            {currentSchedaId ? 'Modifica Scheda' : 'Nuova Scheda'}
          </h2>
          <Button size="small" variant="secondary" onClick={() => setIsEditing(false)}>Annulla</Button>
        </div>

        {/* Input Nome Scheda */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-neutral-500 uppercase">Nome Macro-Scheda</label>
          <input 
            type="text" 
            placeholder="Es. Split 3 Giorni, Meso-Ciclo Forza..." 
            value={schedaName}
            onChange={(e) => setSchedaName(e.target.value)}
            className="h-11 px-3 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 rounded-md focus:outline-none text-sm dark:text-white"
          />
        </div>

        {/* CONTROLLO DELLE GIORNATE (TAB INTERNE DENTRO L'EDITOR) */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-500 uppercase block">Suddivisione Giornate (Split)</label>
          <div className="flex flex-wrap gap-1.5 items-center">
            {giornate.map((giornata, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveGiornataIndex(idx)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  activeGiornataIndex === idx 
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950' 
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
                }`}
              >
                G{idx + 1}
              </button>
            ))}
            <button 
              type="button" 
              onClick={aggiungiGiornata}
              className="px-2.5 py-1.5 border border-dashed border-neutral-400 text-neutral-500 rounded-md text-xs font-bold"
            >
              + Aggiungi Giorno
            </button>
          </div>
        </div>

        {/* DETTAGLIO GIORNATA SELEZIONATA */}
        <Card className="bg-neutral-50/50 dark:bg-neutral-900/30">
          <div className="flex justify-between items-center mb-3">
            <input 
              type="text"
              value={giornate[activeGiornataIndex]?.nome || ''}
              onChange={(e) => {
                const copia = [...giornate];
                copia[activeGiornataIndex].nome = e.target.value;
                setGiornate(copia);
              }}
              className="bg-transparent border-b border-neutral-300 font-bold text-sm dark:text-white focus:outline-none focus:border-focus py-0.5 w-3/4"
            />
            {giornate.length > 1 && (
              <button 
                type="button" 
                onClick={() => rimuoviGiornata(activeGiornataIndex)}
                className="text-xs text-error font-semibold"
              >
                Elimina Giorno
              </button>
            )}
          </div>

          {/* FILTRA DIZIONARIO PER INSERIMENTO NELLA GIORNATA ATTIVA */}
          <div className="bg-white dark:bg-neutral-900 p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 space-y-3 mt-4">
            <span className="text-xs font-bold text-neutral-500 uppercase block">Aggiungi Esercizio in questa giornata</span>
            <input 
              type="text"
              placeholder="🔍 Cerca esercizio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-9 px-3 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 rounded text-xs dark:text-white"
            />
            
            {/* Filtri a capo automatico */}
            <div className="flex flex-wrap gap-1">
              {categorie.map(cat => (
                <button key={cat} type="button" onClick={() => setSelectedCategory(cat)} className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${selectedCategory === cat ? 'bg-success text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600'}`}>{cat}</button>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {attrezzature.map(att => (
                <button key={att} type="button" onClick={() => setSelectedEquipment(att)} className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${selectedEquipment === att ? 'bg-focus text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600'}`}>{att}</button>
              ))}
            </div>

            {/* Lista verticale degli esercizi filtrati */}
            <div className="max-h-36 overflow-y-auto border border-neutral-100 dark:border-neutral-800 rounded divide-y divide-neutral-100 dark:divide-neutral-800 px-2">
              {eserciziFiltrati.map((ex) => (
                <div key={ex.id} className="flex justify-between items-center py-2 text-xs">
                  <span className="font-bold text-neutral-800 dark:text-neutral-200 uppercase">{ex.name}</span>
                  <button type="button" onClick={() => aggiungiEsercizioAGiornata(ex)} className="text-success font-bold px-2 py-1 bg-success/10 rounded">+ Inserisci</button>
                </div>
              ))}
            </div>
          </div>

          {/* LISTA ESERCIZI PIANIFICATI PER IL GIORNO CORRENTE */}
          <div className="space-y-3 mt-4">
            <span className="text-xs font-bold text-neutral-400 uppercase block">Esercizi pianificati per oggi ({giornate[activeGiornataIndex]?.esercizi.length || 0})</span>
            {giornate[activeGiornataIndex]?.esercizi.length === 0 ? (
              <p className="text-xs italic text-neutral-400 text-center py-4">Nessun movimento inserito in questo giorno.</p>
            ) : (
              giornate[activeGiornataIndex].esercizi.map((ex, idx) => (
                <div key={idx} className="p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-neutral-900 dark:text-white uppercase">{ex.name}</span>
                    <button type="button" onClick={() => rimuoviEsercizioDaGiornata(idx)} className="text-[11px] text-error font-semibold">Rimuovi</button>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[11px]">
                    <div>
                      <span className="text-[9px] font-bold text-neutral-400 block uppercase">Set</span>
                      <input type="number" value={ex.chosen_sets} onChange={(e) => updateExerciseParam(idx, 'chosen_sets', parseInt(e.target.value) || 0)} className="w-full h-8 border rounded px-1.5 dark:bg-neutral-950 font-mono" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-neutral-400 block uppercase">Reps</span>
                      <input type="number" value={ex.chosen_reps} onChange={(e) => updateExerciseParam(idx, 'chosen_reps', parseInt(e.target.value) || 0)} className="w-full h-8 border rounded px-1.5 dark:bg-neutral-950 font-mono" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-neutral-400 block uppercase">Rest (s)</span>
                      <input type="number" value={ex.chosen_rest} onChange={(e) => updateExerciseParam(idx, 'chosen_rest', parseInt(e.target.value) || 0)} className="w-full h-8 border rounded px-1.5 dark:bg-neutral-950 font-mono" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* CTA DI SALVATAGGIO GENERALE */}
        <div className="pt-2">
          <Button size="large" variant="primary" fullWidth onClick={salvaScheda}>
            {currentSchedaId ? 'SALVA MODIFICHE SCHEDA' : 'SALVA NUOVA SCHEDA IN ARCHIVIO'}
          </Button>
        </div>
      </div>
    );
  }

  // --- RENDERING VISTA ARCHIVIO PRINCIPALE ---
  return (
    <div className="p-4 space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-h2 text-neutral-950 dark:text-white font-bold">Schede</h2>
        <Button size="small" className="bg-success text-white font-bold" onClick={handleNuovaScheda}>
          + Nuova
        </Button>
      </div>

      <div className="space-y-3">
        {schede.map((scheda) => (
          <Card key={scheda.id} className={scheda.active ? 'border-2 border-success' : ''}>
            <div className="flex items-start gap-3">
              <input 
                type="radio" 
                name="scheda-attiva-group"
                checked={scheda.active} 
                onChange={() => toggleAttiva(scheda.id)} 
                className="mt-1.5 accent-success w-4 h-4" 
              />
              <div className="flex-1">
                <span className="text-xs uppercase tracking-wider font-bold text-neutral-400 block">
                  {scheda.active ? '🚀 Meso-Cycle Attivo' : 'Archivio'}
                </span>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-0.5">"{scheda.name}"</h3>
                <p className="text-xs text-neutral-500 mt-1">{scheda.desc}</p>
                
                {/* Visualizzazione rapida delle giornate pianificate incluse in questa scheda */}
                <div className="mt-2 flex flex-col gap-0.5 text-[11px] text-neutral-400 font-medium">
                  {scheda.giornate?.map((g, i) => (
                    <span key={i}>• {g.nome} ({g.esercizi.length} esercizi)</span>
                  ))}
                </div>
                
                <div className="mt-3 flex gap-2">
                  {/* FIX: Il bottone Modifica ora apre i dati reali per cambiarli retroattivamente */}
                  <Button size="small" variant="secondary" onClick={() => handleModificaScheda(scheda)}>
                    Modifica
                  </Button>
                  {!scheda.active && (
                    <Button size="small" variant="secondary" className="text-success border-success/30" onClick={() => toggleAttiva(scheda.id)}>
                      Attiva
                    </Button>
                  )}
                  <Button size="small" variant="destructive" onClick={() => eliminaScheda(scheda.id)}>
                    Elimina
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};