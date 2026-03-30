import React from 'react';
import { Input } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KTextAreaProps extends Omit<React.ComponentProps<typeof Input.TextArea>, 'size'> {
  error?: string;
}

/**
 * KTextArea: Input multilínea estilizado.
 * Refinado para evitar fugas de props al DOM (variant, size, fullWidth).
 */
export const KTextArea = React.forwardRef<HTMLTextAreaElement, KTextAreaProps & { variant?: any, size?: any, fullWidth?: any }>(
  function KTextArea(
    { error, status, style, variant, size, fullWidth, ...rest },
    ref,
  ) {
    return (
      <div>
        <Input.TextArea
          ref={ref as any}
          status={error ? 'error' : status}
          style={{ 
            fontFamily: font, 
            borderRadius: t.radius.md, 
            fontSize: 14, 
            ...style 
          }}
          {...rest}
        />
        {error && (
          <p style={{ 
            color: t.colors.feedback.error, 
            fontSize: 12, 
            marginTop: 4, 
            fontFamily: font 
          }}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

export default KTextArea;
