import React from 'react';
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from 'lucide-react';
import { cn } from '../../../../../imports/utils';

export interface KAlertProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  closable?: boolean;
  onClose?: () => void;
  showIcon?: boolean;
  banner?: boolean;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const icons = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const styles = {
  success: "bg-emerald-50 border-emerald-200 text-emerald-800",
  error: "bg-red-50 border-red-200 text-red-800",
  warning: "bg-amber-50 border-amber-200 text-amber-800",
  info: "bg-sky-50 border-sky-200 text-sky-800",
};

const iconStyles = {
  success: "text-emerald-500",
  error: "text-red-500",
  warning: "text-amber-500",
  info: "text-sky-500",
};

export function KAlert({
  type = 'info',
  title,
  description,
  closable,
  onClose,
  showIcon = true,
  banner,
  action,
  icon,
  className,
  style,
}: KAlertProps) {
  const [visible, setVisible] = React.useState(true);
  const Icon = icons[type];

  if (!visible) return null;

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  const ResolvedIcon = icon || (Icon ? <Icon className="w-5 h-5" /> : null);

  return (
    <div
      role="alert"
      className={cn(
        "relative flex w-full gap-3 transition-all animate-in fade-in zoom-in-95 duration-300 font-primary",
        banner ? "p-3 border-0 rounded-none items-center" : "p-4 border rounded-lg",
        styles[type],
        className
      )}
      style={style}
    >
      {showIcon && ResolvedIcon && (
        <div className={cn("shrink-0", !banner && "mt-0.5", iconStyles[type])}>
          {ResolvedIcon}
        </div>
      )}
      <div className={cn("flex flex-1", banner ? "flex-row items-center gap-2" : "flex-col gap-1")}>
        <h4 className="text-sm font-semibold leading-tight">
          {title}
        </h4>
        {description && (
          <p className="text-xs opacity-90 leading-normal">
            {description}
          </p>
        )}
      </div>
      {(action || closable) && (
         <div className={cn("flex items-center gap-2 shrink-0")}>
            {action && <div>{action}</div>}
            {closable && (
              <button
                onClick={handleClose}
                className={cn(
                  "focus:outline-none opacity-50 hover:opacity-100 transition-opacity", 
                  !banner && "absolute top-4 right-4",
                  banner && "relative ml-2"
                )}
              >
                <X className="w-4 h-4" />
              </button>
            )}
         </div>
      )}
    </div>
  );
}

export default KAlert;
