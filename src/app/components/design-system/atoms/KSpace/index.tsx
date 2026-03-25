import React from 'react';
import { Space } from 'antd';
import type { SpaceProps } from 'antd';

export interface KSpaceProps extends SpaceProps { }

/**
 * KSpace: Componente de layout para distribuir elementos con espaciado uniforme.
 * Alineado con Ant Design para soportar funcionalidades avanzadas (split, wrap, custom size).
 */
export function KSpace({ size = 'middle', ...props }: KSpaceProps) {
  return <Space size={size} {...props} />;
}

export default KSpace;
