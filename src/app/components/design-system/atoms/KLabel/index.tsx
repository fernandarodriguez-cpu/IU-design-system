import React from 'react';
import { cn } from '@/utils/cn';
import { Info } from 'lucide-react';
import { KTooltip } from '../../molecules/KTooltip';

/* ─── Figma tokens: KLabel (187675-34963 / 187675-34761) ─────────
   Required : asterisk (#E04D36) before label text
   Optional : "(optional)" text after label
   Tooltip  : ℹ icon (KTooltip) after label / optional text
   Disabled : label text #9CA3AF
────────────────────────────────────────────────────────────────── */

export interface KLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  optional?: boolean;
  info?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
}

export const KLabel = React.forwardRef<HTMLLabelElement, KLabelProps>(function KLabel(
  { required, optional, info, size = 'md', disabled, className, children, ...rest },
  ref,
) {
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <label
      ref={ref}
      className={cn(
        'inline-flex items-center gap-0.5 font-medium font-primary select-none leading-none',
        sizeClasses[size],
        disabled ? 'text-[#9CA3AF]' : 'text-[#374151]',
        className,
      )}
      {...rest}
    >
      {required && (
        <span className="text-[#E04D36] mr-0.5" aria-hidden="true">*</span>
      )}

      <span>{children}</span>

      {optional && (
        <span className={cn('ml-1 font-normal', disabled ? 'text-[#9CA3AF]' : 'text-[#9CA3AF]')}>
          (optional)
        </span>
      )}

      {info && (
        <KTooltip title={info}>
          <Info
            size={13}
            className={cn(
              'ml-1 cursor-help transition-colors',
              disabled ? 'text-[#D1D5DB]' : 'text-[#9CA3AF] hover:text-[#E04D36]',
            )}
          />
        </KTooltip>
      )}
    </label>
  );
});

export default KLabel;
