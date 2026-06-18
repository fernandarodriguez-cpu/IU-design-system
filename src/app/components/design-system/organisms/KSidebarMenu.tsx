import { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, LucideIcon } from 'lucide-react';

export interface KSidebarMenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  children?: Omit<KSidebarMenuItem, 'children'>[];
}

export interface KSidebarMenuProps {
  items: KSidebarMenuItem[];
  activeId?: string;
  onNavigate?: (id: string) => void;
  /** Called when collapsed state changes */
  onCollapseChange?: (collapsed: boolean) => void;
  /** Control from outside (optional) */
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  className?: string;
}

// Exact values from Figma node 187703-17498 / 187703-17194
const COLOR_INACTIVE    = 'rgba(179,180,187,1)';
const COLOR_ACTIVE      = '#ffffff';
const COLOR_OCULTAR     = 'rgba(236,238,247,1)';  // Ocultar label in expanded state
const BG_HOVER          = 'rgba(47,71,143,1)';
const BG_PRESSED        = 'rgba(3,14,56,1)';
const BG_ACTIVE_OVERLAY = 'rgba(255,255,255,0.08)';
const STROKE_FOCUS      = 'rgba(159,174,221,1)';
const COLOR_INDICATOR   = 'rgba(224,77,54,1)';

const WIDTH_EXPANDED  = 200;
const WIDTH_COLLAPSED = 56; // 16px pad + 24px icon + 16px pad

function NavItem({
  item,
  activeId,
  onNavigate,
  isChild = false,
  collapsed = false,
}: {
  item: KSidebarMenuItem;
  activeId?: string;
  onNavigate?: (id: string) => void;
  isChild?: boolean;
  collapsed?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [focused, setFocused] = useState(false);

  const Icon = item.icon;
  const isActive = activeId === item.id;
  const isChildActive = !!item.children?.some((c) => c.id === activeId);
  const hasChildren = !!item.children?.length && !collapsed;

  const handleClick = () => {
    if (hasChildren) setOpen((p) => !p);
    else onNavigate?.(item.id);
  };

  // Auto-open parent when a child becomes active
  const [prevActiveId, setPrevActiveId] = useState(activeId);
  if (activeId !== prevActiveId) {
    setPrevActiveId(activeId);
    if (isChildActive && !open) setOpen(true);
  }

  const isHighlighted = isActive || isChildActive;
  const buttonBg   = pressed ? BG_PRESSED : hovered ? BG_HOVER : isHighlighted ? BG_ACTIVE_OVERLAY : 'transparent';
  const iconColor  = isHighlighted || hovered || pressed ? COLOR_ACTIVE : COLOR_INACTIVE;
  const textColor  = isHighlighted || hovered || pressed ? COLOR_ACTIVE : COLOR_INACTIVE;
  const fontWeight = isHighlighted ? 600 : 400;
  const contentPadLeft = collapsed ? 16 : isChild ? 32 : 16;

  return (
    <>
      <button
        title={collapsed ? item.label : undefined}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setPressed(false); }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'stretch',
          width: '100%',
          height: 50,
          padding: 0,
          border: 'none',
          outline: focused ? `1.5px solid ${STROKE_FOCUS}` : 'none',
          outlineOffset: '-1.5px',
          background: buttonBg,
          cursor: 'pointer',
          transition: 'background 0.15s ease',
          overflow: 'hidden',
        }}
      >
        {/* Content area — 196px in active expanded, 52px in active collapsed */}
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            gap: 16,
            paddingLeft: contentPadLeft,
            paddingRight: 16,
            backgroundColor: 'transparent',
            overflow: 'hidden',
          }}
        >
          {/* Icon — 24×24 container */}
          <span style={{
            flexShrink: 0,
            width: 24,
            height: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: iconColor,
            transition: 'color 0.15s',
          }}>
            <Icon size={14} strokeWidth={1.5} />
          </span>

          {/* Label — hidden in collapsed */}
          {!collapsed && (
            <span style={{
              flex: 1,
              textAlign: 'left',
              fontSize: 14,
              fontWeight,
              color: textColor,
              fontFamily: 'var(--font-primary)',
              lineHeight: 1.25,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              transition: 'color 0.15s',
            }}>
              {item.label}
            </span>
          )}

          {/* Children count badge */}
          {hasChildren && (
            <span style={{
              fontSize: 10,
              fontWeight: 700,
              color: 'var(--khor-text-on-dark-disabled)',
              backgroundColor: 'rgba(255,255,255,0.05)',
              padding: '1px 6px',
              borderRadius: 4,
              flexShrink: 0,
            }}>
              {item.children!.length}
            </span>
          )}

          {/* Chevron for expandable */}
          {hasChildren && (
            <ChevronDown
              size={14}
              strokeWidth={1.5}
              style={{
                flexShrink: 0,
                color: iconColor,
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease, color 0.15s',
              }}
            />
          )}
        </span>

        {/* Active indicator — 4px right-edge sibling */}
        {isHighlighted && (
          <span style={{
            width: 4,
            flexShrink: 0,
            backgroundColor: COLOR_INDICATOR,
            borderRadius: 0,
          }} />
        )}
      </button>

      {/* Sub-items — hidden when collapsed */}
      {hasChildren && open && (
        <div>
          {item.children!.map((child) => (
            <NavItem
              key={child.id}
              item={child}
              activeId={activeId}
              onNavigate={onNavigate}
              collapsed={collapsed}
              isChild
            />
          ))}
        </div>
      )}
    </>
  );
}

