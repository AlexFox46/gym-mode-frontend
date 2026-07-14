import React, { useState } from 'react';
import { Card } from '../components/UI';
import { Calendar as CalendarIcon, TrendingUp, Dumbbell, Activity, ChevronLeft, ChevronRight } from 'lucide-react';

export const ProgressiView = ({ storico = [] }) => {
  // Stato per la navigazione del calendario
  const [currentDate, setCurrentDate] = useState(new Date());

  const optionsGiornoMese = { day: 'numeric', month: 'long', year: 'numeric' };
  const optionsGiornoSettimana = { weekday: 'long' };

  // Data odierna per la visualizzazione testuale in alto
  const today = new Date();
  const dataCorrenteFormatted = today.toLocaleDateString('it-IT', optionsGiornoMese);
  const giornoSettimanaFormatted = today.toLocaleDateString('it-IT', optionsGiornoSettimana);

  // Variabili per il rendering della griglia basate su currentDate
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // getDay() restituisce 0 per Domenica, vogliamo che Lunedì sia 0 per l'Europa
  let firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); 
  firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  const weekdays = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

  const handlePrevMonth = () => setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentYear, currentMonth + 1, 1));

  // Filtriamo lo storico globale per trovare gli allenamenti del mese visualizzato
  const logsInViewMonth = storico.filter(log => {
    const logDate = new Date(log.date);
    return logDate.getFullYear() === currentYear && logDate.getMonth() === currentMonth;
  });

  // Calcolo statistiche dinamiche del mese
  const sessioniMensili = logsInViewMonth.length;
  const tonnellaggioMensile = logsInViewMonth.reduce((acc, log) => acc + (log.tonnage || 0), 0).toFixed(1);

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

      {/* CALENDARIO MENSILE DINAMICO */}
      <Card className="p-5 border-none ring-1 ring-neutral-200/50 dark:ring-neutral-800 shadow-sm space-y-4">
        
        {/* Controlli Navigazione Mese */}
        <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
          <button onClick={handlePrevMonth} className="p-1 text-neutral-400 hover:text-[#15a34a] transition-colors"><ChevronLeft size={20}/></button>
          <span className="text-xs font-black tracking-widest text-neutral-700 dark:text-white uppercase">
            {currentDate.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })}
          </span>
          <button onClick={handleNextMonth} className="p-1 text-neutral-400 hover:text-[#15a34a] transition-colors"><ChevronRight size={20}/></button>
        </div>
        
        {/* Intestazione Settimana */}
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {weekdays.map(d => (
            <span key={d} className="text-[10px] font-black text-neutral-400 uppercase">{d}</span>
          ))}
        </div>

        {/* Griglia Giorni */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {Array.from({ length: firstDayIndex }).map((_, idx) => (
            <div key={`empty-${idx}`} className="h-[42px]" />
          ))}

          {Array.from({ length: totalDaysInMonth }).map((_, idx) => {
            const dayNum = idx + 1;
            
            // Cerchiamo se c'è un log per questo specifico giorno
            const dailyLog = logsInViewMonth.find(log => {
              const logDate = new Date(log.date);
              return logDate.getDate() === dayNum;
            });

            // Controlla se il giorno renderizzato è esattamente OGGI
            const isToday = dayNum === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();

            return (
              <div
                key={dayNum}
                className={`h-[42px] flex flex-col items-center justify-center rounded-xl transition-all ${
                  dailyLog
                    ? 'bg-[#15a34a] text-white shadow-md'
                    : isToday
                      ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white ring-2 ring-neutral-300 dark:ring-neutral-700'
                      : 'text-neutral-600 dark:text-neutral-400'
                }`}
              >
                <span className="text-xs font-mono font-bold">{dayNum}</span>
                {/* Se c'è un log, mostra l'etichetta del giorno es. "G1" o "G2" */}
                {dailyLog && (
                  <span className="text-[8px] font-black uppercase tracking-widest text-emerald-100 mt-0.5 leading-none">
                    {dailyLog.dayName}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* STATISTICHE RAPIDE DINAMICHE */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 border-none ring-1 ring-neutral-200/50 dark:ring-neutral-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-1.5 mb-2 text-neutral-400">
            <Dumbbell size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">Sessioni</span>
          </div>
          <span className="font-mono text-3xl font-black text-neutral-900 dark:text-white">{sessioniMensili}</span>
          <span className="text-[10px] font-semibold text-neutral-500 mt-1">Nel mese selezionato</span>
        </Card>
        
        <Card className="p-4 border-none ring-1 ring-neutral-200/50 dark:ring-neutral-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-1.5 mb-2 text-[#15a34a]">
            <TrendingUp size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">Volume</span>
          </div>
          <span className="font-mono text-3xl font-black text-[#15a34a]">{tonnellaggioMensile} <span className="text-sm font-sans text-neutral-400 font-bold">ton</span></span>
          <span className="text-[10px] font-semibold text-neutral-500 mt-1">Carico totale sollevato</span>
        </Card>
      </div>

    </div>
  );
};
