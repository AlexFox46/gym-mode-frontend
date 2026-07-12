import React, { useState } from 'react';
import { Card } from '../components/UI';

export const ProgressiView = () => {
  // Controlli per i filtri temporali superiori
  const [timeframe, setTimeframe] = useState('M'); // 'W' | 'M' | 'Y'
  
  // Esercizio target selezionato per la curva di forza (1RM)
  const [targetExercise, setTargetExercise] = useState('Panca Piana');

  // 1. DATA ENTRY DINAMICO PER HEATMAP / CALENDARIO DI COSTANZA
  const last5WeeksDays = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    active: [0, 1, 3, 4, 6, 7, 8, 9, 10, 13, 14, 15, 16, 17, 20, 21, 23, 24, 27, 28, 33, 34].includes(i)
  }));

  const currentWeekDays = [
    { name: 'D', active: true },
    { name: 'L', active: true },
    { name: 'M', active: false },
    { name: 'M', active: true },
    { name: 'G', active: true },
    { name: 'V', active: false },
    { name: 'S', active: true }
  ];

  const yearlyMonths = [
    { name: 'GEN', rate: '80%' }, { name: 'FEB', rate: '75%' }, { name: 'MAR', rate: '90%' },
    { name: 'APR', rate: '60%' }, { name: 'MAG', rate: '85%' }, { name: 'GIU', rate: '40%' },
    { name: 'LUG', rate: '65%' }, { name: 'AGO', rate: '20%' }, { name: 'SET', rate: '70%' },
    { name: 'OTT', rate: '85%' }, { name: 'NOV', rate: '90%' }, { name: 'DIC', rate: '95%' }
  ];

  return (
    <div className="p-4 space-y-5 font-sans animate-fade-in">
      <h2 className="text-h2 text-neutral-950 dark:text-white font-bold tracking-tight">Progressi</h2>

      {/* Segmented Control Superiore (Filtro Temporale) */}
      <div className="flex bg-neutral-100 dark:bg-neutral-800 p-1 rounded-md">
        {[
          { key: 'W', label: 'Settimana' },
          { key: 'M', label: 'Mese' },
          { key: 'Y', label: 'Anno' }
        ].map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTimeframe(t.key)}
            className={`flex-1 py-2 text-center text-xs font-bold rounded transition-all select-none ${
              timeframe === t.key ? 'bg-success text-white shadow-sm' : 'text-neutral-600 dark:text-neutral-400'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 2. CALENDARIO DINAMICO ADATTIVO IN BASE AL TIMEFRAME */}
      <Card>
        {timeframe === 'W' && (
          <div className="animate-fade-in">
            <h3 className="text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase mb-3">Compliance Settimanale</h3>
            <div className="flex justify-between items-center gap-2">
              {currentWeekDays.map((day, idx) => (
                <div key={idx} className="flex flex-col items-center flex-1 gap-1">
                  <span className="text-[10px] font-bold text-neutral-400">{day.name}</span>
                  <div className={`w-full h-8 rounded-md flex items-center justify-center font-bold text-xs ${day.active ? 'bg-success text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400'}`}>
                    {day.active ? '✓' : '—'}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-neutral-500 font-medium">Hai completato 5 sessioni su 7 pianificate.</div>
          </div>
        )}

        {timeframe === 'M' && (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase">Costanza — Ultime 5 Settimane</h3>
              <span className="text-xs text-success font-mono font-bold">22/35 giorni (63%)</span>
            </div>
            <div className="grid grid-cols-7 gap-1.5 justify-items-center text-[10px] font-bold text-neutral-400 mb-1.5">
              {['DOM','LUN','MAR','MER','GIO','VEN','SAB'].map(d => <span key={d}>{d}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {last5WeeksDays.map((day) => (
                <div key={day.id} className={`aspect-square w-full rounded-sm transition-colors ${day.active ? 'bg-success' : 'bg-neutral-100 dark:bg-neutral-800'}`} />
              ))}
            </div>
          </div>
        )}

        {timeframe === 'Y' && (
          <div className="animate-fade-in space-y-3">
            <h3 className="text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase">Frequenza Mensile Annuale</h3>
            <div className="grid grid-cols-3 gap-2">
              {yearlyMonths.map((m, idx) => (
                <div key={idx} className="p-2 bg-neutral-50 dark:bg-neutral-950 rounded border border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
                  <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">{m.name}</span>
                  <span className="text-xs font-mono font-bold text-success">{m.rate}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Widget dei Macro Dati Totali */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="text-center py-3"><span className="text-2xl font-mono font-bold text-success block">12</span><span className="text-[10px] font-bold text-neutral-500 uppercase">Sessioni</span></Card>
        <Card className="text-center py-3"><span className="text-2xl font-mono font-bold text-success block">47.2k<span className="text-xs font-sans text-neutral-400 ml-0.5">kg</span></span><span className="text-[10px] font-bold text-neutral-500 uppercase">Volume Totale</span></Card>
      </div>

      {/* 3. IL GRAFICO DEL VOLUME DI ALLENAMENTO (RIPRODOTTO IDENTICO AL PROTOTIPO FIGMA) */}
      <Card>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase">Volume per Gruppo Muscolare (kg × rip)</h3>
          <div className="flex gap-2 text-[10px] font-bold text-neutral-400">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success" /> Petto</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-info" /> Dorso</span>
          </div>
        </div>
        
        {/* Grafico Lineare Pulito Multi-Asse strutturato in SVG Nativo responsivo */}
        <div className="w-full bg-neutral-50 dark:bg-neutral-950 rounded border border-neutral-200 dark:border-neutral-800 p-2">
          <svg viewBox="0 0 400 200" className="w-full h-auto overflow-visible">
            {/* Linee di griglia orizzontali di background */}
            <line x1="40" y1="20" x2="380" y2="20" stroke="#e2e8f0" strokeDasharray="4" className="dark:stroke-neutral-800" />
            <line x1="40" y1="70" x2="380" y2="70" stroke="#e2e8f0" strokeDasharray="4" className="dark:stroke-neutral-800" />
            <line x1="40" y1="120" x2="380" y2="120" stroke="#e2e8f0" strokeDasharray="4" className="dark:stroke-neutral-800" />
            <line x1="40" y1="170" x2="380" y2="170" stroke="#334155" className="dark:stroke-neutral-700" />

            {/* Etichette asse Y (Tonnellaggio Volume) */}
            <text x="10" y="25" className="text-[10px] font-mono fill-neutral-400 font-semibold">3400</text>
            <text x="10" y="75" className="text-[10px] font-mono fill-neutral-400 font-semibold">2550</text>
            <text x="10" y="125" className="text-[10px] font-mono fill-neutral-400 font-semibold">1700</text>
            <text x="15" y="175" className="text-[10px] font-mono fill-neutral-400 font-semibold">0</text>

            {/* CURVA 1: PETTO (Verde Success) */}
            <path d="M 60 130 L 160 110 L 260 90 L 360 40" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
            <circle cx="60" cy="130" r="4" fill="#16a34a" />
            <circle cx="160" cy="110" r="4" fill="#16a34a" />
            <circle cx="260" cy="90" r="4" fill="#16a34a" />
            <circle cx="360" cy="40" r="4" fill="#16a34a" />

            {/* CURVA 2: DORSO (Blu Info) */}
            <path d="M 60 90 L 160 100 L 260 70 L 360 55" fill="none" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
            <circle cx="60" cy="90" r="4" fill="#0284c7" />
            <circle cx="160" cy="100" r="4" fill="#0284c7" />
            <circle cx="260" cy="70" r="4" fill="#0284c7" />
            <circle cx="360" cy="55" r="4" fill="#0284c7" />

            {/* Etichette asse X (Orizzonte temporale settimane) */}
            <text x="50" y="195" className="text-[10px] font-mono fill-neutral-500 font-bold">Sett 1</text>
            <text x="150" y="195" className="text-[10px] font-mono fill-neutral-500 font-bold">Sett 2</text>
            <text x="250" y="195" className="text-[10px] font-mono fill-neutral-500 font-bold">Sett 3</text>
            <text x="350" y="195" className="text-[10px] font-mono fill-neutral-500 font-bold">Sett 4</text>
          </svg>
        </div>
      </Card>

      {/* 4. NUOVO GRAFICO INTEGRATO: STIMA DEL MASSIMALE REALE (1RM CURVE) */}
      <Card>
        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className="text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase">Trend Forza Stimata (1RM Teorico)</h3>
            <span className="text-[11px] text-neutral-400 mt-0.5 block">Formula di Brzycki applicata sui log</span>
          </div>
          <select
            value={targetExercise}
            onChange={(e) => setTargetExercise(e.target.value)}
            className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded p-1 text-[11px] font-bold dark:text-white"
          >
            <option value="Panca Piana">Panca Piana</option>
            <option value="Squat">Squat</option>
            <option value="Lat Machine">Lat Machine</option>
          </select>
        </div>

        <div className="w-full bg-neutral-50 dark:bg-neutral-950 rounded border border-neutral-200 dark:border-neutral-800 p-2">
          <svg viewBox="0 0 400 160" className="w-full h-auto overflow-visible">
            {/* Linee di background */}
            <line x1="40" y1="20" x2="380" y2="20" stroke="#e2e8f0" strokeDasharray="3" className="dark:stroke-neutral-800" />
            <line x1="40" y1="70" x2="380" y2="70" stroke="#e2e8f0" strokeDasharray="3" className="dark:stroke-neutral-800" />
            <line x1="40" y1="120" x2="380" y2="120" stroke="#334155" className="dark:stroke-neutral-700" />

            <text x="10" y="25" className="text-[9px] font-mono fill-neutral-400 font-bold">120kg</text>
            <text x="10" y="75" className="text-[9px] font-mono fill-neutral-400 font-bold">100kg</text>
            <text x="15" y="125" className="text-[9px] font-mono fill-neutral-400 font-bold">0</text>

            {/* Grafico Lineare Forza di Carico Progressivo */}
            <path d="M 60 95 L 160 85 L 260 50 L 360 35" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="60" cy="95" r="3.5" fill="#7c3aed" />
            <circle cx="160" cy="85" r="3.5" fill="#7c3aed" />
            <circle cx="260" cy="50" r="3.5" fill="#7c3aed" />
            <circle cx="360" cy="35" r="3.5" fill="#7c3aed" />

            {/* Punti Asse X */}
            <text x="50" y="142" className="text-[9px] font-mono fill-neutral-500">Mese 1</text>
            <text x="150" y="142" className="text-[9px] font-mono fill-neutral-500">Mese 2</text>
            <text x="250" y="142" className="text-[9px] font-mono fill-neutral-500">Mese 3</text>
            <text x="350" y="142" className="text-[9px] font-mono fill-neutral-500">Mese 4</text>
          </svg>
        </div>
      </Card>
    </div>
  );
};