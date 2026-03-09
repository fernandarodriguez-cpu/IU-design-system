import * as React from "react"
import { cn } from "./utils"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

export interface MentionOption {
  value: string
  label: string
  avatar?: string
  description?: string
}

export interface MentionsProps {
  value?: string
  onChange?: (value: string) => void
  options: MentionOption[]
  onSearch?: (search: string, prefix: string) => void
  prefix?: string | string[]
  split?: string
  filterOption?: (input: string, option: MentionOption) => boolean
  placement?: 'top' | 'bottom'
  loading?: boolean
  placeholder?: string
  disabled?: boolean
  className?: string
  rows?: number
}

interface MentionPosition {
  prefix: string
  searchText: string
  startIndex: number
}

export function Mentions({
  value = '',
  onChange,
  options,
  onSearch,
  prefix = '@',
  split = ' ',
  filterOption,
  placement = 'bottom',
  loading = false,
  placeholder = 'Escribe algo...',
  disabled = false,
  className,
  rows = 3,
}: MentionsProps) {
  const [showDropdown, setShowDropdown] = React.useState(false)
  const [mentionPosition, setMentionPosition] = React.useState<MentionPosition | null>(null)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [dropdownPosition, setDropdownPosition] = React.useState({ top: 0, left: 0 })
  
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const prefixes = Array.isArray(prefix) ? prefix : [prefix]

  const getFilteredOptions = React.useMemo(() => {
    if (!mentionPosition) return []

    const filtered = options.filter(option => {
      if (filterOption) {
        return filterOption(mentionPosition.searchText, option)
      }
      return option.label.toLowerCase().includes(mentionPosition.searchText.toLowerCase())
    })

    return filtered
  }, [options, mentionPosition, filterOption])

  const detectMention = (text: string, cursorPosition: number): MentionPosition | null => {
    // Find the last trigger prefix before cursor
    let lastTriggerIndex = -1
    let triggerPrefix = ''

    for (const p of prefixes) {
      const index = text.lastIndexOf(p, cursorPosition - 1)
      if (index > lastTriggerIndex && index !== -1) {
        lastTriggerIndex = index
        triggerPrefix = p
      }
    }

    if (lastTriggerIndex === -1) return null

    // Check if there's a split character between trigger and cursor
    const textBetween = text.slice(lastTriggerIndex + triggerPrefix.length, cursorPosition)
    if (textBetween.includes(split)) return null

    // Make sure trigger is at start or after a space
    if (lastTriggerIndex > 0) {
      const charBefore = text[lastTriggerIndex - 1]
      if (charBefore !== ' ' && charBefore !== '\n') return null
    }

    return {
      prefix: triggerPrefix,
      searchText: textBetween,
      startIndex: lastTriggerIndex,
    }
  }

  const updateCaretPosition = () => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    const cursorPosition = textarea.selectionStart

    // Create a mirror div to calculate caret position
    const textBeforeCursor = value.substring(0, cursorPosition)
    const lines = textBeforeCursor.split('\n')
    const currentLine = lines.length
    const currentColumn = lines[lines.length - 1].length

    // Simple approximation of caret position
    const lineHeight = 24 // Approximate line height
    const charWidth = 8 // Approximate character width

    const top = currentLine * lineHeight
    const left = currentColumn * charWidth

    setDropdownPosition({ top, left })
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    onChange?.(newValue)

    const cursorPosition = e.target.selectionStart
    const mention = detectMention(newValue, cursorPosition)

    if (mention) {
      setMentionPosition(mention)
      setShowDropdown(true)
      setSelectedIndex(0)
      updateCaretPosition()
      onSearch?.(mention.searchText, mention.prefix)
    } else {
      setShowDropdown(false)
      setMentionPosition(null)
    }
  }

  const insertMention = (option: MentionOption) => {
    if (!mentionPosition || !textareaRef.current) return

    const before = value.substring(0, mentionPosition.startIndex)
    const after = value.substring(textareaRef.current.selectionStart)
    
    const mentionText = `${mentionPosition.prefix}${option.value}`
    const newValue = before + mentionText + split + after
    
    onChange?.(newValue)
    setShowDropdown(false)
    setMentionPosition(null)

    // Set cursor position after the mention
    setTimeout(() => {
      if (textareaRef.current) {
        const cursorPos = before.length + mentionText.length + split.length
        textareaRef.current.setSelectionRange(cursorPos, cursorPos)
        textareaRef.current.focus()
      }
    }, 0)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!showDropdown || getFilteredOptions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < getFilteredOptions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : prev)
        break
      case 'Enter':
        e.preventDefault()
        if (getFilteredOptions[selectedIndex]) {
          insertMention(getFilteredOptions[selectedIndex])
        }
        break
      case 'Escape':
        e.preventDefault()
        setShowDropdown(false)
        setMentionPosition(null)
        break
    }
  }

  // Scroll selected item into view
  React.useEffect(() => {
    if (showDropdown && dropdownRef.current) {
      const selectedElement = dropdownRef.current.querySelector(`[data-index="${selectedIndex}"]`)
      selectedElement?.scrollIntoView({ block: 'nearest' })
    }
  }, [selectedIndex, showDropdown])

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        textareaRef.current &&
        !textareaRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={cn("relative", className)}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        rows={rows}
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-[var(--border-primary)]",
          "bg-[var(--bg-primary)] px-3 py-2 text-[var(--text-primary)]",
          "placeholder:text-[var(--text-tertiary)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "resize-none"
        )}
      />

      {showDropdown && getFilteredOptions.length > 0 && (
        <div
          ref={dropdownRef}
          className={cn(
            "absolute z-50 w-80 rounded-md border border-[var(--border-primary)]",
            "bg-[var(--bg-primary)] shadow-lg",
            placement === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'
          )}
          style={{
            maxHeight: '240px',
            overflowY: 'auto',
          }}
        >
          {loading ? (
            <div className="p-4 text-center text-[var(--text-tertiary)]">
              Cargando...
            </div>
          ) : (
            <div className="py-1">
              {getFilteredOptions.map((option, index) => (
                <button
                  key={option.value}
                  data-index={index}
                  onClick={() => insertMention(option)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 text-left",
                    "hover:bg-[var(--bg-secondary)] transition-colors",
                    index === selectedIndex && "bg-[var(--bg-secondary)]"
                  )}
                >
                  {option.avatar && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={option.avatar} alt={option.label} />
                      <AvatarFallback>
                        {option.label.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[var(--text-primary)] truncate">
                      {option.label}
                    </p>
                    {option.description && (
                      <p className="text-xs text-[var(--text-tertiary)] truncate">
                        {option.description}
                      </p>
                    )}
                  </div>

                  <span className="text-xs text-[var(--text-tertiary)]">
                    {mentionPosition?.prefix}{option.value}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
