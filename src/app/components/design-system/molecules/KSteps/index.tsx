import React from 'react';
import { Steps } from 'antd';
import type { StepsProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KStepsProps extends StepsProps { }

/**
 * KSteps: Indicador de progreso de proceso multi-paso.
 * Refinado para evitar fugas de props al DOM (variant, size, fullWidth).
 */
export function KSteps({ 
  style, variant, size, fullWidth, ...rest 
}: KStepsProps & { variant?: any, size?: any, fullWidth?: any }) {
  return (
    <Steps
      style={{
        fontFamily: font,
        ...style
      }}
      size={size as any}
      {...rest}
    />
  );
}

export default KSteps;
