import React from 'react';
import { Radio as AntRadio, type RadioGroupProps as AntRadioGroupProps, type RadioProps as AntRadioProps } from 'antd';
import { cn } from '@/utils/cn';

/* ─── Figma tokens: Radio-Group (187730-25772) ─────────────────
   Migrated to Ant Design (was @radix-ui/react-radio-group).
   Selected ring + dot #E04D36 (secondary) and sizing come from the
   Radio tokens in khorAntdTheme.ts. `direction="vertical"` is a Khor
   extension implemented as a flex-column className override.
──────────────────────────────────────────────────────────────── */

export interface KRadioGroupOptions {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
}

export interface KRadioGroupProps
  extends Omit<AntRadioGroupProps, 'options' | 'size' | 'onChange'> {
  options?: Array<KRadioGroupOptions | string>;
  direction?: 'horizontal' | 'vertical';
  optionType?: 'default' | 'button';
  buttonStyle?: 'outline' | 'solid';
  size?: 'sm' | 'md' | 'lg' | 'small' | 'middle' | 'large';
  disabled?: boolean;
  name?: string;
  /** Radix-compatible change handler kept for back-compat */
  onValueChange?: (value: string) => void;
  onChange?: AntRadioGroupProps['onChange'];
}

export interface KRadioProps extends AntRadioProps {
  isHovered?: boolean;
  isFocused?: boolean;
}

export interface KRadioButtonProps extends KRadioProps {}

const SIZE_MAP: Record<string, 'small' | 'middle' | 'large'> = {
  sm: 'small',
  small: 'small',
  md: 'middle',
  middle: 'middle',
  lg: 'large',
  large: 'large',
};

const InternalRadioGroup = React.forwardRef<HTMLDivElement, KRadioGroupProps>(function Group(
  {
    className,
    options,
    direction = 'horizontal',
    optionType = 'default',
    buttonStyle = 'outline',
    size = 'md',
    disabled = false,
    children,
    name,
    onValueChange,
    onChange,
    ...rest
  },
  ref,
) {
  const normalizedOptions = options?.map((opt) =>
    typeof opt === 'string' ? { label: opt, value: opt } : opt,
  );

  return (
    <AntRadio.Group
      ref={ref as any}
      name={name}
      disabled={disabled}
      optionType={optionType}
      buttonStyle={buttonStyle}
      size={SIZE_MAP[size] ?? 'middle'}
      onChange={(e) => {
        onValueChange?.(e.target.value);
        onChange?.(e);
      }}
      className={cn(
        'font-primary',
        direction === 'vertical' && 'inline-flex flex-col gap-2 [&_.ant-radio-wrapper]:mr-0',
        className,
      )}
      {...(normalizedOptions ? { options: normalizedOptions as any } : {})}
      {...rest}
    >
      {!normalizedOptions ? children : undefined}
    </AntRadio.Group>
  );
});

const InternalRadio = React.forwardRef<HTMLElement, KRadioProps>(function Radio(
  { className, children, isHovered, isFocused, ...rest },
  ref,
) {
  return (
    <AntRadio
      ref={ref as any}
      className={cn(
        'font-primary',
        isHovered && '[&_.ant-radio-inner]:border-[#E04D36]',
        isFocused && '[&_.ant-radio-inner]:!border-[#E04D36]',
        className,
      )}
      {...rest}
    >
      {children}
    </AntRadio>
  );
});

const KRadioButton = React.forwardRef<HTMLElement, KRadioButtonProps>(function RadioButton(
  { className, children, isHovered, isFocused, ...rest },
  ref,
) {
  return (
    <AntRadio.Button
      ref={ref as any}
      className={cn('font-primary font-medium', className)}
      {...rest}
    >
      {children}
    </AntRadio.Button>
  );
});

type KRadioComponent = typeof InternalRadio & {
  Group: typeof InternalRadioGroup;
  Button: typeof KRadioButton;
};

export const KRadio = InternalRadio as KRadioComponent;
KRadio.Group = InternalRadioGroup;
KRadio.Button = KRadioButton;

KRadio.displayName = 'KRadio';
InternalRadioGroup.displayName = 'KRadio.Group';
KRadioButton.displayName = 'KRadio.Button';

export default KRadio;
