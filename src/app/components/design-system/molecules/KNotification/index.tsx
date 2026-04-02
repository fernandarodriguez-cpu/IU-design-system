import { toast } from 'sonner';
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import React from 'react';
import { cn } from '../../../../../imports/utils';

export type KNotificationType = 'success' | 'error' | 'info' | 'warning';

export interface KNotificationProps {
  message: React.ReactNode;
  description?: React.ReactNode;
  type?: KNotificationType;
  duration?: number;
  placement?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
  className?: string;
  style?: React.CSSProperties;
}

/**
 * showKNotification — Notificador de eventos del sistema (Total Headless)
 * Basado en Sonner para una gestión de cola de notificaciones fluida y agnóstica.
 */
export function showKNotification({
  message,
  description,
  type = 'info',
  duration = 5000,
  className,
  style,
}: KNotificationProps) {
  
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-sky-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
  };

  const bgColors = {
    success: "bg-khor-success-light border-khor-success/20",
    error: "bg-khor-error-light border-khor-error/20",
    info: "bg-khor-info-light border-khor-info/20",
    warning: "bg-khor-warning-light border-khor-warning/20",
  };

  toast.custom((t) => (
    <div 
      className={cn(
        "flex flex-col gap-1 p-5 min-w-[360px] max-w-[480px] border rounded-2xl shadow-[0_15px_45px_rgba(0,0,0,0.1)] animate-in slide-in-from-right-10 duration-300 font-primary relative overflow-hidden",
        bgColors[type],
        className
      )}
      style={style}
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 mt-1">
          {icons[type]}
        </div>
        
        <div className="flex-1 flex flex-col gap-1">
          <h4 className="text-sm font-black text-khor-neutral-900 leading-tight tracking-tight uppercase">
            {message}
          </h4>
          {description && (
            <p className="text-xs text-khor-neutral-500 leading-relaxed font-medium">
              {description}
            </p>
          )}
        </div>
      </div>

      <button 
        onClick={() => toast.dismiss(t)} 
        className="absolute top-4 right-4 p-1 text-khor-neutral-300 hover:text-khor-neutral-900 transition-colors rounded-lg hover:bg-khor-neutral-50"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Decorative colored bar */}
      <div className={cn(
        "absolute left-0 top-0 bottom-0 w-1",
        type === 'success' ? "bg-emerald-500" :
        type === 'error' ? "bg-red-500" :
        type === 'warning' ? "bg-amber-500" : "bg-sky-500"
      )} />
    </div>
  ), { duration });
}

export default showKNotification;
