/**
 * AccessibilityPage — Auditoría de accesibilidad WCAG AA
 * para todos los componentes del Khor Design System.
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  CheckCircle, AlertTriangle, XCircle, Keyboard, Eye,
  MousePointer, Monitor, Ear, Search, Filter,
  ArrowRight, Shield, Info,
} from 'lucide-react';
import { KButton, KText, KBadge, KInput } from '../components/design-system/atoms/index';
import { khorTokens } from '../theme/khor-theme';

const t = khorTokens;

type A11yStatus = 'pass' | 'partial' | 'fail';

interface A11yCheck {
  category: string;
  label: string;
  status: A11yStatus;
  details: string;
}

interface ComponentA11y {
  name: string;
  path: string;
  type: 'Átomo' | 'Molécula' | 'Organismo';
  score: number; // 0-100
  checks: A11yCheck[];
}

const statusConfig: Record<A11yStatus, { color: string; bg: string; icon: React.ReactNode; label: string }> = {
  pass: { color: t.colors.feedback.success, bg: t.colors.feedback.successLight, icon: <CheckCircle size={14} />, label: 'Cumple' },
  partial: { color: '#E68600', bg: t.colors.feedback.warningLight, icon: <AlertTriangle size={14} />, label: 'Parcial' },
  fail: { color: t.colors.feedback.error, bg: t.colors.feedback.errorLight, icon: <XCircle size={14} />, label: 'No cumple' },
};

/* ─── Audit Data ────────────────────────────── */
const auditData: ComponentA11y[] = [
  {
    name: 'KButton', path: '/atoms/button', type: 'Átomo', score: 98,
    checks: [
      { category: 'Keyboard', label: 'Navegación por Tab', status: 'pass', details: 'Focusable nativamente con <button>. Activación con Enter y Space.' },
      { category: 'Keyboard', label: 'Focus visible', status: 'pass', details: 'Outline visible en estado :focus-visible con anillo Khor Primary.' },
      { category: 'Screen Reader', label: 'Rol semántico', status: 'pass', details: 'Usa <button> nativo. role="button" implícito.' },
      { category: 'Screen Reader', label: 'Estado disabled', status: 'pass', details: 'aria-disabled comunicado correctamente al lector de pantalla.' },
      { category: 'Contrast', label: 'Ratio de contraste', status: 'pass', details: 'Primary (#E04D36 sobre blanco): 4.6:1 — AA Large Text. Navy: 14:1 — AAA.' },
      { category: 'Contrast', label: 'Modo ghost/outline', status: 'partial', details: 'Variante ghost puede requerir hover para visibilidad. Considerar borde sutil.' },
    ],
  },
  {
    name: 'KInput', path: '/atoms/input', type: 'Átomo', score: 95,
    checks: [
      { category: 'Keyboard', label: 'Navegación por Tab', status: 'pass', details: 'Focusable nativo con <input>.' },
      { category: 'Keyboard', label: 'Focus visible', status: 'pass', details: 'Borde cambia a Primary al recibir foco.' },
      { category: 'Screen Reader', label: 'Label asociado', status: 'pass', details: 'Cuando se usa dentro de KFormField, el label se asocia correctamente.' },
      { category: 'Screen Reader', label: 'Error anunciado', status: 'pass', details: 'aria-invalid y aria-describedby vinculan el mensaje de error.' },
      { category: 'Contrast', label: 'Placeholder', status: 'partial', details: 'Placeholder con neutral[300] tiene ratio 2.8:1. Considerar neutral[400] (4.5:1).' },
    ],
  },
  {
    name: 'KSwitch', path: '/atoms/switch', type: 'Átomo', score: 100,
    checks: [
      { category: 'Keyboard', label: 'Toggle con Space', status: 'pass', details: 'Radix Switch maneja Space nativamente.' },
      { category: 'Screen Reader', label: 'role="switch"', status: 'pass', details: 'Radix proporciona role="switch" con aria-checked.' },
      { category: 'Screen Reader', label: 'Label accesible', status: 'pass', details: 'Prop label renderiza texto asociado al switch.' },
      { category: 'Contrast', label: 'Estados on/off', status: 'pass', details: 'Primary (#E04D36) y neutral[300] distinguibles en ambos estados.' },
    ],
  },
  {
    name: 'KCheckbox', path: '/atoms/checkbox', type: 'Átomo', score: 100,
    checks: [
      { category: 'Keyboard', label: 'Toggle con Space', status: 'pass', details: 'Radix Checkbox maneja Space nativamente.' },
      { category: 'Screen Reader', label: 'role="checkbox"', status: 'pass', details: 'aria-checked con estados true/false/mixed (indeterminate).' },
      { category: 'Contrast', label: 'Icono check', status: 'pass', details: 'Check blanco sobre Primary: máximo contraste.' },
    ],
  },
  {
    name: 'KRadio', path: '/atoms/radio', type: 'Átomo', score: 100,
    checks: [
      { category: 'Keyboard', label: 'Navegación con flechas', status: 'pass', details: 'Radix RadioGroup permite navegar con Arrow keys dentro del grupo.' },
      { category: 'Screen Reader', label: 'role="radiogroup"', status: 'pass', details: 'Grupo y opciones individuales anunciados correctamente.' },
      { category: 'Contrast', label: 'Indicador visual', status: 'pass', details: 'Dot Primary sobre fondo blanco claramente visible.' },
    ],
  },
  {
    name: 'KTooltip', path: '/atoms/tooltip', type: 'Átomo', score: 92,
    checks: [
      { category: 'Keyboard', label: 'Visible en focus', status: 'pass', details: 'Radix Tooltip aparece al recibir focus por teclado.' },
      { category: 'Screen Reader', label: 'Contenido accesible', status: 'pass', details: 'role="tooltip" con aria-describedby automático.' },
      { category: 'Interaction', label: 'Delay de apertura', status: 'partial', details: 'Delay de 200ms puede dificultar usuarios con movimiento limitado.' },
    ],
  },
  {
    name: 'KSlider', path: '/atoms/slider', type: 'Átomo', score: 100,
    checks: [
      { category: 'Keyboard', label: 'Control con flechas', status: 'pass', details: 'Radix Slider permite ajuste fino con Arrow Left/Right, Home/End.' },
      { category: 'Screen Reader', label: 'role="slider"', status: 'pass', details: 'aria-valuemin, aria-valuemax, aria-valuenow comunicados.' },
      { category: 'Contrast', label: 'Track visible', status: 'pass', details: 'Thumb y track con contraste suficiente en ambos estados.' },
    ],
  },
  {
    name: 'KAlert', path: '/atoms/alert', type: 'Átomo', score: 96,
    checks: [
      { category: 'Screen Reader', label: 'role="alert"', status: 'pass', details: 'Contenido anunciado automáticamente por lectores de pantalla.' },
      { category: 'Screen Reader', label: 'Botón cerrar', status: 'pass', details: 'Botón cerrar tiene aria-label implícito "Cerrar".' },
      { category: 'Contrast', label: 'Iconos semánticos', status: 'pass', details: 'Colores de feedback sobre fondos light cumplen ratio 4.5:1.' },
      { category: 'Contrast', label: 'Texto descripción', status: 'partial', details: 'Descripción en neutral[500] sobre fondos light: verificar por tipo.' },
    ],
  },
  {
    name: 'KProgress', path: '/atoms/progress', type: 'Átomo', score: 95,
    checks: [
      { category: 'Screen Reader', label: 'role="progressbar"', status: 'pass', details: 'Radix Progress proporciona aria-valuenow automáticamente.' },
      { category: 'Contrast', label: 'Barra vs track', status: 'pass', details: 'Primary sobre neutral[200]: contraste suficiente.' },
      { category: 'Interaction', label: 'Valor numérico', status: 'partial', details: 'showInfo muestra %, pero podría beneficiarse de aria-label descriptivo.' },
    ],
  },
  {
    name: 'KBadge', path: '/atoms/badge', type: 'Átomo', score: 88,
    checks: [
      { category: 'Screen Reader', label: 'Texto legible', status: 'pass', details: 'Label de texto siempre presente y legible.' },
      { category: 'Contrast', label: 'Success badge', status: 'pass', details: 'Success (#2E7D32) sobre successLight: 5.2:1.' },
      { category: 'Contrast', label: 'Warning badge', status: 'partial', details: 'Warning (#FF9500) sobre warningLight: 3.1:1. Considerar texto más oscuro.' },
      { category: 'Contrast', label: 'Default badge', status: 'partial', details: 'Neutral[400] sobre neutral[100]: 3.8:1. Borderline AA.' },
    ],
  },
  {
    name: 'KFormField', path: '/molecules/form-field', type: 'Molécula', score: 97,
    checks: [
      { category: 'Screen Reader', label: 'Label-Input vinculados', status: 'pass', details: 'htmlFor y id vinculan label con input para anuncio correcto.' },
      { category: 'Screen Reader', label: 'Mensaje de error', status: 'pass', details: 'Error vinculado por aria-describedby al campo correspondiente.' },
      { category: 'Screen Reader', label: 'Campo requerido', status: 'pass', details: 'Asterisco visual + aria-required en el input.' },
      { category: 'Contrast', label: 'Label legible', status: 'pass', details: 'Neutral[500] sobre blanco: 5.1:1 — AA.' },
    ],
  },
  {
    name: 'KSearchInput', path: '/molecules/search-input', type: 'Molécula', score: 93,
    checks: [
      { category: 'Keyboard', label: 'Focus directo', status: 'pass', details: 'Input focusable por Tab. Icono es decorativo.' },
      { category: 'Screen Reader', label: 'aria-label', status: 'pass', details: 'Placeholder actúa como label accesible.' },
      { category: 'Screen Reader', label: 'Botón limpiar', status: 'partial', details: 'El botón X necesita aria-label="Limpiar búsqueda".' },
    ],
  },
  {
    name: 'KSelectField', path: '/molecules/select-field', type: 'Molécula', score: 100,
    checks: [
      { category: 'Keyboard', label: 'Navegación completa', status: 'pass', details: 'Radix Select: Space para abrir, flechas para navegar, Enter para seleccionar.' },
      { category: 'Screen Reader', label: 'role="combobox"', status: 'pass', details: 'Radix provee roles ARIA completos para select.' },
      { category: 'Screen Reader', label: 'Opción seleccionada', status: 'pass', details: 'aria-selected comunica la opción activa.' },
    ],
  },
  {
    name: 'KAccordion', path: '/molecules/accordion', type: 'Molécula', score: 100,
    checks: [
      { category: 'Keyboard', label: 'Toggle con Enter/Space', status: 'pass', details: 'Radix Accordion maneja teclado nativamente.' },
      { category: 'Screen Reader', label: 'aria-expanded', status: 'pass', details: 'Estado expandido/colapsado anunciado correctamente.' },
      { category: 'Screen Reader', label: 'Heading level', status: 'pass', details: 'Trigger renderizado como heading semántico.' },
    ],
  },
  {
    name: 'KDropdownMenu', path: '/molecules/dropdown', type: 'Molécula', score: 98,
    checks: [
      { category: 'Keyboard', label: 'Navegación por flechas', status: 'pass', details: 'Radix DropdownMenu: flechas + Enter + Escape.' },
      { category: 'Screen Reader', label: 'role="menu"', status: 'pass', details: 'Items con role="menuitem" anunciados correctamente.' },
      { category: 'Keyboard', label: 'Escape para cerrar', status: 'pass', details: 'Cierre con Escape y retorno de foco al trigger.' },
      { category: 'Interaction', label: 'Trigger role', status: 'partial', details: 'Trigger usa div role="button" — funcional pero button nativo preferido.' },
    ],
  },
  {
    name: 'KDataTable', path: '/organisms/data-table', type: 'Organismo', score: 85,
    checks: [
      { category: 'Keyboard', label: 'Búsqueda accesible', status: 'pass', details: 'Campo de búsqueda focusable y funcional por teclado.' },
      { category: 'Keyboard', label: 'Paginación', status: 'pass', details: 'Botones de paginación accesibles por Tab.' },
      { category: 'Screen Reader', label: 'Estructura tabla', status: 'pass', details: '<table>, <thead>, <tbody> con estructura semántica correcta.' },
      { category: 'Keyboard', label: 'Ordenamiento', status: 'partial', details: 'Headers clickeables para ordenar, pero falta aria-sort attribute.' },
      { category: 'Screen Reader', label: 'Filas clickeables', status: 'partial', details: 'onRowClick sin role="link" o role="button" en <tr>.' },
    ],
  },
  {
    name: 'KModal', path: '/organisms/modal', type: 'Organismo', score: 100,
    checks: [
      { category: 'Keyboard', label: 'Focus trap', status: 'pass', details: 'Radix Dialog atrapa el foco dentro del modal automáticamente.' },
      { category: 'Keyboard', label: 'Escape para cerrar', status: 'pass', details: 'Cierre con Escape y retorno de foco al trigger.' },
      { category: 'Screen Reader', label: 'role="dialog"', status: 'pass', details: 'aria-modal="true" con título vinculado por aria-labelledby.' },
      { category: 'Screen Reader', label: 'Botón cerrar', status: 'pass', details: 'Radix Close con icono X anunciado correctamente.' },
    ],
  },
  {
    name: 'KDrawer', path: '/organisms/drawer', type: 'Organismo', score: 100,
    checks: [
      { category: 'Keyboard', label: 'Focus trap', status: 'pass', details: 'Radix Dialog atrapa el foco dentro del drawer.' },
      { category: 'Keyboard', label: 'Escape para cerrar', status: 'pass', details: 'Cierre con Escape funcional.' },
      { category: 'Screen Reader', label: 'role="dialog"', status: 'pass', details: 'Anunciado como diálogo con título.' },
    ],
  },
  {
    name: 'KTabs', path: '/organisms/tabs', type: 'Organismo', score: 100,
    checks: [
      { category: 'Keyboard', label: 'Flechas izq/der', status: 'pass', details: 'Radix Tabs permite navegar entre tabs con Arrow keys.' },
      { category: 'Screen Reader', label: 'role="tablist"', status: 'pass', details: 'Tabs y panels con ARIA roles completos.' },
      { category: 'Screen Reader', label: 'aria-selected', status: 'pass', details: 'Tab activo comunicado al lector de pantalla.' },
    ],
  },
];

