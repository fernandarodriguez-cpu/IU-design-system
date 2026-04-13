import React, { useState, useMemo } from 'react';
import { ChevronRight, ChevronLeft, Search } from 'lucide-react';
import { cn } from '../../../../../imports/utils';
import { KButton } from '../../atoms/KButton';
import { KCheckbox } from '../../atoms/KCheckbox';

export interface KTransferItem {
  key: string;
  title: string;
  description?: string;
  disabled?: boolean;
}

export interface KTransferProps {
  dataSource: KTransferItem[];
  targetKeys?: string[];
  onChange?: (targetKeys: string[], direction: 'left' | 'right', moveKeys: string[]) => void;
  onSelectChange?: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void;
  titles?: [React.ReactNode, React.ReactNode];
  showSearch?: boolean;
  oneWay?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * KTransfer — Transferencia entre listas duales (Headless v4)
 * Implementación nativa con lógica de selección múltiple, búsqueda y transferencia.
 */
export function KTransfer({
  dataSource,
  targetKeys = [],
  onChange,
  onSelectChange,
  titles = ['Origen', 'Destino'],
  showSearch = true,
  oneWay = false,
  disabled,
  className,
  style,
}: KTransferProps) {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [searchLeft, setSearchLeft] = useState('');
  const [searchRight, setSearchRight] = useState('');

  // Separar items en izquierda y derecha
  const leftDataSource = useMemo(() => dataSource.filter(item => !targetKeys.includes(item.key)), [dataSource, targetKeys]);
  const rightDataSource = useMemo(() => dataSource.filter(item => targetKeys.includes(item.key)), [dataSource, targetKeys]);

  // Filtrado por búsqueda
  const filteredLeft = leftDataSource.filter(item => 
    item.title.toLowerCase().includes(searchLeft.toLowerCase()) || 
    item.description?.toLowerCase().includes(searchLeft.toLowerCase())
  );
  const filteredRight = rightDataSource.filter(item => 
    item.title.toLowerCase().includes(searchRight.toLowerCase()) || 
    item.description?.toLowerCase().includes(searchRight.toLowerCase())
  );

  const toggleSelect = (key: string) => {
    const newSelected = selectedKeys.includes(key) 
      ? selectedKeys.filter(k => k !== key) 
      : [...selectedKeys, key];
    
    setSelectedKeys(newSelected);
    
    // Notificar cambio de selección
    const sourceSelected = newSelected.filter(k => leftDataSource.some(i => i.key === k));
    const targetSelected = newSelected.filter(k => rightDataSource.some(i => i.key === k));
    onSelectChange?.(sourceSelected, targetSelected);
  };

  const moveRight = () => {
    const moveKeys = selectedKeys.filter(key => leftDataSource.some(item => item.key === key));
    if (moveKeys.length === 0) return;
    const newTargetKeys = [...targetKeys, ...moveKeys];
    onChange?.(newTargetKeys, 'right', moveKeys);
    setSelectedKeys(prev => prev.filter(k => !moveKeys.includes(k)));
  };

  const moveAllRight = () => {
    const moveKeys = leftDataSource.filter(item => !item.disabled).map(item => item.key);
    if (moveKeys.length === 0) return;
    const newTargetKeys = [...targetKeys, ...moveKeys];
    onChange?.(newTargetKeys, 'right', moveKeys);
    setSelectedKeys(prev => prev.filter(k => !moveKeys.includes(k)));
  };

  const moveLeft = () => {
    const moveKeys = selectedKeys.filter(key => rightDataSource.some(item => item.key === key));
    if (moveKeys.length === 0) return;
    const newTargetKeys = targetKeys.filter(key => !moveKeys.includes(key));
    onChange?.(newTargetKeys, 'left', moveKeys);
    setSelectedKeys(prev => prev.filter(k => !moveKeys.includes(k)));
  };

  const moveAllLeft = () => {
    const moveKeys = rightDataSource.filter(item => !item.disabled).map(item => item.key);
    if (moveKeys.length === 0) return;
    const newTargetKeys = []; // O filtrar los que existían originalmente si fuera necesario, pero AntD suele limpiar todo el destino
    onChange?.([], 'left', moveKeys);
    setSelectedKeys(prev => prev.filter(k => !moveKeys.includes(k)));
  };

  const renderList = (
    title: React.ReactNode, 
    items: KTransferItem[], 
    search: string, 
    setSearch: (v: string) => void
  ) => (
    <div className="flex flex-col flex-1 border border-khor-neutral-200 rounded-lg bg-khor-surface-page overflow-hidden shadow-sm">
      <div className="bg-khor-neutral-50 px-4 py-2 border-b border-khor-neutral-200 flex justify-between items-center">
        <span className="text-xs font-bold text-khor-neutral-600 uppercase tracking-wider">
          {title} ({items.length})
        </span>
      </div>
      
      {showSearch && (
        <div className="p-2 border-b border-khor-neutral-100 active-within:border-khor-primary transition-colors relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-khor-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar..."
            className="w-full pl-8 pr-3 py-1.5 text-sm bg-transparent outline-none font-primary"
          />
        </div>
      )}

      <div className="flex-1 overflow-y-auto max-h-72 min-h-64">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-khor-neutral-400 text-xs italic p-8">
            No hay elementos
          </div>
        ) : (
          <div className="divide-y divide-khor-neutral-100">
            {items.map(item => (
              <div 
                key={item.key}
                onClick={() => !disabled && !item.disabled && toggleSelect(item.key)}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors hover:bg-khor-neutral-50",
                  selectedKeys.includes(item.key) && "bg-khor-primary-light/10 text-khor-primary",
                  (disabled || item.disabled) && "opacity-40 cursor-not-allowed"
                )}
              >
                <KCheckbox 
                  checked={selectedKeys.includes(item.key)} 
                  disabled={disabled || item.disabled}
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold truncate leading-tight">{item.title}</span>
                  {item.description && <span className="text-[10px] opacity-60 truncate">{item.description}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={cn("flex items-center gap-4 w-full font-primary", className)} style={style}>
      {renderList(titles[0], filteredLeft, searchLeft, setSearchLeft)}
      
      <div className="flex flex-col gap-2 bg-khor-neutral-50 p-2 rounded-lg border border-khor-neutral-200 shadow-inner">
        <KButton
          size="sm"
          variant="outline"
          disabled={disabled || !selectedKeys.some(k => leftDataSource.some(i => i.key === k))}
          onClick={moveRight}
          className="px-2 bg-khor-surface-page"
        >
          <ChevronRight className="w-4 h-4" />
        </KButton>
        {!oneWay && (
          <KButton
            size="sm"
            variant="outline"
            disabled={disabled || !selectedKeys.some(k => rightDataSource.some(i => i.key === k))}
            onClick={moveLeft}
            className="px-2 bg-khor-surface-page"
          >
            <ChevronLeft className="w-4 h-4" />
          </KButton>
        )}
        <div className="h-[1px] bg-khor-neutral-200 my-1" />
        <KButton
          size="sm"
          variant="ghost"
          disabled={disabled || leftDataSource.length === 0}
          onClick={moveAllRight}
          className="px-2 text-[10px] uppercase font-bold"
        >
          <div className="flex -space-x-2">
            <ChevronRight className="w-3.5 h-3.5" />
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </KButton>
        {!oneWay && (
          <KButton
            size="sm"
            variant="ghost"
            disabled={disabled || rightDataSource.length === 0}
            onClick={moveAllLeft}
            className="px-2 text-[10px] uppercase font-bold"
          >
            <div className="flex -space-x-2">
              <ChevronLeft className="w-3.5 h-3.5" />
              <ChevronLeft className="w-3.5 h-3.5" />
            </div>
          </KButton>
        )}
      </div>

      {renderList(titles[1], filteredRight, searchRight, setSearchRight)}
    </div>
  );
}

export default KTransfer;
