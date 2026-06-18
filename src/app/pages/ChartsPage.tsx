import React, { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  PieChart, Pie, Cell, RadialBarChart, RadialBar,
  ScatterChart, Scatter, ComposedChart,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
} from 'recharts';

// ── Color palette ──────────────────────────────────────────────
const NAVY   = '#051758';
const RED    = '#E04D36';
const GREEN  = '#10B981';
const AMBER  = '#F59E0B';
const PURPLE = '#8B5CF6';
const CYAN   = '#06B6D4';
const ORANGE = '#F97316';
const SLATE  = '#64748B';
const PALETTE = [NAVY, RED, GREEN, AMBER, PURPLE, CYAN, ORANGE, SLATE];

// ── Sample data ────────────────────────────────────────────────
const monthly = [
  { mes: 'Ene', ingresos: 420, gastos: 240, empleados: 45 },
  { mes: 'Feb', ingresos: 380, gastos: 210, empleados: 48 },
  { mes: 'Mar', ingresos: 610, gastos: 310, empleados: 52 },
  { mes: 'Abr', ingresos: 750, gastos: 380, empleados: 55 },
  { mes: 'May', ingresos: 520, gastos: 260, empleados: 53 },
  { mes: 'Jun', ingresos: 890, gastos: 420, empleados: 60 },
  { mes: 'Jul', ingresos: 740, gastos: 370, empleados: 62 },
  { mes: 'Ago', ingresos: 680, gastos: 340, empleados: 61 },
];

const departments = [
  { nombre: 'Ventas',    valor: 32 },
  { nombre: 'IT',        valor: 24 },
  { nombre: 'RRHH',      valor: 18 },
  { nombre: 'Marketing', valor: 14 },
  { nombre: 'Finanzas',  valor: 12 },
];

const radialData = [
  { name: 'Ventas',    value: 85, fill: NAVY   },
  { name: 'Marketing', value: 72, fill: GREEN  },
  { name: 'IT',        value: 64, fill: AMBER  },
  { name: 'RRHH',      value: 45, fill: RED    },
];

const scatterData = [
  { experiencia: 2,  salario: 45  },
  { experiencia: 5,  salario: 72  },
  { experiencia: 8,  salario: 95  },
  { experiencia: 3,  salario: 55  },
  { experiencia: 10, salario: 110 },
  { experiencia: 6,  salario: 80  },
  { experiencia: 4,  salario: 62  },
  { experiencia: 12, salario: 130 },
  { experiencia: 7,  salario: 88  },
  { experiencia: 1,  salario: 40  },
  { experiencia: 9,  salario: 102 },
  { experiencia: 11, salario: 118 },
];

// ── Shared styles ──────────────────────────────────────────────
const GRID_COLOR = '#F1F5F9';
const AXIS_COLOR = '#94A3B8';
const tooltipSt: React.CSSProperties = {
  backgroundColor: 'white',
  border: '1px solid #E2E8F0',
  borderRadius: 8,
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  fontSize: 12,
};
const axisProps = {
  tick: { fontSize: 11, fill: AXIS_COLOR },
  axisLine: false as const,
  tickLine: false as const,
};

// ── Card ───────────────────────────────────────────────────────
function ChartCard({
  title, description, children, height = 220, fullWidth = false,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  height?: number;
  fullWidth?: boolean;
}) {
  return (
    <div style={{
      background: 'white',
      border: '1px solid #E5E7EB',
      borderRadius: 12,
      padding: 24,
      gridColumn: fullWidth ? '1 / -1' : undefined,
    }}>
      <p style={{ margin: '0 0 2px', fontSize: 14, fontWeight: 600, color: NAVY }}>{title}</p>
      {description && <p style={{ margin: '0 0 16px', fontSize: 12, color: '#9CA3AF' }}>{description}</p>}
      {!description && <div style={{ marginBottom: 16 }} />}
      <div style={{ height, position: 'relative' }}>
        {children}
      </div>
    </div>
  );
}

// ── Sections ───────────────────────────────────────────────────

