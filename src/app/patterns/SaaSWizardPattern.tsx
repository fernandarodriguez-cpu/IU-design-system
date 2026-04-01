import React, { useState } from 'react';
import { 
  CheckCircle2, ArrowLeft, ArrowRight, 
  Rocket, ShieldCheck, Mail, User,
  Building2, CreditCard
} from 'lucide-react';
import { 
  KButton, KText, KProgress, KBadge, KAvatar, KInput, KCheckbox 
} from '../components/design-system/atoms/index';
import { 
  KSteps, KFormField, KSelectField 
} from '../components/design-system/molecules/index';
import { 
  KCardSection 
} from '../components/design-system/organisms/index';
import { khorTokens } from '../theme/khor-theme';
import { Pattern } from './types';

const t = khorTokens;

function SaaSWizardInternal() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: '', org: '', email: '', plan: 'pro' });

  const steps = [
    { title: 'Perfil', description: 'Tu información base' },
    { title: 'Organización', description: 'Detalles de tu empresa' },
    { title: 'Configuración', description: 'Planes y permisos' },
    { title: 'Finalización', description: 'Todo listo' }
  ];

  const canContinue = step === 0 ? !!form.name && !!form.email : step === 1 ? !!form.org : true;

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', fontFamily: t.typography.fontPrimary }}>
      {/* Wizard Header */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--foreground)' }}>Onboarding de Cuenta</h2>
        <p style={{ fontSize: 15, color: 'var(--muted-foreground)', marginTop: 8 }}>Configura tu entorno de trabajo en menos de 2 minutos.</p>
      </div>

      {/* Stepper Component */}
      <div style={{ marginBottom: 48 }}>
        <KSteps current={step} items={steps} onChange={setStep} />
      </div>

      {/* Steps Content Area */}
      <div style={{ 
        backgroundColor: 'var(--card)', borderRadius: 24, padding: 32, 
        border: '1px solid var(--border)', boxShadow: t.shadows.md,
        minHeight: 400, display: 'flex', flexDirection: 'column'
      }}>
        {step === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <KText variant="h3" color="navy">Información Personal</KText>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <KFormField label="Nombre Completo" required>
                <KInput 
                  placeholder="Ej: Daniel Khor" 
                  prefix={<User size={16} />} 
                  value={form.name} 
                  onChange={(e) => setForm({ ...form, name: e.target.value })} 
                />
              </KFormField>
              <KFormField label="Correo Electrónico" required>
                <KInput 
                  placeholder="ejemplo@khor.io" 
                  prefix={<Mail size={16} />} 
                  value={form.email} 
                  onChange={(e) => setForm({ ...form, email: e.target.value })} 
                />
              </KFormField>
            </div>
            <KText variant="body-md" color="secondary">Este correo se usará para notificaciones de facturación y seguridad.</KText>
          </div>
        )}

        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <KText variant="h3" color="navy">Sobre tu Organización</KText>
            <KFormField label="Nombre de la Empresa" required>
              <KInput 
                placeholder="Ej: Khor Solutions S.A." 
                prefix={<Building2 size={16} />} 
                value={form.org} 
                onChange={(e) => setForm({ ...form, org: e.target.value })} 
              />
            </KFormField>
            <KSelectField 
              label="Tamaño del equipo" 
              placeholder="Seleccionar..."
              options={[
                { label: 'Solo yo', value: '1' },
                { label: '2-10 personas', value: '2-10' },
                { label: '11-50 personas', value: '11-50' },
                { label: 'Crecimiento (50+)', value: '50+' }
              ]} 
            />
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <KText variant="h3" color="navy">Plan y Seguridad</KText>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {['Starter', 'Pro', 'Enterprise'].map((p) => (
                <div 
                  key={p} 
                  onClick={() => setForm({ ...form, plan: p.toLowerCase() })}
                  style={{ 
                    padding: 20, borderRadius: 16, border: '2px solid var(--border)', cursor: 'pointer',
                    borderColor: form.plan === p.toLowerCase() ? t.colors.brand.primary : 'var(--border)',
                    backgroundColor: form.plan === p.toLowerCase() ? 'rgba(224,77,54,0.04)' : 'var(--card)',
                    transition: 'all 0.1s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, fontSize: 15 }}>{p}</span>
                    {form.plan === p.toLowerCase() && <CheckCircle2 size={18} color={t.colors.brand.primary} />}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 8 }}>
              <KCheckbox label="Habilitar autenticación de 2 factores (recomendado)" checked />
              <p style={{ fontSize: 12, color: 'var(--muted-foreground)', marginLeft: 30, marginTop: 4 }}>Seguimos estándares SOC2 para la protección de tus datos.</p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', flex: 1, gap: 16 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: 'rgba(224,77,54,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.colors.brand.primary, marginBottom: 8 }}>
              <Rocket size={40} />
            </div>
            <KText variant="h2" color="navy">¡Listo para despegar!</KText>
            <KText variant="body-md" color="secondary">Hemos configurado tu entorno <strong>{form.org || 'Khor Workspace'}</strong> exitosamente.</KText>
            <div style={{ padding: 20, borderRadius: 16, backgroundColor: 'var(--muted)', width: '100%', maxWidth: 400, marginTop: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted-foreground)', marginBottom: 8 }}>Resumen de Configuración</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                <span>Administrador</span>
                <span style={{ fontWeight: 600 }}>{form.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <span>Plan</span>
                <KBadge status="info" label={form.plan.toUpperCase()} />
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 32 }}>
          <KButton variant="outline" icon={<ArrowLeft size={16} />} disabled={step === 0} onClick={() => setStep(step - 1)}>Regresar</KButton>
          {step < 3 ? (
            <KButton variant="primary" icon={<ArrowRight size={16} />} disabled={!canContinue} onClick={() => setStep(step + 1)}>Continuar</KButton>
          ) : (
            <KButton variant="primary" icon={<ShieldCheck size={16} />} onClick={() => console.log('Finalizado')}>Ir al Dashboard</KButton>
          )}
        </div>
      </div>
    </div>
  );
}

export const SaaSWizardPattern: Pattern = {
  id: 'saas-wizard',
  title: 'Onboarding Multi-Paso SaaS',
  description: 'Wizard de configuración corporativa con KSteps, validación de campos, selección de planes y confirmación final de alta fidelidad.',
  category: 'SaaS',
  component: <SaaSWizardInternal />,
  code: `import { KSteps, KFormField } from '@khor/molecules';

// Wizard implementation
<KSteps items={steps} current={step} />
<Card>
  {step === 0 && <PersonalDataForm />}
  {step === 1 && <OrgConfigForm />}
</Card>`
};
