import React, { useState } from 'react';
import { Command } from 'cmdk';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { KPopoverRoot, KPopoverTrigger, KPopoverContent } from '../KPopover';
import { cn } from '../../../../../imports/utils';

/* ═══════════════════════════════════════════════
   KSelectAdvanced — Combo Box/Tags (Headless v4)
   Reemplaza a Select de AntD (mode=multiple/tags)
   Usando: Radix Popover + cmdk
   ═══════════════════════════════════════════════ */

export interface KSelectAdvancedOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface KSelectAdvancedProps {
  options: KSelectAdvancedOption[];
  value?: string | string[]; // string (single), string[] (multiple)
  onChange?: (value: any) => void;
  placeholder?: string;
  mode?: 'single' | 'multiple' | 'tags';
  disabled?: boolean;
  status?: 'error' | 'warning';
  className?: string;
  allowClear?: boolean;
  /** Fuerza el estado hover (útil para previews/playgrounds) */
  isHovered?: boolean;
  /** Fuerza el estado de foco (útil para previews/playgrounds) */
  isFocused?: boolean;
}

export function KSelectAdvanced({
  options,
  value,
  onChange,
  placeholder = 'Seleccionar...',
  mode = 'single',
  disabled,
  status,
  isHovered,
  isFocused,
  className
}: KSelectAdvancedProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const isMultiple = mode === 'multiple';
  const selectedValues = Array.isArray(value) ? value : (value ? [value] : []);

  const handleSelect = (currentValue: string) => {
    // Command.Item envuelve los values en minúscula automáticamente a veces,
    // Pero buscamos contra nuestro dict.
    const option = options.find(o => o.value.toLowerCase() === currentValue.toLowerCase() || o.label.toLowerCase() === currentValue.toLowerCase());
    if (!option) return;

    if (isMultiple) {
      const isSelected = selectedValues.includes(option.value);
      const newValues = isSelected
        ? selectedValues.filter(v => v !== option.value)
        : [...selectedValues, option.value];
      onChange?.(newValues);
    } else {
      onChange?.(option.value);
      setOpen(false);
    }
  };

  const handleRemove = (valToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMultiple) {
      onChange?.(selectedValues.filter(v => v !== valToRemove));
    } else {
      onChange?.('');
    }
  };

  const statusClasses = status === 'error'
    ? 'border-khor-border-error focus:ring-khor-border-error/20'
    : status === 'warning'
      ? 'border-khor-warning focus:ring-khor-warning/20'
      : 'border-khor-slate-200 focus:ring-[var(--khor-focus-ring-color)]/20 focus:border-khor-primary hover:border-khor-primary hover:bg-khor-surface-hover';

  const forcedClasses = cn(
    isHovered && "border-khor-primary bg-khor-surface-hover",
    isFocused && "ring-[var(--khor-focus-ring-width)] ring-[var(--khor-focus-ring-color)] ring-offset-[var(--khor-focus-ring-offset)] border-khor-primary"
  );

  return (
    <KPopoverRoot open={open} onOpenChange={disabled ? undefined : setOpen}>
      <KPopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "relative flex w-full items-center justify-between px-3 py-1.5 border rounded-md shadow-khor-sm transition-all duration-200 outline-none focus:ring-2 font-primary bg-white text-khor-neutral-900",
            "min-h-[var(--khor-density-height-input)]", // Density sizing
            statusClasses,
            forcedClasses,
            disabled ? 'opacity-50 cursor-not-allowed bg-khor-neutral-100' : 'cursor-pointer',
            className
          )}
        >
          <div className="flex flex-wrap gap-1 w-full truncate text-sm">
            {selectedValues.length === 0 && (
              <span className="text-khor-neutral-400 pt-0.5">{placeholder}</span>
            )}
            {selectedValues.map(val => {
              const opt = options.find(o => o.value === val);
              if (!opt) return null;
              return isMultiple ? (
                <span key={val} className="flex items-center gap-1.5 bg-khor-slate-100 border border-khor-slate-200 text-khor-neutral-700 px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all">
                  {opt.label}
                  <div 
                    onClick={(e) => handleRemove(val, e)} 
                    className="cursor-pointer hover:bg-khor-slate-200 rounded-full p-0.5 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </div>
                </span>
              ) : (
                <span key={val} className="pt-0.5 truncate">{opt.label}</span>
              );
            })}
          </div>
          <ChevronsUpDown className="w-4 h-4 text-khor-neutral-400 shrink-0 opacity-50 ml-2" />
        </button>
      </KPopoverTrigger>
      <KPopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 z-[100] border border-khor-border-default rounded-xl shadow-khor-lg bg-white font-primary overflow-hidden">
        <Command className="bg-white">
          <Command.Input 
            placeholder="Buscar..." 
            value={search}
            onValueChange={setSearch}
            className="flex h-10 w-full rounded-md bg-transparent px-3 py-3 text-sm outline-none border-b border-khor-border-muted disabled:cursor-not-allowed disabled:opacity-50 text-khor-neutral-900 placeholder:text-khor-neutral-400"
          />
          <Command.List className="max-h-60 overflow-y-auto p-1 bg-white">
            <Command.Empty className="py-6 text-center text-sm text-khor-neutral-500">
              No se encontraron resultados.
            </Command.Empty>
            <Command.Group>
              {options.map((option) => {
                const isSelected = selectedValues.includes(option.value);
                return (
                  <Command.Item
                    key={option.value}
                    value={option.label}
                    disabled={option.disabled}
                    onSelect={() => handleSelect(option.value)}
                    className={cn(
                      "relative flex cursor-pointer select-none items-center rounded-lg px-2 py-2 text-sm outline-none transition-all m-1",
                      "aria-selected:bg-khor-surface-hover aria-selected:text-khor-primary",
                      isSelected ? "bg-khor-surface-selected text-khor-primary" : "text-khor-neutral-700",
                      option.disabled ? "opacity-50 pointer-events-none" : ""
                    )}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 text-khor-primary transition-opacity",
                        isSelected ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </Command.Item>
                );
              })}
            </Command.Group>
          </Command.List>
        </Command>
      </KPopoverContent>
    </KPopoverRoot>
  );
}

export default KSelectAdvanced;
