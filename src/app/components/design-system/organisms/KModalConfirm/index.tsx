import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { AlertTriangle, Info, CheckCircle, AlertCircle } from 'lucide-react';
import { khorTokens } from '../../../../theme/khor-theme';
import { KButton } from '../../atoms';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KModalConfirm — Modal de confirmación declarativo
   ═══════════════════════════════════════════════ */
export type KModalConfirmType = 'confirm' | 'info' | 'success' | 'warning' | 'error';

export interface KModalConfirmProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  content?: React.ReactNode;
  okText?: string;
  cancelText?: string;
  type?: KModalConfirmType;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void;
  showCancel?: boolean;
  width?: number;
}

const confirmIconMap: Record<KModalConfirmType, { icon: React.ReactNode; color: string }> = {
  confirm: { icon: <AlertTriangle size={24} />, color: khorTokens.colors.brand.accent },
  info: { icon: <Info size={24} />, color: khorTokens.colors.brand.navy },
  success: { icon: <CheckCircle size={24} />, color: khorTokens.colors.feedback.success },
  warning: { icon: <AlertTriangle size={24} />, color: khorTokens.colors.brand.accent },
  error: { icon: <AlertCircle size={24} />, color: khorTokens.colors.feedback.error },
};

export function KModalConfirm({
  open, onClose, title, content, okText = 'Aceptar', cancelText = 'Cancelar',
  type = 'confirm', onOk, onCancel, showCancel = true, width = 420,
}: KModalConfirmProps) {
  const [loading, setLoading] = useState(false);
  const cfg = confirmIconMap[type];

  const handleOk = async () => {
    if (onOk) {
      const result = onOk();
      if (result instanceof Promise) { setLoading(true); await result; setLoading(false); }
    }
    onClose();
  };

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 999 }} />
        <Dialog.Content style={{
          position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width, maxWidth: '90vw', backgroundColor: t.colors.neutral[50],
          borderRadius: t.radius.xl, boxShadow: t.shadows.lg, fontFamily: font,
          zIndex: 1000, padding: 24,
        }}>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ color: cfg.color, flexShrink: 0, marginTop: 2 }}>{cfg.icon}</div>
            <div style={{ flex: 1 }}>
              {title && <Dialog.Title style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 600, color: t.colors.neutral[900] }}>{title}</Dialog.Title>}
              {content && <Dialog.Description style={{ margin: 0, fontSize: 14, color: t.colors.neutral[500], lineHeight: 1.6 }}>{content}</Dialog.Description>}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 24 }}>
            {showCancel && (
              <KButton variant="ghost" onClick={() => { onCancel?.(); onClose(); }}>{cancelText}</KButton>
            )}
            <KButton
              variant={type === 'error' ? 'danger' : 'primary'}
              loading={loading}
              onClick={handleOk}
            >
              {okText}
            </KButton>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default KModalConfirm;
