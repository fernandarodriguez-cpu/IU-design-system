import React from 'react';
import { Row } from 'antd';
import type { RowProps } from 'antd';

export interface KRowProps extends RowProps {}

/**
 * KRow: Componente de fila para el sistema de rejilla (Grid System).
 * Actúa como contenedor Flex para KCol con soporte de espaciado (gutter).
 */
export function KRow(props: KRowProps) {
  return <Row {...props} />;
}

export default KRow;
