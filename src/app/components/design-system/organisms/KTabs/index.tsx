import React from 'react';
import { Tabs as AntTabs, type TabsProps as AntTabsProps } from 'antd';
import { cn } from '@/utils/cn';

/* ═══════════════════════════════════════════════
   KTabs — Migrado a Ant Design (antes @radix-ui/react-tabs)
   Soporta API por `items` y la compuesta (List/Trigger/Content);
   ambas se normalizan a AntD Tabs `items`. El look Khor por tipo
   (pill / line / card) se reproduce con overrides [&_.ant-tabs-*].
   ═══════════════════════════════════════════════ */

export interface KTabItem {
  key: string;
  label: React.ReactNode;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface KTabsProps {
  items?: KTabItem[];
  type?: 'pill' | 'line' | 'card';
  centered?: boolean;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  tabBarExtraContent?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children?: React.ReactNode;
}

// ─── Compound markers (introspected by KTabs; render nothing directly) ────────
export const KTabsList: React.FC<{ children?: React.ReactNode; className?: string }> = () => null;
export const KTabsTrigger: React.FC<{ value: string; children?: React.ReactNode; disabled?: boolean; className?: string }> = () => null;
export const KTabsContent: React.FC<{ value: string; children?: React.ReactNode; className?: string }> = () => null;

// Collect AntD items from the compound children
function itemsFromCompound(children: React.ReactNode): AntTabsProps['items'] {
  const triggers: { key: string; label: React.ReactNode; disabled?: boolean }[] = [];
  const contents: Record<string, React.ReactNode> = {};

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    if (child.type === KTabsList) {
      React.Children.forEach((child.props as any).children, (t) => {
        if (React.isValidElement(t) && t.type === KTabsTrigger) {
          const p = t.props as any;
          triggers.push({ key: p.value, label: p.children, disabled: p.disabled });
        }
      });
    } else if (child.type === KTabsContent) {
      const p = child.props as any;
      contents[p.value] = p.children;
    }
  });

  return triggers.map((t) => ({ key: t.key, label: t.label, children: contents[t.key], disabled: t.disabled }));
}

// ─── Per-type Khor styling over AntD Tabs ─────────────────────────────────────
const TYPE_CLASS: Record<string, string> = {
  // grey pill container with white active pill (no ink bar)
  pill: cn(
    '[&_.ant-tabs-nav]:!mb-4 [&_.ant-tabs-nav::before]:!border-0 [&_.ant-tabs-ink-bar]:!hidden',
    '[&_.ant-tabs-nav-list]:!bg-[#dbdbdb] [&_.ant-tabs-nav-list]:!border [&_.ant-tabs-nav-list]:!border-[#b5b5b5] [&_.ant-tabs-nav-list]:!p-1.5 [&_.ant-tabs-nav-list]:!rounded-md',
    '[&_.ant-tabs-tab]:!m-0 [&_.ant-tabs-tab]:!px-4 [&_.ant-tabs-tab]:!py-1 [&_.ant-tabs-tab]:!rounded-lg [&_.ant-tabs-tab_.ant-tabs-tab-btn]:!text-[#8f9096] [&_.ant-tabs-tab_.ant-tabs-tab-btn]:!font-semibold',
    '[&_.ant-tabs-tab-active]:!bg-white [&_.ant-tabs-tab-active]:!shadow-[0_1px_4px_rgba(0,0,0,0.12)] [&_.ant-tabs-tab-active_.ant-tabs-tab-btn]:!text-[#0c1a66]',
  ),
  // bottom ink bar in navy
  line: cn(
    '[&_.ant-tabs-nav::before]:!border-b-2 [&_.ant-tabs-nav::before]:!border-[#ced4da]',
    '[&_.ant-tabs-tab_.ant-tabs-tab-btn]:!text-[#8f9096] [&_.ant-tabs-tab-active_.ant-tabs-tab-btn]:!text-[#051758] [&_.ant-tabs-tab-active_.ant-tabs-tab-btn]:!font-semibold',
    '[&_.ant-tabs-ink-bar]:!bg-[#051758] [&_.ant-tabs-ink-bar]:!h-[2px]',
  ),
  card: '[&_.ant-tabs-tab-active_.ant-tabs-tab-btn]:!text-khor-primary',
};

const SIZE_MAP: Record<string, 'small' | 'middle' | 'large'> = { sm: 'small', md: 'middle', lg: 'large' };

export const KTabs = React.forwardRef<HTMLDivElement, KTabsProps>(function KTabs(
  { items, type = 'pill', centered = false, size = 'md', label, tabBarExtraContent, value, defaultValue, onValueChange, className, children },
  ref,
) {
  const antItems: AntTabsProps['items'] = items
    ? items.map((item) => ({
        key: item.key,
        label: (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            {item.icon}
            {item.label}
          </span>
        ),
        children: item.children,
        disabled: item.disabled,
      }))
    : itemsFromCompound(children);

  return (
    <div ref={ref} className={cn('w-full font-primary', className)}>
      {label && (
        <span style={{ display: 'block', fontSize: 14, fontWeight: 400, color: '#5f6064', marginBottom: 4 }}>
          {label} :
        </span>
      )}
      <AntTabs
        activeKey={value}
        defaultActiveKey={defaultValue}
        onChange={(key) => onValueChange?.(key)}
        items={antItems}
        type={type === 'card' ? 'card' : 'line'}
        centered={centered}
        size={SIZE_MAP[size]}
        tabBarExtraContent={tabBarExtraContent}
        className={TYPE_CLASS[type]}
      />
    </div>
  );
});

KTabs.displayName = 'KTabs';
export default KTabs;
