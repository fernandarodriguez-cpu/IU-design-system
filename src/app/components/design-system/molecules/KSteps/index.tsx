import React from 'react';
import { Steps } from 'antd';
import type { StepsProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KStepsProps extends StepsProps { }

export function KSteps({ style, ...rest }: KStepsProps) {
  return (
    <Steps
      style={{
        fontFamily: font,
        ...style
      }}
      {...rest}
    />
  );
}

export default KSteps;
