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
/**
 * @figma-mcp-migration
 * Component: KTableDateCell
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
export function KTableDateCell({
  value,
  dateFormat = "dd/MM/yyyy",
  fallbackText = "-"
}: KTableDateCellProps) {
  if (!value) return <span className="text-khor-neutral-400 text-sm">{fallbackText}</span>;

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
    <span className="text-sm font-medium text-khor-neutral-700">
      {format(parsedDate, dateFormat, { locale: es })}
    </span>
  );
}
