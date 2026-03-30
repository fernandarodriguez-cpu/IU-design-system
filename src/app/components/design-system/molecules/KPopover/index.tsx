import React from 'react';
import { Popover } from 'antd';
import type { PopoverProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KPopoverProps extends Omit<PopoverProps, 'align'> {
  // Aliases for compatibility with Radix-like API if needed, 
  // but we prefer AntD placement.
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
}

/**
 * KPopover: Contenedor flotante para información o acciones adicionales.
 * Refinado para evitar fugas de props al DOM (variant, size, fullWidth).
 */
export function KPopover({ 
  children, 
  content, 
  side = 'bottom', 
  align = 'center', 
  placement,
  overlayStyle,
  variant,
  size,
  fullWidth,
  ...rest 
}: KPopoverProps & { variant?: any, size?: any, fullWidth?: any }) {
  // Mapping Radix-like side/align to AntD placement if placement is not provided
  const getPlacement = () => {
    if (placement) return placement;
    
    const placementMap: Record<string, any> = {
      'top-start': 'topLeft',
      'top-center': 'top',
      'top-end': 'topRight',
      'bottom-start': 'bottomLeft',
      'bottom-center': 'bottom',
      'bottom-end': 'bottomRight',
      'left-start': 'leftTop',
      'left-center': 'left',
      'left-end': 'leftBottom',
      'right-start': 'rightTop',
      'right-center': 'right',
      'right-end': 'rightBottom',
    };

    const key = `${side}-${align}`;
    return placementMap[key] || side;
  };

  return (
    <Popover
      content={content}
      placement={getPlacement()}
      overlayStyle={{ 
        fontFamily: font, 
        ...overlayStyle 
      }}
      {...rest}
    >
      {children}
    </Popover>
  );
}

export default KPopover;
