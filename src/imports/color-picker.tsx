"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cva, type VariantProps } from "class-variance-authority";
import { Check, X, Pipette, Shuffle, Heart, Trash2 } from "lucide-react";
import { cn } from "./utils";
import { useTokens } from "./useTokens";
import { Input } from "./input";
import { Button } from "./button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Slider } from "./slider";
import { Label } from "./label";
import { toast } from "../CustomToast";
import { copyToClipboard } from '../../utils/clipboard';

// ==================== TYPES ====================

type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'hsb';

interface ColorPreset {
  label: string;
  colors: string[];
}

interface ColorPickerProps extends VariantProps<typeof colorPickerTriggerVariants> {
  value?: string;
  defaultValue?: string;
  format?: ColorFormat;
  onChange?: (color: string, format?: ColorFormat) => void;
  onChangeComplete?: (color: string) => void;
  onClear?: () => void;
  disabled?: boolean;
  allowClear?: boolean;
  disabledAlpha?: boolean;
  presets?: ColorPreset[];
  showText?: boolean;
  trigger?: 'hover' | 'click';
  className?: string;
  popupClassName?: string;
  
  // ⭐ NEW ADVANCED FEATURES from AdvancedColorPicker
  showFavorites?: boolean;        // Show favorites section (default: false)
  showShades?: boolean;           // Show generated shades (default: false)
  showPresets?: boolean;          // Show preset palettes (default: true)
  enableKeyboardShortcuts?: boolean; // Enable ⌘C, ⌘R, ⌘F shortcuts (default: false)
  enableRandomColor?: boolean;    // Show random color button (default: false)
}

// ==================== VARIANTS ====================

const colorPickerTriggerVariants = cva(
  "inline-flex items-center justify-center gap-2 border rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      size: {
        small: "h-6 px-2 text-xs",
        middle: "h-8 px-3 text-sm",
        large: "h-10 px-4 text-base"
      },
      showText: {
        true: "min-w-[120px]",
        false: "w-fit"
      }
    },
    defaultVariants: {
      size: "middle",
      showText: false
    }
  }
);

// ==================== COLOR UTILITIES ====================

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
}

function hexToHsl(hex: string): { h: number; s: number; l: number } | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  
  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c;
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c;
  } else if (h >= 300 && h < 360) {
    r = c; g = 0; b = x;
  }
  
  return rgbToHex(
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255)
  );
}

function hexToHsb(hex: string): { h: number; s: number; b: number } | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;
  
  if (max !== min) {
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    b: Math.round(v * 100)
  };
}

function isValidHex(hex: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(hex);
}

// ⭐ NEW: Generate shades from base color
function generateShades(baseColor: string): Array<{ name: number; color: string }> {
  const base = hexToHsl(baseColor);
  if (!base) return [];

  const shades = [];
  for (let i = 9; i >= 0; i--) {
    const lightness = 95 - (i * 9);
    shades.push({
      name: (i + 1) * 100,
      color: hslToHex(base.h, base.s, lightness)
    });
  }
  return shades;
}

// ==================== DEFAULT PRESETS ====================

const defaultPresets: ColorPreset[] = [
  {
    label: 'Hiumanlab',
    colors: ['#7428F5', '#7F4AE5', '#221959', '#10B981', '#F59E0B', '#EF4444']
  },
  {
    label: 'Recomendados',
    colors: [
      '#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1', '#13c2c2',
      '#eb2f96', '#fa8c16', '#a0d911', '#2f54eb'
    ]
  }
];

// ⭐ NEW: Extended preset palettes from AdvancedColorPicker
const extendedPresets: ColorPreset[] = [
  {
    label: 'Purple',
    colors: ['#E9D5FF', '#C084FC', '#9333EA', '#6B21A8', '#4C1D95']
  },
  {
    label: 'Blue',
    colors: ['#DBEAFE', '#60A5FA', '#2563EB', '#1E40AF', '#1E3A8A']
  },
  {
    label: 'Green',
    colors: ['#D1FAE5', '#34D399', '#059669', '#047857', '#065F46']
  },
  {
    label: 'Red',
    colors: ['#FEE2E2', '#F87171', '#DC2626', '#B91C1C', '#991B1B']
  },
  {
    label: 'Orange',
    colors: ['#FED7AA', '#FB923C', '#EA580C', '#C2410C', '#9A3412']
  }
];

