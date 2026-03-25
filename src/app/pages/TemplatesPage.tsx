/**
 * TemplatesPage — Templates pre-construidos del Khor Design System
 * Combinaciones de organismos y moléculas listas para usar.
 */
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { KButton, KInput, KText, KCheckbox, KBadge, KAvatar, KProgress, KAlert } from '../components/design-system/atoms/index';
import { KFormField, KStatCard, KUserCell, KSearchInput, KBreadcrumb, KSteps, KSelectField } from '../components/design-system/molecules/index';
import { KDataTable, KSparklineCell, KCardSection, KTabs, KModal } from '../components/design-system/organisms/index';
import { CodeBlock } from '../components/docs/CodeBlock';
import {
  Users, DollarSign, TrendingUp, BarChart3, Mail, Lock, Eye,
  Plus, Filter, Download, ArrowRight, FileText, Calendar, Settings,
} from 'lucide-react';
import { khorTokens } from '../theme/khor-theme';

const t = khorTokens;

import { KLoginForm } from '../components/design-system/organisms/index';

/* ─── Login Template ────────────────────────── */
function LoginTemplate() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 600, backgroundColor: t.colors.neutral[100], borderRadius: t.radius.lg, padding: 24 }}>
      <KLoginForm onFinish={(v) => console.log('Login:', v)} />
    </div>
  );
}

/* ─── Dashboard Template ────────────────────── */
function DashboardTemplate() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: t.typography.fontPrimary }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <KText variant="h2" color="navy">Dashboard</KText>
          <KText variant="body-md" color="secondary">Resumen general del sistema — Marzo 2026</KText>
        </div>
        <KButton variant="primary" icon={<Download size={16} />}>Exportar Reporte</KButton>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <KStatCard title="Empleados Activos" value="1,247" change={12.5} changeLabel="vs. mes anterior" sparkData={[40, 45, 42, 50, 48, 55, 60]} icon={<Users size={20} />} />
        <KStatCard title="Nómina Mensual" value="$2.4M" change={-3.2} changeLabel="vs. mes anterior" sparkData={[60, 55, 50, 48, 45, 42, 40]} icon={<DollarSign size={20} />} />
        <KStatCard title="Retención" value="94.5%" change={1.8} changeLabel="trimestral" sparkData={[88, 90, 91, 92, 93, 94, 94.5]} icon={<TrendingUp size={20} />} />
        <KStatCard title="Vacantes Abiertas" value="8" change={-25} changeLabel="vs. mes anterior" sparkData={[15, 12, 10, 8, 9, 8, 8]} icon={<BarChart3 size={20} />} />
      </div>
      <KAlert type="warning" title="3 contratos próximos a vencer" description="Revisa los contratos de Ana López, Pedro Martínez y Laura Díaz que vencen esta semana." closable />
      <KCardSection title="Actividad Reciente" subtitle="Últimos movimientos del equipo">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { name: 'María García', action: 'fue promovida a Gerente', time: 'Hace 2 horas', badge: 'success' as const },
            { name: 'Juan Pérez', action: 'completó onboarding', time: 'Hace 5 horas', badge: 'info' as const },
            { name: 'Ana López', action: 'contrato por vencer', time: 'En 3 días', badge: 'warning' as const },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 2 ? `1px solid ${t.colors.neutral[200]}` : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <KAvatar name={item.name} size="small" />
                <div>
                  <KText variant="body-md"><strong>{item.name}</strong> {item.action}</KText>
                  <KText variant="caption" color="muted">{item.time}</KText>
                </div>
              </div>
              <KBadge khorStatus={item.badge as any} label={item.badge === 'success' ? 'Completado' : item.badge === 'warning' ? 'Atención' : 'Info'} />
            </div>
          ))}
        </div>
      </KCardSection>
    </div>
  );
}

