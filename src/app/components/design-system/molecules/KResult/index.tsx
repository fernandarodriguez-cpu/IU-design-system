import React from 'react';
import { CheckCircle2, XCircle, Info, AlertTriangle, Search, ShieldAlert, FileWarning } from 'lucide-react';
import { cn } from '../../../../../imports/utils';

export type KResultStatus = 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500';

export interface KResultProps {
  status: KResultStatus;
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  icon?: React.ReactNode;
  extra?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const statusIcons = {
  success: <CheckCircle2 className="w-16 h-16 text-emerald-500" />,
  error: <XCircle className="w-16 h-16 text-red-500" />,
  info: <Info className="w-16 h-16 text-sky-500" />,
  warning: <AlertTriangle className="w-16 h-16 text-amber-500" />,
  '404': <Search className="w-16 h-16 text-[var(--khor-neutral-300)]" />,
  '403': <ShieldAlert className="w-16 h-16 text-[var(--khor-neutral-300)]" />,
  '500': <FileWarning className="w-16 h-16 text-[var(--khor-neutral-300)]" />,
};

/**
 * KResult — Página de estado o resultado (Headless v4)
 * Reemplaza AntD Result con una estructura limpia y moderna de Tailwind.
 */
export function KResult({ 
  status = 'info', 
  title, 
  subTitle, 
  icon, 
  extra, 
  className, 
  style,
  children 
}: KResultProps) {
  
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center text-center p-12 font-primary animate-in fade-in zoom-in-95 duration-500",
        className
      )}
      style={style}
    >
      <div className="mb-6 flex justify-center">
        {icon || statusIcons[status]}
      </div>
      
      <h2 className="text-2xl font-extrabold text-[var(--khor-neutral-900)] mb-2 tracking-tight">
        {title}
      </h2>
      
      {subTitle && (
        <p className="text-sm text-[var(--khor-neutral-500)] max-w-md mx-auto mb-8 font-medium leading-relaxed">
          {subTitle}
        </p>
      )}

      {extra && (
        <div className="flex gap-3 justify-center">
          {extra}
        </div>
      )}

      {children && (
        <div className="mt-8 w-full">
          {children}
        </div>
      )}
    </div>
  );
}

export default KResult;
