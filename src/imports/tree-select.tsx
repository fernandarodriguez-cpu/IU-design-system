import * as React from "react"
import { Check, ChevronDown, X } from "lucide-react"

import { cn } from "./utils"
import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Tree, TreeNode } from "./tree"
import { ScrollArea } from "./scroll-area"

export interface TreeSelectProps {
  data?: TreeNode[]
  value?: string | string[]
  onChange?: (value: string | string[] | undefined) => void
  placeholder?: string
  multiple?: boolean
  checkable?: boolean
  showSearch?: boolean
  searchPlaceholder?: string
  disabled?: boolean
  className?: string
  maxTagCount?: number
  allowClear?: boolean
  defaultExpandAll?: boolean
}

export function TreeSelect({
  data = [],
  value,
  onChange,
  placeholder = "Selecciona una opción",
  multiple = false,
  checkable = false,
  showSearch = false,
  searchPlaceholder = "Buscar...",
  disabled = false,
  className,
  maxTagCount = 3,
  allowClear = true,
  defaultExpandAll = false,
}: TreeSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>(() => {
    if (!value) return []
    return Array.isArray(value) ? value : [value]
  })

  React.useEffect(() => {
    if (!value) {
      setSelectedKeys([])
    } else {
      setSelectedKeys(Array.isArray(value) ? value : [value])
    }
  }, [value])

  // Get all nodes as flat array for search
  const flattenNodes = (nodes: TreeNode[]): TreeNode[] => {
    let result: TreeNode[] = []
    nodes.forEach((node) => {
      result.push(node)
      if (node.children) {
        result = result.concat(flattenNodes(node.children))
      }
    })
    return result
  }

  const allNodes = React.useMemo(() => flattenNodes(data), [data])

  // Filter nodes by search
  const filterNodes = (nodes: TreeNode[], query: string): TreeNode[] => {
    return nodes
      .map((node) => {
        const matches = node.title.toLowerCase().includes(query.toLowerCase())
        const filteredChildren = node.children ? filterNodes(node.children, query) : []

        if (matches || filteredChildren.length > 0) {
          return {
            ...node,
            children: filteredChildren.length > 0 ? filteredChildren : node.children,
          }
        }
        return null
      })
      .filter((node): node is TreeNode => node !== null)
  }

  const filteredData = searchQuery ? filterNodes(data, searchQuery) : data

  // Get display labels
  const getNodeByKey = (key: string): TreeNode | undefined => {
    return allNodes.find((node) => node.key === key)
  }

  const getDisplayValue = () => {
    if (selectedKeys.length === 0) return placeholder

    if (multiple) {
      const displayCount = Math.min(selectedKeys.length, maxTagCount)
      const labels = selectedKeys.slice(0, displayCount).map((key) => {
        const node = getNodeByKey(key)
        return node?.title || key
      })

      if (selectedKeys.length > maxTagCount) {
        return `${labels.join(", ")} (+${selectedKeys.length - maxTagCount})`
      }

      return labels.join(", ")
    }

    const node = getNodeByKey(selectedKeys[0])
    return node?.title || selectedKeys[0]
  }

  const handleSelect = (keys: string[]) => {
    if (multiple || checkable) {
      setSelectedKeys(keys)
      onChange?.(keys)
    } else {
      setSelectedKeys(keys)
      onChange?.(keys[0])
      setOpen(false)
    }
  }

  const handleCheck = (keys: string[]) => {
    setSelectedKeys(keys)
    onChange?.(keys)
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedKeys([])
    onChange?.(undefined)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "justify-between w-full",
            !selectedKeys.length && "text-[var(--text-tertiary)]",
            className
          )}
        >
          <span className="flex-1 text-left truncate">{getDisplayValue()}</span>
          <div className="flex items-center gap-1 flex-shrink-0 ml-2">
            {allowClear && selectedKeys.length > 0 && !disabled && (
              <X
                className="h-4 w-4 opacity-50 hover:opacity-100"
                onClick={handleClear}
              />
            )}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        {/* Search */}
        {showSearch && (
          <div className="p-2 border-b border-[var(--border-primary)]">
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-transparent border border-[var(--border-primary)] rounded-[var(--radius-sm)] outline-none focus:border-[var(--primary)]"
            />
          </div>
        )}

        {/* Tree */}
        <ScrollArea className="max-h-[300px]">
          {filteredData.length === 0 ? (
            <div className="py-6 text-center text-sm text-[var(--text-tertiary)]">
              No se encontraron resultados
            </div>
          ) : (
            <Tree
              data={filteredData}
              selectedKeys={selectedKeys}
              onSelect={(keys) => handleSelect(keys)}
              checkedKeys={checkable ? selectedKeys : undefined}
              onCheck={checkable ? handleCheck : undefined}
              checkable={checkable}
              selectable={!checkable}
              showIcon
              defaultExpandAll={defaultExpandAll || !!searchQuery}
              className="p-2"
            />
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
