import React from 'react';
import { Form } from 'antd';
import type { FormProps, FormItemProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KForm — Sistema completo de formulario (Organismo)
   ═══════════════════════════════════════════════ */
export interface KFormProps extends FormProps {
  layout?: 'horizontal' | 'vertical' | 'inline';
}

export function KForm({ style, children, ...rest }: KFormProps) {
  return (
    <Form
      style={{ fontFamily: font, ...style }}
      {...rest}
    >
      {children as any}
    </Form>
  );
}

/** Item de formulario */
export interface KFormItemProps extends FormItemProps { }
export function KFormItem({ ...rest }: KFormItemProps) {
  return <Form.Item {...rest} />;
}

// Attach Item for convenience
KForm.Item = KFormItem;
KForm.List = Form.List;
KForm.useForm = Form.useForm;
KForm.useWatch = Form.useWatch;
KForm.useFormInstance = Form.useFormInstance;

export const useKForm = Form.useForm;
export const useKFormWatch = Form.useWatch;
export const useKFormInstance = Form.useFormInstance;

export default KForm;
