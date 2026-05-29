import React, { useState } from 'react';
import { X } from 'lucide-react';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;

export interface KImageProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  fallback?: string;
  preview?: boolean;
  className?: string;
}

/**
 * @figma-mcp-migration
 * Component: KImage
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
export function KImage({ src, alt = '', width, height, fallback, preview = true, className }: KImageProps) {
  const [error, setError] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const displaySrc = error && fallback ? fallback : src;

  return (
    <>
      <div className={className} style={{ position: 'relative', display: 'inline-block', cursor: preview ? 'zoom-in' : 'default' }}
        onClick={() => preview && setShowPreview(true)}>
        <img src={displaySrc} alt={alt} width={width} height={height} onError={() => setError(true)}
          style={{ borderRadius: t.radius.md, objectFit: 'cover', display: 'block' }} />
      </div>
      {showPreview && (
        <div onClick={() => setShowPreview(false)} style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 10000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out',
        }}>
          <img src={displaySrc} alt={alt} style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: t.radius.lg }} />
          <button onClick={() => setShowPreview(false)} style={{
            position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.2)', border: 'none',
            borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#fff',
          }}><X size={20} /></button>
        </div>
      )}
    </>
  );
}

export default KImage;
