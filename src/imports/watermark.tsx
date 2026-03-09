import * as React from 'react';
import { cn } from './utils';

export interface WatermarkProps {
  content?: string | string[];
  font?: {
    color?: string;
    fontSize?: number;
    fontWeight?: 'normal' | 'bold';
    fontFamily?: string;
  };
  gap?: [number, number];
  offset?: [number, number];
  rotate?: number;
  zIndex?: number;
  opacity?: number;
  children: React.ReactNode;
  className?: string;
}

export function Watermark({
  content = 'Hiumanlab',
  font = {},
  gap = [100, 100],
  offset = [0, 0],
  rotate = -22,
  zIndex = 9,
  opacity = 0.15,
  children,
  className
}: WatermarkProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [watermarkUrl, setWatermarkUrl] = React.useState<string>('');

  React.useEffect(() => {
    const {
      color = 'rgba(0, 0, 0, 0.15)',
      fontSize = 16,
      fontWeight = 'normal',
      fontFamily = 'sans-serif'
    } = font;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const contentArray = Array.isArray(content) ? content : [content];
    const contentHeight = contentArray.length * fontSize * 1.5;

    canvas.width = gap[0];
    canvas.height = Math.max(gap[1], contentHeight + 40);

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotate * Math.PI) / 180);

    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    contentArray.forEach((text, index) => {
      const y = (index - contentArray.length / 2 + 0.5) * fontSize * 1.5;
      ctx.fillText(text, 0, y);
    });

    setWatermarkUrl(canvas.toDataURL());
  }, [content, font, gap, rotate]);

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      {children}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex,
          backgroundImage: `url(${watermarkUrl})`,
          backgroundRepeat: 'repeat',
          backgroundPosition: `${offset[0]}px ${offset[1]}px`,
          opacity
        }}
      />
    </div>
  );
}
