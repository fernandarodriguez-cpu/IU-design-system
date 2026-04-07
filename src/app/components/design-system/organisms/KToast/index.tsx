import React from 'react';
import { toast, Toaster as SonnerToaster } from 'sonner';
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '../../../../../imports/utils';

export type KToastType = 'success' | 'error' | 'info' | 'warning';

export interface KToastProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  content?: React.ReactNode;
  type?: KToastType;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * kToast — Notificador flotante (v4 Headless)
 * Implementación funcional sobre Sonner para una experiencia de usuario rápida y fluida.
 */
export function kToast({ 
  title, 
  description, 
  type = 'info', 
  duration = 4000, 
  className,
  style 
}: KToastProps) {
  
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-sky-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
  };

  return toast.custom((t) => (
    <div 
      className={cn(
        "flex items-start gap-4 p-4 min-w-[320px] max-w-[420px] bg-white border border-khor-neutral-200 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] animate-in slide-in-from-right-full duration-300 font-primary relative",
        className
      )}
      style={style}
    >
      <div className="shrink-0 mt-0.5">
        {icons[type]}
      </div>
      
      <div className="flex-1 flex flex-col gap-1 pr-6">
        {title && (
          <h4 className="text-sm font-extrabold text-khor-neutral-900 leading-tight tracking-tight">
            {title}
          </h4>
        )}
        {description && (
          <p className="text-xs text-khor-neutral-500 leading-relaxed font-medium">
            {description}
          </p>
        )}
      </div>

      <button 
        onClick={() => toast.dismiss(t)} 
        className="absolute top-4 right-4 p-1 text-khor-neutral-300 hover:text-khor-neutral-900 transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  ), { duration });
}

// ─── Metodos Estaticos (Wave 11) ───
kToast.success = (props: KToastProps | string) => {
  const p = typeof props === 'string' ? { title: props } : props;
  return kToast({ ...p, type: 'success' });
};
kToast.error = (props: KToastProps | string) => {
  const p = typeof props === 'string' ? { title: props } : props;
  return kToast({ ...p, type: 'error' });
};
kToast.info = (props: KToastProps | string) => {
  const p = typeof props === 'string' ? { title: props } : props;
  return kToast({ ...p, type: 'info' });
};
kToast.warning = (props: KToastProps | string) => {
  const p = typeof props === 'string' ? { title: props } : props;
  return kToast({ ...p, type: 'warning' });
};

/**
 * KToastProvider — Contenedor de notificaciones globales.
 */
export function KToastProvider() {
  return (
    <SonnerToaster 
      position="top-right" 
      expand={false} 
      visibleToasts={5}
      toastOptions={{
        unstyled: true,
      }}
    />
  );
}

export default kToast;
