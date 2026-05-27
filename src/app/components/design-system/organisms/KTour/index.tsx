import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { cn } from '@/utils/cn';
import { KButton } from '../../atoms/KButton';

export interface KTourStep {
  title: React.ReactNode;
  description: React.ReactNode;
  target?: string | HTMLElement | null;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

export interface KTourProps {
  steps: KTourStep[];
  open?: boolean;
  onClose?: () => void;
  onFinish?: () => void;
  className?: string;
}

/**
 * KTour — Tour guiado secuencial (Total Headless)
 * Implementación basada en modales flotantes con seguimiento de posición.
 */
/**
 * @figma-mcp-migration
 * Component: KTour
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
export function KTour({
  steps,
  open = false,
  onClose,
  onFinish,
  className,
}: KTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
  const step = steps[currentStep];

  useEffect(() => {
    if (open && step?.target) {
      const updatePosition = () => {
        let el: HTMLElement | null = null;
        if (typeof step.target === 'string') {
          el = document.querySelector(step.target);
        } else {
          el = step.target as HTMLElement;
        }

        if (el) {
          const rect = el.getBoundingClientRect();
          const scrollY = window.scrollY;
          const scrollX = window.scrollX;

          // Posicionamiento básico debajo del elemento
          setCoords({
            top: rect.bottom + scrollY + 12,
            left: rect.left + scrollX + (rect.width / 2) - 160, // Centrado relativo a 320px de ancho
          });
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          setCoords(null); // Centrar si no hay target
        }
      };

      updatePosition();
      window.addEventListener('resize', updatePosition);
      return () => window.removeEventListener('resize', updatePosition);
    } else {
      setCoords(null);
    }
  }, [open, currentStep, step]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onFinish?.();
      onClose?.();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (!open) return null;

  const isLast = currentStep === steps.length - 1;

  return (
    <div className="fixed inset-0 z-[1000] pointer-events-none font-primary">
      {/* Overlay opcional si quisiéramos bloquear interacción, pero el usuario pidió algo simple */}
      <div className="absolute inset-0 bg-black/10 pointer-events-auto" onClick={onClose} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          className={cn(
            "absolute pointer-events-auto w-80 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-khor-neutral-200 p-5 overflow-hidden",
            !coords && "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            className
          )}
          style={coords ? { top: coords.top, left: coords.left } : {}}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] font-bold text-khor-primary uppercase tracking-widest bg-khor-primary-light/10 px-2 py-0.5 rounded-full">
              Paso {currentStep + 1} de {steps.length}
            </span>
            <button onClick={onClose} className="p-1 text-khor-neutral-400 hover:text-khor-neutral-800 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <h4 className="text-base font-extrabold text-khor-neutral-900 mb-1.5 leading-tight">
            {step?.title}
          </h4>
          <p className="text-sm text-khor-neutral-600 leading-relaxed mb-6 font-medium">
            {step?.description}
          </p>

          {/* Footer */}
          <div className="flex justify-between items-center gap-4">
            <div className="flex gap-1">
              {steps.map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all",
                    i === currentStep ? "w-4 bg-khor-primary" : "bg-khor-neutral-200"
                  )} 
                />
              ))}
            </div>
            
            <div className="flex gap-2">
              {currentStep > 0 && (
                <KButton 
                  size="sm" 
                  variant="neutral" 
                  onClick={handleBack}
                  className="px-3"
                >
                  ATRÁS
                </KButton>
              )}
              <KButton 
                size="sm" 
                variant="primary" 
                onClick={handleNext}
                className="px-4"
              >
                {isLast ? 'FINALIZAR' : 'SIGUIENTE'}
              </KButton>
            </div>
          </div>

          {/* Connector Arrow (si hay coords) */}
          {coords && (
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-t border-l border-khor-neutral-200 rotate-45 shadow-[-2px_-2px_5px_rgba(0,0,0,0.02)]" />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default KTour;
