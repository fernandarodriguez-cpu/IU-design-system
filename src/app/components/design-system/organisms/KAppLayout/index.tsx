import React from 'react';
import { Layout } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const { Header, Sider, Content } = Layout;
const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KAppLayoutProps {
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  children: React.ReactNode;
  collapsed?: boolean;
}

export function KAppLayout({ sidebar, header, children, collapsed }: KAppLayoutProps) {
  return (
    <Layout style={{ minHeight: '100vh', fontFamily: font }}>
      {sidebar && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          theme="light"
          width={260}
          style={{
            borderRight: `1px solid ${t.colors.neutral[200]}`,
            backgroundColor: '#051758', // Khor Navy
          }}
        >
          {sidebar}
        </Sider>
      )}
      <Layout>
        {header && (
          <Header style={{ 
            padding: 0, 
            background: t.colors.neutral[50],
            borderBottom: `1px solid ${t.colors.neutral[200]}`,
            height: 64,
            display: 'flex',
            alignItems: 'center'
          }}>
            {header}
          </Header>
        )}
        <Content style={{ padding: 24, background: '#f8f9fa' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default KAppLayout;
