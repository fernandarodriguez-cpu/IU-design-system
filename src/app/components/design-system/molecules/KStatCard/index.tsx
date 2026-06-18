import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { KText } from '../../atoms/KText/index';
import { cn } from '@/utils/cn';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KStatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  sparkData?: number[];
  icon?: React.ReactNode;
  className?: string;
  /** Fuerza el estado hover (útil para previews/playgrounds) */
  isHovered?: boolean;
}

/**
 * @figma-mcp-migration
 * Component: KStatCard
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
export function KStatCard({ title, value, change, changeLabel, sparkData, icon, className, isHovered }: KStatCardProps) {
  const isPositive = change !== undefined && change >= 0;
  const TrendIcon = change === undefined ? Minus : isPositive ? TrendingUp : TrendingDown;
  const trendColorClass = change === undefined
    ? 'text-khor-neutral-400'
    : isPositive ? 'text-khor-success' : 'text-khor-error';
  
  const trendStroke = change === undefined
    ? 'var(--khor-neutral-300)'
    : isPositive ? 'var(--khor-success)' : 'var(--khor-error)';

  const chartData = sparkData?.map((v, i) => ({ i, v }));

  return (
    <div
      className={cn(
        "flex flex-col font-primary min-w-[200px] border transition-all duration-300 shadow-khor-sm",
        "bg-khor-surface-card border-khor-border-default rounded-[var(--khor-radius-lg)]",
        "p-[var(--khor-density-spacing-lg)] gap-[var(--khor-density-spacing-md)]", // Density compliance
        "hover:shadow-khor-md hover:border-khor-primary hover:translate-y-[-2px]",
        isHovered && "shadow-khor-md border-khor-primary translate-y-[-2px]",
        className
      )}
    >
      <div className="flex justify-between items-center mb-2">
        <KText variant="overline" className="text-[9px] font-black text-khor-primary tracking-[0.25em] opacity-100 uppercase">
          {title}
        </KText>
        {icon && <span className="text-khor-neutral-300 group-hover:text-khor-primary transition-colors">{icon}</span>}
      </div>
      <div className="flex items-baseline justify-between gap-4 mt-auto">
        <span className="text-3xl font-black text-khor-navy dark:text-white leading-none tracking-tightest">
          {value}
        </span>
        {change !== undefined && (
          <span className={cn("inline-flex items-center gap-1 text-[13px] font-bold", trendColorClass)}>
            <TrendIcon size={14} strokeWidth={2.5} />
            {Math.abs(change)}%
          </span>
        )}
      </div>
      {changeLabel && <KText variant="caption" color="muted" className="text-xs">{changeLabel}</KText>}
      {chartData && chartData.length > 0 && (
        <div className="w-full h-12 mt-1 opacity-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line 
                type="monotone" 
                dataKey="v" 
                stroke={trendStroke} 
                strokeWidth={2.5} 
                dot={false} 
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default KStatCard;
