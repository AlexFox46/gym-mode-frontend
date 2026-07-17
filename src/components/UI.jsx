import React from 'react';

// Bottone "Performante": alto contrasto, area di tocco minima 48px
export const Button = ({ children, variant = 'primary', size = 'medium', fullWidth = false, disabled = false, className = '', ...props }) => {
  const baseStyles = "font-black uppercase tracking-widest transition-all duration-200 active:scale-[0.98] rounded-xl flex items-center justify-center select-none shadow-sm focus:ring-4 focus:ring-primary/30 outline-none";
  
  const variants = {
    primary: disabled ? "bg-surface-tertiary text-text-tertiary cursor-not-allowed opacity-50" : "bg-primary text-black hover:bg-primary-dark", // Lime su nero
    secondary: disabled ? "bg-surface-tertiary text-text-tertiary border border-surface-tertiary cursor-not-allowed opacity-50" : "bg-surface-secondary text-text-primary border border-surface-tertiary hover:bg-surface-tertiary",
    destructive: disabled ? "bg-surface-tertiary text-text-tertiary cursor-not-allowed opacity-50" : "bg-red-600 text-white hover:bg-red-700",
  };

  const sizes = {
    small: "h-[44px] px-6 text-[11px]",
    medium: "h-[52px] px-8 text-xs",
    large: "h-[64px] px-10 text-sm",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : 'w-auto'} ${className}`} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Stepper "Tattile": area di controllo ampia, leggibilità immediata
export const Stepper = ({ label, value, onChange, step = 1, unit = '' }) => {
  return (
    <div className="flex justify-between items-center bg-surface-secondary p-4 rounded-2xl border border-surface-tertiary">
      <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest">{label}</span>
      <div className="flex items-center gap-6">
        <button 
          aria-label={`Diminuisci ${label}`}
          onClick={() => onChange(Math.max(0, parseFloat((value - step).toFixed(2))))} 
          className="w-12 h-12 rounded-xl bg-surface-tertiary flex items-center justify-center font-black text-white hover:bg-[#333] active:scale-90 transition-all"
        >–</button>
        <span className="w-16 text-center font-mono font-black text-xl text-text-primary">
          {value}<span className="text-[10px] ml-1 text-text-tertiary">{unit}</span>
        </span>
        <button 
          aria-label={`Aumenta ${label}`}
          onClick={() => onChange(parseFloat((value + step).toFixed(2)))} 
          className="w-12 h-12 rounded-xl bg-surface-tertiary flex items-center justify-center font-black text-primary hover:bg-[#333] active:scale-90 transition-all"
        >+</button>
      </div>
    </div>
  );
};

// Card "Elevata": sfondo scuro profondo per contrasto netto
export const Card = ({ children, className = '' }) => (
  <div className={`p-6 bg-surface rounded-3xl border border-surface-tertiary shadow-[0_4px_20px_-5px_rgba(0,0,0,0.3)] ${className}`}>
    {children}
  </div>
);

// Toggle Switch: Feedback visivo netto
export const Toggle = ({ checked, onChange }) => (
  <button 
    onClick={() => onChange(!checked)} 
    className={`w-14 h-8 rounded-full transition-all relative ${checked ? 'bg-primary' : 'bg-surface-tertiary'}`}
  >
    <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
  </button>
);
