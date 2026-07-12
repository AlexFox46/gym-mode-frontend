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
  const timerRef = useRef(null);
  const increment = () => onChange(Number((value + step).toFixed(2)));
  const decrement = () => onChange(Number(Math.max(0, value - step).toFixed(2)));

  const handleLongPress = (action) => {
    action();
    timerRef.current = setTimeout(() => {
      timerRef.current = setInterval(action, 100);
    }, 500); // Attivazione rapid increment dopo 500ms
  };

  const clearTimers = () => { if (timerRef.current) clearInterval(timerRef.current); };
  useEffect(() => { return () => clearTimers(); }, []);

  return (
    <div className="flex items-center justify-between py-3.5 border-b border-neutral-100 dark:border-neutral-800">
      <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{label}</span>
      <div className="flex items-center gap-2 select-none">
        <button type="button" onMouseDown={() => handleLongPress(decrement)} onMouseUp={clearTimers} onMouseLeave={clearTimers} onTouchStart={() => handleLongPress(decrement)} onTouchEnd={clearTimers} className="w-11 h-11 flex items-center justify-center border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded-md text-lg font-bold">-</button>
        <div className="w-[100px] h-11 bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-md flex items-center justify-center font-mono text-base font-semibold text-neutral-950 dark:text-white">
          {value} <span className="text-xs ml-1 text-neutral-500 font-normal">{unit}</span>
        </div>
        <button type="button" onMouseDown={() => handleLongPress(increment)} onMouseUp={clearTimers} onMouseLeave={clearTimers} onTouchStart={() => handleLongPress(increment)} onTouchEnd={clearTimers} className="w-11 h-11 flex items-center justify-center border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded-md text-lg font-bold">+</button>
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