import React, { useState, useCallback } from 'react';
import { ChevronRight, Folder, FolderOpen, File } from 'lucide-react';
import { khorTokens } from '../../../../theme/khor-theme';
import { KCheckbox } from '../../atoms';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KTree — Vista de árbol (Wave 3)
   ═══════════════════════════════════════════════ */
export interface KTreeNode {
  key: string;
  title: string;
  children?: KTreeNode[];
  icon?: React.ReactNode;
  disabled?: boolean;
  isLeaf?: boolean;
}

export interface KTreeProps {
  data: KTreeNode[];
  defaultExpandedKeys?: string[];
  selectedKeys?: string[];
  onSelect?: (selectedKeys: string[], info: { node: KTreeNode; selected: boolean }) => void;
  checkedKeys?: string[];
  onCheck?: (checkedKeys: string[]) => void;
  checkable?: boolean;
  showLine?: boolean;
  showIcon?: boolean;
  defaultExpandAll?: boolean;
  disabled?: boolean;
  className?: string;
}

export function KTree({
  data, defaultExpandedKeys = [], selectedKeys = [], onSelect,
  checkedKeys = [], onCheck, checkable, showLine, showIcon = true,
  defaultExpandAll, disabled, className,
}: KTreeProps) {
  const getAllKeys = useCallback((nodes: KTreeNode[]): string[] => {
    return nodes.flatMap((n) => [n.key, ...(n.children ? getAllKeys(n.children) : [])]);
  }, []);

  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(defaultExpandAll ? getAllKeys(data) : defaultExpandedKeys)
  );

  const toggleExpand = (key: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  const handleSelect = (node: KTreeNode) => {
    if (node.disabled || disabled) return;
    const isSelected = selectedKeys.includes(node.key);
    const next = isSelected ? selectedKeys.filter((k) => k !== node.key) : [...selectedKeys, node.key];
    onSelect?.(next, { node, selected: !isSelected });
  };

  const handleCheck = (node: KTreeNode) => {
    if (node.disabled || disabled) return;
    const isChecked = checkedKeys.includes(node.key);
    const next = isChecked ? checkedKeys.filter((k) => k !== node.key) : [...checkedKeys, node.key];
    onCheck?.(next);
  };

  const renderNode = (node: KTreeNode, depth: number): React.ReactNode => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expanded.has(node.key);
    const isSelected = selectedKeys.includes(node.key);
    const isChecked = checkedKeys.includes(node.key);

    return (
      <div key={node.key}>
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '4px 8px', paddingLeft: depth * 20 + 8,
            borderRadius: t.radius.sm, cursor: node.disabled ? 'not-allowed' : 'pointer',
            backgroundColor: isSelected ? 'rgba(224,77,54,0.08)' : 'transparent',
            transition: 'background-color 0.1s ease',
            opacity: node.disabled ? 0.5 : 1,
          }}
          onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.backgroundColor = t.colors.neutral[100]; }}
          onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.backgroundColor = isSelected ? 'rgba(224,77,54,0.08)' : 'transparent'; }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); hasChildren && toggleExpand(node.key); }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 20, height: 20, border: 'none', background: 'none',
              cursor: hasChildren ? 'pointer' : 'default',
              color: t.colors.neutral[400], flexShrink: 0,
              transform: isExpanded ? 'rotate(90deg)' : 'none',
              transition: 'transform 0.15s ease',
            }}
          >
            {hasChildren && <ChevronRight size={14} />}
          </button>
          {checkable && (
            <KCheckbox checked={isChecked} onChange={() => handleCheck(node)} disabled={node.disabled} />
          )}
          {showIcon && (
            <span style={{ color: t.colors.neutral[400], display: 'flex', flexShrink: 0 }}>
              {node.icon || (hasChildren ? (isExpanded ? <FolderOpen size={16} /> : <Folder size={16} />) : <File size={14} />)}
            </span>
          )}
          <span
            onClick={() => handleSelect(node)}
            style={{
              fontSize: 14, fontFamily: font, flex: 1,
              color: isSelected ? t.colors.brand.primary : t.colors.neutral[900],
              fontWeight: isSelected ? 500 : 400,
            }}
          >
            {node.title}
          </span>
        </div>
        {hasChildren && isExpanded && (
          <div style={{ position: 'relative' }}>
            {showLine && (
              <div style={{
                position: 'absolute', left: depth * 20 + 18, top: 0, bottom: 8,
                width: 1, backgroundColor: t.colors.neutral[200],
              }} />
            )}
            {node.children!.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={className} style={{ fontFamily: font }}>
      {data.map((node) => renderNode(node, 0))}
    </div>
  );
}

export default KTree;
