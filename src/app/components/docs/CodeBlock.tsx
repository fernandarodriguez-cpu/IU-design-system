/**
 * CodeBlock — Bloque de código con copiado y descarga.
 */
import React, { useState } from 'react';
import { Copy, Check, Download } from 'lucide-react';
import { khorTokens } from '../../theme/khor-theme';

export interface CodeBlockProps {
  code: string;
  filename?: string;
  language?: string;
}

export function CodeBlock({ code, filename, language = 'tsx' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || `component.${language}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ borderRadius: khorTokens.radius.lg, overflow: 'hidden', border: `1px solid ${khorTokens.colors.neutral[200]}`, fontFamily: khorTokens.typography.fontSecondary }}>
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: `${khorTokens.spacing.xs}px ${khorTokens.spacing.md}px`,
        backgroundColor: khorTokens.colors.brand.secondary, color: khorTokens.colors.feedback.white, 
        fontSize: khorTokens.typography.bodyXs.size,
        fontWeight: khorTokens.typography.fontWeights.semibold,
        letterSpacing: khorTokens.typography.letterSpacing.wide,
      }}>
        <span>{filename || language}</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={handleCopy}
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              color: khorTokens.colors.feedback.white,
              cursor: 'pointer', fontSize: khorTokens.typography.bodyXs.size, padding: '4px 8px', borderRadius: khorTokens.radius.sm,
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copiado' : 'Copiar'}
          </button>
          <button
            onClick={handleDownload}
            style={{
              display: 'flex', alignItems: 'center', gap: khorTokens.spacing.xs,
              background: 'none', border: 'none', color: '#cdd6f4',
              cursor: 'pointer', fontSize: khorTokens.typography.bodyXs.size, padding: `${khorTokens.spacing.xxs}px ${khorTokens.spacing.sm}px`, borderRadius: khorTokens.radius.sm,
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Download size={khorTokens.icon.xs} />
            Descargar
          </button>
        </div>
      </div>
      {/* Code */}
      <pre style={{
        margin: 0,
        padding: khorTokens.spacing.md,
        backgroundColor: '#030d2e', // Background ligeramente más oscuro para el código
        color: '#cdd6f4',
        fontSize: khorTokens.typography.bodyXs.size,
        lineHeight: 1.6,
        overflowX: 'auto',
        tabSize: 2,
      }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
