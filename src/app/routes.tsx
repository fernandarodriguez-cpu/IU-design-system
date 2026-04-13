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

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppShell,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: HomePage },
      { path: 'tokens', Component: TokensPage },
      { path: 'atoms/:id', Component: AtomsPage },
      { path: 'molecules/:id', Component: MoleculesPage },
      { path: 'organisms/:id?', Component: OrganismsPage },
      { path: 'guardian', Component: KhorGuardianPage },
      { path: 'patterns', Component: PatternsPage },
      { path: 'patterns/:id', Component: PatternsPage },
      { path: 'theming', Component: ThemingPage },
      { path: 'changelog', Component: ChangelogPage },
      { path: 'figma-export', Component: FigmaExportPage },
      { path: 'ai-export', Component: AIExportPage },
    ],
  },
]);