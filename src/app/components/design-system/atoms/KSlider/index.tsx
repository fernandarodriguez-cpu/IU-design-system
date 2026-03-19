import React from 'react';
import { Slider } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KSliderProps extends Omit<any, 'size'> {
  showValue?: boolean;
}

export function KSlider({ showValue, style, value, defaultValue, ...rest }: KSliderProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Slider
        value={value as any}
        defaultValue={(defaultValue !== undefined ? defaultValue : 50) as any}
        style={{ flex: 1, ...style }}
        styles={{ track: { backgroundColor: t.colors.brand.primary } }}
        {...(rest as any)}
      />
      {showValue && (
        <span style={{ fontSize: 13, color: t.colors.neutral[500], minWidth: 32, textAlign: 'right', fontFamily: font, fontWeight: 500 }}>
          {Array.isArray(value) ? value.join('-') : value}
        </span>
      )}
    </div>
  );
}

export default KSlider;
