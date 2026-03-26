import React, { useState } from 'react';
import { Mail, Check, ArrowRight, DollarSign } from 'lucide-react';
import { KInput, KButton, KBadge } from '../components/design-system/atoms/index';
import { KFormField, KSteps } from '../components/design-system/molecules/index';
import { khorTokens } from '../theme/khor-theme';
import { Pattern } from './types';

const t = khorTokens;

function WizardPatternComponent() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', plan: '', cardName: '' });

  const steps = [
    { title: 'Información', description: 'Datos básicos' },
    { title: 'Plan', description: 'Elige tu plan' },
    { title: 'Pago', description: 'Método de pago' },
    { title: 'Confirmación', description: 'Verificar datos' },
  ];

  return (
    <div style={{ maxWidth: 520, margin: '0 auto' }}>
      <KSteps items={steps} current={step} />
      <div style={{ marginTop: 24, padding: 24, borderRadius: t.radius.lg, backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
        {step === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <KFormField label="Nombre Completo" required>
              <KInput placeholder="Juan Pérez" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </KFormField>
            <KFormField label="Email" required>
              <KInput placeholder="juan@empresa.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} icon={<Mail size={16} />} />
            </KFormField>
          </div>
        )}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { name: 'Starter', price: '$9/mes', desc: '5 usuarios, 10GB' },
              { name: 'Pro', price: '$29/mes', desc: '25 usuarios, 100GB' },
              { name: 'Enterprise', price: '$99/mes', desc: 'Ilimitado' },
            ].map((p) => (
              <div key={p.name} onClick={() => setForm({ ...form, plan: p.name })} style={{
                padding: 16, borderRadius: t.radius.md, cursor: 'pointer',
                border: `2px solid ${form.plan === p.name ? t.colors.brand.primary : 'var(--border)'}`,
                backgroundColor: form.plan === p.name ? 'rgba(224,77,54,0.04)' : 'var(--card)',
                transition: 'all 0.15s ease',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--foreground)' }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>{p.desc}</div>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: form.plan === p.name ? t.colors.brand.primary : 'var(--foreground)' }}>{p.price}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <KFormField label="Nombre en la tarjeta">
              <KInput placeholder="Juan Pérez" value={form.cardName} onChange={(e) => setForm({ ...form, cardName: e.target.value })} />
            </KFormField>
            <KFormField label="Número de tarjeta">
              <KInput placeholder="4242 4242 4242 4242" icon={<DollarSign size={16} />} />
            </KFormField>
            <div style={{ display: 'flex', gap: 12 }}>
              <KFormField label="Expiración"><KInput placeholder="MM/AA" /></KFormField>
              <KFormField label="CVC"><KInput placeholder="123" /></KFormField>
            </div>
          </div>
        )}
        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: t.colors.feedback.successLight, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Check size={28} color="#2E7D32" />
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 600, color: 'var(--foreground)' }}>Todo listo</h3>
            <p style={{ margin: '0 0 12px', fontSize: 13, color: 'var(--muted-foreground)' }}>
              {form.name || 'Usuario'} &bull; {form.email || 'email@ejemplo.com'} &bull; Plan {form.plan || 'Starter'}
            </p>
            <KBadge variant="success">Suscripción activa</KBadge>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
        <KButton variant="ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>Anterior</KButton>
        {step < 3 ? (
          <KButton variant="primary" onClick={() => setStep(step + 1)} icon={<ArrowRight size={16} />}>
            {step === 2 ? 'Confirmar' : 'Siguiente'}
          </KButton>
        ) : (
          <KButton variant="primary" onClick={() => setStep(0)}>Nuevo Registro</KButton>
        )}
      </div>
    </div>
  );
}

export const WizardPattern: Pattern = {
  id: 'wizard-pattern',
  title: 'Wizard Multi-Step',
  description: 'Formulario de múltiples pasos con KSteps, KFormField y KButton.',
  category: 'Formularios',
  component: <WizardPatternComponent />,
  code: `import { KSteps, KFormField } from '@khor/molecules';
import { KInput, KButton, KCheckbox } from '@khor/atoms';

// Wizard multi-step form
<KSteps items={steps} current={step} />
<div style={{ marginTop: 24, padding: 24, borderRadius: t.radius.lg, backgroundColor: 'var(--card)', border: \\\`1px solid var(--border)\\\` }}>
  {step === 0 && (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <KFormField label="Nombre Completo" required>
        <KInput placeholder="Juan Pérez" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </KFormField>
    </div>
  )}
</div>`,
};
