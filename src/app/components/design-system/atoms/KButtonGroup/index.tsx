import React from 'react';
import { KSpace, KSpaceSize } from '../KSpace';
import { cn } from '../../../../../imports/utils';

export interface KButtonGroupProps {
  children: React.ReactNode;
  size?: KSpaceSize;
  className?: string;
  direction?: 'horizontal' | 'vertical';
}

/**
 * KButtonGroup — Grupo de botones con espaciado consistente.
 * Utiliza KSpace internamente para gestionar el gap.
 */
export function KButtonGroup({ 
  children, 
  className, 
  size = 'sm',
  direction = 'horizontal' 
}: KButtonGroupProps) {
  return (
    <KSpace 
      direction={direction} 
      size={size} 
      className={cn("inline-flex", className)}
    >
      {children}
    </KSpace>
  );
}

export default KButtonGroup;
