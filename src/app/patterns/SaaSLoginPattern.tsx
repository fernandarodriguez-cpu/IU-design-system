import React from 'react';
import { Mail, Lock, LogIn, Github, Chrome } from 'lucide-react';
import { KButton, KText, KAvatar } from '../components/design-system/atoms/index';
import { khorTokens } from '../theme/khor-theme';
import { KLoginForm } from '../components/design-system/organisms/index';
import { Pattern } from './types';

const t = khorTokens;

function SaaSLoginInternal() {
  return (
    <div style={{ 
      display: 'flex', alignItems: 'center', justifyContent: 'center', 
      minHeight: 600, backgroundColor: 'var(--muted)', borderRadius: 24, padding: 40,
      fontFamily: t.typography.fontPrimary,
      backgroundImage: 'radial-gradient(circle at top right, rgba(224,77,54,0.05), transparent 40%), radial-gradient(circle at bottom left, rgba(5,23,88,0.02), transparent 40%)'
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ 
            width: 48, height: 48, borderRadius: 12, backgroundColor: t.colors.brand.primary, 
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', 
            fontWeight: 800, fontSize: 20, marginBottom: 16, boxShadow: t.shadows.md 
          }}>
            K
          </div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: 'var(--foreground)' }}>Bienvenido</h1>
          <p style={{ margin: '8px 0 0', fontSize: 15, color: 'var(--muted-foreground)' }}>Gestiona tu infraestructura con Khor V4</p>
        </div>

        {/* The Actual Form Organism */}
        <div style={{ 
          backgroundColor: 'var(--card)', padding: 32, borderRadius: 24, border: '1px solid var(--border)',
          boxShadow: t.shadows.lg 
        }}>
          <KLoginForm 
            onFinish={(v) => console.log('Login Success:', v)}
          />
        </div>

        {/* Footer Links */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <p style={{ fontSize: 13, color: 'var(--muted-foreground)' }}>
            ¿No tienes cuenta? <a href="#" style={{ color: t.colors.brand.primary, fontWeight: 700, textDecoration: 'none' }}>Solicitar Acceso</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export const SaaSLoginPattern: Pattern = {
  id: 'saas-login',
  title: 'Login Profesional SaaS',
  description: 'Interfaz de entrada de alta fidelidad con KLoginForm, autenticación social y diseño premium con gradientes sutiles.',
  category: 'SaaS',
  component: <SaaSLoginInternal />,
  code: `import { KLoginForm } from '@khor/organisms';

// Implementación simple
<KLoginForm onFinish={handleLogin} />

// Con contenedor personalizado
<div style={{ maxWidth: 420, margin: '0 auto' }}>
  <KLoginForm title="Login" />
</div>`
};
