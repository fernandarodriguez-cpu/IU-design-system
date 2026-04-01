import React, { useState } from 'react';
import { 
  Rocket, Users, ShieldCheck, ArrowRight, ArrowLeft, 
  Check, Sparkles, Building2, Globe, Mail 
} from 'lucide-react';
import { 
  KButton, KInput, KText, KProgress, KAvatar 
} from '../components/design-system/atoms/index';
import { KFormField } from '../components/design-system/molecules/index';
import { khorTokens } from '../theme/khor-theme';

const t = khorTokens;

function OnboardingInternal() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const next = () => setStep(s => Math.min(s + 1, totalSteps));
  const prev = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'minmax(300px, 400px) 1fr', 
      minHeight: '600px',
      backgroundColor: 'var(--card)',
      borderRadius: 24,
      overflow: 'hidden',
      border: '1px solid var(--border)',
      boxShadow: t.shadows.lg
    }}>
      {/* ... rest of the component exactly as before ... */}
      <div style={{ backgroundColor: t.colors.brand.navy, padding: 40, color: '#fff', backgroundImage: 'linear-gradient(180deg, #051758 0%, #0a257a 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: t.colors.brand.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>K</div>
            <span style={{ fontWeight: 700, fontSize: 18 }}>Khor Systems</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
              { id: 1, label: 'Perfil de Empresa', icon: <Building2 size={18} /> },
              { id: 2, label: 'Configuración de Equipo', icon: <Users size={18} /> },
              { id: 3, label: 'Seguridad y Accesos', icon: <ShieldCheck size={18} /> }
            ].map((s) => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: step >= s.id ? 1 : 0.4, transition: 'opacity 0.3s' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: step > s.id ? t.colors.brand.primary : 'rgba(255,255,255,0.1)', border: step === s.id ? `2px solid ${t.colors.brand.primary}` : 'none', fontSize: 12, fontWeight: 700 }}>
                  {step > s.id ? <Check size={16} /> : s.id}
                </div>
                <span style={{ fontSize: 14, fontWeight: step === s.id ? 600 : 400 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: 20, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.05)', fontSize: 13, border: '1px solid rgba(255,255,255,0.1)' }}>
          <Sparkles size={16} style={{ color: t.colors.brand.primary, marginBottom: 12 }} />
          <p style={{ margin: 0, opacity: 0.8, lineHeight: 1.5 }}>"La configuración inicial toma menos de 2 minutos. Estás a punto de potenciar tu flujo de trabajo."</p>
        </div>
      </div>
      <div style={{ padding: '60px 80px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
          {step === 1 && (
            <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--foreground)', marginBottom: 8 }}>Cuéntanos de tu empresa</h2>
              <p style={{ color: 'var(--muted-foreground)', marginBottom: 32 }}>Utilizamos esta información para personalizar tu experiencia en el dashboard.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 400 }}>
                <KFormField label="Nombre de la Organización" required><KInput prefix={<Building2 size={16} />} placeholder="Ej. Acme Corp" /></KFormField>
                <KFormField label="Sitio Web"><KInput prefix={<Globe size={16} />} placeholder="https://example.com" /></KFormField>
                <KFormField label="Industria"><KInput placeholder="SaaS, E-commerce, etc." /></KFormField>
              </div>
            </div>
          )}
          {step === 2 && (
            <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--foreground)', marginBottom: 8 }}>Invita a tu equipo</h2>
              <p style={{ color: 'var(--muted-foreground)', marginBottom: 32 }}>Khor es mejor cuando se usa en equipo. Invita a tus colaboradores iniciales.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
                {[1, 2, 3].map(i => <KInput key={i} prefix={<Mail size={16} />} placeholder={`colega${i}@empresa.com`} />)}
                <KButton variant="outline" size="sm" style={{ alignSelf: 'flex-start' }}>+ Añadir más</KButton>
              </div>
            </div>
          )}
          {step === 3 && (
            <div style={{ animation: 'fadeIn 0.3s ease-out', textAlign: 'center', paddingTop: 40 }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: `${t.colors.feedback.success}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}><Rocket size={40} style={{ color: t.colors.feedback.success }} /></div>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--foreground)', marginBottom: 8 }}>¡Todo listo, Dani!</h2>
              <p style={{ color: 'var(--muted-foreground)', marginBottom: 32, maxWidth: 400, margin: '0 auto' }}>Tu espacio de trabajo ha sido creado. Hemos enviado las invitaciones a tu equipo.</p>
              <div style={{ backgroundColor: 'var(--muted)', padding: 24, borderRadius: 16, maxWidth: 400, margin: '32px auto', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' }}>
                  <KAvatar size="lg" name="Dani Khor" />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>Dani Khor</div>
                    <div style={{ fontSize: 13, color: 'var(--muted-foreground)' }}>Administrador • Plan Pro</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div style={{ 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
          paddingTop: 40, borderTop: '1px solid var(--border)' 
        }}>
          <KButton 
            variant="ghost" 
            onClick={prev} 
            disabled={step === 1}
            icon={<ArrowLeft size={16} />}
          >
            Atrás
          </KButton>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <span style={{ fontSize: 13, color: 'var(--muted-foreground)', fontWeight: 600 }}>Paso {step} de {totalSteps}</span>
            <KButton 
              onClick={step === totalSteps ? () => {} : next}
              icon={step === totalSteps ? <Check size={16} /> : <ArrowRight size={16} />}
              iconPosition="end"
            >
              {step === totalSteps ? 'Ir al Dashboard' : 'Continuar'}
            </KButton>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

import { Pattern } from './types';

export const OnboardingPattern: Pattern = {
  id: 'saas-onboarding',
  title: 'Onboarding SaaS Progresivo',
  description: 'Flujo de configuración inicial multi-paso con tracking lateral y estados de confirmación. Maximiza la conversión mediante progressive disclosure.',
  category: 'SaaS',
  component: <OnboardingInternal />,
  code: `<KSteps items={[
  { title: 'Empresa', icon: <Building2 /> },
  { title: 'Equipo', icon: <Users /> },
  { title: 'Seguridad', icon: <ShieldCheck /> }
]} />`
};

