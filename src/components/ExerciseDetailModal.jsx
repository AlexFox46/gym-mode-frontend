import React, { useState } from 'react';
import { X, Dumbbell, ShieldCheck, Sparkles, Layers, Info, ChevronRight, Activity } from 'lucide-react';
import { getEnrichedExercise, getSimilarExercises, MUSCLE_COLORS } from '../data/exerciseLibrary';

/**
 * Visual SVG Diagram for Target Muscle Group Focus
 */
const MuscleFocusDiagram = ({ primaryMuscle, secondaryMuscles = [] }) => {
  const primaryColor = MUSCLE_COLORS[primaryMuscle] || '#3B82F6';

  return (
    <div className="relative w-full h-36 bg-surface-tertiary/40 rounded-2xl border border-surface-tertiary p-3 flex items-center justify-center overflow-hidden">
      {/* Background ambient glow */}
      <div 
        className="absolute inset-0 opacity-20 blur-2xl pointer-events-none"
        style={{ backgroundColor: primaryColor }}
      />

      <svg viewBox="0 0 200 120" className="w-40 h-full drop-shadow-md">
        {/* Silhouette Busto Anatomico */}
        <g stroke="#4B5563" strokeWidth="1.5" fill="none" opacity="0.4">
          {/* Head & Neck */}
          <circle cx="100" cy="18" r="10" fill="#374151" />
          <path d="M 94 28 L 94 36 M 106 28 L 106 36" />
          {/* Shoulders & Torso Outline */}
          <path d="M 65 42 Q 100 36 135 42 L 128 85 L 118 115 M 72 85 L 82 115" strokeLinecap="round" />
          {/* Arms Outline */}
          <path d="M 65 42 Q 52 65 48 90" strokeLinecap="round" />
          <path d="M 135 42 Q 148 65 152 90" strokeLinecap="round" />
        </g>

        {/* Highlighted Primary Muscle Groups */}
        {primaryMuscle === 'Petto' && (
          <g fill={primaryColor} opacity="0.85">
            <path d="M 78 44 Q 100 48 100 58 Q 78 62 74 48 Z" />
            <path d="M 122 44 Q 100 48 100 58 Q 122 62 126 48 Z" />
          </g>
        )}

        {primaryMuscle === 'Dorsali' && (
          <g fill={primaryColor} opacity="0.85">
            <path d="M 72 50 Q 88 52 86 78 Q 72 75 68 56 Z" />
            <path d="M 128 50 Q 112 52 114 78 Q 128 75 132 56 Z" />
          </g>
        )}

        {primaryMuscle === 'Spalle' && (
          <g fill={primaryColor} opacity="0.85">
            <ellipse cx="64" cy="42" rx="7" ry="9" />
            <ellipse cx="136" cy="42" rx="7" ry="9" />
          </g>
        )}

        {primaryMuscle === 'Bicipiti' && (
          <g fill={primaryColor} opacity="0.85">
            <ellipse cx="56" cy="62" rx="5" ry="8" />
            <ellipse cx="144" cy="62" rx="5" ry="8" />
          </g>
        )}

        {primaryMuscle === 'Tricipiti' && (
          <g fill={primaryColor} opacity="0.85">
            <ellipse cx="50" cy="62" rx="5" ry="9" />
            <ellipse cx="150" cy="62" rx="5" ry="9" />
          </g>
        )}

        {(primaryMuscle === 'Quadricipiti' || primaryMuscle === 'Femorali' || primaryMuscle === 'Glutei') && (
          <g fill={primaryColor} opacity="0.85">
            <path d="M 78 86 Q 94 86 92 115 L 82 115 Z" />
            <path d="M 122 86 Q 106 86 108 115 L 118 115 Z" />
          </g>
        )}

        {primaryMuscle === 'Addominali' && (
          <g fill={primaryColor} opacity="0.85">
            <rect x="88" y="58" width="24" height="26" rx="4" />
          </g>
        )}

        {primaryMuscle === 'Polpacci' && (
          <g fill={primaryColor} opacity="0.85">
            <ellipse cx="82" cy="110" rx="4" ry="6" />
            <ellipse cx="118" cy="110" rx="4" ry="6" />
          </g>
        )}

        {/* Fallback indicator */}
        {(!['Petto', 'Dorsali', 'Spalle', 'Bicipiti', 'Tricipiti', 'Quadricipiti', 'Femorali', 'Glutei', 'Addominali', 'Polpacci'].includes(primaryMuscle)) && (
          <circle cx="100" cy="60" r="16" fill={primaryColor} opacity="0.75" />
        )}
      </svg>

      <div className="absolute bottom-2 left-3 right-3 flex justify-between items-center text-[10px] font-black uppercase text-text-secondary">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: primaryColor }}></span>
          Target: <strong className="text-white ml-0.5">{primaryMuscle}</strong>
        </span>
        {secondaryMuscles.length > 0 && (
          <span className="text-neutral-400">
            Sinergici: {secondaryMuscles.join(', ')}
          </span>
        )}
      </div>
    </div>
  );
};

