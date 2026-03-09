import * as React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from './button';
import { cn } from './utils';

export interface PopconfirmProps {
  children: React.ReactElement;
  title: React.ReactNode;
  description?: React.ReactNode;
  okText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  okButtonProps?: React.ComponentProps<typeof Button>;
  cancelButtonProps?: React.ComponentProps<typeof Button>;
  icon?: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  disabled?: boolean;
  showCancel?: boolean;
}

export function Popconfirm({
  children,
  title,
  description,
  okText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  okButtonProps,
  cancelButtonProps,
  icon = <AlertTriangle className="h-5 w-5 text-yellow-500" aria-label="Advertencia" />,
  placement = 'top',
  disabled = false,
  showCancel = true,
}: PopconfirmProps) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleConfirm = async () => {
    if (onConfirm) {
      setLoading(true);
      try {
        await onConfirm();
        setOpen(false);
      } catch (error) {
        console.error('Popconfirm error:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setOpen(false);
    }
  };

  const handleCancel = () => {
    onCancel?.();
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!disabled) {
      setOpen(newOpen);
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        {React.cloneElement(children, {
          disabled: disabled || children.props.disabled,
        })}
      </PopoverTrigger>
      <PopoverContent
        side={placement}
        className="w-80 p-0"
        onOpenAutoFocus={(e) => e.preventDefault()}
        role="alertdialog"
        aria-label={typeof title === 'string' ? title : 'Confirmacion'}
      >
        <div className="p-4 space-y-3">
          <div className="flex gap-3">
            {icon && <div className="flex-shrink-0 pt-0.5">{icon}</div>}
            <div className="flex-1 space-y-1">
              <div className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                {title}
              </div>
              {description && (
                <div className="text-sm text-muted-foreground">
                  {description}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            {showCancel && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={loading}
                {...cancelButtonProps}
              >
                {cancelText}
              </Button>
            )}
            <Button
              size="sm"
              onClick={handleConfirm}
              disabled={loading}
              {...okButtonProps}
            >
              {loading ? 'Procesando...' : okText}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export interface PopconfirmDestructiveProps extends PopconfirmProps {
  variant?: 'destructive';
}

export function PopconfirmDestructive({
  okButtonProps,
  ...props
}: PopconfirmDestructiveProps) {
  return (
    <Popconfirm
      {...props}
      okButtonProps={{
        variant: 'destructive',
        ...okButtonProps,
      }}
    />
  );
}