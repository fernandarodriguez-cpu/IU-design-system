import React, { useState, useCallback, useMemo } from 'react';
import { ChevronRight, ChevronDown, Folder, FolderOpen, File, Check, Minus } from 'lucide-react';
import { cn } from '@/utils/cn';

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
  onCheck?: (keys: (string | number)[], info: { checked: boolean; node: KTreeNode }) => void;
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
 * Soporte para estados jerárquicos (Checked, Indeterminate) y navegación fluida.
 */
/**
 * @figma-mcp-migration
 * Component: KTree
 * 
 * INSTRUCCIONES PARA AGENTES DE IA (VS Code / MCP):
 * Para migrar este componente a Figma, NO generar una matriz multiplicando todas las variables.
 * Utilizar Figma Component Properties V2 con la siguiente estructura:
 * 
 * 1. Variants (Estructurales):
 *    - Definir variantes puramente visuales/estructurales.
 * 2. Booleans (Encendido/Apagado):
 *    - Definir encendido/apagado para iconos o estados (isLoading, hasIcon).
 * 3. Color Variables (No usar variantes para colores semánticos):
 *    - El relleno/borde debe usar Figma Variables (Khor v6.0 Colors) asignado dinámicamente.
 *    - El consumidor del UI Kit cambiará el color del layer.
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

  // ─── Helpers para estados jerárquicos ───
  const getCheckStatus = useCallback((node: KTreeNode): 'checked' | 'indeterminate' | 'unchecked' => {
    if (!checkable) return 'unchecked';
    
    if (checkedKeys.includes(node.key)) return 'checked';
    
    if (node.children?.length) {
      const statuses = node.children.map(child => getCheckStatus(child));
      if (statuses.every(s => s === 'checked')) return 'checked';
      if (statuses.some(s => s === 'checked' || s === 'indeterminate')) return 'indeterminate';
    }
    
    return 'unchecked';
  }, [checkedKeys, checkable]);

  const getAllChildKeys = (node: KTreeNode): (string | number)[] => {
    let keys = [node.key];
    if (node.children) {
      node.children.forEach(child => {
        keys = [...keys, ...getAllChildKeys(child)];
      });
    }
    return keys;
  };

  // ─── Handlers ───
  const handleExpand = (key: string | number) => {
    const newKeys = expandedKeys.includes(key) ? expandedKeys.filter(k => k !== key) : [...expandedKeys, key];
    if (!controlledExpandedKeys) setInternalExpandedKeys(newKeys);
    onExpand?.(newKeys);
  };

  const handleCheck = (node: KTreeNode) => {
    if (node.disabled || node.checkable === false) return;
    
    const status = getCheckStatus(node);
    const isChecked = status === 'checked';
    const childKeys = getAllChildKeys(node);
    
    let nextCheckedKeys: (string | number)[];
    if (isChecked) {
      // Uncheck this and all children
      nextCheckedKeys = checkedKeys.filter(k => !childKeys.includes(k));
    } else {
      // Check this and all children
      nextCheckedKeys = Array.from(new Set([...checkedKeys, ...childKeys]));
    }
    
    onCheck?.(nextCheckedKeys, { checked: !isChecked, node });
  };

  const renderNode = (node: KTreeNode, level: number = 0) => {
    const isExpanded = expandedKeys.includes(node.key);
    const isSelected = selectedKeys.includes(node.key);
    const checkStatus = getCheckStatus(node);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.key} className="flex flex-col">
        <div 
          className={cn(
            "flex items-center gap-2 py-1.5 px-3 rounded-xl transition-all cursor-pointer group select-none",
            isSelected ? "bg-khor-primary text-white font-bold shadow-md scale-[1.02]" : "hover:bg-khor-neutral-50 text-khor-neutral-700",
            node.disabled && "opacity-40 cursor-not-allowed"
          )}
          style={{ paddingLeft: `${level * 20 + 12}px` }}
          onClick={() => onSelect?.([node.key], { node })}
        >
          {/* Switcher */}
          <div className="w-5 h-5 flex items-center justify-center shrink-0">
            {hasChildren && (
              <button 
                onClick={(e) => { e.stopPropagation(); handleExpand(node.key); }}
                className={cn("p-1 rounded-md transition-colors", isSelected ? "hover:bg-white/20" : "hover:bg-khor-neutral-200")}
              >
                <ChevronRight className={cn("w-3.5 h-3.5 transition-transform duration-200", isExpanded && "rotate-90", isSelected ? "text-white" : "text-khor-neutral-400")} />
              </button>
            )}
          </div>

          {/* Checkbox */}
          {checkable && node.checkable !== false && (
             <div 
               onClick={(e) => { e.stopPropagation(); handleCheck(node); }}
               className={cn(
                 "w-4 h-4 rounded-md border flex items-center justify-center transition-all",
                 checkStatus === 'checked' ? "bg-khor-primary border-khor-primary" : 
                 checkStatus === 'indeterminate' ? "bg-khor-primary/20 border-khor-primary" : 
                 isSelected ? "border-white/50" : "border-khor-neutral-300 group-hover:border-khor-primary"
               )}
             >
               {checkStatus === 'checked' && <Check className="w-3 h-3 text-white stroke-[3px]" />}
               {checkStatus === 'indeterminate' && <Minus className="w-3 h-3 text-khor-primary stroke-[3px]" />}
             </div>
          )}

          {/* Icon */}
          {showIcon && (
            <div className={cn("shrink-0", isSelected ? "text-white/80" : "text-khor-neutral-400")}>
              {node.icon || (hasChildren ? (isExpanded ? <FolderOpen size={16} /> : <Folder size={16} />) : <File size={16} />)}
            </div>
          )}

          <span className="text-sm truncate flex-1">{node.title}</span>
        </div>

        {hasChildren && isExpanded && (
          <div className="flex flex-col relative">
            {showLine && (
              <div 
                className="absolute left-[21px] top-0 bottom-4 w-[1px] bg-khor-neutral-100" 
                style={{ left: `${level * 20 + 21}px` }}
              />
            )}
            {node.children!.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn("w-full font-primary py-2 space-y-1", className)} style={style}>
      {data.map(node => renderNode(node))}
    </div>
  );
}

export default KTree;
