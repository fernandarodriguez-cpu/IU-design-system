import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { KInput } from '../components/design-system/atoms/KInput/index';
import { KButton } from '../components/design-system/atoms/KButton/index';
import { KCheckbox } from '../components/design-system/atoms/KCheckbox/index';
import { KFormField } from '../components/design-system/molecules/KFormField/index';
import { khorTokens } from '../theme/khor-theme';
import { Pattern } from './types';

const t = khorTokens;

function LoginPatternComponent() {
  const [show, setShow] = useState(false);
  return (
    <div style={{ maxWidth: 360, margin: '0 auto', padding: 32, borderRadius: t.radius.xl, backgroundColor: 'var(--card)', boxShadow: t.shadows.lg, border: '1px solid var(--border)' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: t.colors.brand.primary, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 20, marginBottom: 12 }}>K</div>
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: 'var(--foreground)' }}>Iniciar Sesión</h3>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--muted-foreground)' }}>Ingresa tus credenciales</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <KFormField label="Email">
          <KInput placeholder="tu@empresa.com" prefix={<Mail size={16} />} />
        </KFormField>
        <KFormField label="Contraseña">
          <KInput type={show ? 'text' : 'password'} placeholder="••••••••" prefix={<Lock size={16} />}
            suffix={<button onClick={() => setShow(!show)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted-foreground)', display: 'flex' }}>{show ? <EyeOff size={16} /> : <Eye size={16} />}</button>}
          />
        </KFormField>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <KCheckbox label="Recordarme" />
          <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 13, color: t.colors.brand.primary, textDecoration: 'none' }}>Olvidé mi contraseña</a>
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
