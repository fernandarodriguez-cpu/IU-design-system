import { RouterProvider } from 'react-router';
import { router } from './routes';
import { KToastProvider } from './components/design-system/organisms/index';
import { ThemeProvider, useTheme } from './theme/theme-context';
import { khorTokens, khorStaticTokens } from './theme/khor-theme';

function AppContent() {
  const { isDark } = useTheme();

  return (
    <>
      <RouterProvider router={router} />
      <KToastProvider />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
