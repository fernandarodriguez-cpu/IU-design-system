import React from 'react';
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface KAlertProps {
  type?: 'success' | 'error' | 'warning' | 'info' | 'teal';
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
  teal: CheckCircle2,
};

const styles = {
  success: "bg-khor-success-light border-khor-success/30 text-khor-success",
  error: "bg-khor-error-light border-khor-error/30 text-khor-error",
  warning: "bg-khor-warning-light border-khor-warning/30 text-khor-warning",
  info: "bg-khor-info-light border-khor-info/30 text-khor-info",
  teal: "bg-khor-teal-light border-khor-teal/30 text-khor-teal",
};

const iconStyles = {
  success: "text-khor-success",
  error: "text-khor-error",
  warning: "text-khor-warning",
  info: "text-khor-info",
  teal: "text-khor-teal",
};

/**
 * @figma-mcp-migration
 * Component: KAlert
 * 
 * INSTRUCCIONES PARA AGENTES DE IA (VS Code / MCP):
 * Para migrar este componente a Figma, NO generar una matriz multiplicando todas las variables.
 * Utilizar Figma Component Properties V2 con la siguiente estructura:
 * 
 * 1. Variants (Estructurales):
 *    - Definir variantes puramente visuales/estructurales.
 * 2. Booleans (Encendido/Apagado):
 *    - Definir encendido/apagado para iconos o estados (isLoading, hasIcon).
 * 3. Color Variables (No usar variantes para colores semánticos):
 *    - El relleno/borde debe usar Figma Variables (Khor v6.0 Colors) asignado dinámicamente.
 *    - El consumidor del UI Kit cambiará el color del layer.
 */
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
