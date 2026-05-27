import React, { useState, useMemo, useRef } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { ChevronDown, Search } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
  pattern?: string;
}

export const DEFAULT_COUNTRIES: Country[] = [
  { code: 'MX', name: 'México', dialCode: '+52', flag: '🇲🇽', pattern: '## #### ####' },
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸', pattern: '### ### ####' },
  { code: 'ES', name: 'España', dialCode: '+34', flag: '🇪🇸', pattern: '### ### ###' },
  { code: 'CO', name: 'Colombia', dialCode: '+57', flag: '🇨🇴', pattern: '### ### ####' },
  { code: 'AR', name: 'Argentina', dialCode: '+54', flag: '🇦🇷', pattern: '# ## #### ####' },
  { code: 'CL', name: 'Chile', dialCode: '+56', flag: '🇨🇱', pattern: '# #### ####' },
  { code: 'PE', name: 'Perú', dialCode: '+51', flag: '🇵🇪', pattern: '### ### ###' },
  { code: 'BR', name: 'Brasil', dialCode: '+55', flag: '🇧🇷', pattern: '## ##### ####' },
  { code: 'EC', name: 'Ecuador', dialCode: '+593', flag: '🇪🇨', pattern: '# #### ####' },
  { code: 'UY', name: 'Uruguay', dialCode: '+598', flag: '🇺🇾', pattern: '### ### ###' },
  { code: 'VE', name: 'Venezuela', dialCode: '+58', flag: '🇻🇪', pattern: '### ### ####' },
  { code: 'GT', name: 'Guatemala', dialCode: '+502', flag: '🇬🇹', pattern: '#### ####' },
  { code: 'CR', name: 'Costa Rica', dialCode: '+506', flag: '🇨🇷', pattern: '#### ####' },
];

export interface KPhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
  value?: string;
  onChange?: (value: string) => void;
  defaultCountry?: string;
  countries?: Country[];
  size?: 'sm' | 'md' | 'lg';
  status?: 'error' | 'warning' | 'default';
  helperText?: string;
  isFocused?: boolean;
  isHovered?: boolean;
  block?: boolean;
}

const formatPhoneNumber = (value: string, pattern?: string) => {
  const digits = value.replace(/\D/g, '');
  if (!pattern) return digits;
  
  let formatted = '';
  let digitIndex = 0;
  
  for (let i = 0; i < pattern.length; i++) {
    if (digitIndex >= digits.length) break;
    
    if (pattern[i] === '#') {
      formatted += digits[digitIndex];
      digitIndex++;
    } else {
      formatted += pattern[i];
    }
  }
  return formatted;
};

/**
 * @figma-mcp-migration
 * Component: KPhoneInput
 * 
 * INSTRUCCIONES PARA MIGRACIÓN A FIGMA:
 * Utilizar Figma Component Properties V2 con la siguiente estructura:
 * 
 * 1. Variants (Estructurales):
 *    - size: sm | md | lg
 *    - status: default | error | warning
 *    - disabled: boolean
 * 2. Color Variables:
 *    - Relleno, borde y sombras vinculados a tokens de color Khor v6.0.
 */
