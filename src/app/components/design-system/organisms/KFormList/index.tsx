import React from 'react';
import { Form, Button } from 'antd';
import { Trash2, Plus } from 'lucide-react';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KFormList — Lista dinámica de campos (Organismo)
   ═══════════════════════════════════════════════ */
export interface KFormListField {
  name: number;
  key: number;
  isFirst: boolean;
  isLast: boolean;
}

// Using any for props to avoid type export issues with Form.List in different antd versions
export interface KFormListProps {
  name: string | number | (string | number)[];
  rules?: any[];
  initialValue?: any[];
  addText?: string;
  maxItems?: number;
  minItems?: number;
  renderItem: (field: KFormListField, index: number, operations: { remove: (index: number) => void; move: (from: number, to: number) => void }) => React.ReactNode;
}

export function KFormList({
  name,
  rules,
  initialValue,
  addText = 'Agregar campo',
  maxItems,
  minItems = 0,
  renderItem,
  ...rest
}: KFormListProps) {
  return (
    <Form.List name={name} rules={rules} initialValue={initialValue} {...rest}>
      {(fields, { add, remove, move }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {fields.map((field, index) => (
            <div 
              key={field.key} 
              style={{
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: 12,
                padding: 16, 
                borderRadius: t.radius.md,
                border: `1px solid ${t.colors.neutral[200]}`, 
                backgroundColor: t.colors.neutral[50],
              }}
            >
              <div style={{ flex: 1 }}>
                {renderItem(
                  { ...field, isFirst: index === 0, isLast: index === fields.length - 1 },
                  index,
                  { remove, move }
                )}
              </div>
              {fields.length > minItems && (
                <Button
                  type="text"
                  danger
                  icon={<Trash2 size={14} />}
                  onClick={() => remove(field.name)}
                  style={{ 
                    marginTop: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: t.radius.sm,
                  }}
                />
              )}
            </div>
          ))}
          <Button
            type="dashed"
            onClick={() => add()}
            disabled={maxItems ? fields.length >= maxItems : false}
            icon={<Plus size={16} />}
            style={{
              width: '100%',
              height: 'auto',
              padding: '12px',
              borderRadius: t.radius.md,
              color: t.colors.brand.primary,
              borderColor: t.colors.neutral[200],
              fontFamily: font,
              fontSize: 14,
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            {addText}
          </Button>
          {(maxItems || minItems > 0) && (
            <div style={{ fontSize: 12, color: t.colors.neutral[400], textAlign: 'right' }}>
              {fields.length} de {maxItems || '∞'} items {minItems > 0 && `(Min: ${minItems})`}
            </div>
          )}
        </div>
      )}
    </Form.List>
  );
}

export default KFormList;
