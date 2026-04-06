import React from 'react';
import { Search } from 'lucide-react';
import { KInput, KInputProps } from './index';
import { KButton } from '../KButton';
import { cn } from '../../../../../imports/utils';

export interface KInputSearchProps extends KInputProps {
  /** Texto del botón de búsqueda o nodo personalizado */
  enterButton?: boolean | React.ReactNode;
  /** Estado de carga de la búsqueda */
  loading?: boolean;
  /** Callback cuando se acciona la búsqueda */
  onSearch?: (value: string, event?: React.MouseEvent | React.KeyboardEvent) => void;
}

export const KInputSearch = React.forwardRef<HTMLInputElement, KInputSearchProps>(function KInputSearch(
  { enterButton, loading, onSearch, suffix, size = 'md', ...rest },
  ref
) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useImperativeHandle(ref, () => inputRef.current!);

  const handleSearch = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (loading || rest.disabled) return;
    onSearch?.(inputRef.current?.value || '', e);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
    rest.onKeyDown?.(e);
  };

  const searchIcon = <Search size={size === 'sm' ? 14 : 16} className="text-khor-neutral-400" />;

  // Si enterButton está presente, usamos un botón al final (addonAfter)
  const addonAfter = enterButton ? (
    <KButton
      size={size}
      variant="primary"
      loading={loading}
      onClick={handleSearch}
      disabled={rest.disabled}
      className={cn(
        "rounded-l-none border-l-0",
        size === 'sm' ? "h-8" : size === 'lg' ? "h-12" : "h-10"
      )}
    >
      {enterButton === true ? searchIcon : enterButton}
    </KButton>
  ) : null;

  return (
    <KInput
      {...rest}
      ref={inputRef}
      size={size}
      onKeyDown={onKeyDown}
      onClear={() => {
        onSearch?.('');
        rest.onClear?.();
      }}
      suffix={
        <div className="flex items-center gap-2">
          {suffix}
          {!enterButton && (
            <div 
              className={cn(
                "cursor-pointer hover:text-khor-primary transition-colors",
                loading && "animate-pulse"
              )}
              onClick={handleSearch}
            >
              {searchIcon}
            </div>
          )}
        </div>
      }
      addonAfter={addonAfter || rest.addonAfter}
    />
  );
});

KInputSearch.displayName = "KInput.Search";
