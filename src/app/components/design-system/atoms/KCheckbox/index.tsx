import React from 'react';
import { Checkbox as AntCheckbox, type CheckboxProps as AntCheckboxProps } from 'antd';
import { cn } from '@/utils/cn';

/* ─── Figma tokens: KCheckbox (187656-7293) ────────────────────
   Migrated to Ant Design (was @radix-ui/react-checkbox).
   Checked fill #E04D36 (secondary) comes from the Checkbox tokens in
   khorAntdTheme.ts. error / warning states + the default hover tint
   (#fff8f7) are applied here as className overrides on .ant-checkbox-inner,
   because AntD's Checkbox has no native status axis.
──────────────────────────────────────────────────────────────── */

export interface KCheckboxProps
  extends Omit<AntCheckboxProps, 'checked' | 'onChange' | 'value'> {
  label?: React.ReactNode;
  status?: 'error' | 'warning' | 'default';
  /** Radix-compatible: boolean or 'indeterminate' */
  checked?: boolean | 'indeterminate';
  /** Radix-compatible change handler kept for back-compat */
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
  value?: any;
  isHovered?: boolean;
  isFocused?: boolean;
  styles?: {
    root?: React.CSSProperties;
    input?: React.CSSProperties;
    label?: React.CSSProperties;
  };
  classNames?: {
    root?: string;
    input?: string;
    label?: string;
  };
}

export interface KCheckboxGroupProps {
  value?: any[];
  defaultValue?: any[];
  options?: (string | { label: React.ReactNode; value: any; disabled?: boolean })[];
  onChange?: (checkedValues: any[]) => void;
  disabled?: boolean;
  name?: string;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

// status → override classes targeting AntD's inner box
const STATUS_INPUT_CLASSES: Record<string, string> = {
  default:
    '[&_.ant-checkbox:hover_.ant-checkbox-inner]:border-[#E04D36] [&_.ant-checkbox:hover_.ant-checkbox-inner]:bg-[#fff8f7]',
  error:
    '[&_.ant-checkbox-inner]:border-[#D32F2F] [&_.ant-checkbox-checked_.ant-checkbox-inner]:!bg-[#D32F2F] [&_.ant-checkbox-checked_.ant-checkbox-inner]:!border-[#D32F2F]',
  warning:
    '[&_.ant-checkbox-inner]:border-amber-400 [&_.ant-checkbox-checked_.ant-checkbox-inner]:!bg-amber-500 [&_.ant-checkbox-checked_.ant-checkbox-inner]:!border-amber-500',
};

const KCheckboxInternal = React.forwardRef<HTMLInputElement, KCheckboxProps>(function KCheckbox(
  {
    className,
    label,
    children,
    status = 'default',
    checked,
    onCheckedChange,
    disabled,
    isHovered,
    isFocused,
    styles,
    classNames,
    value,
    ...rest
  },
  ref,
) {
  const content = label ?? children;
  const indeterminate = checked === 'indeterminate';
  const isChecked = checked === true;

  return (
    <AntCheckbox
      ref={ref as any}
      value={value}
      // Only pass `checked` when standalone (controlled). Inside an AntD
      // Checkbox.Group the group context drives the checked state.
      checked={checked !== undefined ? isChecked : undefined}
      indeterminate={indeterminate}
      disabled={disabled}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      className={cn(
        'font-primary',
        STATUS_INPUT_CLASSES[status],
        status === 'error' && '[&_.ant-checkbox+span]:text-[#D32F2F]',
        status === 'warning' && '[&_.ant-checkbox+span]:text-amber-600',
        isHovered &&
          status === 'default' &&
          '[&_.ant-checkbox-inner]:border-[#E04D36] [&_.ant-checkbox-inner]:bg-[#fff8f7]',
        isFocused && '[&_.ant-checkbox-inner]:!border-[#E04D36]',
        classNames?.root,
        classNames?.input,
        className,
      )}
      style={{ ...styles?.root }}
      {...rest}
    >
      {content && (
        <span className={cn(classNames?.label)} style={styles?.label}>
          {content}
        </span>
      )}
    </AntCheckbox>
  );
});

const KCheckboxGroup = ({
  value,
  defaultValue,
  options,
  onChange,
  disabled,
  name,
  style,
  className,
  children,
}: KCheckboxGroupProps) => {
  const normalizedOptions = options?.map((opt) =>
    typeof opt === 'string' ? { label: opt, value: opt } : opt,
  );

  return (
    <AntCheckbox.Group
      value={value}
      defaultValue={defaultValue}
      onChange={(vals) => onChange?.(vals as any[])}
      disabled={disabled}
      name={name}
      style={style}
      className={cn('flex flex-wrap gap-4 font-primary', className)}
      {...(normalizedOptions ? { options: normalizedOptions as any } : {})}
    >
      {!normalizedOptions ? children : undefined}
    </AntCheckbox.Group>
  );
};

type CompoundedComponent = typeof KCheckboxInternal & {
  Group: typeof KCheckboxGroup;
};

export const KCheckbox = KCheckboxInternal as CompoundedComponent;
KCheckbox.Group = KCheckboxGroup;

KCheckbox.displayName = 'KCheckbox';
KCheckboxGroup.displayName = 'KCheckbox.Group';

export default KCheckbox;