function BarSection() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

      <ChartCard title="Barras simple" description="Una sola serie de datos vertical">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthly} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
            <XAxis dataKey="mes" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip contentStyle={tooltipSt} cursor={{ fill: '#F8FAFC' }} />
            <Bar dataKey="ingresos" fill={NAVY} radius={[4, 4, 0, 0]} name="Ingresos" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Barras agrupadas" description="Comparación entre dos series">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthly} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
            <XAxis dataKey="mes" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip contentStyle={tooltipSt} cursor={{ fill: '#F8FAFC' }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="ingresos" fill={NAVY} radius={[4, 4, 0, 0]} name="Ingresos" />
            <Bar dataKey="gastos"   fill={RED}  radius={[4, 4, 0, 0]} name="Gastos"   />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Barras apiladas" description="Series acumuladas en una sola barra">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthly} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
            <XAxis dataKey="mes" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip contentStyle={tooltipSt} cursor={{ fill: '#F8FAFC' }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="ingresos" stackId="a" fill={NAVY} name="Ingresos" />
            <Bar dataKey="gastos"   stackId="a" fill={RED}  radius={[4, 4, 0, 0]} name="Gastos" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Barras horizontales" description="Ideal para rankings y comparaciones de categorías">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={departments} layout="vertical" margin={{ top: 4, right: 16, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} horizontal={false} />
            <XAxis type="number" {...axisProps} />
            <YAxis dataKey="nombre" type="category" {...axisProps} width={72} />
            <Tooltip contentStyle={tooltipSt} cursor={{ fill: '#F8FAFC' }} />
            <Bar dataKey="valor" fill={GREEN} radius={[0, 4, 4, 0]} name="%" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

    </div>
  );
}

function LineSection() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

      <ChartCard title="Línea simple" description="Tendencia de una sola métrica">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthly} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
            <XAxis dataKey="mes" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip contentStyle={tooltipSt} />
            <Line type="monotone" dataKey="ingresos" stroke={NAVY} strokeWidth={2.5}
              dot={{ r: 4, fill: NAVY, strokeWidth: 0 }} activeDot={{ r: 6 }} name="Ingresos" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Multi-línea" description="Comparación de varias métricas en el tiempo">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthly} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
            <XAxis dataKey="mes" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip contentStyle={tooltipSt} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="ingresos"  stroke={NAVY}  strokeWidth={2} dot={{ r: 3, fill: NAVY,  strokeWidth: 0 }} name="Ingresos"  />
            <Line type="monotone" dataKey="gastos"    stroke={RED}   strokeWidth={2} dot={{ r: 3, fill: RED,   strokeWidth: 0 }} name="Gastos"    />
            <Line type="monotone" dataKey="empleados" stroke={GREEN} strokeWidth={2} dot={{ r: 3, fill: GREEN, strokeWidth: 0 }} name="Empleados" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Línea suavizada (Bezier)" description="Curva continua para datos con transiciones graduales">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthly} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
            <XAxis dataKey="mes" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip contentStyle={tooltipSt} />
            <Line type="basis" dataKey="ingresos" stroke={PURPLE} strokeWidth={2.5} dot={false} name="Ingresos" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Línea escalonada" description="Para datos discretos o cambios abruptos">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthly} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
            <XAxis dataKey="mes" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip contentStyle={tooltipSt} />
            <Line type="stepAfter" dataKey="empleados" stroke={AMBER} strokeWidth={2.5}
              dot={{ r: 4, fill: AMBER, strokeWidth: 0 }} name="Empleados" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

    </div>
  );
}

