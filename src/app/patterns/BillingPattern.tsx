import React from 'react';
import { 
  Download, Zap, Shield, CreditCard, 
  HelpCircle, ExternalLink, ArrowRight
} from 'lucide-react';
import { 
  KButton, KText, KBadge, KProgress, KTag, KDivider 
} from '../components/design-system/atoms/index';
import { KDataTable } from '../components/design-system/organisms/index';
import { khorTokens } from '../theme/khor-theme';

const t = khorTokens;

const invoiceData = [
  { id: 'INV-2025-001', date: '01 Mar 2025', amount: '$450.00', status: 'Pagado', method: 'Visa •••• 4242' },
  { id: 'INV-2025-002', date: '01 Feb 2025', amount: '$450.00', status: 'Pagado', method: 'Visa •••• 4242' },
  { id: 'INV-2025-003', date: '01 Jan 2025', amount: '$450.00', status: 'Pagado', method: 'Visa •••• 4242' },
  { id: 'INV-2024-012', date: '01 Dec 2024', amount: '$450.00', status: 'Pagado', method: 'Visa •••• 4242' },
];

const columns = [
  { header: 'Factura', accessorKey: 'id', cell: ({ row }: any) => <span style={{ fontWeight: t.typography.fontWeights.bold }}>{row.original.id}</span> },
  { header: 'Fecha', accessorKey: 'date' },
  { header: 'Monto', accessorKey: 'amount' },
  { header: 'Estado', accessorKey: 'status', cell: ({ row }: any) => <KBadge label={row.original.status} status="success" /> },
  { header: 'Método', accessorKey: 'method' },
  { header: 'Acción', accessorKey: 'action', cell: () => <KButton variant="ghost" size="sm" icon={<Download size={t.icon.sm} />} /> },
];

