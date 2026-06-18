import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';
import { KDropdownMenu } from '../KDropdownMenu';
import type { KDropdownMenuProps } from '../KDropdownMenu';

export interface KBreadcrumbItem {
  key?: string | number;
  title: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  menu?: KDropdownMenuProps['menu'];
}

export interface KBreadcrumbProps {
  items: KBreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/* Figma exact colors:
   inactive: #8f9096  fw=400
   current:  #0c1a66  fw=600
   separator "#8f9096" */
const INACTIVE = '#8f9096';
const CURRENT  = '#0c1a66';

export function KBreadcrumb({
  items,
  separator,
  className,
  style,
}: KBreadcrumbProps) {
  const sep = separator ?? (
    <span style={{ color: INACTIVE, fontSize: 14, fontWeight: 400, lineHeight: '22px', userSelect: 'none' }}>
      /
    </span>
  );

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center flex-wrap', className)}
      style={{ gap: 0, ...style }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const color = isLast ? CURRENT : INACTIVE;
        const fontWeight = isLast ? 600 : 400;

        const label = (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 14,
            fontWeight,
            color,
            lineHeight: '22px',
            cursor: isLast ? 'default' : (item.href || item.onClick ? 'pointer' : 'default'),
          }}>
            {item.icon && (
              <span style={{ display: 'inline-flex', alignItems: 'center', color }}>
                {item.icon}
              </span>
            )}
            {item.title && <span>{item.title}</span>}
            {item.menu && !isLast && (
              <ChevronDown size={10} color={color} strokeWidth={2} />
            )}
          </span>
        );

        let node: React.ReactNode;

        if (item.menu && !isLast) {
          node = (
            <KDropdownMenu menu={item.menu} placement="bottomLeft">
              <button
                type="button"
                className="outline-none focus:ring-2 focus:ring-offset-1 rounded"
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              >
                {label}
              </button>
            </KDropdownMenu>
          );
        } else if (item.href && !isLast) {
          node = (
            <a
              href={item.href}
              className="focus:outline-none focus:ring-2 focus:ring-offset-1 rounded"
              style={{ textDecoration: 'none' }}
              onClick={(e) => { if (item.onClick) { e.preventDefault(); item.onClick(); } }}
            >
              {label}
            </a>
          );
        } else if (item.onClick && !isLast) {
          node = (
            <button
              type="button"
              onClick={item.onClick}
              className="focus:outline-none focus:ring-2 focus:ring-offset-1 rounded"
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              {label}
            </button>
          );
        } else {
          node = <span aria-current={isLast ? 'page' : undefined}>{label}</span>;
        }

        return (
          <React.Fragment key={item.key ?? index}>
            {node}
            {!isLast && (
              <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0 8px' }}>
                {sep}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

export default KBreadcrumb;
