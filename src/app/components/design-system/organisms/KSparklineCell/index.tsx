import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { khorTokens } from '../../../../theme/khor-theme';

export interface KSparklineCellProps {
  data: number[];
  color?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}

/**
 * @figma-mcp-migration
 * Component: KSparklineCell
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
export function KSparklineCell({ 
  data, 
  color = khorTokens.colors.brand.primary, 
  width = 100, 
  height = 32,
  className 
}: KSparklineCellProps) {
  const chartData = data.map((v, i) => ({ i, v }));

  return (
    <div className={className} style={{ width, height, minWidth: 60 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line 
            type="monotone" 
            dataKey="v" 
            stroke={color} 
            strokeWidth={2} 
            dot={false} 
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default KSparklineCell;
