import React, { useState } from 'react';
import { 
  CheckCircle2, ArrowLeft, ArrowRight, 
  Rocket, ShieldCheck, Mail, User,
  Building2, CreditCard, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  KButton, KText, KProgress, KBadge, KAvatar, KInput, KCheckbox 
} from '../components/design-system/atoms/index';
import { KRow, KCol, KFlex } from '../components/design-system/atoms/index';
import { 
  KSteps, KFormField, KSelectField 
} from '../components/design-system/molecules/index';
import { 
  KCardSection 
} from '../components/design-system/organisms/index';
import { khorTokens } from '../theme/khor-theme';
import { Pattern } from './types';
import { fadeInUp, staggerContainer, slideInRight, slideOutLeft } from '../theme/animations';

const t = khorTokens;

function SaaSWizardInternal() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
  const [form, setForm] = useState({ name: '', org: '', email: '', plan: 'pro' });

  const steps = [
    { title: 'Perfil', description: 'Tu información base' },
    { title: 'Organización', description: 'Detalles de tu empresa' },
    { title: 'Configuración', description: 'Planes y permisos' },
    { title: 'Finalización', description: 'Todo listo' }
  ];

  const handleNext = () => {
    setDirection(1);
    setStep(s => s + 1);
  };

  const handleBack = () => {
    setDirection(-1);
    setStep(s => s - 1);
  };

  const canContinue = step === 0 ? !!form.name && !!form.email : step === 1 ? !!form.org : true;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' as const }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeIn' as const }
    })
  };

  return (
    <div style={{ maxWidth: t.layout.mainWidth, margin: '0 auto', fontFamily: t.typography.fontPrimary, padding: `${t.spacing.md}px ${t.spacing.sm}px` }}>
      {/* Wizard Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: t.spacing.xl }}
      >
        <KFlex justify="center" style={{ marginBottom: t.spacing.md }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: t.spacing.xs, padding: '4px 12px', backgroundColor: `${t.colors.brand.primary}1a`, borderRadius: t.radius.full, color: t.colors.brand.primary, fontSize: t.typography.bodyXs.size, fontWeight: t.typography.fontWeights.extrabold, letterSpacing: t.typography.letterSpacing.wider }}>
            <Sparkles size={14} /> WAVE 13: RESPONSIVE FLOW
          </div>
        </KFlex>
        <h2 style={{ fontSize: t.typography.display2.size, fontWeight: t.typography.fontWeights.extrabold, color: t.semantic.text.primary, letterSpacing: t.typography.letterSpacing.tight, margin: 0 }}>Onboarding de Ingeniería</h2>
        <p style={{ fontSize: t.typography.bodyMd.size, color: t.semantic.text.muted, marginTop: t.spacing.xs, fontWeight: t.typography.fontWeights.medium }}>Configura tu infraestructura distribuida en segundos.</p>
      </motion.div>

      {/* Stepper Component */}
      <div style={{ marginBottom: t.spacing.xl }} className="k-show-md">
        <KSteps current={step} items={steps} onChange={setStep} />
      </div>

      {/* Steps Content Area with AnimatePresence */}
      <div style={{ 
        backgroundColor: t.semantic.surface.card, borderRadius: t.radius.lg, padding: t.spacing.xl, 
        border: `1px solid ${t.semantic.border.default}`, boxShadow: t.shadows.lg,
        minHeight: 480, display: 'flex', flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column' }}
          >
            {step === 0 && (
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: t.spacing.lg }}>
                <KText variant="h3" color="navy" style={{ fontWeight: t.typography.fontWeights.extrabold }}>Información de Identidad</KText>
                <KRow gutter={[t.spacing.md, t.spacing.md]}>
                  <KCol span={24} md={12}>
                    <motion.div variants={fadeInUp}>
                      <KFormField label="Nombre Completo" required>
                        <KInput 
                          placeholder="Ej: Daniel Khor" 
                          prefix={<User size={16} />} 
                          value={form.name} 
                          onChange={(e) => setForm({ ...form, name: e.target.value })} 
                        />
                      </KFormField>
                    </motion.div>
                  </KCol>
                  <KCol span={24} md={12}>
                    <motion.div variants={fadeInUp}>
                      <KFormField label="Correo de Ingeniería" required>
                        <KInput 
                          placeholder="ejemplo@khor.io" 
                          prefix={<Mail size={16} />} 
                          value={form.email} 
                          onChange={(e) => setForm({ ...form, email: e.target.value })} 
                        />
                      </KFormField>
                    </motion.div>
                  </KCol>
                </KRow>
                <motion.div variants={fadeInUp}>
                   <KText variant="body-sm" color="secondary" style={{ opacity: 0.7 }}>Este correo se usará para notificaciones de despliegue y auditorías de seguridad.</KText>
                </motion.div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: t.spacing.lg }}>
                <KText variant="h3" color="navy" style={{ fontWeight: t.typography.fontWeights.extrabold }}>Workspace de Organización</KText>
                <KRow gutter={[20, 20]}>
                  <KCol span={24} md={16}>
                    <motion.div variants={fadeInUp}>
                      <KFormField label="Nombre de la Institución" required>
                        <KInput 
                          placeholder="Ej: Khor Labs US" 
                          prefix={<Building2 size={16} />} 
                          value={form.org} 
                          onChange={(e) => setForm({ ...form, org: e.target.value })} 
                        />
                      </KFormField>
                    </motion.div>
                  </KCol>
                  <KCol span={24} md={8}>
                    <motion.div variants={fadeInUp}>
                      <KSelectField 
                        label="Dimensión" 
                        placeholder="Tamaño..."
                        options={[
                          { label: 'Solo yo', value: '1' },
                          { label: '2-10', value: '2-10' },
                          { label: '11-50', value: '11-50' },
                          { label: 'Enterprise', value: '50+' }
                        ]} 
                      />
                    </motion.div>
                  </KCol>
                </KRow>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: t.spacing.lg }}>
                <KText variant="h3" color="navy" style={{ fontWeight: t.typography.fontWeights.extrabold }}>Nivel de Servicio & Seguridad</KText>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: t.spacing.md, marginBottom: t.spacing.lg }}>
                  {[
                    { id: 'dev', label: 'Development', desc: 'Auto-scaling for testing.' },
                    { id: 'stg', label: 'Staging', desc: 'Pre-production environment.' },
                    { id: 'prd', label: 'Production', desc: 'High availability clusters.' }
                  ].map(env => (
                    <div 
                      key={env.id}
                      onClick={() => setForm({ ...form, environment: env.id })}
                      style={{ 
                        flex: '1 1 200px', padding: t.spacing.md, borderRadius: t.radius.md,
                        border: `2px solid ${form.environment === env.id ? t.colors.brand.primary : t.semantic.border.default}`,
                        backgroundColor: form.environment === env.id ? `${t.colors.brand.primary}08` : 'transparent',
                        cursor: 'pointer', transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ fontWeight: t.typography.fontWeights.bold, color: t.semantic.text.primary }}>{env.label}</div>
                      <div style={{ fontSize: t.typography.bodySm.size, color: t.semantic.text.muted }}>{env.desc}</div>
                    </div>
                  ))}
                </div>
                <KRow gutter={[t.spacing.md, t.spacing.md]}>
                  {['Starter', 'Pro', 'Enterprise'].map((p) => (
                    <KCol key={p} span={24} md={8}>
                      <motion.div 
                        variants={fadeInUp}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setForm({ ...form, plan: p.toLowerCase() })}
                         style={{ 
                          padding: t.spacing.lg, borderRadius: t.radius.lg, border: `2px solid ${t.semantic.border.default}`, cursor: 'pointer',
                          borderColor: form.plan === p.toLowerCase() ? t.colors.brand.primary : t.semantic.border.default,
                          backgroundColor: form.plan === p.toLowerCase() ? `${t.colors.brand.primary}0a` : t.semantic.surface.card,
                          transition: 'all 0.2s ease',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          boxShadow: form.plan === p.toLowerCase() ? `0 15px 30px -10px ${t.colors.brand.primary}4d` : 'none'
                        }}
                      >
                        <KFlex justify="space-between" align="center">
                          <span style={{ fontWeight: t.typography.fontWeights.extrabold, fontSize: t.typography.h4.size, letterSpacing: t.typography.letterSpacing.tight }}>{p}</span>
                          {form.plan === p.toLowerCase() && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><CheckCircle2 size={20} color={t.colors.brand.primary} strokeWidth={3} /></motion.div>}
                        </KFlex>
                      </motion.div>
                    </KCol>
                  ))}
                </KRow>
                <motion.div variants={fadeInUp} style={{ marginTop: t.spacing.sm }}>
                  <KFlex gap={t.spacing.sm} align="flex-start">
                    <KCheckbox checked />
                    <div>
                      <KText strong>Arquitectura Zero-Trust</KText>
                      <p style={{ fontSize: t.typography.bodySm.size, color: t.semantic.text.muted, marginTop: t.spacing.xs, margin: 0 }}>Cifrado de grado militar para todos los nodos del workspace.</p>
                    </div>
                  </KFlex>
                </motion.div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                variants={staggerContainer} initial="hidden" animate="visible"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', flex: 1, gap: t.spacing.md }}
              >
                <motion.div 
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
                  style={{ width: t.sizing[24] || 100, height: t.sizing[24] || 100, borderRadius: t.radius.lg, backgroundColor: `${t.colors.brand.primary}1a`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.colors.brand.primary, marginBottom: t.spacing.sm }}
                >
                  <Rocket size={48} strokeWidth={2.5} />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <KText variant="h2" color="navy" style={{ fontSize: t.typography.display2.size, fontWeight: t.typography.fontWeights.extrabold, letterSpacing: t.typography.letterSpacing.tight }}>¡Sistema Operativo!</KText>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <KText variant="body-md" color="secondary" style={{ fontWeight: t.typography.fontWeights.semibold }}>Workspace <strong>{form.org || 'Khor Engineering'}</strong> desplegado con éxito.</KText>
                </motion.div>
                <motion.div variants={fadeInUp} style={{ padding: `${t.spacing.lg}px ${t.spacing.xl}px`, borderRadius: t.radius.lg, backgroundColor: t.semantic.surface.raised, width: '100%', maxWidth: 460, marginTop: t.spacing.md, border: `1px solid ${t.semantic.border.default}` }}>
                  <div style={{ fontSize: t.typography.bodyXs.size, textTransform: 'uppercase', fontWeight: t.typography.fontWeights.extrabold, color: t.semantic.text.muted, marginBottom: t.spacing.md, letterSpacing: t.typography.letterSpacing.wider }}>Token de Acceso Generado</div>
                  <KFlex vertical gap={t.spacing.sm}>
                    <KFlex justify="space-between" align="center">
                      <span style={{ fontSize: t.typography.bodySm.size, color: t.semantic.text.muted, fontWeight: t.typography.fontWeights.semibold }}>Ingeniero</span>
                      <span style={{ fontWeight: t.typography.fontWeights.bold, fontSize: t.typography.bodyMd.size }}>{form.name}</span>
                    </KFlex>
                    <KFlex justify="space-between" align="center">
                      <span style={{ fontSize: t.typography.bodySm.size, color: t.semantic.text.muted, fontWeight: t.typography.fontWeights.semibold }}>Plan Activo</span>
                      <KBadge status="success" text={form.plan.toUpperCase() + ' CLOUD'} />
                    </KFlex>
                  </KFlex>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', paddingTop: t.spacing.xl, borderTop: `1px solid ${t.semantic.border.default}` }}>
          <KButton variant="ghost" icon={<ArrowLeft size={t.icon.md} />} disabled={step === 0} onClick={handleBack}>Regresar</KButton>
          {step < 3 ? (
            <KButton variant="primary" icon={<ArrowRight size={16} />} disabled={!canContinue} onClick={handleNext}>Siguiente</KButton>
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
  title: 'Onboarding Dinámico Wave 13',
  description: 'Wizard de configuración corporativa fluido con adaptabilidad responsiva integral y micro-interacciones de validación.',
  category: 'SaaS',
  component: <SaaSWizardInternal />,
  code: `<KSteps items={steps} current={step} />`
};
