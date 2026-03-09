import * as React from "react"
import { ChevronRight, ChevronLeft, X } from "lucide-react"

import { cn } from "./utils"
import { Button } from "./button"
import { Input } from "./input"
import { Checkbox } from "./checkbox"
import { ScrollArea } from "./scroll-area"

export interface TransferItem {
  key: string
  label: string
  description?: string
  disabled?: boolean
}

export interface TransferProps {
  dataSource: TransferItem[]
  targetKeys: string[]
  onChange: (
    targetKeys: string[],
    direction: "left" | "right",
    moveKeys: string[]
  ) => void
  titles?: [string, string]
  showSearch?: boolean
  searchPlaceholder?: string
  disabled?: boolean
  height?: number
  render?: (item: TransferItem) => React.ReactNode
  className?: string
}

export function Transfer({
  dataSource,
  targetKeys = [],
  onChange,
  titles = ["Disponibles", "Seleccionados"],
  showSearch = true,
  searchPlaceholder = "Buscar...",
  disabled = false,
  height = 400,
  render,
  className,
}: TransferProps) {
  const [leftSearch, setLeftSearch] = React.useState("")
  const [rightSearch, setRightSearch] = React.useState("")
  const [leftChecked, setLeftChecked] = React.useState<string[]>([])
  const [rightChecked, setRightChecked] = React.useState<string[]>([])

  // Split data into left and right lists
  const leftItems = dataSource.filter((item) => !targetKeys.includes(item.key))
  const rightItems = dataSource.filter((item) => targetKeys.includes(item.key))

  // Filter by search
  const filteredLeftItems = leftItems.filter((item) =>
    item.label.toLowerCase().includes(leftSearch.toLowerCase())
  )
  const filteredRightItems = rightItems.filter((item) =>
    item.label.toLowerCase().includes(rightSearch.toLowerCase())
  )

  // Enabled items only (not disabled)
  const enabledLeftItems = filteredLeftItems.filter((item) => !item.disabled)
  const enabledRightItems = filteredRightItems.filter((item) => !item.disabled)

  // Handle select all
  const handleLeftSelectAll = (checked: boolean) => {
    setLeftChecked(checked ? enabledLeftItems.map((item) => item.key) : [])
  }

  const handleRightSelectAll = (checked: boolean) => {
    setRightChecked(checked ? enabledRightItems.map((item) => item.key) : [])
  }

  // Handle individual item selection
  const handleLeftCheck = (key: string, checked: boolean) => {
    setLeftChecked((prev) =>
      checked ? [...prev, key] : prev.filter((k) => k !== key)
    )
  }

  const handleRightCheck = (key: string, checked: boolean) => {
    setRightChecked((prev) =>
      checked ? [...prev, key] : prev.filter((k) => k !== key)
    )
  }

  // Move items
  const moveToRight = () => {
    const newTargetKeys = [...targetKeys, ...leftChecked]
    onChange(newTargetKeys, "right", leftChecked)
    setLeftChecked([])
  }

  const moveToLeft = () => {
    const newTargetKeys = targetKeys.filter((key) => !rightChecked.includes(key))
    onChange(newTargetKeys, "left", rightChecked)
    setRightChecked([])
  }

  // Check states
  const leftAllChecked =
    enabledLeftItems.length > 0 && leftChecked.length === enabledLeftItems.length
  const leftIndeterminate =
    leftChecked.length > 0 && leftChecked.length < enabledLeftItems.length
  const rightAllChecked =
    enabledRightItems.length > 0 && rightChecked.length === enabledRightItems.length
  const rightIndeterminate =
    rightChecked.length > 0 && rightChecked.length < enabledRightItems.length

  const renderList = (
    items: TransferItem[],
    checkedKeys: string[],
    onCheck: (key: string, checked: boolean) => void,
    onSelectAll: (checked: boolean) => void,
    allChecked: boolean,
    indeterminate: boolean,
    searchValue: string,
    onSearchChange: (value: string) => void,
    title: string
  ) => {
    return (
      <div className="flex flex-col h-full border border-[var(--border-primary)] rounded-[var(--radius-md)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={allChecked}
              indeterminate={indeterminate}
              onCheckedChange={onSelectAll}
              disabled={disabled || items.filter((i) => !i.disabled).length === 0}
            />
            <span className="text-sm">
              {title}
              <span className="text-[var(--text-tertiary)] ml-2">
                ({checkedKeys.length}/{items.filter((i) => !i.disabled).length})
              </span>
            </span>
          </div>
        </div>

        {/* Search */}
        {showSearch && (
          <div className="p-2 border-b border-[var(--border-primary)]">
            <div className="relative">
              <Input
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-3 pr-8 h-8"
                disabled={disabled}
              />
              {searchValue && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => onSearchChange("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        )}

        {/* List */}
        <ScrollArea className="flex-1" style={{ height: height - (showSearch ? 120 : 80) }}>
          <div className="p-2 space-y-1">
            {items.length === 0 ? (
              <div className="text-center text-[var(--text-tertiary)] py-8 text-sm">
                {searchValue ? "No se encontraron resultados" : "No hay elementos"}
              </div>
            ) : (
              items.map((item) => (
                <label
                  key={item.key}
                  className={cn(
                    "flex items-start gap-2 p-2 rounded-[var(--radius-sm)] transition-colors",
                    !item.disabled && "hover:bg-[var(--bg-secondary)] cursor-pointer",
                    item.disabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Checkbox
                    checked={checkedKeys.includes(item.key)}
                    onCheckedChange={(checked) => onCheck(item.key, !!checked)}
                    disabled={disabled || item.disabled}
                    className="mt-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    {render ? (
                      render(item)
                    ) : (
                      <div>
                        <div className="text-sm truncate">{item.label}</div>
                        {item.description && (
                          <div className="text-xs text-[var(--text-tertiary)] truncate">
                            {item.description}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </label>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    )
  }

  return (
    <div className={cn("flex items-center gap-4", className)} style={{ height }}>
      {/* Left list */}
      <div className="flex-1">
        {renderList(
          filteredLeftItems,
          leftChecked,
          handleLeftCheck,
          handleLeftSelectAll,
          leftAllChecked,
          leftIndeterminate,
          leftSearch,
          setLeftSearch,
          titles[0]
        )}
      </div>

      {/* Transfer buttons */}
      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={moveToRight}
          disabled={disabled || leftChecked.length === 0}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={moveToLeft}
          disabled={disabled || rightChecked.length === 0}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      {/* Right list */}
      <div className="flex-1">
        {renderList(
          filteredRightItems,
          rightChecked,
          handleRightCheck,
          handleRightSelectAll,
          rightAllChecked,
          rightIndeterminate,
          rightSearch,
          setRightSearch,
          titles[1]
        )}
      </div>
    </div>
  )
}
