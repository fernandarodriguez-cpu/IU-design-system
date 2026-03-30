import React from 'react';
import { Timeline } from 'antd';
import type { TimelineProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KTimeline — Línea de tiempo
   ═══════════════════════════════════════════════ */
export interface KTimelineProps extends TimelineProps { }

/**
 * KTimeline: Componente para mostrar eventos en orden cronológico.
 * Refinado para evitar fugas de props al DOM (variant, size, fullWidth).
 */
export function KTimeline({ 
  style, 
  variant, 
  size, 
  fullWidth, 
  ...rest 
}: KTimelineProps & { variant?: any, size?: any, fullWidth?: any }) {
  return (
    <div style={{ 
      fontFamily: font, 
      ...style 
    }}>
      <Timeline {...rest} />
    </div>
  );
}

export default KTimeline;
