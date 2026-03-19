import React from 'react';
import { Modal } from 'antd';
import type { ModalProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KModalProps extends ModalProps { }

export function KModal({ style, centered = true, ...rest }: KModalProps) {
  return (
    <Modal
      centered={centered}
      style={{
        fontFamily: font,
        ...style
      }}
      {...rest}
    />
  );
}

export default KModal;
