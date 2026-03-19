import React from 'react';
import { Segmented } from 'antd';
import type { SegmentedProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KSegmented — Control segmentado tipo iOS
   ═══════════════════════════════════════════════ */
export interface KSegmentedProps extends Omit<SegmentedProps, 'size'> {
  size?: 'sm' | 'md' | 'lg';
}

export function KSegmented({ options, value, onChange, block, disabled, size = 'md', className }: KSegmentedProps) {
  const antdSize = size === 'sm' ? 'small' : size === 'lg' ? 'large' : 'middle';

  const mappedOptions = options?.map(opt => {
    if (typeof opt === 'string' || typeof opt === 'number') {
      return { label: opt, value: opt };
    }
    const o = opt as any;
    return {
      label: o.icon ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {o.icon}
          {o.label}
        </div>
      ) : o.label,
      value: o.value,
      disabled: o.disabled,
    };
  });

  return (
    <div className={className} style={{ display: block ? 'block' : 'inline-block' }}>
      <Segmented
        options={mappedOptions}
        value={value}
        onChange={onChange}
        block={block}
        disabled={disabled}
        size={antdSize}
        style={{ fontFamily: font, backgroundColor: t.colors.neutral[100], padding: 3, borderRadius: t.radius.md }}
        className="khor-ant-segmented"
      />
    </div>
  );
}

export default KSegmented;
