/* ─── KPhoneInput — tokens aligned with KInput (187673-24767) ────────────────
   Uses same hex tokens as KInput:
   Default border : #D1D5DB  |  Focus border: #E04D36  |  Focus shadow: rgba(224,77,54,0.15)
   Error border   : #D32F2F  |  Warning border: #F59E0B
   Disabled       : bg #F3F4F6, border #E5E7EB, text #9CA3AF — no opacity
   Sizes          : sm=32px, md=36px, lg=40px
──────────────────────────────────────────────────────────────────────────────── */
import React, { useState, useMemo } from 'react';
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
  { code: 'MX', name: 'México',         dialCode: '+52',  flag: '🇲🇽', pattern: '## #### ####' },
  { code: 'US', name: 'United States',  dialCode: '+1',   flag: '🇺🇸', pattern: '### ### ####' },
  { code: 'ES', name: 'España',         dialCode: '+34',  flag: '🇪🇸', pattern: '### ### ###' },
  { code: 'CO', name: 'Colombia',       dialCode: '+57',  flag: '🇨🇴', pattern: '### ### ####' },
  { code: 'AR', name: 'Argentina',      dialCode: '+54',  flag: '🇦🇷', pattern: '# ## #### ####' },
  { code: 'CL', name: 'Chile',          dialCode: '+56',  flag: '🇨🇱', pattern: '# #### ####' },
  { code: 'PE', name: 'Perú',           dialCode: '+51',  flag: '🇵🇪', pattern: '### ### ###' },
  { code: 'BR', name: 'Brasil',         dialCode: '+55',  flag: '🇧🇷', pattern: '## ##### ####' },
  { code: 'EC', name: 'Ecuador',        dialCode: '+593', flag: '🇪🇨', pattern: '# #### ####' },
  { code: 'UY', name: 'Uruguay',        dialCode: '+598', flag: '🇺🇾', pattern: '### ### ###' },
  { code: 'VE', name: 'Venezuela',      dialCode: '+58',  flag: '🇻🇪', pattern: '### ### ####' },
  { code: 'GT', name: 'Guatemala',      dialCode: '+502', flag: '🇬🇹', pattern: '#### ####' },
  { code: 'CR', name: 'Costa Rica',     dialCode: '+506', flag: '🇨🇷', pattern: '#### ####' },
];

export interface KPhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
  value?: string;
  onChange?: (value: string) => void;
  defaultCountry?: string;
  countries?: Country[];
  size?: 'sm' | 'md' | 'lg';
  status?: 'default' | 'error' | 'warning';
  helperText?: string;
  isFocused?: boolean;
  isHovered?: boolean;
  block?: boolean;
}

// ─── size tokens (mirrors KInput) ────────────────────────────────────────────
const SIZE = {
  sm: { h: 32, fs: 12, px: 10, iconSz: 13 },
  md: { h: 36, fs: 13, px: 12, iconSz: 14 },
  lg: { h: 40, fs: 14, px: 14, iconSz: 16 },
} as const;

// ─── status → border class ───────────────────────────────────────────────────
const STATUS_BORDER: Record<string, string> = {
  default: 'border-[#D1D5DB]',
  error:   'border-[#D32F2F]',
  warning: 'border-[#F59E0B]',
};

const STATUS_HELP: Record<string, string> = {
  default: 'text-[#6B7280]',
  error:   'text-[#D32F2F]',
  warning: 'text-[#B45309]',
};

const formatPhoneNumber = (value: string, pattern?: string) => {
  const digits = value.replace(/\D/g, '');
  if (!pattern) return digits;
  let formatted = '';
  let di = 0;
  for (let i = 0; i < pattern.length; i++) {
    if (di >= digits.length) break;
    formatted += pattern[i] === '#' ? digits[di++] : pattern[i];
  }
  return formatted;
};

