import React, { useState, useMemo } from 'react';
import { Command } from 'cmdk';
import { Search, Loader2, X, Check } from 'lucide-react';
import { cn } from '../../../../../imports/utils';

export interface KAutocompleteOption {
  value: string;
  label: string;
  description?: string;
}

export interface KAutocompleteProps {
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (option: KAutocompleteOption) => void;
  options: KAutocompleteOption[];
  loading?: boolean;
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * KAutocomplete — Input con sugerencias dinámicas (Headless v4)
 * Basado en cmdk para una experiencia de búsqueda ultra rápida y accesible.
 * Reemplaza AntD AutoComplete con una estética premium y 100% agnóstica.
 */
export function KAutocomplete({
  value = '',
  onChange,
  onSelect,
  options,
  loading,
  placeholder = 'Buscar...',
  disabled,
  allowClear,
  className,
  style,
}: KAutocompleteProps) {
  const [open, setOpen] = useState(false);

  const filteredOptions = useMemo(() => {
    if (!value) return options;
    return options.filter(opt => 
      opt.label.toLowerCase().includes(value.toLowerCase()) || 
      opt.description?.toLowerCase().includes(value.toLowerCase())
    );
  }, [value, options]);

  return (
    <div className={cn("relative w-full font-primary", className)} style={style}>
      <Command className="relative overflow-visible">
        <div className={cn(
          "flex items-center gap-3 px-4 h-11 bg-[var(--khor-neutral-50)] border border-[var(--khor-neutral-200)] rounded-xl focus-within:ring-2 focus-within:ring-[var(--khor-primary-light)]/20 focus-within:border-[var(--khor-primary)] transition-all",
          disabled && "opacity-50 cursor-not-allowed"
        )}>
          <Search className="w-4 h-4 text-[var(--khor-neutral-400)] shrink-0" />
          <Command.Input
            value={value}
            onValueChange={(val) => {
              onChange?.(val);
              setOpen(val.length > 0);
            }}
            onFocus={() => value.length > 0 && setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 200)}
            disabled={disabled}
            placeholder={placeholder}
            className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-[var(--khor-neutral-900)] placeholder:text-[var(--khor-neutral-400)] placeholder:font-medium h-full"
          />
          {loading ? (
            <Loader2 className="w-4 h-4 text-[var(--khor-primary)] animate-spin" />
          ) : allowClear && value && (
            <button 
              onClick={() => { onChange?.(''); setOpen(false); }}
              className="text-[var(--khor-neutral-400)] hover:text-[var(--khor-neutral-900)] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {open && filteredOptions.length > 0 && (
          <Command.List className="absolute top-full left-0 right-0 mt-2 z-[1000] p-2 bg-white border border-[var(--khor-neutral-200)] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] animate-in fade-in zoom-in-95 duration-200 max-h-64 overflow-y-auto overflow-x-hidden">
            <Command.Empty className="px-4 py-3 text-xs text-[var(--khor-neutral-400)] font-bold uppercase tracking-widest text-center">
              No se encontraron resultados
            </Command.Empty>
            
            {filteredOptions.map((opt) => (
              <Command.Item
                key={opt.value}
                value={opt.value}
                onSelect={() => {
                  onSelect?.(opt);
                  onChange?.(opt.value);
                  setOpen(false);
                }}
                className="flex flex-col gap-0.5 px-3 py-2.5 rounded-xl cursor-default select-none aria-selected:bg-[var(--khor-neutral-50)] aria-selected:text-[var(--khor-primary)] transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold tracking-tight">{opt.label}</span>
                  {value === opt.value && <Check className="w-3.5 h-3.5 text-[var(--khor-primary)]" />}
                </div>
                {opt.description && (
                  <span className="text-[11px] font-medium text-[var(--khor-neutral-400)] opacity-80">
                    {opt.description}
                  </span>
                )}
              </Command.Item>
            ))}
          </Command.List>
        )}
      </Command>
    </div>
  );
}

export default KAutocomplete;