export const KPhoneInput = React.forwardRef<HTMLInputElement, KPhoneInputProps>(function KPhoneInput(
  {
    value,
    onChange,
    defaultCountry = 'MX',
    countries = DEFAULT_COUNTRIES,
    size = 'md',
    status = 'default',
    helperText,
    isFocused = false,
    isHovered = false,
    block = false,
    disabled = false,
    className,
    placeholder = 'Ingresa tu teléfono',
    ...props
  },
  ref
) {
  const [internalValue, setInternalValue] = useState('');
  const isControlled = value !== undefined;
  const rawValue = isControlled ? value : internalValue;

  const [selectedCountry, setSelectedCountry] = useState<Country>(() => {
    return countries.find((c) => c.code === defaultCountry) || countries[0];
  });
  
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const filteredCountries = useMemo(() => {
    if (!searchQuery) return countries;
    const query = searchQuery.toLowerCase();
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.dialCode.includes(query) ||
        c.code.toLowerCase().includes(query)
    );
  }, [countries, searchQuery]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputVal = e.target.value;
    
    // Si empieza con el código de marcado, removerlo para el formateo
    if (inputVal.startsWith(selectedCountry.dialCode)) {
      inputVal = inputVal.slice(selectedCountry.dialCode.length);
    }
    
    const formatted = formatPhoneNumber(inputVal, selectedCountry.pattern);
    
    if (!isControlled) {
      setInternalValue(formatted);
    }
    onChange?.(selectedCountry.dialCode + ' ' + formatted.replace(/\s+/g, ''));
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearchQuery('');
    
    // Formatear el valor actual con el nuevo patrón de país
    const digits = rawValue.replace(/\D/g, '');
    const formatted = formatPhoneNumber(digits, country.pattern);
    if (!isControlled) {
      setInternalValue(formatted);
    }
    onChange?.(country.dialCode + ' ' + formatted.replace(/\s+/g, ''));
  };

  const sizeClasses = {
    sm: 'h-[var(--khor-density-height-sm)] text-xs rounded-md',
    md: 'h-[var(--khor-density-height-input)] text-sm rounded-lg',
    lg: 'h-[var(--khor-density-height-lg)] text-base rounded-xl',
  };

  const buttonSizeClasses = {
    sm: 'px-2 text-xs gap-1',
    md: 'px-3 text-sm gap-1.5',
    lg: 'px-4 text-base gap-2',
  };

  const triggerFocus = isInputFocused || isFocused;
  
  return (
    <div 
      className={cn(
        "flex flex-col gap-1.5 font-primary",
        block ? "w-full" : "w-80",
        className
      )}
    >
      <div
        className={cn(
          "flex items-stretch border transition-all overflow-hidden bg-white shadow-khor-sm",
          sizeClasses[size],
          status === 'error' && "border-khor-border-error",
          status === 'warning' && "border-khor-warning",
          status === 'default' && "border-khor-border-default",
          (isHovered && !disabled) && "border-khor-primary/50 shadow-khor-md bg-khor-slate-50/50",
          (triggerFocus && !disabled) && "ring-2 ring-khor-primary/20 border-khor-primary shadow-khor-md",
          disabled && "bg-khor-slate-100 border-khor-slate-200 opacity-60 cursor-not-allowed select-none pointer-events-none"
        )}
      >
        {/* Country Selector Dropdown */}
        <PopoverPrimitive.Root open={isOpen} onOpenChange={disabled ? undefined : setIsOpen}>
          <PopoverPrimitive.Trigger asChild>
            <button
              type="button"
              disabled={disabled}
              className={cn(
                "flex items-center shrink-0 border-r border-khor-border-default bg-khor-slate-50/50 hover:bg-khor-slate-100 transition-colors text-khor-neutral-800 outline-none select-none disabled:cursor-not-allowed",
                buttonSizeClasses[size]
              )}
            >
              <span className="text-base leading-none select-none">{selectedCountry.flag}</span>
              <span className="font-semibold text-khor-neutral-600">{selectedCountry.dialCode}</span>
              <ChevronDown className="w-3.5 h-3.5 text-khor-neutral-400 group-hover:text-khor-neutral-600 transition-transform duration-200" />
            </button>
          </PopoverPrimitive.Trigger>

          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
              align="start"
              sideOffset={6}
              className="z-50 w-64 rounded-xl border border-khor-slate-200 bg-white p-2 shadow-khor-lg outline-none animate-in fade-in zoom-in-95 font-primary max-h-80 flex flex-col overflow-hidden"
            >
              {/* Search input in Popover */}
              <div className="flex items-center gap-2 px-2 py-1.5 border-b border-khor-slate-100 mb-1">
                <Search className="w-4 h-4 text-khor-neutral-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Buscar país o prefijo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent outline-none text-xs text-khor-neutral-700 placeholder:text-khor-neutral-400"
                />
              </div>

              {/* Country List */}
              <div className="flex-1 overflow-y-auto max-h-56 scrollbar-thin">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors text-left",
                        selectedCountry.code === country.code
                          ? "bg-khor-primary/10 text-khor-primary font-semibold"
                          : "hover:bg-khor-slate-50 text-khor-neutral-700"
                      )}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className="text-base select-none shrink-0">{country.flag}</span>
                        <span className="truncate">{country.name}</span>
                      </div>
                      <span className="text-khor-neutral-400 font-mono text-[11px] ml-2 shrink-0">{country.dialCode}</span>
                    </button>
                  ))
                ) : (
                  <div className="py-4 text-center text-xs text-khor-neutral-400">
                    No se encontraron países.
                  </div>
                )}
              </div>
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>

        {/* Telephone Input */}
        <input
          ref={ref}
          type="tel"
          disabled={disabled}
          value={rawValue}
          onChange={handlePhoneChange}
          placeholder={placeholder}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          className="flex-1 bg-transparent px-3 py-1 outline-none placeholder:text-khor-neutral-400 text-khor-neutral-800 disabled:cursor-not-allowed"
          {...props}
        />
      </div>

      {/* Helper / Error Text */}
      {helperText && (
        <span
          className={cn(
            "text-xs px-0.5",
            status === 'error' && "text-khor-error font-medium",
            status === 'warning' && "text-khor-warning font-medium",
            status === 'default' && "text-khor-neutral-500"
          )}
        >
          {helperText}
        </span>
      )}
    </div>
  );
});

KPhoneInput.displayName = 'KPhoneInput';
export default KPhoneInput;
