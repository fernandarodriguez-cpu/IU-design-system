import React, { useState } from 'react';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { KButton } from '../../atoms/KButton';
import { KText } from '../../atoms/KText';
import { KSteps } from '../../molecules/KSteps';
import { cn } from '@/utils/cn';

export interface WizardStep {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode;
  isValid?: boolean;
}

interface KFormWizardProps {
  steps: WizardStep[];
  onComplete?: (data: any) => void;
  onCancel?: () => void;
  className?: string;
}

/**
 * @figma-mcp-migration
 * Component: KFormWizard
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
export function KFormWizard({ steps, onComplete, onCancel, className }: KFormWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete?.({});
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className={cn("flex flex-col gap-8 bg-white dark:bg-khor-surface-card rounded-2xl border border-khor-border-default shadow-khor-lg overflow-hidden", className)}>
      {/* Header with Steps */}
      <div className="px-8 pt-8 pb-6 border-b border-khor-border-default bg-khor-neutral-50/50">
        <KSteps 
          current={currentStep} 
          items={steps.map(s => ({ title: s.title, description: s.description }))} 
        />
      </div>

      {/* Content Area */}
      <div className="px-8 py-4 flex-1 min-h-[300px] animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="mb-6">
          <KText variant="h3" className="text-khor-brand-navy mb-1">{steps[currentStep].title}</KText>
          {steps[currentStep].description && (
            <KText variant="small" className="text-khor-text-secondary">{steps[currentStep].description}</KText>
          )}
        </div>
        
        <div className="py-2">
          {steps[currentStep].content}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-8 py-6 border-t border-khor-border-default flex items-center justify-between bg-khor-neutral-50/50">
        <KButton 
          variant="ghost" 
          onClick={onCancel}
        >
          Cancelar
        </KButton>
        
        <div className="flex gap-3">
          {!isFirstStep && (
            <KButton 
              variant="outline" 
              icon={<ArrowLeft size={16} />}
              onClick={handleBack}
            >
              Anterior
            </KButton>
          )}
          
          <KButton 
            variant="primary" 
            icon={isLastStep ? <Check size={16} /> : <ArrowRight size={16} />}
            iconPosition="right"
            onClick={handleNext}
          >
            {isLastStep ? 'Finalizar' : 'Siguiente'}
          </KButton>
        </div>
      </div>
    </div>
  );
}

export default KFormWizard;
