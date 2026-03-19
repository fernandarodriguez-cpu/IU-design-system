import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { khorTokens } from '../../../../theme/khor-theme';
import { KButton } from '../../atoms';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KTour — Tour guiado (onboarding)
   ═══════════════════════════════════════════════ */
export interface KTourStep {
  title: string;
  description: string;
  target: string | (() => HTMLElement | null);
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

export interface KTourProps {
  steps: KTourStep[];
  open?: boolean;
  onClose?: () => void;
  onFinish?: () => void;
  mask?: boolean;
  className?: string;
}

export function KTour({ steps, open = false, onClose, onFinish, mask = true }: KTourProps) {
  const [current, setCurrent] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const currentStep = steps[current];

  useEffect(() => {
    if (!open || !currentStep) return;
    const getTarget = () => {
      if (typeof currentStep.target === 'string') return document.querySelector(currentStep.target) as HTMLElement;
      return currentStep.target();
    };
    const el = getTarget();
    if (el) {
      const rect = el.getBoundingClientRect();
      setPosition({ top: rect.top + window.scrollY, left: rect.left + window.scrollX, width: rect.width, height: rect.height });
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [current, open, currentStep]);

  if (!open || !currentStep) return null;

  const placement = currentStep.placement || 'bottom';
  const cardStyle: React.CSSProperties = {
    position: 'absolute', zIndex: 10001, width: 320,
    backgroundColor: t.colors.neutral[50], borderRadius: t.radius.lg,
    boxShadow: t.shadows.lg, padding: 20, fontFamily: font,
    border: `1px solid ${t.colors.neutral[200]}`,
  };

  if (placement === 'bottom') { cardStyle.top = position.top + position.height + 12; cardStyle.left = position.left; }
  else if (placement === 'top') { cardStyle.bottom = window.innerHeight - position.top + 12; cardStyle.left = position.left; }
  else if (placement === 'right') { cardStyle.top = position.top; cardStyle.left = position.left + position.width + 12; }
  else { cardStyle.top = position.top; cardStyle.right = window.innerWidth - position.left + 12; }

  const handleNext = () => {
    if (current < steps.length - 1) setCurrent(current + 1);
    else { onFinish?.(); onClose?.(); setCurrent(0); }
  };

  const handlePrev = () => { if (current > 0) setCurrent(current - 1); };

  return (
    <>
      {/* Mask */}
      {mask && <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', zIndex: 9999 }} onClick={onClose} />}
      {/* Highlight */}
      <div style={{
        position: 'absolute', top: position.top - 4, left: position.left - 4,
        width: position.width + 8, height: position.height + 8,
        borderRadius: t.radius.md, border: `2px solid ${t.colors.brand.primary}`,
        boxShadow: `0 0 0 9999px rgba(0,0,0,0.45)`, zIndex: 10000,
        pointerEvents: 'none',
      }} />
      {/* Card */}
      <div ref={cardRef} style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <h4 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: t.colors.brand.navy }}>{currentStep.title}</h4>
          <button onClick={() => { onClose?.(); setCurrent(0); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.colors.neutral[400], display: 'flex', padding: 0 }}>
            <X size={16} />
          </button>
        </div>
        <p style={{ margin: '0 0 16px', fontSize: 14, color: t.colors.neutral[500], lineHeight: 1.5 }}>{currentStep.description}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: t.colors.neutral[400] }}>{current + 1} / {steps.length}</span>
          <div style={{ display: 'flex', gap: 8 }}>
            {current > 0 && <KButton variant="ghost" size="sm" onClick={handlePrev}>Anterior</KButton>}
            <KButton variant="primary" size="sm" onClick={handleNext}>
              {current === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
            </KButton>
          </div>
        </div>
        {/* Step dots */}
        <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginTop: 12 }}>
          {steps.map((_, i) => (
            <div key={i} style={{
              width: 6, height: 6, borderRadius: '50%',
              backgroundColor: i === current ? t.colors.brand.primary : t.colors.neutral[200],
              transition: 'background-color 0.15s ease',
            }} />
          ))}
        </div>
      </div>
    </>
  );
}

export default KTour;
