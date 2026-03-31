import React, { useState, useEffect } from 'react';
import { ChevronRight, Check, X } from 'lucide-react';
import { KPopover, KPopoverTrigger, KPopoverContent } from '../KPopover';
import { cn } from '../../../../../imports/utils';

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
  className?: string;
  style?: React.CSSProperties;
}

/**
 * KCascader — Selector jerárquico multinivel (Headless v4)
 * Implementación pura con Radix Popover y Tailwind.
 */
export function KCascader({ 
  options, 
  value = [], 
  onChange, 
  placeholder = 'Seleccionar...', 
  disabled, 
  className, 
  style 
}: KCascaderProps) {
  const [open, setOpen] = useState(false);
  const [activePath, setActivePath] = useState<(string | number)[]>(value);
  const [tempPath, setTempPath] = useState<(string | number)[]>(value);

  // Sincronizar valor externo
  useEffect(() => {
    setActivePath(value);
    setTempPath(value);
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

    if (!option.children || option.children.length === 0) {
      // Es una hoja, confirmar selección
      setActivePath(newPath);
      
      // Construir array de objetos seleccionados para el callback
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
      setOpen(false);
    }
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

  return (
    <KPopover open={open} onOpenChange={disabled ? undefined : setOpen}>
      <KPopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "flex min-h-[40px] w-full items-center justify-between px-3 py-2 border rounded-md shadow-sm transition-all outline-none focus:ring-2 focus:ring-[var(--khor-primary-light)] font-primary bg-[var(--khor-surface-page)] text-left",
            disabled ? "opacity-50 cursor-not-allowed bg-[var(--khor-neutral-100)]" : "cursor-pointer hover:border-[var(--khor-primary)]",
            className
          )}
          style={style}
        >
          <span className={cn("truncate text-sm flex-1", activePath.length === 0 ? "text-[var(--khor-neutral-400)]" : "text-[var(--khor-neutral-900)]")}>
            {getLabel()}
          </span>
          <div className="flex items-center gap-1 shrink-0 ml-2">
            {!disabled && activePath.length > 0 && (
              <X 
                className="w-3.5 h-3.5 text-[var(--khor-neutral-400)] hover:text-[var(--khor-neutral-600)] transition-colors" 
                onClick={clearSelection} 
              />
            )}
            <ChevronRight className={cn("w-4 h-4 text-[var(--khor-neutral-400)] transition-transform duration-300", open && "rotate-90")} />
          </div>
        </button>
      </KPopoverTrigger>

      <KPopoverContent align="start" className="p-0 flex border rounded-lg shadow-xl bg-[var(--khor-surface-page)] z-[100] max-h-80 overflow-hidden font-primary">
        {[0, 1, 2, 3].map(level => {
          const levelOptions = getOptionsAtLevel(level);
          if (levelOptions.length === 0) return null;

          return (
            <div 
              key={level} 
              className={cn(
                "w-48 overflow-y-auto py-1 max-h-80",
                level > 0 && "border-l border-[var(--khor-neutral-100)] bg-[var(--khor-neutral-50)/30]"
              )}
            >
              {levelOptions.map(opt => {
                const isActive = tempPath[level] === opt.value;
                const isSelected = activePath[level] === opt.value;
                const isFinal = !opt.children || opt.children.length === 0;

                return (
                  <div
                    key={opt.value}
                    onClick={() => handleSelect(opt, level)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2 text-sm cursor-pointer transition-colors group",
                      isActive ? "bg-[var(--khor-primary-light)]/10 text-[var(--khor-primary)]" : "text-[var(--khor-neutral-700)] hover:bg-[var(--khor-neutral-50)]",
                      opt.disabled && "opacity-40 cursor-not-allowed grayscale"
                    )}
                  >
                    <span className={cn("truncate font-medium", isSelected && !opt.children && "font-bold")}>
                      {opt.label}
                    </span>
                    <div className="flex items-center shrink-0">
                      {isSelected && isFinal && <Check className="w-3.5 h-3.5 text-[var(--khor-primary)]" />}
                      {!isFinal && <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100" />}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </KPopoverContent>
    </KPopover>
  );
}

export default KCascader;
