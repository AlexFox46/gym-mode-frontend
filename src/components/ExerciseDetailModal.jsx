import React, { useState, useEffect } from 'react';
import { X, Dumbbell, ShieldCheck, Sparkles, Layers, Info, ChevronRight, ChevronLeft, Activity, Play, Pause } from 'lucide-react';
import { getEnrichedExercise, getSimilarExercises, MUSCLE_COLORS } from '../data/exerciseLibrary';

/**
 * Visual SVG Diagram for Target Muscle Group Focus (Anterior & Posterior Full-Body Map)
 */
const MuscleFocusDiagram = ({ primaryMuscle, secondaryMuscles = [] }) => {
  const primaryColor = '#F97316'; // Bright Orange for Primary Target
  const secColors = ['#FBBF24', '#3B82F6', '#10B981']; // Yellow, Blue, Green for Secondary

  // Muscle mapping helper for SVG highlights
  const isPrimary = (group) => primaryMuscle === group;
  const isSecondary = (group) => secondaryMuscles.includes(group);

  const getMuscleColor = (group) => {
    if (isPrimary(group)) return primaryColor;
    if (isSecondary(group)) {
      const idx = secondaryMuscles.indexOf(group);
      return secColors[idx % secColors.length];
    }
    return null;
  };

  const getMuscleOpacity = (group) => {
    if (isPrimary(group)) return '0.95';
    if (isSecondary(group)) return '0.80';
    return '0';
  };

  return (
    <div className="relative w-full h-full bg-neutral-950 rounded-2xl p-3 flex flex-col items-center justify-between overflow-hidden">
      {/* Header Label */}
      <div className="flex items-center gap-1.5 mb-1">
        <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        <h4 className="text-[11px] font-black uppercase tracking-widest text-amber-400 font-mono">
          FOCUS MUSCOLARE
        </h4>
      </div>

      {/* SVG Canvas for Dual Body (Front + Back) Silhouettes */}
      <div className="w-full flex-1 flex items-center justify-center py-1">
        <svg viewBox="0 0 240 165" className="w-full max-w-[280px] h-36 drop-shadow-2xl select-none">
          {/* ================================================================= */}
          {/* 1. VISTA ANTERIORE (FRONT VIEW - X: 20 to 100) */}
          {/* ================================================================= */}
          <g>
            {/* Front Label */}
            <text x="60" y="12" fill="#9CA3AF" fontSize="7" fontWeight="bold" textAnchor="middle" letterSpacing="1">
              ANTERIORE
            </text>

            {/* Silhouette Outline Front Body */}
            <g stroke="#4B5563" strokeWidth="1.2" fill="#1F2937">
              {/* Head */}
              <ellipse cx="60" cy="24" rx="8" ry="10" />
              {/* Neck */}
              <path d="M 56 33 L 56 38 M 64 33 L 64 38" />
              {/* Torso & Legs Base */}
              <path d="M 44 42 Q 60 38 76 42 L 72 82 L 68 118 L 62 155 L 58 155 L 52 118 L 48 82 Z" strokeLinejoin="round" />
              {/* Left Arm */}
              <path d="M 44 42 Q 34 62 30 90 L 36 92 Q 40 68 46 48 Z" />
              {/* Right Arm */}
              <path d="M 76 42 Q 86 62 90 90 L 84 92 Q 80 68 74 48 Z" />
            </g>

            {/* --- ANTERIOR MUSCLE HIGHLIGHTS --- */}

            {/* Petto (Chest) */}
            {(getMuscleColor('Petto')) && (
              <g fill={getMuscleColor('Petto')} opacity={getMuscleOpacity('Petto')} filter="drop-shadow(0px 0px 6px rgba(249,115,22,0.9))">
                <path d="M 47 43 Q 60 46 60 55 Q 47 58 44 47 Z" />
                <path d="M 73 43 Q 60 46 60 55 Q 73 58 76 47 Z" />
              </g>
            )}

            {/* Spalle Anteriore (Shoulders) */}
            {(getMuscleColor('Spalle')) && (
              <g fill={getMuscleColor('Spalle')} opacity={getMuscleOpacity('Spalle')} filter="drop-shadow(0px 0px 4px rgba(245,158,11,0.8))">
                <ellipse cx="43" cy="44" rx="5" ry="7" />
                <ellipse cx="77" cy="44" rx="5" ry="7" />
              </g>
            )}

            {/* Bicipiti (Biceps) */}
            {(getMuscleColor('Bicipiti')) && (
              <g fill={getMuscleColor('Bicipiti')} opacity={getMuscleOpacity('Bicipiti')} filter="drop-shadow(0px 0px 4px rgba(16,185,129,0.8))">
                <ellipse cx="37" cy="62" rx="4" ry="7" />
                <ellipse cx="83" cy="62" rx="4" ry="7" />
              </g>
            )}

            {/* Addominali (Abs) */}
            {(getMuscleColor('Addominali')) && (
              <g fill={getMuscleColor('Addominali')} opacity={getMuscleOpacity('Addominali')} filter="drop-shadow(0px 0px 4px rgba(20,184,166,0.8))">
                <rect x="52" y="57" width="16" height="22" rx="3" />
              </g>
            )}

            {/* Quadricipiti (Quads) */}
            {(getMuscleColor('Quadricipiti')) && (
              <g fill={getMuscleColor('Quadricipiti')} opacity={getMuscleOpacity('Quadricipiti')} filter="drop-shadow(0px 0px 5px rgba(236,72,153,0.8))">
                <path d="M 49 84 Q 59 84 57 116 L 50 116 Z" />
                <path d="M 71 84 Q 61 84 63 116 L 70 116 Z" />
              </g>
            )}

            {/* Polpacci Anteriore (Calves) */}
            {(getMuscleColor('Polpacci')) && (
              <g fill={getMuscleColor('Polpacci')} opacity={getMuscleOpacity('Polpacci')}>
                <ellipse cx="51" cy="132" rx="3.5" ry="7" />
                <ellipse cx="69" cy="132" rx="3.5" ry="7" />
              </g>
            )}
          </g>

          {/* Divider Line */}
          <line x1="120" y1="20" x2="120" y2="150" stroke="#374151" strokeDasharray="3 3" opacity="0.6" />

          {/* ================================================================= */}
          {/* 2. VISTA POSTERIORE (BACK VIEW - X: 140 to 220) */}
          {/* ================================================================= */}
          <g>
            {/* Back Label */}
            <text x="180" y="12" fill="#9CA3AF" fontSize="7" fontWeight="bold" textAnchor="middle" letterSpacing="1">
              POSTERIORE
            </text>

            {/* Silhouette Outline Back Body */}
            <g stroke="#4B5563" strokeWidth="1.2" fill="#1F2937">
              {/* Head */}
              <ellipse cx="180" cy="24" rx="8" ry="10" />
              {/* Neck */}
              <path d="M 176 33 L 176 38 M 184 33 L 184 38" />
              {/* Torso & Legs Base */}
              <path d="M 164 42 Q 180 38 196 42 L 192 82 L 188 118 L 182 155 L 178 155 L 172 118 L 168 82 Z" strokeLinejoin="round" />
              {/* Left Arm */}
              <path d="M 164 42 Q 154 62 150 90 L 156 92 Q 160 68 166 48 Z" />
              {/* Right Arm */}
              <path d="M 196 42 Q 206 62 210 90 L 204 92 Q 200 68 194 48 Z" />
            </g>

            {/* --- POSTERIOR MUSCLE HIGHLIGHTS --- */}

            {/* Dorsali / Schiena (Lats) */}
            {(getMuscleColor('Dorsali')) && (
              <g fill={getMuscleColor('Dorsali')} opacity={getMuscleOpacity('Dorsali')} filter="drop-shadow(0px 0px 6px rgba(59,130,246,0.9))">
                <path d="M 167 45 Q 180 48 179 70 Q 167 67 164 50 Z" />
                <path d="M 193 45 Q 180 48 181 70 Q 193 67 196 50 Z" />
              </g>
            )}

            {/* Tricipiti (Triceps) */}
            {(getMuscleColor('Tricipiti')) && (
              <g fill={getMuscleColor('Tricipiti')} opacity={getMuscleOpacity('Tricipiti')} filter="drop-shadow(0px 0px 4px rgba(139,92,246,0.8))">
                <ellipse cx="157" cy="62" rx="4" ry="7" />
                <ellipse cx="203" cy="62" rx="4" ry="7" />
              </g>
            )}

            {/* Spalle Posteriore */}
            {(getMuscleColor('Spalle')) && (
              <g fill={getMuscleColor('Spalle')} opacity={getMuscleOpacity('Spalle')}>
                <ellipse cx="163" cy="44" rx="5" ry="7" />
                <ellipse cx="197" cy="44" rx="5" ry="7" />
              </g>
            )}

            {/* Lombari (Lower Back) */}
            {(getMuscleColor('Lombari')) && (
              <g fill={getMuscleColor('Lombari')} opacity={getMuscleOpacity('Lombari')}>
                <rect x="173" y="68" width="14" height="14" rx="2" />
              </g>
            )}

            {/* Glutei (Glutes) */}
            {(getMuscleColor('Glutei')) && (
              <g fill={getMuscleColor('Glutei')} opacity={getMuscleOpacity('Glutei')} filter="drop-shadow(0px 0px 5px rgba(249,115,22,0.8))">
                <ellipse cx="172" cy="89" rx="7" ry="8" />
                <ellipse cx="188" cy="89" rx="7" ry="8" />
              </g>
            )}

            {/* Femorali (Hamstrings) */}
            {(getMuscleColor('Femorali')) && (
              <g fill={getMuscleColor('Femorali')} opacity={getMuscleOpacity('Femorali')}>
                <path d="M 169 98 Q 177 98 175 118 L 169 118 Z" />
                <path d="M 191 98 Q 183 98 185 118 L 191 118 Z" />
              </g>
            )}

            {/* Polpacci Posteriore (Calves) */}
            {(getMuscleColor('Polpacci')) && (
              <g fill={getMuscleColor('Polpacci')} opacity={getMuscleOpacity('Polpacci')}>
                <ellipse cx="171" cy="132" rx="4" ry="8" />
                <ellipse cx="189" cy="132" rx="4" ry="8" />
              </g>
            )}
          </g>
        </svg>
      </div>

      {/* Muscle Focus Legend / Badges */}
      <div className="w-full pt-1.5 border-t border-surface-tertiary/60 flex flex-wrap items-center justify-center gap-1.5 text-[9px] font-black uppercase">
        {/* Primary Target Badge */}
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-orange-500/20 border border-orange-500/50 text-orange-400">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          <span>Target: <strong>{primaryMuscle}</strong></span>
        </div>

        {/* Secondary Muscles Badges */}
        {secondaryMuscles.map((sec, idx) => (
          <div key={sec} className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-tertiary/80 border border-surface-tertiary text-text-secondary">
            <span 
              className="w-1.5 h-1.5 rounded-full inline-block" 
              style={{ backgroundColor: secColors[idx % secColors.length] }} 
            />
            <span>{sec}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Slideshow Component for Exercise 3D Demonstration + Muscle Focus Map
 */
const ExerciseMediaSlideshow = ({ exercise }) => {
  const [activeSlide, setActiveSlide] = useState(0); // 0: Esercizio 3D, 1: Focus Muscolare
  const [currentFrame, setCurrentFrame] = useState(0); // 0 o 1 per l'animazione dell'esercizio
  const [isPlaying, setIsPlaying] = useState(true);
  const [imgError, setImgError] = useState(false);

  const images = exercise.images && exercise.images.length > 0
    ? exercise.images
    : (exercise.image_url ? [exercise.image_url, exercise.image_url.replace('/0.jpg', '/1.jpg')] : []);

  const hasImages = images.length > 0 && !imgError;

  // Alternate frames every 1.2s when on 3D Slide
  useEffect(() => {
    let timer = null;
    if (activeSlide === 0 && isPlaying && hasImages && images.length > 1) {
      timer = setInterval(() => {
        setCurrentFrame(prev => (prev === 0 ? 1 : 0));
      }, 1200);
    }
    return () => clearInterval(timer);
  }, [activeSlide, isPlaying, hasImages, images]);

  const activeImgUrl = images[currentFrame] || images[0];

  return (
    <div className="relative w-full bg-surface-tertiary/40 rounded-3xl border border-surface-tertiary overflow-hidden shadow-inner flex flex-col">
      {/* Slideshow Header Tabs */}
      <div className="flex items-center justify-between p-2 bg-surface-secondary/90 border-b border-surface-tertiary">
        <div className="flex items-center gap-1 bg-surface p-1 rounded-xl w-full">
          <button
            onClick={() => setActiveSlide(0)}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
              activeSlide === 0 
                ? 'bg-primary text-black shadow-md' 
                : 'text-text-secondary hover:text-white'
            }`}
          >
            <Dumbbell size={14} />
            <span>1. Esercizio 3D</span>
          </button>
          
          <button
            onClick={() => setActiveSlide(1)}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
              activeSlide === 1 
                ? 'bg-amber-400 text-black shadow-md' 
                : 'text-text-secondary hover:text-white'
            }`}
          >
            <Activity size={14} />
            <span>2. Focus Muscolare</span>
          </button>
        </div>
      </div>

      {/* Slide Body Content */}
      <div className="relative w-full h-56 p-2 flex items-center justify-center">
        
        {/* SLIDE 0: ESERCIZIO 3D */}
        {activeSlide === 0 && (
          <div className="w-full h-full flex flex-col items-center justify-center relative">
            {hasImages ? (
              <div className="relative w-full h-full flex items-center justify-center bg-white/95 rounded-2xl p-2 overflow-hidden shadow-sm">
                <img 
                  src={activeImgUrl} 
                  alt={exercise.name} 
                  onError={() => setImgError(true)}
                  className="max-h-full max-w-full object-contain drop-shadow-md transition-all duration-300"
                />
                
                {/* Frame Switcher Control Overlay */}
                {images.length > 1 && (
                  <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center pointer-events-none">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="pointer-events-auto bg-black/70 hover:bg-black text-white p-1.5 rounded-full backdrop-blur-md transition-colors flex items-center justify-center"
                      title={isPlaying ? 'Pausa Animazione' : 'Avvia Animazione'}
                    >
                      {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                    </button>

                    <div className="pointer-events-auto bg-black/70 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] font-bold text-white uppercase tracking-wider flex items-center gap-1">
                      <span>Movimento: </span>
                      <strong className="text-primary">{currentFrame === 0 ? 'Partenza' : 'Arrivo'}</strong>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-4">
                <Dumbbell size={36} className="text-primary mb-2" />
                <h4 className="text-xs font-bold text-white mb-1">{exercise.name}</h4>
                <p className="text-[10px] text-text-secondary">Dimostrazione guidata {exercise.equipment}</p>
              </div>
            )}
          </div>
        )}

        {/* SLIDE 1: FOCUS MUSCOLARE ANATOMICO */}
        {activeSlide === 1 && (
          <MuscleFocusDiagram 
            primaryMuscle={exercise.primary_muscle_group} 
            secondaryMuscles={exercise.secondary_muscles} 
          />
        )}

        {/* Navigation Arrows */}
        <button
          onClick={() => setActiveSlide(prev => (prev === 0 ? 1 : 0))}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-all active:scale-95 z-10"
        >
          <ChevronLeft size={18} />
        </button>
        
        <button
          onClick={() => setActiveSlide(prev => (prev === 0 ? 1 : 0))}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-all active:scale-95 z-10"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex items-center justify-center gap-1.5 pb-2.5">
        <button
          onClick={() => setActiveSlide(0)}
          className={`w-2 h-2 rounded-full transition-all ${
            activeSlide === 0 ? 'w-5 bg-primary' : 'bg-surface-tertiary'
          }`}
        />
        <button
          onClick={() => setActiveSlide(1)}
          className={`w-2 h-2 rounded-full transition-all ${
            activeSlide === 1 ? 'w-5 bg-amber-400' : 'bg-surface-tertiary'
          }`}
        />
      </div>
    </div>
  );
};

export const ExerciseDetailModal = ({ exercise, onClose, allExercises = [], onSelectSimilar }) => {
  if (!exercise) return null;

  const enriched = getEnrichedExercise(exercise);
  const similarList = getSimilarExercises(enriched, allExercises);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-0 sm:p-4 animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="w-full max-w-[420px] max-h-[90vh] bg-surface-secondary border border-surface-tertiary rounded-t-3xl sm:rounded-3xl flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
        
        {/* Modal Header */}
        <div className="relative p-5 pb-3 border-b border-surface-tertiary flex items-start justify-between bg-surface-secondary/80">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-primary/15 border border-primary/30 text-primary text-[10px] font-black uppercase tracking-wider">
                {enriched.equipment}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-surface-tertiary border border-surface-tertiary text-text-secondary text-[10px] font-black uppercase tracking-wider">
                {enriched.primary_muscle_group}
              </span>
            </div>
            <h2 className="text-xl font-black text-white tracking-tight">{enriched.name}</h2>
          </div>

          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-surface-tertiary hover:bg-surface-tertiary/80 text-text-secondary hover:text-white flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          
          {/* 1. Slideshow: Esercizio 3D + Focus Muscolare Anatomico */}
          <ExerciseMediaSlideshow exercise={enriched} />

          {/* 2. Descrizione dell'Esercizio */}
          <div className="bg-surface-tertiary/40 border border-surface-tertiary/70 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Info size={15} className="text-primary" />
              <h3 className="text-xs font-black uppercase tracking-wider text-white">Cos'è l'Esercizio</h3>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed font-sans">
              {enriched.description}
            </p>
          </div>

          {/* 3. Guida al Setup ed Esecuzione */}
          <div className="bg-surface-tertiary/40 border border-surface-tertiary/70 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-emerald-400" />
              <h3 className="text-xs font-black uppercase tracking-wider text-white">Setup ed Esecuzione</h3>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed font-sans">
              {enriched.setup}
            </p>
          </div>

          {/* 4. Lista Esercizi Simili / Alternativi */}
          {similarList.length > 0 && (
            <div className="pt-2 border-t border-surface-tertiary/60">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={15} className="text-spotter" />
                <h3 className="text-xs font-black uppercase tracking-wider text-white">Esercizi Simili & Alternativi</h3>
              </div>

              <div className="space-y-2">
                {similarList.map(simEx => (
                  <div 
                    key={simEx.id || simEx.name}
                    onClick={() => {
                      if (onSelectSimilar) {
                        onSelectSimilar(simEx);
                      }
                    }}
                    className="group bg-surface-tertiary/50 hover:bg-surface-tertiary border border-surface-tertiary hover:border-primary/40 rounded-2xl p-3 flex items-center justify-between transition-all cursor-pointer"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-primary transition-colors mb-1">
                        {simEx.name}
                      </h4>
                      <div className="flex items-center gap-1.5">
                        {/* Tag Attrezzatura */}
                        <span className="px-2 py-0.5 rounded-md bg-surface-secondary text-[9px] font-bold text-primary border border-primary/20">
                          {simEx.equipment}
                        </span>
                        {/* Tag Gruppo Muscolare */}
                        <span className="px-2 py-0.5 rounded-md bg-surface-secondary text-[9px] font-bold text-text-secondary border border-surface-tertiary">
                          {simEx.primary_muscle_group}
                        </span>
                      </div>
                    </div>

                    <div className="w-7 h-7 rounded-xl bg-surface-secondary group-hover:bg-primary group-hover:text-black text-text-secondary flex items-center justify-center transition-colors">
                      <ChevronRight size={14} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-surface-tertiary bg-surface-secondary">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-surface-tertiary hover:bg-surface-tertiary/80 text-white font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Chiudi Dettaglio
          </button>
        </div>

      </div>
    </div>
  );
};
