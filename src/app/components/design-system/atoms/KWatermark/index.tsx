import React from 'react';
import { Watermark as AntWatermark, type WatermarkProps as AntWatermarkProps } from 'antd';
import { cn } from '@/utils/cn';

/* ─── KWatermark ───────────────────────────────────────────────
   New Khor atom wrapping Ant Design's Watermark.
   Themed by the global bridge (khorAntdTheme.ts); this wrapper only
   maps the Khor public API onto AntD and keeps `font-primary`.
   AntD's Watermark is a React.FC (no ref forwarding), so this
   wrapper is a plain function component.
──────────────────────────────────────────────────────────────── */

export interface KWatermarkProps
  extends Omit<AntWatermarkProps, 'content' | 'font'> {
  /** Watermark text — single line or multiple lines */
  content?: string | string[];
  /** Font configuration for text watermarks */
  font?: AntWatermarkProps['font'];
  /** Watermark width */
  width?: number;
  /** Watermark height */
  height?: number;
  /** Rotation angle in degrees */
  rotate?: number;
  /** Spacing between repeated watermarks [x, y] */
  gap?: [number, number];
  /** Offset of the watermark from the top-left corner [x, y] */
  offset?: [number, number];
  /** Image source — takes priority over text content */
  image?: string;
  /** Stacking order of the watermark layer */
  zIndex?: number;
  children?: React.ReactNode;
}

export const KWatermark: React.FC<KWatermarkProps> = function KWatermark({
  className,
  content,
  font,
  width,
  height,
  rotate,
  gap,
  offset,
  image,
  zIndex,
  children,
  ...rest
}) {
  return (
    <AntWatermark
      content={content}
      font={font}
      width={width}
      height={height}
      rotate={rotate}
      gap={gap}
      offset={offset}
      image={image}
      zIndex={zIndex}
      className={cn('font-primary', className)}
      {...rest}
    >
      {children}
    </AntWatermark>
  );
};

KWatermark.displayName = 'KWatermark';
export default KWatermark;
