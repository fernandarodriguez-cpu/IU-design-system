import React, { useState } from 'react';
import { Mail, Check, ArrowRight, DollarSign } from 'lucide-react';
import { KInput } from '../components/design-system/atoms/KInput/index';
import { KButton } from '../components/design-system/atoms/KButton/index';
import { KBadge } from '../components/design-system/atoms/KBadge/index';
import { KFormField } from '../components/design-system/molecules/KFormField/index';
import { KSteps } from '../components/design-system/molecules/KSteps/index';
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
      <div style={{ marginTop: t.spacing.lg, padding: t.spacing.lg, borderRadius: t.radius.lg, backgroundColor: t.semantic.surface.card, border: `1px solid ${t.semantic.border.default}` }}>
        {step === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: t.spacing.md }}>
            <KFormField label="Nombre Completo" required>
              <KInput placeholder="Juan Pérez" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </KFormField>
            <KFormField label="Email" required>
              <KInput placeholder="juan@empresa.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} prefix={<Mail size={t.icon.sm} />} />
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
                    <div style={{ fontSize: 15, fontWeight: t.typography.fontWeights.semibold, color: t.semantic.text.primary }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: t.semantic.text.muted }}>{p.desc}</div>
                  </div>
                  <div style={{ fontSize: t.typography.bodyLg.size, fontWeight: t.typography.fontWeights.bold, color: form.plan === p.name ? t.colors.brand.primary : t.semantic.text.primary }}>{p.price}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: t.spacing.md }}>
            <KFormField label="Nombre en la tarjeta">
              <KInput placeholder="Juan Pérez" value={form.cardName} onChange={(e) => setForm({ ...form, cardName: e.target.value })} />
            </KFormField>
            <KFormField label="Número de tarjeta">
              <KInput placeholder="4242 4242 4242 4242" prefix={<DollarSign size={t.icon.sm} />} />
            </KFormField>
            <div style={{ display: 'flex', gap: t.spacing.sm }}>
              <KFormField label="Expiración"><KInput placeholder="MM/AA" /></KFormField>
              <KFormField label="CVC"><KInput placeholder="123" /></KFormField>
            </div>
          </div>
        )}
        {step === 3 && (
          <div style={{ textAlign: 'center', padding: `${t.spacing.md}px 0` }}>
            <div style={{ 
              width: t.sizing[14], height: t.sizing[14], borderRadius: '50%', 
              backgroundColor: t.colors.feedback.successLight, display: 'inline-flex', 
              alignItems: 'center', justifyContent: 'center', marginBottom: t.spacing.md 
             }}>
              <Check size={28} color={t.colors.feedback.success} />
            </div>
            <h3 style={{ margin: `0 0 ${t.spacing.sm}px`, fontSize: t.typography.h4.size, fontWeight: t.typography.fontWeights.semibold, color: t.semantic.text.primary }}>Todo listo</h3>
            <p style={{ margin: `0 0 ${t.spacing.md}px`, fontSize: t.typography.bodySm.size, color: t.semantic.text.muted }}>
              {form.name || 'Usuario'} &bull; {form.email || 'email@ejemplo.com'} &bull; Plan {form.plan || 'Starter'}
            </p>
            <KBadge status="success" label="Suscripción activa" />
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
