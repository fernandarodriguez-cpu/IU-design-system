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
        <label className="text-sm font-medium text-khor-neutral-900 font-primary">
          {label}
          {required && <span className="text-khor-feedback-error ml-0.5">*</span>}
        </label>
      )}
      {children}
      {error && <span className="text-xs text-khor-feedback-error font-primary">{error}</span>}
      {!error && hint && <span className="text-xs text-khor-neutral-500 font-primary">{hint}</span>}
    </div>
  );
}

export default KFormField;
