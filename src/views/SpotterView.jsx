import React from 'react';
import { Card } from '../components/UI';
import { Sparkles, TrendingUp, CheckCircle, XCircle, ShieldCheck, Flame, Dumbbell } from 'lucide-react';

export const SpotterView = ({ 
  schedaAttiva, 
  pendingSuggestions = [], 
  onApplySuggestion, 
  onDismissSuggestion 
}) => {
  const goalLabels = {
    hypertrophy: 'Ipertrofia (Aumento Massa)',
    strength: 'Forza Massimale',
    endurance: 'Resistenza / Definizione',
    maintenance: 'Mantenimento'
  };

  const currentGoal = schedaAttiva?.goal || 'hypertrophy';

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
          
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">Scheda Monitorata</span>
              <h3 className="text-lg font-black text-white">{schedaAttiva.name}</h3>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-spotter/20 border border-spotter/40 text-spotter text-[10px] font-black uppercase tracking-wider">
              {goalLabels[currentGoal]}
            </span>
          </div>

          <div className="flex items-center gap-4 pt-3 border-t border-surface-tertiary/60 text-xs text-text-secondary">
            <div className="flex items-center gap-1.5">
              <Dumbbell size={14} className="text-spotter" />
              <span>{schedaAttiva.daysCount} Giorni/Settimana</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Flame size={14} className="text-spotter" />
              <span>Ciclo 4 Settimane</span>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="mb-6 text-center py-8">
          <p className="text-sm font-bold text-text-secondary">Attiva una scheda per sbloccare le analisi dello Spotter.</p>
        </Card>
      )}

      {/* SEZIONE SUGGERIMENTI PENDENTI */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
            <TrendingUp size={16} className="text-spotter" />
            Suggerimenti della Settimana
          </h2>
          {pendingSuggestions.length > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-spotter text-black text-[10px] font-black">
              {pendingSuggestions.length} Nuovi
            </span>
          )}
        </div>

        {pendingSuggestions.length === 0 ? (
          <div className="border-2 border-dashed border-surface-tertiary rounded-3xl p-6 text-center space-y-2">
            <ShieldCheck size={32} className="text-spotter/60 mx-auto" />
            <p className="text-xs font-bold text-white">Nessun adeguamento necessario per ora</p>
            <p className="text-[11px] text-text-secondary">
              Lo Spotter sta raccogliendo i dati dei tuoi allenamenti. I consigli appariranno al completamento del cluster di 4 sessioni.
            </p>
          </div>
        ) : (
          pendingSuggestions.map((sug) => (
            <Card 
              key={sug.id}
              className="bg-surface-secondary border-spotter/40 border-l-4 border-l-spotter p-4 space-y-3 shadow-spotter-subtle relative"
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-spotter uppercase tracking-wider">
                  Giorno {sug.day_name}
                </span>
                <span className="text-[10px] text-text-tertiary">
                  {new Date(sug.created_at).toLocaleDateString('it-IT')}
                </span>
              </div>

              <p className="text-xs font-semibold text-white leading-relaxed">
                {sug.message}
              </p>

              <div className="flex gap-2 pt-2 border-t border-surface-tertiary">
                <button
                  onClick={() => onApplySuggestion && onApplySuggestion(sug.id)}
                  className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-spotter to-spotter-dark text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-spotter-glow active:scale-95 transition-all"
                >
                  <CheckCircle size={14} /> Applica
                </button>
                <button
                  onClick={() => onDismissSuggestion && onDismissSuggestion(sug.id)}
                  className="py-2 px-3 rounded-xl bg-surface-tertiary text-text-secondary font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1 hover:text-white active:scale-95 transition-all"
                >
                  <XCircle size={14} /> Ignora
                </button>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* INFO SPOTTER */}
      <Card className="bg-surface-secondary/60 border-surface-tertiary p-4 space-y-2">
        <h4 className="text-xs font-black text-spotter uppercase tracking-wider">Come funziona lo Spotter?</h4>
        <p className="text-[11px] text-text-secondary leading-relaxed">
          Lo Spotter incrocia i tuoi carichi reali, le ripetizioni chiuse e la fatica percepita al termine di ogni sessione. Dopo 4 allenamenti dello stesso giorno, genera consigli personalizzati per incrementare o rimodulare la tua scheda in sicurezza.
        </p>
      </Card>
    </div>
  );
};
