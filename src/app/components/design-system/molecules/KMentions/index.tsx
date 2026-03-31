import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../../../../imports/utils';
import { KAvatar } from '../../atoms/KAvatar';

export interface KMentionOption { 
  value: string; 
  label: string; 
  avatar?: string; 
}

export interface KMentionsProps {
  value?: string;
  onChange?: (value: string) => void;
  options: KMentionOption[];
  placeholder?: string;
  trigger?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * KMentions — Área de texto con soporte de menciones (Total Headless)
 * Reemplaza AntD Mentions con un motor de búsqueda ligero activado por disparador.
 */
export function KMentions({ 
  value = '', 
  onChange, 
  options, 
  placeholder = 'Escribe @ para mencionar...', 
  trigger = '@', 
  disabled, 
  className, 
  style 
}: KMentionsProps) {
  const [internalValue, setInternalValue] = useState(value);
  const [showOptions, setShowOptions] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<KMentionOption[]>(options);
  const [activeIndex, setActiveIndex] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.target.value;
    setInternalValue(newVal);
    onChange?.(newVal);

    const selectionStart = e.target.selectionStart;
    const textBeforeCursor = newVal.substring(0, selectionStart);
    const lastTriggerIndex = textBeforeCursor.lastIndexOf(trigger);

    if (lastTriggerIndex !== -1) {
      const query = textBeforeCursor.substring(lastTriggerIndex + 1);
      // Solo mostramos si no hay espacios entre el trigger y el cursor
      if (!query.includes(' ')) {
        const filtered = options.filter(opt => 
          opt.label.toLowerCase().includes(query.toLowerCase()) ||
          opt.value.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredOptions(filtered);
        setShowOptions(filtered.length > 0);
        setActiveIndex(0);
        return;
      }
    }
    setShowOptions(false);
  };

  const handleSelectMention = (option: KMentionOption) => {
    const selectionStart = textareaRef.current!.selectionStart;
    const textBeforeCursor = internalValue.substring(0, selectionStart);
    const textAfterCursor = internalValue.substring(selectionStart);
    const lastTriggerIndex = textBeforeCursor.lastIndexOf(trigger);

    const newValue = 
      internalValue.substring(0, lastTriggerIndex) + 
      trigger + option.value + ' ' + 
      textAfterCursor;

    setInternalValue(newValue);
    onChange?.(newValue);
    setShowOptions(false);
    
    // Devolvemos el foco al textarea
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showOptions) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % filteredOptions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + filteredOptions.length) % filteredOptions.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleSelectMention(filteredOptions[activeIndex]);
      } else if (e.key === 'Escape') {
        setShowOptions(false);
      }
    }
  };

  return (
    <div className={cn("relative w-full font-primary", className)} style={style}>
      <textarea
        ref={textareaRef}
        value={internalValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        rows={4}
        className={cn(
          "w-full p-3 border rounded-md outline-none transition-all resize-none text-sm",
          "bg-[var(--khor-surface-page)] border-[var(--khor-neutral-200)] text-[var(--khor-neutral-900)]",
          "focus:border-[var(--khor-primary)] focus:ring-2 focus:ring-[var(--khor-primary-light)]",
          disabled && "opacity-50 cursor-not-allowed bg-[var(--khor-neutral-100)]"
        )}
      />

      {showOptions && (
        <div className="absolute z-50 bottom-full left-0 mb-1 w-64 bg-[var(--khor-surface-page)] border border-[var(--khor-neutral-200)] rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="max-h-60 overflow-y-auto py-1">
            {filteredOptions.map((opt, i) => (
              <div
                key={opt.value}
                onClick={() => handleSelectMention(opt)}
                onMouseEnter={() => setActiveIndex(i)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors",
                  i === activeIndex ? "bg-[var(--khor-primary-light)]/10 text-[var(--khor-primary)]" : "text-[var(--khor-neutral-700)] italic"
                )}
              >
                <KAvatar name={opt.label} src={opt.avatar} size="sm" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold">{opt.label}</span>
                  <span className="text-[10px] opacity-70">@{opt.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default KMentions;
