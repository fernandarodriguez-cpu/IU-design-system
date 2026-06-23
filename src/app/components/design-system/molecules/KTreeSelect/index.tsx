import React from 'react';
import { TreeSelect as AntTreeSelect, type TreeSelectProps as AntTreeSelectProps } from 'antd';
import { cn } from '@/utils/cn';

/* ─── KTreeSelect ──────────────────────────────────────────────
   New component wrapping Ant Design 5 TreeSelect.
   Navy primary (#051758), secondary (#E04D36), radius 6, control
   heights 24/32/40 and Montserrat all come from the global theme
   bridge (khorAntdTheme.ts) via ConfigProvider — this wrapper only
   maps the Khor public API onto AntD and keeps `font-primary`.
──────────────────────────────────────────────────────────────── */

export interface KTreeSelectProps
  extends Omit<
    AntTreeSelectProps,
    'size' | 'status' | 'treeData' | 'value' | 'defaultValue' | 'onChange'
  > {
  treeData?: AntTreeSelectProps['treeData'];
  value?: AntTreeSelectProps['value'];
  defaultValue?: AntTreeSelectProps['defaultValue'];
  onChange?: AntTreeSelectProps['onChange'];
  multiple?: boolean;
  treeCheckable?: boolean;
  showSearch?: boolean;
  placeholder?: string;
  allowClear?: boolean;
  disabled?: boolean;
  /** Khor size scale → AntD control heights 24/32/40 */
  size?: 'sm' | 'md' | 'lg' | 'small' | 'middle' | 'large';
  status?: 'error' | 'warning' | 'default';
}

// Khor size → AntD size ('small' | 'middle' | 'large')
const SIZE_MAP: Record<string, 'small' | 'middle' | 'large'> = {
  sm: 'small',
  small: 'small',
  md: 'middle',
  middle: 'middle',
  lg: 'large',
  large: 'large',
};

export const KTreeSelect = React.forwardRef<any, KTreeSelectProps>(function KTreeSelect(
  {
    className,
    treeData,
    value,
    defaultValue,
    onChange,
    multiple,
    treeCheckable,
    showSearch,
    placeholder,
    allowClear,
    disabled,
    size = 'md',
    status = 'default',
    ...rest
  },
  ref,
) {
  const antSize = SIZE_MAP[size] ?? 'middle';
  const antStatus = status === 'default' ? undefined : status;

  return (
    <AntTreeSelect
      ref={ref as any}
      treeData={treeData}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      multiple={multiple}
      treeCheckable={treeCheckable}
      showSearch={showSearch}
      placeholder={placeholder}
      allowClear={allowClear}
      disabled={disabled}
      size={antSize}
      status={antStatus}
      className={cn('font-primary w-full', className)}
      popupClassName={cn('font-primary')}
      {...rest}
    />
  );
});

KTreeSelect.displayName = 'KTreeSelect';

export default KTreeSelect;
