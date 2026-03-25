import React from 'react';
import { Flex } from 'antd';
import type { FlexProps } from 'antd';

export interface KFlexProps extends FlexProps {}

/**
 * KFlex: Utilidad moderna de layout basada en Flexbox.
 * Wrapper del componente Flex de Ant Design.
 */
export function KFlex(props: KFlexProps) {
  return <Flex {...props} />;
}

export default KFlex;
