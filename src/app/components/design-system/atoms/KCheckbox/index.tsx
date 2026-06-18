import React, { createContext, useContext, useState, useEffect } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';
import { cn } from '@/utils/cn';

/* ─── Figma tokens: KCheckbox (187656-7293) ────────────────────
   States   : default | error | disabled
   Checked  : bg #E04D36, border #E04D36, icon white
   Unchecked: bg white, border #CBD5E1 (default) | #D32F2F (error) | #E5E7EB (disabled)
   Disabled checked  : bg #D1D5DB, border #D1D5DB, icon #9CA3AF
   Disabled unchecked: bg #F3F4F6, border #E5E7EB
   Disabled label    : text #9CA3AF
   Indeterminate: same fill as checked, Minus icon
   Hover default: border #E04D36, bg #fff8f7
──────────────────────────────────────────────────────────────── */

export interface KCheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: React.ReactNode;
  status?: 'error' | 'warning' | 'default';
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

const CheckboxGroupContext = createContext<{
  value?: any[];
  toggleValue?: (val: any) => void;
  disabled?: boolean;
} | null>(null);

const KCheckboxInternal = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  KCheckboxProps
>(function KCheckbox(
  { className, label, children, status = 'default', checked, onCheckedChange,
    disabled, isHovered, isFocused, styles, classNames, ...rest },
  ref
) {
  const groupContext = useContext(CheckboxGroupContext);
  const content = label || children;

  const isChecked = groupContext
    ? groupContext.value?.includes(rest.value)
    : checked;

  const handleToggle = (val: boolean | 'indeterminate') => {
    if (groupContext && rest.value !== undefined) groupContext.toggleValue?.(rest.value);
    onCheckedChange?.(val);
  };

  const finalDisabled = disabled || groupContext?.disabled;

  return (
    <label
      className={cn(
        'group inline-flex items-center gap-2 cursor-pointer select-none font-primary',
        finalDisabled && 'cursor-not-allowed',
        classNames?.root,
        className,
      )}
      style={styles?.root}
    >
      <CheckboxPrimitive.Root
        ref={ref}
        checked={isChecked}
        onCheckedChange={handleToggle}
        disabled={finalDisabled}
        className={cn(
          'peer relative shrink-0 rounded-[4px] border-[1.5px] transition-all duration-150 outline-none',
          'flex items-center justify-center',
          'h-4 w-4',
          // Focus ring
          'focus-visible:ring-2 focus-visible:ring-[#E04D36]/40 focus-visible:ring-offset-1',
          // ── Default unchecked ──
          status === 'default' && [
            'border-slate-300 bg-white',
            !isHovered && 'hover:border-[#E04D36] hover:bg-[#fff8f7]',
          ],
          // ── Error unchecked ──
          status === 'error' && 'border-[#D32F2F] bg-[#fff5f5]',
          // ── Warning unchecked ──
          status === 'warning' && 'border-amber-400 bg-amber-50',
          // ── Forced hover ──
          isHovered && status === 'default' && 'border-[#E04D36] bg-[#fff8f7]',
          // ── Forced focus ──
          isFocused && 'ring-2 ring-[#E04D36]/40 ring-offset-1 border-[#E04D36]',
          // ── Checked / Indeterminate — default ──
          status === 'default' && [
            'data-[state=checked]:bg-[#E04D36] data-[state=checked]:border-[#E04D36]',
            'data-[state=indeterminate]:bg-[#E04D36] data-[state=indeterminate]:border-[#E04D36]',
          ],
          // ── Checked / Indeterminate — error ──
          status === 'error' && [
            'data-[state=checked]:bg-[#D32F2F] data-[state=checked]:border-[#D32F2F]',
            'data-[state=indeterminate]:bg-[#D32F2F] data-[state=indeterminate]:border-[#D32F2F]',
          ],
          // ── Checked / Indeterminate — warning ──
          status === 'warning' && [
            'data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500',
            'data-[state=indeterminate]:bg-amber-500 data-[state=indeterminate]:border-amber-500',
          ],
          // ── Disabled unchecked ──
          'disabled:border-[#E5E7EB] disabled:bg-[#F3F4F6] disabled:cursor-not-allowed',
          // ── Disabled checked ──
          'disabled:data-[state=checked]:bg-[#D1D5DB] disabled:data-[state=checked]:border-[#D1D5DB]',
          'disabled:data-[state=indeterminate]:bg-[#D1D5DB] disabled:data-[state=indeterminate]:border-[#D1D5DB]',
          classNames?.input,
        )}
        style={styles?.input}
        {...rest}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center">
          {isChecked === 'indeterminate' ? (
            <Minus
              className={cn('text-white', finalDisabled && 'text-[#9CA3AF]')}
              style={{ width: 10, height: 10, strokeWidth: 3.5 }}
            />
          ) : (
            <Check
              className={cn('text-white', finalDisabled && 'text-[#9CA3AF]')}
              style={{ width: 10, height: 10, strokeWidth: 3.5 }}
            />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      {content && (
        <span
          className={cn(
            'text-sm leading-none select-none transition-colors',
            'text-[#1e293b]',
            status === 'error' && 'text-[#D32F2F]',
            status === 'warning' && 'text-amber-600',
            finalDisabled && 'text-[#9CA3AF]',
            classNames?.label,
          )}
          style={styles?.label}
        >
          {content}
        </span>
      )}
    </label>
  );
});

const KCheckboxGroup = ({
  value: controlledValue,
  defaultValue = [],
  options,
  onChange,
  disabled,
  name,
  style,
  className,
  children,
}: KCheckboxGroupProps) => {
  const [value, setValue] = useState(controlledValue || defaultValue);

  useEffect(() => {
    if (controlledValue !== undefined) setValue(controlledValue);
  }, [controlledValue]);

  const toggleValue = (val: any) => {
    const next = value.includes(val) ? value.filter(v => v !== val) : [...value, val];
    if (controlledValue === undefined) setValue(next);
    onChange?.(next);
  };

  return (
    <CheckboxGroupContext.Provider value={{ value, toggleValue, disabled }}>
      <div className={cn('flex flex-wrap gap-4', className)} style={style}>
        {options
          ? options.map(opt => {
              const option = typeof opt === 'string' ? { label: opt, value: opt } : opt;
              return (
                <KCheckboxInternal
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  name={name}
                >
                  {option.label}
                </KCheckboxInternal>
              );
            })
          : children}
      </div>
    </CheckboxGroupContext.Provider>
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
