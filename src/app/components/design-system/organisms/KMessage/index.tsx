import React from 'react';
import { toast } from 'sonner';
import { 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  AlertTriangle, 
  Loader2 
} from 'lucide-react';
import { cn } from '../../../../../imports/utils';

export type KMessageType = 'success' | 'error' | 'warning' | 'info' | 'loading';

export interface KMessageOptions {
  type?: KMessageType;
  content: React.ReactNode;
  duration?: number;
  icon?: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

/** 
 * KMessage utilizando Sonner por debajo con renderizado premium.
 */
export function kMessage(opts: KMessageOptions | string) {
  const isStr = typeof opts === 'string';
  const type = isStr ? 'info' : (opts.type || 'info');
  const content = isStr ? opts : opts.content;
  const duration = (isStr ? 3 : (opts.duration || 3)) * 1000;
  const onClose = isStr ? undefined : opts.onClose;
  const className = isStr ? undefined : opts.className;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
    error: <AlertCircle className="w-4 h-4 text-rose-600" />,
    info: <Info className="w-4 h-4 text-sky-600" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-600" />,
    loading: <Loader2 className="w-4 h-4 text-sky-600 animate-spin" />,
  };

  const bgColors = {
    success: "bg-khor-success-light border-khor-success/10 text-emerald-900",
    error: "bg-khor-error-light border-khor-error/10 text-rose-900",
    info: "bg-khor-info-light border-khor-info/10 text-sky-900",
    warning: "bg-khor-warning-light border-khor-warning/10 text-amber-900",
    loading: "bg-white border-khor-neutral-200 text-khor-neutral-900",
  };

  return toast.custom((t) => (
    <div 
      className={cn(
        "flex items-center gap-3 px-4 py-2.5 rounded-full border shadow-lg shadow-black/5 animate-in fade-in zoom-in-95 duration-200 font-primary mx-auto",
        bgColors[type],
        className
      )}
    >
      <span className="shrink-0">{icons[type]}</span>
      <span className="text-sm font-semibold tracking-tight leading-none truncate max-w-[300px]">
        {content}
      </span>
    </div>
  ), { duration, onDismiss: onClose });
}

// Static methods for compatibility
kMessage.success = (content: React.ReactNode, duration?: number) => kMessage({ type: 'success', content, duration });
kMessage.error = (content: React.ReactNode, duration?: number) => kMessage({ type: 'error', content, duration });
kMessage.warning = (content: React.ReactNode, duration?: number) => kMessage({ type: 'warning', content, duration });
kMessage.info = (content: React.ReactNode, duration?: number) => kMessage({ type: 'info', content, duration });
kMessage.loading = (content: React.ReactNode, duration?: number) => kMessage({ type: 'loading', content, duration });

export default kMessage;
