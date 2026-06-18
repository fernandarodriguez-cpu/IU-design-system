import React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '@/utils/cn';

/* ─── Figma tokens: Radio-Group (187730-25772) ─────────────────
   Layout   : horizontal | vertical
   Items    : 2–10
   Selected : border #E04D36, inner dot #E04D36
   Hover    : border #E04D36, bg #fff8f7
   Disabled selected  : outer ring #D1D5DB, inner dot #D1D5DB
   Disabled unselected: border #E5E7EB, bg #F3F4F6
   Disabled label     : text #9CA3AF
──────────────────────────────────────────────────────────────── */

export interface KRadioGroupOptions {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
}

export interface KRadioGroupProps extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>, 'dir'> {
  options?: Array<KRadioGroupOptions | string>;
  direction?: 'horizontal' | 'vertical';
  optionType?: 'default' | 'button';
  buttonStyle?: 'outline' | 'solid';
  size?: 'sm' | 'md' | 'lg' | 'small' | 'middle' | 'large';
  disabled?: boolean;
  name?: string;
}

export interface KRadioProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  children?: React.ReactNode;
  autoFocus?: boolean;
  isHovered?: boolean;
  isFocused?: boolean;
}

export interface KRadioButtonProps extends KRadioProps {}

interface RadioGroupContextType {
  optionType: 'default' | 'button';
  buttonStyle: 'outline' | 'solid';
  size: 'sm' | 'md' | 'lg' | 'small' | 'middle' | 'large';
  disabled: boolean;
  name?: string;
}

const RadioGroupContext = React.createContext<RadioGroupContextType | undefined>(undefined);

const InternalRadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  KRadioGroupProps
>(function Group(
  { className, options, direction = 'horizontal', optionType = 'default',
    buttonStyle = 'outline', size = 'md', disabled = false, children, name, ...rest },
  ref
) {
  const isButton = optionType === 'button';

  let content = children;
  if (options && options.length > 0) {
    content = options.map(opt => {
      if (typeof opt === 'string') {
        return isButton
          ? <KRadioButton key={opt} value={opt} disabled={disabled}>{opt}</KRadioButton>
          : <InternalRadio key={opt} value={opt} disabled={disabled}>{opt}</InternalRadio>;
      }
      return isButton
        ? <KRadioButton key={opt.value} value={opt.value} disabled={opt.disabled || disabled}>{opt.label}</KRadioButton>
        : <InternalRadio key={opt.value} value={opt.value} disabled={opt.disabled || disabled}>{opt.label}</InternalRadio>;
    });
  }

  return (
    <RadioGroupContext.Provider value={{ optionType, buttonStyle, size, disabled, name }}>
      <RadioGroupPrimitive.Root
        ref={ref}
        name={name}
        disabled={disabled}
        className={cn(
          'flex font-primary',
          direction === 'vertical' ? 'flex-col gap-2' : 'flex-row gap-4 flex-wrap',
          isButton ? (direction === 'vertical' ? 'gap-0 -space-y-px' : 'gap-0 -space-x-px') : '',
          className,
        )}
        {...rest}
      >
        {content}
      </RadioGroupPrimitive.Root>
    </RadioGroupContext.Provider>
  );
});