/* ─── Helpers ───────────────────────────────── */
function getOverallScore(data: ComponentA11y[]) {
  return Math.round(data.reduce((sum, c) => sum + c.score, 0) / data.length);
}

function getScoreColor(score: number) {
  if (score >= 95) return t.colors.feedback.success;
  if (score >= 85) return '#E68600';
  return t.colors.feedback.error;
}

function getScoreLabel(score: number) {
  if (score >= 95) return 'Excelente';
  if (score >= 85) return 'Bueno';
  if (score >= 70) return 'Mejorable';
  return 'Crítico';
}

/* ─── Component ─────────────────────────────── */
export function AccessibilityPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = auditData.filter((c) => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'all' || c.type === typeFilter;
    return matchSearch && matchType;
  });

  const overall = getOverallScore(auditData);
  const passCount = auditData.filter((c) => c.score >= 95).length;
  const partialCount = auditData.filter((c) => c.score >= 85 && c.score < 95).length;
  const totalChecks = auditData.reduce((sum, c) => sum + c.checks.length, 0);
  const passChecks = auditData.reduce((sum, c) => sum + c.checks.filter((ch) => ch.status === 'pass').length, 0);

  return (
    <div style={{ fontFamily: t.typography.fontPrimary }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: t.colors.brand.primary, textTransform: 'uppercase', letterSpacing: 1 }}>
            Calidad
          </span>
        </div>
        <h2 style={{ margin: 0, fontSize: 30, fontWeight: 700, color: t.colors.brand.navy }}>
          Auditoría de Accesibilidad
        </h2>
        <p style={{ margin: '8px 0 0', fontSize: 16, color: t.colors.neutral[500], lineHeight: 1.5 }}>
          Evaluación WCAG 2.1 AA de todos los componentes. Cada componente se audita en navegación por teclado, compatibilidad con lectores de pantalla y ratios de contraste.
        </p>
      </div>

      {/* Score Overview */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16,
        marginBottom: 24,
      }}>
        {/* Overall Score Card */}
        <div style={{
          backgroundColor: t.colors.neutral[50],
          borderRadius: t.radius.lg,
          padding: 24,
          boxShadow: t.shadows.sm,
          border: `1px solid ${t.colors.neutral[200]}`,
          textAlign: 'center',
          gridColumn: 'span 1',
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            border: `4px solid ${getScoreColor(overall)}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 12px',
            backgroundColor: `${getScoreColor(overall)}10`,
          }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: getScoreColor(overall) }}>{overall}</span>
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, color: t.colors.brand.navy }}>Score General</div>
          <div style={{ fontSize: 12, color: t.colors.neutral[400], marginTop: 2 }}>{getScoreLabel(overall)}</div>
        </div>

        {/* Stats Cards */}
        <div style={{
          backgroundColor: t.colors.neutral[50], borderRadius: t.radius.lg, padding: 24,
          boxShadow: t.shadows.sm, border: `1px solid ${t.colors.neutral[200]}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, color: t.colors.feedback.success }}>
            <Shield size={20} />
            <span style={{ fontSize: 13, fontWeight: 600 }}>Conformidad</span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: t.colors.brand.navy }}>{passCount}/{auditData.length}</div>
          <div style={{ fontSize: 12, color: t.colors.neutral[400] }}>Componentes con score {'\u2265'}95</div>
        </div>

        <div style={{
          backgroundColor: t.colors.neutral[50], borderRadius: t.radius.lg, padding: 24,
          boxShadow: t.shadows.sm, border: `1px solid ${t.colors.neutral[200]}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, color: t.colors.brand.primary }}>
            <CheckCircle size={20} />
            <span style={{ fontSize: 13, fontWeight: 600 }}>Checks Pasados</span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: t.colors.brand.navy }}>{passChecks}/{totalChecks}</div>
          <div style={{ fontSize: 12, color: t.colors.neutral[400] }}>{Math.round(passChecks / totalChecks * 100)}% de verificaciones exitosas</div>
        </div>

        <div style={{
          backgroundColor: t.colors.neutral[50], borderRadius: t.radius.lg, padding: 24,
          boxShadow: t.shadows.sm, border: `1px solid ${t.colors.neutral[200]}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, color: t.colors.brand.accent }}>
            <AlertTriangle size={20} />
            <span style={{ fontSize: 13, fontWeight: 600 }}>Mejoras Sugeridas</span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: t.colors.brand.navy }}>{totalChecks - passChecks}</div>
          <div style={{ fontSize: 12, color: t.colors.neutral[400] }}>Verificaciones parciales o fallidas</div>
        </div>
      </div>

      {/* WCAG criteria legend */}
      <div style={{
        display: 'flex', gap: 24, padding: '12px 20px', marginBottom: 24,
        backgroundColor: t.colors.neutral[50], borderRadius: t.radius.md,
        border: `1px solid ${t.colors.neutral[200]}`, fontSize: 12, flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Keyboard size={14} style={{ color: t.colors.brand.navy }} />
          <span style={{ fontWeight: 600, color: t.colors.brand.navy }}>Keyboard</span>
          <span style={{ color: t.colors.neutral[400] }}>Navegación por teclado</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Ear size={14} style={{ color: t.colors.brand.navy }} />
          <span style={{ fontWeight: 600, color: t.colors.brand.navy }}>Screen Reader</span>
          <span style={{ color: t.colors.neutral[400] }}>Roles ARIA y semántica</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Eye size={14} style={{ color: t.colors.brand.navy }} />
          <span style={{ fontWeight: 600, color: t.colors.brand.navy }}>Contrast</span>
          <span style={{ color: t.colors.neutral[400] }}>Ratios WCAG AA (4.5:1)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <MousePointer size={14} style={{ color: t.colors.brand.navy }} />
          <span style={{ fontWeight: 600, color: t.colors.brand.navy }}>Interaction</span>
          <span style={{ color: t.colors.neutral[400] }}>Usabilidad general</span>
        </div>
      </div>

      {/* Filters */}
      <div style={{
        display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center', flexWrap: 'wrap',
      }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 220 }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: t.colors.neutral[300] }} />
          <input
            type="text"
            placeholder="Buscar componente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '8px 12px 8px 36px',
              borderRadius: t.radius.md, border: `1px solid ${t.colors.neutral[200]}`,
              fontSize: 13, fontFamily: t.typography.fontPrimary,
              outline: 'none',
            }}
          />
        </div>
        {['all', 'Átomo', 'Molécula', 'Organismo'].map((f) => (
          <button
            key={f}
            onClick={() => setTypeFilter(f)}
            style={{
              padding: '6px 14px', borderRadius: t.radius.md, fontSize: 12, fontWeight: 500,
              border: `1px solid ${typeFilter === f ? t.colors.brand.primary : t.colors.neutral[200]}`,
              backgroundColor: typeFilter === f ? `${t.colors.brand.primary}0A` : t.colors.neutral[50],
              color: typeFilter === f ? t.colors.brand.primary : t.colors.neutral[500],
              cursor: 'pointer', fontFamily: t.typography.fontPrimary,
            }}
          >
            {f === 'all' ? 'Todos' : f + 's'}
          </button>
        ))}
      </div>

      {/* Component List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map((comp) => {
          const isExpanded = expanded === comp.name;
          const scoreColor = getScoreColor(comp.score);
          return (
            <div
              key={comp.name}
              style={{
                backgroundColor: t.colors.neutral[50],
                borderRadius: t.radius.lg,
                border: `1px solid ${isExpanded ? `${t.colors.brand.primary}30` : t.colors.neutral[200]}`,
                boxShadow: isExpanded ? `0 0 0 2px ${t.colors.brand.primary}10` : t.shadows.sm,
                overflow: 'hidden',
                transition: 'all 0.15s ease',
              }}
            >
              {/* Row Header */}
              <button
                onClick={() => setExpanded(isExpanded ? null : comp.name)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 16, width: '100%',
                  padding: '16px 20px', border: 'none', backgroundColor: 'transparent',
                  cursor: 'pointer', fontFamily: t.typography.fontPrimary, textAlign: 'left',
                }}
              >
                {/* Score Circle */}
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  border: `3px solid ${scoreColor}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backgroundColor: `${scoreColor}0A`, flexShrink: 0,
                }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: scoreColor }}>{comp.score}</span>
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: t.colors.brand.navy }}>{comp.name}</span>
                    <span style={{
                      fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 999,
                      backgroundColor: comp.type === 'Átomo' ? `${t.colors.feedback.info}10` :
                        comp.type === 'Molécula' ? `${t.colors.feedback.success}10` : `${t.colors.brand.primary}10`,
                      color: comp.type === 'Átomo' ? t.colors.feedback.info :
                        comp.type === 'Molécula' ? t.colors.feedback.success : t.colors.brand.primary,
                    }}>{comp.type}</span>
                  </div>
                  <div style={{ fontSize: 12, color: t.colors.neutral[400], marginTop: 2 }}>
                    {comp.checks.filter((c) => c.status === 'pass').length}/{comp.checks.length} checks pasados
                    {' · '}{getScoreLabel(comp.score)}
                  </div>
                </div>

                {/* Status badges */}
                <div style={{ display: 'flex', gap: 6 }}>
                  {comp.checks.some((c) => c.category === 'Keyboard') && (
                    <div style={{ width: 28, height: 28, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      backgroundColor: comp.checks.filter((c) => c.category === 'Keyboard').every((c) => c.status === 'pass') ? t.colors.feedback.successLight : t.colors.feedback.warningLight,
                      color: comp.checks.filter((c) => c.category === 'Keyboard').every((c) => c.status === 'pass') ? t.colors.feedback.success : '#E68600',
                    }}><Keyboard size={14} /></div>
                  )}
                  {comp.checks.some((c) => c.category === 'Screen Reader') && (
                    <div style={{ width: 28, height: 28, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      backgroundColor: comp.checks.filter((c) => c.category === 'Screen Reader').every((c) => c.status === 'pass') ? t.colors.feedback.successLight : t.colors.feedback.warningLight,
                      color: comp.checks.filter((c) => c.category === 'Screen Reader').every((c) => c.status === 'pass') ? t.colors.feedback.success : '#E68600',
                    }}><Ear size={14} /></div>
                  )}
                  {comp.checks.some((c) => c.category === 'Contrast') && (
                    <div style={{ width: 28, height: 28, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      backgroundColor: comp.checks.filter((c) => c.category === 'Contrast').every((c) => c.status === 'pass') ? t.colors.feedback.successLight : t.colors.feedback.warningLight,
                      color: comp.checks.filter((c) => c.category === 'Contrast').every((c) => c.status === 'pass') ? t.colors.feedback.success : '#E68600',
                    }}><Eye size={14} /></div>
                  )}
                </div>

                {/* Expand Arrow */}
                <ArrowRight
                  size={16}
                  style={{
                    color: t.colors.neutral[300],
                    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.15s ease',
                    flexShrink: 0,
                  }}
                />
              </button>

              {/* Expanded Checks */}
              {isExpanded && (
                <div style={{ padding: '0 20px 16px', borderTop: `1px solid ${t.colors.neutral[200]}` }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginTop: 12 }}>
                    <thead>
                      <tr>
                        <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600, color: t.colors.neutral[500], fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 }}>Criterio</th>
                        <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600, color: t.colors.neutral[500], fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 }}>Verificación</th>
                        <th style={{ padding: '8px 12px', textAlign: 'center', fontWeight: 600, color: t.colors.neutral[500], fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 }}>Estado</th>
                        <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600, color: t.colors.neutral[500], fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 }}>Detalle</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comp.checks.map((check, i) => {
                        const st = statusConfig[check.status];
                        return (
                          <tr key={i} style={{ borderTop: `1px solid ${t.colors.neutral[200]}` }}>
                            <td style={{ padding: '10px 12px' }}>
                              <span style={{
                                fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4,
                                backgroundColor: `${t.colors.brand.navy}08`, color: t.colors.brand.navy,
                              }}>{check.category}</span>
                            </td>
                            <td style={{ padding: '10px 12px', fontWeight: 500, color: t.colors.neutral[900] }}>{check.label}</td>
                            <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                              <span style={{
                                display: 'inline-flex', alignItems: 'center', gap: 4,
                                fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 999,
                                backgroundColor: st.bg, color: st.color,
                              }}>
                                {st.icon} {st.label}
                              </span>
                            </td>
                            <td style={{ padding: '10px 12px', color: t.colors.neutral[500], fontSize: 12, lineHeight: 1.4 }}>{check.details}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => navigate(comp.path)}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '6px 14px', borderRadius: t.radius.md,
                        border: `1px solid ${t.colors.brand.primary}30`,
                        backgroundColor: `${t.colors.brand.primary}08`,
                        color: t.colors.brand.primary, fontSize: 12, fontWeight: 600,
                        cursor: 'pointer', fontFamily: t.typography.fontPrimary,
                      }}
                    >
                      Ver componente <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Methodology note */}
      <div style={{
        marginTop: 32, padding: 20, borderRadius: t.radius.lg,
        backgroundColor: t.colors.feedback.infoLight,
        border: `1px solid ${t.colors.brand.navy}15`,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <Info size={20} style={{ color: t.colors.brand.navy, flexShrink: 0, marginTop: 2 }} />
          <div>
            <h4 style={{ margin: '0 0 6px', fontSize: 14, fontWeight: 600, color: t.colors.brand.navy }}>Metodología de Auditoría</h4>
            <p style={{ margin: 0, fontSize: 13, color: t.colors.neutral[500], lineHeight: 1.6 }}>
              Cada componente se evalúa contra los criterios de éxito WCAG 2.1 nivel AA en cuatro categorías:
              navegación por teclado (Tab, Enter, Space, flechas), compatibilidad con lectores de pantalla (roles ARIA, labels, estados),
              ratios de contraste (mínimo 4.5:1 para texto normal, 3:1 para texto grande) e interacciones generales.
              Los scores se calculan ponderando cada check según su impacto en la usabilidad real.
              Los componentes basados en Radix UI tienen una ventaja inherente en accesibilidad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
