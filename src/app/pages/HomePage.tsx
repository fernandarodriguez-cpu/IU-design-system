/**
 * ╔═══════════════════════════════════════════╗
 * ║  KHOR DESIGN SYSTEM — v5.1.6-alpha        ║
 * ║  Elite SaaS & AI Architecture             ║
 * ╚═══════════════════════════════════════════╝
 */
import React from 'react';
import { useNavigate } from 'react-router';
import JSZip from 'jszip';
import {
  Atom, Layers, Box, ArrowRight,
  Component, Sparkles, Zap, Shield, Smartphone,
  Download, Package, Code2, ShieldCheck,
  Figma, Clock, Bot, Brush, BookOpen, CheckCircle2,
  Terminal, Cpu, LayoutTemplate
} from 'lucide-react';
import { KButton, KText, KBadge, KTag, KRow, KCol } from '../components/design-system/atoms';
import { KStatCard } from '../components/design-system/molecules';
import { kToast, KCardSection } from '../components/design-system/organisms';
import { khorTokens } from '../theme/khor-theme';
import { useTheme } from '../theme/theme-context';
import { generateMarkdown, defaultSections } from './AIExportPage';
import khorCounts from '../metadata/khor-counts.json';

const FeatureCard = ({ icon: Icon, title, description }: any) => (
  <div className="p-8 rounded-[2rem] border border-khor-border-default bg-white dark:bg-khor-surface-card hover:border-khor-primary/30 hover:shadow-khor-xl transition-all group flex flex-col items-start gap-4">
    <div className="w-14 h-14 rounded-2xl bg-khor-primary/10 text-khor-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
      <Icon size={28} />
    </div>
    <div>
      <KText variant="h3" className="mb-2 text-khor-secondary dark:text-white font-bold">{title}</KText>
      <KText variant="body-md" className="text-khor-neutral-500 leading-relaxed">{description}</KText>
    </div>
  </div>
);

