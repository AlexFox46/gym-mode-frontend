import React, { useState, useEffect } from 'react';
import { AllenatiView } from './views/AllenatiView';
import { SchedeView } from './views/SchedeView';
import { ProgressiView } from './views/ProgressiView';
import { ProfiloView } from './views/ProfiloView';

function App() {
  const [activeTab, setActiveTab] = useState('allenati');
  const [activeSessionDuration, setActiveSessionDuration] = useState(0);
  const [settings, setSettings] = useState({
    id: 'user-default', weight: 82, height: 182, theme_preference: 'Light', weight_unit: 'kg', step_increment: 1, vibration: true, prep_sound: true, prep_time: 10
  });

  useEffect(() => {
    const timer = setInterval(() => setActiveSessionDuration((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (settings.theme_preference === 'Dark') root.classList.add('dark');
    else if (settings.theme_preference === 'Light') root.classList.remove('dark');
  }, [settings.theme_preference]);

  return (
    <div className="app-container">
      <main className="flex-1 overflow-y-auto pb-24">
        {activeTab === 'allenati' && (
          <AllenatiView settings={settings} activeSessionDuration={activeSessionDuration} onWorkoutComplete={() => setActiveTab('progressi')} />
        )}
        {activeTab === 'schede' && <SchedeView />}
        {activeTab === 'progressi' && <ProgressiView />}
        {activeTab === 'profilo' && <ProfiloView settings={settings} onSettingsChange={setSettings} />}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-[420px] mx-auto bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 h-16 flex justify-around items-center z-40 px-2 shadow-lg">
        {['allenati', 'schede', 'progressi', 'profilo'].map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)} 
            className={`flex flex-col items-center justify-center w-16 h-full font-sans text-[10px] font-bold transition-colors ${activeTab === tab ? 'text-success' : 'text-neutral-400'}`}
          >
            <span className="text-lg">{tab === 'allenati' ? '🏋️‍♂️' : tab === 'schede' ? '📖' : tab === 'progressi' ? '📈' : '👤'}</span>
            <span className="uppercase mt-0.5">{tab}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;