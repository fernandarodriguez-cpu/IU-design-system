import React from 'react';
import { Search, Filter } from 'lucide-react';
import { KInput, KInputProps } from './index';
import { KButton } from '../KButton';
import { cn } from '@/utils/cn';

export interface KInputSearchProps extends KInputProps {
  /** Texto del botón de búsqueda o nodo personalizado */
  enterButton?: boolean | React.ReactNode;
  /** Estado de carga de la búsqueda */
  loading?: boolean;
  /** Callback cuando se acciona la búsqueda */
  onSearch?: (value: string, event?: React.MouseEvent | React.KeyboardEvent) => void;
  /** Botón de filtro a la derecha del input. `true` muestra el botón por defecto, o pasa un ReactNode personalizado */
  filterButton?: boolean | React.ReactNode;
}

export const KInputSearch = React.forwardRef<HTMLInputElement, KInputSearchProps>(function KInputSearch(
  { enterButton, loading, onSearch, suffix, filterButton, size = 'md', ...rest },
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
      variant="navy"
      loading={loading}
      onClick={handleSearch}
      disabled={rest.disabled}
      className={cn(
        "rounded-l-none border-l-0",
        size === 'sm' ? "h-[var(--khor-density-height-sm)]" : size === 'lg' ? "h-[var(--khor-density-height-lg)]" : "h-[var(--khor-density-height-md)]"
      )}
    >
      {enterButton === true ? searchIcon : enterButton}
    </KButton>
  ) : null;

  // Only pass suffix to KInput when needed — an empty suffix would wrongly zero out right padding
  const hasSuffix = !enterButton || !!suffix;

  const inputNode = (
    <KInput
      {...rest}
      ref={inputRef}
      size={size}
      onKeyDown={onKeyDown}
      onClear={() => {
        onSearch?.('');
        rest.onClear?.();
      }}
      suffix={hasSuffix ? (
        <div className="flex items-center">
          {suffix && <div className="flex items-center pr-2">{suffix}</div>}
          {!enterButton && (
            <div
              className={cn(
                "flex items-center justify-center border-l border-[#D1D5DB] px-3 cursor-pointer hover:text-khor-primary transition-colors",
                size === 'sm' ? 'h-8' : size === 'lg' ? 'h-10' : 'h-9',
                loading && "animate-pulse"
              )}
              onClick={handleSearch}
            >
              {searchIcon}
            </div>
          )}
        </div>
      ) : undefined}
      addonAfter={addonAfter || rest.addonAfter}
    />
  );

  if (filterButton) {
    const filterEl = filterButton === true
      ? (
        <KButton
          variant="navy"
          size="icon"
          icon={<Filter size={16} />}
        />
      )
      : filterButton;

    return (
      <div className={cn('flex items-center gap-2', rest.block && 'w-full')}>
        {rest.block ? <div className="flex-1">{inputNode}</div> : inputNode}
        {filterEl}
      </div>
    );
  }

  return inputNode;
});

KInputSearch.displayName = "KInput.Search";
