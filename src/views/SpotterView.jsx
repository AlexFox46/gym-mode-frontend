import React, { useState } from 'react';
import { Card } from '../components/UI';
import { Sparkles, TrendingUp, CheckCircle, XCircle, ShieldCheck, Dumbbell, Layers, X, ChevronRight } from 'lucide-react';

export const SpotterView = ({ 
  schedaAttiva, 
  pendingSuggestions = [], 
  onApplySuggestion, 
  onDismissSuggestion,
  onApplyAllSuggestions
}) => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [activeDetailDay, setActiveDetailDay] = useState('G1');

  const goalLabels = {
    hypertrophy: 'Ipertrofia',
    strength: 'Forza',
    endurance: 'Resistenza',
    maintenance: 'Mantenimento'
  };

  const currentGoal = schedaAttiva?.goal || 'hypertrophy';

  // Raggruppa i suggerimenti per giorno (es. G1, G2...)
  const suggestionsByDay = pendingSuggestions.reduce((acc, sug) => {
    const day = sug.day_name || 'G1';
    if (!acc[day]) acc[day] = [];
    acc[day].push(sug);
    return acc;
  }, {});

  const availableDays = Object.keys(suggestionsByDay);

  return (
    <div className="max-w-[420px] mx-auto min-h-screen bg-surface p-4 pb-32 select-none">
      {/* HEADER SPOTTER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={16} className="text-spotter animate-pulse" />
            <span className="text-[10px] font-black text-spotter uppercase tracking-widest">
              ASSISTENTE INTELLIGENTE
            </span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Spotter</h1>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-spotter/10 border border-spotter/30 flex items-center justify-center text-spotter shadow-spotter-subtle">
          <Sparkles size={24} />
        </div>
      </div>

      {/* SCHEDA ATTIVA & OBIETTIVO */}
      {schedaAttiva ? (
        <Card className="mb-6 border-spotter/30 bg-surface-secondary relative overflow-hidden shadow-spotter-subtle">
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-spotter/15 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex justify-between items-center mb-3">
            <div>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">Scheda Monitorata</span>
              <h3 className="text-lg font-black text-white">{schedaAttiva.name}</h3>
            </div>
            {/* Tag Obiettivo Pulito e Corto */}
            <span className="px-3 py-1 rounded-full bg-spotter/20 border border-spotter/40 text-spotter text-[10px] font-black uppercase tracking-wider">
              {goalLabels[currentGoal]}
            </span>
          </div>

          <div className="flex items-center gap-4 pt-3 border-t border-surface-tertiary/60 text-xs text-text-secondary">
            <div className="flex items-center gap-1.5">
              <Dumbbell size={14} className="text-spotter" />
              <span>{schedaAttiva.daysCount} Giorni</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Layers size={14} className="text-spotter" />
              <span>Analisi 4 Settimane</span>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="mb-6 text-center py-6">
          <p className="text-xs font-bold text-text-secondary">Attiva una scheda per sbloccare le analisi dello Spotter.</p>
        </Card>
      )}

      {/* SEZIONE SUGGERIMENTI */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
            <TrendingUp size={16} className="text-spotter" />
            Suggerimenti Ciclo
          </h2>
          {pendingSuggestions.length > 0 && (
            <span className="px-2.5 py-0.5 rounded-full bg-spotter text-black text-[10px] font-black uppercase">
              {pendingSuggestions.length} Modifiche
            </span>
          )}
        </div>

        {pendingSuggestions.length === 0 ? (
          <div className="border-2 border-dashed border-surface-tertiary rounded-3xl p-6 text-center space-y-2">
            <ShieldCheck size={32} className="text-spotter/60 mx-auto" />
            <p className="text-xs font-bold text-white">Nessun adeguamento necessario per ora</p>
            <p className="text-[11px] text-text-secondary">
              Lo Spotter raccoglie i tuoi dati per proporti consigli dopo 4 sessioni.
            </p>
          </div>
        ) : (
          /* CARD GLOBALE DEI SUGGERIMENTI MULTI-GIORNO */
          <Card className="bg-surface-secondary border-spotter/40 border-l-4 border-l-spotter p-5 space-y-4 shadow-spotter-glow relative">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-spotter" />
                <span className="text-xs font-black text-spotter uppercase tracking-wider">
                  Adeguamento Globale Scheda
                </span>
              </div>
              <span className="text-[10px] text-text-tertiary font-mono">
                {pendingSuggestions.length} Modifiche
              </span>
            </div>

            <p className="text-xs font-semibold text-white leading-relaxed">
              Lo Spotter ha rilevato un trend utile su più giorni della tua scheda. Puoi applicare tutte le variazioni insieme o controllare il dettaglio giorno per giorno.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-surface-tertiary">
              <button
                onClick={() => {
                  if (availableDays.length > 0) setActiveDetailDay(availableDays[0]);
                  setShowDetailModal(true);
                }}
                className="py-3 px-3 rounded-xl bg-surface border border-spotter/40 text-spotter font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-spotter/10 active:scale-95 transition-all"
              >
                <Layers size={14} /> Vedi Dettagli
              </button>
              <button
                onClick={() => onApplyAllSuggestions && onApplyAllSuggestions()}
                className="py-3 px-3 rounded-xl bg-gradient-to-r from-spotter to-spotter-dark text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-spotter-glow active:scale-95 transition-all"
              >
                <CheckCircle size={14} /> Applica Tutto
              </button>
            </div>
          </Card>
        )}
      </div>

      {/* INFO SPOTTER (TESTO SNELLITO) */}
      <Card className="bg-surface-secondary/60 border-surface-tertiary p-4 space-y-1.5">
        <h4 className="text-xs font-black text-spotter uppercase tracking-wider">Come funziona lo Spotter</h4>
        <p className="text-[11px] text-text-secondary leading-relaxed">
          Confronta carichi e fatica percepita ogni 4 settimane per proporti adeguamenti sicuri sul volume e sui pesi.
        </p>
      </Card>

      {/* MODAL DETTAGLI SLIDESHOW PER GIORNO (STILE SPOTTER) */}
      {showDetailModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-surface-secondary border border-spotter/40 rounded-3xl p-5 w-full max-w-[400px] max-h-[85vh] flex flex-col shadow-spotter-glow relative overflow-hidden">
            {/* Header Modal */}
            <div className="flex items-center justify-between pb-4 border-b border-surface-tertiary">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-spotter animate-pulse" />
                <h3 className="text-base font-black text-white">Dettaglio Modifiche</h3>
              </div>
              <button 
                onClick={() => setShowDetailModal(false)}
                className="p-1.5 rounded-xl bg-surface text-text-secondary hover:text-white border border-surface-tertiary"
              >
                <X size={18} />
              </button>
            </div>

            {/* TAB DEI GIORNI (G1, G2...) IN STILE SPOTTER */}
            <div className="flex gap-2 overflow-x-auto py-3 hide-scrollbar border-b border-surface-tertiary/60">
              {availableDays.map(day => (
                <button 
                  key={day} 
                  onClick={() => setActiveDetailDay(day)} 
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap active:scale-95 ${
                    activeDetailDay === day 
                      ? 'bg-spotter text-black shadow-spotter-subtle' 
                      : 'bg-surface text-text-secondary border border-surface-tertiary hover:border-spotter/40'
                  }`}
                >
                  Giorno {day}
                </button>
              ))}
            </div>

            {/* CONTENUTO DETTAGLI PER IL GIORNO SELEZIONATO */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {(suggestionsByDay[activeDetailDay] || []).map((sug) => (
                <Card key={sug.id} className="bg-surface border-spotter/30 p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-spotter uppercase tracking-wider">
                      Modifica Proposta
                    </span>
                    <span className="text-[10px] text-text-tertiary">
                      {new Date(sug.created_at).toLocaleDateString('it-IT')}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-white leading-relaxed">
                    {sug.message}
                  </p>

                  <div className="flex gap-2 pt-2 border-t border-surface-tertiary">
                    <button
                      onClick={() => {
                        if (onApplySuggestion) onApplySuggestion(sug.id);
                      }}
                      className="flex-1 py-2 px-3 rounded-xl bg-spotter/20 border border-spotter/40 text-spotter font-black text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 active:scale-95 transition-all"
                    >
                      <CheckCircle size={13} /> Accetta
                    </button>
                    <button
                      onClick={() => {
                        if (onDismissSuggestion) onDismissSuggestion(sug.id);
                      }}
                      className="py-2 px-3 rounded-xl bg-surface-tertiary text-text-secondary font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 hover:text-white active:scale-95 transition-all"
                    >
                      <XCircle size={13} /> Ignora
                    </button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Footer Modal */}
            <div className="pt-3 border-t border-surface-tertiary flex justify-end">
              <button
                onClick={() => setShowDetailModal(false)}
                className="w-full py-3 rounded-xl bg-surface border border-surface-tertiary text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1 hover:border-spotter/40"
              >
                Chiudi Dettagli
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
