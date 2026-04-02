import React from 'react';
import { toast, Toaster as SonnerToaster } from 'sonner';

export type KNotificationType = 'success' | 'error' | 'warning' | 'info' | 'open';

export interface KNotificationOptions {
  type?: KNotificationType;
  message: React.ReactNode;
  description?: React.ReactNode;
  duration?: number;
  icon?: React.ReactNode;
  onClose?: () => void;
}

/** 
 * Función imperativa usando Sonner 
 */
export function kNotification(opts: KNotificationOptions) {
  const options = {
    description: opts.description,
    duration: opts.duration ? opts.duration * 1000 : undefined, // Sonner usa ms, AntD usaba segundos
    icon: opts.icon,
    onDismiss: opts.onClose,
  };

  switch (opts.type) {
    case 'success':
      return toast.success(opts.message, options);
    case 'error':
      return toast.error(opts.message, options);
    case 'warning':
      return toast.warning(opts.message, options);
    case 'info':
      return toast.info(opts.message, options);
    default:
      return toast(opts.message, options);
  }
}

// Static methods
kNotification.success = (args: Omit<KNotificationOptions, 'type'>) => kNotification({ ...args, type: 'success' });
kNotification.error = (args: Omit<KNotificationOptions, 'type'>) => kNotification({ ...args, type: 'error' });
kNotification.warning = (args: Omit<KNotificationOptions, 'type'>) => kNotification({ ...args, type: 'warning' });
kNotification.info = (args: Omit<KNotificationOptions, 'type'>) => kNotification({ ...args, type: 'info' });
kNotification.open = (args: Omit<KNotificationOptions, 'type'>) => kNotification({ ...args, type: 'open' });

/** 
 * KToaster: Componente que debe montarse en el Root de la aplicación 
 * para poder visualizar las notificaciones Headless.
 */
export function KToaster(props: React.ComponentProps<typeof SonnerToaster>) {
  return (
    <SonnerToaster 
      className="font-primary"
      toastOptions={{
        classNames: {
          toast: 'bg-khor-surface-page border-khor-neutral-200 shadow-lg rounded-md',
          title: 'text-khor-neutral-900 font-semibold text-sm font-primary',
          description: 'text-khor-neutral-500 text-sm font-primary',
          actionButton: 'bg-khor-primary text-white font-primary',
          cancelButton: 'bg-khor-neutral-100 text-khor-neutral-900 font-primary',
          success: 'border-green-500 text-green-700',
          error: 'border-red-500 text-red-700',
          warning: 'border-yellow-500 text-yellow-700',
          info: 'border-blue-500 text-blue-700',
        },
      }}
      {...props} 
    />
  );
}

// Retrocompatibilidad con el antiguo KNotificationProvider (ahora monta Toaster)
export const KNotificationProvider = KToaster;

export default kNotification;
