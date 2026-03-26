/**
 * PatternsPage — Patrones y Recipes del Khor Design System.
 * Combinaciones frecuentes de componentes que resuelven casos reales.
 */
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  Search, Filter, Plus, Edit, Trash2, Save, X, Check,
  Users, DollarSign, TrendingUp, BarChart3, ArrowRight,
  Mail, Lock, Eye, EyeOff, AlertCircle, Copy,
  ChevronLeft, ChevronRight, Settings, Bell, Moon, Sun, Globe,
  Menu, ChevronDown, Home, Box, Layers, Palette, BookOpen
} from 'lucide-react';
import { KButton, KInput, KBadge, KAlert, KSwitch, KCheckbox } from '../components/design-system/atoms/index';
import { KFormField, KStatCard, KSelectField, KSearchInput, KSteps, KNavItem } from '../components/design-system/molecules/index';
import { KCardSection, KTabs } from '../components/design-system/organisms/index';
import { CodeBlock } from '../components/docs/CodeBlock';
import { khorTokens } from '../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ─── Pattern 1: Dashboard con Stats + Filtros ─── */
function DashboardPattern() {
  const [period, setPeriod] = useState('7d');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--foreground)' }}>Resumen del Periodo</h4>
        <div style={{ display: 'flex', gap: 4 }}>
          {[{ l: '7D', v: '7d' }, { l: '30D', v: '30d' }, { l: '90D', v: '90d' }].map((p) => (
            <button key={p.v} onClick={() => setPeriod(p.v)} style={{
              padding: '4px 12px', borderRadius: 6, border: 'none', fontSize: 12, fontWeight: 500,
              backgroundColor: period === p.v ? t.colors.brand.primary : 'var(--muted)',
              color: period === p.v ? '#fff' : 'var(--muted-foreground)', cursor: 'pointer', fontFamily: font,
            }}>{p.l}</button>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        <KStatCard title="Ingresos" value="$48,250" change={12.5} changeLabel="vs. periodo anterior" icon={<DollarSign size={20} />} sparkData={[30, 40, 35, 50, 49, 60, 70, 91]} />
        <KStatCard title="Usuarios" value="1,247" change={8.2} changeLabel="nuevos registros" icon={<Users size={20} />} sparkData={[20, 25, 30, 28, 35, 42, 48, 55]} />
        <KStatCard title="Conversión" value="3.2%" change={-2.1} changeLabel="vs. mes anterior" icon={<TrendingUp size={20} />} sparkData={[40, 38, 42, 35, 30, 32, 28, 25]} />
      </div>
    </div>
  );
}

/* ─── Pattern 2: Formulario con Validación ─── */
function FormValidationPattern() {
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
      {submitted && <KAlert type="success" message="Usuario creado exitosamente" showIcon />}
      <KFormField label="Nombre Completo" required error={errors.name}>
        <KInput placeholder="Juan Pérez" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={!!errors.name} />
      </KFormField>
      <KFormField label="Email" required error={errors.email}>
        <KInput placeholder="juan@empresa.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={!!errors.email} icon={<Mail size={16} />} />
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

/* ─── Pattern 3: Lista Filtrable con Acciones ─── */
function FilterableListPattern() {
  const [search, setSearch] = useState('');
  const items = [
    { id: 1, name: 'Ana García', email: 'ana@khor.io', role: 'Admin', status: 'Activo' },
    { id: 2, name: 'Carlos López', email: 'carlos@khor.io', role: 'Editor', status: 'Activo' },
    { id: 3, name: 'María Torres', email: 'maria@khor.io', role: 'Viewer', status: 'Inactivo' },
    { id: 4, name: 'Pedro Ruiz', email: 'pedro@khor.io', role: 'Editor', status: 'Activo' },
  ];
  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()) || i.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <KSearchInput placeholder="Buscar usuarios..." value={search} onChange={setSearch} />
        </div>
        <KButton variant="primary" icon={<Plus size={16} />} size="sm">Nuevo</KButton>
      </div>
      <div style={{ borderRadius: t.radius.lg, border: `1px solid var(--border)`, overflow: 'hidden' }}>
        {filtered.map((u, i) => (
          <div key={u.id} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
            borderBottom: i < filtered.length - 1 ? `1px solid var(--border)` : 'none',
            backgroundColor: 'var(--card)',
          }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'rgba(224,77,54,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.colors.brand.primary, fontSize: 13, fontWeight: 600 }}>
              {u.name[0]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--foreground)' }}>{u.name}</div>
              <div style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>{u.email}</div>
            </div>
            <KBadge variant={u.role === 'Admin' ? 'primary' : 'default'}>{u.role}</KBadge>
            <KBadge variant={u.status === 'Activo' ? 'success' : 'default'}>{u.status}</KBadge>
            <div style={{ display: 'flex', gap: 4 }}>
              <KButton variant="ghost" size="sm" icon={<Edit size={14} />} />
              <KButton variant="ghost" size="sm" icon={<Trash2 size={14} />} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Pattern 4: Login Form ─── */
function LoginPattern() {
  const [show, setShow] = useState(false);
  return (
    <div style={{ maxWidth: 360, margin: '0 auto', padding: 32, borderRadius: t.radius.xl, backgroundColor: 'var(--card)', boxShadow: t.shadows.lg, border: `1px solid var(--border)` }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: t.colors.brand.primary, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 20, marginBottom: 12 }}>K</div>
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: 'var(--foreground)' }}>Iniciar Sesión</h3>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--muted-foreground)' }}>Ingresa tus credenciales</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <KFormField label="Email">
          <KInput placeholder="tu@empresa.com" icon={<Mail size={16} />} />
        </KFormField>
        <KFormField label="Contraseña">
          <KInput type={show ? 'text' : 'password'} placeholder="••••••••" icon={<Lock size={16} />}
            suffix={<button onClick={() => setShow(!show)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted-foreground)', display: 'flex' }}>{show ? <EyeOff size={16} /> : <Eye size={16} />}</button>}
          />
        </KFormField>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <KCheckbox label="Recordarme" />
          <a href="#" style={{ fontSize: 13, color: t.colors.brand.primary, textDecoration: 'none' }}>Olvidé mi contraseña</a>
        </div>
        <KButton variant="primary" size="lg" style={{ width: '100%' }}>Iniciar Sesión</KButton>
      </div>
    </div>
  );
}

/* ─── Pattern 5: Tabla con Paginación ─── */
function PaginatedTablePattern() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const pageSize = 5;
  const allData = [
    { id: 'INV-001', cliente: 'Empresa Alpha', monto: '$12,500', estado: 'Pagado', fecha: '05 Mar 2026' },
    { id: 'INV-002', cliente: 'Beta Corp', monto: '$8,300', estado: 'Pendiente', fecha: '04 Mar 2026' },
    { id: 'INV-003', cliente: 'Gamma S.A.', monto: '$24,100', estado: 'Pagado', fecha: '03 Mar 2026' },
    { id: 'INV-004', cliente: 'Delta Labs', monto: '$5,750', estado: 'Vencido', fecha: '01 Mar 2026' },
    { id: 'INV-005', cliente: 'Epsilon Inc', monto: '$18,900', estado: 'Pagado', fecha: '28 Feb 2026' },
    { id: 'INV-006', cliente: 'Zeta Global', monto: '$31,200', estado: 'Pendiente', fecha: '27 Feb 2026' },
    { id: 'INV-007', cliente: 'Eta Systems', monto: '$7,450', estado: 'Pagado', fecha: '25 Feb 2026' },
    { id: 'INV-008', cliente: 'Theta Digital', monto: '$15,800', estado: 'Vencido', fecha: '22 Feb 2026' },
    { id: 'INV-009', cliente: 'Iota Media', monto: '$9,100', estado: 'Pagado', fecha: '20 Feb 2026' },
    { id: 'INV-010', cliente: 'Kappa Tech', monto: '$42,000', estado: 'Pendiente', fecha: '18 Feb 2026' },
  ];
  const filtered = allData.filter((d) => d.cliente.toLowerCase().includes(search.toLowerCase()) || d.id.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const statusColor = (s: string) => s === 'Pagado' ? 'success' : s === 'Pendiente' ? 'warning' : 'error';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ flex: 1 }}><KSearchInput placeholder="Buscar factura o cliente..." value={search} onChange={(v) => { setSearch(v); setPage(1); }} /></div>
        <KButton variant="primary" icon={<Plus size={16} />} size="sm">Nueva Factura</KButton>
      </div>
      <div style={{ borderRadius: t.radius.lg, border: `1px solid var(--border)`, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--muted)' }}>
              {['# Factura', 'Cliente', 'Monto', 'Estado', 'Fecha', ''].map((h) => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, borderBottom: `1px solid var(--border)`, color: 'var(--foreground)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((r, i) => (
              <tr key={r.id} style={{ backgroundColor: i % 2 === 0 ? 'var(--card)' : 'var(--muted)' }}>
                <td style={{ padding: '10px 14px', borderBottom: `1px solid var(--border)`, fontWeight: 600, color: 'var(--foreground)' }}>{r.id}</td>
                <td style={{ padding: '10px 14px', borderBottom: `1px solid var(--border)`, color: 'var(--foreground)' }}>{r.cliente}</td>
                <td style={{ padding: '10px 14px', borderBottom: `1px solid var(--border)`, fontWeight: 600, color: 'var(--foreground)' }}>{r.monto}</td>
                <td style={{ padding: '10px 14px', borderBottom: `1px solid var(--border)` }}>
                  <KBadge variant={statusColor(r.estado) as any}>{r.estado}</KBadge>
                </td>
                <td style={{ padding: '10px 14px', borderBottom: `1px solid var(--border)`, color: 'var(--muted-foreground)' }}>{r.fecha}</td>
                <td style={{ padding: '10px 14px', borderBottom: `1px solid var(--border)` }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <KButton variant="ghost" size="sm" icon={<Edit size={14} />} />
                    <KButton variant="ghost" size="sm" icon={<Trash2 size={14} />} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>
          {filtered.length} resultados &bull; Página {page} de {totalPages}
        </span>
        <div style={{ display: 'flex', gap: 4 }}>
          <KButton variant="outline" size="sm" icon={<ChevronLeft size={14} />} disabled={page <= 1} onClick={() => setPage(page - 1)} />
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setPage(i + 1)} style={{
              width: 32, height: 32, borderRadius: 6, border: 'none', fontSize: 13, fontWeight: 500,
              backgroundColor: page === i + 1 ? t.colors.brand.primary : 'transparent',
              color: page === i + 1 ? '#fff' : 'var(--muted-foreground)', cursor: 'pointer', fontFamily: font,
            }}>{i + 1}</button>
          ))}
          <KButton variant="outline" size="sm" icon={<ChevronRight size={14} />} disabled={page >= totalPages} onClick={() => setPage(page + 1)} />
        </div>
      </div>
    </div>
  );
}