// ==================== MAIN COMPONENT ====================

const ColorPicker = React.forwardRef<HTMLButtonElement, ColorPickerProps>(
  ({ 
    value,
    defaultValue = '#000000',
    format: formatProp = 'hex',
    onChange,
    onChangeComplete,
    onClear,
    disabled = false,
    allowClear = false,
    disabledAlpha = true,
    presets = defaultPresets,
    showText = false,
    trigger = 'click',
    size = 'middle',
    className,
    popupClassName,
    
    // ⭐ NEW ADVANCED FEATURES
    showFavorites = false,
    showShades = false,
    showPresets = true,
    enableKeyboardShortcuts = false,
    enableRandomColor = false,
    
    ...props 
  }, ref) => {
    const { tokens } = useTokens();
    const [internalColor, setInternalColor] = React.useState(value || defaultValue);
    const [format, setFormat] = React.useState<ColorFormat>(formatProp);
    const [alpha, setAlpha] = React.useState(100);
    const [isOpen, setIsOpen] = React.useState(false);
    const [hasEyeDropper, setHasEyeDropper] = React.useState(false);
    
    // ⭐ NEW: Favorites state with localStorage
    const [favorites, setFavorites] = React.useState<string[]>([]);
    
    const currentColor = value !== undefined ? value : internalColor;

    // Check for EyeDropper API support
    React.useEffect(() => {
      setHasEyeDropper('EyeDropper' in window);
    }, []);
    
    // ⭐ NEW: Load favorites from localStorage
    React.useEffect(() => {
      if (!showFavorites) return;
      
      const stored = localStorage.getItem('hiumanlab-color-favorites');
      if (stored) {
        try {
          setFavorites(JSON.parse(stored));
        } catch (e) {
          console.error('Error loading favorites:', e);
        }
      }
    }, [showFavorites]);
    
    // ⭐ NEW: Save favorites to localStorage
    const saveFavorites = React.useCallback((newFavorites: string[]) => {
      setFavorites(newFavorites);
      localStorage.setItem('hiumanlab-color-favorites', JSON.stringify(newFavorites));
    }, []);

    const handleColorChange = React.useCallback((newColor: string) => {
      if (!isValidHex(newColor)) return;
      
      setInternalColor(newColor);
      onChange?.(newColor, format);
    }, [format, onChange]);

    const handleChangeComplete = React.useCallback(() => {
      onChangeComplete?.(currentColor);
    }, [currentColor, onChangeComplete]);

    const handleClear = React.useCallback(() => {
      setInternalColor('#000000');
      onChange?.('#000000', format);
      onClear?.();
    }, [format, onChange, onClear]);

    const handleEyeDropper = React.useCallback(async () => {
      if (!('EyeDropper' in window)) return;
      
      try {
        // @ts-ignore - EyeDropper is not in TS types yet
        const eyeDropper = new window.EyeDropper();
        const result = await eyeDropper.open();
        if (result?.sRGBHex) {
          handleColorChange(result.sRGBHex);
          toast.success('Color capturado', result.sRGBHex);
        }
      } catch (error) {
        // User cancelled or error occurred
        console.error('EyeDropper error:', error);
      }
    }, [handleColorChange]);
    
    // ⭐ NEW: Random color generator
    const handleRandomColor = React.useCallback(() => {
      const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
      handleColorChange(randomColor);
    }, [handleColorChange]);
    
    // ⭐ NEW: Add to favorites
    const handleAddFavorite = React.useCallback(() => {
      if (!favorites.includes(currentColor)) {
        const newFavorites = [...favorites, currentColor];
        saveFavorites(newFavorites);
        toast.success('Color añadido a favoritos');
      } else {
        toast.info('Ya está en favoritos');
      }
    }, [currentColor, favorites, saveFavorites]);
    
    // ⭐ NEW: Remove from favorites
    const handleRemoveFavorite = React.useCallback((colorToRemove: string) => {
      const newFavorites = favorites.filter(f => f !== colorToRemove);
      saveFavorites(newFavorites);
      toast.success('Color eliminado de favoritos');
    }, [favorites, saveFavorites]);
    
    // ⭐ NEW: Clear all favorites
    const handleClearFavorites = React.useCallback(() => {
      saveFavorites([]);
      toast.success('Favoritos limpiados');
    }, [saveFavorites]);
    
    // ⭐ NEW: Keyboard shortcuts
    React.useEffect(() => {
      if (!enableKeyboardShortcuts || !isOpen) return;
      
      const handleKeyDown = (e: KeyboardEvent) => {
        // Ctrl/Cmd + C to copy
        if ((e.ctrlKey || e.metaKey) && e.key === 'c' && !e.shiftKey) {
          if (!(e.target instanceof HTMLInputElement)) {
            e.preventDefault();
            copyToClipboard(currentColor);
            toast.copied(`Color ${currentColor}`);
          }
        }
        
        // Ctrl/Cmd + R for random color
        if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
          e.preventDefault();
          handleRandomColor();
        }
        
        // Ctrl/Cmd + F to add to favorites
        if ((e.ctrlKey || e.metaKey) && e.key === 'f' && !e.shiftKey && showFavorites) {
          e.preventDefault();
          handleAddFavorite();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [enableKeyboardShortcuts, isOpen, currentColor, handleRandomColor, handleAddFavorite, showFavorites]);

    const formatColorValue = React.useCallback((color: string, fmt: ColorFormat): string => {
      if (!isValidHex(color)) return color;
      
      switch (fmt) {
        case 'hex':
          return color.toUpperCase();
        case 'rgb': {
          const rgb = hexToRgb(color);
          return rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : color;
        }
        case 'hsl': {
          const hsl = hexToHsl(color);
          return hsl ? `hsl(${hsl.h}°, ${hsl.s}%, ${hsl.l}%)` : color;
        }
        case 'hsb': {
          const hsb = hexToHsb(color);
          return hsb ? `hsb(${hsb.h}°, ${hsb.s}%, ${hsb.b}%)` : color;
        }
        default:
          return color;
      }
    }, []);

    // HSL controls for color manipulation
    const hsl = React.useMemo(() => hexToHsl(currentColor) || { h: 0, s: 0, l: 0 }, [currentColor]);
    
    // ⭐ NEW: Generate shades for current color
    const shades = React.useMemo(() => showShades ? generateShades(currentColor) : [], [showShades, currentColor]);

    const handleHueChange = React.useCallback((value: number[]) => {
      const newColor = hslToHex(value[0], hsl.s, hsl.l);
      handleColorChange(newColor);
    }, [hsl, handleColorChange]);

    const handleSaturationChange = React.useCallback((value: number[]) => {
      const newColor = hslToHex(hsl.h, value[0], hsl.l);
      handleColorChange(newColor);
    }, [hsl, handleColorChange]);

    const handleLightnessChange = React.useCallback((value: number[]) => {
      const newColor = hslToHex(hsl.h, hsl.s, value[0]);
      handleColorChange(newColor);
    }, [hsl, handleColorChange]);
    
    // Combine default presets with extended presets if showPresets is true
    const allPresets = showPresets ? [...presets, ...extendedPresets] : presets;

    return (
      <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
        <PopoverPrimitive.Trigger asChild>
          <button
            ref={ref}
            data-slot="color-picker-trigger"
            disabled={disabled}
            className={cn(
              colorPickerTriggerVariants({ size, showText }),
              "bg-background hover:bg-accent/50",
              className
            )}
            style={{
              borderRadius: tokens.geometry.md,
            }}
            {...props}
          >
            <div 
              className="size-5 rounded border border-border"
              style={{ 
                backgroundColor: currentColor,
                borderRadius: tokens.geometry.sm,
              }}
            />
            {showText && (
              <span className="flex-1 text-left truncate">
                {formatColorValue(currentColor, format)}
              </span>
            )}
            {allowClear && currentColor !== '#000000' && (
              <X 
                className="size-3 opacity-50 hover:opacity-100" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
              />
            )}
          </button>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            data-slot="color-picker-content"
            align="start"
            sideOffset={4}
            className={cn(
              "z-50 w-[280px] bg-popover text-popover-foreground shadow-lg outline-none",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
              "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
              "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
              popupClassName
            )}
            style={{
              borderRadius: tokens.geometry.lg,
              border: `1px solid hsl(var(--border))`,
            }}
          >
            <div className="p-4 space-y-4">
              {/* Color Preview & Controls */}
              <div className="flex gap-2">
                <div 
                  className="size-10 rounded border-2 border-border flex-shrink-0 cursor-pointer"
                  style={{ backgroundColor: currentColor }}
                  onClick={() => {
                    copyToClipboard(currentColor);
                    toast.copied(`Color ${currentColor}`);
                  }}
                />
                <div className="flex-1 space-y-2">
                  <Input
                    value={formatColorValue(currentColor, format)}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Only accept hex input for now
                      if (format === 'hex' && value.startsWith('#')) {
                        handleColorChange(value);
                      }
                    }}
                    className="h-8 font-mono text-xs"
                  />
                </div>
                <div className="flex gap-1">
                  {hasEyeDropper && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleEyeDropper}
                      className="size-8 p-0"
                      title="Capturar color de pantalla"
                    >
                      <Pipette className="size-4" />
                    </Button>
                  )}
                  {/* ⭐ NEW: Random color button */}
                  {enableRandomColor && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleRandomColor}
                      className="size-8 p-0"
                      title="Color aleatorio"
                    >
                      <Shuffle className="size-4" />
                    </Button>
                  )}
                  {/* ⭐ NEW: Add to favorites button */}
                  {showFavorites && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleAddFavorite}
                      className={cn(
                        "size-8 p-0",
                        favorites.includes(currentColor) && "text-red-500"
                      )}
                      title="Añadir a favoritos"
                    >
                      <Heart 
                        className={cn(
                          "size-4",
                          favorites.includes(currentColor) && "fill-current"
                        )} 
                      />
                    </Button>
                  )}
                </div>
              </div>

              {/* Format Tabs */}
              <Tabs value={format} onValueChange={(v) => setFormat(v as ColorFormat)}>
                <TabsList className="grid w-full grid-cols-4 h-8">
                  <TabsTrigger value="hex" className="text-xs">HEX</TabsTrigger>
                  <TabsTrigger value="rgb" className="text-xs">RGB</TabsTrigger>
                  <TabsTrigger value="hsl" className="text-xs">HSL</TabsTrigger>
                  <TabsTrigger value="hsb" className="text-xs">HSB</TabsTrigger>
                </TabsList>
              </Tabs>

              {/* HSL Sliders */}
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-xs">Tono (H)</Label>
                    <span className="text-xs text-muted-foreground">{hsl.h}°</span>
                  </div>
                  <Slider
                    value={[hsl.h]}
                    onValueChange={handleHueChange}
                    min={0}
                    max={360}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-xs">Saturación (S)</Label>
                    <span className="text-xs text-muted-foreground">{hsl.s}%</span>
                  </div>
                  <Slider
                    value={[hsl.s]}
                    onValueChange={handleSaturationChange}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-xs">Luminosidad (L)</Label>
                    <span className="text-xs text-muted-foreground">{hsl.l}%</span>
                  </div>
                  <Slider
                    value={[hsl.l]}
                    onValueChange={handleLightnessChange}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                {!disabledAlpha && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-xs">Opacidad (A)</Label>
                      <span className="text-xs text-muted-foreground">{alpha}%</span>
                    </div>
                    <Slider
                      value={[alpha]}
                      onValueChange={(v) => setAlpha(v[0])}
                      min={0}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                )}
              </div>
              
              {/* ⭐ NEW: Generated Shades */}
              {showShades && shades.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-xs font-semibold">Tonalidades Generadas</Label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {shades.map((shade) => (
                      <button
                        key={shade.name}
                        onClick={() => handleColorChange(shade.color)}
                        className="flex flex-col items-center group"
                        title={shade.color}
                      >
                        <div
                          className="w-full h-10 rounded border transition-all hover:scale-105 cursor-pointer"
                          style={{ 
                            backgroundColor: shade.color,
                            borderColor: currentColor.toLowerCase() === shade.color.toLowerCase() 
                              ? 'hsl(var(--primary))' 
                              : 'hsl(var(--border))',
                            borderWidth: currentColor.toLowerCase() === shade.color.toLowerCase() ? '2px' : '1px'
                          }}
                        />
                        <span className="text-xs text-muted-foreground mt-0.5">{shade.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Presets */}
              {showPresets && allPresets && allPresets.length > 0 && (
                <div className="space-y-2">
                  {allPresets.map((preset, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">{preset.label}</Label>
                      <div className={cn(
                        "grid gap-1.5",
                        preset.colors.length <= 6 ? "grid-cols-6" : "grid-cols-10"
                      )}>
                        {preset.colors.map((color, colorIdx) => (
                          <button
                            key={colorIdx}
                            className={cn(
                              "size-6 rounded border-2 cursor-pointer transition-all hover:scale-110",
                              currentColor.toLowerCase() === color.toLowerCase() 
                                ? "border-primary ring-2 ring-primary/20" 
                                : "border-transparent hover:border-border"
                            )}
                            style={{ 
                              backgroundColor: color,
                              borderRadius: tokens.geometry.sm,
                            }}
                            onClick={() => handleColorChange(color)}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* ⭐ NEW: Favorites Section */}
              {showFavorites && favorites.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-semibold flex items-center gap-1.5">
                      <Heart className="size-3 fill-red-500 text-red-500" />
                      Favoritos ({favorites.length})
                    </Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearFavorites}
                      className="h-6 px-2 text-xs text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="size-3 mr-1" />
                      Limpiar
                    </Button>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {favorites.map((fav, index) => (
                      <div key={index} className="relative group">
                        <button
                          onClick={() => handleColorChange(fav)}
                          className="size-8 rounded border hover:scale-110 transition-all"
                          style={{ 
                            backgroundColor: fav,
                            borderColor: currentColor === fav ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                            borderWidth: currentColor === fav ? '2px' : '1px'
                          }}
                          title={fav}
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFavorite(fav);
                          }}
                          className="absolute -top-1 -right-1 size-4 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs"
                          title="Eliminar"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* ⭐ NEW: Keyboard Shortcuts Hint */}
              {enableKeyboardShortcuts && (
                <div className="pt-2 border-t border-border">
                  <Label className="text-xs font-semibold mb-2 block">Atajos de Teclado</Label>
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border text-xs">⌘C</kbd>
                      <span>Copiar</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border text-xs">⌘R</kbd>
                      <span>Aleatorio</span>
                    </div>
                    {showFavorites && (
                      <div className="flex items-center gap-1.5">
                        <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border text-xs">⌘F</kbd>
                        <span>Favorito</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                {allowClear && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClear}
                    className="flex-1"
                  >
                    Limpiar
                  </Button>
                )}
                <Button
                  size="sm"
                  onClick={() => {
                    handleChangeComplete();
                    setIsOpen(false);
                  }}
                  className="flex-1"
                >
                  <Check className="size-4 mr-1" />
                  Aplicar
                </Button>
              </div>
            </div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    );
  }
);

ColorPicker.displayName = "ColorPicker";

export { ColorPicker, type ColorPickerProps, type ColorPreset };