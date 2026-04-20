import React from 'react';
import { createBrowserRouter } from 'react-router';
import { AppShell } from './components/layout/AppShell';
import { HomePage } from './pages/HomePage';
import { TokensPage } from './pages/TokensPage';
import { AtomsPage } from './pages/AtomsPage';
import { MoleculesPage } from './pages/MoleculesPage';
import { OrganismsPage } from './pages/OrganismsPage';
import { KhorGuardianPage } from './pages/KhorGuardianPage';
import { ChangelogPage } from './pages/ChangelogPage';
import { FigmaExportPage } from './pages/FigmaExportPage';
import { AIExportPage } from './pages/AIExportPage';
import { PatternsPage } from './pages/PatternsPage';
import { ThemingPage } from './pages/ThemingPage';
import { ErrorPage } from './pages/ErrorPage';
import { IconExplorerPage } from './pages/IconExplorerPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'tokens', element: <TokensPage /> },
      { path: 'atoms/:id', element: <AtomsPage /> },
      { path: 'molecules/:id', element: <MoleculesPage /> },
      { path: 'organisms/:id', element: <OrganismsPage /> },
      { path: 'patterns', element: <PatternsPage /> },
      { path: 'patterns/:id', element: <PatternsPage /> },
      { path: 'theming', element: <ThemingPage /> },
      { path: 'guardian', element: <KhorGuardianPage /> },
      { path: 'icons', element: <IconExplorerPage /> },
      { path: 'figma-export', element: <FigmaExportPage /> },
      { path: 'ai-export', element: <AIExportPage /> },
      { path: 'changelog', element: <ChangelogPage /> },
    ],
  },
]);