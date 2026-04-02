import React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import { cn } from '../../../../../imports/utils';

export interface KRadioProps extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>, 'dir'> {
  options?: { label: React.ReactNode; value: string; disabled?: boolean }[];
  direction?: 'horizontal' | 'vertical';
  variant?: 'default' | 'button';
  size?: 'sm' | 'md' | 'lg';
  buttonStyle?: 'solid' | 'outline';
}

export const KRadio = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Root>, KRadioProps>(function KRadio(
  { className, options, direction = 'horizontal', variant = 'default', size = 'md', buttonStyle = 'solid', children, ...rest }, ref
) {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      className={cn(
        "flex font-primary",
        direction === 'vertical' ? "flex-col gap-2" : "flex-row gap-4",
        variant === 'button' ? (direction === 'horizontal' ? "gap-0" : "gap-0") : "", // adjustments for button group
        className
      )}
      {...rest}
    >
      {options ? options.map((opt) => (
        <KRadioItem 
          key={opt.value} 
          value={opt.value} 
          disabled={opt.disabled} 
          label={opt.label}
          variant={variant}
          buttonStyle={buttonStyle}
        />
      )) : children}
    </RadioGroupPrimitive.Root>
  );
});
KRadio.displayName = 'KRadio';

export interface KRadioItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label?: React.ReactNode;
  variant?: 'default' | 'button'; // For internal usage mapping from KRadio
  buttonStyle?: 'solid' | 'outline';
}

export const KRadioItem = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Item>, KRadioItemProps>(function KRadioItem(
  { className, label, children, variant = 'default', buttonStyle = 'solid', ...rest }, ref
) {
  const content = label || children;

  if (variant === 'button') {
    // Modo Botón: El RadioItem no muestra el circulo clásico, todo el contenedor es clickeable
    return (
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors border",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          buttonStyle === 'solid' 
            ? "border-transparent bg-khor-neutral-100 text-khor-neutral-900 hover:bg-khor-neutral-200 data-[state=checked]:bg-khor-primary data-[state=checked]:text-white"
            : "border-khor-neutral-200 bg-transparent text-khor-neutral-900 hover:bg-khor-neutral-50 data-[state=checked]:border-khor-primary data-[state=checked]:text-khor-primary data-[state=checked]:bg-[color-mix(in_srgb,var(--khor-primary)_10%,transparent)]",
          className
        )}
        {...rest}
      >
        {content}
      </RadioGroupPrimitive.Item>
    );
  }

  // Modo Estándar
  return (
    <label className={cn(
      "inline-flex items-center gap-2 cursor-pointer",
      rest.disabled ? "cursor-not-allowed opacity-50" : ""
    )}>
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(
          "aspect-square h-4 w-4 rounded-full border border-khor-primary text-khor-primary",
          "ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-khor-primary focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...rest}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <Circle className="h-2.5 w-2.5 fill-current text-current" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      {content && (
        <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-khor-neutral-900">
          {content}
        </span>
      )}
    </label>
  );
});
KRadioItem.displayName = 'KRadioItem';

export default KRadio;
