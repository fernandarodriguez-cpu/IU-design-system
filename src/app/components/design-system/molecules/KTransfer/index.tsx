import React from 'react';
import { Transfer } from 'antd';
import type { TransferProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KTransfer — Transferencia entre listas (Wave 3)
   ═══════════════════════════════════════════════ */
export interface KTransferItem {
  key: string;
  title: string;
  description?: string;
  disabled?: boolean;
}

export interface KTransferProps extends Omit<TransferProps<KTransferItem>, 'dataSource' | 'render'> {
  dataSource: KTransferItem[];
}

export function KTransfer({ dataSource, targetKeys, onChange, className, style, ...rest }: KTransferProps) {
  return (
    <Transfer
      dataSource={dataSource}
      targetKeys={targetKeys}
      onChange={onChange}
      render={(item) => item.title}
      className={className}
      style={{ fontFamily: font, ...style }}
      {...rest}
    />
  );
}

export default KTransfer;
