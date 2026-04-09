import React from 'react';
import { khorTokens } from '../../../../theme/khor-theme';
import { cn } from '../../../../../imports/utils';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KFormFieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export function KFormField({ label, required, error, hint, children, className }: KFormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && (
        <label className="text-[13px] font-semibold text-khor-neutral-700 font-primary mb-0.5 block">
          {label}
          {required && <span className="text-khor-feedback-error ml-1">*</span>}
        </label>
      )}
      {children}
      {error && <span className="text-xs text-khor-feedback-error font-medium font-primary mt-0.5">{error}</span>}
      {!error && hint && <span className="text-xs text-khor-neutral-500 font-normal font-primary mt-0.5">{hint}</span>}
    </div>
  );
}

export default KFormField;
