import React from 'react';
import {
  Mentions as AntMentions,
  type MentionProps as AntMentionProps,
  type MentionsRef as AntMentionsRef,
} from 'antd';
import { cn } from '@/utils/cn';

/* ─── KMentions ────────────────────────────────────────────────
   New Khor molecule wrapping Ant Design's Mentions. The textarea
   surface, navy primary (#051758) and control radius are themed by
   the global bridge (khorAntdTheme.ts). This wrapper only maps the
   Khor public API onto AntD and keeps `font-primary`.
──────────────────────────────────────────────────────────────── */

export interface KMentionsOption {
  value: string;
  label?: React.ReactNode;
  disabled?: boolean;
  [key: string]: any;
}

export interface KMentionsProps
  extends Omit<AntMentionProps, 'options' | 'onChange' | 'onSelect'> {
  /** Data-driven options. Alternatively pass <KMentions.Option> children. */
  options?: KMentionsOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSelect?: AntMentionProps['onSelect'];
  /** Trigger character(s), e.g. '@' or ['@', '#']. */
  prefix?: string | string[];
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  status?: 'error' | 'warning';
  children?: React.ReactNode;
}

const KMentionsInternal = React.forwardRef<AntMentionsRef, KMentionsProps>(
  function KMentions(
    {
      className,
      options,
      value,
      defaultValue,
      onChange,
      onSelect,
      prefix,
      placeholder,
      rows,
      disabled,
      status,
      children,
      ...rest
    },
    ref,
  ) {
    return (
      <AntMentions
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        onChange={(val) => onChange?.(val)}
        onSelect={onSelect}
        prefix={prefix}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        status={status}
        className={cn('font-primary', className)}
        {...(options ? { options: options as any } : {})}
        {...rest}
      >
        {!options ? children : undefined}
      </AntMentions>
    );
  },
);

type CompoundedComponent = typeof KMentionsInternal & {
  Option: typeof AntMentions.Option;
  getMentions: typeof AntMentions.getMentions;
};

export const KMentions = KMentionsInternal as CompoundedComponent;
KMentions.Option = AntMentions.Option;
KMentions.getMentions = AntMentions.getMentions;

KMentions.displayName = 'KMentions';

export default KMentions;
