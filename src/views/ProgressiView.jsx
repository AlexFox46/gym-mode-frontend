import React, { useState } from 'react';
import { Card, Button, Modal, Badge } from '../components/UI';
import { Calendar as CalendarIcon, TrendingUp, Dumbbell, Activity, ChevronLeft, ChevronRight, User, Settings, Sparkles, Trophy, Clock, RefreshCw, CheckCircle2 } from 'lucide-react';
import { SettingsView } from './SettingsView';
import { updateSchedaRoutine } from '../services/supabaseServices';

// Helper per ottenere data YYYY-MM-DD in timezone locale
const getLocalDateString = (dateObj) => {
  const d = new Date(dateObj);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const ProgressiView = ({ 
  storico = [], 
  user, 
  settings, 
  onSettingsChange, 
  onLogout,
  onNavigateToSpotter,
  schedaAttiva,
  setSchede,
  setSchedaAttiva,
  onShowToast,
  pendingSuggestionsCount = 0
}) => {
  const [subView, setSubView] = useState('main'); // 'main' | 'settings'
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedLog, setSelectedLog] = useState(null);
  const [updatingRoutine, setUpdatingRoutine] = useState(false);

  if (subView === 'settings') {
    return (
      <SettingsView 
        settings={settings} 
        onSettingsChange={onSettingsChange} 
        onLogout={onLogout} 
        onBack={() => setSubView('main')} 
      />
    );
  }

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  let firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  const weekdays = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

  const logsInViewMonth = storico.filter(log => {
    const logDate = new Date(log.date);
    return logDate.getFullYear() === currentYear && logDate.getMonth() === currentMonth;
  });

  const sessioniMensili = logsInViewMonth.length;
  const chiliMensili = Math.round(logsInViewMonth.reduce((acc, log) => acc + (log.tonnage || 0), 0));

  // Calcolo dei Record Personali (PR) principali dallo storico
  const personalRecordsMap = {};
  storico.forEach(log => {
    if (Array.isArray(log.exercisesData)) {
      log.exercisesData.forEach(ex => {
        const exName = ex.name || ex.exerciseName;
        if (!exName) return;
        
        let maxW = 0;
        if (Array.isArray(ex.setsData)) {
          ex.setsData.forEach(s => {
            const w = parseFloat(s.weight) || 0;
            if (w > maxW) maxW = w;
          });
        } else if (ex.weight) {
          maxW = parseFloat(ex.weight) || 0;
        }

        if (maxW > 0) {
          if (!personalRecordsMap[exName] || maxW > personalRecordsMap[exName]) {
            personalRecordsMap[exName] = maxW;
          }
        }
      });
    }
  });

  const topRecords = Object.entries(personalRecordsMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  // Funzione per applicare gli esercizi svolti in questo log come nuova routine del giorno per la scheda attiva
  const handleApplyLogToActiveScheda = async (log) => {
    if (!schedaAttiva || !schedaAttiva.id) {
      if (onShowToast) onShowToast('Nessuna scheda attiva trovata', 'error');
      return;
    }

    const dayToUpdate = log.dayName || 'G1';
    const exercisesToUpdate = log.exercisesData || [];

    if (exercisesToUpdate.length === 0) {
      if (onShowToast) onShowToast('Nessun esercizio presente in questa sessione', 'error');
      return;
    }

    try {
      setUpdatingRoutine(true);
      
      const newRoutine = {
        ...(schedaAttiva.routine || {}),
        [dayToUpdate]: exercisesToUpdate
      };

      const success = await updateSchedaRoutine(schedaAttiva.id, newRoutine);

      if (success) {
        const updatedSchedaAttiva = { ...schedaAttiva, routine: newRoutine };
        if (setSchedaAttiva) setSchedaAttiva(updatedSchedaAttiva);
        if (setSchede) {
          setSchede(prevSchede => 
            prevSchede.map(s => s.id === schedaAttiva.id ? updatedSchedaAttiva : s)
          );
        }
        if (onShowToast) onShowToast(`Scheda Attiva (${dayToUpdate}) aggiornata con successo! 💪`, 'success');
        setSelectedLog(null);
      } else {
        if (onShowToast) onShowToast('Errore durante l\'aggiornamento della scheda', 'error');
      }
    } catch (err) {
      console.error('Errore durante l\'aggiornamento della routine:', err);
      if (onShowToast) onShowToast('Errore durante l\'aggiornamento della scheda', 'error');
    } finally {
      setUpdatingRoutine(false);
    }
  };

  return (
    <div className="max-w-[420px] mx-auto min-h-screen bg-surface p-4 pb-32 select-none">
      
      {/* CARD PROFILO INTEGRATA CON TASTO INGRANAGGIO */}
      <Card className="mb-6 bg-surface-secondary border-surface-tertiary p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-black shadow-lg font-black text-lg">
            <User size={24} />
          </div>
          <div>
            <h3 className="text-base font-black text-white leading-tight">
              {user?.email ? user.email.split('@')[0] : 'Il mio Profilo'}
            </h3>
            <p className="text-[11px] font-medium text-text-secondary">
              {user?.email || 'Atleta Gym Mode'}
            </p>
          </div>
        </div>

        {/* Pulsante Ingranaggio per accedere alle Impostazioni */}
        <button
          onClick={() => setSubView('settings')}
          className="w-10 h-10 rounded-2xl bg-surface flex items-center justify-center text-text-secondary hover:text-white border border-surface-tertiary hover:border-primary active:scale-95 transition-all"
          title="Impostazioni"
        >
          <Settings size={20} />
        </button>
      </Card>

      {/* HEADER PROGRESSI */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[10px] font-black text-primary uppercase tracking-widest block flex items-center gap-2">
            <Activity size={14} /> Progressi & Analisi
          </span>
          <h2 className="text-2xl font-black text-text-primary capitalize tracking-tight mt-1">
            {currentDate.toLocaleDateString('it-IT', { month: 'long' })}
          </h2>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-surface-secondary flex items-center justify-center border border-surface-tertiary">
          <CalendarIcon size={22} className="text-primary" />
        </div>
      </div>

      {/* CARD SPOTTER AI (LINK INTELLIGENTE A SPOTTER VIEW) */}
      <Card className="mb-6 bg-gradient-to-r from-spotter/15 via-surface-secondary to-surface-secondary border border-spotter/40 p-4 space-y-3 shadow-spotter-glow relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-spotter animate-pulse" />
            <span className="text-xs font-black text-spotter uppercase tracking-wider">
              Spotter AI
            </span>
          </div>
          {pendingSuggestionsCount > 0 && (
            <span className="px-2.5 py-0.5 rounded-full bg-spotter text-black text-[10px] font-black uppercase">
              {pendingSuggestionsCount} Modifiche
            </span>
          )}
        </div>

        <p className="text-xs font-medium text-white leading-relaxed">
          {pendingSuggestionsCount > 0 
            ? "Lo Spotter ha analizzato i tuoi ultimi allenamenti e propone dei miglioramenti per la tua scheda."
            : "Lo Spotter monitora la tua scheda attiva per suggerirti i giusti carichi e ottimizzare le tue sessioni."}
        </p>

        {onNavigateToSpotter && (
          <button
            onClick={onNavigateToSpotter}
            className="w-full py-2.5 px-4 rounded-xl bg-spotter text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-spotter-subtle active:scale-95 transition-all hover:bg-spotter/90"
          >
            <Sparkles size={15} />
            Vedi Suggerimenti
          </button>
        )}
      </Card>

      {/* CALENDARIO DELLA COSTANZA */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-4 border-b border-surface-tertiary pb-3">
          <button onClick={() => setCurrentDate(new Date(currentYear, currentMonth - 1, 1))} className="p-2 text-white hover:text-primary transition-colors">
            <ChevronLeft size={20}/>
          </button>
          <span className="text-xs font-black tracking-widest text-white uppercase">
            {currentDate.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })}
          </span>
          <button onClick={() => setCurrentDate(new Date(currentYear, currentMonth + 1, 1))} className="p-2 text-white hover:text-primary transition-colors">
            <ChevronRight size={20}/>
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-2 text-center mb-3">
          {weekdays.map(d => <span key={d} className="text-[10px] font-black text-text-tertiary uppercase">{d}</span>)}
        </div>

        <div className="grid grid-cols-7 gap-2 text-center">
          {Array.from({ length: firstDayIndex }).map((_, idx) => <div key={idx} />)}
          {Array.from({ length: totalDaysInMonth }).map((_, idx) => {
            const dayNum = idx + 1;
            const targetDateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
            
            // Trova il log corrispondente confrontando la data YYYY-MM-DD locale
            const dailyLog = logsInViewMonth.find(l => {
              if (!l.date) return false;
              const logDateStr = getLocalDateString(l.date);
              return logDateStr === targetDateStr;
            });
            
            return (
              <button 
                key={dayNum} 
                onClick={() => {
                  if (dailyLog) {
                    setSelectedLog(dailyLog);
                  }
                }}
                disabled={!dailyLog}
                className={`h-11 flex flex-col items-center justify-center rounded-xl transition-all ${
                  dailyLog 
                    ? 'bg-primary text-black shadow-md active:scale-95 cursor-pointer hover:opacity-90 ring-2 ring-primary/40' 
                    : 'bg-surface-secondary text-text-primary cursor-default'
                }`}
              >
                <span className="text-xs font-mono font-black">{dayNum}</span>
                {dailyLog && <span className="text-[7px] font-black uppercase">{dailyLog.dayName}</span>}
              </button>
            );
          })}
        </div>
      </Card>

      {/* SINTESI METRICHE (SESSIONI & CHILI SOLLEVATI) */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2 text-text-secondary">
            <Dumbbell size={16} />
            <span className="text-[10px] font-black uppercase">Sessioni</span>
          </div>
          <span className="text-3xl font-black text-white">{sessioniMensili}</span>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2 text-primary">
            <TrendingUp size={16} />
            <span className="text-[10px] font-black uppercase">Chili Sollevati</span>
          </div>
          <span className="text-2xl font-black text-primary">{chiliMensili.toLocaleString('it-IT')} <span className="text-xs font-sans text-text-secondary">kg</span></span>
        </Card>
      </div>

      {/* RECORD PERSONALI PRINCIPALI (TOP CARICHI REGISTRATI) */}
      {topRecords.length > 0 && (
        <Card className="bg-surface-secondary border-surface-tertiary p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-surface-tertiary pb-2">
            <div className="flex items-center gap-2 text-white">
              <Trophy size={16} className="text-yellow-400" />
              <h4 className="text-xs font-black uppercase tracking-wider">Top Record di Carico</h4>
            </div>
            <span className="text-[10px] font-bold text-text-tertiary uppercase">Max Peso</span>
          </div>

          <div className="space-y-2">
            {topRecords.map(([name, weight]) => (
              <div key={name} className="flex items-center justify-between text-xs py-1">
                <span className="font-semibold text-white truncate max-w-[200px]">{name}</span>
                <span className="font-mono font-black text-primary bg-surface px-2.5 py-1 rounded-lg border border-surface-tertiary">
                  {weight} kg
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* MODAL DETTAGLIO ALLENAMENTO SVOLTO DAL CALENDARIO */}
      {selectedLog && (
        <Modal 
          isOpen={true} 
          onClose={() => setSelectedLog(null)}
          title={`Allenamento ${selectedLog.dayName}`}
        >
          <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
            <div className="flex items-center justify-between bg-surface p-3 rounded-2xl border border-surface-tertiary">
              <div>
                <span className="text-[10px] font-bold uppercase text-primary block">{selectedLog.schedaName}</span>
                <span className="text-xs font-medium text-text-secondary">
                  {new Date(selectedLog.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs font-mono font-black text-white block">{selectedLog.durationMinutes || 0} min</span>
                  <span className="text-[9px] text-text-tertiary uppercase">Durata</span>
                </div>
                <div className="text-right border-l border-surface-tertiary pl-3">
                  <span className="text-xs font-mono font-black text-primary block">{selectedLog.tonnage || 0} kg</span>
                  <span className="text-[9px] text-text-tertiary uppercase">Volume</span>
                </div>
              </div>
            </div>

            {/* LISTA ESERCIZI REGISTRATI NEL LOG */}
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-text-secondary tracking-widest block">
                Esercizi Sollevati ({selectedLog.exercisesData?.length || 0})
              </span>
              {(selectedLog.exercisesData || []).map((ex, idx) => (
                <div key={idx} className="p-3 bg-surface p-3 rounded-2xl border border-surface-tertiary flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-white text-xs leading-tight">{ex.name}</h5>
                    <p className="text-[10px] font-mono text-primary mt-0.5">
                      {ex.sets} set × {ex.reps} rip @ {ex.weight} kg
                    </p>
                  </div>
                  <Badge variant="default" className="font-mono">
                    {ex.rest || 90}s
                  </Badge>
                </div>
              ))}
            </div>

            {/* PULSANTE PER APPLICARE LA SESSIONE ALLA SCHEDA ATTIVA */}
            {schedaAttiva && (
              <div className="pt-2">
                <Button
                  variant="primary"
                  fullWidth
                  loading={updatingRoutine}
                  onClick={() => handleApplyLogToActiveScheda(selectedLog)}
                  className="flex items-center justify-center gap-2"
                >
                  <RefreshCw size={16} />
                  AGGIORNA SCHEDA ATTIVA ({selectedLog.dayName})
                </Button>
                <p className="text-[9px] text-text-tertiary text-center mt-2">
                  Imposta gli esercizi e i pesi di questa sessione come base per la giornata {selectedLog.dayName} della tua scheda attiva.
                </p>
              </div>
            )}
          </div>
        </Modal>
      )}

    </div>
  );
};


