import { RouterProvider } from 'react-router';
import { router } from './routes';
import { KToastProvider } from './components/design-system/organisms/index';
import { ThemeProvider, useTheme } from './theme/theme-context';
import { ConfigProvider, theme } from 'antd';
import { khorTokens, khorStaticTokens } from './theme/khor-theme';

function AppContent() {
  const { isDark } = useTheme();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: khorStaticTokens.colors.primary,
          colorSuccess: khorStaticTokens.colors.success,
          colorError: khorStaticTokens.colors.error,
          colorWarning: khorStaticTokens.colors.warning,
          colorInfo: khorStaticTokens.colors.info,
          fontFamily: khorStaticTokens.typography.fontPrimary,
          borderRadius: khorStaticTokens.radius.md,
          borderRadiusSM: khorStaticTokens.radius.sm,
          borderRadiusLG: khorStaticTokens.radius.lg,
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
