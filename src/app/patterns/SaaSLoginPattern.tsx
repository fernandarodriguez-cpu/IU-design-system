import React, { useState } from 'react';
import { Mail, Lock, LogIn, Github, Chrome, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { KButton, KText, KAvatar, KBadge, KDivider } from '../components/design-system/atoms/index';
import { khorTokens } from '../theme/khor-theme';
import { KLoginForm } from '../components/design-system/organisms/index';
import { Pattern } from './types';
import { fadeInUp, staggerContainer, shake } from '../theme/animations';

const t = khorTokens;

function SaaSLoginInternal() {
  const [errorStatus, setErrorStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (values: any) => {
    setLoading(true);
    console.log('Login attempt:', values);
    
    // Simulate error after 1s for "Shake" demo
    setTimeout(() => {
      setLoading(false);
      setErrorStatus(true);
      setTimeout(() => setErrorStatus(false), 500);
    }, 1000);
  };

  return (
    <div style={{ 
      display: 'flex', alignItems: 'center', justifyContent: 'center', 
      minHeight: 700, borderRadius: t.radius.xl, padding: t.spacing.xl,
      fontFamily: t.typography.fontPrimary,
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: t.colors.brand.secondary, // Deep Navy
    }}>
      {/* Dynamic Background Mesh */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(224,77,54,0.15), transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(5,23,88,1), transparent 50%)
        `,
        opacity: 0.8,
        filter: 'blur(80px)',
      }} />

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 1, padding: '0 16px' }}
      >
        {/* Brand Header */}
        <motion.div variants={fadeInUp} style={{ textAlign: 'center', marginBottom: t.spacing.xl }}>
          <div style={{ 
            width: t.sizing[12], height: t.sizing[12], borderRadius: t.radius.lg, backgroundColor: t.colors.brand.primary, 
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: t.colors.feedback.white, 
            fontWeight: t.typography.fontWeights.extrabold, fontSize: t.typography.h1.size, marginBottom: t.spacing.md, 
            boxShadow: '0 0 30px rgba(224,77,54,0.3)',
          }}>
            K
          </div>
          <KText variant="h1" style={{ color: t.colors.feedback.white, fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: t.typography.fontWeights.extrabold, letterSpacing: t.typography.letterSpacing.tighter }}>Khor Intelligence</KText>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: t.spacing.sm, marginTop: t.spacing.md }}>
            <KBadge status="processing" text="Wave 13 Active" />
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: t.typography.fontWeights.semibold }}>v4.0.3 Platform</span>
          </div>
        </motion.div>

        {/* The Glassmorphism Card */}
        <motion.div 
          animate={errorStatus ? "error" : "visible"}
          variants={errorStatus ? shake : fadeInUp}
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.03)', 
            backdropFilter: 'blur(20px)',
            padding: 'calc(24px + 2vw) calc(20px + 1vw)', 
            borderRadius: t.radius.xl, 
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: t.shadows.xl,
          }}
        >
          <div style={{ marginBottom: t.spacing.lg }}>
             <KText variant="h3" style={{ color: t.colors.feedback.white, marginBottom: t.spacing.xs, fontWeight: t.typography.fontWeights.extrabold }}>Panel de Control</KText>
             <KText variant="small" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: t.typography.fontWeights.medium }}>Ingresa tus credenciales de ingeniería.</KText>
          </div>

          <div className="login-form-custom">
            <style>{`
              .login-form-custom div { background: transparent !important; border: none !important; padding: 0 !important; }
              .login-form-custom h2, .login-form-custom p { display: none !important; }
              .login-form-custom label { color: rgba(255,255,255,0.7) !important; font-size: 11px !important; text-transform: uppercase !important; letter-spacing: 1px !important; font-weight: ${t.typography.fontWeights.bold} !important; }
              .login-form-custom input { background: rgba(255,255,255,0.05) !important; border: 1px solid rgba(255,255,255,0.1) !important; color: ${t.colors.feedback.white} !important; border-radius: ${t.radius.md}px !important; height: 48px !important; }
              .login-form-custom input:focus { border-color: ${t.colors.brand.primary} !important; box-shadow: 0 0 0 4px rgba(224,77,54,0.1) !important; }
            `}</style>
            <KLoginForm 
              onFinish={handleLogin}
              loading={loading}
            />
          </div>

          <KDivider style={{ margin: '24px 0', opacity: 0.1 }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: t.spacing.md }}>
            <KButton variant="outline" icon={<Chrome size={16} />} style={{ borderRadius: t.radius.md, backgroundColor: 'rgba(255,255,255,0.02)', color: t.colors.feedback.white, borderColor: 'rgba(255,255,255,0.1)', flex: 1 }}>Google</KButton>
            <KButton variant="outline" icon={<Github size={16} />} style={{ borderRadius: t.radius.md, backgroundColor: 'rgba(255,255,255,0.02)', color: t.colors.feedback.white, borderColor: 'rgba(255,255,255,0.1)', flex: 1 }}>GitHub</KButton>
          </div>
        </motion.div>

        {/* Footer Links */}
        <motion.div variants={fadeInUp} style={{ textAlign: 'center', marginTop: 32 }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            ¿Problemas Técnicos? <a href="#" style={{ color: t.colors.brand.primary, fontWeight: 700, textDecoration: 'none' }}>Contactar NOC</a>
          </p>
        </motion.div>
      </motion.div>
    </div >
  );
}

export const SaaSLoginPattern: Pattern = {
  id: 'saas-login',
  title: 'Login Aero-Glass SaaS',
  description: 'Interfaz de entrada ultra-moderna con efectos de cristal (glassmorphism), animaciones reactivas de error (shake) y micro-interacciones Wave 12.',
  category: 'SaaS',
  component: <SaaSLoginInternal />,
  code: `<KLoginForm onFinish={handleLogin} />`
};
