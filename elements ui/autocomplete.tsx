import * as React from "react"
import { Check, X, Loader2 } from "lucide-react"
import { cn } from "./utils"
import { Input } from "./input"

export interface AutoCompleteOption {
  value: string
  label: string
  description?: string
}

export interface AutoCompleteProps {
  value?: string
  onChange?: (value: string) => void
  onSearch?: (search: string) => void
  onSelect?: (option: AutoCompleteOption) => void
  options: AutoCompleteOption[]
  loading?: boolean
  placeholder?: string
  disabled?: boolean
  allowClear?: boolean
  className?: string
  noResultsText?: string
  filterOption?: (input: string, option: AutoCompleteOption) => boolean
}

export function AutoComplete({
  value = '',
  onChange,
  onSearch,
  onSelect,
  options,
  loading = false,
  placeholder = 'Buscar...',
  disabled = false,
  allowClear = true,
  className,
  noResultsText = 'No se encontraron resultados',
  filterOption,
}: AutoCompleteProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const filteredOptions = React.useMemo(() => {
    if (!value) return options

    return options.filter(option => {
      if (filterOption) {
        return filterOption(value, option)
      }
      return (
        option.label.toLowerCase().includes(value.toLowerCase()) ||
        option.value.toLowerCase().includes(value.toLowerCase())
      )
    })
  }, [options, value, filterOption])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onChange?.(newValue)
    onSearch?.(newValue)
    setOpen(true)
    setSelectedIndex(0)
  }

  const handleSelect = (option: AutoCompleteOption) => {
    onChange?.(option.value)
    onSelect?.(option)
    setOpen(false)
    inputRef.current?.blur()
  }

  const handleClear = () => {
    onChange?.('')
    onSearch?.('')
    setOpen(false)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open && filteredOptions.length > 0) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        setOpen(true)
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : prev)
        break
      case 'Enter':
        e.preventDefault()
        if (filteredOptions[selectedIndex]) {
          handleSelect(filteredOptions[selectedIndex])
        }
        break
      case 'Escape':
        e.preventDefault()
        setOpen(false)
        break
    }
  }

  const handleFocus = () => {
    if (filteredOptions.length > 0) {
      setOpen(true)
    }
  }

  const handleBlur = (e: React.FocusEvent) => {
    // Don't close if clicking on dropdown
    if (dropdownRef.current?.contains(e.relatedTarget as Node)) {
      return
    }
    setTimeout(() => setOpen(false), 200)
  }

  // Scroll selected item into view
  React.useEffect(() => {
    if (open && dropdownRef.current) {
      const selectedElement = dropdownRef.current.querySelector(`[data-index="${selectedIndex}"]`)
      selectedElement?.scrollIntoView({ block: 'nearest' })
    }
  }, [selectedIndex, open])

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={placeholder}
          className="pr-10"
        />
        
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Loader2 className="h-4 w-4 animate-spin text-[var(--text-tertiary)]" />
          </div>
        )}

        {!loading && allowClear && value && (
          <button
            type="button"
            onClick={handleClear}
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2",
              "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]",
              "transition-colors"
            )}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {open && (
        <div
          ref={dropdownRef}
          className={cn(
            "absolute z-50 mt-1 w-full rounded-md border border-[var(--border-primary)]",
            "bg-[var(--bg-primary)] shadow-lg",
            "max-h-[240px] overflow-y-auto"
          )}
        >
          {loading ? (
            <div className="flex items-center justify-center py-6 text-[var(--text-tertiary)]">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Buscando...
            </div>
          ) : filteredOptions.length === 0 ? (
            <div className="py-6 text-center text-[var(--text-tertiary)]">
              {noResultsText}
            </div>
          ) : (
            <div className="py-1">
              {filteredOptions.map((option, index) => {
                const isSelected = index === selectedIndex
                const isCurrentValue = option.value === value

                return (
                  <button
                    key={option.value}
                    data-index={index}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={cn(
                      "relative w-full flex items-start gap-2 px-3 py-2 text-left",
                      "hover:bg-[var(--bg-secondary)] transition-colors",
                      "focus:outline-none focus:bg-[var(--bg-secondary)]",
                      isSelected && "bg-[var(--bg-secondary)]"
                    )}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[var(--text-primary)] truncate">
                        {option.label}
                      </p>
                      {option.description && (
                        <p className="text-xs text-[var(--text-tertiary)] truncate mt-0.5">
                          {option.description}
                        </p>
                      )}
                    </div>

                    {isCurrentValue && (
                      <Check className="h-4 w-4 text-[var(--primary)] flex-shrink-0 mt-0.5" />
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