function AreaSection() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

      <ChartCard title="Área simple con gradiente" description="Enfatiza el volumen bajo la línea">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthly} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
            <defs>
              <linearGradient id="gNavy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={NAVY} stopOpacity={0.18} />
                <stop offset="95%" stopColor={NAVY} stopOpacity={0}    />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
            <XAxis dataKey="mes" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip contentStyle={tooltipSt} />
            <Area type="monotone" dataKey="ingresos" stroke={NAVY} strokeWidth={2} fill="url(#gNavy)" name="Ingresos" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Área apilada" description="Composición acumulada de múltiples series">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthly} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
            <defs>
              <linearGradient id="gN" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={NAVY} stopOpacity={0.6} />
                <stop offset="95%" stopColor={NAVY} stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="gR" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={RED} stopOpacity={0.6} />
                <stop offset="95%" stopColor={RED} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
            <XAxis dataKey="mes" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip contentStyle={tooltipSt} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area type="monotone" dataKey="ingresos" stackId="1" stroke={NAVY} fill="url(#gN)" name="Ingresos" />
            <Area type="monotone" dataKey="gastos"   stackId="1" stroke={RED}  fill="url(#gR)" name="Gastos"   />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Área suavizada" description="Curva Bezier para transiciones fluidas">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthly} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
            <defs>
              <linearGradient id="gGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={GREEN} stopOpacity={0.25} />
                <stop offset="95%" stopColor={GREEN} stopOpacity={0}    />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
            <XAxis dataKey="mes" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip contentStyle={tooltipSt} />
            <Area type="basis" dataKey="ingresos" stroke={GREEN} strokeWidth={2} fill="url(#gGreen)" name="Ingresos" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Multi-área superpuesta" description="Áreas independientes para comparar tendencias">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthly} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
            <defs>
              <linearGradient id="maN" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={NAVY} stopOpacity={0.2} />
                <stop offset="95%" stopColor={NAVY} stopOpacity={0}   />
              </linearGradient>
              <linearGradient id="maG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={GREEN} stopOpacity={0.2} />
                <stop offset="95%" stopColor={GREEN} stopOpacity={0}   />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
            <XAxis dataKey="mes" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip contentStyle={tooltipSt} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area type="monotone" dataKey="ingresos" stroke={NAVY}  strokeWidth={2} fill="url(#maN)" name="Ingresos" />
            <Area type="monotone" dataKey="gastos"   stroke={GREEN} strokeWidth={2} fill="url(#maG)" name="Gastos"   />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

    </div>
  );
}

function PieSection() {
  const RADIAN = Math.PI / 180;
  const renderPctLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const r = innerRadius + (outerRadius - innerRadius) * 0.55;
    const x = cx + r * Math.cos(-midAngle * RADIAN);
    const y = cy + r * Math.sin(-midAngle * RADIAN);
    return percent > 0.05 ? (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

      <ChartCard title="Gráfica circular (Pie)" description="Distribución proporcional de categorías">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={departments} cx="50%" cy="50%" outerRadius={90}
              dataKey="valor" nameKey="nombre" labelLine={false} label={renderPctLabel}>
              {departments.map((_, i) => <Cell key={i} fill={PALETTE[i]} />)}
            </Pie>
            <Tooltip contentStyle={tooltipSt} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Donut" description="Circular con hueco — permite mostrar un KPI central">
        <div style={{ position: 'relative', height: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={departments} cx="50%" cy="50%" innerRadius={55} outerRadius={88}
                dataKey="valor" nameKey="nombre" paddingAngle={3}>
                {departments.map((_, i) => <Cell key={i} fill={PALETTE[i]} />)}
              </Pie>
              <Tooltip contentStyle={tooltipSt} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ position: 'absolute', top: '38%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center', pointerEvents: 'none' }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: NAVY, lineHeight: 1 }}>100%</div>
            <div style={{ fontSize: 10, color: SLATE, marginTop: 2 }}>Total</div>
          </div>
        </div>
      </ChartCard>

      <ChartCard title="Donut — KPI" description="Donut de una sola métrica con valor central grande">
        <div style={{ position: 'relative', height: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[{ value: 72 }, { value: 28 }]}
                cx="50%" cy="50%" innerRadius={65} outerRadius={90}
                dataKey="value" startAngle={90} endAngle={-270} paddingAngle={2}
              >
                <Cell fill={NAVY} />
                <Cell fill="#F1F5F9" />
              </Pie>
              <Tooltip contentStyle={tooltipSt} formatter={(v: any, _: any, p: any) => p.dataIndex === 0 ? [`${v}%`, 'Cumplimiento'] : null} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center', pointerEvents: 'none' }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: NAVY, lineHeight: 1 }}>72%</div>
            <div style={{ fontSize: 11, color: SLATE, marginTop: 4 }}>Cumplimiento</div>
          </div>
        </div>
      </ChartCard>

      <ChartCard title="Pie con etiquetas externas" description="Labels fuera del segmento con línea de referencia">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={departments} cx="50%" cy="50%" outerRadius={72}
              dataKey="valor" nameKey="nombre"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={{ stroke: SLATE, strokeWidth: 1 }}>
              {departments.map((_, i) => <Cell key={i} fill={PALETTE[i]} />)}
            </Pie>
            <Tooltip contentStyle={tooltipSt} />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

    </div>
  );
}