/* ─── Pattern 6: Wizard Multi-Step ─── */
function WizardPattern() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', plan: '', cardName: '' });

  const steps = [
    { title: 'Información', description: 'Datos básicos' },
    { title: 'Plan', description: 'Elige tu plan' },
    { title: 'Pago', description: 'Método de pago' },
    { title: 'Confirmación', description: 'Verificar datos' },
  ];

  return (
    <div style={{ maxWidth: 520, margin: '0 auto' }}>
      <KSteps items={steps} current={step} />
      <div style={{ marginTop: 24, padding: 24, borderRadius: t.radius.lg, backgroundColor: 'var(--card)', border: `1px solid var(--border)` }}>
        {step === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <KFormField label="Nombre Completo" required>
              <KInput placeholder="Juan Pérez" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </KFormField>
            <KFormField label="Email" required>
              <KInput placeholder="juan@empresa.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} icon={<Mail size={16} />} />
            </KFormField>
          </div>
        )}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { name: 'Starter', price: '$9/mes', desc: '5 usuarios, 10GB' },
              { name: 'Pro', price: '$29/mes', desc: '25 usuarios, 100GB' },
              { name: 'Enterprise', price: '$99/mes', desc: 'Ilimitado' },
            ].map((p) => (
              <div key={p.name} onClick={() => setForm({ ...form, plan: p.name })} style={{
                padding: 16, borderRadius: t.radius.md, cursor: 'pointer',
                border: `2px solid ${form.plan === p.name ? t.colors.brand.primary : 'var(--border)'}`,
                backgroundColor: form.plan === p.name ? 'rgba(224,77,54,0.04)' : 'var(--card)',
                transition: 'all 0.15s ease',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--foreground)' }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>{p.desc}</div>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: form.plan === p.name ? t.colors.brand.primary : 'var(--foreground)' }}>{p.price}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <KFormField label="Nombre en la tarjeta">
              <KInput placeholder="Juan Pérez" value={form.cardName} onChange={(e) => setForm({ ...form, cardName: e.target.value })} />
            </KFormField>
            <KFormField label="Número de tarjeta">
              <KInput placeholder="4242 4242 4242 4242" icon={<DollarSign size={16} />} />
            </KFormField>
            <div style={{ display: 'flex', gap: 12 }}>
              <KFormField label="Expiración"><KInput placeholder="MM/AA" /></KFormField>
              <KFormField label="CVC"><KInput placeholder="123" /></KFormField>
            </div>
          </div>
        )}
        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: t.colors.feedback.successLight, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Check size={28} color="#2E7D32" />
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 600, color: 'var(--foreground)' }}>Todo listo</h3>
            <p style={{ margin: '0 0 12px', fontSize: 13, color: 'var(--muted-foreground)' }}>
              {form.name || 'Usuario'} &bull; {form.email || 'email@ejemplo.com'} &bull; Plan {form.plan || 'Starter'}
            </p>
            <KBadge variant="success">Suscripción activa</KBadge>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
        <KButton variant="ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>Anterior</KButton>
        {step < 3 ? (
          <KButton variant="primary" onClick={() => setStep(step + 1)} icon={<ArrowRight size={16} />}>
            {step === 2 ? 'Confirmar' : 'Siguiente'}
          </KButton>
        ) : (
          <KButton variant="primary" onClick={() => setStep(0)}>Nuevo Registro</KButton>
        )}
      </div>
    </div>
  );
}

