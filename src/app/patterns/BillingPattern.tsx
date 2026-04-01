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
  { header: 'Factura', accessorKey: 'id', cell: ({ row }: any) => <span style={{ fontWeight: 700 }}>{row.original.id}</span> },
  { header: 'Fecha', accessorKey: 'date' },
  { header: 'Monto', accessorKey: 'amount' },
  { header: 'Estado', accessorKey: 'status', cell: ({ row }: any) => <KBadge label={row.original.status} khorStatus="success" /> },
  { header: 'Método', accessorKey: 'method' },
  { header: 'Acción', accessorKey: 'action', cell: () => <KButton variant="ghost" size="sm" icon={<Download size={14} />} /> },
];

function BillingInternal() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Active Plan Overview */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 340px', 
        gap: 24 
      }}>
        <div style={{ 
          padding: 32, borderRadius: 24, backgroundColor: 'var(--card)', border: `1px solid var(--border)`,
          boxShadow: t.shadows.sm, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <KTag color="info" style={{ marginBottom: 8, fontWeight: 700 }}>PLAN ACTUAL</KTag>
                <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--foreground)' }}>Khor Pro Annual</div>
                <div style={{ fontSize: 14, color: 'var(--muted-foreground)', marginTop: 4 }}>Tu próximo ciclo de facturación es el 1 de Abril, 2025.</div>
              </div>
              <KButton variant="primary" icon={<Zap size={16} />}>Mejorar Plan</KButton>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, padding: '24px 0', borderTop: '1px solid var(--border)' }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--muted-foreground)', fontWeight: 600, marginBottom: 4 }}>USUARIOS</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>12 <span style={{ fontSize: 13, opacity: 0.5 }}>/ 20</span></div>
                <KProgress value={60} style={{ marginTop: 8 }} />
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--muted-foreground)', fontWeight: 600, marginBottom: 4 }}>ALMACENAMIENTO</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>45.2 GB <span style={{ fontSize: 13, opacity: 0.5 }}>/ 100 GB</span></div>
                <KProgress value={45} style={{ marginTop: 8 }} />
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--muted-foreground)', fontWeight: 600, marginBottom: 4 }}>LLAMADAS API</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>85.4k <span style={{ fontSize: 13, opacity: 0.5 }}>/ 200k</span></div>
                <KProgress value={42} status="active" style={{ marginTop: 8 }} />
              </div>
            </div>
          </div>

          <div style={{ 
            marginTop: 24, padding: 20, borderRadius: 16, backgroundColor: `${t.colors.brand.primary}08`, 
            display: 'flex', alignItems: 'center', gap: 16, border: `1px solid ${t.colors.brand.primary}15` 
          }}>
            <Shield size={24} style={{ color: t.colors.brand.primary }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Estás ahorrando 20% con el pago anual</div>
              <div style={{ fontSize: 13, opacity: 0.7 }}>Tu protección de precio está activa hasta 2026.</div>
            </div>
            <KButton variant="outline" size="sm">Ver beneficios</KButton>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ padding: 24, borderRadius: 24, backgroundColor: 'var(--card)', border: `1px solid var(--border)`, boxShadow: t.shadows.sm }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>Método de Pago</span>
              <KButton variant="ghost" size="sm" style={{ padding: 0 }}>Editar</KButton>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16, borderRadius: 12, border: '1px solid var(--border)', backgroundColor: 'var(--muted)' }}>
              <div style={{ width: 44, height: 28, backgroundColor: '#051758', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 900 }}>VISA</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>•••• 4242</div>
                <div style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>Expira 12/26</div>
              </div>
            </div>
          </div>

          <div style={{ padding: 24, borderRadius: 24, backgroundColor: 'var(--card)', border: `1px solid var(--border)`, boxShadow: t.shadows.sm }}>
            <h4 style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 700 }}>¿Necesitas ayuda?</h4>
            <p style={{ fontSize: 13, color: 'var(--muted-foreground)', marginBottom: 16 }}>Revisa nuestras políticas de facturación o contacta a soporte.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <KButton variant="ghost" size="sm" block style={{ justifyContent: 'flex-start' }} icon={<HelpCircle size={14} />}>Centro de ayuda</KButton>
              <KButton variant="ghost" size="sm" block style={{ justifyContent: 'flex-start' }} icon={<ExternalLink size={14} />}>Políticas de reembolso</KButton>
            </div>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div style={{ padding: 32, borderRadius: 24, backgroundColor: 'var(--card)', border: `1px solid var(--border)`, boxShadow: t.shadows.sm }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>Historial de Facturación</h3>
            <p style={{ margin: '4px 0 0', fontSize: 14, color: 'var(--muted-foreground)' }}>Descarga tus facturas y revisa los movimientos de tu cuenta.</p>
          </div>
          <KButton variant="outline" icon={<Download size={16} />}>Descargar Todo (.CSV)</KButton>
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
