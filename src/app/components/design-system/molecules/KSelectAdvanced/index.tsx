import React, { useState } from 'react';
import { Command } from 'cmdk';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { KPopoverRoot, KPopoverTrigger, KPopoverContent } from '../KPopover';

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
}

export function KSelectAdvanced({
  options,
  value,
  onChange,
  placeholder = 'Seleccionar...',
  mode = 'single',
  disabled,
  status,
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
    ? 'border-[var(--khor-feedback-error)] focus:ring-[var(--khor-feedback-error)]'
    : status === 'warning'
      ? 'border-[var(--khor-feedback-warning)] focus:ring-[var(--khor-feedback-warning)]'
      : 'border-[var(--khor-neutral-200)] focus:ring-[var(--khor-primary-light)] focus:border-[var(--khor-primary)] hover:border-[var(--khor-primary-light)]';

  return (
    <KPopoverRoot open={open} onOpenChange={disabled ? undefined : setOpen}>
      <KPopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={`relative min-h-[40px] flex w-full items-center justify-between px-3 py-1.5 border rounded-md shadow-sm transition-colors outline-none focus:ring-2 font-primary bg-[var(--khor-surface-page)] text-[var(--khor-neutral-900)] ${statusClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className || ''}`}
        >
          <div className="flex flex-wrap gap-1 w-full truncate text-sm">
            {selectedValues.length === 0 && (
              <span className="text-[var(--khor-neutral-400)] pt-0.5">{placeholder}</span>
            )}
            {selectedValues.map(val => {
              const opt = options.find(o => o.value === val);
              if (!opt) return null;
              return isMultiple ? (
                <span key={val} className="flex items-center gap-1 bg-[var(--khor-neutral-100)] border border-[var(--khor-neutral-200)] text-[var(--khor-neutral-700)] px-2 py-0.5 rounded-sm text-xs font-medium">
                  {opt.label}
                  <div 
                    onClick={(e) => handleRemove(val, e)} 
                    className="cursor-pointer hover:bg-[var(--khor-neutral-200)] rounded-full p-0.5 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </div>
                </span>
              ) : (
                <span key={val} className="pt-0.5 truncate">{opt.label}</span>
              );
            })}
          </div>
          <ChevronsUpDown className="w-4 h-4 text-[var(--khor-neutral-400)] shrink-0 opacity-50 ml-2" />
        </button>
      </KPopoverTrigger>
      <KPopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 z-[100] border rounded-lg shadow-lg bg-[var(--khor-surface-page)] font-primary">
        <Command>
          <Command.Input 
            placeholder="Buscar..." 
            value={search}
            onValueChange={setSearch}
            className="flex h-10 w-full rounded-md bg-transparent px-3 py-3 text-sm outline-none border-b disabled:cursor-not-allowed disabled:opacity-50 text-[var(--khor-neutral-900)] placeholder:text-[var(--khor-neutral-400)]"
          />
          <Command.List className="max-h-60 overflow-y-auto p-1">
            <Command.Empty className="py-6 text-center text-sm text-[var(--khor-neutral-500)]">
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
                    className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors aria-selected:bg-[var(--khor-neutral-100)] aria-selected:text-[var(--khor-neutral-900)] text-[var(--khor-neutral-700)] ${option.disabled ? 'opacity-50 pointer-events-none' : ''}`}
                  >
                    <Check
                      className={`mr-2 h-4 w-4 text-[var(--khor-primary)] transition-opacity ${
                        isSelected ? "opacity-100" : "opacity-0"
                      }`}
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
