import React from 'react';
import { CheckCircle2, XCircle, Info, AlertTriangle, Search, ShieldAlert, FileWarning, Ghost } from 'lucide-react';
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
  success: <div className="bg-emerald-50 p-4 rounded-full"><CheckCircle2 className="w-16 h-16 text-emerald-500" /></div>,
  error: <div className="bg-red-50 p-4 rounded-full"><XCircle className="w-16 h-16 text-red-500" /></div>,
  info: <div className="bg-sky-50 p-4 rounded-full"><Info className="w-16 h-16 text-sky-500" /></div>,
  warning: <div className="bg-amber-50 p-4 rounded-full"><AlertTriangle className="w-16 h-16 text-amber-500" /></div>,
  '404': <div className="relative"><Search className="w-20 h-20 text-khor-neutral-200" /><Ghost className="w-8 h-8 text-khor-neutral-400 absolute bottom-0 right-0 animate-bounce" /></div>,
  '403': <div className="bg-khor-neutral-50 p-6 rounded-3xl"><ShieldAlert className="w-20 h-20 text-khor-navy opacity-80" /></div>,
  '500': <div className="bg-red-50/30 p-6 rounded-3xl border-2 border-dashed border-red-100"><FileWarning className="w-20 h-20 text-red-400/80" /></div>,
};

/**
 * KResult — Página de estado o resultado (Headless v4)
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
        "flex flex-col items-center justify-center text-center p-12 font-primary",
        className
      )}
      style={style}
    >
      <div className="mb-8 flex justify-center animate-in zoom-in duration-700">
        {icon || statusIcons[status]}
      </div>
      
      <h2 className="text-3xl font-extrabold text-khor-neutral-900 mb-3 tracking-tight">
        {title}
      </h2>
      
      {subTitle && (
        <div className="text-base text-khor-neutral-500 max-w-xl mx-auto mb-10 font-medium leading-relaxed">
          {subTitle}
        </div>
      )}

      {extra && (
        <div className="flex gap-4 justify-center items-center">
          {extra}
        </div>
      )}

      {children && (
        <div className="mt-12 w-full max-w-2xl mx-auto bg-khor-neutral-50 p-6 rounded-2xl border border-khor-neutral-100 shadow-sm text-left">
          {children}
        </div>
      )}
    </div>
  );
}

export default KResult;
