import { format, isValid } from 'date-fns';
import { es } from 'date-fns/locale';
import React from 'react';

export interface KTableDateCellProps {
  value: Date | string | number | null | undefined;
  dateFormat?: string;
  fallbackText?: string;
}

/**
 * Utilitario de formateo agnóstico de fechas para Datatables.
 * Implementa date-fns internamente para una DX (Developer Experience)
 * sin fricciones y libre de dependencias al momento de definir las columnas.
 */
export function KTableDateCell({
  value,
  dateFormat = "dd/MM/yyyy",
  fallbackText = "-"
}: KTableDateCellProps) {
  if (!value) return <span className="text-[var(--khor-neutral-400)] text-sm">{fallbackText}</span>;

  let parsedDate: Date;
  
  if (value instanceof Date) {
    parsedDate = value;
  } else {
    parsedDate = new Date(value);
  }

  if (!isValid(parsedDate)) {
    return <span className="text-red-500 font-medium text-sm" title="Fecha inválida">Invalida</span>;
  }

  return (
    <span className="text-sm font-medium text-[var(--khor-neutral-700)]">
      {format(parsedDate, dateFormat, { locale: es })}
    </span>
  );
}
