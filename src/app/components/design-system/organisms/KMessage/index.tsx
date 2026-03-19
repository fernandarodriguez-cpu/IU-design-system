import { message } from 'antd';
import React from 'react';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KMessage — Mensajes tipo toast (Organismo)
   ═══════════════════════════════════════════════ */
export type KMessageType = 'success' | 'error' | 'warning' | 'info' | 'loading';

export interface KMessageOptions {
  type?: KMessageType;
  content: React.ReactNode;
  duration?: number;
  key?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
}

/** Función imperativa */
export function kMessage(opts: KMessageOptions | string) {
  const isStr = typeof opts === 'string';
  const type = isStr ? 'info' : (opts.type || 'info');
  const content = isStr ? opts : opts.content;
  const duration = isStr ? 3 : (opts.duration || 3);
  const key = isStr ? undefined : opts.key;
  const icon = isStr ? undefined : opts.icon;
  const onClose = isStr ? undefined : opts.onClose;

  return message[type]({ content, duration, key, icon, onClose, style: { fontFamily: font } });
}

// Static methods for compatibility
kMessage.success = (content: React.ReactNode, duration?: number) => kMessage({ type: 'success', content, duration });
kMessage.error = (content: React.ReactNode, duration?: number) => kMessage({ type: 'error', content, duration });
kMessage.warning = (content: React.ReactNode, duration?: number) => kMessage({ type: 'warning', content, duration });
kMessage.info = (content: React.ReactNode, duration?: number) => kMessage({ type: 'info', content, duration });
kMessage.loading = (content: React.ReactNode, duration?: number) => kMessage({ type: 'loading', content, duration });

export default kMessage;