export function KSidebarMenu({
  items,
  activeId,
  onNavigate,
  onCollapseChange,
  collapsed: controlledCollapsed,
  defaultCollapsed = false,
  className = '',
}: KSidebarMenuProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

  const [btnHovered, setBtnHovered] = useState(false);

  const toggleCollapse = () => {
    const next = !isCollapsed;
    setInternalCollapsed(next);
    onCollapseChange?.(next);
  };

  return (
    <aside
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--khor-navy)',
        width: isCollapsed ? WIDTH_COLLAPSED : WIDTH_EXPANDED,
        minWidth: isCollapsed ? WIDTH_COLLAPSED : WIDTH_EXPANDED,
        height: '100%',
        flexShrink: 0,
        transition: 'width 0.2s ease, min-width 0.2s ease',
        overflow: 'hidden',
      }}
      className={className}
    >
      {/* Nav items */}
      <nav style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        overflowX: 'hidden',
        paddingTop: 8,
        paddingBottom: 8,
      }}>
        {items.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            activeId={activeId}
            onNavigate={onNavigate}
            collapsed={isCollapsed}
          />
        ))}
      </nav>

      {/* Ocultar / Expand button */}
      <button
        onClick={toggleCollapse}
        title={isCollapsed ? 'Expandir' : 'Ocultar'}
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          paddingLeft: 16,
          paddingRight: 16,
          height: 50,
          border: 'none',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          background: btnHovered ? BG_HOVER : 'transparent',
          color: btnHovered ? COLOR_ACTIVE : isCollapsed ? COLOR_INACTIVE : COLOR_OCULTAR,
          cursor: 'pointer',
          fontFamily: 'var(--font-primary)',
          fontSize: 14,
          fontWeight: isCollapsed ? 400 : 600,
          whiteSpace: 'nowrap',
          transition: 'background 0.15s ease, color 0.15s ease',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        {/* Collapsed → chevron-right (expand); Expanded → chevron-left (collapse) */}
        {isCollapsed
          ? <ChevronRight size={14} strokeWidth={1.5} style={{ flexShrink: 0 }} />
          : <ChevronLeft  size={14} strokeWidth={1.5} style={{ flexShrink: 0 }} />
        }
        {!isCollapsed && <span>Ocultar</span>}
      </button>
    </aside>
  );
}

export default KSidebarMenu;
