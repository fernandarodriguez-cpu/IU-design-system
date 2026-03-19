"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "./utils";
import { Badge } from "./badge";

// ==================== TYPES ====================

export interface SelectAdvancedOption {
  label: string;
  value: string;
  disabled?: boolean;
  group?: string;
}

export interface SelectAdvancedProps {
  /** Options list */
  options: SelectAdvancedOption[];
  /** Current value (controlled) */
  value?: string | string[];
  /** Default value (uncontrolled) */
  defaultValue?: string | string[];
  /** Placeholder text */
  placeholder?: string;
  /** Selection mode */
  mode?: "single" | "multiple" | "tags";
  /** Max number of tags to show (for multiple mode) */
  maxTagCount?: number;
  /** Custom render for +N tags */
  maxTagPlaceholder?: (omittedValues: string[]) => React.ReactNode;
  /** Show search input */
  showSearch?: boolean;
  /** Property to use for filtering */
  optionFilterProp?: "label" | "value";
  /** Allow clear */
  allowClear?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Size */
  size?: "small" | "middle" | "large";
  /** Custom dropdown render */
  dropdownRender?: (menu: React.ReactNode) => React.ReactNode;
  /** Maximum height for dropdown */
  listHeight?: number;
  /** Change callback */
  onChange?: (value: string | string[]) => void;
  /** Search callback */
  onSearch?: (value: string) => void;
  /** Clear callback */
  onClear?: () => void;
  /** Custom className */
  className?: string;
}

// ==================== COMPONENT ====================

