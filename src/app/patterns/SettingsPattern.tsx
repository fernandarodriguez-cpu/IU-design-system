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
    <div style={{ maxWidth: 520 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Section: Profile */}
        <div style={{ padding: 20, borderRadius: t.radius.lg, backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Users size={16} color="var(--foreground)" />
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--foreground)' }}>Perfil</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <KFormField label="Nombre"><KInput value="Ana García" /></KFormField>
            <KFormField label="Email"><KInput value="ana@khor.io" prefix={<Mail size={16} />} /></KFormField>
          </div>
        </div>

        {/* Section: Notifications */}
        <div style={{ padding: 20, borderRadius: t.radius.lg, backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Bell size={16} color="var(--foreground)" />
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--foreground)' }}>Notificaciones</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--foreground)' }}>Notificaciones push</div>
                <div style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>Recibe alertas en tiempo real</div>
              </div>
              <KSwitch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--foreground)' }}>Emails de marketing</div>
                <div style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>Promociones y novedades</div>
              </div>
              <KSwitch checked={marketing} onCheckedChange={setMarketing} />
            </div>
          </div>
        </div>

        {/* Section: Preferences */}
        <div style={{ padding: 20, borderRadius: t.radius.lg, backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Settings size={16} color="var(--foreground)" />
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--foreground)' }}>Preferencias</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {darkMode ? <Moon size={16} color="var(--foreground)" /> : <Sun size={16} color="var(--foreground)" />}
                <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--foreground)' }}>Modo oscuro</span>
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

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <KButton variant="ghost">Cancelar</KButton>
          <KButton variant="primary" icon={<Save size={16} />}>Guardar Cambios</KButton>
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
  code: `import { KFormField } from '@khor/molecules';
import { KInput, KButton, KCheckbox } from '@khor/atoms';

// Settings page
<div style={{ maxWidth: 520 }}>
  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
    {/* Section: Profile */}
    <div style={{ padding: 20, borderRadius: t.radius.lg, backgroundColor: 'var(--card)', border: \\\`1px solid var(--border)\\\` }}>
      {/* ... */}
    </div>
  </div>
</div>`,
};
