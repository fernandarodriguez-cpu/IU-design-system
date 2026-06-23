import { ConfigProvider } from 'antd';
import { RouterProvider } from 'react-router';
// Import router (now resolves to .tsx automatically)
import { router } from './routes';
import { KToastProvider } from './components/design-system/organisms/KToast';
import { KModalProvider } from './components/design-system/organisms/KModal';
import { ThemeProvider, useTheme } from './theme/theme-context';
import { buildKhorAntdTheme } from './theme/khorAntdTheme';

function AppContent() {
  // Derive the AntD theme from the live Khor themeConfig so industry presets
  // and custom-brand changes flow into every AntD-based K* component.
  const { themeConfig } = useTheme();
  return (
    <ConfigProvider theme={buildKhorAntdTheme(themeConfig)}>
      <KModalProvider>
        <RouterProvider router={router} />
        <KToastProvider />
      </KModalProvider>
    </ConfigProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
