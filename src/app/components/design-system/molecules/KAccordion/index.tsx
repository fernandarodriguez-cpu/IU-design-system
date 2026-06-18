import React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

// ─── Types ───────────────────────────────────────────────────────────────────

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
  // AntD parity / shorthand
  accordion?: boolean;
  defaultActiveKey?: string | string[];
}

// ─── KAccordionColumn ─────────────────────────────────────────────────────────
// A single column inside KAccordionColumns. Optional title + any children.

export interface KAccordionColumnProps {
  title?: React.ReactNode;
  gap?: number;
  children: React.ReactNode;
  className?: string;
}

export function KAccordionColumn({
  title,
  gap = 12,
  children,
  className,
}: KAccordionColumnProps) {
  return (
    <div className={cn('flex flex-col', className)} style={{ gap }}>
      {title && (
        <p className="m-0 text-sm font-semibold" style={{ color: '#051758' }}>
          {title}
        </p>
      )}
      {children}
    </div>
  );
}

// ─── KAccordionColumns ────────────────────────────────────────────────────────
// Grid wrapper: 1–4 columns. Use KAccordionColumn inside for structure.

export interface KAccordionColumnsProps {
  cols?: 1 | 2 | 3 | 4;
  gap?: number;
  children: React.ReactNode;
  className?: string;
}

export function KAccordionColumns({
  cols = 2,
  gap = 24,
  children,
  className,
}: KAccordionColumnsProps) {
  const gridClass =
    cols === 1 ? 'grid-cols-1'
    : cols === 2 ? 'grid-cols-2'
    : cols === 3 ? 'grid-cols-3'
    : 'grid-cols-4';

  return (
    <div className={cn('grid', gridClass, className)} style={{ gap }}>
      {children}
    </div>
  );
}

// ─── KAccordion ──────────────────────────────────────────────────────────────

export function KAccordion({
  items,
  type = 'single',
  defaultValue,
  value,
  onValueChange,
  collapsible = true,
  className,
  accordion,
  defaultActiveKey,
}: KAccordionProps) {
  const resolvedType = accordion ? 'single' : type;
  const resolvedDefaultValue = defaultActiveKey ?? defaultValue;

  return (
    <AccordionPrimitive.Root
      type={resolvedType as any}
      defaultValue={resolvedDefaultValue as any}
      value={value as any}
      onValueChange={onValueChange}
      collapsible={collapsible}
      className={cn('w-full flex flex-col gap-3 font-primary', className)}
    >
      {items.map((item) => (
        <AccordionPrimitive.Item
          key={item.key}
          value={item.key}
          disabled={item.disabled}
          className={cn(
            'rounded-xl overflow-hidden transition-all duration-200',
            item.disabled && 'opacity-50 pointer-events-none',
          )}
          style={{ border: '1px solid #CED4DA' }}
        >
          {/* ── Header ── */}
          <AccordionPrimitive.Header className="flex m-0">
            <AccordionPrimitive.Trigger
              className="group flex w-full items-center gap-4 px-6 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset transition-colors"
              style={{ backgroundColor: '#F4F4F4' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#EBEBEB')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#F4F4F4')}
            >
              <span className="flex-1 text-[#051758] font-semibold text-sm leading-snug">
                {item.label}
              </span>

              {item.extra && (
                <div
                  className="flex items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.extra}
                </div>
              )}

              {/* Navy outline chevron icon button */}
              <div className="flex shrink-0 items-center justify-center w-9 h-9 rounded-lg border border-[#051758] bg-white text-[#051758] transition-colors group-hover:bg-[#051758]/5">
                <ChevronDown
                  size={16}
                  className="transition-transform duration-300 group-data-[state=open]:rotate-180"
                />
              </div>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>

          {/* ── Content ── */}
          <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <div className="bg-white px-6 py-5 text-sm text-[#374151] leading-relaxed">
              {item.children}
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}

export default KAccordion;