function BillingInternal() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: t.spacing.xl }}>
      {/* Active Plan Overview */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 340px', 
        gap: t.spacing.lg 
      }}>
        <div style={{ 
          padding: t.spacing.xl, borderRadius: t.spacing.lg, backgroundColor: t.semantic.surface.card, border: `1px solid ${t.semantic.border.default}`,
          boxShadow: t.shadows.sm, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: t.spacing.lg }}>
              <div>
                <KTag color="info" style={{ marginBottom: t.spacing.sm, fontWeight: t.typography.fontWeights.bold }}>PLAN ACTUAL</KTag>
                <div style={{ fontSize: t.typography.display2.size, fontWeight: t.typography.fontWeights.extrabold, color: t.semantic.text.primary }}>Khor Pro Annual</div>
                <div style={{ fontSize: t.typography.bodySm.size, color: t.semantic.text.muted, marginTop: t.spacing.xs }}>Tu próximo ciclo de facturación es el 1 de Abril, 2025.</div>
              </div>
              <KButton variant="primary" icon={<Zap size={t.icon.md} />}>Mejorar Plan</KButton>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: t.spacing.lg, padding: `${t.spacing.lg}px 0`, borderTop: `1px solid ${t.semantic.border.muted}` }}>
              <div>
                <div style={{ fontSize: t.typography.bodyXs.size, color: t.semantic.text.muted, fontWeight: t.typography.fontWeights.semibold, marginBottom: t.spacing.xs }}>USUARIOS</div>
                <div style={{ fontSize: t.typography.h4.size, fontWeight: t.typography.fontWeights.bold }}>12 <span style={{ fontSize: t.typography.bodySm.size, opacity: 0.5 }}>/ 20</span></div>
                <KProgress value={60} style={{ marginTop: t.spacing.sm }} />
              </div>
              <div>
                <div style={{ fontSize: t.typography.bodyXs.size, color: t.semantic.text.muted, fontWeight: t.typography.fontWeights.semibold, marginBottom: t.spacing.xs }}>ALMACENAMIENTO</div>
                <div style={{ fontSize: t.typography.h4.size, fontWeight: t.typography.fontWeights.bold }}>45.2 GB <span style={{ fontSize: t.typography.bodySm.size, opacity: 0.5 }}>/ 100 GB</span></div>
                <KProgress value={45} style={{ marginTop: t.spacing.sm }} />
              </div>
              <div>
                <div style={{ fontSize: t.typography.bodyXs.size, color: t.semantic.text.muted, fontWeight: t.typography.fontWeights.semibold, marginBottom: t.spacing.xs }}>LLAMADAS API</div>
                <div style={{ fontSize: t.typography.h4.size, fontWeight: t.typography.fontWeights.bold }}>85.4k <span style={{ fontSize: t.typography.bodySm.size, opacity: 0.5 }}>/ 200k</span></div>
                <KProgress value={42} />
              </div>
            </div>
          </div>

          <div style={{ 
            marginTop: t.spacing.lg, padding: t.spacing.md, borderRadius: t.radius.lg, backgroundColor: `${t.colors.brand.primary}08`, 
            display: 'flex', alignItems: 'center', gap: t.spacing.md, border: `1px solid ${t.colors.brand.primary}15` 
          }}>
            <Shield size={t.icon.lg} style={{ color: t.colors.brand.primary }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: t.typography.bodySm.size, fontWeight: t.typography.fontWeights.bold }}>Estás ahorrando 20% con el pago anual</div>
              <div style={{ fontSize: t.typography.bodyXs.size, opacity: 0.7 }}>Tu protección de precio está activa hasta 2026.</div>
            </div>
            <KButton variant="outline" size="sm">Ver beneficios</KButton>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: t.spacing.md }}>
          <div style={{ padding: t.spacing.lg, borderRadius: t.radius.lg, backgroundColor: t.semantic.surface.card, border: `1px solid ${t.semantic.border.default}`, boxShadow: t.shadows.sm }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: t.spacing.md }}>
              <span style={{ fontSize: t.typography.bodySm.size, fontWeight: t.typography.fontWeights.bold }}>Método de Pago</span>
              <KButton variant="ghost" size="sm" style={{ padding: t.spacing.xxs }}>Editar</KButton>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing.sm, padding: t.spacing.md, borderRadius: t.radius.md, border: `1px solid ${t.semantic.border.muted}`, backgroundColor: t.semantic.surface.raised }}>
              <div style={{ width: t.sizing[11], height: t.sizing[7], backgroundColor: t.colors.brand.secondary, borderRadius: t.radius.xs, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.colors.feedback.white, fontSize: t.typography.bodyXs.size, fontWeight: t.typography.fontWeights.extrabold }}>VISA</div>
              <div>
                <div style={{ fontSize: t.typography.bodySm.size, fontWeight: t.typography.fontWeights.semibold }}>•••• 4242</div>
                <div style={{ fontSize: t.typography.bodyXs.size, color: t.semantic.text.muted }}>Expira 12/26</div>
              </div>
            </div>
          </div>

          <div style={{ padding: t.spacing.lg, borderRadius: t.radius.lg, backgroundColor: t.semantic.surface.card, border: `1px solid ${t.semantic.border.default}`, boxShadow: t.shadows.sm }}>
            <h4 style={{ margin: `0 0 ${t.spacing.xs}px`, fontSize: t.typography.bodyMd.size, fontWeight: t.typography.fontWeights.bold }}>¿Necesitas ayuda?</h4>
            <p style={{ fontSize: t.typography.bodySm.size, color: t.semantic.text.muted, marginBottom: t.spacing.md }}>Revisa nuestras políticas de facturación o contacta a soporte.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: t.spacing.sm }}>
              <KButton variant="ghost" size="sm" block style={{ justifyContent: 'flex-start' }} icon={<HelpCircle size={t.icon.sm} />}>Centro de ayuda</KButton>
              <KButton variant="ghost" size="sm" block style={{ justifyContent: 'flex-start' }} icon={<ExternalLink size={t.icon.sm} />}>Políticas de reembolso</KButton>
            </div>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div style={{ padding: t.spacing.xl, borderRadius: t.radius.lg, backgroundColor: t.semantic.surface.card, border: `1px solid ${t.semantic.border.default}`, boxShadow: t.shadows.sm }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: t.spacing.lg }}>
          <div>
            <h3 style={{ margin: 0, fontSize: t.typography.h4.size, fontWeight: t.typography.fontWeights.extrabold }}>Historial de Facturación</h3>
            <p style={{ margin: `${t.spacing.xs}px 0 0`, fontSize: t.typography.bodySm.size, color: t.semantic.text.muted }}>Descarga tus facturas y revisa los movimientos de tu cuenta.</p>
          </div>
          <KButton variant="outline" icon={<Download size={t.icon.sm} />}>Descargar Todo (.CSV)</KButton>
        </div>
        <KDataTable columns={columns as any} data={invoiceData} />
      </div>
    </div>
  );
}

import { Pattern } from './types';

export const BillingPattern: Pattern = {
  id: 'saas-billing',
  title: 'Gestión de Facturación SaaS',
  description: 'Panel completo para gestión de planes, métodos de pago e historial de facturas. Incluye indicadores de uso con KProgress y tablas de datos.',
  category: 'SaaS',
  component: <BillingInternal />,
  code: `<KDataTable columns={billingColumns} data={invoices} />`
};
