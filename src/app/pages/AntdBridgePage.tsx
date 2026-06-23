/**
 * ╔════════════════════════════════════════════════════════════╗
 * ║  PHASE 0 — ANTD THEME BRIDGE PROOF                          ║
 * ║                                                            ║
 * ║  Renders raw Ant Design components under the Khor          ║
 * ║  ConfigProvider bridge, side-by-side with the existing K   ║
 * ║  components, so fidelity can be visually verified before    ║
 * ║  any production component is rebuilt.                        ║
 * ║                                                            ║
 * ║  Route: /antd-bridge                                        ║
 * ╚════════════════════════════════════════════════════════════╝
 */
import React, { useState } from 'react';
import { Button as AntButton, Checkbox as AntCheckbox, Input as AntInput, Space } from 'antd';
import { KButton } from '../components/design-system/atoms/KButton/index';
import { KCheckbox } from '../components/design-system/atoms/KCheckbox/index';
import { KInput } from '../components/design-system/atoms/KInput/index';

const Row: React.FC<{ title: string; khor: React.ReactNode; antd: React.ReactNode }> = ({
  title,
  khor,
  antd,
}) => (
  <div style={{ borderBottom: '1px solid #E5E7EB', padding: '20px 0' }}>
    <div style={{ fontSize: 12, fontWeight: 600, color: '#8489AB', marginBottom: 12, letterSpacing: 0.4 }}>
      {title.toUpperCase()}
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
      <div>
        <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 10 }}>Khor (current)</div>
        <Space wrap size={12} align="center">{khor}</Space>
      </div>
      <div>
        <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 10 }}>AntD via bridge</div>
        <Space wrap size={12} align="center">{antd}</Space>
      </div>
    </div>
  </div>
);

export function AntdBridgePage() {
  const [checked, setChecked] = useState(true);

  return (
    <div style={{ maxWidth: 980, margin: '0 auto', padding: '40px 24px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: '#051758', marginBottom: 4 }}>
        Phase 0 — AntD Theme Bridge Proof
      </h1>
      <p style={{ color: '#475A8F', marginBottom: 8 }}>
        Right column is unmodified Ant Design, themed only through <code>buildKhorAntdTheme()</code> +{' '}
        <code>ConfigProvider</code>. Compare colors, radii, heights and font against the Khor originals on the left.
      </p>

      {/* ── Buttons ── */}
      <Row
        title="Primary button (sizes sm / md / lg)"
        khor={
          <>
            <KButton size="sm">Small</KButton>
            <KButton size="md">Medium</KButton>
            <KButton size="lg">Large</KButton>
          </>
        }
        antd={
          <>
            <AntButton type="primary" size="small">Small</AntButton>
            <AntButton type="primary">Medium</AntButton>
            <AntButton type="primary" size="large">Large</AntButton>
          </>
        }
      />

      <Row
        title="Button variants"
        khor={
          <>
            <KButton variant="primary">Primary</KButton>
            <KButton variant="outline">Outline</KButton>
            <KButton variant="dashed">Dashed</KButton>
            <KButton variant="text">Text</KButton>
            <KButton variant="link">Link</KButton>
            <KButton variant="danger">Danger</KButton>
          </>
        }
        antd={
          <>
            <AntButton type="primary">Primary</AntButton>
            <AntButton>Outline</AntButton>
            <AntButton type="dashed">Dashed</AntButton>
            <AntButton type="text">Text</AntButton>
            <AntButton type="link">Link</AntButton>
            <AntButton type="primary" danger>Danger</AntButton>
          </>
        }
      />

      {/* ── Checkbox (Khor uses Radix; AntD is native) ── */}
      <Row
        title="Checkbox — checked fill should be #E04D36 (secondary)"
        khor={
          <>
            <KCheckbox checked={checked} onCheckedChange={(v) => setChecked(!!v)} label="Checked" />
            <KCheckbox label="Unchecked" />
            <KCheckbox disabled label="Disabled" />
          </>
        }
        antd={
          <>
            <AntCheckbox checked={checked} onChange={(e) => setChecked(e.target.checked)}>Checked</AntCheckbox>
            <AntCheckbox>Unchecked</AntCheckbox>
            <AntCheckbox disabled>Disabled</AntCheckbox>
          </>
        }
      />

      {/* ── Input ── */}
      <Row
        title="Input — border, focus ring & radius"
        khor={
          <div style={{ width: 240 }}>
            <KInput placeholder="Type here…" />
          </div>
        }
        antd={
          <div style={{ width: 240 }}>
            <AntInput placeholder="Type here…" />
          </div>
        }
      />

      <div style={{ marginTop: 28, padding: 16, background: '#F8FAFC', borderRadius: 8, fontSize: 13, color: '#475A8F' }}>
        <strong>Reading the diff:</strong> brand color, radius and font should match closely. Expected residual
        gaps the bridge alone cannot close (and that per-component overrides will handle in Phase 1): the Khor
        button's top highlight stripe & press-scale animation, the checkbox hover tint <code>#fff8f7</code> and
        error/warning states, and KInput's 36px medium height (AntD default is 32px).
      </div>
    </div>
  );
}

export default AntdBridgePage;
