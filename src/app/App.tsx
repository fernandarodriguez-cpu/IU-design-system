import { RouterProvider } from 'react-router';
import { router } from './routes';
import { KToastProvider } from './components/design-system/organisms';
import { ThemeProvider } from './theme/theme-context';

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <KToastProvider />
    </ThemeProvider>
  );
}
