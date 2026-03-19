import React, { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KFormList — Lista dinámica de campos (Organismo)
   ═══════════════════════════════════════════════ */
export interface KFormListField {
  key: string;
  [k: string]: any;
}

export interface KFormListProps {
  value?: KFormListField[];
  onChange?: (fields: KFormListField[]) => void;
  renderItem: (field: KFormListField, index: number, operations: { remove: () => void }) => React.ReactNode;
  addText?: string;
  maxItems?: number;
  minItems?: number;
  initialValue?: Partial<KFormListField>;
  className?: string;
}

export function KFormList({
  value = [], onChange, renderItem, addText = 'Agregar campo',
  maxItems, minItems = 0, initialValue = {}, className,
}: KFormListProps) {
  const handleAdd = () => {
    if (maxItems && value.length >= maxItems) return;
    const newField: KFormListField = { key: `field-${Date.now()}-${Math.random().toString(36).slice(2)}`, ...initialValue };
    onChange?.([...value, newField]);
  };

  const handleRemove = (index: number) => {
    if (value.length <= minItems) return;
    onChange?.(value.filter((_, i) => i !== index));
  };

  return (
    <div className={className} style={{ fontFamily: font }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {value.map((field, index) => (
          <div key={field.key} style={{
            display: 'flex', alignItems: 'flex-start', gap: 12,
            padding: 16, borderRadius: t.radius.md,
            border: `1px solid ${t.colors.neutral[200]}`, backgroundColor: t.colors.neutral[50],
          }}>
            <div style={{ flex: 1 }}>
              {renderItem(field, index, { remove: () => handleRemove(index) })}
            </div>
            {value.length > minItems && (
              <button onClick={() => handleRemove(index)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 32, height: 32, borderRadius: t.radius.sm,
                border: `1px solid ${t.colors.neutral[200]}`, backgroundColor: 'transparent',
                cursor: 'pointer', color: t.colors.feedback.error, flexShrink: 0,
                transition: 'all 0.15s ease',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = t.colors.feedback.errorLight; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={handleAdd}
        disabled={maxItems ? value.length >= maxItems : false}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          width: '100%', padding: 12, marginTop: 12, borderRadius: t.radius.md,
          border: `2px dashed ${t.colors.neutral[200]}`, backgroundColor: 'transparent',
          cursor: maxItems && value.length >= maxItems ? 'not-allowed' : 'pointer',
          color: t.colors.brand.primary, fontFamily: font, fontSize: 14, fontWeight: 500,
          transition: 'all 0.15s ease',
          opacity: maxItems && value.length >= maxItems ? 0.5 : 1,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = t.colors.brand.primary; e.currentTarget.style.backgroundColor = 'rgba(224,77,54,0.04)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = t.colors.neutral[200]; e.currentTarget.style.backgroundColor = 'transparent'; }}
      >
        <Plus size={16} />
        {addText}
      </button>
    </div>
  );
}

export default KFormList;
