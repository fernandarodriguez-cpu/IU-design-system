import React, { useRef, useEffect } from 'react';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;

export interface KQRCodeProps {
  value: string;
  size?: number;
  color?: string;
  bgColor?: string;
  className?: string;
}

/**
 * @figma-mcp-migration
 * Component: KQRCode
 * 
 * INSTRUCCIONES PARA AGENTES DE IA (VS Code / MCP):
 * Para migrar este componente a Figma, NO generar una matriz multiplicando todas las variables.
 * Utilizar Figma Component Properties V2 con la siguiente estructura:
 * 
 * 1. Variants (Estructurales):
 *    - Definir variantes puramente visuales/estructurales.
 * 2. Booleans (Encendido/Apagado):
 *    - Definir encendido/apagado para iconos o estados (isLoading, hasIcon).
 * 3. Color Variables (No usar variantes para colores semánticos):
 *    - El relleno/borde debe usar Figma Variables (Khor v6.0 Colors) asignado dinámicamente.
 *    - El consumidor del UI Kit cambiará el color del layer.
 */
export function KQRCode({ value, size = 128, color = '#000', bgColor = '#fff', className }: KQRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Simple QR-like pattern (visual placeholder - real QR needs a library)
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = color;

    // Generate deterministic pattern from value
    const moduleSize = Math.floor(size / 25);
    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        const charCode = value.charCodeAt((i * 25 + j) % value.length) || 0;
        if ((charCode + i + j) % 3 !== 0) {
          ctx.fillRect(i * moduleSize, j * moduleSize, moduleSize, moduleSize);
        }
      }
    }
    // Finder patterns (corners)
    const drawFinder = (x: number, y: number) => {
      const s = moduleSize * 7;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, s, s);
      ctx.fillStyle = bgColor;
      ctx.fillRect(x + moduleSize, y + moduleSize, s - moduleSize * 2, s - moduleSize * 2);
      ctx.fillStyle = color;
      ctx.fillRect(x + moduleSize * 2, y + moduleSize * 2, s - moduleSize * 4, s - moduleSize * 4);
    };
    drawFinder(0, 0);
    drawFinder(size - moduleSize * 7, 0);
    drawFinder(0, size - moduleSize * 7);
  }, [value, size, color, bgColor]);

  return (
    <div className={className} style={{ display: 'inline-block', padding: 8, backgroundColor: bgColor, borderRadius: t.radius.md, border: `1px solid ${t.colors.neutral[200]}` }}>
      <canvas ref={canvasRef} width={size} height={size} style={{ display: 'block' }} />
      <div style={{ textAlign: 'center', marginTop: 4, fontSize: 10, color: t.colors.neutral[400], maxWidth: size, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {value}
      </div>
    </div>
  );
}

export default KQRCode;