function RadialSection() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

      <ChartCard title="Barra radial multi-categoría" description="Comparación de progreso por departamento">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart cx="50%" cy="50%" innerRadius={20} outerRadius={90}
            data={radialData} startAngle={90} endAngle={-270}>
            <RadialBar dataKey="value" cornerRadius={4} background={{ fill: '#F1F5F9' }} label={false} />
            <Tooltip contentStyle={tooltipSt} formatter={(v: any) => [`${v}%`, '']} />
            <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} />
          </RadialBarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Medidor (Gauge)" description="Progreso de una métrica en formato semicircular">
        <div style={{ position: 'relative', height: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart cx="50%" cy="75%" innerRadius={75} outerRadius={110}
              data={[{ value: 72, fill: NAVY }]} startAngle={180} endAngle={0}>
              <RadialBar dataKey="value" background={{ fill: '#F1F5F9' }} cornerRadius={8} />
              <Tooltip contentStyle={tooltipSt} formatter={(v: any) => [`${v}%`, 'Cumplimiento']} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div style={{ position: 'absolute', bottom: '8%', left: 0, right: 0, textAlign: 'center', pointerEvents: 'none' }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: NAVY, lineHeight: 1 }}>72%</div>
            <div style={{ fontSize: 12, color: SLATE, marginTop: 4 }}>Cumplimiento</div>
          </div>
        </div>
      </ChartCard>

      <ChartCard title="Gauge — múltiples arcos" description="Varios indicadores concéntricos de progreso">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart cx="50%" cy="50%" innerRadius={30} outerRadius={95}
            data={radialData} startAngle={180} endAngle={0}>
            <RadialBar dataKey="value" cornerRadius={4} background={{ fill: '#F1F5F9' }} />
            <Tooltip contentStyle={tooltipSt} formatter={(v: any) => [`${v}%`, '']} />
            <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} />
          </RadialBarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Gauge — color semáforo" description="Valor único con colores de alerta por rango">
        <div style={{ position: 'relative', height: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart cx="50%" cy="75%" innerRadius={75} outerRadius={110}
              data={[{ value: 38, fill: RED }]} startAngle={180} endAngle={0}>
              <RadialBar dataKey="value" background={{ fill: '#F1F5F9' }} cornerRadius={8} />
              <Tooltip contentStyle={tooltipSt} formatter={(v: any) => [`${v}%`, 'Riesgo']} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div style={{ position: 'absolute', bottom: '8%', left: 0, right: 0, textAlign: 'center', pointerEvents: 'none' }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: RED, lineHeight: 1 }}>38%</div>
            <div style={{ fontSize: 12, color: SLATE, marginTop: 4 }}>Índice de riesgo</div>
          </div>
        </div>
      </ChartCard>

    </div>
  );
}

function ScatterSection() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

      <ChartCard title="Dispersión (Scatter)" description="Correlación entre experiencia y salario" fullWidth>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} />
            <XAxis dataKey="experiencia" type="number" name="Experiencia" {...axisProps}
              label={{ value: 'Años de experiencia', position: 'insideBottom', offset: -12, fontSize: 11, fill: AXIS_COLOR }} />
            <YAxis dataKey="salario" type="number" name="Salario" {...axisProps}
              label={{ value: 'Salario (k$)', angle: -90, position: 'insideLeft', offset: 10, fontSize: 11, fill: AXIS_COLOR }} />
            <Tooltip contentStyle={tooltipSt} cursor={{ strokeDasharray: '3 3' }}
              formatter={(v: any, n: string) => [n === 'experiencia' ? `${v} años` : `$${v}k`, n === 'experiencia' ? 'Experiencia' : 'Salario']} />
            <Scatter data={scatterData} fill={NAVY} opacity={0.75} />
          </ScatterChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Dispersión — dos grupos" description="Comparación de dos clusters en un plano">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} />
            <XAxis dataKey="experiencia" type="number" {...axisProps} />
            <YAxis dataKey="salario" type="number" {...axisProps} />
            <Tooltip contentStyle={tooltipSt} cursor={{ strokeDasharray: '3 3' }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Scatter name="Ingeniería" data={scatterData.slice(0, 6)} fill={NAVY} opacity={0.8} />
            <Scatter name="Ventas"     data={scatterData.slice(6)}    fill={RED}  opacity={0.8} />
          </ScatterChart>
        </ResponsiveContainer>
      </ChartCard>

    </div>
  );
}

