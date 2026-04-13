import React, { useState, useEffect } from 'react';
import { KPopoverRoot, KPopoverTrigger, KPopoverContent } from '../KPopover';
import { khorStaticTokens } from '../../../../theme/khor-theme';
import { cn } from '../../../../../imports/utils';

export interface KColorPickerProps {
  value?: string;
  defaultValue?: string;
  onChange?: (color: string) => void;
  showText?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
}

const presets = [
  khorStaticTokens.colors.primary,
  khorStaticTokens.colors.navy,
  khorStaticTokens.colors.accent,
  khorStaticTokens.colors.success,
  khorStaticTokens.colors.error,
  khorStaticTokens.colors.warning,
  khorStaticTokens.colors.info,
  '#000000',
  '#666666',
  '#999999',
  '#CCCCCC',
  '#FFFFFF',
];

const sizeClasses = {
  sm: "h-8 px-2 text-xs",
  md: "h-10 px-3 text-sm",
  lg: "h-12 px-4 text-base",
};

/**
 * KColorPicker — Selector de color minimalista (Headless v4)
 * Reemplaza AntD ColorPicker con un Popover nativo, presets de Khor e input HEX.
 */
export function KColorPicker({
  value,
  defaultValue,
  onChange,
  showText = true,
  disabled,
  size = 'md',
  className,
  style,
}: KColorPickerProps) {
  const [internalColor, setInternalColor] = useState(value || defaultValue || khorStaticTokens.colors.primary);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (value !== undefined) {
      setInternalColor(value);
    }
  }, [value]);

  const handleColorChange = (newColor: string) => {
    if (disabled) return;
    setInternalColor(newColor);
    onChange?.(newColor);
  };

  const activeColor = value !== undefined ? value : internalColor;

  return (
    <KPopoverRoot open={open} onOpenChange={disabled ? undefined : setOpen}>
      <KPopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "flex items-center gap-2 border border-khor-neutral-200 rounded-md bg-khor-surface-page transition-all hover:border-khor-primary font-primary select-none",
            disabled && "opacity-50 cursor-not-allowed",
            sizeClasses[size],
            className
          )}
          style={style}
        >
          <div 
            className="w-5 h-5 rounded shadow-inner border border-black/5 shrink-0" 
            style={{ backgroundColor: activeColor }}
          />
          {showText && (
            <span className="font-semibold text-khor-neutral-700 uppercase">
              {activeColor}
            </span>
          )}
        </button>
      </KPopoverTrigger>
      
      <KPopoverContent align="start" className="w-56 p-3 z-[100] bg-khor-surface-page border rounded-xl shadow-xl">
        <div className="flex flex-col gap-4">
          {/* Grid de Presets */}
          <div className="grid grid-cols-6 gap-2">
            {presets.map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                className={cn(
                  "w-6 h-6 rounded-md border border-black/5 transition-transform hover:scale-110 active:scale-95 shadow-sm",
                  activeColor === color && "ring-2 ring-khor-primary ring-offset-1"
                )}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          {/* Input HEX Manual */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-khor-neutral-400 uppercase tracking-wider">
              Color Personalizado (Hex)
            </span>
            <div className="flex gap-2">
              <input 
                type="color"
                value={activeColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-8 h-8 rounded border-0 p-0 bg-transparent cursor-pointer"
              />
              <input
                type="text"
                value={activeColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="flex-1 px-2 py-1 text-xs font-mono border rounded border-khor-neutral-200 outline-none focus:border-khor-primary uppercase"
              />
            </div>
          </div>
        </div>
      </KPopoverContent>
    </KPopoverRoot>
  );
}

export default KColorPicker;
