import React from 'react';
import { Carousel } from 'antd';
import type { CarouselProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;

/* ═══════════════════════════════════════════════
   KCarousel — Carrusel (Organismo)
   ═══════════════════════════════════════════════ */
export interface KCarouselProps extends CarouselProps { }

export function KCarousel({ className, style, ...rest }: KCarouselProps) {
  return (
    <div className={className} style={{ borderRadius: t.radius.lg, overflow: 'hidden', ...style }}>
      <Carousel {...rest} />
    </div>
  );
}

export default KCarousel;
