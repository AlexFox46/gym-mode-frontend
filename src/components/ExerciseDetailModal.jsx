import React, { useState, useEffect } from 'react';
import { X, Dumbbell, ShieldCheck, Sparkles, Layers, Info, ChevronRight, ChevronLeft, Activity, Play, Pause } from 'lucide-react';
import { getEnrichedExercise, getSimilarExercises, MUSCLE_COLORS, normalizeMuscleGroup } from '../data/exerciseLibrary';
import BodyHighlighterSVG from './BodyHighlighterSVG';

export const MUSCLE_MAP_IMAGES = {
  'Petto': '/muscles/petto.png',
  'Dorsali': '/muscles/dorsali.png',
  'Spalle': '/muscles/spalle.png',
  'Bicipiti': '/muscles/bicipiti.png',
  'Addominali': '/muscles/addominali.png',
  'Trapezi': '/muscles/trapezi.png',
  'Tricipiti': '/muscles/dorsali.png',
  'Quadricipiti': '/muscles/addominali.png',
  'Femorali': '/muscles/dorsali.png',
  'Glutei': '/muscles/addominali.png',
  'Polpacci': '/muscles/addominali.png',
  'Lombari': '/muscles/dorsali.png'
};

/**
 * Visual SVG & Vector Diagram for Target Muscle Group Focus (Male & Female, Front & Back)
 */
const MuscleFocusDiagram = ({ primaryMuscle, secondaryMuscles = [] }) => {
  return (
    <BodyHighlighterSVG 
      primaryMuscle={primaryMuscle} 
      secondaryMuscles={secondaryMuscles} 
    />
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

  useEffect(() => {
    setImgError(false);
    setCurrentFrame(0);
  }, [exercise]);

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
              <div className="flex flex-col items-center justify-center text-center p-4 bg-surface-secondary/80 rounded-2xl border border-surface-tertiary w-full h-full">
                <div className="w-12 h-12 rounded-2xl bg-surface-tertiary/60 flex items-center justify-center text-amber-400 mb-2 border border-surface-tertiary">
                  <Dumbbell size={24} />
                </div>
                <h4 className="text-xs font-bold text-white mb-1">{exercise.name}</h4>
                <span className="px-2.5 py-0.5 rounded-full bg-surface-tertiary text-[10px] text-text-secondary font-mono mb-2">
                  Dimostrazione 3D non disponibile
                </span>
                <button
                  onClick={() => setActiveSlide(1)}
                  className="text-[10px] font-bold text-amber-400 hover:underline flex items-center gap-1 mt-1"
                >
                  <Activity size={12} />
                  <span>Vedi Focus Muscolare Anatomico →</span>
                </button>
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