/* ─── CRUD Table Template ───────────────────── */
function CrudTemplate() {
  const mockData = [
    { id: '1', name: 'María García', dept: 'Recursos Humanos', status: 'success', salary: '$45,000', trend: [30, 35, 40, 38, 42, 45] },
    { id: '2', name: 'Juan Pérez', dept: 'Tecnología', status: 'success', salary: '$62,000', trend: [40, 45, 48, 52, 55, 62] },
    { id: '3', name: 'Ana López', dept: 'Finanzas', status: 'warning', salary: '$48,000', trend: [48, 47, 46, 48, 47, 48] },
    { id: '4', name: 'Carlos Ruiz', dept: 'Operaciones', status: 'error', salary: '$35,000', trend: [40, 38, 36, 35, 34, 35] },
    { id: '5', name: 'Laura Díaz', dept: 'Tecnología', status: 'success', salary: '$58,000', trend: [35, 40, 45, 48, 52, 58] },
  ];

  const statusLabels: Record<string, string> = { success: 'Activo', warning: 'Pendiente', error: 'Inactivo' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: t.typography.fontPrimary }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <KBreadcrumb items={[{ title: 'Dashboard' }, { title: 'Empleados' }]} />
          <KText variant="h2" color="navy">Gestión de Empleados</KText>
        </div>
      </div>
      <KDataTable
        columns={[
          { key: 'name', title: 'Empleado', dataIndex: 'name', sortable: true, render: (v: string) => <KUserCell name={v} /> },
          { key: 'dept', title: 'Departamento', dataIndex: 'dept', sortable: true },
          { key: 'status', title: 'Estado', dataIndex: 'status', render: (v: string) => <KBadge status={v as any} label={statusLabels[v] || v} /> },
          { key: 'salary', title: 'Salario', dataIndex: 'salary', sortable: true },
          { key: 'trend', title: 'Tendencia', dataIndex: 'trend', width: 100, render: (v: number[]) => <KSparklineCell data={v} /> },
        ]}
        data={mockData}
        searchPlaceholder="Buscar empleados..."
        actions={
          <>
            <KButton variant="secondary" size="sm" icon={<Filter size={14} />}>Filtrar</KButton>
            <KButton variant="secondary" size="sm" icon={<Download size={14} />}>Exportar</KButton>
            <KButton variant="primary" size="sm" icon={<Plus size={14} />}>Nuevo Empleado</KButton>
          </>
        }
      />
    </div>
  );
}

/* ─── Form Template ─────────────────────────── */
function FormTemplate() {
  const [step, setStep] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: t.typography.fontPrimary }}>
      <div>
        <KBreadcrumb items={[{ title: 'Empleados' }, { title: 'Nuevo Empleado' }]} />
        <KText variant="h2" color="navy">Registro de Nuevo Empleado</KText>
      </div>
      <KSteps
        current={step}
        onChange={setStep}
        items={[
          { title: 'Datos Personales' },
          { title: 'Puesto y Salario' },
          { title: 'Revisión' },
        ]}
      />
      <KCardSection title={step === 0 ? 'Datos Personales' : step === 1 ? 'Puesto y Salario' : 'Revisión Final'}>
        {step === 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <KFormField label="Nombre" required><KInput placeholder="Nombre" /></KFormField>
            <KFormField label="Apellido" required><KInput placeholder="Apellido" /></KFormField>
            <KFormField label="Email corporativo" required><KInput placeholder="email@khor.com" prefix={<Mail size={16} />} /></KFormField>
            <KFormField label="Teléfono"><KInput placeholder="+52 (55) 1234-5678" /></KFormField>
          </div>
        )}
        {step === 1 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <KSelectField label="Departamento" required options={[{ label: 'Recursos Humanos', value: 'rh' }, { label: 'Tecnología', value: 'tech' }, { label: 'Finanzas', value: 'fin' }]} placeholder="Seleccionar..." />
            <KFormField label="Puesto" required><KInput placeholder="Ej: Desarrollador Senior" /></KFormField>
            <KFormField label="Salario mensual" required><KInput placeholder="$0.00" type="number" prefix={<DollarSign size={16} />} /></KFormField>
            <KSelectField label="Tipo de contrato" options={[{ label: 'Indefinido', value: 'indef' }, { label: 'Temporal', value: 'temp' }, { label: 'Por proyecto', value: 'proy' }]} placeholder="Seleccionar..." />
          </div>
        )}
        {step === 2 && (
          <div>
            <KAlert type="info" title="Revisa la información antes de confirmar" description="Una vez registrado, recibirá un email de bienvenida con sus credenciales de acceso." />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
              <div><KText variant="small" color="muted">Nombre</KText><KText variant="body-md">María García López</KText></div>
              <div><KText variant="small" color="muted">Email</KText><KText variant="body-md">maria@khor.com</KText></div>
              <div><KText variant="small" color="muted">Departamento</KText><KText variant="body-md">Tecnología</KText></div>
              <div><KText variant="small" color="muted">Salario</KText><KText variant="body-md">$62,000 MXN</KText></div>
            </div>
          </div>
        )}
      </KCardSection>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        {step > 0 && <KButton variant="secondary" onClick={() => setStep(step - 1)}>Anterior</KButton>}
        {step < 2 ? (
          <KButton variant="primary" onClick={() => setStep(step + 1)} icon={<ArrowRight size={16} />} iconPosition="end">Siguiente</KButton>
        ) : (
          <KButton variant="primary">Registrar Empleado</KButton>
        )}
      </div>
    </div>
  );
}

