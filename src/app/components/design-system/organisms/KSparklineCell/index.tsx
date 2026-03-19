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