export const KPhoneInput = React.forwardRef<HTMLInputElement, KPhoneInputProps>(function KPhoneInput(
  {
    value, onChange,
    defaultCountry = 'MX', countries = DEFAULT_COUNTRIES,
    size = 'md', status = 'default',
    helperText, isFocused = false, isHovered = false,
    block = false, disabled = false,
    className, placeholder = 'Ingresa tu teléfono',
    ...props
  },
  ref,
) {
  const s = SIZE[size];
  const [internalValue, setInternalValue] = useState('');
  const isControlled = value !== undefined;
  const rawValue = isControlled ? value! : internalValue;

  const [selectedCountry, setSelectedCountry] = useState<Country>(
    () => countries.find(c => c.code === defaultCountry) || countries[0],
  );
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const filteredCountries = useMemo(() => {
    if (!searchQuery) return countries;
    const q = searchQuery.toLowerCase();
    return countries.filter(c =>
      c.name.toLowerCase().includes(q) || c.dialCode.includes(q) || c.code.toLowerCase().includes(q),
    );
  }, [countries, searchQuery]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;
    if (v.startsWith(selectedCountry.dialCode)) v = v.slice(selectedCountry.dialCode.length);
    const formatted = formatPhoneNumber(v, selectedCountry.pattern);
    if (!isControlled) setInternalValue(formatted);
    onChange?.(selectedCountry.dialCode + ' ' + formatted.replace(/\s+/g, ''));
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearchQuery('');
    const digits = rawValue.replace(/\D/g, '');
    const formatted = formatPhoneNumber(digits, country.pattern);
    if (!isControlled) setInternalValue(formatted);
    onChange?.(country.dialCode + ' ' + formatted.replace(/\s+/g, ''));
  };

  const triggerFocus = isInputFocused || isFocused;

  return (
    <div className={cn('flex flex-col gap-1 font-primary', block ? 'w-full' : 'w-80', className)}>
      {/* ── field container ── */}
      <div
        className={cn(
          'flex items-stretch rounded-md border bg-white transition-all duration-150',
          STATUS_BORDER[status],
          !disabled && status === 'default' && 'hover:border-[#E04D36]',
          triggerFocus && !disabled && 'border-[#E04D36] shadow-[0_0_0_3px_rgba(224,77,54,0.15)]',
          status === 'error'   && triggerFocus && !disabled && 'shadow-[0_0_0_3px_rgba(211,47,47,0.15)]',
          status === 'warning' && triggerFocus && !disabled && 'shadow-[0_0_0_3px_rgba(245,158,11,0.15)]',
          isHovered && !disabled && 'border-[#E04D36]',
          disabled && 'bg-[#F3F4F6] border-[#E5E7EB] pointer-events-none',
        )}
        style={{ height: s.h }}
      >
        {/* Country selector */}
        <PopoverPrimitive.Root open={isOpen} onOpenChange={disabled ? undefined : setIsOpen}>
          <PopoverPrimitive.Trigger asChild>
            <button
              type="button"
              disabled={disabled}
              className={cn(
                'flex items-center shrink-0 gap-1 border-r bg-[#F9FAFB] transition-colors outline-none focus-visible:outline-none rounded-l-md',
                'hover:bg-[#F3F4F6]',
                disabled ? 'border-[#E5E7EB] text-[#9CA3AF]' : 'border-[#D1D5DB] text-[#374151]',
              )}
              style={{ paddingLeft: s.px, paddingRight: s.px, fontSize: s.fs }}
            >
              <span className="text-base leading-none select-none">{selectedCountry.flag}</span>
              <span className="font-semibold">{selectedCountry.dialCode}</span>
              <ChevronDown style={{ width: s.iconSz - 2, height: s.iconSz - 2 }} className={disabled ? 'text-[#D1D5DB]' : 'text-[#9CA3AF]'} />
            </button>
          </PopoverPrimitive.Trigger>

          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
              align="start"
              sideOffset={6}
              className="z-50 w-64 rounded-md border border-[#E5E7EB] bg-white p-2 shadow-lg outline-none font-primary max-h-80 flex flex-col overflow-hidden animate-in fade-in-0 zoom-in-95"
            >
              {/* Search */}
              <div className="flex items-center gap-2 px-2 py-1.5 border-b border-[#F3F4F6] mb-1">
                <Search className="w-4 h-4 text-[#9CA3AF] shrink-0" />
                <input
                  type="text"
                  placeholder="Buscar país o prefijo..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent outline-none focus-visible:outline-none text-xs text-[#374151] placeholder:text-[#9CA3AF]"
                />
              </div>
              {/* List */}
              <div className="flex-1 overflow-y-auto max-h-56">
                {filteredCountries.length > 0 ? filteredCountries.map(country => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => handleCountrySelect(country)}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2 text-xs rounded-md transition-colors text-left',
                      selectedCountry.code === country.code
                        ? 'bg-[#FFF5F4] text-[#E04D36] font-semibold'
                        : 'hover:bg-[#F9FAFB] text-[#374151]',
                    )}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-base select-none shrink-0">{country.flag}</span>
                      <span className="truncate">{country.name}</span>
                    </div>
                    <span className="text-[#9CA3AF] font-mono text-[11px] ml-2 shrink-0">{country.dialCode}</span>
                  </button>
                )) : (
                  <div className="py-4 text-center text-xs text-[#9CA3AF]">No se encontraron países.</div>
                )}
              </div>
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>

        {/* Phone input */}
        <input
          ref={ref}
          type="tel"
          disabled={disabled}
          value={rawValue}
          onChange={handlePhoneChange}
          placeholder={placeholder}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          className={cn(
            'flex-1 bg-transparent outline-none focus-visible:outline-none',
            'placeholder:text-[#9CA3AF]',
            disabled ? 'text-[#9CA3AF] cursor-not-allowed' : 'text-[#1e293b]',
          )}
          style={{ paddingLeft: s.px, paddingRight: s.px, fontSize: s.fs }}
          {...props}
        />
      </div>

      {/* Helper text */}
      {helperText && (
        <span className={cn('leading-none', STATUS_HELP[status])} style={{ fontSize: 11 }}>
          {helperText}
        </span>
      )}
    </div>
  );
});

KPhoneInput.displayName = 'KPhoneInput';
export default KPhoneInput;