/* ─── Template Registry ─────────────────────── */
interface TemplateEntry {
  id: string;
  name: string;
  description: string;
  preview: React.ReactNode;
  code: string;
}

const templates: Record<string, TemplateEntry> = {
  login: {
    id: 'login',
    name: 'Login',
    description: 'Pantalla de inicio de sesión con formulario de credenciales, opciones de recordar sesión y recuperación de contraseña. Lista para personalizar.',
    preview: <LoginTemplate />,
    code: `// Template: Login Page
// Componentes utilizados: KButton, KInput, KFormField, KCheckbox, KText

import { KButton, KInput, KCheckbox, KText } from '@khor/design-system/atoms/index';
import { KFormField } from '@khor/design-system/molecules/index';

function LoginPage() {
  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 40 }}>
      <KText variant="h3" color="navy">Bienvenido a Khor</KText>
      <KFormField label="Email" required>
        <KInput placeholder="tu@empresa.com" prefix={<Mail size={16} />} />
      </KFormField>
      <KFormField label="Contraseña" required>
        <KInput type="password" prefix={<Lock size={16} />} />
      </KFormField>
      <KCheckbox label="Recordarme" />
      <KButton variant="primary" block>Iniciar Sesión</KButton>
    </div>
  );
}`,
  },
  dashboard: {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Panel de control con KPIs, sparklines, alertas de atención y actividad reciente. Ideal como página principal de cualquier módulo SaaS.',
    preview: <DashboardTemplate />,
    code: `// Template: Dashboard
// Componentes: KStatCard, KCardSection, KBadge, KAvatar, KAlert, KText

import { KStatCard } from '@khor/design-system/molecules/index';
import { KCardSection } from '@khor/design-system/organisms/index';
import { KBadge, KAvatar, KAlert, KText } from '@khor/design-system/atoms/index';

function DashboardPage() {
  return (
    <div>
      <KText variant="h2" color="navy">Dashboard</KText>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <KStatCard title="Empleados" value="1,247" change={12.5} sparkData={[...]} icon={<Users />} />
        {/* Más StatCards... */}
      </div>
      <KAlert type="warning" title="Contratos por vencer" closable />
      <KCardSection title="Actividad Reciente">
        {/* Lista de actividad... */}
      </KCardSection>
    </div>
  );
}`,
  },
  crud: {
    id: 'crud',
    name: 'CRUD Table',
    description: 'Vista de listado con tabla de datos, búsqueda, filtros, ordenamiento, paginación y sparklines. La estructura estándar para gestionar cualquier entidad.',
    preview: <CrudTemplate />,
    code: `// Template: CRUD Table
// Componentes: KDataTable, KSparklineCell, KBadge, KUserCell, KBreadcrumb, KButton

import { KDataTable, KSparklineCell } from '@khor/design-system/organisms/index';
import { KUserCell, KBreadcrumb } from '@khor/design-system/molecules/index';
import { KBadge, KButton } from '@khor/design-system/atoms/index';

function EmployeesPage() {
  const columns = [
    { key: 'name', title: 'Empleado', dataIndex: 'name', sortable: true,
      render: (v) => <KUserCell name={v} /> },
    { key: 'dept', title: 'Departamento', dataIndex: 'dept', sortable: true },
    { key: 'status', title: 'Estado', dataIndex: 'status',
      render: (v) => <KBadge status={v} label={statusMap[v]} /> },
    { key: 'trend', title: 'Tendencia', dataIndex: 'trend',
      render: (v) => <KSparklineCell data={v} /> },
  ];

  return (
    <div>
      <KBreadcrumb items={[{ title: 'Dashboard' }, { title: 'Empleados' }]} />
      <KDataTable columns={columns} data={employees}
        actions={<KButton variant="primary" size="sm">Nuevo</KButton>} />
    </div>
  );
}`,
  },
  form: {
    id: 'form',
    name: 'Formulario Multi-Paso',
    description: 'Formulario con stepper de progreso, validación por sección y vista de confirmación. Usa KSteps, KFormField, KCardSection y KSelectField.',
    preview: <FormTemplate />,
    code: `// Template: Multi-Step Form
// Componentes: KSteps, KFormField, KInput, KSelectField, KCardSection, KButton, KAlert

import { KSteps, KFormField, KSelectField, KBreadcrumb } from '@khor/design-system/molecules/index';
import { KCardSection } from '@khor/design-system/organisms/index';
import { KButton, KInput, KAlert, KText } from '@khor/design-system/atoms/index';

function NewEmployeeForm() {
  const [step, setStep] = useState(0);

  return (
    <div>
      <KBreadcrumb items={[{ title: 'Empleados' }, { title: 'Nuevo' }]} />
      <KSteps current={step} onChange={setStep} items={[
        { title: 'Datos Personales' },
        { title: 'Puesto y Salario' },
        { title: 'Revisión' },
      ]} />
      <KCardSection title={stepTitles[step]}>
        {/* Contenido del paso actual */}
      </KCardSection>
      <KButton variant="primary" onClick={() => setStep(step + 1)}>
        {step < 2 ? 'Siguiente' : 'Registrar'}
      </KButton>
    </div>
  );
}`,
  },
};

