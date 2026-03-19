import React from 'react';
import { KForm, KFormItem, useKForm } from '../KForm';
import { KInput, KButton, KText } from '../../atoms';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;

export interface KLoginFormProps {
  onFinish?: (values: any) => void;
  loading?: boolean;
}

export function KLoginForm({ onFinish, loading }: KLoginFormProps) {
  const [form] = useKForm();

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 24, backgroundColor: t.colors.neutral[50], borderRadius: t.radius.lg, border: `1px solid ${t.colors.neutral[200]}` }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <KText variant="h2" color="navy">Bienvenido</KText>
        <KText variant="body-md" color="secondary">Ingresa tus credenciales para continuar</KText>
      </div>
      <KForm form={form} layout="vertical" onFinish={onFinish}>
        <KFormItem name="email" label="Correo Electrónico" rules={[{ required: true, type: 'email', message: 'Ingresa un email válido' }]}>
          <KInput placeholder="ejemplo@khor.com" />
        </KFormItem>
        <KFormItem name="password" label="Contraseña" rules={[{ required: true, message: 'Ingresa tu contraseña' }]}>
          <KInput type="password" placeholder="••••••••" />
        </KFormItem>
        <KFormItem>
          <KButton variant="primary" block loading={loading} htmlType="submit">
            Iniciar Sesión
          </KButton>
        </KFormItem>
      </KForm>
    </div>
  );
}

export default KLoginForm;