/**
 * Exercise Illustration Graphic & Real 3D Image Representation
 */
const ExerciseIllustration = ({ exercise }) => {
  const [imgError, setImgError] = useState(false);
  const primaryColor = MUSCLE_COLORS[exercise.primary_muscle_group] || '#3B82F6';
  const hasRealImage = exercise.image_url && !imgError;

  return (
    <div className="relative w-full h-56 bg-surface-tertiary/40 rounded-3xl border border-surface-tertiary flex flex-col items-center justify-center p-3 overflow-hidden shadow-inner group">
      <div 
        className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: primaryColor }}
      />

      {hasRealImage ? (
        <div className="relative w-full h-full flex items-center justify-center bg-white/95 rounded-2xl p-2 overflow-hidden shadow-sm">
          <img 
            src={exercise.image_url} 
            alt={exercise.name} 
            onError={() => setImgError(true)}
            className="max-h-full max-w-full object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-bold text-white uppercase tracking-wider">
            Dimostrazione 3D
          </div>
        </div>
      ) : (
        <>
          {/* Dynamic Equipment Illustration Banner */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
              <Dumbbell size={22} />
            </div>
            <div>
              <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest block">Dimostrazione Grafica</span>
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                {exercise.name}
              </span>
            </div>
          </div>

          {/* Illustrative Geometric Representation */}
          <div className="w-full max-w-[260px] h-20 bg-surface-tertiary/80 rounded-2xl border border-surface-tertiary/60 flex items-center justify-around px-4 relative">
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-black uppercase text-neutral-400">Attrezzo</span>
              <span className="text-xs font-bold text-primary px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 mt-1">
                {exercise.equipment}
              </span>
            </div>
            <div className="h-8 w-px bg-surface-tertiary" />
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-black uppercase text-neutral-400">Pattern Movimento</span>
              <span className="text-xs font-bold text-white px-2 py-0.5 rounded-md bg-surface-secondary border border-surface-tertiary mt-1">
                {exercise.movement_pattern}
              </span>
            </div>
          </div>
        </>
      )}
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
          
          {/* 1. Immagine / Grafica Dimostrativa dell'Esercizio */}
          <ExerciseIllustration exercise={enriched} />

          {/* 2. Focus Muscolare Anatomico */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Activity size={15} className="text-primary" />
              <h3 className="text-xs font-black uppercase tracking-wider text-white">Focus Muscolare Target</h3>
            </div>
            <MuscleFocusDiagram 
              primaryMuscle={enriched.primary_muscle_group} 
              secondaryMuscles={enriched.secondary_muscles}
            />
          </div>

          {/* 3. Descrizione dell'Esercizio */}
          <div className="bg-surface-tertiary/40 border border-surface-tertiary/70 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Info size={15} className="text-primary" />
              <h3 className="text-xs font-black uppercase tracking-wider text-white">Cos'è l'Esercizio</h3>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed font-sans">
              {enriched.description}
            </p>
          </div>

          {/* 4. Guida al Setup ed Esecuzione */}
          <div className="bg-surface-tertiary/40 border border-surface-tertiary/70 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-emerald-400" />
              <h3 className="text-xs font-black uppercase tracking-wider text-white">Setup ed Esecuzione</h3>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed font-sans">
              {enriched.setup}
            </p>
          </div>

          {/* 5. Lista Esercizi Simili / Alternativi */}
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