const InternalRadio = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  KRadioProps
>(function Radio(
  { className, children, autoFocus, disabled, isHovered, isFocused, ...rest },
  ref
) {
  const group = React.useContext(RadioGroupContext);
  const isDisabled = disabled || group?.disabled;

  React.useEffect(() => {
    if (autoFocus && ref && 'current' in ref && ref.current) {
      (ref.current as HTMLButtonElement).focus();
    }
  }, [autoFocus, ref]);

  return (
    <label
      className={cn(
        'inline-flex items-center gap-2 cursor-pointer select-none font-primary',
        isDisabled && 'cursor-not-allowed',
      )}
    >
      <RadioGroupPrimitive.Item
        ref={ref}
        disabled={isDisabled}
        className={cn(
          'group relative aspect-square h-4 w-4 shrink-0 rounded-full border-[1.5px] bg-white',
          'transition-all duration-150 outline-none',
          // Default unchecked
          'border-slate-300',
          // Hover (unchecked)
          'hover:border-[#E04D36] hover:bg-[#fff8f7]',
          // Focus ring
          'focus-visible:ring-2 focus-visible:ring-[#E04D36]/40 focus-visible:ring-offset-1',
          // Checked — outer ring becomes red
          'data-[state=checked]:border-[#E04D36]',
          // Disabled — override everything
          'data-[disabled]:border-[#E5E7EB] data-[disabled]:bg-[#F3F4F6]',
          'data-[disabled]:pointer-events-none',
          // Forced states (playground/preview)
          isHovered && 'border-[#E04D36] bg-[#fff8f7]',
          isFocused && 'ring-2 ring-[#E04D36]/40 ring-offset-1 border-[#E04D36]',
          className,
        )}
        {...rest}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center w-full h-full">
          {/* Inner dot — gray when disabled via group-data-[disabled] */}
          <span className="block h-[7px] w-[7px] rounded-full bg-[#E04D36] group-data-[disabled]:bg-[#D1D5DB]" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>

      {children && (
        <span
          className={cn(
            'text-sm leading-none text-[#1e293b] transition-colors',
            isDisabled && 'text-[#9CA3AF]',
          )}
        >
          {children}
        </span>
      )}
    </label>
  );
});

const KRadioButton = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  KRadioButtonProps
>(function RadioButton(
  { className, children, disabled, autoFocus, isHovered, isFocused, ...rest },
  ref
) {
  const group = React.useContext(RadioGroupContext) || {
    optionType: 'button', buttonStyle: 'outline', size: 'md', disabled: false,
  };
  const isDisabled = disabled || group.disabled;
  const isSolid = group.buttonStyle === 'solid';

  const sizeClasses = {
    sm: 'px-3 py-1 text-xs h-[var(--khor-density-height-sm)]',
    small: 'px-3 py-1 text-xs h-[var(--khor-density-height-sm)]',
    md: 'px-4 py-2 text-sm h-[var(--khor-density-height-md)]',
    middle: 'px-4 py-2 text-sm h-[var(--khor-density-height-md)]',
    lg: 'px-5 py-3 text-base h-[var(--khor-density-height-lg)]',
    large: 'px-5 py-3 text-base h-[var(--khor-density-height-lg)]',
  }[group.size || 'md'];

  React.useEffect(() => {
    if (autoFocus && ref && 'current' in ref && ref.current) {
      (ref.current as HTMLButtonElement).focus();
    }
  }, [autoFocus, ref]);

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      disabled={isDisabled}
      className={cn(
        'inline-flex items-center justify-center font-primary transition-all duration-150 border outline-none',
        'focus-visible:ring-2 focus-visible:ring-[#E04D36]/40 focus-visible:ring-offset-0 focus-visible:z-20',
        'disabled:pointer-events-none disabled:opacity-50 disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200',
        'first:rounded-l-md last:rounded-r-md relative font-medium',
        isSolid
          ? 'border-slate-200 bg-slate-100 text-slate-600 hover:text-[#E04D36] data-[state=checked]:bg-[#E04D36] data-[state=checked]:border-[#E04D36] data-[state=checked]:text-white data-[state=checked]:z-10'
          : 'border-slate-200 bg-white text-slate-600 hover:text-[#E04D36] data-[state=checked]:border-[#E04D36] data-[state=checked]:text-[#E04D36] data-[state=checked]:z-10',
        isHovered && 'border-[#E04D36] text-[#E04D36] z-20',
        isFocused && 'ring-2 ring-[#E04D36]/40 z-20',
        sizeClasses,
        className,
      )}
      {...rest}
    >
      {children}
    </RadioGroupPrimitive.Item>
  );
});

type KRadioComponent = typeof InternalRadio & {
  Group: typeof InternalRadioGroup;
  Button: typeof KRadioButton;
};

export const KRadio = InternalRadio as KRadioComponent;
KRadio.Group = InternalRadioGroup;
KRadio.Button = KRadioButton;

KRadio.displayName = 'KRadio';
InternalRadioGroup.displayName = 'KRadio.Group';
KRadioButton.displayName = 'KRadio.Button';

export default KRadio;
