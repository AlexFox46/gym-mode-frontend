import React from 'react';

export const Button = ({ children, variant = 'primary', size = 'medium', className = '', ...props }) => {
  const base = "font-black uppercase tracking-widest rounded-xl transition-all active:scale-[0.98] flex items-center justify-center";
  const styles = variant === 'primary' 
    ? "bg-primary text-black hover:bg-primary-dark" 
    : "bg-surface-secondary text-white border border-surface-tertiary hover:bg-surface-tertiary";
  return <button className={`${base} ${styles} h-[52px] px-8 ${className}`} {...props}>{children}</button>;
};

export const Card = ({ children, className = '' }) => (
  <div className={`p-6 bg-surface-secondary rounded-3xl border border-surface-tertiary ${className}`}>{children}</div>
);

export const Stepper = ({ label, value, onChange, step = 1, unit = '' }) => (
  <div className="flex justify-between items-center bg-surface-secondary p-4 rounded-2xl border border-surface-tertiary">
    <span className="text-[10px] font-black text-text-secondary uppercase">{label}</span>
    <div className="flex items-center gap-4">
      <button onClick={() => onChange(Math.max(0, value - step))} className="w-10 h-10 rounded-lg bg-surface-tertiary text-white font-black">-</button>
      <span className="font-mono font-black text-lg text-white w-12 text-center">{value}{unit}</span>
      <button onClick={() => onChange(value + step)} className="w-10 h-10 rounded-lg bg-surface-tertiary text-primary font-black">+</button>
    </div>
  </div>
);

export const Toggle = ({ checked, onChange }) => (
  <button 
    type="button"
    onClick={() => onChange(!checked)} 
    className={`w-14 h-8 rounded-full transition-all relative ${checked ? 'bg-primary' : 'bg-surface-tertiary'}`}
  >
    <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
  </button>
);
