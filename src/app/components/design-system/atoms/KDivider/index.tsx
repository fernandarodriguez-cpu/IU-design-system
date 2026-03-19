import React from 'react';
import { Divider } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;

export function KDivider(props: React.ComponentProps<typeof Divider>) {
  return <Divider style={{ borderColor: t.colors.neutral[200], ...props.style }} {...props} />;
}

export default KDivider;
