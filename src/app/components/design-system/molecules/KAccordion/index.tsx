import React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../../../../imports/utils';

export interface KAccordionItem {
  key: string;
  label: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
  extra?: React.ReactNode;
}

export interface KAccordionProps {
  items: KAccordionItem[];
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: any) => void;
  collapsible?: boolean;
  className?: string;
  variant?: 'ghost' | 'bordered';
  // Props de paridad AntD
  accordion?: boolean;
  ghost?: boolean;
  defaultActiveKey?: string | string[];
  expandIconPosition?: 'start' | 'end';
  showArrow?: boolean;
}

/**
 * KAccordion — Paneles de contenido colapsables (Headless v4)
 * Basado en Radix UI Accordion y Tailwind CSS v4 con animaciones nativas.
 */
export function KAccordion({
  items,
  type = 'single',
  defaultValue,
  value,
  onValueChange,
  collapsible = true,
  className,
  variant = 'bordered',
  accordion,
  ghost,
  defaultActiveKey,
  expandIconPosition = 'end',
  showArrow = true,
}: KAccordionProps) {
  // Paridad: Si accordion es true, forzar type="single"
  const resolvedType = accordion ? 'single' : type;
  const resolvedVariant = ghost ? 'ghost' : variant;
  const resolvedDefaultValue = defaultActiveKey || defaultValue;
  const isIconStart = expandIconPosition === 'start';
  return (
    <AccordionPrimitive.Root
      type={type as any}
      defaultValue={defaultValue as any}
      value={value as any}
      onValueChange={onValueChange}
      collapsible={collapsible}
      className={cn("w-full space-y-2 font-primary", className)}
    >
      {items.map((item) => (
        <AccordionPrimitive.Item
          key={item.key}
          value={item.key}
          disabled={item.disabled}
          className={cn(
            "overflow-hidden transition-all duration-300",
            variant === 'bordered' && "border border-khor-neutral-200 rounded-lg px-2",
            variant === 'ghost' && "border-b border-khor-neutral-100"
          )}
        >
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
              className={cn(
                "flex flex-1 items-center gap-3 py-4 text-sm font-bold transition-all hover:text-khor-primary [&[data-state=open]>svg]:rotate-180",
                isIconStart ? "flex-row" : "flex-row-reverse justify-end",
                item.disabled && "opacity-50 cursor-not-allowed hover:text-current"
              )}
            >
              {showArrow && (
                <ChevronDown className="h-4 w-4 shrink-0 text-khor-neutral-400 transition-transform duration-300" />
              )}
              <div className="flex-1 text-left">
                {item.label}
              </div>
              {item.extra && (
                <div 
                  className={cn("ml-auto flex items-center", isIconStart ? "" : "order-first")}
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.extra}
                </div>
              )}
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          
          <AccordionPrimitive.Content
            className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
          >
            <div className="pb-4 pt-0 text-khor-neutral-600 leading-relaxed">
              {item.children}
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}

export default KAccordion;
