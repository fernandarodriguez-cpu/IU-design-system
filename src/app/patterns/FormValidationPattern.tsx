import React, { useState } from 'react';
import { Mail, Save } from 'lucide-react';
import { KInput } from '../components/design-system/atoms/KInput/index';
import { KButton } from '../components/design-system/atoms/KButton/index';
import { KAlert } from '../components/design-system/atoms/KAlert/index';
import { KFormField } from '../components/design-system/molecules/KFormField/index';
import { KSelectField } from '../components/design-system/molecules/KSelectField/index';
import { Pattern } from './types';

function FormValidationComponent() {
  const [form, setForm] = useState({ name: '', email: '', role: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'El nombre es obligatorio';
    if (!form.email.includes('@')) e.email = 'Email no válido';
    if (!form.role) e.role = 'Selecciona un rol';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
    }
  };

  return (
    <div style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {submitted && <KAlert type="success" title="Usuario creado exitosamente" showIcon />}
      <KFormField label="Nombre Completo" required error={errors.name}>
        <KInput placeholder="Juan Pérez" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} />
      </KFormField>
      <KFormField label="Email" required error={errors.email}>
        <KInput placeholder="juan@empresa.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} prefix={<Mail size={16} />} />
      </KFormField>
      <KFormField label="Rol" required error={errors.role}>
        <KSelectField placeholder="Seleccionar rol" options={[
          { label: 'Administrador', value: 'admin' },
          { label: 'Editor', value: 'editor' },
          { label: 'Viewer', value: 'viewer' },
        ]} value={form.role} onChange={(v) => setForm({ ...form, role: String(v) })} />
      </KFormField>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <KButton variant="ghost" onClick={() => { setForm({ name: '', email: '', role: '' }); setErrors({}); }}>Cancelar</KButton>
        <KButton variant="primary" icon={<Save size={16} />} onClick={handleSubmit}>Guardar</KButton>
      </div>
    </div>
  );
}

export const FormValidationPattern: Pattern = {
  id: 'form-validation',
  title: 'Formulario con Validación',
  description: 'Formulario completo con KFormField, validación inline, mensajes de error y feedback de éxito.',
  category: 'Formularios',
  component: <FormValidationComponent />,
  code: `import { KFormField, KSelectField } from '@khor/molecules';
import { KInput, KButton, KAlert } from '@khor/atoms';

// Validación inline con errores
<KFormField label="Email" required error={errors.email}>
  <KInput placeholder="juan@empresa.com"
    value={form.email}
    onChange={(e) => setForm({...form, email: e.target.value})}
    error={!!errors.email} icon={<Mail size={16} />}
  />
</KFormField>`,
};
