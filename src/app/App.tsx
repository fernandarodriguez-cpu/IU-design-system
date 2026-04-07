import { RouterProvider } from 'react-router';
// Import router (now resolves to .tsx automatically)
import { router } from './routes';
import { KToastProvider } from './components/design-system/organisms/KToast';
import { KModalProvider } from './components/design-system/organisms/KModal';
import { ThemeProvider, useTheme } from './theme/theme-context';

function AppContent() {
  return (
    <KModalProvider>
      <RouterProvider router={router} />
      <KToastProvider />
    </KModalProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
