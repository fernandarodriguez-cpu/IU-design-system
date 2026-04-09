import React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import { cn } from '../../../../../imports/utils';

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
}

export interface KRadioButtonProps extends KRadioProps {}

// Context to pass group props to children
interface RadioGroupContextType {
  optionType: 'default' | 'button';
  buttonStyle: 'outline' | 'solid';
  size: 'sm' | 'md' | 'lg' | 'small' | 'middle' | 'large';
  disabled: boolean;
  name?: string;
}

const RadioGroupContext = React.createContext<RadioGroupContextType | undefined>(undefined);

const InternalRadioGroup = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Root>, KRadioGroupProps>(function Group(
  { className, options, direction = 'horizontal', optionType = 'default', buttonStyle = 'outline', size = 'md', disabled = false, children, name, ...rest }, ref
) {
  const isButton = optionType === 'button';
  
  let content = children;
  if (options && options.length > 0) {
    content = options.map(opt => {
      if (typeof opt === 'string') {
        return isButton ? 
          <KRadioButton key={opt} value={opt} disabled={disabled}>{opt}</KRadioButton> : 
          <InternalRadio key={opt} value={opt} disabled={disabled}>{opt}</InternalRadio>;
      }
      return isButton ? 
        <KRadioButton key={opt.value} value={opt.value} disabled={opt.disabled || disabled}>{opt.label}</KRadioButton> : 
        <InternalRadio key={opt.value} value={opt.value} disabled={opt.disabled || disabled}>{opt.label}</InternalRadio>;
    });
  }

  return (
    <RadioGroupContext.Provider value={{ optionType, buttonStyle, size, disabled, name }}>
      <RadioGroupPrimitive.Root
        ref={ref}
        name={name}
        disabled={disabled}
        className={cn(
          "flex font-primary",
          direction === 'vertical' ? "flex-col gap-2" : "flex-row gap-4",
          isButton ? (direction === 'vertical' ? "gap-0 -space-y-px" : "gap-0 -space-x-px") : "", // Overlap borders for buttons
          className
        )}
        {...rest}
      >
        {content}
      </RadioGroupPrimitive.Root>
    </RadioGroupContext.Provider>
  );
});

const InternalRadio = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Item>, KRadioProps>(function Radio(
  { className, children, autoFocus, disabled, ...rest }, ref
) {
  const group = React.useContext(RadioGroupContext);
  const isDisabled = disabled || group?.disabled;

  React.useEffect(() => {
    if (autoFocus && ref && "current" in ref && ref.current) {
      (ref.current as HTMLButtonElement).focus();
    }
  }, [autoFocus, ref]);

  return (
    <label className={cn(
      "inline-flex items-center gap-2 cursor-pointer font-primary",
      isDisabled ? "cursor-not-allowed opacity-50" : ""
    )}>
      <RadioGroupPrimitive.Item
        ref={ref}
        disabled={isDisabled}
        className={cn(
          "aspect-square h-4 w-4 rounded-full border border-khor-slate-200 bg-white shadow-khor-sm transition-all duration-200",
          "ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-khor-primary/20 focus-visible:ring-offset-1",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=checked]:border-khor-primary data-[state=checked]:text-khor-primary data-[state=checked]:shadow-none",
          "hover:border-khor-primary hover:bg-khor-primary-light/5",
          className
        )}
        {...rest}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <Circle className="h-2 w-2 fill-khor-primary text-khor-primary" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      {children && (
        <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-khor-neutral-900">
          {children}
        </span>
      )}
    </label>
  );
});

const KRadioButton = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Item>, KRadioButtonProps>(function RadioButton(
  { className, children, disabled, autoFocus, ...rest }, ref
) {
  const group = React.useContext(RadioGroupContext) || { optionType: 'button', buttonStyle: 'outline', size: 'md', disabled: false };
  const isDisabled = disabled || group.disabled;
  const isSolid = group.buttonStyle === 'solid';

  const sizeClasses = {
    sm: "px-3 py-1 text-xs h-7",
    small: "px-3 py-1 text-xs h-7",
    md: "px-4 py-2 text-sm h-9",
    middle: "px-4 py-2 text-sm h-9",
    lg: "px-5 py-3 text-base h-11",
    large: "px-5 py-3 text-base h-11",
  }[group.size || 'md'];

  React.useEffect(() => {
    if (autoFocus && ref && "current" in ref && ref.current) {
      (ref.current as HTMLButtonElement).focus();
    }
  }, [autoFocus, ref]);

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      disabled={isDisabled}
      className={cn(
        "inline-flex items-center justify-center font-primary transition-all duration-200 border outline-none",
        "focus-visible:ring-2 focus-visible:ring-khor-primary/20 focus-visible:ring-offset-0 focus-visible:z-20",
        "disabled:pointer-events-none disabled:opacity-50 disabled:bg-khor-slate-100 disabled:text-khor-neutral-400 disabled:border-khor-slate-200",
        "first:rounded-l-md last:rounded-r-md relative font-medium",
        isSolid 
          ? "border-khor-slate-200 bg-khor-slate-100 text-khor-neutral-600 hover:text-khor-primary data-[state=checked]:bg-khor-primary data-[state=checked]:border-khor-primary data-[state=checked]:text-white data-[state=checked]:z-10"
          : "border-khor-slate-200 bg-white text-khor-neutral-600 hover:text-khor-primary data-[state=checked]:border-khor-primary data-[state=checked]:text-khor-primary data-[state=checked]:z-10",
        sizeClasses,
        className
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
