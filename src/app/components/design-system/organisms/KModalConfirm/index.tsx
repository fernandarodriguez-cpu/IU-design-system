import React from 'react';
import { Modal, Space } from 'antd';
import type { ModalProps } from 'antd';
import { AlertTriangle, Info, CheckCircle, AlertCircle } from 'lucide-react';
import { khorTokens } from '../../../../theme/khor-theme';
import { KButton } from '../../atoms';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KModalConfirm — Modal de confirmación declarativo
   ═══════════════════════════════════════════════ */
export type KModalConfirmType = 'confirm' | 'info' | 'success' | 'warning' | 'error';

export interface KModalConfirmProps extends Omit<ModalProps, 'title' | 'onOk'> {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  content?: React.ReactNode;
  type?: KModalConfirmType;
  onOk?: () => void | Promise<void>;
  showCancel?: boolean;
}

const confirmIconMap: Record<KModalConfirmType, { icon: React.ReactNode; color: string }> = {
  confirm: { icon: <AlertTriangle size={24} />, color: khorTokens.colors.brand.accent },
  info: { icon: <Info size={24} />, color: khorTokens.colors.brand.navy },
  success: { icon: <CheckCircle size={24} />, color: khorTokens.colors.feedback.success },
  warning: { icon: <AlertTriangle size={24} />, color: khorTokens.colors.brand.accent },
  error: { icon: <AlertCircle size={24} />, color: khorTokens.colors.feedback.error },
};

export function KModalConfirm({
  open, 
  onClose, 
  title, 
  content, 
  okText = 'Aceptar', 
  cancelText = 'Cancelar',
  type = 'confirm', 
  onOk, 
  onCancel, 
  showCancel = true, 
  width = 420,
  okButtonProps,
  ...rest
}: KModalConfirmProps) {
  
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const cfg = confirmIconMap[type];

  const handleOk = async () => {
    if (onOk) {
      try {
        const result = onOk();
        if (result instanceof Promise) {
          setConfirmLoading(true);
          await result;
        }
      } finally {
        setConfirmLoading(false);
      }
    }
    onClose();
  };

  const handleCancel = () => {
    onCancel?.(null as any);
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      width={width}
      centered
      footer={
        <Space size={8} style={{ width: '100%', justifyContent: 'flex-end' }}>
          {showCancel && (
            <KButton variant="secondary" onClick={handleCancel}>
              {cancelText}
            </KButton>
          )}
          <KButton
            variant={type === 'error' ? 'danger' : 'primary'}
            loading={confirmLoading}
            onClick={handleOk}
          >
            {okText}
          </KButton>
        </Space>
      }
      closable={false}
      bodyStyle={{ padding: '32px 32px 24px' }}
      {...rest}
    >
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ color: cfg.color, flexShrink: 0, marginTop: 2 }}>
          {cfg.icon}
        </div>
        <div style={{ flex: 1 }}>
          {title && (
            <h3 style={{ 
              margin: '0 0 8px', 
              fontSize: 18, 
              fontWeight: 600, 
              color: t.colors.neutral[900],
              fontFamily: font 
            }}>
              {title}
            </h3>
          )}
          {content && (
            <div style={{ 
              margin: 0, 
              fontSize: 14, 
              color: t.colors.neutral[500], 
              lineHeight: 1.6,
              fontFamily: font 
            }}>
              {content}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default KModalConfirm;