export function TemplatesPage() {
  const { id } = useParams<{ id: string }>();
  const tmpl = id ? templates[id] : null;

  if (!tmpl) {
    return (
      <div style={{ textAlign: 'center', padding: 64, fontFamily: t.typography.fontPrimary }}>
        <KText variant="h2" color="navy">Template no encontrado</KText>
        <KText variant="body-md" color="secondary">Selecciona un template del menú lateral.</KText>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: t.typography.fontPrimary }}>
      <div style={{ marginBottom: 24 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: t.colors.brand.primary, textTransform: 'uppercase', letterSpacing: 1 }}>TEMPLATE</span>
        <h2 style={{ margin: '4px 0 0', fontSize: 30, fontWeight: 700, color: t.colors.brand.navy }}>{tmpl.name}</h2>
        <p style={{ margin: '8px 0 0', fontSize: 16, color: t.colors.neutral[500], lineHeight: 1.5 }}>{tmpl.description}</p>
      </div>

      {/* Preview */}
      <div style={{ marginBottom: 24 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: t.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Vista Previa</h4>
        <div style={{ borderRadius: t.radius.lg, border: `1px solid ${t.colors.neutral[200]}`, overflow: 'hidden' }}>
          {tmpl.preview}
        </div>
      </div>

      {/* Code */}
      <div>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: t.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Código</h4>
        <CodeBlock code={tmpl.code} filename={`Template${tmpl.name}.tsx`} />
      </div>
    </div>
  );
}