import React from 'react';
import { Card } from '../components/UI';
import { Calendar as CalendarIcon, TrendingUp, Dumbbell, Activity } from 'lucide-react';

export const ProgressiView = () => {
  // --- CALENDARIO REALE ---
  const today = new Date();
  const optionsGiornoMese = { day: 'numeric', month: 'long', year: 'numeric' };
  const optionsGiornoSettimana = { weekday: 'long' };

  const dataCorrenteFormatted = today.toLocaleDateString('it-IT', optionsGiornoMese);
  const giornoSettimanaFormatted = today.toLocaleDateString('it-IT', optionsGiornoSettimana);

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); 

  const weekdays = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

  return (
    <div className="p-4 space-y-5 pb-28 bg-[#f0f4f8] dark:bg-neutral-950 min-h-screen font-sans">
      
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black text-[#15a34a] uppercase tracking-widest block flex items-center gap-1">
            <Activity size={12} /> Tracciamento Costanza
          </span>
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white capitalize tracking-tight mt-1">
            {giornoSettimanaFormatted}
          </h2>
          <p className="text-xs text-neutral-500 font-semibold">{dataCorrenteFormatted}</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white dark:bg-neutral-900 flex items-center justify-center shadow-sm border border-neutral-200/60 dark:border-neutral-800">
          <CalendarIcon size={24} className="text-[#15a34a]" />
        </div>
      </div>

      {/* CALENDARIO MENSILE */}
      <Card className="p-5 border-none ring-1 ring-neutral-200/50 dark:ring-neutral-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
          <span className="text-xs font-black tracking-widest text-neutral-400 uppercase">
            {today.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })}
          </span>
        </div>
        
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {weekdays.map(d => (
            <span key={d} className="text-[10px] font-black text-neutral-400 uppercase">{d}</span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {Array.from({ length: firstDayIndex === 0 ? 6 : firstDayIndex - 1 }).map((_, idx) => (
            <div key={`empty-${idx}`} className="h-9" />
          ))}

          {Array.from({ length: totalDaysInMonth }).map((_, idx) => {
            const dayNum = idx + 1;
            const isToday = dayNum === today.getDate();
            const hasWorkout = [2, 5, 8, 12, 14].includes(dayNum); // Mock dati

            return (
              <div
                key={dayNum}
                className={`h-9 flex items-center justify-center rounded-xl text-xs font-mono font-bold transition-all ${
                  isToday
                    ? 'bg-[#15a34a] text-white shadow-md'
                    : hasWorkout
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 text-[#15a34a] border border-emerald-200/50 dark:border-emerald-800/50'
                      : 'text-neutral-600 dark:text-neutral-400'
                }`}
              >
                {dayNum}
              </div>
            );
          })}
        </div>
      </Card>

      {/* STATISTICHE RAPIDE */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 border-none ring-1 ring-neutral-200/50 dark:ring-neutral-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-1.5 mb-2 text-neutral-400">
            <Dumbbell size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">Sessioni</span>
          </div>
          <span className="font-mono text-3xl font-black text-neutral-900 dark:text-white">5</span>
          <span className="text-[10px] font-semibold text-neutral-500 mt-1">Questo mese</span>
        </Card>
        
        <Card className="p-4 border-none ring-1 ring-neutral-200/50 dark:ring-neutral-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-1.5 mb-2 text-[#15a34a]">
            <TrendingUp size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">Volume</span>
          </div>
          <span className="font-mono text-3xl font-black text-[#15a34a]">12.4 <span className="text-sm font-sans text-neutral-400 font-bold">ton</span></span>
          <span className="text-[10px] font-semibold text-neutral-500 mt-1">Carico totale sollevato</span>
        </Card>
      </div>

    </div>
  );
};
