import React, { useState } from 'react';
import { Column, Table } from '@tanstack/react-table';
import { Plus, X, Filter, Trash2, Check } from 'lucide-react';
import { KButton } from '../../../atoms/KButton';
import { KInput } from '../../../atoms/KInput';
import { KSelectAdvanced } from '../../../molecules/KSelectAdvanced';
import { KText } from '../../../atoms/KText';
import { cn } from '../../../../../../imports/utils';

interface KGridFilterPanelProps<TData> {
  table: Table<TData>;
  onClose?: () => void;
}

const OPERATORS = [
  { label: 'Contiene', value: 'contains' },
  { label: 'Es igual a', value: 'equals' },
  { label: 'Empieza con', value: 'startsWith' },
  { label: 'Termina con', value: 'endsWith' },
  { label: 'Es mayor que', value: 'gt' },
  { label: 'Es menor que', value: 'lt' },
];

export function KGridFilterPanel<TData>({ table, onClose }: KGridFilterPanelProps<TData>) {
  const columns = table.getAllColumns().filter(col => col.getCanFilter());
  const [filters, setFilters] = useState(table.getState().columnFilters);

  const addFilter = () => {
    if (columns.length > 0) {
      setFilters([...filters, { id: columns[0].id, value: '' }]);
    }
  };

  const removeFilter = (index: number) => {
    const next = [...filters];
    next.splice(index, 1);
    setFilters(next);
  };

  const updateFilter = (index: number, id: string, value: any) => {
    const next = [...filters];
    next[index] = { id, value };
    setFilters(next);
  };

  const applyFilters = () => {
    table.setColumnFilters(filters);
    onClose?.();
  };

  return (
    <div className="flex flex-col w-[400px] bg-khor-surface-card rounded-lg shadow-xl border border-khor-border-default overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-khor-border-default bg-khor-neutral-50">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-khor-primary" />
          <KText variant="h4" className="text-khor-brand-navy">Filtros Avanzados</KText>
        </div>
        <KButton size="icon" variant="ghost" onClick={onClose}><X size={16} /></KButton>
      </div>

      <div className="p-4 flex flex-col gap-3 max-h-[400px] overflow-auto">
        {filters.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-12 h-12 rounded-full bg-khor-neutral-100 flex items-center justify-center mb-3">
              <Filter size={20} className="text-khor-neutral-400" />
            </div>
            <KText variant="small" className="text-khor-text-secondary">No hay filtros activos</KText>
          </div>
        ) : (
          filters.map((filter, index) => (
            <div key={index} className="flex items-start gap-2 p-3 bg-khor-neutral-50 rounded-md border border-khor-border-default group">
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex gap-2">
                  <div className="w-1/2">
                    <KSelectAdvanced
                      value={filter.id}
                      onChange={(val) => updateFilter(index, val, filter.value)}
                      placeholder="Columna"
                      options={columns.map(col => ({
                        value: col.id,
                        label: String(col.columnDef.header || col.id)
                      }))}
                    />
                  </div>
                  <div className="w-1/2">
                    <KSelectAdvanced
                      value="contains" // Simplified for now
                      placeholder="Operador"
                      options={OPERATORS}
                    />
                  </div>
                </div>
                <KInput 
                  value={filter.value as string}
                  onChange={(e) => updateFilter(index, filter.id, e.target.value)}
                  placeholder="Valor..."
                  className="bg-white"
                />
              </div>
              <KButton 
                size="icon" 
                variant="ghost" 
                className="text-khor-neutral-400 hover:text-khor-action-danger mt-1"
                onClick={() => removeFilter(index)}
              >
                <Trash2 size={14} />
              </KButton>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-khor-border-default flex items-center justify-between bg-khor-neutral-50">
        <KButton 
          variant="outline" 
          size="sm" 
          icon={<Plus size={14} />}
          onClick={addFilter}
        >
          Añadir Filtro
        </KButton>
        <div className="flex gap-2">
          <KButton 
            variant="ghost" 
            size="sm"
            onClick={() => setFilters([])}
          >
            Limpiar todo
          </KButton>
          <KButton 
            variant="primary" 
            size="sm"
            icon={<Check size={14} />}
            onClick={applyFilters}
          >
            Aplicar
          </KButton>
        </div>
      </div>
    </div>
  );
}
