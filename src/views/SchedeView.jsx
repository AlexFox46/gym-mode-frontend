import React, { useState } from 'react';
import { Card, Button, Stepper } from '../components/UI';
import { Plus, Trash2, CheckCircle2, Circle, CalendarDays } from 'lucide-react';

export const SchedeView = ({ schede, setSchede, schedaAttiva, setSchedaAttiva }) => {
  // Stato locale per gestire l'apertura del form di creazione
  const [isCreating, setIsCreating] = useState(false);
  const [newSchedaName, setNewSchedaName] = useState('');
  const [newSchedaDays, setNewSchedaDays] = useState(2); // Default: 2 giorni di allenamento

  // --- HANDLERS ---
  const handleCreateScheda = () => {
    if (!newSchedaName.trim()) return;

    const nuovaScheda = {
      id: Date.now(),
      name: newSchedaName.trim(),
      daysCount: newSchedaDays, // Salviamo quanti giorni ha (G1, G2, ecc.)
      createdAt: new Date().toISOString(),
    };

    const schedeAggiornate = [...schede, nuovaScheda];
    setSchede(schedeAggiornate);
    
    // Se è la prima scheda che crei, impostala automaticamente come attiva
    if (!schedaAttiva) {
      setSchedaAttiva(nuovaScheda);
    }

    // Reset del form
    setIsCreating(false);
    setNewSchedaName('');
    setNewSchedaDays(2);
  };

  const handleDelete = (idToRemove) => {
    const conferma = window.confirm("Sei sicuro di voler eliminare questa scheda?");
    if (!conferma) return;

    const schedeFiltrate = schede.filter(s => s.id !== idToRemove);
    setSchede(schedeFiltrate);

    // Se stiamo eliminando la scheda attualmente attiva, rimuoviamola anche dallo stato attivo
    if (schedaAttiva && schedaAttiva.id === idToRemove) {
      setSchedaAttiva(schedeFiltrate.length > 0 ? schedeFiltrate[0] : null);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f0f4f8] dark:bg-neutral-950 p-4 font-sans space-y-5 pb-28">
      
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black text-[#15a34a] uppercase tracking-widest block">Gestione Workout</span>
          <h1 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">Le mie Schede</h1>
        </div>
        {!isCreating && (
          <Button variant="primary" size="small" onClick={() => setIsCreating(true)} className="gap-1.5 rounded-xl font-bold bg-[#15a34a] border-none">
            <Plus size={16} /> Nuova
          </Button>
        )}
      </div>

      {/* FORM CREAZIONE NUOVA SCHEDA (Visibile solo se isCreating è true) */}
      {isCreating && (
        <Card className="p-5 border-[#15a34a]/30 shadow-md ring-1 ring-[#15a34a]/10 space-y-4 animate-fade-in">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block">Nome Scheda</label>
            <input
              type="text"
              placeholder="Es. Ipertrofia Push/Pull/Legs"
              value={newSchedaName}
              onChange={(e) => setNewSchedaName(e.target.value)}
              className="w-full h-11 px-3 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 rounded-xl text-sm font-bold dark:text-white focus:outline-none focus:ring-2 focus:ring-[#15a34a]"
              autoFocus
            />
          </div>

          {/* Usiamo il componente Stepper globale del tuo Design System per i giorni! */}
          <div className="bg-neutral-50 dark:bg-neutral-800/50 p-3 rounded-xl border border-neutral-100 dark:border-neutral-800">
            <Stepper 
              label="Giorni a settimana" 
              value={newSchedaDays} 
              onChange={(val) => setNewSchedaDays(Math.min(7, Math.max(1, val)))} 
              step={1} 
              unit="gg" 
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button variant="secondary" fullWidth onClick={() => setIsCreating(false)} className="rounded-xl border-neutral-200 dark:border-neutral-700 text-neutral-500">
              Annulla
            </Button>
            <Button variant="primary" fullWidth onClick={handleCreateScheda} disabled={!newSchedaName.trim()} className="rounded-xl bg-[#15a34a]">
              Salva Scheda
            </Button>
          </div>
        </Card>
      )}

      {/* LISTA DELLE SCHEDE */}
      {schede.length === 0 && !isCreating ? (
        <div className="text-center py-12 px-4 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-3xl">
          <CalendarDays size={48} className="mx-auto text-neutral-300 dark:text-neutral-700 mb-3" />
          <h3 className="text-lg font-black text-neutral-700 dark:text-neutral-300">Nessuna scheda</h3>
          <p className="text-xs text-neutral-400 mt-1 font-semibold">Crea il tuo primo programma di allenamento per iniziare.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {schede.map((scheda) => {
            const isActive = schedaAttiva && schedaAttiva.id === scheda.id;

            return (
              <Card 
                key={scheda.id} 
                className={`p-0 overflow-hidden transition-all duration-200 ${
                  isActive 
                    ? 'border-[#15a34a] ring-1 ring-[#15a34a] shadow-md' 
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                }`}
              >
                <div className="p-4 flex items-start justify-between">
                  <div 
                    className="flex-1 cursor-pointer flex gap-3" 
                    onClick={() => setSchedaAttiva(scheda)}
                  >
                    <div className="mt-1">
                      {isActive ? (
                        <CheckCircle2 size={24} className="text-[#15a34a]" fill="#15a34a" color="white" />
                      ) : (
                        <Circle size={24} className="text-neutral-300 dark:text-neutral-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-neutral-900 dark:text-white tracking-tight">{scheda.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest bg-neutral-100 dark:bg-neutral-800 text-neutral-500 px-2 py-0.5 rounded-md">
                          <CalendarDays size={12} />
                          {scheda.daysCount} Giorni (G1 - G{scheda.daysCount})
                        </span>
                        {isActive && (
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#15a34a] bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-md">
                            Attiva
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleDelete(scheda.id)}
                    className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

    </div>
  );
};
