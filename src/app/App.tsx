import { RouterProvider } from 'react-router';
import { router } from './routes';
import { KToastProvider } from './components/design-system/organisms/index';
import { ThemeProvider, useTheme } from './theme/theme-context';
import { ConfigProvider, theme } from 'antd';
import { khorTokens, khorStaticColors } from './theme/khor-theme';

function AppContent() {
  const { isDark } = useTheme();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: khorStaticColors.primary,
          colorSuccess: '#2E7D32', // Matches var(--khor-success)
          colorError: '#D32F2F',   // Matches var(--khor-error)
          colorWarning: '#FF9500', // Matches var(--khor-warning)
          colorInfo: '#051758',    // Matches var(--khor-navy)
          fontFamily: "'Raleway', sans-serif",
          borderRadius: 8,
        },
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <RouterProvider router={router} />
      <KToastProvider />
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
