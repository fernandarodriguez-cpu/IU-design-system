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
    <div style={{ maxWidth: 840, margin: '0 auto', fontFamily: t.typography.fontPrimary, padding: '20px 16px' }}>
      {/* Wizard Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: 40 }}
      >
        <KFlex justify="center" style={{ marginBottom: 16 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', backgroundColor: 'rgba(224,77,54,0.1)', borderRadius: 100, color: t.colors.brand.primary, fontSize: 11, fontWeight: 800, letterSpacing: 1 }}>
            <Sparkles size={14} /> WAVE 13: RESPONSIVE FLOW
          </div>
        </KFlex>
        <h2 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 900, color: 'var(--foreground)', letterSpacing: -1.5, margin: 0 }}>Onboarding de Ingeniería</h2>
        <p style={{ fontSize: 15, color: 'var(--muted-foreground)', marginTop: 8, fontWeight: 500 }}>Configura tu infraestructura distribuida en segundos.</p>
      </motion.div>

      {/* Stepper Component */}
      <div style={{ marginBottom: 48 }} className="k-show-md">
        <KSteps current={step} items={steps} onChange={setStep} />
      </div>

      {/* Steps Content Area with AnimatePresence */}
      <div style={{ 
        backgroundColor: 'var(--card)', borderRadius: 32, padding: 'calc(24px + 2vw)', 
        border: '1px solid var(--border)', boxShadow: t.shadows.lg,
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
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <KText variant="h3" color="navy" style={{ fontWeight: 800 }}>Información de Identidad</KText>
                <KRow gutter={[20, 20]}>
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
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <KText variant="h3" color="navy" style={{ fontWeight: 800 }}>Workspace de Organización</KText>
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
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <KText variant="h3" color="navy" style={{ fontWeight: 800 }}>Nivel de Servicio & Seguridad</KText>
                <KRow gutter={[16, 16]}>
                  {['Starter', 'Pro', 'Enterprise'].map((p) => (
                    <KCol key={p} span={24} md={8}>
                      <motion.div 
                        variants={fadeInUp}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setForm({ ...form, plan: p.toLowerCase() })}
                        style={{ 
                          padding: 24, borderRadius: 24, border: '2px solid var(--border)', cursor: 'pointer',
                          borderColor: form.plan === p.toLowerCase() ? t.colors.brand.primary : 'var(--border)',
                          backgroundColor: form.plan === p.toLowerCase() ? 'rgba(224,77,54,0.04)' : 'var(--card)',
                          transition: 'all 0.2s ease',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          boxShadow: form.plan === p.toLowerCase() ? '0 15px 30px -10px rgba(224,77,54,0.3)' : 'none'
                        }}
                      >
                        <KFlex justify="space-between" align="center">
                          <span style={{ fontWeight: 900, fontSize: 18, letterSpacing: -0.5 }}>{p}</span>
                          {form.plan === p.toLowerCase() && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><CheckCircle2 size={20} color={t.colors.brand.primary} strokeWidth={3} /></motion.div>}
                        </KFlex>
                      </motion.div>
                    </KCol>
                  ))}
                </KRow>
                <motion.div variants={fadeInUp} style={{ marginTop: 8 }}>
                  <KFlex gap={12} align="flex-start">
                    <KCheckbox checked />
                    <div>
                      <KText strong>Arquitectura Zero-Trust</KText>
                      <p style={{ fontSize: 13, color: 'var(--muted-foreground)', marginTop: 4, margin: 0 }}>Cifrado de grado militar para todos los nodos del workspace.</p>
                    </div>
                  </KFlex>
                </motion.div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                variants={staggerContainer} initial="hidden" animate="visible"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', flex: 1, gap: 16 }}
              >
                <motion.div 
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
                  style={{ width: 100, height: 100, borderRadius: 32, backgroundColor: 'rgba(224,77,54,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.colors.brand.primary, marginBottom: 8 }}
                >
                  <Rocket size={48} strokeWidth={2.5} />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <KText variant="h2" color="navy" style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 900, letterSpacing: -1 }}>¡Sistema Operativo!</KText>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <KText variant="body-md" color="secondary" style={{ fontWeight: 600 }}>Workspace <strong>{form.org || 'Khor Engineering'}</strong> desplegado con éxito.</KText>
                </motion.div>
                <motion.div variants={fadeInUp} style={{ padding: '24px 32px', borderRadius: 24, backgroundColor: 'var(--muted)', width: '100%', maxWidth: 460, marginTop: 12, border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 11, textTransform: 'uppercase', fontWeight: 900, color: 'var(--muted-foreground)', marginBottom: 16, letterSpacing: 1.5 }}>Token de Acceso Generado</div>
                  <KFlex vertical gap={12}>
                    <KFlex justify="space-between" align="center">
                      <span style={{ fontSize: 13, color: 'var(--muted-foreground)', fontWeight: 600 }}>Ingeniero</span>
                      <span style={{ fontWeight: 800, fontSize: 14 }}>{form.name}</span>
                    </KFlex>
                    <KFlex justify="space-between" align="center">
                      <span style={{ fontSize: 13, color: 'var(--muted-foreground)', fontWeight: 600 }}>Plan Activo</span>
                      <KBadge status="success" text={form.plan.toUpperCase() + ' CLOUD'} />
                    </KFlex>
                  </KFlex>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 40, borderTop: '1px solid var(--border)' }}>
          <KButton variant="ghost" icon={<ArrowLeft size={16} />} disabled={step === 0} onClick={handleBack}>Regresar</KButton>
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
