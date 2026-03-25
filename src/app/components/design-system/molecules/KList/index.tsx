import React from 'react';
import { List } from 'antd';
import type { ListProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KList — Lista genérica (Wave 3)
   ═══════════════════════════════════════════════ */
export interface KListItem { key: string; title: React.ReactNode; description?: React.ReactNode; avatar?: React.ReactNode; extra?: React.ReactNode; }

export interface KListProps extends Omit<ListProps<KListItem>, 'dataSource' | 'renderItem'> {
  items: KListItem[];
}

export function KList({ items, size = 'default', bordered, header, footer, loading, className, style, ...rest }: KListProps) {
  return (
    <List
      dataSource={items}
      size={size as any}
      bordered={bordered}
      header={header}
      footer={footer}
      loading={loading}
      className={className}
      style={{ fontFamily: font, ...style }}
      {...rest}
      renderItem={(item) => (
        <List.Item extra={item.extra}>
          <List.Item.Meta
            avatar={item.avatar}
            title={item.title}
            description={item.description}
          />
        </List.Item>
      )}
    />
  );
}

export default KList;
