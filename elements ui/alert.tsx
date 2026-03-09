import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X, CheckCircle2, Info, AlertTriangle, XCircle } from "lucide-react";

import { cn } from "./utils";

// ============================================================================
// ALERT VARIANTS (Ant Design Pattern)
// ============================================================================

const alertVariants = cva(
  "relative w-full border-2 p-4 transition-all",
  {
    variants: {
      variant: {
        success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200",
        info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200",
        warning: "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-200",
        error: "bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200",
      },
      size: {
        small: "p-2 text-xs",
        middle: "p-3 text-sm",
        large: "p-4 text-base",
      },
    },
    defaultVariants: {
      variant: "info",
      size: "middle",
    },
  }
);

// ============================================================================
// ALERT COMPONENT
// ============================================================================

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode;
  showIcon?: boolean;
  closable?: boolean;
  onClose?: () => void;
  afterClose?: () => void;
  closeText?: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant,
      size,
      icon,
      showIcon = false,
      closable = false,
      onClose,
      afterClose,
      closeText,
      children,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = React.useState(true);

    const handleClose = () => {
      setVisible(false);
      onClose?.();
      setTimeout(() => {
        afterClose?.();
      }, 300);
    };

    const getDefaultIcon = () => {
      const iconProps = { className: "h-5 w-5" };
      switch (variant) {
        case "success":
          return <CheckCircle2 {...iconProps} aria-label="Éxito" />;
        case "info":
          return <Info {...iconProps} aria-label="Información" />;
        case "warning":
          return <AlertTriangle {...iconProps} aria-label="Advertencia" />;
        case "error":
          return <XCircle {...iconProps} aria-label="Error" />;
        default:
          return <Info {...iconProps} aria-label="Información" />;
      }
    };

    if (!visible) {
      return null;
    }

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          alertVariants({ variant, size }),
          "rounded-lg",
          !visible && "opacity-0",
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-3">
          {showIcon && (
            <div className="flex-shrink-0 mt-0.5" aria-hidden={!!icon ? undefined : "false"} role="img">
              {icon || getDefaultIcon()}
            </div>
          )}

          <div className="flex-1 min-w-0">
            {children}
          </div>

          {closable && (
            <button
              type="button"
              onClick={handleClose}
              className="flex-shrink-0 ml-2 hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2 rounded"
              aria-label="Cerrar alerta"
            >
              {closeText || <X className="h-4 w-4" />}
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = "Alert";

// ============================================================================
// ALERT TITLE
// ============================================================================

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));

AlertTitle.displayName = "AlertTitle";

// ============================================================================
// ALERT DESCRIPTION
// ============================================================================

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed opacity-90", className)}
    {...props}
  />
));

AlertDescription.displayName = "AlertDescription";

// ============================================================================
// EXPORTS
// ============================================================================

export { Alert, AlertTitle, AlertDescription };