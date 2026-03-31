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

  return (
    <div
      role="alert"
      className={cn(
        "relative flex w-full gap-3 p-4 border rounded-lg transition-all animate-in fade-in zoom-in-95 duration-300 font-primary",
        styles[type],
        className
      )}
      style={style}
    >
      {showIcon && Icon && (
        <div className={cn("mt-0.5 shrink-0", iconStyles[type])}>
          <Icon className="w-5 h-5" />
        </div>
      )}
      <div className="flex flex-col gap-1 flex-1">
        <h4 className="text-sm font-semibold leading-tight">
          {title}
        </h4>
        {description && (
          <p className="text-xs opacity-90 leading-normal">
            {description}
          </p>
        )}
      </div>
      {closable && (
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 focus:outline-none opacity-50 hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default KAlert;
