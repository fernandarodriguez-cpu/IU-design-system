/**
 * ╔═══════════════════════════════════════════╗
 * ║  KHOR INSPIRATION — Showcase Page         ║
 * ║  Bento Grids, Trial Bars & Elite Patterns ║
 * ╚═══════════════════════════════════════════╝
 */
import React from 'react';
import { 
  Sparkles, Shield, Zap, Cpu, Globe, 
  BarChart3, Layers, Smartphone, Layout
} from 'lucide-react';
import { 
  KBentoGrid, KBentoItem, KButton, KText, KTag, KBadge 
} from '../components/design-system/atoms';
import { KTrialBar } from '../components/design-system/molecules';

export function InspirationPage() {
  return (
    <div className="py-12 space-y-20">
      {/* HEADER */}
      <div className="space-y-4">
        <KBadge label="Elite SaaS Patterns" color="volcano" />
        <KText variant="display-1" className="font-black">
          Inspiración <span className="text-khor-primary italic">Beyond UI</span>
        </KText>
        <KText variant="body-lg" className="max-w-2xl opacity-70">
          Patrones de alta fidelidad optimizados para conversión, retención y estética premium. 
          Componentes "Agent-First" listos para ser ensamblados por humanos e IA.
        </KText>
      </div>

      {/* TRIAL BARS SHOWCASE */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <Zap className="text-khor-accent" />
          <KText variant="h2" className="font-bold">SaaS Monetization Tools</KText>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <KText variant="small" className="font-bold opacity-50 uppercase tracking-widest">Standard Trial</KText>
            <KTrialBar daysLeft={10} totalDays={14} onUpgrade={() => alert('Upgrade!')} />
          </div>
          <div className="space-y-2">
            <KText variant="small" className="font-bold text-khor-error uppercase tracking-widest">Urgent / Expiring</KText>
            <KTrialBar daysLeft={2} totalDays={14} planName="Trial Pro" onUpgrade={() => alert('Upgrade!')} />
          </div>
        </div>
      </section>

      {/* BENTO GRID SHOWCASE */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <Layout className="text-khor-primary" />
          <KText variant="h2" className="font-bold">Bento Feature Grids</KText>
        </div>
        
        <KBentoGrid columns={4} gap={24}>
          {/* Main Hero Bento */}
          <KBentoItem colSpan={2} rowSpan={2} className="flex flex-col justify-between bg-khor-secondary text-white border-none">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                <Cpu size={24} />
              </div>
              <KText variant="h3" className="text-white font-bold">Arquitectura Agéntica</KText>
              <KText variant="body-md" className="text-white/60">
                KDS no solo es visual, es un contrato semántico que permite a las IAs entender el propósito de tu UI.
              </KText>
            </div>
            <KButton variant="primary" className="w-fit">Ver Documentación</KButton>
          </KBentoItem>

          {/* Glass Bento */}
          <KBentoItem colSpan={2} glass className="flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <KBadge label="New Feature" color="success" />
              <Shield size={20} className="text-khor-success" />
            </div>
            <KText variant="h4" className="font-bold">Seguridad Enterprise</KText>
            <KText variant="small" className="opacity-70">
              Validación continua de accesibilidad WCAG 2.2 y seguridad de tokens.
            </KText>
          </KBentoItem>

          {/* Stats Bento */}
          <KBentoItem colSpan={1} className="flex flex-col justify-center items-center text-center gap-2">
            <KText variant="display-1" className="text-khor-primary font-black">99%</KText>
            <KText variant="small" className="font-bold uppercase tracking-tighter opacity-50">Adopción</KText>
          </KBentoItem>

          {/* Icon Bento */}
          <KBentoItem colSpan={1} className="bg-khor-primary text-white border-none flex items-center justify-center">
            <Sparkles size={48} className="animate-pulse" />
          </KBentoItem>

          {/* Horizontal Bento */}
          <KBentoItem colSpan={4} className="flex items-center justify-between gap-8 bg-khor-neutral-50 dark:bg-khor-neutral-900">
            <div className="flex items-center gap-6">
              <div className="p-4 rounded-full bg-white dark:bg-black shadow-lg">
                <Globe size={32} className="text-khor-primary" />
              </div>
              <div>
                <KText variant="h3" className="font-bold">Presencia Global</KText>
                <KText variant="body-md" className="opacity-60">Soporte i18n y RTL nativo en todos los componentes.</KText>
              </div>
            </div>
            <div className="flex gap-2">
              <KTag color="blue">English</KTag>
              <KTag color="volcano">Spanish</KTag>
              <KTag color="purple">Arabic</KTag>
            </div>
          </KBentoItem>
        </KBentoGrid>
      </section>

      {/* FOOTER CALLOUT */}
      <div className="khor-glass p-12 rounded-[3rem] text-center space-y-6">
        <KText variant="h2" className="font-black">¿Listo para ir más allá?</KText>
        <KText variant="body-lg" className="max-w-xl mx-auto opacity-70">
          Usa estos patrones para construir interfaces que no solo funcionen, sino que inspiren confianza y deseo.
        </KText>
        <div className="flex justify-center gap-4">
          <KButton variant="primary" size="lg">Explorar Componentes</KButton>
          <KButton variant="outline" size="lg">Descargar Guía IA</KButton>
        </div>
      </div>
    </div>
  );
}

export default InspirationPage;
