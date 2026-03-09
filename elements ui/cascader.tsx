import * as React from 'react';
import { Check, ChevronRight, Search } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from './button';
import { Input } from './input';
import { ScrollArea } from './scroll-area';
import { cn } from './utils';

export interface CascaderOption {
  value: string;
  label: string;
  children?: CascaderOption[];
  disabled?: boolean;
}

export interface CascaderProps {
  options: CascaderOption[];
  value?: string[];
  onChange?: (value: string[], selectedOptions: CascaderOption[]) => void;
  placeholder?: string;
  disabled?: boolean;
  expandTrigger?: 'click' | 'hover';
  changeOnSelect?: boolean;
  showSearch?: boolean;
  multiple?: boolean;
  className?: string;
  displayRender?: (labels: string[]) => string;
}

export function Cascader({
  options,
  value = [],
  onChange,
  placeholder = 'Selecciona...',
  disabled = false,
  expandTrigger = 'click',
  changeOnSelect = false,
  showSearch = false,
  multiple = false,
  className,
  displayRender,
}: CascaderProps) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [activeValue, setActiveValue] = React.useState<string[]>([]);
  const [hoveredPath, setHoveredPath] = React.useState<string[]>([]);

  const getOptionsByPath = (path: string[]): CascaderOption[] => {
    let currentOptions = options;
    for (const val of path) {
      const option = currentOptions.find((opt) => opt.value === val);
      if (!option?.children) return [];
      currentOptions = option.children;
    }
    return currentOptions;
  };

  const getSelectedOptions = (path: string[]): CascaderOption[] => {
    const result: CascaderOption[] = [];
    let currentOptions = options;
    
    for (const val of path) {
      const option = currentOptions.find((opt) => opt.value === val);
      if (!option) break;
      result.push(option);
      if (option.children) {
        currentOptions = option.children;
      }
    }
    
    return result;
  };

  const displayValue = React.useMemo(() => {
    if (value.length === 0) return placeholder;
    const selectedOptions = getSelectedOptions(value);
    const labels = selectedOptions.map((opt) => opt.label);
    return displayRender ? displayRender(labels) : labels.join(' / ');
  }, [value, options, placeholder, displayRender]);

  const handleSelect = (newValue: string, level: number) => {
    const newPath = [...activeValue.slice(0, level), newValue];
    setActiveValue(newPath);

    const currentOptions = getOptionsByPath(newPath.slice(0, -1));
    const selectedOption = currentOptions.find((opt) => opt.value === newValue);

    if (!selectedOption) return;

    if (!selectedOption.children || changeOnSelect) {
      onChange?.(newPath, getSelectedOptions(newPath));
      if (!selectedOption.children) {
        setOpen(false);
        setActiveValue([]);
      }
    }
  };

  const handleMouseEnter = (optionValue: string, level: number) => {
    if (expandTrigger === 'hover') {
      const newPath = [...activeValue.slice(0, level), optionValue];
      setHoveredPath(newPath);
    }
  };

  const displayPath = expandTrigger === 'hover' && hoveredPath.length > activeValue.length
    ? hoveredPath
    : activeValue;

  const renderColumn = (currentOptions: CascaderOption[], level: number) => {
    const currentValue = displayPath[level];

    return (
      <div className="flex-shrink-0 w-48 border-r last:border-r-0">
        <ScrollArea className="h-[300px]">
          <div className="p-1">
            {currentOptions.map((option) => {
              const isSelected = currentValue === option.value;
              const hasChildren = option.children && option.children.length > 0;

              return (
                <button
                  key={option.value}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors',
                    'hover:bg-gray-100 dark:hover:bg-gray-800',
                    isSelected && 'bg-gray-100 dark:bg-gray-800',
                    option.disabled && 'opacity-50 cursor-not-allowed'
                  )}
                  onClick={() => !option.disabled && handleSelect(option.value, level)}
                  onMouseEnter={() => !option.disabled && handleMouseEnter(option.value, level)}
                  disabled={option.disabled}
                >
                  <span className="flex-1 text-left truncate">{option.label}</span>
                  {hasChildren && <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted-foreground" />}
                  {!hasChildren && value.includes(option.value) && (
                    <Check className="h-4 w-4 flex-shrink-0 text-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    );
  };

  const columns: JSX.Element[] = [];
  let currentOptions = options;
  let level = 0;

  while (currentOptions.length > 0) {
    columns.push(renderColumn(currentOptions, level));
    
    if (level >= displayPath.length) break;
    
    const selectedOption = currentOptions.find(
      (opt) => opt.value === displayPath[level]
    );
    
    if (!selectedOption?.children) break;
    
    currentOptions = selectedOption.children;
    level++;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full justify-between', className)}
          disabled={disabled}
        >
          <span className="truncate">{displayValue}</span>
          <ChevronRight className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        {showSearch && (
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Buscar..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        )}
        <div className="flex">
          {columns}
        </div>
      </PopoverContent>
    </Popover>
  );
}