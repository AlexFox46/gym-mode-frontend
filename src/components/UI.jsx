import React from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

// ==========================================
// 1. BUTTON (Bottone Tattile High-Contrast)
// ==========================================
export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false, 
  disabled = false, 
  loading = false,
  className = '', 
  ...props 
}) => {
  const baseStyles = "font-black uppercase tracking-widest transition-all duration-200 active:scale-[0.97] rounded-xl flex items-center justify-center select-none shadow-sm focus:outline-none focus:ring-4 focus:ring-primary/30 min-h-[48px]";
  
  const variants = {
    primary: disabled 
      ? "bg-surface-tertiary text-text-tertiary cursor-not-allowed opacity-50" 
      : "bg-primary text-white hover:opacity-90 active:bg-primary-dark shadow-primary-glow/20",
    secondary: disabled 
      ? "bg-transparent border-2 border-surface-tertiary text-text-tertiary cursor-not-allowed opacity-50"
      : "bg-transparent border-2 border-primary text-primary hover:bg-primary/10",
    tertiary: disabled
      ? "bg-transparent border-2 border-surface-tertiary text-text-tertiary cursor-not-allowed opacity-50"
      : "bg-surface-secondary border border-surface-tertiary text-text-primary hover:bg-surface-hover",
    ghost: disabled
      ? "text-text-tertiary cursor-not-allowed opacity-50"
      : "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-tertiary/50",
    destructive: disabled
      ? "bg-surface-tertiary text-text-tertiary cursor-not-allowed opacity-50"
      : "bg-feedback-error text-white hover:opacity-90",
    spotter: disabled
      ? "bg-surface-tertiary text-text-tertiary cursor-not-allowed opacity-50"
      : "bg-spotter text-black font-black hover:opacity-90 shadow-spotter-glow"
  };

  const sizes = {
    small: "h-[44px] px-4 text-[11px]",
    medium: "h-[52px] px-6 text-xs",
    large: "h-[60px] px-8 text-sm",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : 'w-auto'} ${className}`} 
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : null}
      {children}
    </button>
  );
};

// ==========================================
// 2. CARD (Container Elevato)
// ==========================================
export const Card = ({ children, className = '', ...props }) => (
  <div 
    className={`p-5 bg-surface-secondary rounded-3xl border border-surface-tertiary shadow-[0_4px_20px_-5px_rgba(0,0,0,0.4)] ${className}`}
    {...props}
  >
    {children}
  </div>
);

// ==========================================
// 3. STEPPER (Contatore Tattile Kg / Reps)
// ==========================================
export const Stepper = ({ label, value, onChange, step = 1, unit = '', min = 0 }) => {
  return (
    <div className="flex justify-between items-center bg-surface-secondary p-3.5 rounded-2xl border border-surface-tertiary">
      {label && <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest">{label}</span>}
      <div className="flex items-center gap-4 w-full justify-between sm:w-auto sm:justify-end">
        <button 
          type="button"
          aria-label={`Diminuisci ${label || 'valore'}`}
          onClick={() => onChange(Math.max(min, parseFloat((value - step).toFixed(2))))} 
          className="w-12 h-12 rounded-xl bg-surface-tertiary flex items-center justify-center font-black text-white hover:bg-surface-hover active:scale-90 transition-all min-h-[48px] min-w-[48px]"
        >–</button>
        <span className="w-20 text-center font-mono font-black text-xl text-text-primary select-none">
          {value}<span className="text-[10px] ml-1 text-text-tertiary font-sans">{unit}</span>
        </span>
        <button 
          type="button"
          aria-label={`Aumenta ${label || 'valore'}`}
          onClick={() => onChange(parseFloat((value + step).toFixed(2)))} 
          className="w-12 h-12 rounded-xl bg-surface-tertiary flex items-center justify-center font-black text-primary hover:bg-surface-hover active:scale-90 transition-all min-h-[48px] min-w-[48px]"
        >+</button>
      </div>
    </div>
  );
};

// ==========================================
// 4. TOGGLE (Switch ON/OFF)
// ==========================================
export const Toggle = ({ checked, onChange }) => (
  <button 
    type="button"
    onClick={() => onChange(!checked)} 
    className={`w-14 h-8 rounded-full transition-all relative focus:outline-none focus:ring-2 focus:ring-primary/40 ${checked ? 'bg-primary' : 'bg-surface-tertiary'}`}
  >
    <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
  </button>
);

// ==========================================
// 5. INPUT & SELECT (Form Controls)
// ==========================================
export const Input = ({ label, error, className = '', ...props }) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest">{label}</label>}
    <input 
      className={`h-[52px] px-4 bg-surface-secondary border border-surface-tertiary rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-text-tertiary transition-all ${error ? 'border-feedback-error' : ''} ${className}`}
      {...props}
    />
    {error && <span className="text-xs text-feedback-error font-medium">{error}</span>}
  </div>
);

export const Select = ({ label, options = [], className = '', ...props }) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest">{label}</label>}
    <select 
      className={`h-[52px] px-4 bg-surface-secondary border border-surface-tertiary rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all ${className}`}
      {...props}
    >
      {options.map((opt, i) => (
        <option key={i} value={opt.value || opt} className="bg-surface-secondary text-text-primary">
          {opt.label || opt}
        </option>
      ))}
    </select>
  </div>
);

// ==========================================
// 6. BADGE (Etichetta di Stato / Gruppo)
// ==========================================
export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: "bg-surface-tertiary text-text-secondary border border-surface-tertiary",
    primary: "bg-primary/10 text-primary border border-primary/30",
    spotter: "bg-spotter/10 text-spotter border border-spotter/30",
    success: "bg-feedback-success/10 text-feedback-success border border-feedback-success/30",
    warning: "bg-feedback-warning/10 text-feedback-warning border border-feedback-warning/30",
    error: "bg-feedback-error/10 text-feedback-error border border-feedback-error/30"
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// ==========================================
// 7. TOAST (Notifica Tattile Temporanea)
// ==========================================
export const Toast = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-feedback-success flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-feedback-error flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-spotter flex-shrink-0" />
  };

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[380px] bg-surface-secondary border border-surface-tertiary p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-5 duration-200">
      <div className="flex items-center gap-3">
        {icons[type]}
        <span className="text-xs font-bold text-text-primary">{message}</span>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-text-tertiary hover:text-text-primary p-1">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

// ==========================================
// 8. MODAL / DRAWER (Dialog Sovrapposto)
// ==========================================
export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-[400px] bg-surface-secondary border border-surface-tertiary rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-4">
          {title && <h3 className="text-base font-black uppercase tracking-wider text-text-primary">{title}</h3>}
          <button onClick={onClose} className="p-2 text-text-tertiary hover:text-text-primary rounded-xl hover:bg-surface-tertiary">
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// ==========================================
// 9. EMPTY STATE (Lista o Contenuto Vuoto)
// ==========================================
export const EmptyState = ({ icon: Icon, title, description, actionLabel, onAction }) => (
  <div className="flex flex-col items-center justify-center p-8 text-center bg-surface-secondary/40 border border-dashed border-surface-tertiary rounded-3xl my-4">
    {Icon && <Icon className="w-12 h-12 text-text-tertiary mb-3 stroke-[1.5]" />}
    <h4 className="text-sm font-black text-text-primary uppercase tracking-wider mb-1">{title}</h4>
    {description && <p className="text-xs text-text-secondary max-w-[260px] mb-4">{description}</p>}
    {actionLabel && onAction && (
      <Button variant="secondary" size="small" onClick={onAction}>
        {actionLabel}
      </Button>
    )}
  </div>
);

// Tooltip per compatibilità
export const Tooltip = ({ text, children, position = 'top' }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  if (!text) return children;

  return (
    <div 
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div onClick={(e) => { e.stopPropagation(); setIsOpen(prev => !prev); }}>
        {children}
      </div>
      {isOpen && (
        <div className={`absolute z-[100] px-3 py-1.5 rounded-xl bg-surface-tertiary text-white text-[11px] font-bold shadow-2xl border border-white/10 whitespace-nowrap pointer-events-none transition-all ${
          position === 'top' ? 'bottom-full mb-2 left-1/2 -translate-x-1/2' : 'top-full mt-2 left-1/2 -translate-x-1/2'
        }`}>
          {text}
        </div>
      )}
    </div>
  );
};
