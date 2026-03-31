import React from 'react';
import { toast } from 'sonner';

export type KMessageType = 'success' | 'error' | 'warning' | 'info' | 'loading';

export interface KMessageOptions {
  type?: KMessageType;
  content: React.ReactNode;
  duration?: number;
  icon?: React.ReactNode;
  onClose?: () => void;
}

/** 
 * KMessage utilizando Sonner por debajo.
 */
export function kMessage(opts: KMessageOptions | string) {
  const isStr = typeof opts === 'string';
  const type = isStr ? 'info' : (opts.type || 'info');
  const content = isStr ? opts : opts.content;
  const duration = (isStr ? 3 : (opts.duration || 3)) * 1000;
  const icon = isStr ? undefined : opts.icon;
  const onClose = isStr ? undefined : opts.onClose;

  const options = { duration, icon, onDismiss: onClose };

  switch (type) {
    case 'success':
      return toast.success(content, options);
    case 'error':
      return toast.error(content, options);
    case 'warning':
      return toast.warning(content, options);
    case 'loading':
      return toast.loading(content, options);
    default:
      return toast.info(content, options);
  }
}

// Static methods for compatibility
kMessage.success = (content: React.ReactNode, duration?: number) => kMessage({ type: 'success', content, duration });
kMessage.error = (content: React.ReactNode, duration?: number) => kMessage({ type: 'error', content, duration });
kMessage.warning = (content: React.ReactNode, duration?: number) => kMessage({ type: 'warning', content, duration });
kMessage.info = (content: React.ReactNode, duration?: number) => kMessage({ type: 'info', content, duration });
kMessage.loading = (content: React.ReactNode, duration?: number) => kMessage({ type: 'loading', content, duration });

export default kMessage;
