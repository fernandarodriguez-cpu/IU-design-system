import React from 'react';
import { Layout } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const { Header, Sider, Content } = Layout;
const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KAppLayoutProps {
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  collapsed?: boolean;
  fixedHeader?: boolean;
  fixedSidebar?: boolean;
}

export function KAppLayout({ 
  sidebar, 
  header, 
  footer, 
  children, 
  collapsed,
  fixedHeader = true,
  fixedSidebar = true 
}: KAppLayoutProps) {
  const sidebarWidth = collapsed ? 80 : (t.layout.sidebarWidth || 260);
  const headerHeight = t.layout.headerHeight || 64;

  return (
    <Layout style={{ minHeight: '100vh', fontFamily: font }}>
      {sidebar && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          theme="light"
          width={sidebarWidth}
          style={{
            overflow: 'auto',
            height: fixedSidebar ? '100vh' : 'auto',
            position: fixedSidebar ? 'fixed' : 'relative',
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 100,
            borderRight: `1px solid ${t.colors.neutral[200]}`,
            backgroundColor: t.colors.brand.navy,
          }}
        >
          {sidebar}
        </Sider>
      )}
      <Layout style={{ 
        marginLeft: sidebar && fixedSidebar ? sidebarWidth : 0,
        transition: 'all 0.2s'
      }}>
        {header && (
          <Header style={{ 
            padding: 0, 
            background: t.colors.neutral[50],
            borderBottom: `1px solid ${t.colors.neutral[200]}`,
            height: headerHeight,
            display: 'flex',
            alignItems: 'center',
            position: fixedHeader ? 'fixed' : 'relative',
            top: 0,
            right: 0,
            width: sidebar && fixedSidebar ? `calc(100% - ${sidebarWidth}px)` : '100%',
            zIndex: 99,
            transition: 'all 0.2s'
          }}>
            {header}
          </Header>
        )}
        <Content style={{ 
          padding: 24, 
          background: t.colors.neutral[50], // Match neutral bg
          marginTop: header && fixedHeader ? headerHeight : 0,
          minHeight: `calc(100vh - ${header && fixedHeader ? headerHeight : 0}px - ${footer ? 64 : 0}px)`
        }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            {children}
          </div>
        </Content>
        {footer && (
          <Layout.Footer style={{ textAlign: 'center', background: t.colors.neutral[50], borderTop: `1px solid ${t.colors.neutral[200]}` }}>
            {footer}
          </Layout.Footer>
        )}
      </Layout>
    </Layout>
  );
}

export default KAppLayout;
