import React from 'react';
import { Space } from 'antd';
import type { SpaceProps } from 'antd';

export interface KSpaceProps extends SpaceProps { }

/**
 * KSpace: Componente de layout para distribuir elementos con espaciado uniforme.
 * Refinado para evitar fugas de props al DOM (variant, fullWidth).
 */
export function KSpace({ 
  size = 'middle', variant, fullWidth, ...rest 
}: KSpaceProps & { variant?: any, fullWidth?: any }) {
  return (
    <Space
      size={size}
      {...rest}
    />
  );
}

export default KSpace;
