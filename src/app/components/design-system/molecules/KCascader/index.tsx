import React, { useState, useEffect } from 'react';
import { ChevronRight, Check, X } from 'lucide-react';
import { KPopoverRoot, KPopoverTrigger, KPopoverContent } from '../KPopover';
import { cn } from '@/utils/cn';

export interface KCascaderOption {
  value: string | number;
  label: string;
  children?: KCascaderOption[];
  disabled?: boolean;
}

export interface KCascaderProps {
  options: KCascaderOption[];
  value?: (string | number)[];
  onChange?: (value: (string | number)[], selectedOptions: KCascaderOption[]) => void;
  placeholder?: string;
  disabled?: boolean;
  changeOnSelect?: boolean;
  showSearch?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * KCascader — Selector jerárquico multinivel (Headless v4)
 * Implementación pura con Khor Engine Popover y Tailwind.
 */
/**
 * @figma-mcp-migration
 * Component: KCascader
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
export function KCascader({ 
  options, 
  value = [], 
  onChange, 
  placeholder = 'Seleccionar...', 
  disabled, 
  changeOnSelect = false,
  showSearch = false,
  className, 
  style 
}: KCascaderProps) {
  const [open, setOpen] = useState(false);
  const [activePath, setActivePath] = useState<(string | number)[]>(value);
  const [tempPath, setTempPath] = useState<(string | number)[]>(value);
  const [searchQuery, setSearchQuery] = useState('');

  // Sincronizar valor externo
  useEffect(() => {
    setActivePath(value);
    if (value.length > 0) setTempPath(value);
  }, [value]);

  const getOptionsAtLevel = (level: number) => {
    if (level === 0) return options;
    let current = options;
    for (let i = 0; i < level; i++) {
      const selected = current.find(opt => opt.value === tempPath[i]);
      if (selected?.children) {
        current = selected.children;
      } else {
        return [];
      }
    }
    return current;
  };

  const handleSelect = (option: KCascaderOption, level: number) => {
    if (option.disabled) return;
    
    const newPath = [...tempPath.slice(0, level), option.value];
    setTempPath(newPath);

    const isLeaf = !option.children || option.children.length === 0;

    if (isLeaf || changeOnSelect) {
      // Confirmar selección
      setActivePath(newPath);
      
      const selectedOptions: KCascaderOption[] = [];
      let currentLevel = options;
      newPath.forEach(val => {
        const opt = currentLevel.find(o => o.value === val);
        if (opt) {
          selectedOptions.push(opt);
          if (opt.children) currentLevel = opt.children;
        }
      });

      onChange?.(newPath, selectedOptions);
      
      // Solo cerrar si es una hoja de verdad
      if (isLeaf) setOpen(false);
    }
  };

  /**
   * Genera dinámicamente el número de columnas a mostrar basándose en el tempPath actual.
   * Esto soluciona el bug de niveles hardcoded [0,1,2,3].
   */
  const renderPanels = () => {
    const panels = [];
    let currentOptions = options;
    
    // Nivel 0 siempre
    panels.push({ level: 0, items: currentOptions });

    // Niveles siguientes basados en el tempPath
    for (let i = 0; i < tempPath.length; i++) {
      const selectedValue = tempPath[i];
      const selectedOption = currentOptions?.find(opt => opt.value === selectedValue);
      
      if (selectedOption?.children && selectedOption.children.length > 0) {
        currentOptions = selectedOption.children;
        panels.push({ level: i + 1, items: currentOptions });
      } else {
        break;
      }
    }

    return panels.map(({ level, items }) => (
      <div 
        key={level} 
        className={cn(
          "w-48 overflow-y-auto py-1 max-h-80 scrollbar-thin scrollbar-thumb-khor-neutral-200",
          level > 0 && "border-l border-khor-neutral-100 bg-khor-neutral-50/30"
        )}
      >
        {items.map(opt => {
          const isActive = tempPath[level] === opt.value;
          const isSelected = activePath[level] === opt.value;
          const isFinal = !opt.children || opt.children.length === 0;

          return (
            <div
              key={opt.value}
              onClick={() => handleSelect(opt, level)}
              onMouseEnter={() => {
                // Pre-activar ruta sin confirmar
                if (!opt.disabled) setTempPath([...tempPath.slice(0, level), opt.value]);
              }}
              className={cn(
                "flex items-center justify-between px-3 py-2 text-sm cursor-pointer transition-colors group",
                isActive ? "bg-khor-primary-light/10 text-khor-primary" : "text-khor-neutral-700 hover:bg-khor-neutral-100",
                opt.disabled && "opacity-40 cursor-not-allowed grayscale"
              )}
            >
              <span className={cn("truncate", isSelected && isFinal && "font-bold text-khor-primary")}>
                {opt.label}
              </span>
              <div className="flex items-center shrink-0">
                {isSelected && isFinal && <Check className="w-3.5 h-3.5 text-khor-primary" />}
                {!isFinal && <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100" />}
              </div>
            </div>
          );
        })}
      </div>
    ));
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePath([]);
    setTempPath([]);
    onChange?.([], []);
  };

  const getLabel = () => {
    if (activePath.length === 0) return placeholder;
    const labels: string[] = [];
    let current = options;
    activePath.forEach(val => {
      const opt = current.find(o => o.value === val);
      if (opt) {
        labels.push(opt.label);
        if (opt.children) current = opt.children;
      }
    });
    return labels.join(' / ');
  };

  /**
   * Genera una lista plana de todas las rutas posibles para la búsqueda
   */
  const getSearchPaths = () => {
    const paths: { label: string; value: (string | number)[]; options: KCascaderOption[] }[] = [];
    
    const walk = (opts: KCascaderOption[], currentLabel: string[] = [], currentValue: (string | number)[] = [], currentOpts: KCascaderOption[] = []) => {
      opts.forEach(opt => {
        const newLabel = [...currentLabel, opt.label];
        const newValue = [...currentValue, opt.value];
        const newOpts = [...currentOpts, opt];
        
        if (!opt.children || opt.children.length === 0 || changeOnSelect) {
          paths.push({
            label: newLabel.join(' / '),
            value: newValue,
            options: newOpts
          });
        }
        
        if (opt.children) {
          walk(opt.children, newLabel, newValue, newOpts);
        }
      });
    };
    
    walk(options);
    return paths.filter(p => p.label.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  return (
    <KPopoverRoot open={open} onOpenChange={(val) => {
      if (disabled) return;
      setOpen(val);
      if (!val) setSearchQuery(''); // Limpiar búsqueda al cerrar
    }}>
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
          <span className={cn("truncate text-sm flex-1", activePath.length === 0 ? "text-khor-neutral-400" : "text-khor-neutral-900")}>
            {getLabel()}
          </span>
          <div className="flex items-center gap-1 shrink-0 ml-2">
            {!disabled && activePath.length > 0 && (
              <X 
                className="w-3.5 h-3.5 text-khor-neutral-400 hover:text-khor-neutral-600 transition-colors" 
                onClick={clearSelection} 
              />
            )}
            <ChevronRight className={cn("w-4 h-4 text-khor-neutral-400 transition-transform duration-300", open && "rotate-90")} />
          </div>
        </button>
      </KPopoverTrigger>

      <KPopoverContent align="start" className="p-0 flex flex-col border rounded-lg shadow-xl bg-khor-surface-page z-[100] max-h-80 overflow-hidden font-primary animate-in fade-in zoom-in-95 duration-200">
        {showSearch && (
          <div className="p-2 border-b border-khor-neutral-100 bg-khor-neutral-50/50">
            <input
              type="text"
              autoFocus
              placeholder="Buscar ruta..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-khor-surface-page border border-khor-neutral-200 rounded-md outline-none focus:ring-1 focus:ring-khor-primary"
            />
          </div>
        )}
        
        <div className="flex bg-khor-surface-page overflow-x-auto custom-scrollbar">
          {searchQuery ? (
            <div className="w-full min-w-[300px] py-1">
              {getSearchPaths().length === 0 ? (
                <div className="px-4 py-8 text-center text-khor-neutral-400 text-sm italic">
                  No se encontraron resultados
                </div>
              ) : (
                getSearchPaths().map((path, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setActivePath(path.value);
                      setTempPath(path.value);
                      onChange?.(path.value, path.options);
                      setOpen(false);
                    }}
                    className="px-4 py-2 text-sm hover:bg-khor-primary-light/10 hover:text-khor-primary cursor-pointer transition-colors border-b border-khor-neutral-50 last:border-0"
                  >
                    {path.label}
                  </div>
                ))
              )}
            </div>
          ) : (
            renderPanels()
          )}
        </div>
      </KPopoverContent>
    </KPopoverRoot>
  );
}

export default KCascader;