export function HomePage() {
  const navigate = useNavigate();
  const { themeConfig } = useTheme();

  const handleDownloadKDS = async () => {
    const t = khorTokens;
    const zip = new JSZip();
    const ds = zip.folder('khor-design-system-v5')!;
    ds.file('README.md', `# Khor Design System v5.1.6-alpha\n...`);
    ds.file('KHOR_AI_GUIDE.md', generateMarkdown(defaultSections, themeConfig));
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `khor-ds-v5.1.6-alpha.zip`;
    a.click();
    kToast({ type: 'success', title: 'Exportación Exitosa', description: 'Paquete v5.1.6-alpha listo.' });
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-8">
      {/* HERO SECTION - ELITE UPGRADE */}
      <div className="relative overflow-hidden rounded-[3rem] bg-khor-secondary text-white p-16 lg:p-24 mb-20 shadow-2xl border border-white/10 group">
        {/* Animated Background Gradients */}
        <div className="absolute top-[-30%] right-[-10%] w-[60%] h-[150%] bg-gradient-to-br from-khor-primary/40 to-transparent rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-[-40%] left-[-20%] w-[50%] h-[120%] bg-gradient-to-tr from-khor-accent/20 to-transparent rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap gap-3 mb-10">
            <KTag color="volcano" className="border-white/20 text-white bg-white/10 px-4 py-1 backdrop-blur-xl">v5.1.6-alpha</KTag>
            <KTag color="volcano" className="border-white/20 text-white bg-white/10 px-4 py-1 backdrop-blur-xl">Enterprise Stack</KTag>
            <KTag color="processing" className="border-white/20 text-white bg-white/10 px-4 py-1 backdrop-blur-xl">AI Native</KTag>
          </div>

          <h1 className="text-5xl lg:text-6xl font-black mb-8 leading-[1.1] tracking-tightest text-white max-w-4xl drop-shadow-sm">
            Diseña para <span className="text-khor-primary">Humanos</span>,<br />
            construye para <span className="text-khor-accent italic">Inteligencia Artificial</span>.
          </h1>

          <KText variant="body-lg" className="mb-12 text-white/70 leading-relaxed max-w-3xl block text-xl">
            Khor es la infraestructura visual definitiva para SaaS.
            Arquitectura de 3 capas optimizada para renderizado masivo de datos y 100% preparada para agentes autónomos.
          </KText>

          <div className="flex flex-wrap gap-6">
            <KButton
              variant="primary"
              size="lg"
              onClick={() => navigate('/tokens')}
              icon={<ArrowRight size={24} />}
              iconPosition="end"
              className="h-16 px-10 text-lg shadow-khor-xl shadow-khor-primary/30 hover:scale-105 transition-transform"
            >
              Explorar Ecosistema
            </KButton>
            <KButton
              variant="outline"
              size="lg"
              onClick={handleDownloadKDS}
              icon={<Download size={24} />}
              className="h-16 border-white/40 text-white hover:bg-white/10 backdrop-blur-md text-lg px-8"
            >
              Descargar KDS Bundle
            </KButton>
          </div>
        </div>
      </div>

      {/* QUICK STATS - BALANCED */}
      <KRow gutter={[32, 32]} className="mb-24">
        <KCol xs={24} sm={12} lg={6}>
          <KStatCard title="Átomos" value={khorCounts.atoms} icon={<Atom size={22} />} change={12} changeLabel="Audited Atoms" />
        </KCol>
        <KCol xs={24} sm={12} lg={6}>
          <KStatCard title="Moléculas" value={khorCounts.molecules} icon={<Layers size={22} />} change={8} changeLabel="Smart Molecules" />
        </KCol>
        <KCol xs={24} sm={12} lg={6}>
          <KStatCard title="Organismos" value={khorCounts.organisms} icon={<Box size={22} />} change={15} changeLabel="Complex Suite" />
        </KCol>
        <KCol xs={24} sm={12} lg={6}>
          <KStatCard title="Patrones" value={khorCounts.patterns} icon={<LayoutTemplate size={22} />} changeLabel="SaaS Blueprints" />
        </KCol>
      </KRow>

      {/* CORE PILLARS */}
      <KCardSection title="Principios v5.0 Elite" className="mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard
            icon={Cpu}
            title="Intent-Based Logic"
            description="Tus componentes ya no son solo estética. Cada uno expone metadatos que permiten a la IA entender su propósito funcional en tiempo real."
          />
          <FeatureCard
            icon={Zap}
            title="Fluid Design Tokens"
            description="Olvídate de los breakpoints manuales. Nuestro motor usa matemáticas fluidas para que tu UI se vea perfecta en un Apple Watch o una pantalla 8K."
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Enterprise Security"
            description="Validado contra estándares WCAG 2.2 AA (AAA en componentes específicos) y W3C DTCG. Auditoría continua con axe-core en pipeline CI."
          />
        </div>
      </KCardSection>

      {/* QUICK START COMMAND */}
      <div className="bg-khor-neutral-900 rounded-[3rem] p-16 mb-24 border border-khor-neutral-800 shadow-3xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-khor-primary shadow-[0_0_20px_rgba(224,77,54,0.5)]" />
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-khor-primary/10 rounded-xl">
              <Terminal className="text-khor-primary" size={24} />
            </div>
            <KText variant="h2" className="text-white font-black tracking-tight">Consola de Instalación</KText>
          </div>
          <KBadge status="processing" label="stable channel" className="px-4 py-1" />
        </div>

        <div className="font-mono text-base space-y-4 bg-black/30 p-8 rounded-2xl border border-white/5">
          <div className="flex gap-4">
            <span className="text-khor-neutral-600 select-none">01</span>
            <span className="text-white">pnpm add <span className="text-khor-primary font-bold">@khor/design-system</span></span>
          </div>
          <div className="flex gap-4">
            <span className="text-khor-neutral-600 select-none">02</span>
            <span className="text-khor-neutral-400">import {'{ KAppShell, KButton }'} from '@khor/core';</span>
          </div>
        </div>

        <KButton
          variant="ghost"
          className="mt-10 text-khor-neutral-400 hover:text-white p-0 h-auto text-lg"
          onClick={() => navigate('/ai-export')}
        >
          Explorar documentación de ingeniería →
        </KButton>
      </div>

      {/* TOOLS GALLERY */}
      <KCardSection title="Herramientas del Ecosistema">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: <Brush size={22} />, title: 'Theming Live', desc: 'ADN visual dinámico.', path: '/theming' },
            { icon: <Figma size={22} />, title: 'Bridge Figma', desc: 'Sincronización total.', path: '/figma-export' },
            { icon: <Bot size={22} />, title: 'IA Guide', desc: 'Source of Truth para Agentes.', path: '/ai-export' },
            { icon: <Clock size={22} />, title: 'Changelog', desc: 'Evolución v5.0-alpha.', path: '/changelog' },
            { icon: <Shield size={22} />, title: 'A11y Guardian', desc: 'Auditoría automática.', path: '/guardian' },
            { icon: <BookOpen size={22} />, title: 'Recipes', desc: 'Patrones listos para SaaS.', path: '/patterns' },
          ].map((tool) => (
            <div
              key={tool.title}
              onClick={() => navigate(tool.path)}
              className="flex items-center gap-5 p-6 rounded-3xl border border-khor-border-muted hover:bg-white dark:hover:bg-khor-surface-hover hover:shadow-khor-lg hover:border-khor-primary/20 cursor-pointer transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-khor-neutral-100 dark:bg-khor-neutral-800 flex items-center justify-center text-khor-secondary dark:text-white group-hover:bg-khor-primary group-hover:text-white transition-all shadow-sm">
                {tool.icon}
              </div>
              <div>
                <KText variant="body-lg" className="font-bold text-khor-secondary dark:text-white">{tool.title}</KText>
                <KText variant="small" className="text-khor-neutral-500">{tool.desc}</KText>
              </div>
            </div>
          ))}
        </div>
      </KCardSection>
    </div>
  );
}

export default HomePage;