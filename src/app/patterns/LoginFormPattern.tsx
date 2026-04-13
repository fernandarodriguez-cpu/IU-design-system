import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { KInput } from '../components/design-system/atoms/KInput/index';
import { KButton } from '../components/design-system/atoms/KButton/index';
import { KCheckbox } from '../components/design-system/atoms/KCheckbox/index';
import { KFormField } from '../components/design-system/molecules/KFormField/index';
import { khorTokens } from '../theme/khor-theme';
import { Pattern } from './types';

const t = khorTokens;

function LoginFormInternal() {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const font = t.typography.fontPrimary;

  return (
    <div style={{ 
      maxWidth: t.sizing[64] * 5.625, margin: '0 auto', 
      padding: t.spacing.xl, borderRadius: t.radius.xl, 
      backgroundColor: t.semantic.surface.card, boxShadow: t.shadows.lg, 
      border: `1px solid ${t.semantic.border.default}`,
      fontFamily: font
    }}>
      <div style={{ textAlign: 'center', marginBottom: t.spacing.lg }}>
        <div style={{ width: t.sizing[12], height: t.sizing[12], borderRadius: t.radius.md, backgroundColor: t.colors.brand.primary, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: t.colors.feedback.white, fontWeight: t.typography.fontWeights.bold, fontSize: t.typography.h4.size, marginBottom: t.spacing.sm }}>K</div>
        <h3 style={{ margin: 0, fontSize: t.typography.h4.size, fontWeight: t.typography.fontWeights.semibold, color: t.semantic.text.primary }}>Iniciar Sesión</h3>
        <p style={{ margin: `${t.spacing.xs}px 0 0`, fontSize: t.typography.bodySm.size, color: t.semantic.text.muted }}>Ingresa tus credenciales</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: t.spacing.md }}>
        <KFormField label="Email">
          <KInput placeholder="tu@empresa.com" prefix={<Mail size={t.icon.sm} />} />
        </KFormField>
        <KFormField label="Contraseña">
          <KInput type={show ? 'text' : 'password'} placeholder="••••••••" prefix={<Lock size={t.icon.sm} />}
            suffix={<button onClick={() => setShow(!show)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.semantic.text.muted, display: 'flex' }}>{show ? <EyeOff size={t.icon.sm} /> : <Eye size={t.icon.sm} />}</button>}
          />
        </KFormField>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <KCheckbox label="Recordarme" />
          <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: t.typography.bodySm.size, color: t.colors.brand.primary, textDecoration: 'none', fontWeight: t.typography.fontWeights.medium }}>Olvidé mi contraseña</a>
        </div>
        <KButton variant="primary" size="lg" style={{ width: '100%' }}>Iniciar Sesión</KButton>
      </div>
    </div>
  );
}

export const LoginFormPattern: Pattern = {
  id: 'login-form',
  title: 'Login con Branding',
  description: 'Formulario de login con logo Khor, toggle de visibilidad de contraseña, checkbox y link de recuperación.',
  category: 'Auth',
  component: <LoginPatternComponent />,
  code: `import { KFormField } from '@khor/molecules';
import { KInput, KButton, KCheckbox } from '@khor/atoms';

// Login form con branding
<KFormField label="Email">
  <KInput placeholder="tu@empresa.com" prefix={<Mail size={16} />} />
</KFormField>
<KFormField label="Contraseña">
  <KInput type={show ? 'text' : 'password'}
    placeholder="••••••••" prefix={<Lock size={16} />}
    suffix={<EyeToggle />}
  />
</KFormField>
<KButton variant="primary" size="lg">Iniciar Sesión</KButton>`,
};