/* ─── Pattern 7: Settings Page ─── */
function SettingsPattern() {
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('es');

  return (
    <div style={{ maxWidth: 520 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Section: Profile */}
        <div style={{ padding: 20, borderRadius: t.radius.lg, backgroundColor: 'var(--card)', border: `1px solid var(--border)` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Users size={16} color="var(--foreground)" />
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--foreground)' }}>Perfil</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <KFormField label="Nombre"><KInput value="Ana García" /></KFormField>
            <KFormField label="Email"><KInput value="ana@khor.io" icon={<Mail size={16} />} /></KFormField>
          </div>
        </div>

        {/* Section: Notifications */}
        <div style={{ padding: 20, borderRadius: t.radius.lg, backgroundColor: 'var(--card)', border: `1px solid var(--border)` }}>
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
              <KSwitch checked={notifications} onChange={setNotifications} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--foreground)' }}>Emails de marketing</div>
                <div style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>Promociones y novedades</div>
              </div>
              <KSwitch checked={marketing} onChange={setMarketing} />
            </div>
          </div>
        </div>

        {/* Section: Preferences */}
        <div style={{ padding: 20, borderRadius: t.radius.lg, backgroundColor: 'var(--card)', border: `1px solid var(--border)` }}>
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
              <KSwitch checked={darkMode} onChange={setDarkMode} />
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

/* ─── Pattern 8: App Sidebar ─── */
function SidebarPattern() {
  const [collapsed, setCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ 'Componentes': true });
  const [activePath, setActivePath] = useState('/components/buttons');

  const nav = [
    { title: 'Dashboard', icon: <Home size={18} strokeWidth={2} />, path: '/dashboard' },
    {
      title: 'Componentes', icon: <Layers size={18} strokeWidth={2} />,
      items: [
        { label: 'Botones (Atoms)', path: '/components/buttons' },
        { label: 'Formularios (Mols)', path: '/components/forms' },
      ]
    },
    { title: 'Configuración', icon: <Settings size={18} strokeWidth={2} />, path: '/settings' }
  ];

  const SIDEBAR_BG = '#051758';
  const toggleSection = (t: string) => setOpenSections(prev => ({ ...prev, [t]: !prev[t] }));
  const NavDot = () => <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'currentColor', opacity: 0.6, display: 'inline-block', flexShrink: 0 }} />;

  return (
    <div style={{ height: 500, display: 'flex', borderRadius: t.radius.xl, overflow: 'hidden', border: `1px solid var(--border)`, backgroundColor: 'var(--background)' }}>
      {/* Sidebar Layout */}
      <aside style={{
        width: collapsed ? 64 : 260,
        backgroundColor: SIDEBAR_BG,
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.2s ease',
        overflow: 'hidden'
      }}>
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', padding: collapsed ? 0 : '0 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
          {collapsed ? (
            <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: t.colors.brand.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>K</div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: t.colors.brand.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>K</div>
              <div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 16, lineHeight: 1 }}>Khor</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 500 }}>System</div>
              </div>
            </div>
          )}
        </div>
        <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
          {nav.map(section => {
            const isDirectLink = !!section.path && !section.items;
            const isDirectActive = isDirectLink && activePath === section.path;

            return (
              <div key={section.title} style={{ marginBottom: 4 }}>
                {collapsed ? (
                  <button onClick={() => isDirectLink ? setActivePath(section.path!) : setCollapsed(false)} title={section.title} style={{
                    width: '100%', height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderRadius: 8,
                    background: isDirectActive ? 'rgba(255,255,255,0.12)' : 'transparent',
                    color: isDirectActive ? '#fff' : 'rgba(255,255,255,0.6)', cursor: 'pointer', transition: 'all 0.15s ease', position: 'relative'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = isDirectActive ? 'rgba(255,255,255,0.12)' : 'transparent'; e.currentTarget.style.color = isDirectActive ? '#fff' : 'rgba(255,255,255,0.6)'; }}
                  >
                    {isDirectActive && <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 3, height: 20, borderRadius: '0 3px 3px 0', backgroundColor: '#E04D36' }} />}
                    {section.icon}
                  </button>
                ) : isDirectLink ? (
                  <button onClick={() => setActivePath(section.path!)} style={{
                    width: '100%', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, border: 'none', borderRadius: 8,
                    background: isDirectActive ? 'rgba(255,255,255,0.12)' : 'transparent',
                    color: isDirectActive ? '#fff' : 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 600, fontFamily: font, textTransform: 'uppercase', letterSpacing: 1, cursor: 'pointer', position: 'relative', transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => { if(!isDirectActive) { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff'; } }}
                  onMouseLeave={(e) => { if(!isDirectActive) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; } }}
                  >
                    {isDirectActive && <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 3, height: 20, borderRadius: '0 3px 3px 0', backgroundColor: '#E04D36' }} />}
                    {section.icon}<span>{section.title}</span>
                  </button>
                ) : (
                  <>
                    <button onClick={() => toggleSection(section.title)} style={{
                      width: '100%', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 8, border: 'none', background: 'transparent',
                      color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 600, fontFamily: font, textTransform: 'uppercase', letterSpacing: 1, cursor: 'pointer'
                    }}>
                      {section.icon}<span style={{ flex: 1, textAlign: 'left' }}>{section.title}</span>
                      {openSections[section.title] ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                    </button>
                    {openSections[section.title] && section.items && (
                      <div style={{ marginTop: 2 }}>
                        {section.items.map(item => (
                          <KNavItem key={item.path} icon={<NavDot />} label={item.label} active={activePath === item.path} onClick={() => setActivePath(item.path)} />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </nav>
        <div style={{ padding: 8, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button onClick={() => setCollapsed(!collapsed)} style={{
            width: '100%', padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, border: 'none', borderRadius: t.radius.md,
            background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 500, fontFamily: font, cursor: 'pointer', transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
          >
            {collapsed ? <Menu size={16} /> : <><X size={14} /> Colapsar</>}
          </button>
        </div>
      </aside>

      {/* Demo App Canvas */}
      <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h4 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: 'var(--foreground)' }}>Área de Trabajo Principal</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, color: 'var(--muted-foreground)' }}>Ruta Activa:</span>
          <KBadge variant="primary">{activePath}</KBadge>
        </div>
        <div style={{ padding: 16, backgroundColor: 'var(--card)', border: `1px solid var(--border)`, borderRadius: t.radius.lg }}>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--foreground)', lineHeight: 1.6 }}>
            Este es un entorno de demostración encapsulado. Interactúa con el menú lateral para ver cómo cambian los estados (expansión de acordeones y activación de rutas) independientemente del enrutamiento real de la aplicación.
          </p>
          <p style={{ margin: '12px 0 0', fontSize: 14, color: 'var(--foreground)', lineHeight: 1.6 }}>
            Usa el botón de <strong>Colapsar</strong> en la parte inferior para ver el comportamiento adaptativo (collapse a 64px) optimizado para sistemas de alta densidad.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Patterns Data ─── */
interface Pattern {
  id: string;
  title: string;
  description: string;
  category: string;
  component: React.ReactNode;
  code: string;
}

const patterns: Pattern[] = [
  {
    id: 'sidebar-navigation',
    title: 'Menú Lateral (Sidebar) Corporativo',
    description: 'Estructura repetitiva de navegación lateral. Mantiene el branding navy, soporte para secciones anidadas y un modo colapsado adaptativo.',
    category: 'Navegación',
    component: <SidebarPattern />,
    code: `import { useState } from 'react';
import { Home, Layers, Settings, ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { KNavItem } from '@khor/molecules';
// Importa tus tokens de tema (t.colors.brand.primary) si es necesario.

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [activePath, setActivePath] = useState('/dashboard');

  const nav = [
    { title: 'Dashboard', icon: <Home size={18} strokeWidth={2} />, path: '/dashboard' },
    {
      title: 'Componentes', icon: <Layers size={18} strokeWidth={2} />,
      items: [
        { label: 'Botones (Atoms)', path: '/components/buttons' },
        { label: 'Formularios (Mols)', path: '/components/forms' },
      ]
    },
    { title: 'Configuración', icon: <Settings size={18} strokeWidth={2} />, path: '/settings' }
  ];

  const toggleSection = (t: string) => setOpenSections(prev => ({ ...prev, [t]: !prev[t] }));
  const NavDot = () => <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'currentColor', opacity: 0.6, display: 'inline-block', flexShrink: 0 }} />;

  return (
    <aside style={{
      width: collapsed ? 64 : 260,
      backgroundColor: '#051758', // SIDEBAR_BG
      display: 'flex', flexDirection: 'column',
      transition: 'width 0.2s ease', overflow: 'hidden',
      height: '100vh' // Ajusta según el layout padre
    }}>
      {/* HEADER LOGO */}
      <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', padding: collapsed ? 0 : '0 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
        {collapsed ? (
          <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: '#E04D36', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>K</div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: '#E04D36', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>K</div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 16, lineHeight: 1 }}>Khor</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 500 }}>System</div>
            </div>
          </div>
        )}
      </div>

      {/* NAVIGATION */}
      <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
        {nav.map(section => {
          const isDirectLink = !!section.path && !section.items;
          const isDirectActive = isDirectLink && activePath === section.path;

          return (
            <div key={section.title} style={{ marginBottom: 4 }}>
              {collapsed ? (
                /* COLLAPSED ITEM */
                <button onClick={() => isDirectLink ? setActivePath(section.path!) : setCollapsed(false)} title={section.title} style={{
                  width: '100%', height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderRadius: 8,
                  background: isDirectActive ? 'rgba(255,255,255,0.12)' : 'transparent',
                  color: isDirectActive ? '#fff' : 'rgba(255,255,255,0.6)', cursor: 'pointer', transition: 'all 0.15s ease', position: 'relative'
                }}>
                  {isDirectActive && <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 3, height: 20, borderRadius: '0 3px 3px 0', backgroundColor: '#E04D36' }} />}
                  {section.icon}
                </button>
              ) : isDirectLink ? (
                /* DIRECT LINK (NO ITEMS) */
                <button onClick={() => setActivePath(section.path!)} style={{
                  width: '100%', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, border: 'none', borderRadius: 8,
                  background: isDirectActive ? 'rgba(255,255,255,0.12)' : 'transparent',
                  color: isDirectActive ? '#fff' : 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, cursor: 'pointer', position: 'relative'
                }}>
                  {isDirectActive && <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 3, height: 20, borderRadius: '0 3px 3px 0', backgroundColor: '#E04D36' }} />}
                  {section.icon}<span>{section.title}</span>
                </button>
              ) : (
                /* SECTION WITH SUB-ITEMS */
                <>
                  <button onClick={() => toggleSection(section.title)} style={{
                    width: '100%', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 8, border: 'none', background: 'transparent',
                    color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, cursor: 'pointer'
                  }}>
                    {section.icon}<span style={{ flex: 1, textAlign: 'left' }}>{section.title}</span>
                    {openSections[section.title] ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  </button>
                  {openSections[section.title] && section.items && (
                    <div style={{ marginTop: 2 }}>
                      {section.items.map(item => (
                        <KNavItem key={item.path} icon={<NavDot />} label={item.label} active={activePath === item.path} onClick={() => setActivePath(item.path)} />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </nav>

      {/* FOOTER COLLAPSE TOGGLE */}
      <div style={{ padding: 8, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <button onClick={() => setCollapsed(!collapsed)} style={{
          width: '100%', padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, border: 'none', borderRadius: 8,
          background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', fontSize: 12, cursor: 'pointer'
        }}>
          {collapsed ? <Menu size={16} /> : <><X size={14} /> Colapsar</>}
        </button>
      </div>
    </aside>
  );
}`,
  },
  {
    id: 'dashboard-stats',
    title: 'Dashboard con Stats + Filtros',
    description: 'Panel de métricas con KStatCard, filtros de periodo y sparklines. Ideal para vistas resumen.',
    category: 'Dashboard',
    component: <DashboardPattern />,
    code: `import { KStatCard } from '@khor/molecules';

// Stats con sparklines y filtro de periodo
<KStatCard title="Ingresos" value="$48,250" change={12.5}
  changeLabel="vs. periodo anterior"
  icon={<DollarSign size={20} />}
  sparkData={[30, 40, 35, 50, 49, 60, 70, 91]}
/>`,
  },
  {
    id: 'form-validation',
    title: 'Formulario con Validación',
    description: 'Formulario completo con KFormField, validación inline, mensajes de error y feedback de éxito.',
    category: 'Formularios',
    component: <FormValidationPattern />,
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
  },
  {
    id: 'filterable-list',
    title: 'Lista Filtrable con Acciones',
    description: 'Lista de datos con búsqueda, badges de estado/rol y acciones inline (editar, eliminar).',
    category: 'Datos',
    component: <FilterableListPattern />,
    code: `import { KSearchInput, KStatCard } from '@khor/molecules';
import { KButton, KBadge } from '@khor/atoms';

// Barra de búsqueda + botón de acción
<div style={{ display: 'flex', gap: 8 }}>
  <KSearchInput placeholder="Buscar..." value={search} onChange={setSearch} />
  <KButton variant="primary" icon={<Plus size={16} />}>Nuevo</KButton>
</div>
// Lista con badges y acciones
{users.map(u => (
  <div key={u.id}>
    <KBadge variant={u.role === 'Admin' ? 'primary' : 'default'}>{u.role}</KBadge>
    <KButton variant="ghost" size="sm" icon={<Edit size={14} />} />
  </div>
))}`,
  },
  {
    id: 'login-form',
    title: 'Login con Branding',
    description: 'Formulario de login con logo Khor, toggle de visibilidad de contraseña, checkbox y link de recuperación.',
    category: 'Auth',
    component: <LoginPattern />,
    code: `import { KFormField } from '@khor/molecules';
import { KInput, KButton, KCheckbox } from '@khor/atoms';

// Login form con branding
<KFormField label="Email">
  <KInput placeholder="tu@empresa.com" icon={<Mail size={16} />} />
</KFormField>
<KFormField label="Contraseña">
  <KInput type={show ? 'text' : 'password'}
    placeholder="••••••••" icon={<Lock size={16} />}
    suffix={<EyeToggle />}
  />
</KFormField>
<KButton variant="primary" size="lg">Iniciar Sesión</KButton>`,
  },
  {
    id: 'paginated-table',
    title: 'Tabla con Paginación',
    description: 'Tabla de datos con búsqueda, paginación y acciones inline (editar, eliminar).',
    category: 'Datos',
    component: <PaginatedTablePattern />,
    code: `import { KSearchInput, KStatCard } from '@khor/molecules';
import { KButton, KBadge } from '@khor/atoms';

// Barra de búsqueda + botón de acción
<div style={{ display: 'flex', gap: 8 }}>
  <KSearchInput placeholder="Buscar..." value={search} onChange={setSearch} />
  <KButton variant="primary" icon={<Plus size={16} />}>Nuevo</KButton>
</div>
// Lista con badges y acciones
{users.map(u => (
  <div key={u.id}>
    <KBadge variant={u.role === 'Admin' ? 'primary' : 'default'}>{u.role}</KBadge>
    <KButton variant="ghost" size="sm" icon={<Edit size={14} />} />
  </div>
))}`,
  },
  {
    id: 'wizard-pattern',
    title: 'Wizard Multi-Step',
    description: 'Formulario de múltiples pasos con KSteps, KFormField y KButton.',
    category: 'Formularios',
    component: <WizardPattern />,
    code: `import { KSteps, KFormField } from '@khor/molecules';
import { KInput, KButton, KCheckbox } from '@khor/atoms';

// Wizard multi-step form
<KSteps items={steps} current={step} />
<div style={{ marginTop: 24, padding: 24, borderRadius: t.radius.lg, backgroundColor: 'var(--card)', border: \`1px solid var(--border)\` }}>
  {step === 0 && (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <KFormField label="Nombre Completo" required>
        <KInput placeholder="Juan Pérez" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </KFormField>
      <KFormField label="Email" required>
        <KInput placeholder="juan@empresa.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} icon={<Mail size={16} />} />
      </KFormField>
    </div>
  )}
  {step === 1 && (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {[
        { name: 'Starter', price: '$9/mes', desc: '5 usuarios, 10GB' },
        { name: 'Pro', price: '$29/mes', desc: '25 usuarios, 100GB' },
        { name: 'Enterprise', price: '$99/mes', desc: 'Ilimitado' },
      ].map((p) => (
        <div key={p.name} onClick={() => setForm({ ...form, plan: p.name })} style={{
          padding: 16, borderRadius: t.radius.md, cursor: 'pointer',
          border: \`2px solid \${form.plan === p.name ? t.colors.brand.primary : 'var(--border)'}\`,
          backgroundColor: form.plan === p.name ? 'rgba(224,77,54,0.04)' : 'var(--card)',
          transition: 'all 0.15s ease',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--foreground)' }}>{p.name}</div>
              <div style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>{p.desc}</div>
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: form.plan === p.name ? t.colors.brand.primary : 'var(--foreground)' }}>{p.price}</div>
          </div>
        </div>
      ))}
    </div>
  )}
  {step === 2 && (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <KFormField label="Nombre en la tarjeta">
        <KInput placeholder="Juan Pérez" value={form.cardName} onChange={(e) => setForm({ ...form, cardName: e.target.value })} />
      </KFormField>
      <KFormField label="Número de tarjeta">
        <KInput placeholder="4242 4242 4242 4242" icon={<DollarSign size={16} />} />
      </KFormField>
      <div style={{ display: 'flex', gap: 12 }}>
        <KFormField label="Expiración"><KInput placeholder="MM/AA" /></KFormField>
        <KFormField label="CVC"><KInput placeholder="123" /></KFormField>
      </div>
    </div>
  )}
  {step === 3 && (
    <div style={{ textAlign: 'center', padding: '16px 0' }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: t.colors.feedback.successLight, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
        <Check size={28} color="#2E7D32" />
      </div>
      <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 600, color: 'var(--foreground)' }}>Todo listo</h3>
      <p style={{ margin: '0 0 12px', fontSize: 13, color: 'var(--muted-foreground)' }}>
        {form.name || 'Usuario'} &bull; {form.email || 'email@ejemplo.com'} &bull; Plan {form.plan || 'Starter'}
      </p>
      <KBadge variant="success">Suscripción activa</KBadge>
    </div>
  )}
</div>
<div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
  <KButton variant="ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>Anterior</KButton>
  {step < 3 ? (
    <KButton variant="primary" onClick={() => setStep(step + 1)} icon={<ArrowRight size={16} />}>
      {step === 2 ? 'Confirmar' : 'Siguiente'}
    </KButton>
  ) : (
    <KButton variant="primary" onClick={() => setStep(0)}>Nuevo Registro</KButton>
  )}
</div>`,
  },
  {
    id: 'settings-pattern',
    title: 'Settings Page',
    description: 'Página de configuración con KFormField, KSwitch y KSelectField.',
    category: 'Configuración',
    component: <SettingsPattern />,
    code: `import { KFormField } from '@khor/molecules';
import { KInput, KButton, KCheckbox } from '@khor/atoms';

// Settings page
<div style={{ maxWidth: 520 }}>
  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
    {/* Section: Profile */}
    <div style={{ padding: 20, borderRadius: t.radius.lg, backgroundColor: 'var(--card)', border: \`1px solid var(--border)\` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <Users size={16} color="var(--foreground)" />
        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--foreground)' }}>Perfil</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <KFormField label="Nombre"><KInput value="Ana García" /></KFormField>
        <KFormField label="Email"><KInput value="ana@khor.io" icon={<Mail size={16} />} /></KFormField>
      </div>
    </div>

    {/* Section: Notifications */}
    <div style={{ padding: 20, borderRadius: t.radius.lg, backgroundColor: 'var(--card)', border: \`1px solid var(--border)\` }}>
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
          <KSwitch checked={notifications} onChange={setNotifications} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--foreground)' }}>Emails de marketing</div>
            <div style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>Promociones y novedades</div>
          </div>
          <KSwitch checked={marketing} onChange={setMarketing} />
        </div>
      </div>
    </div>

    {/* Section: Preferences */}
    <div style={{ padding: 20, borderRadius: t.radius.lg, backgroundColor: 'var(--card)', border: \`1px solid var(--border)\` }}>
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
          <KSwitch checked={darkMode} onChange={setDarkMode} />
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
</div>`,
  },
];

const categories = ['Todos', ...new Set(patterns.map((p) => p.category))];

/* ─── Page Component ─── */
export function PatternsPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [activePattern, setActivePattern] = useState<string | null>(null);
  const [showCode, setShowCode] = useState<Record<string, boolean>>({});

  const filtered = id 
    ? patterns.filter(p => p.id === id) 
    : (activeCategory === 'Todos' ? patterns : patterns.filter((p) => p.category === activeCategory));

  if (id && filtered.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: 64, fontFamily: font }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--foreground)' }}>Patrón no encontrado</h2>
        <p style={{ color: 'var(--muted-foreground)' }}>El patrón seleccionado no existe.</p>
        <KButton variant="outline" onClick={() => navigate('/patterns')}>Regresar a Patrones</KButton>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: font }}>
      {!id && (
        <>
          <div style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: t.colors.brand.primary, textTransform: 'uppercase', letterSpacing: 1 }}>Recipes</span>
            <h2 style={{ margin: '4px 0 0', fontSize: 30, fontWeight: 700, color: 'var(--foreground)' }}>Patrones de Diseño</h2>
            <p style={{ margin: '8px 0 0', fontSize: 16, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>
              Combinaciones probadas de componentes Khor que resuelven casos de uso reales.
              Cada patrón incluye código copiable listo para producción.
            </p>
          </div>

          {/* Category Filter */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 24, flexWrap: 'wrap' }}>
            {categories.map((c) => (
              <button key={c} onClick={() => setActiveCategory(c)} style={{
                padding: '6px 14px', borderRadius: 999, border: 'none', fontSize: 13, fontWeight: 500,
                backgroundColor: activeCategory === c ? t.colors.brand.primary : 'var(--muted)',
                color: activeCategory === c ? '#fff' : 'var(--muted-foreground)', cursor: 'pointer', fontFamily: font,
                transition: 'all 0.15s ease',
              }}>{c}</button>
            ))}
          </div>
        </>
      )}

      {id && (
        <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center' }}>
          <KButton variant="ghost" size="sm" icon={<ChevronLeft size={16} />} onClick={() => navigate('/patterns')}>
            Ver todos los patrones
          </KButton>
        </div>
      )}

      {/* Patterns Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {filtered.map((pattern) => (
          <div key={pattern.id} style={{
            borderRadius: t.radius.xl, border: `1px solid var(--border)`,
            overflow: 'hidden', backgroundColor: 'var(--card)',
            transition: 'box-shadow 0.2s ease',
          }}>
            {/* Pattern Header */}
            <div style={{ padding: '16px 24px', borderBottom: `1px solid var(--border)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--foreground)' }}>{pattern.title}</h3>
                  <KBadge variant="default">{pattern.category}</KBadge>
                </div>
                <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--muted-foreground)' }}>{pattern.description}</p>
              </div>
              <KButton
                variant={showCode[pattern.id] ? 'primary' : 'outline'}
                size="sm"
                icon={<Copy size={14} />}
                onClick={() => setShowCode((prev) => ({ ...prev, [pattern.id]: !prev[pattern.id] }))}
              >
                Código
              </KButton>
            </div>

            {/* Pattern Preview */}
            <div style={{ padding: 24, backgroundColor: 'var(--background)' }}>
              {pattern.component}
            </div>

            {/* Code Block (toggle) */}
            {showCode[pattern.id] && (
              <div style={{ borderTop: `1px solid var(--border)` }}>
                <CodeBlock code={pattern.code} filename={`${pattern.id}.tsx`} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}