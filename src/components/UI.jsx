import React, { useRef, useEffect } from 'react';

export const Button = ({ children, variant = 'primary', size = 'medium', fullWidth = false, className = '', ...props }) => {
  const baseStyles = "font-sans font-semibold rounded-md transition-all duration-100 ease-out focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 select-none flex items-center justify-center box-border";
  
  const variants = {
    primary: "bg-success dark:bg-success-dark text-white shadow-light-elevated active:scale-[0.99] active:bg-success-pressed",
    secondary: "bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800",
    destructive: "bg-error text-white active:bg-red-800",
  };

  const sizes = {
    small: "h-[36px] px-3 text-xs",
    medium: "h-[44px] px-4 text-sm",
    large: "h-[56px] px-6 text-base text-h3",
  };

  const widthStyle = fullWidth ? "w-full" : "w-auto";

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};


export const Stepper = ({ label, value, onChange, step = 1, unit = '' }) => {
  
  // Gestore sicuro per l'incremento/decremento
  const handleAction = (e, type) => {
    // Evita che l'evento si propaghi ad altri elementi padre
    e.preventDefault();
    e.stopPropagation();

    // Converte e pulisce i valori per evitare strani comportamenti con i decimali (floating point)
    const currentVal = parseFloat(value) || 0;
    const stepVal = parseFloat(step) || 1;

    if (type === 'increment') {
      // Arrotondiamo per evitare problemi Javascript come 0.1 + 0.2 = 0.30000000000000004
      const newVal = parseFloat((currentVal + stepVal).toFixed(2));
      onChange(newVal);
    } else if (type === 'decrement') {
      const newVal = parseFloat((currentVal - stepVal).toFixed(2));
      // Impediamo di andare sotto lo zero per carichi e ripetizioni
      onChange(Math.max(0, newVal));
    }
  };

  return (
    <div className="flex justify-between items-center py-2.5 border-b border-neutral-100 dark:border-neutral-800 last:border-0 select-none">
      <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
        {label}
      </span>
      
      <div className="flex items-center gap-3">
        {/* Pulsante MENO */}
        <button
          type="button"
          // Usiamo sia onTouchStart che onClick bloccando la propagazione per evitare il doppio trigger su mobile
          onTouchStart={(e) => handleAction(e, 'decrement')}
          onClick={(e) => {
            // Se l'evento touch è già stato gestito, evitiamo di far scattare il click classico
            if (e.defaultPrevented) return;
            handleAction(e, 'decrement');
          }}
          className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-bold text-lg text-neutral-700 dark:text-neutral-300 active:scale-90 transition-transform focus:outline-none"
        >
          –
        </button>

        {/* Display del Valore */}
        <span className="w-16 text-center font-mono font-bold text-sm text-neutral-900 dark:text-white">
          {value} <span className="text-[10px] text-neutral-400 font-sans ml-0.5">{unit}</span>
        </span>

        {/* Pulsante PIÙ */}
        <button
          type="button"
          onTouchStart={(e) => handleAction(e, 'increment')}
          onClick={(e) => {
            if (e.defaultPrevented) return;
            handleAction(e, 'increment');
          }}
          className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-bold text-lg text-neutral-700 dark:text-neutral-300 active:scale-90 transition-transform focus:outline-none"
        >
          +
        </button>
      </div>
    </div>
  );
};

export const Card = ({ children, className = '' }) => (
  <div className={`p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-light-default dark:shadow-dark-default ${className}`}>{children}</div>
);

export const Toggle = ({ checked, onChange }) => (
  <button type="button" onClick={() => onChange(!checked)} className={`w-12 h-7 rounded-full transition-colors duration-150 relative ${checked ? 'bg-success' : 'bg-neutral-300 dark:bg-neutral-700'}`}>
    <span className={`absolute top-0.5 left-0.5 bg-white w-6 h-6 rounded-full transition-transform duration-150 shadow-sm ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
  </button>
);