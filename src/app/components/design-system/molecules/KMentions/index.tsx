import React from 'react';
import { Mentions } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KMentions — Sistema de menciones (Wave 3)
   ═══════════════════════════════════════════════ */
export interface KMentionOption { value: string; label: string; avatar?: string; }

export interface KMentionsProps {
  value?: string;
  onChange?: (value: string) => void;
  options: KMentionOption[];
  placeholder?: string;
  trigger?: string;
  disabled?: boolean;
  autoSize?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function KMentions({ value, onChange, options, placeholder = 'Escribe @ para mencionar...', trigger = '@', disabled, autoSize = true, className, style }: KMentionsProps) {
  return (
    <Mentions
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      prefix={trigger}
      disabled={disabled}
      autoSize={autoSize}
      className={className}
      style={{ width: '100%', fontFamily: font, ...style }}
      options={options.map(opt => ({
        key: opt.value,
        value: opt.value,
        label: (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {opt.avatar && <img src={opt.avatar} alt="" style={{ width: 20, height: 20, borderRadius: '50%' }} />}
            <span>{opt.label}</span>
          </div>
        )
      }))}
    />
  );
}

export default KMentions;
