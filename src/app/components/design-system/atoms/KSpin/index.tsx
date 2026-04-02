import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../../../../imports/utils';

export interface KSpinProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  fullscreen?: boolean;
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-10 h-10",
  xl: "w-16 h-16",
};

/**
 * KSpin — Indicador de carga (Headless v4)
 * Reemplaza AntD Spin con un componente nativo animado y estéticamente refinado.
 */
export function KSpin({ 
  size = 'md', 
  color, 
  className, 
  style,
  label,
  fullscreen = false
}: KSpinProps) {
  
  const spinner = (
    <div 
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        fullscreen && "fixed inset-0 z-[9999] bg-white/80 backdrop-blur-sm"
      )}
    >
      <Loader2 
        className={cn(
          "animate-spin transition-all",
          sizeMap[size] || sizeMap.md,
          !color && "text-khor-primary",
          className
        )}
        style={{ color, ...style }}
      />
      {label && (
        <span className="text-sm font-bold text-khor-neutral-500 animate-pulse uppercase tracking-widest font-primary">
          {label}
        </span>
      )}
    </div>
  );

  return spinner;
}

export default KSpin;
