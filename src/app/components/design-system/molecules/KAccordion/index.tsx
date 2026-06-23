import React from 'react';
import { Collapse as AntCollapse, type CollapseProps } from 'antd';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

/* ─── KAccordion — Migrado a Ant Design (antes @radix-ui/react-accordion) ───
   Implementado sobre AntD Collapse con el ícono al final (caja navy con
   chevron) y tarjetas redondeadas separadas, replicando el look Khor:
   header #F4F4F4 (hover #EBEBEB), borde #CED4DA, contenido blanco.
   KAccordionColumns / KAccordionColumn (layout puro) se conservan igual. */

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

// ─── KAccordionColumn (layout helper, unchanged) ──────────────────────────────
export interface KAccordionColumnProps {
  title?: React.ReactNode;
  gap?: number;
  children: React.ReactNode;
  className?: string;
}

export function KAccordionColumn({ title, gap = 12, children, className }: KAccordionColumnProps) {
  return (
    <div className={cn('flex flex-col', className)} style={{ gap }}>
      {title && <p className="m-0 text-sm font-semibold" style={{ color: '#051758' }}>{title}</p>}
      {children}
    </div>
  );
}

// ─── KAccordionColumns (layout helper, unchanged) ─────────────────────────────
export interface KAccordionColumnsProps {
  cols?: 1 | 2 | 3 | 4;
  gap?: number;
  children: React.ReactNode;
  className?: string;
}

export function KAccordionColumns({ cols = 2, gap = 24, children, className }: KAccordionColumnsProps) {
  const gridClass =
    cols === 1 ? 'grid-cols-1' : cols === 2 ? 'grid-cols-2' : cols === 3 ? 'grid-cols-3' : 'grid-cols-4';
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
  className,
  accordion,
  defaultActiveKey,
}: KAccordionProps) {
  const isAccordion = accordion ?? type === 'single';
  const resolvedDefault = defaultActiveKey ?? defaultValue;

  const antItems: CollapseProps['items'] = items.map((item) => ({
    key: item.key,
    label: <span className="flex-1 text-[#051758] font-semibold text-sm leading-snug">{item.label}</span>,
    children: <div className="text-sm text-[#374151] leading-relaxed">{item.children}</div>,
    extra: item.extra,
    collapsible: item.disabled ? 'disabled' : undefined,
  }));

  return (
    <AntCollapse
      accordion={isAccordion}
      defaultActiveKey={resolvedDefault as any}
      activeKey={value as any}
      onChange={(key) => onValueChange?.(key)}
      bordered={false}
      expandIconPosition="end"
      expandIcon={({ isActive }) => (
        <div className="flex shrink-0 items-center justify-center w-9 h-9 rounded-lg border border-[#051758] bg-white text-[#051758] transition-colors">
          <ChevronDown size={16} className={cn('transition-transform duration-300', isActive && 'rotate-180')} />
        </div>
      )}
      className={cn(
        'w-full font-primary !bg-transparent',
        // separated rounded cards
        '[&_.ant-collapse-item]:!mb-3 [&_.ant-collapse-item]:!border [&_.ant-collapse-item]:!border-[#CED4DA] [&_.ant-collapse-item]:!rounded-xl [&_.ant-collapse-item]:!overflow-hidden',
        // header (Khor grey, hover, padding, vertical-centered icon)
        '[&_.ant-collapse-header]:!items-center [&_.ant-collapse-header]:!bg-[#F4F4F4] [&_.ant-collapse-header]:!px-6 [&_.ant-collapse-header]:!py-4 [&_.ant-collapse-header:hover]:!bg-[#EBEBEB]',
        // content (white card body)
        '[&_.ant-collapse-content]:!bg-white [&_.ant-collapse-content]:!border-t-0 [&_.ant-collapse-content-box]:!px-6 [&_.ant-collapse-content-box]:!py-5',
        className,
      )}
      items={antItems}
    />
  );
}

export default KAccordion;
