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

export function KTimeline({ style, ...rest }: KTimelineProps) {
  return (
    <div style={{ fontFamily: font, ...style }}>
      <Timeline {...rest} />
    </div>
  );
}

export default KTimeline;
