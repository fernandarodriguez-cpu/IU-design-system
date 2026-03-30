import React from 'react';
import { Button } from 'antd';
import type { ButtonProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';
import type { KButtonProps, KButtonVariant, KButtonSize } from './types';

const t = khorTokens;
const font = t.typography.fontPrimary;

const variantToAntd = (variant: KButtonVariant): { type?: ButtonProps['type']; danger?: boolean; ghost?: boolean } => {
  switch (variant) {
    case 'primary': return { type: 'primary' };
    case 'secondary': return { type: 'default' };
    case 'outline': return { type: 'default', ghost: true };
    case 'ghost': return { type: 'text' };
    case 'danger': return { type: 'primary', danger: true };
    case 'navy': return { type: 'primary' };
    case 'dashed': return { type: 'dashed' };
    case 'link': return { type: 'link' };
    case 'text': return { type: 'text' };
    default: return { type: 'default' };
  }
};

const sizeToAntd = (size?: KButtonSize): ButtonProps['size'] => {
  if (size === 'sm') return 'small';
  if (size === 'lg') return 'large';
  return 'middle';
};

export const KButton = React.forwardRef<HTMLButtonElement, KButtonProps>(function KButton(
  { 
    variant, kVariant, size = 'md', shape = 'default', 
    htmlType = 'button', style, children, className,
    fullWidth, ...rest 
  },
  ref,
) {
  const resolvedVariant = kVariant ?? variant ?? 'primary';
  const antdProps = variantToAntd(resolvedVariant);
  const navyStyle = resolvedVariant === 'navy'
    ? { backgroundColor: t.colors.brand.navy, borderColor: t.colors.brand.navy }
    : {};

  // Inyectar w-full si fullWidth es verdadero (Tailwind v4)
  const combinedClassName = `${fullWidth ? 'w-full' : ''} ${className || ''}`.trim();

  return (
    <Button
      ref={ref}
      {...antdProps}
      size={sizeToAntd(size)}
      shape={shape}
      htmlType={htmlType}
      className={combinedClassName}
      style={{ 
        fontFamily: font, 
        borderRadius: shape === 'default' ? 'var(--khor-density-radius)' : undefined, 
        height: 'var(--khor-density-height-input)', 
        fontSize: 'var(--khor-density-font-body)',
        paddingLeft: 'var(--khor-density-spacing-md)',
        paddingRight: 'var(--khor-density-spacing-md)',
        ...navyStyle, 
        ...style 
      }}
      {...rest}
    >
      {children}
    </Button>
  );
});

export default KButton;
