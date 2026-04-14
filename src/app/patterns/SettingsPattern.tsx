import React, { useState } from 'react';
import { Users, Mail, Bell, Settings, Moon, Sun, Save } from 'lucide-react';
import { KInput } from '../components/design-system/atoms/KInput/index';
import { KButton } from '../components/design-system/atoms/KButton/index';
import { KSwitch } from '../components/design-system/atoms/KSwitch/index';
import { KFormField } from '../components/design-system/molecules/KFormField/index';
import { KSelectField } from '../components/design-system/molecules/KSelectField/index';
import { khorTokens } from '../theme/khor-theme';
import { Pattern } from './types';

const t = khorTokens;

function SettingsPatternComponent() {
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('es');

  return (
    <div style={{ maxWidth: t.layout.contentWidth }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: t.spacing.md }}>
        {/* Section: Profile */}
        <div style={{ padding: t.spacing.md, borderRadius: t.radius.lg, backgroundColor: t.semantic.surface.card, border: `1px solid ${t.semantic.border.default}`, boxShadow: t.shadows.sm }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing.sm, marginBottom: t.spacing.md }}>
            <Users size={t.icon.sm} color={t.semantic.text.primary} />
            <span style={{ fontSize: t.typography.bodySm.size, fontWeight: t.typography.fontWeights.semibold, color: t.semantic.text.primary }}>Perfil</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: t.spacing.sm }}>
            <KFormField label="Nombre"><KInput value="Ana García" /></KFormField>
            <KFormField label="Email"><KInput value="ana@khor.io" prefix={<Mail size={t.icon.sm} />} /></KFormField>
          </div>
        </div>

        {/* Section: Notifications */}
        <div style={{ padding: t.spacing.md, borderRadius: t.radius.lg, backgroundColor: t.semantic.surface.card, border: `1px solid ${t.semantic.border.default}`, boxShadow: t.shadows.sm }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing.sm, marginBottom: t.spacing.md }}>
            <Bell size={t.icon.sm} color={t.semantic.text.primary} />
            <span style={{ fontSize: t.typography.bodySm.size, fontWeight: t.typography.fontWeights.semibold, color: t.semantic.text.primary }}>Notificaciones</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: t.spacing.sm }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: t.typography.bodySm.size, fontWeight: t.typography.fontWeights.medium, color: t.semantic.text.primary }}>Notificaciones push</div>
                <div style={{ fontSize: t.typography.bodyXs.size, color: t.semantic.text.muted }}>Recibe alertas en tiempo real</div>
              </div>
              <KSwitch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: t.typography.bodySm.size, fontWeight: t.typography.fontWeights.medium, color: t.semantic.text.primary }}>Emails de marketing</div>
                <div style={{ fontSize: t.typography.bodyXs.size, color: t.semantic.text.muted }}>Promociones y novedades</div>
              </div>
              <KSwitch checked={marketing} onCheckedChange={setMarketing} />
            </div>
          </div>
        </div>

        {/* Section: Preferences */}
        <div style={{ padding: t.spacing.md, borderRadius: t.radius.lg, backgroundColor: t.semantic.surface.card, border: `1px solid ${t.semantic.border.default}`, boxShadow: t.shadows.sm }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing.sm, marginBottom: t.spacing.md }}>
            <Settings size={t.icon.sm} color={t.semantic.text.primary} />
            <span style={{ fontSize: t.typography.bodySm.size, fontWeight: t.typography.fontWeights.semibold, color: t.semantic.text.primary }}>Preferencias</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: t.spacing.sm }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing.sm }}>
                {darkMode ? <Moon size={t.icon.sm} color={t.semantic.text.primary} /> : <Sun size={t.icon.sm} color={t.semantic.text.primary} />}
                <span style={{ fontSize: t.typography.bodySm.size, fontWeight: t.typography.fontWeights.medium, color: t.semantic.text.primary }}>Modo oscuro</span>
              </div>
              <KSwitch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
            <KFormField label="Idioma">
              <KSelectField
                placeholder="Seleccionar idioma"
                options={[
                  { label: 'Español', value: 'es' },
                  { label: 'English', value: 'en' },
                  { label: 'Português', value: 'pt' },
                ]}
                value={language}
                onChange={(v) => setLanguage(String(v))}
              />
            </KFormField>
          </div>
        </div>

        <div style={{ display: 'flex', gap: t.spacing.sm, justifyContent: 'flex-end' }}>
          <KButton variant="ghost">Cancelar</KButton>
          <KButton variant="primary" icon={<Save size={t.icon.sm} />}>Guardar Cambios</KButton>
        </div>
      </div>
    </div>
  );
}

export const SettingsPattern: Pattern = {
  id: 'settings-pattern',
  title: 'Settings Page',
  description: 'Página de configuración con KFormField, KSwitch y KSelectField.',
  category: 'Configuración',
  component: <SettingsPatternComponent />,
  code: `import { KFormField, KSelectField } from '@khor/molecules';
import { KInput, KButton, KSwitch } from '@khor/atoms';

// Settings page
<div style={{ maxWidth: t.layout.contentWidth }}>
  <div style={{ display: 'flex', flexDirection: 'column', gap: t.spacing.md }}>
    {/* Section: Profile */}
    <div style={{ padding: t.spacing.md, borderRadius: t.radius.lg, backgroundColor: t.semantic.surface.card, border: \\\`1px solid ${t.semantic.border.default}\\\` }}>
      {/* ... */}
    </div>
  </div>
</div>`,
};
