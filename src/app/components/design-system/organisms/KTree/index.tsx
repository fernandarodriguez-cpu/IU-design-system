import React, { useState, useCallback, useMemo } from 'react';
import { ChevronRight, ChevronDown, Folder, FolderOpen, File, Check } from 'lucide-react';
import { cn } from '../../../../../imports/utils';

export interface KTreeNode {
  key: string | number;
  title: React.ReactNode;
  children?: KTreeNode[];
  disabled?: boolean;
  selectable?: boolean;
  checkable?: boolean;
  icon?: React.ReactNode;
}

export interface KTreeProps {
  data: KTreeNode[];
  checkable?: boolean;
  checkedKeys?: (string | number)[];
  onCheck?: (keys: (string | number)[]) => void;
  selectedKeys?: (string | number)[];
  onSelect?: (keys: (string | number)[], info: { node: KTreeNode }) => void;
  expandedKeys?: (string | number)[];
  onExpand?: (keys: (string | number)[]) => void;
  showLine?: boolean;
  showIcon?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * KTree — Visualizador jerárquico de datos (Headless v4)
 * Reemplaza AntD Tree con una implementación recursiva pura, animaciones suaves y soporte completo para estados.
 */
export function KTree({
  data,
  checkable = false,
  checkedKeys = [],
  onCheck,
  selectedKeys = [],
  onSelect,
  expandedKeys: controlledExpandedKeys,
  onExpand,
  showLine = false,
  showIcon = true,
  className,
  style,
}: KTreeProps) {
  const [internalExpandedKeys, setInternalExpandedKeys] = useState<(string | number)[]>([]);
  
  const expandedKeys = controlledExpandedKeys || internalExpandedKeys;

  const handleExpand = useCallback((key: string | number) => {
    const newKeys = expandedKeys.includes(key)
      ? expandedKeys.filter(k => k !== key)
      : [...expandedKeys, key];
    
    if (!controlledExpandedKeys) setInternalExpandedKeys(newKeys);
    onExpand?.(newKeys);
  }, [expandedKeys, controlledExpandedKeys, onExpand]);

  const handleSelect = useCallback((node: KTreeNode) => {
    if (node.disabled || node.selectable === false) return;
    onSelect?.([node.key], { node });
  }, [onSelect]);

  const handleCheck = useCallback((node: KTreeNode) => {
    if (node.disabled || node.checkable === false) return;
    const newChecked = checkedKeys.includes(node.key)
      ? checkedKeys.filter(k => k !== node.key)
      : [...checkedKeys, node.key];
    onCheck?.(newChecked);
  }, [checkedKeys, onCheck]);

  const renderNode = (node: KTreeNode, level: number = 0) => {
    const isExpanded = expandedKeys.includes(node.key);
    const isSelected = selectedKeys.includes(node.key);
    const isChecked = checkedKeys.includes(node.key);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.key} className="flex flex-col">
        <div 
          className={cn(
            "flex items-center gap-1.5 py-1 px-2 rounded-md transition-all cursor-pointer group select-none",
            isSelected ? "bg-khor-primary-light/10 text-khor-primary font-bold shadow-sm" : "hover:bg-khor-neutral-50 text-khor-neutral-700",
            node.disabled && "opacity-40 cursor-not-allowed"
          )}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => handleSelect(node)}
        >
          {/* Switcher */}
          <div className="w-5 h-5 flex items-center justify-center shrink-0">
            {hasChildren ? (
              <button 
                onClick={(e) => { e.stopPropagation(); handleExpand(node.key); }}
                className="p-0.5 hover:bg-khor-neutral-200 rounded transition-colors"
              >
                <ChevronRight 
                  className={cn("w-3.5 h-3.5 text-khor-neutral-400 transition-transform duration-200", isExpanded && "rotate-90")} 
                />
              </button>
            ) : showLine && level > 0 && (
              <div className="w-[1px] h-full bg-khor-neutral-200 absolute left-[14px]" />
            )}
          </div>

          {/* Checkbox (si aplica) */}
          {checkable && node.checkable !== false && (
            <div 
              onClick={(e) => { e.stopPropagation(); handleCheck(node); }}
              className={cn(
                "w-4 h-4 rounded border flex items-center justify-center transition-all",
                isChecked ? "bg-khor-primary border-khor-primary" : "border-khor-neutral-300 bg-white group-hover:border-khor-primary"
              )}
            >
              {isChecked && <Check className="w-3 h-3 text-white stroke-[3]" />}
            </div>
          )}

          {/* Icono */}
          {showIcon && (
            <div className="shrink-0 text-khor-neutral-400">
              {node.icon ? node.icon : hasChildren ? (
                isExpanded ? <FolderOpen className="w-4 h-4" /> : <Folder className="w-4 h-4" />
              ) : (
                <File className="w-4 h-4" />
              )}
            </div>
          )}

          {/* Título */}
          <span className="text-sm truncate flex-1 min-w-0">
            {node.title}
          </span>
        </div>

        {/* Hijos (con animación simple o condicional) */}
        {hasChildren && isExpanded && (
          <div className="flex flex-col relative">
            {showLine && (
              <div 
                className="absolute left-[17px] top-0 bottom-3 w-[1px] bg-khor-neutral-100" 
                style={{ left: `${level * 16 + 17}px` }}
              />
            )}
            {node.children!.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div 
      className={cn("w-full font-primary py-2 space-y-0.5", className)} 
      style={style}
    >
      {data.map(node => renderNode(node))}
    </div>
  );
}

export default KTree;
