import React from 'react';
import { Switch as AntSwitch, type SwitchProps as AntSwitchProps } from 'antd';
import { Check, X } from 'lucide-react';
import { cn } from '@/utils/cn';

/* ─── Figma tokens: KSwitch (187678-36733) ────────────────────
   Migrated to Ant Design (was @radix-ui/react-switch).
   Track / handle dimensions + checked navy (#051758) come from the
   Switch component tokens in khorAntdTheme.ts; this wrapper only
   maps the Khor public API onto AntD and keeps the ON/OFF inner
   content + label affordances.
──────────────────────────────────────────────────────────────── */

export interface KSwitchProps
  extends Omit<AntSwitchProps, 'size' | 'checked' | 'onChange' | 'checkedChildren' | 'unCheckedChildren'> {
  /** Controlled checked state (Radix-compatible name kept for back-compat) */
  checked?: boolean;
  defaultChecked?: boolean;
  /** Radix-compatible change handler kept for back-compat */
  onCheckedChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  size?: 'small' | 'medium' | 'sm' | 'md' | 'default';
  loading?: boolean;
  showText?: boolean;
  showIcon?: boolean;
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
}

export const KSwitch = React.forwardRef<HTMLButtonElement, KSwitchProps>(function KSwitch(
  {
    className,
    label,
    size = 'medium',
    loading,
    disabled,
    showText,
    showIcon,
    checkedChildren,
    unCheckedChildren,
    checked,
    defaultChecked,
    onCheckedChange,
    ...rest
  },
  ref,
) {
  // Khor size → AntD size ('small' | 'default')
  const antSize: 'small' | 'default' = size === 'sm' || size === 'small' ? 'small' : 'default';

  // Resolve inner content: explicit children win, then showIcon, then showText.
  const iconSz = antSize === 'small' ? 9 : 10;
  const resolvedChecked =
    checkedChildren ??
    (showIcon ? <Check size={iconSz} strokeWidth={3} /> : showText ? 'ON' : undefined);
  const resolvedUnchecked =
    unCheckedChildren ??
    (showIcon ? <X size={iconSz} strokeWidth={3} /> : showText ? 'OFF' : undefined);

  const switchEl = (
    <AntSwitch
      ref={ref}
      size={antSize}
      loading={loading}
      disabled={disabled}
      checked={checked}
      defaultChecked={defaultChecked}
      onChange={(value) => onCheckedChange?.(value)}
      checkedChildren={resolvedChecked}
      unCheckedChildren={resolvedUnchecked}
      className={cn(className)}
      {...rest}
    />
  );

  if (!label) return switchEl;

  return (
    <label
      className={cn(
        'inline-flex items-center gap-2 cursor-pointer select-none',
        (disabled || loading) && 'cursor-not-allowed opacity-60',
      )}
    >
      {switchEl}
      <span
        className={cn(
          'font-medium leading-none text-[#1e293b]',
          antSize === 'small' ? 'text-xs' : 'text-sm',
        )}
      >
        {label}
      </span>
    </label>
  );
});

KSwitch.displayName = 'KSwitch';
export default KSwitch;
