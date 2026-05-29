import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/utils/cn';

export interface KSegmentedOption {
  label?: React.ReactNode;
  value: string | number;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface KSegmentedProps {
  options: (string | number | KSegmentedOption)[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  block?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
}

const sizeStyles = {
  sm: "h-7 p-0.5 text-xs",
  md: "h-9 p-1 text-sm",
  lg: "h-11 p-1 text-base",
};

const buttonSizeStyles = {
  sm: "px-2",
  md: "px-3",
  lg: "px-4",
};

/**
 * KSegmented — Control segmentado animado (Headless v4)
 * Utiliza Framer Motion para la transición del fondo y Tailwind para el layout.
 */
/**
 * @figma-mcp-migration
 * Component: KSegmented
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
export function KSegmented({ 
  options, 
  value, 
  onChange, 
  block, 
  disabled, 
  size = 'md', 
  className,
  style
}: KSegmentedProps) {
  
  const normalizedOptions: KSegmentedOption[] = options.map(opt => {
    if (typeof opt === 'string' || typeof opt === 'number') {
      return { label: String(opt), value: opt };
    }
    return opt;
  });

  const [internalValue, setInternalValue] = React.useState(value || normalizedOptions[0]?.value);
  const activeValue = value !== undefined ? value : internalValue;

  const handleChange = (val: string | number) => {
    if (disabled) return;
    setInternalValue(val);
    onChange?.(val);
  };

  return (
    <div 
      className={cn(
        "inline-flex bg-khor-neutral-100 rounded-lg font-primary p-1 border border-khor-neutral-200 relative",
        block ? "w-full flex" : "w-max",
        disabled && "opacity-50 cursor-not-allowed",
        sizeStyles[size],
        className
      )}
      style={style}
    >
      {normalizedOptions.map((opt) => {
        const isActive = activeValue === opt.value;
        return (
          <button
            key={String(opt.value)}
            disabled={disabled || opt.disabled}
            onClick={() => handleChange(opt.value)}
            className={cn(
              "relative flex-1 flex items-center justify-center rounded-md transition-all z-10 font-bold tracking-tight",
              isActive ? "text-khor-neutral-900" : "text-khor-neutral-500 hover:text-khor-neutral-700",
              (disabled || opt.disabled) ? "cursor-not-allowed" : "cursor-pointer",
              buttonSizeStyles[size]
            )}
          >
            {isActive && (
              <motion.div
                layoutId="segmented-active"
                className="absolute inset-0 bg-white rounded-md shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)] z-[-1]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <div className="flex items-center gap-2">
              {opt.icon && <span className={cn("shrink-0", !opt.label && "p-0.5")}>{opt.icon}</span>}
              {opt.label && <span className="truncate">{opt.label}</span>}
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default KSegmented;
