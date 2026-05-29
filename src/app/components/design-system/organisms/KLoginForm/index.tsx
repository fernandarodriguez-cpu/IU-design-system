import React from 'react';
import { KForm, KFormItem, useKForm } from '../KForm/index';
import { KInput } from '../../atoms/KInput';
import { KButton } from '../../atoms/KButton';
import { KText } from '../../atoms/KText';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;

export interface KLoginFormProps {
  onFinish?: (values: any) => void;
  loading?: boolean;
}

/**
 * @figma-mcp-migration
 * Component: KLoginForm
 * 
 * INSTRUCCIONES PARA AGENTES DE IA (VS Code / MCP):
 * Para migrar este componente a Figma, NO generar una matriz multiplicando todas las variables.
 * Utilizar Figma Component Properties V2 con la siguiente estructura:
 * 
 * 1. Variants (Estructurales):
 *    - Definir variantes puramente visuales/estructurales.
 * 2. Booleans (Encendido/Apagado):
 *    - Definir encendido/apagado para iconos o estados (isLoading, hasIcon).
 * 3. Color Variables (No usar variantes para colores semánticos):
 *    - El relleno/borde debe usar Figma Variables (Khor v6.0 Colors) asignado dinámicamente.
 *    - El consumidor del UI Kit cambiará el color del layer.
 */
export function KLoginForm({ onFinish, loading }: KLoginFormProps) {
  const form = useKForm();

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 24, backgroundColor: t.colors.neutral[50], borderRadius: t.radius.lg, border: `1px solid ${t.colors.neutral[200]}` }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <KText variant="h2" color="navy">Bienvenido</KText>
        <KText variant="body-md" color="secondary">Ingresa tus credenciales para continuar</KText>
      </div>
      <KForm methods={form} layout="vertical" onSubmit={onFinish}>
        <KForm.Field
          name="email"
          rules={{ required: 'Ingresa un email válido' }}
          render={({ field, fieldState }) => (
            <KFormItem label="Correo Electrónico" required error={fieldState.error?.message}>
              <KInput {...field} placeholder="ejemplo@khor.com" />
            </KFormItem>
          )}
        />
        <KForm.Field
          name="password"
          rules={{ required: 'Ingresa tu contraseña' }}
          render={({ field, fieldState }) => (
            <KFormItem label="Contraseña" required error={fieldState.error?.message}>
              <KInput {...field} type="password" placeholder="••••••••" />
            </KFormItem>
          )}
        />
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
