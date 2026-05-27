import React, { createContext, useContext, useState, useEffect } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';
import { cn } from '@/utils/cn';

// --- Types ---

export interface KCheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  /** Etiqueta descriptiva */
  label?: React.ReactNode;
  /** Estado de validación */
  status?: 'error' | 'warning' | 'default';
  /** Estilos semánticos */
  styles?: {
    root?: React.CSSProperties;
    input?: React.CSSProperties;
    label?: React.CSSProperties;
  };
  /** Clases semánticas */
  classNames?: {
    root?: string;
    input?: string;
    label?: string;
  };
  /** Fuerza el estado hover (útil para previews/playgrounds) */
  isHovered?: boolean;
  /** Fuerza el estado de foco (útil para previews/playgrounds) */
  isFocused?: boolean;
}

export interface KCheckboxGroupProps {
  /** Valores seleccionados */
  value?: any[];
  /** Valores por defecto */
  defaultValue?: any[];
  /** Opciones si no se pasan hijos */
  options?: (string | { label: React.ReactNode; value: any; disabled?: boolean })[];
  /** Callback al cambiar */
  onChange?: (checkedValues: any[]) => void;
  /** Desactivar todos */
  disabled?: boolean;
  /** Nombre para forms */
  name?: string;
  /** Estilos */
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  autoFocus?: boolean;
  /** Fuerza el estado hover (útil para previews/playgrounds) */
  isHovered?: boolean;
  /** Fuerza el estado de foco (útil para previews/playgrounds) */
  isFocused?: boolean;
}

// --- Context for Group ---

const CheckboxGroupContext = createContext<{
  value?: any[];
  toggleValue?: (val: any) => void;
  disabled?: boolean;
} | null>(null);

// --- Individual Component ---

const KCheckboxInternal = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, KCheckboxProps>(function KCheckbox(
  { className, label, children, status = 'default', checked, onCheckedChange, disabled, isHovered, isFocused, styles, classNames, ...rest }, ref
) {
  const groupContext = useContext(CheckboxGroupContext);
  const content = label || children;
  
  // Logic to handle group value
  const isChecked = groupContext 
    ? groupContext.value?.includes(rest.value) 
    : checked;
    
  const handleToggle = (checked: boolean | 'indeterminate') => {
    if (groupContext && rest.value !== undefined) {
      groupContext.toggleValue?.(rest.value);
    }
    onCheckedChange?.(checked);
  };

  const finalDisabled = disabled || groupContext?.disabled;

  return (
    <label className={cn(
      "group inline-flex items-center gap-2 cursor-pointer font-primary",
      finalDisabled ? "cursor-not-allowed opacity-50" : "",
      classNames?.root,
      className
    )} style={styles?.root}>
      <CheckboxPrimitive.Root
        ref={ref}
        checked={isChecked}
        onCheckedChange={handleToggle}
        disabled={finalDisabled}
        className={cn(
          "peer shrink-0 p-0 rounded-sm border transition-all duration-200 select-none overflow-hidden flex items-center justify-center shadow-khor-sm",
          "h-[var(--khor-density-spacing-md)] w-[var(--khor-density-spacing-md)]", // Density sizing
          "focus-visible:outline-none focus-visible:ring-[var(--khor-focus-ring-width)] focus-visible:ring-[var(--khor-focus-ring-color)] focus-visible:ring-offset-[var(--khor-focus-ring-offset)] focus-visible:border-khor-primary",
          "disabled:cursor-not-allowed",
          // States and Border Colors
          status === 'default' && "border-khor-slate-200 bg-white hover:border-khor-primary hover:bg-khor-surface-hover",
          status === 'error' && "border-khor-border-error bg-khor-error/5 shadow-none",
          status === 'warning' && "border-khor-warning bg-khor-warning/5 shadow-none",
          // Forced States
          isHovered && "border-khor-primary bg-khor-surface-hover",
          isFocused && "ring-[var(--khor-focus-ring-width)] ring-[var(--khor-focus-ring-color)] ring-offset-[var(--khor-focus-ring-offset)] border-khor-primary",
          // Checked logic
          "data-[state=checked]:bg-khor-primary data-[state=checked]:border-khor-primary data-[state=checked]:text-white data-[state=checked]:shadow-none",
          "data-[state=indeterminate]:bg-khor-primary data-[state=indeterminate]:border-khor-primary data-[state=indeterminate]:text-white data-[state=indeterminate]:shadow-none",
          // Error/Warning Checked Override
          (status === 'error') && "data-[state=checked]:bg-khor-error data-[state=checked]:border-khor-error",
          (status === 'warning') && "data-[state=checked]:bg-khor-warning data-[state=checked]:border-khor-warning",
          classNames?.input
        )}
        style={styles?.input}
        {...rest}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
          {checked === 'indeterminate' ? (
            <Minus className="h-3 w-3" strokeWidth={4} />
          ) : (
            <Check className="h-3 w-3" strokeWidth={4} />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {content && (
        <span className={cn(
          "text-sm select-none peer-disabled:cursor-not-allowed text-khor-neutral-900 transition-colors",
          status === 'error' && "text-khor-error",
          status === 'warning' && "text-khor-warning",
          classNames?.label
        )} style={styles?.label}>
          {content}
        </span>
      )}
    </label>
  );
});

// --- Group Implementation ---

const KCheckboxGroup = ({ 
  value: controlledValue, 
  defaultValue = [], 
  options, 
  onChange, 
  disabled, 
  name, 
  style, 
  className, 
  children 
}: KCheckboxGroupProps) => {
  const [value, setValue] = useState(controlledValue || defaultValue);

  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  const toggleValue = (val: any) => {
    const newValue = value.includes(val)
      ? value.filter(v => v !== val)
      : [...value, val];
    
    if (controlledValue === undefined) {
      setValue(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <CheckboxGroupContext.Provider value={{ value, toggleValue, disabled }}>
      <div 
        className={cn("flex flex-wrap gap-4", className)} 
        style={style}
      >
        {options ? options.map(opt => {
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
        }) : children}
      </div>
    </CheckboxGroupContext.Provider>
  );
};

// --- Compound Assignment ---

type CompoundedComponent = typeof KCheckboxInternal & {
  Group: typeof KCheckboxGroup;
};

/**
 * @figma-mcp-migration
 * Component: KCheckbox
 * 
 * INSTRUCCIONES PARA AGENTES DE IA (VS Code / MCP):
 * Para migrar este componente a Figma, NO generar una matriz multiplicando todas las variables.
 * Utilizar Figma Component Properties V2 con la siguiente estructura:
 * 
 * 1. Variants (Estructurales):
 *    - Definir variantes puramente visuales/estructurales.
 * 2. Booleans (Encendido/Apagado):
 *    - Definir encendido/apagado para iconos o estados (isLoading, hasIcon).
 * 3. Color Variables (No usar variantes para colores semánticos):
 *    - El relleno/borde debe usar Figma Variables (Khor v6.0 Colors) asignado dinámicamente.
 *    - El consumidor del UI Kit cambiará el color del layer.
 */
export const KCheckbox = KCheckboxInternal as CompoundedComponent;
KCheckbox.Group = KCheckboxGroup;

KCheckbox.displayName = 'KCheckbox';
KCheckboxGroup.displayName = 'KCheckbox.Group';

export default KCheckbox;
