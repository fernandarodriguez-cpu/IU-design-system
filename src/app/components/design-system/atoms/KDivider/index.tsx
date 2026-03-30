import React from 'react';
import { Divider } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;

/**
 * KDivider: Línea divisora horizontal o vertical.
 * Refinado para evitar fugas de props al DOM (variant, size, fullWidth).
 */
export function KDivider({ 
  style, variant, size, fullWidth, ...rest 
}: React.ComponentProps<typeof Divider> & { variant?: any, size?: any, fullWidth?: any }) {
  return (
    <Divider 
      style={{ 
        borderColor: t.colors.neutral[200], 
        ...style 
      }} 
      {...rest} 
    />
  );
}

export default KDivider;
