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
  opacity?: number;
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
  opacity = 0.95,
}: KNotificationProps) {
  
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-khor-success" />,
    error: <XCircle className="w-5 h-5 text-khor-error" />,
    info: <Info className="w-5 h-5 text-khor-info" />,
    warning: <AlertTriangle className="w-5 h-5 text-khor-warning" />,
  };

  const bgColors = {
    success: "bg-khor-success-50 border-khor-success-200/50",
    error: "bg-khor-error-50 border-khor-error-200/50",
    info: "bg-khor-info-50 border-khor-info-200/50",
    warning: "bg-khor-warning-50 border-khor-warning-200/50",
  };

  toast.custom((t) => (
    <div 
      className={cn(
        "flex items-start gap-4 p-5 min-w-[360px] max-w-[480px] border rounded-2xl shadow-khor-lg animate-in slide-in-from-right-10 duration-300 font-primary relative overflow-hidden",
        bgColors[type],
        className
      )}
      style={{ backgroundColor: 'white', opacity, ...style }}
    >
      <div className="shrink-0 mt-0.5">
        {icons[type]}
      </div>
      
      <div className="flex-1 flex flex-col gap-1 pr-6">
        <h4 className="text-sm font-black text-khor-neutral-900 leading-tight tracking-tight uppercase">
          {message}
        </h4>
        {description && (
          <p className="text-xs text-khor-neutral-500 leading-relaxed font-medium">
            {description}
          </p>
        )}
      </div>

      <button 
        onClick={() => toast.dismiss(t)} 
        className="absolute top-4 right-4 p-1 text-khor-neutral-300 hover:text-khor-neutral-900 transition-colors rounded-lg hover:bg-white/50"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Decorative colored bar */}
      <div className={cn(
        "absolute left-0 top-0 bottom-0 w-1",
        type === 'success' ? "bg-khor-success" :
        type === 'error' ? "bg-khor-error" :
        type === 'warning' ? "bg-khor-warning" : "bg-khor-info"
      )} />
    </div>
  ), { duration });
}

export default showKNotification;
