import React, { useState, useMemo } from 'react';
import { ChevronRight, ChevronDown, Check, Search, X } from 'lucide-react';
import { KPopoverRoot, KPopoverTrigger, KPopoverContent } from '../KPopover';
import { cn } from '../../../../../imports/utils';

export interface KTreeNode {
  value: string | number;
  label?: string;
  title?: React.ReactNode; // Paridad AntD
  children?: KTreeNode[];
  disabled?: boolean;
}
export interface KTreeSelectProps {
  treeData: KTreeNode[];
  value?: string | number;
  onChange?: (value: string | number, label: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  showSearch?: boolean;
  treeDefaultExpandAll?: boolean;
}

/**
 * KTreeSelect — Selector jerárquico tipo árbol (Headless v4)
 * Implementación nativa con navegación recursiva y búsqueda dinámica.
 */
export function KTreeSelect({
  treeData,
  value,
  onChange,
  placeholder = 'Seleccionar...',
  disabled,
  className,
  style,
  showSearch = true,
  treeDefaultExpandAll = false,
}: KTreeSelectProps) {
  const [open, setOpen] = useState(false);
  
  // Función recursiva para obtener todas las llaves del árbol
  const getAllKeys = (nodes: KTreeNode[]): (string | number)[] => {
    let keys: (string | number)[] = [];
    nodes.forEach(node => {
      keys.push(node.value);
      if (node.children) {
        keys = [...keys, ...getAllKeys(node.children)];
      }
    });
    return keys;
  };

  const [expandedKeys, setExpandedKeys] = useState<(string | number)[]>(
    treeDefaultExpandAll ? getAllKeys(treeData) : []
  );
  const [searchQuery, setSearchQuery] = useState('');

  const toggleExpand = (e: React.MouseEvent, key: string | number) => {
    e.stopPropagation();
    setExpandedKeys(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const handleSelect = (node: KTreeNode) => {
    if (node.disabled) return;
    onChange?.(node.value, (node.label || node.title?.toString()) ?? '');
    setOpen(false);
  };

  const findLabel = (data: KTreeNode[], val?: string | number): string => {
    if (val === undefined) return '';
    for (const node of data) {
      if (node.value === val) return (node.label || node.title?.toString()) ?? '';
      if (node.children) {
        const found = findLabel(node.children, val);
        if (found) return found;
      }
    }
    return '';
  };

  const selectedLabel = useMemo(() => findLabel(treeData, value), [treeData, value]);

  const renderNode = (node: KTreeNode, level: number = 0) => {
    const isExpanded = expandedKeys.includes(node.value);
    const isSelected = value === node.value;
    const hasChildren = node.children && node.children.length > 0;
    
    // Filtro básico de búsqueda
    const matchesSearch = (node.label?.toLowerCase() || node.title?.toString()?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    const hasVisibleChildren = hasChildren && node.children?.some(child => 
      (child.label?.toLowerCase() || child.title?.toString()?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
      (child.children && child.children.length > 0)
    );

    if (searchQuery && !matchesSearch && !hasVisibleChildren) return null;

    return (
      <div key={node.value} className="flex flex-col">
        <div 
          onClick={() => handleSelect(node)}
          className={cn(
            "flex items-center gap-1 px-2 py-1.5 cursor-pointer rounded-md transition-colors group text-sm",
            isSelected ? "bg-khor-primary-light/20 text-khor-primary font-bold" : "text-khor-neutral-700 hover:bg-khor-neutral-50",
            node.disabled && "opacity-40 cursor-not-allowed grayscale"
          )}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
        >
          <div className="w-5 h-5 flex items-center justify-center shrink-0">
            {hasChildren && (
              <button 
                onClick={(e) => toggleExpand(e, node.value)}
                className="p-0.5 hover:bg-khor-neutral-200 rounded-sm transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5 text-khor-neutral-400" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-khor-neutral-400" />
                )}
              </button>
            )}
          </div>
          <span className="truncate flex-1">{node.label || node.title}</span>
          {isSelected && <Check className="w-3.5 h-3.5 text-khor-primary shrink-0" />}
        </div>
        
        {hasChildren && (isExpanded || searchQuery) && (
          <div className="flex flex-col">
            {node.children!.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <KPopoverRoot open={open} onOpenChange={disabled ? undefined : setOpen}>
      <KPopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "flex min-h-[40px] w-full items-center justify-between px-3 py-2 border rounded-md shadow-sm transition-all outline-none focus:ring-2 focus:ring-khor-primary-light font-primary bg-khor-surface-page text-left",
            disabled ? "opacity-50 cursor-not-allowed bg-khor-neutral-100" : "cursor-pointer hover:border-khor-primary",
            className
          )}
          style={style}
        >
          <span className={cn("truncate text-sm flex-1 font-semibold", !value ? "text-khor-neutral-400" : "text-khor-neutral-900")}>
            {selectedLabel || placeholder}
          </span>
          <div className="flex items-center gap-1 shrink-0 ml-2">
            {!disabled && value && (
              <X 
                className="w-3.5 h-3.5 text-khor-neutral-400 hover:text-khor-neutral-600 transition-colors" 
                onClick={(e) => { e.stopPropagation(); onChange?.('', ''); }} 
              />
            )}
            <ChevronDown className={cn("w-4 h-4 text-khor-neutral-400 transition-transform duration-300", open && "rotate-180")} />
          </div>
        </button>
      </KPopoverTrigger>

      <KPopoverContent align="start" className="w-full min-w-[240px] p-2 border rounded-lg shadow-xl bg-khor-surface-page z-[100] max-h-80 overflow-hidden font-primary flex flex-col">
        {showSearch && (
          <div className="relative mb-2 shrink-0">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-khor-neutral-400" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filtrar árbol..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-khor-neutral-50 border-none rounded-md outline-none focus:ring-1 focus:ring-khor-primary"
            />
          </div>
        )}
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          {treeData.map(node => renderNode(node))}
        </div>
      </KPopoverContent>
    </KPopoverRoot>
  );
}

export default KTreeSelect;
