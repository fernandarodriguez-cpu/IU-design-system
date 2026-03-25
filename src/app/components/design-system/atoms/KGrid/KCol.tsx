import React from 'react';
import { Col } from 'antd';
import type { ColProps } from 'antd';

export interface KColProps extends ColProps {}

/**
 * KCol: Componente de columna para el sistema de rejilla (Grid System).
 * Soporta anchos fijos, responsivos (xs, sm, md, lg, xl, xxl) y offsets.
 */
export function KCol(props: KColProps) {
  return <Col {...props} />;
}

export default KCol;
