import React from 'react';
import { Tour } from 'antd';
import type { TourProps, TourStepProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KTour — Tour guiado (onboarding)
   ═══════════════════════════════════════════════ */
export interface KTourStep extends Omit<TourStepProps, 'target'> {
  target: string | (() => HTMLElement | null) | HTMLElement | null;
}

export interface KTourProps extends Omit<TourProps, 'steps' | 'open' | 'onClose'> {
  steps: KTourStep[];
  open?: boolean;
  onClose?: () => void;
  onFinish?: () => void;
}

export function KTour({ 
  steps, 
  open = false, 
  onClose, 
  onFinish, 
  mask = true,
  type,
  ...rest 
}: KTourProps) {
  
  const mappedSteps = steps.map(step => {
    let target: any = step.target;
    if (typeof step.target === 'string') {
      target = () => document.querySelector(step.target as string);
    }
    return {
      ...step,
      target
    };
  });

  const handleClose = () => {
    onClose?.();
  };

  const handleFinish = () => {
    onFinish?.();
    onClose?.();
  };

  return (
    <Tour
      open={open}
      onClose={handleClose}
      mask={mask}
      steps={mappedSteps}
      type={type}
      rootClassName="khor-tour"
      {...rest}
    />
  );
}

// Add global styles for the tour to ensure khor aesthetic if needed, 
// though AntD 5 handles most via token-style if configured globally.
// Here we rely on the AntD component being styled by the parent ConfigProvider or default tokens.

export default KTour;
