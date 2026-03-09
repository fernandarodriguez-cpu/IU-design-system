import * as React from 'react';
import { cn } from './utils';
import { Button } from './button';
import { X } from 'lucide-react';

export interface TourStep {
  title: string;
  description: string;
  target: string | (() => HTMLElement | null);
  placement?: 'top' | 'bottom' | 'left' | 'right';
  cover?: React.ReactNode;
}

export interface TourProps {
  steps: TourStep[];
  current?: number;
  open?: boolean;
  onClose?: () => void;
  onChange?: (current: number) => void;
  onFinish?: () => void;
  mask?: boolean;
  className?: string;
}

export function Tour({
  steps,
  current: controlledCurrent,
  open = false,
  onClose,
  onChange,
  onFinish,
  mask = true,
  className
}: TourProps) {
  const [internalCurrent, setInternalCurrent] = React.useState(0);
  const [position, setPosition] = React.useState({ top: 0, left: 0 });
  const tourCardRef = React.useRef<HTMLDivElement>(null);
  
  const current = controlledCurrent !== undefined ? controlledCurrent : internalCurrent;
  const currentStep = steps[current];

  // Focus trap: move focus into tour card when open
  React.useEffect(() => {
    if (open && tourCardRef.current) {
      const firstFocusable = tourCardRef.current.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    }
  }, [open, current]);

  // Escape key handler (WCAG: modal must close on Esc)
  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  React.useEffect(() => {
    if (!open || !currentStep) return;

    const updatePosition = () => {
      const target = typeof currentStep.target === 'string'
        ? document.querySelector(currentStep.target)
        : currentStep.target();

      if (target) {
        const rect = target.getBoundingClientRect();
        const placement = currentStep.placement || 'bottom';

        let top = 0;
        let left = 0;

        switch (placement) {
          case 'top':
            top = rect.top - 10;
            left = rect.left + rect.width / 2;
            break;
          case 'bottom':
            top = rect.bottom + 10;
            left = rect.left + rect.width / 2;
            break;
          case 'left':
            top = rect.top + rect.height / 2;
            left = rect.left - 10;
            break;
          case 'right':
            top = rect.top + rect.height / 2;
            left = rect.right + 10;
            break;
        }

        setPosition({ top, left });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [open, current, currentStep]);

  const handleNext = () => {
    const nextCurrent = current + 1;
    if (nextCurrent < steps.length) {
      setInternalCurrent(nextCurrent);
      onChange?.(nextCurrent);
    } else {
      onFinish?.();
      onClose?.();
    }
  };

  const handlePrev = () => {
    const prevCurrent = current - 1;
    if (prevCurrent >= 0) {
      setInternalCurrent(prevCurrent);
      onChange?.(prevCurrent);
    }
  };

  if (!open || !currentStep) return null;

  return (
    <>
      {/* Mask */}
      {mask && (
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Tour Card - role="dialog" with aria-modal for a11y */}
      <div
        ref={tourCardRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Paso ${current + 1} de ${steps.length}: ${currentStep.title}`}
        className={cn(
          'fixed z-50 bg-card rounded-lg shadow-xl p-4 w-80',
          'border border-gray-200 dark:border-gray-700',
          className
        )}
        style={{
          top: position.top,
          left: position.left,
          transform: 'translate(-50%, -100%)'
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100" id="tour-step-title">
            {currentStep.title}
          </h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground rounded focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Cerrar tour"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Cover */}
        {currentStep.cover && (
          <div className="mb-3">{currentStep.cover}</div>
        )}

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4" id="tour-step-desc">
          {currentStep.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500" aria-live="polite">
            {current + 1} / {steps.length}
          </span>
          <div className="flex gap-2">
            {current > 0 && (
              <Button type="default" size="small" onClick={handlePrev}>
                Anterior
              </Button>
            )}
            <Button type="primary" size="small" onClick={handleNext}>
              {current === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}