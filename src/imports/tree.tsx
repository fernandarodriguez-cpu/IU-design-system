import * as React from "react"
import { ChevronRight, ChevronDown, Folder, File, FolderOpen } from "lucide-react"

import { cn } from "./utils"
import { Checkbox } from "./checkbox"

export interface TreeNode {
  key: string
  title: string
  children?: TreeNode[]
  icon?: React.ReactNode
  disabled?: boolean
  isLeaf?: boolean
  selectable?: boolean
  checkable?: boolean
  className?: string
}

export interface TreeProps {
  data: TreeNode[]
  defaultExpandedKeys?: string[]
  expandedKeys?: string[]
  onExpand?: (expandedKeys: string[]) => void
  selectedKeys?: string[]
  onSelect?: (selectedKeys: string[], info: { node: TreeNode; selected: boolean }) => void
  checkedKeys?: string[]
  onCheck?: (checkedKeys: string[]) => void
  checkable?: boolean
  selectable?: boolean
  showLine?: boolean
  showIcon?: boolean
  defaultExpandAll?: boolean
  disabled?: boolean
  className?: string
}

export function Tree({
  data,
  defaultExpandedKeys = [],
  expandedKeys: controlledExpandedKeys,
  onExpand,
  selectedKeys = [],
  onSelect,
  checkedKeys = [],
  onCheck,
  checkable = false,
  selectable = true,
  showLine = false,
  showIcon = true,
  defaultExpandAll = false,
  disabled = false,
  className,
}: TreeProps) {
  const [internalExpandedKeys, setInternalExpandedKeys] = React.useState<string[]>(() => {
    if (defaultExpandAll) {
      const getAllKeys = (nodes: TreeNode[]): string[] => {
        let keys: string[] = []
        nodes.forEach((node) => {
          if (node.children && node.children.length > 0) {
            keys.push(node.key)
            keys = keys.concat(getAllKeys(node.children))
          }
        })
        return keys
      }
      return getAllKeys(data)
    }
    return defaultExpandedKeys
  })

  const expandedKeys = controlledExpandedKeys ?? internalExpandedKeys
  const setExpandedKeys = onExpand ?? setInternalExpandedKeys

  const toggleExpand = (key: string) => {
    const newKeys = expandedKeys.includes(key)
      ? expandedKeys.filter((k) => k !== key)
      : [...expandedKeys, key]
    setExpandedKeys(newKeys)
  }

  const handleSelect = (node: TreeNode) => {
    if (disabled || node.disabled || !selectable || node.selectable === false) return

    const isSelected = selectedKeys.includes(node.key)
    const newKeys = isSelected
      ? selectedKeys.filter((k) => k !== node.key)
      : [...selectedKeys, node.key]

    onSelect?.(newKeys, { node, selected: !isSelected })
  }

  const handleCheck = (node: TreeNode, checked: boolean) => {
    if (disabled || node.disabled) return

    // Get all descendant keys
    const getDescendantKeys = (node: TreeNode): string[] => {
      let keys: string[] = [node.key]
      if (node.children) {
        node.children.forEach((child) => {
          keys = keys.concat(getDescendantKeys(child))
        })
      }
      return keys
    }

    const descendantKeys = getDescendantKeys(node)

    let newKeys: string[]
    if (checked) {
      // Add node and all descendants
      newKeys = [...new Set([...checkedKeys, ...descendantKeys])]
    } else {
      // Remove node and all descendants
      newKeys = checkedKeys.filter((k) => !descendantKeys.includes(k))
    }

    onCheck?.(newKeys)
  }

  const getNodeIcon = (node: TreeNode, isExpanded: boolean) => {
    if (node.icon) return node.icon

    if (!showIcon) return null

    if (node.isLeaf || (!node.children || node.children.length === 0)) {
      return <File className="h-4 w-4 text-[var(--text-tertiary)]" />
    }

    return isExpanded ? (
      <FolderOpen className="h-4 w-4 text-[var(--primary)]" />
    ) : (
      <Folder className="h-4 w-4 text-[var(--text-tertiary)]" />
    )
  }

  const renderNode = (node: TreeNode, level: number = 0) => {
    const hasChildren = node.children && node.children.length > 0
    const isExpanded = expandedKeys.includes(node.key)
    const isSelected = selectedKeys.includes(node.key)
    const isChecked = checkedKeys.includes(node.key)
    const isDisabled = disabled || node.disabled

    // Check if all children are checked for indeterminate state
    const getIndeterminate = () => {
      if (!hasChildren || !checkable) return false
      const getAllDescendantKeys = (node: TreeNode): string[] => {
        let keys: string[] = [node.key]
        if (node.children) {
          node.children.forEach((child) => {
            keys = keys.concat(getAllDescendantKeys(child))
          })
        }
        return keys
      }
      const descendantKeys = getAllDescendantKeys(node).filter((k) => k !== node.key)
      const checkedDescendants = descendantKeys.filter((k) => checkedKeys.includes(k))
      return checkedDescendants.length > 0 && checkedDescendants.length < descendantKeys.length
    }

    return (
      <div key={node.key} className={node.className}>
        {/* Node */}
        <div
          className={cn(
            "flex items-center gap-1 py-1 px-2 rounded-[var(--radius-sm)] transition-colors group",
            selectable && !isDisabled && "cursor-pointer hover:bg-[var(--bg-secondary)]",
            isSelected && "bg-[var(--bg-tertiary)]",
            isDisabled && "opacity-50 cursor-not-allowed"
          )}
          style={{ paddingLeft: `${level * 20 + 8}px` }}
        >
          {/* Expand/Collapse icon */}
          {hasChildren ? (
            <button
              onClick={() => toggleExpand(node.key)}
              disabled={isDisabled}
              className="flex-shrink-0 h-4 w-4 flex items-center justify-center hover:bg-[var(--bg-tertiary)] rounded-sm transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          ) : (
            showLine && <div className="w-4" />
          )}

          {/* Checkbox */}
          {(checkable || node.checkable) && (
            <Checkbox
              checked={isChecked}
              indeterminate={getIndeterminate()}
              onCheckedChange={(checked) => handleCheck(node, !!checked)}
              disabled={isDisabled}
              className="flex-shrink-0"
            />
          )}

          {/* Icon */}
          <div className="flex-shrink-0">{getNodeIcon(node, isExpanded)}</div>

          {/* Title */}
          <div
            onClick={() => handleSelect(node)}
            className="flex-1 text-sm truncate select-none"
          >
            {node.title}
          </div>
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div>
            {node.children!.map((child) => (
              <React.Fragment key={child.key}>
                {renderNode(child, level + 1)}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn("py-2", className)}>
      {data.map((node) => (
        <React.Fragment key={node.key}>
          {renderNode(node)}
        </React.Fragment>
      ))}
    </div>
  )
}