function ComposedSection() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

      <ChartCard title="Barras + Línea" description="Combina barras para volumen y línea para tendencia" fullWidth>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={monthly} margin={{ top: 4, right: 24, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
            <XAxis dataKey="mes" {...axisProps} />
            <YAxis yAxisId="left"  {...axisProps} />
            <YAxis yAxisId="right" orientation="right" {...axisProps} />
            <Tooltip contentStyle={tooltipSt} cursor={{ fill: '#F8FAFC' }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar yAxisId="left"  dataKey="ingresos"  fill={NAVY}  radius={[4, 4, 0, 0]} name="Ingresos" opacity={0.85} />
            <Bar yAxisId="left"  dataKey="gastos"    fill={RED}   radius={[4, 4, 0, 0]} name="Gastos"   opacity={0.85} />
            <Line yAxisId="right" type="monotone" dataKey="empleados" stroke={GREEN} strokeWidth={2.5}
              dot={{ r: 4, fill: GREEN, strokeWidth: 0 }} name="Empleados" />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Área + Línea" description="Área de volumen con línea de referencia superpuesta">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={monthly} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
            <defs>
              <linearGradient id="compGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={NAVY} stopOpacity={0.15} />
                <stop offset="95%" stopColor={NAVY} stopOpacity={0}    />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
            <XAxis dataKey="mes" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip contentStyle={tooltipSt} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area type="monotone" dataKey="ingresos" stroke={NAVY} fill="url(#compGrad)" strokeWidth={0} name="Ingresos" />
            <Line type="monotone" dataKey="gastos"   stroke={RED}  strokeWidth={2.5} dot={{ r: 3, fill: RED, strokeWidth: 0 }} name="Gastos" />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Barras + Área + Línea" description="Tres capas de información en un solo gráfico">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={monthly} margin={{ top: 4, right: 24, bottom: 0, left: -10 }}>
            <defs>
              <linearGradient id="c3grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={AMBER} stopOpacity={0.3} />
                <stop offset="95%" stopColor={AMBER} stopOpacity={0}   />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
            <XAxis dataKey="mes" {...axisProps} />
            <YAxis yAxisId="left"  {...axisProps} />
            <YAxis yAxisId="right" orientation="right" {...axisProps} />
            <Tooltip contentStyle={tooltipSt} cursor={{ fill: '#F8FAFC' }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar      yAxisId="left"  dataKey="gastos"    fill={RED}   radius={[4, 4, 0, 0]} name="Gastos"    opacity={0.9} />
            <Area     yAxisId="left"  dataKey="ingresos"  stroke={AMBER} fill="url(#c3grad)" strokeWidth={1.5} name="Ingresos" />
            <Line     yAxisId="right" type="monotone" dataKey="empleados" stroke={NAVY} strokeWidth={2.5}
              dot={{ r: 3, fill: NAVY, strokeWidth: 0 }} name="Empleados" />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>

    </div>
  );
}

function SparklineSection() {
  const cards = [
    { label: 'Ingresos',  value: '$890k', change: '+12.4%', up: true,  color: NAVY,  data: monthly.map(d => ({ v: d.ingresos })) },
    { label: 'Gastos',    value: '$420k', change: '-4.1%',  up: false, color: RED,   data: monthly.map(d => ({ v: d.gastos })) },
    { label: 'Empleados', value: '62',    change: '+8.3%',  up: true,  color: GREEN, data: monthly.map(d => ({ v: d.empleados })) },
    { label: 'Eficiencia',value: '84%',   change: '+2.1%',  up: true,  color: PURPLE,data: [40,55,48,70,62,75,80,84].map(v => ({ v })) },
    { label: 'Retención', value: '91%',   change: '-0.5%',  up: false, color: AMBER, data: [95,94,93,92,92,91,91,91].map(v => ({ v })) },
    { label: 'NPS',       value: '68',    change: '+5.0%',  up: true,  color: CYAN,  data: [50,55,58,60,62,64,66,68].map(v => ({ v })) },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {cards.map(({ label, value, change, up, color, data }) => (
          <div key={label} style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 12, padding: 20 }}>
            <p style={{ margin: '0 0 4px', fontSize: 12, color: AXIS_COLOR }}>{label}</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14 }}>
              <span style={{ fontSize: 24, fontWeight: 700, color: NAVY }}>{value}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: up ? GREEN : RED }}>{change}</span>
            </div>
            <div style={{ height: 48 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>

      {/* Sparkline table example */}
      <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 12, padding: 24 }}>
        <p style={{ margin: '0 0 2px', fontSize: 14, fontWeight: 600, color: NAVY }}>Sparklines en tabla</p>
        <p style={{ margin: '0 0 20px', fontSize: 12, color: '#9CA3AF' }}>Uso típico en filas de tabla para mostrar tendencia inline</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #F1F5F9' }}>
              {['Departamento', 'Métrica', 'Valor', 'Tendencia (8 meses)'].map(h => (
                <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: AXIS_COLOR, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { dept: 'Ventas',    metric: 'Ingresos', value: '$890k', color: NAVY,   data: monthly.map(d => ({ v: d.ingresos })) },
              { dept: 'Finanzas', metric: 'Gastos',   value: '$420k', color: RED,    data: monthly.map(d => ({ v: d.gastos })) },
              { dept: 'RRHH',     metric: 'Headcount',value: '62',    color: GREEN,  data: monthly.map(d => ({ v: d.empleados })) },
            ].map(row => (
              <tr key={row.dept} style={{ borderBottom: '1px solid #F9FAFB' }}>
                <td style={{ padding: '10px 12px', color: NAVY, fontWeight: 600 }}>{row.dept}</td>
                <td style={{ padding: '10px 12px', color: '#6B7280' }}>{row.metric}</td>
                <td style={{ padding: '10px 12px', fontWeight: 600, color: '#374151' }}>{row.value}</td>
                <td style={{ padding: '10px 12px', width: 160 }}>
                  <div style={{ height: 32, width: 140 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={row.data}>
                        <Line type="monotone" dataKey="v" stroke={row.color} strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Chart type nav ─────────────────────────────────────────────
const CHART_TYPES = [
  { id: 'bar',       label: 'Barras'          },
  { id: 'line',      label: 'Línea'           },
  { id: 'area',      label: 'Área'            },
  { id: 'pie',       label: 'Circular / Donut'},
  { id: 'radial',    label: 'Radial / Gauge'  },
  { id: 'scatter',   label: 'Dispersión'      },
  { id: 'composed',  label: 'Compuesto'       },
  { id: 'sparkline', label: 'Sparkline'       },
];

// ── Page ───────────────────────────────────────────────────────
export function ChartsPage() {
  const [active, setActive] = useState('bar');

  const sections: Record<string, React.ReactNode> = {
    bar:       <BarSection />,
    line:      <LineSection />,
    area:      <AreaSection />,
    pie:       <PieSection />,
    radial:    <RadialSection />,
    scatter:   <ScatterSection />,
    composed:  <ComposedSection />,
    sparkline: <SparklineSection />,
  };

  return (
    <div style={{ padding: '32px 40px', maxWidth: 1200, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ margin: '0 0 8px', fontSize: 28, fontWeight: 700, color: NAVY }}>Gráficas</h1>
        <p style={{ margin: 0, fontSize: 14, color: '#6B7280', lineHeight: 1.6 }}>
          Librería de visualización de datos — <strong>Recharts v2</strong>. Todas las variantes disponibles para usar en el sistema Khor.
        </p>
      </div>

      {/* Type tabs */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
        {CHART_TYPES.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)} style={{
            padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer',
            fontWeight: 600, fontSize: 13, fontFamily: 'inherit',
            background: active === t.id ? NAVY : '#F3F4F6',
            color: active === t.id ? 'white' : '#374151',
            transition: 'background 0.15s, color 0.15s',
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Active section */}
      {sections[active]}
    </div>
  );
}
