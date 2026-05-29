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
      gridTemplateColumns: `minmax(260px, 320px) 1fr`, 
      minHeight: 600,
      backgroundColor: t.semantic.surface.card,
      borderRadius: t.spacing.lg,
      overflow: 'hidden',
      border: `1px solid ${t.semantic.border.default}`,
      boxShadow: t.shadows.lg
    }}>
      {/* ... rest of the component exactly as before ... */}
      <div style={{ backgroundColor: t.colors.brand.secondary, padding: t.spacing.xl, color: t.colors.feedback.white, backgroundImage: `linear-gradient(180deg, ${t.colors.brand.secondary} 0%, ${t.colors.brand.secondaryHover} 100%)`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing.sm, marginBottom: t.spacing.xl }}>
            <div style={{ width: t.sizing[8], height: t.sizing[8], borderRadius: t.radius.md, backgroundColor: t.colors.brand.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: t.typography.fontWeights.extrabold }}>K</div>
            <span style={{ fontWeight: t.typography.fontWeights.bold, fontSize: t.typography.h4.size }}>Khor Systems</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: t.spacing.lg }}>
            {[
              { id: 1, label: 'Perfil de Empresa', icon: <Building2 size={t.icon.sm} /> },
              { id: 2, label: 'Configuración de Equipo', icon: <Users size={t.icon.sm} /> },
              { id: 3, label: 'Seguridad y Accesos', icon: <ShieldCheck size={t.icon.sm} /> }
            ].map((s) => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: t.spacing.md, opacity: step >= s.id ? 1 : 0.4, transition: 'opacity 0.3s' }}>
                <div style={{ width: t.sizing[8], height: t.sizing[8], borderRadius: t.radius.full, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: step > s.id ? t.colors.brand.primary : `${t.colors.feedback.white}1a`, border: step === s.id ? `2px solid ${t.colors.brand.primary}` : 'none', fontSize: t.typography.bodyXs.size, fontWeight: t.typography.fontWeights.bold }}>
                  {step > s.id ? <Check size={t.icon.sm} /> : s.id}
                </div>
                <span style={{ fontSize: t.typography.bodySm.size, fontWeight: step === s.id ? t.typography.fontWeights.semibold : t.typography.fontWeights.regular }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: t.spacing.md, borderRadius: t.radius.lg, backgroundColor: 'rgba(255,255,255,0.05)', fontSize: t.typography.bodySm.size, border: '1px solid rgba(255,255,255,0.1)' }}>
          <Sparkles size={t.icon.sm} style={{ color: t.colors.brand.primary, marginBottom: t.spacing.sm }} />
          <p style={{ margin: 0, opacity: 0.8, lineHeight: 1.5 }}>"La configuración inicial toma menos de 2 minutos. Estás a punto de potenciar tu flujo de trabajo."</p>
        </div>
      </div>
      <div style={{ padding: `${t.spacing.xl}px ${t.spacing.xxl * 1.66}px`, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
          {step === 1 && (
            <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
              <h2 style={{ fontSize: t.typography.display1.size, fontWeight: t.typography.fontWeights.extrabold, color: t.semantic.text.primary, marginBottom: t.spacing.xs }}>Cuéntanos de tu empresa</h2>
              <p style={{ color: t.semantic.text.muted, marginBottom: t.spacing.xl }}>Utilizamos esta información para personalizar tu experiencia en el dashboard.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: t.spacing.md, maxWidth: t.layout.sidebarWidth * 1.5 }}>
                <KFormField label="Nombre de la Organización" required><KInput prefix={<Building2 size={t.icon.sm} />} placeholder="Ej. Acme Corp" /></KFormField>
                <KFormField label="Sitio Web"><KInput prefix={<Globe size={t.icon.sm} />} placeholder="https://example.com" /></KFormField>
                <KFormField label="Industria"><KInput placeholder="SaaS, E-commerce, etc." /></KFormField>
              </div>
            </div>
          )}
          {step === 2 && (
            <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
              <h2 style={{ fontSize: t.typography.display1.size, fontWeight: t.typography.fontWeights.extrabold, color: t.semantic.text.primary, marginBottom: t.spacing.xs }}>Invita a tu equipo</h2>
              <p style={{ color: t.semantic.text.muted, marginBottom: t.spacing.xl }}>Khor es mejor cuando se usa en equipo. Invita a tus colaboradores iniciales.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: t.spacing.md, maxWidth: t.layout.sidebarWidth * 1.5 }}>
                {[1, 2, 3].map(i => <KInput key={i} prefix={<Mail size={t.icon.sm} />} placeholder={`colega${i}@empresa.com`} />)}
                <KButton variant="outline" size="sm" style={{ alignSelf: 'flex-start' }}>+ Añadir más</KButton>
              </div>
            </div>
          )}
          {step === 3 && (
            <div style={{ animation: 'fadeIn 0.3s ease-out', textAlign: 'center', paddingTop: t.spacing.xl }}>
              <div style={{ width: t.sizing[20], height: t.sizing[20], borderRadius: t.radius.full, backgroundColor: `${t.colors.feedback.success}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: `0 auto ${t.spacing.lg}px` }}><Rocket size={t.icon.lg} style={{ color: t.colors.feedback.success }} /></div>
              <h2 style={{ fontSize: t.typography.display1.size, fontWeight: t.typography.fontWeights.extrabold, color: t.semantic.text.primary, marginBottom: t.spacing.xs }}>¡Todo listo, Alex!</h2>
              <p style={{ color: t.semantic.text.muted, marginBottom: t.spacing.xl, maxWidth: t.layout.sidebarWidth * 1.5, margin: '0 auto' }}>Tu espacio de trabajo ha sido creado. Hemos enviado las invitaciones a tu equipo.</p>
              <div style={{ backgroundColor: t.semantic.surface.raised, padding: t.spacing.lg, borderRadius: t.radius.lg, maxWidth: t.layout.sidebarWidth * 1.5, margin: `${t.spacing.xl}px auto`, border: `1px solid ${t.semantic.border.default}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing.md, textAlign: 'left' }}>
                  <KAvatar size="lg" name="Alex Mercer" />
                  <div>
                    <div style={{ fontWeight: t.typography.fontWeights.bold, fontSize: t.typography.bodyMd.size }}>Alex Mercer</div>
                    <div style={{ fontSize: t.typography.bodySm.size, color: t.semantic.text.muted }}>Administrador • Plan Pro</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div style={{ 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
          paddingTop: t.spacing.xl, borderTop: `1px solid ${t.semantic.border.default}` 
        }}>
          <KButton 
            variant="ghost" 
            onClick={prev} 
            disabled={step === 1}
            icon={<ArrowLeft size={t.icon.sm} />}
          >
            Atrás
          </KButton>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing.lg }}>
            <span style={{ fontSize: t.typography.bodySm.size, color: t.semantic.text.muted, fontWeight: t.typography.fontWeights.semibold }}>Paso {step} de {totalSteps}</span>
            <KButton 
              onClick={step === totalSteps ? () => {} : next}
              icon={step === totalSteps ? <Check size={t.icon.sm} /> : <ArrowRight size={t.icon.sm} />}
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

