import * as React from 'react';
import { X, Check } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './utils';

const tagVariants = cva(
  'inline-flex items-center gap-1.5 rounded-md px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
        success: 'bg-green-500 text-white hover:bg-green-600',
        warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
        info: 'bg-blue-500 text-white hover:bg-blue-600',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        purple: 'bg-purple-500 text-white hover:bg-purple-600',
        pink: 'bg-pink-500 text-white hover:bg-pink-600',
        orange: 'bg-orange-500 text-white hover:bg-orange-600',
      },
      size: {
        small: 'text-xs px-2 py-0.5',
        middle: 'text-sm px-2.5 py-0.5',
        large: 'text-base px-3 py-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'middle',
    },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  closable?: boolean;
  onClose?: () => void;
  checkable?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  icon?: React.ReactNode;
}

export function Tag({
  className,
  variant,
  size,
  closable = false,
  onClose,
  checkable = false,
  checked = false,
  onCheckedChange,
  icon,
  children,
  ...props
}: TagProps) {
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose?.();
  };

  const handleClick = () => {
    if (checkable) {
      onCheckedChange?.(!checked);
    }
  };

  return (
    <span
      className={cn(
        tagVariants({ variant, size }),
        checkable && 'cursor-pointer select-none',
        checkable && checked && 'ring-2 ring-ring ring-offset-2',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {checkable && checked && <Check className="h-3 w-3" />}
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="truncate">{children}</span>
      {closable && (
        <button
          type="button"
          className="flex-shrink-0 ml-0.5 hover:opacity-70 focus:outline-none"
          onClick={handleClose}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
}

export interface TagGroupProps {
  children: React.ReactNode;
  className?: string;
  wrap?: boolean;
}

export function TagGroup({ children, className, wrap = true }: TagGroupProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2',
        wrap && 'flex-wrap',
        className
      )}
    >
      {children}
    </div>
  );
}

export interface TagInputProps {
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  variant?: VariantProps<typeof tagVariants>['variant'];
  className?: string;
}

export function TagInput({
  value = [],
  onChange,
  placeholder = 'Agregar tag...',
  maxTags,
  variant = 'default',
  className,
}: TagInputProps) {
  const [inputValue, setInputValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!maxTags || value.length < maxTags) {
        if (!value.includes(inputValue.trim())) {
          onChange?.([...value, inputValue.trim()]);
        }
        setInputValue('');
      }
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      onChange?.(value.slice(0, -1));
    }
  };

  const handleRemove = (index: number) => {
    onChange?.(value.filter((_, i) => i !== index));
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
        className
      )}
      onClick={handleContainerClick}
    >
      {value.map((tag, index) => (
        <Tag
          key={index}
          variant={variant}
          closable
          onClose={() => handleRemove(index)}
        >
          {tag}
        </Tag>
      ))}
      {(!maxTags || value.length < maxTags) && (
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] bg-transparent outline-none placeholder:text-muted-foreground"
        />
      )}
    </div>
  );
}
