import React, { useState, useRef, useEffect } from 'react';

export interface KWatermarkProps {
  text: string;
  fontSize?: number;
  color?: string;
  rotate?: number;
  gap?: number;
  children: React.ReactNode;
  className?: string;
}

export function KWatermark({ text, fontSize = 14, color = 'rgba(0,0,0,0.06)', rotate = -22, gap = 120, children, className }: KWatermarkProps) {
  const [bgImage, setBgImage] = useState('');

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const size = gap + text.length * fontSize;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.translate(size / 2, size / 2);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.font = `${fontSize}px Montserrat, sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.fillText(text, 0, 0);
    setBgImage(`url(${canvas.toDataURL()})`);
  }, [text, fontSize, color, rotate, gap]);

  return (
    <div className={className} style={{ position: 'relative' }}>
      {children}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        backgroundImage: bgImage, backgroundRepeat: 'repeat',
      }} />
    </div>
  );
}

export default KWatermark;
