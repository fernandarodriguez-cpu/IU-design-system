import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Trash2, Plus } from 'lucide-react';
import { cn } from '@/utils/cn';
import { KButton } from '../../atoms/KButton';

export interface KFormListField {
  id: string; // React Hook Form's unique ID
  name: string; // The base name for the row
  index: number;
  isFirst: boolean;
  isLast: boolean;
}

export interface KFormListProps {
  name: string;
  addText?: string;
  maxItems?: number;
  minItems?: number;
  renderItem: (field: KFormListField, index: number, operations: { remove: (index: number) => void; move: (from: number, to: number) => void }) => React.ReactNode;
  className?: string;
}

/**
 * KFormList — Gestor dinámico de arreglos de campos (Total Headless)
 * Basado en React Hook Form useFieldArray y Tailwind CSS v4.
 * Requiere ser usado dentro de un FormProvider.
 */
/**
 * @figma-mcp-migration
 * Component: KFormList
 * 
 * INSTRUCCIONES PARA AGENTES DE IA (VS Code / MCP):
 * Para migrar este componente a Figma, NO generar una matriz multiplicando todas las variables.
 * Utilizar Figma Component Properties V2 con la siguiente estructura:
 * 
 * 1. Variants (Estructurales):
 *    - Definir variantes puramente visuales/estructurales.
 * 2. Booleans (Encendido/Apagado):
 *    - Definir encendido/apagado para iconos o estados (isLoading, hasIcon).
 * 3. Color Variables (No usar variantes para colores semánticos):
 *    - El relleno/borde debe usar Figma Variables (Khor v6.0 Colors) asignado dinámicamente.
 *    - El consumidor del UI Kit cambiará el color del layer.
 */
export function KFormList({
  name,
  addText = 'Agregar item',
  maxItems,
  minItems = 0,
  renderItem,
  className,
}: KFormListProps) {
  const { control } = useFormContext(); // Asume que existe un contexto de RHF
  const { fields, append, remove, move } = useFieldArray({
    control,
    name,
  });

  const handleAdd = () => {
    if (maxItems && fields.length >= maxItems) return;
    append({}); // Agrega un objeto vacío por defecto
  };

  return (
    <div className={cn("flex flex-col gap-4 font-primary", className)}>
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div 
            key={field.id} 
            className="flex items-start gap-4 p-4 border border-khor-neutral-200 rounded-xl bg-khor-surface-page shadow-sm animate-in fade-in slide-in-from-top-2 duration-300"
          >
            <div className="flex-1 min-w-0">
              {renderItem(
                { 
                  id: field.id, 
                  name: `${name}.${index}`, 
                  index, 
                  isFirst: index === 0, 
                  isLast: index === fields.length - 1 
                },
                index,
                { remove, move }
              )}
            </div>
            
            {fields.length > minItems && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="mt-1 p-2 text-khor-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                title="Eliminar item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      <KButton
        type="button"
        variant="neutral"
        onClick={handleAdd}
        disabled={maxItems ? fields.length >= maxItems : false}
        className="w-full border-dashed border-2 py-6 flex items-center justify-center gap-2 hover:border-khor-primary hover:bg-khor-primary-light/5 group"
      >
        <Plus className="w-4 h-4 text-khor-neutral-400 group-hover:text-khor-primary" />
        <span className="font-bold text-khor-neutral-600 group-hover:text-khor-primary uppercase tracking-wider">
          {addText}
        </span>
      </KButton>

      {(maxItems || minItems > 0) && (
        <div className="text-[10px] font-bold text-khor-neutral-400 uppercase tracking-widest text-right px-1">
          {fields.length} / {maxItems || '∞'} Items {minItems > 0 && `(Min Requerido: ${minItems})`}
        </div>
      )}
    </div>
  );
}

export default KFormList;