export const SelectAdvanced = React.forwardRef<HTMLDivElement, SelectAdvancedProps>(
  (
    {
      options = [],
      value: controlledValue,
      defaultValue,
      placeholder = "Seleccionar...",
      mode = "single",
      maxTagCount,
      maxTagPlaceholder,
      showSearch = false,
      optionFilterProp = "label",
      allowClear = false,
      disabled = false,
      loading = false,
      size = "middle",
      dropdownRender,
      listHeight = 256,
      onChange,
      onSearch,
      onClear,
      className,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<string | string[]>(
      defaultValue || (mode === "multiple" || mode === "tags" ? [] : "")
    );
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const containerRef = React.useRef<HTMLDivElement>(null);

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;
    const isMultiple = mode === "multiple" || mode === "tags";

    // Handle outside click
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);

    // Filter options based on search
    const filteredOptions = React.useMemo(() => {
      if (!showSearch || !searchQuery) return options;

      return options.filter((option) => {
        const searchValue = optionFilterProp === "label" ? option.label : option.value;
        return searchValue.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }, [options, searchQuery, showSearch, optionFilterProp]);

    // Group options
    const groupedOptions = React.useMemo(() => {
      const groups: Record<string, SelectAdvancedOption[]> = {};
      const ungrouped: SelectAdvancedOption[] = [];

      filteredOptions.forEach((option) => {
        if (option.group) {
          if (!groups[option.group]) {
            groups[option.group] = [];
          }
          groups[option.group].push(option);
        } else {
          ungrouped.push(option);
        }
      });

      return { groups, ungrouped };
    }, [filteredOptions]);

    const handleSelect = (optionValue: string) => {
      if (disabled || loading) return;

      let newValue: string | string[];

      if (isMultiple) {
        const currentValues = Array.isArray(value) ? value : [];
        if (currentValues.includes(optionValue)) {
          newValue = currentValues.filter((v) => v !== optionValue);
        } else {
          newValue = [...currentValues, optionValue];
        }
      } else {
        newValue = optionValue;
        setIsOpen(false);
      }

      if (!isControlled) {
        setInternalValue(newValue);
      }

      onChange?.(newValue);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      const newValue = isMultiple ? [] : "";
      
      if (!isControlled) {
        setInternalValue(newValue);
      }
      
      onChange?.(newValue);
      onClear?.();
    };

    const handleRemoveTag = (e: React.MouseEvent, optionValue: string) => {
      e.stopPropagation();
      if (!isMultiple || disabled) return;

      const currentValues = Array.isArray(value) ? value : [];
      const newValue = currentValues.filter((v) => v !== optionValue);

      if (!isControlled) {
        setInternalValue(newValue);
      }

      onChange?.(newValue);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setSearchQuery(query);
      onSearch?.(query);
    };

    // Get selected labels
    const getSelectedLabels = () => {
      if (isMultiple) {
        const values = Array.isArray(value) ? value : [];
        return values.map((v) => options.find((opt) => opt.value === v)?.label || v);
      } else {
        return value ? [options.find((opt) => opt.value === value)?.label || value] : [];
      }
    };

    const selectedLabels = getSelectedLabels();
    const showClearButton = allowClear && selectedLabels.length > 0 && !disabled;

    // Size classes
    const sizeClasses = {
      small: "h-7 text-sm px-2",
      middle: "h-8 text-sm px-3",
      large: "h-10 text-base px-3",
    };

    // Render tags for multiple mode
    const renderTags = () => {
      if (!isMultiple || selectedLabels.length === 0) return null;

      const visibleTags = maxTagCount
        ? selectedLabels.slice(0, maxTagCount)
        : selectedLabels;
      const omittedCount = selectedLabels.length - visibleTags.length;

      return (
        <div className="flex flex-wrap gap-1 flex-1 min-w-0">
          {visibleTags.map((label, index) => {
            const values = Array.isArray(value) ? value : [];
            const optionValue = values[index];
            return (
              <Badge
                key={optionValue}
                variant="secondary"
                className="text-xs px-2 py-0.5 gap-1"
              >
                {label}
                <button
                  type="button"
                  onClick={(e) => handleRemoveTag(e, optionValue)}
                  className="hover:bg-muted rounded-sm"
                  disabled={disabled}
                >
                  <X className="size-3" />
                </button>
              </Badge>
            );
          })}
          {omittedCount > 0 && (
            <Badge variant="secondary" className="text-xs px-2 py-0.5">
              {maxTagPlaceholder
                ? maxTagPlaceholder(selectedLabels.slice(maxTagCount))
                : `+${omittedCount}`}
            </Badge>
          )}
        </div>
      );
    };

    // Render dropdown menu
    const renderMenu = () => {
      const menuContent = (
        <div
          className="py-1"
          style={{ maxHeight: listHeight, overflowY: "auto" }}
        >
          {/* Ungrouped options */}
          {groupedOptions.ungrouped.map((option) => {
            const isSelected = isMultiple
              ? (Array.isArray(value) ? value : []).includes(option.value)
              : value === option.value;

            return (
              <div
                key={option.value}
                onClick={() => !option.disabled && handleSelect(option.value)}
                className={cn(
                  "px-3 py-2 cursor-pointer transition-colors text-sm",
                  option.disabled && "opacity-50 cursor-not-allowed",
                  !option.disabled && "hover:bg-primary-50 dark:hover:bg-primary-950/30",
                  isSelected && "bg-primary-50 text-primary-700 dark:bg-primary-950/30 dark:text-primary-300"
                )}
              >
                {isMultiple && (
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {}}
                    className="mr-2 align-middle"
                    disabled={option.disabled}
                  />
                )}
                {option.label}
              </div>
            );
          })}

          {/* Grouped options */}
          {Object.entries(groupedOptions.groups).map(([groupName, groupOptions]) => (
            <div key={groupName}>
              <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground bg-muted/50">
                {groupName}
              </div>
              {groupOptions.map((option) => {
                const isSelected = isMultiple
                  ? (Array.isArray(value) ? value : []).includes(option.value)
                  : value === option.value;

                return (
                  <div
                    key={option.value}
                    onClick={() => !option.disabled && handleSelect(option.value)}
                    className={cn(
                      "px-3 py-2 cursor-pointer transition-colors text-sm",
                      option.disabled && "opacity-50 cursor-not-allowed",
                      !option.disabled && "hover:bg-primary-50 dark:hover:bg-primary-950/30",
                      isSelected && "bg-primary-50 text-primary-700 dark:bg-primary-950/30 dark:text-primary-300"
                    )}
                  >
                    {isMultiple && (
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="mr-2 align-middle"
                        disabled={option.disabled}
                      />
                    )}
                    {option.label}
                  </div>
                );
              })}
            </div>
          ))}

          {filteredOptions.length === 0 && (
            <div className="px-3 py-8 text-center text-sm text-muted-foreground">
              Sin resultados
            </div>
          )}
        </div>
      );

      return dropdownRender ? dropdownRender(menuContent) : menuContent;
    };

    return (
      <div ref={containerRef} className={cn("relative w-full", className)}>
        {/* Trigger */}
        <div
          ref={ref}
          onClick={() => !disabled && !loading && setIsOpen(!isOpen)}
          className={cn(
            "flex items-center gap-2 border-2 border-input rounded-md bg-card cursor-pointer transition-all",
            sizeClasses[size],
            disabled && "opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-900",
            isOpen && "ring-2 ring-primary-500 border-primary-500",
            "hover:border-gray-400 dark:hover:border-gray-500"
          )}
        >
          {/* Content */}
          {isMultiple ? (
            renderTags()
          ) : (
            <span
              className={cn(
                "flex-1 truncate",
                selectedLabels.length === 0 && "text-muted-foreground"
              )}
            >
              {selectedLabels[0] || placeholder}
            </span>
          )}

          {/* Controls */}
          <div className="flex items-center gap-1 shrink-0">
            {showClearButton && (
              <button
                type="button"
                onClick={handleClear}
                className="hover:bg-muted rounded-sm p-0.5"
              >
                <X className="size-4" />
              </button>
            )}
            <svg
              className={cn(
                "size-4 transition-transform text-muted-foreground",
                isOpen && "rotate-180"
              )}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-card border-2 border-border rounded-md shadow-lg">
            {showSearch && (
              <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Buscar..."
                  className="w-full px-3 py-1.5 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  autoFocus
                />
              </div>
            )}
            {renderMenu()}
          </div>
        )}
      </div>
    );
  }
);

SelectAdvanced.displayName = "SelectAdvanced";