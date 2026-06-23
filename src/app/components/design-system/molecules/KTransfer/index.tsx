import React from 'react';
import { Transfer as AntTransfer, type TransferProps as AntTransferProps } from 'antd';
import { cn } from '@/utils/cn';

/* ─── KTransfer ────────────────────────────────────────────────
   New Khor molecule wrapping Ant Design's Transfer.
   Colors (navy primary #051758, secondary #E04D36, radius 6,
   control heights, Montserrat) come from the global theme bridge
   in khorAntdTheme.ts; this wrapper only exposes the Khor public
   API surface and keeps `font-primary` on the root.
──────────────────────────────────────────────────────────────── */

/** Minimal record shape AntD Transfer expects (key + disabled + arbitrary fields). */
export interface KTransferItem {
  key: string;
  disabled?: boolean;
  [name: string]: any;
}

export interface KTransferProps
  extends Omit<
    AntTransferProps<KTransferItem>,
    | 'dataSource'
    | 'targetKeys'
    | 'selectedKeys'
    | 'onChange'
    | 'onSelectChange'
    | 'render'
    | 'titles'
    | 'showSearch'
    | 'disabled'
    | 'oneWay'
  > {
  dataSource?: KTransferItem[];
  targetKeys?: string[];
  selectedKeys?: string[];
  onChange?: AntTransferProps<KTransferItem>['onChange'];
  onSelectChange?: AntTransferProps<KTransferItem>['onSelectChange'];
  render?: AntTransferProps<KTransferItem>['render'];
  titles?: React.ReactNode[];
  showSearch?: boolean;
  disabled?: boolean;
  oneWay?: boolean;
}

export const KTransfer = React.forwardRef<HTMLDivElement, KTransferProps>(function KTransfer(
  {
    className,
    dataSource = [],
    targetKeys,
    selectedKeys,
    onChange,
    onSelectChange,
    render,
    titles,
    showSearch,
    disabled,
    oneWay,
    ...rest
  },
  ref,
) {
  return (
    <div ref={ref} className={cn('font-primary', className)}>
      <AntTransfer<KTransferItem>
        dataSource={dataSource}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={onChange}
        onSelectChange={onSelectChange}
        render={render ?? ((item) => item.title ?? item.key)}
        titles={titles}
        showSearch={showSearch}
        disabled={disabled}
        oneWay={oneWay}
        {...rest}
      />
    </div>
  );
});

KTransfer.displayName = 'KTransfer';
export default KTransfer;
