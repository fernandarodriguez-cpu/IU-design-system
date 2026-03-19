import { notification } from 'antd';
import React from 'react';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KNotification — Notificaciones (Organismo)
   ═══════════════════════════════════════════════ */
export type KNotificationType = 'success' | 'error' | 'warning' | 'info' | 'open';

export interface KNotificationOptions {
  type?: KNotificationType;
  message: React.ReactNode;
  description?: React.ReactNode;
  placement?: 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft' | 'top' | 'bottom';
  duration?: number;
  key?: string;
  icon?: React.ReactNode;
  btn?: React.ReactNode;
  onClose?: () => void;
}

/** Función imperativa */
export function kNotification(opts: KNotificationOptions) {
  const { type = 'open', message: msg, description, placement = 'topRight', duration = 4.5, key, icon, btn, onClose } = opts;
  if (type === 'open') {
    notification.open({ message: msg, description, placement, duration, key, icon, btn, style: { fontFamily: font }, onClose });
  } else {
    notification[type]({ message: msg, description, placement, duration, key, icon, btn, style: { fontFamily: font }, onClose });
  }
}

// Static methods for compatibility
kNotification.success = (args: Omit<KNotificationOptions, 'type'>) => kNotification({ ...args, type: 'success' });
kNotification.error = (args: Omit<KNotificationOptions, 'type'>) => kNotification({ ...args, type: 'error' });
kNotification.warning = (args: Omit<KNotificationOptions, 'type'>) => kNotification({ ...args, type: 'warning' });
kNotification.info = (args: Omit<KNotificationOptions, 'type'>) => kNotification({ ...args, type: 'info' });
kNotification.open = (args: Omit<KNotificationOptions, 'type'>) => kNotification({ ...args, type: 'open' });

/** Re-export AntD notification instance */
export { notification as KNotificationInstance };

export function KNotificationProvider() {
  return null;
}

export default kNotification;
