import { ColumnDef, SortingState, ColumnFiltersState, VisibilityState, RowSelectionState } from '@tanstack/react-table';

export interface KDataGridProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  loading?: boolean;
  
  // Customization
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  
  // Grid Features
  enableColumnResizing?: boolean;
  enableColumnReordering?: boolean;
  enableFilters?: boolean;
  enableSorting?: boolean;
  enableRowSelection?: boolean;
  enableMultiSorting?: boolean;
  
  // Performance
  virtualized?: boolean;
  rowHeight?: number;
  
  // Editing
  enableEditing?: boolean;
  onCellValueChange?: (row: TData, columnId: string, value: any) => void;
  
  // Persistence/State
  initialSorting?: SortingState;
  initialFilters?: ColumnFiltersState;
  onSortingChange?: (sorting: SortingState) => void;
  onFilterChange?: (filters: ColumnFiltersState) => void;
  onSelectionChange?: (selectedRows: TData[]) => void;
  
  // UI
  size?: 'sm' | 'md' | 'lg';
  theme?: 'default' | 'compact' | 'bordered';
  maxHeight?: string | number;
  className?: string;
}

export interface KDataGridColumnMeta {
  filterType?: 'text' | 'select' | 'number' | 'date';
  filterOptions?: { label: string; value: any }[];
  sticky?: 'left' | 'right';
  resizable?: boolean;
}
