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
      minHeight: 700, borderRadius: 32, padding: 40,
      fontFamily: t.typography.fontPrimary,
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#020617', // Deep Navy
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
        <motion.div variants={fadeInUp} style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ 
            width: 56, height: 56, borderRadius: 16, backgroundColor: t.colors.brand.primary, 
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', 
            fontWeight: 800, fontSize: 24, marginBottom: 20, 
            boxShadow: '0 0 30px rgba(224,77,54,0.3)',
          }}>
            K
          </div>
          <KText variant="h1" style={{ color: '#fff', fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 900, letterSpacing: -1 }}>Khor Intelligence</KText>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 12 }}>
            <KBadge status="processing" text="Wave 13 Active" />
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>v4.0.3 Platform</span>
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
            borderRadius: 32, 
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div style={{ marginBottom: 24 }}>
             <KText variant="h3" style={{ color: '#fff', marginBottom: 4, fontWeight: 800 }}>Panel de Control</KText>
             <KText variant="small" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Ingresa tus credenciales de ingeniería.</KText>
          </div>

          <div className="login-form-custom">
            <style>{`
              .login-form-custom div { background: transparent !important; border: none !important; padding: 0 !important; }
              .login-form-custom h2, .login-form-custom p { display: none !important; }
              .login-form-custom label { color: rgba(255,255,255,0.7) !important; font-size: 11px !important; text-transform: uppercase !important; letter-spacing: 1px !important; font-weight: 700 !important; }
              .login-form-custom input { background: rgba(255,255,255,0.05) !important; border: 1px solid rgba(255,255,255,0.1) !important; color: #fff !important; border-radius: 12px !important; height: 48px !important; }
              .login-form-custom input:focus { border-color: #E04D36 !important; box-shadow: 0 0 0 4px rgba(224,77,54,0.1) !important; }
            `}</style>
            <KLoginForm 
              onFinish={handleLogin}
              loading={loading}
            />
          </div>

          <KDivider style={{ margin: '24px 0', opacity: 0.1 }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <KButton variant="outline" icon={<Chrome size={16} />} style={{ borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.02)', color: '#fff', borderColor: 'rgba(255,255,255,0.1)', flex: 1 }}>Google</KButton>
            <KButton variant="outline" icon={<Github size={16} />} style={{ borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.02)', color: '#fff', borderColor: 'rgba(255,255,255,0.1)', flex: 1 }}>GitHub</KButton>
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
