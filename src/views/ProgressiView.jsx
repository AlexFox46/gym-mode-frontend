import React, { useState } from 'react';
import { Card } from '../components/UI';
import { Calendar as CalendarIcon, TrendingUp, Dumbbell, Activity, ChevronLeft, ChevronRight } from 'lucide-react';

export const ProgressiView = ({ storico = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
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
  const tonnellaggioMensile = logsInViewMonth.reduce((acc, log) => acc + (log.tonnage || 0), 0).toFixed(1);

  return (
    <div className="max-w-[420px] mx-auto min-h-screen bg-surface p-4 pb-32">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-[10px] font-black text-primary uppercase tracking-widest block flex items-center gap-2">
            <Activity size={14} /> Tracciamento Costanza
          </span>
          <h2 className="text-2xl font-black text-text-primary capitalize tracking-tight mt-1">
            {currentDate.toLocaleDateString('it-IT', { month: 'long' })}
          </h2>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-surface-secondary flex items-center justify-center border border-surface-tertiary">
          <CalendarIcon size={24} className="text-primary" />
        </div>
      </div>

      {/* CALENDARIO */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-6 border-b border-surface-tertiary pb-4">
          <button onClick={() => setCurrentDate(new Date(currentYear, currentMonth - 1, 1))} className="p-2 text-text-tertiary hover:text-primary"><ChevronLeft size={20}/></button>
          <span className="text-xs font-black tracking-widest text-white uppercase">
            {currentDate.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })}
          </span>
          <button onClick={() => setCurrentDate(new Date(currentYear, currentMonth + 1, 1))} className="p-2 text-text-tertiary hover:text-primary"><ChevronRight size={20}/></button>
        </div>
        
        <div className="grid grid-cols-7 gap-2 text-center mb-4">
          {weekdays.map(d => <span key={d} className="text-[10px] font-black text-text-tertiary uppercase">{d}</span>)}
        </div>

        <div className="grid grid-cols-7 gap-2 text-center">
          {Array.from({ length: firstDayIndex }).map((_, idx) => <div key={idx} />)}
          {Array.from({ length: totalDaysInMonth }).map((_, idx) => {
            const dayNum = idx + 1;
            const dailyLog = logsInViewMonth.find(l => new Date(l.date).getDate() === dayNum);
            
            return (
              <div key={dayNum} className={`h-12 flex flex-col items-center justify-center rounded-xl ${dailyLog ? 'bg-primary text-black' : 'bg-surface-secondary text-text-primary'}`}>
                <span className="text-xs font-mono font-black">{dayNum}</span>
                {dailyLog && <span className="text-[7px] font-black uppercase">{dailyLog.dayName}</span>}
              </div>
            );
          })}
        </div>
      </Card>

      {/* STATISTICHE */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center gap-2 mb-2 text-text-secondary">
            <Dumbbell size={16} />
            <span className="text-[10px] font-black uppercase">Sessioni</span>
          </div>
          <span className="text-4xl font-black text-white">{sessioniMensili}</span>
        </Card>
        
        <Card>
          <div className="flex items-center gap-2 mb-2 text-primary">
            <TrendingUp size={16} />
            <span className="text-[10px] font-black uppercase">Volume</span>
          </div>
          <span className="text-3xl font-black text-primary">{tonnellaggioMensile} <span className="text-sm font-sans text-text-secondary">ton</span></span>
        </Card>
      </div>
    </div>
  );
};
