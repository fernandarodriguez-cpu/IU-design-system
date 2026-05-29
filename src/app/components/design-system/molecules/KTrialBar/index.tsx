/**
 * ╔═══════════════════════════════════════════╗
 * ║  KHOR TRIAL BAR — Molecule                ║
 * ║  Premium SaaS Upsell Logic                ║
 * ╚═══════════════════════════════════════════╝
 */
import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { KButton, KText } from '../../atoms';
import { khorTokens } from '../../../../theme/khor-theme';

export interface KTrialBarProps {
  daysLeft: number;
  totalDays?: number;
  planName?: string;
  onUpgrade?: () => void;
  className?: string;
}

/**
 * @figma-mcp-migration
 * Component: KTrialBar
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
export const KTrialBar: React.FC<KTrialBarProps> = ({
  daysLeft,
  totalDays = 14,
  planName = 'Free Trial',
  onUpgrade,
  className = '',
}) => {
  const progress = Math.max(0, Math.min(100, (daysLeft / totalDays) * 100));
  const isUrgent = daysLeft <= 3;

  return (
    <div 
      className={`khor-glass flex items-center justify-between p-4 px-6 rounded-2xl ${className}`}
      style={{
        width: '100%',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      <div className="flex items-center gap-6 flex-1">
        {/* Plan Info */}
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${isUrgent ? 'bg-khor-error/10 text-khor-error' : 'bg-khor-primary/10 text-khor-primary'}`}>
            <Sparkles size={20} />
          </div>
          <div>
            <KText variant="small" className="font-bold uppercase tracking-wider opacity-60">
              {planName}
            </KText>
            <KText variant="body-md" className="font-bold">
              {daysLeft} días restantes
            </KText>
          </div>
        </div>

        {/* Progress Logic */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="h-1.5 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${isUrgent ? 'bg-khor-error' : 'bg-khor-primary'}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="flex items-center gap-4">
        <KText variant="small" className="hidden lg:block opacity-70">
          Obtén acceso ilimitado a todas las funciones Pro.
        </KText>
        <KButton 
          variant={isUrgent ? 'danger' : 'primary'} 
          size="sm" 
          onClick={onUpgrade}
          icon={<ArrowRight size={16} />}
          iconPosition="end"
          className="shadow-lg"
        >
          Upgrade Now
        </KButton>
      </div>
    </div>
  );
};
