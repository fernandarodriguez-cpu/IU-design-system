import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router';
import { AppShell } from './components/layout/AppShell';

// Lazy loading pages for better performance (Route Splitting)
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const TokensPage = lazy(() => import('./pages/TokensPage').then(m => ({ default: m.TokensPage })));
const AtomsPage = lazy(() => import('./pages/AtomsPage').then(m => ({ default: m.AtomsPage })));
const MoleculesPage = lazy(() => import('./pages/MoleculesPage').then(m => ({ default: m.MoleculesPage })));
const OrganismsPage = lazy(() => import('./pages/OrganismsPage').then(m => ({ default: m.OrganismsPage })));
const KhorGuardianPage = lazy(() => import('./pages/KhorGuardianPage').then(m => ({ default: m.KhorGuardianPage })));
const ChangelogPage = lazy(() => import('./pages/ChangelogPage').then(m => ({ default: m.ChangelogPage })));
const FigmaExportPage = lazy(() => import('./pages/FigmaExportPage').then(m => ({ default: m.FigmaExportPage })));
const AIExportPage = lazy(() => import('./pages/AIExportPage').then(m => ({ default: m.AIExportPage })));
const PatternsPage = lazy(() => import('./pages/PatternsPage').then(m => ({ default: m.PatternsPage })));
const ThemingPage = lazy(() => import('./pages/ThemingPage').then(m => ({ default: m.ThemingPage })));
const LayoutsPage = lazy(() => import('./pages/LayoutsPage').then(m => ({ default: m.LayoutsPage })));
const InspirationPage = lazy(() => import('./pages/InspirationPage').then(m => ({ default: m.InspirationPage })));
const GanttShowcase = lazy(() => import('./pages/GanttShowcase').then(m => ({ default: m.GanttShowcase })));
const KEditorShowcase = lazy(() => import('./pages/KEditorShowcase').then(m => ({ default: m.KEditorShowcase })));
const ErrorPage = lazy(() => import('./pages/ErrorPage').then(m => ({ default: m.ErrorPage })));
const IconExplorerPage = lazy(() => import('./pages/IconExplorerPage').then(m => ({ default: m.IconExplorerPage })));
const ChartsPage = lazy(() => import('./pages/ChartsPage').then(m => ({ default: m.ChartsPage })));
const AntdBridgePage = lazy(() => import('./pages/AntdBridgePage').then(m => ({ default: m.AntdBridgePage })));

// Loading placeholder
const PageLoader = () => (
  <div className="flex items-center justify-center h-[60vh] w-full">
    <div className="w-10 h-10 border-4 border-khor-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    errorElement: (
      <Suspense fallback={<PageLoader />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      { 
        index: true, 
        element: (
          <Suspense fallback={<PageLoader />}>
            <HomePage />
          </Suspense>
        ) 
      },
      { 
        path: 'tokens', 
        element: (
          <Suspense fallback={<PageLoader />}>
            <TokensPage />
          </Suspense>
        ) 
      },
      { 
        path: 'atoms/:id', 
        element: (
          <Suspense fallback={<PageLoader />}>
            <AtomsPage />
          </Suspense>
        ) 
      },
      { 
        path: 'molecules/:id', 
        element: (
          <Suspense fallback={<PageLoader />}>
            <MoleculesPage />
          </Suspense>
        ) 
      },
      { 
        path: 'organisms/:id', 
        element: (
          <Suspense fallback={<PageLoader />}>
            <OrganismsPage />
          </Suspense>
        ) 
      },
      { 
        path: 'patterns', 
        element: (
          <Suspense fallback={<PageLoader />}>
            <PatternsPage />
          </Suspense>
        ) 
      },
      { 
        path: 'patterns/:id', 
        element: (
          <Suspense fallback={<PageLoader />}>
            <PatternsPage />
          </Suspense>
        ) 
      },
      {
        path: 'theming',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ThemingPage />
          </Suspense>
        )
      },
      {
        path: 'layouts',
        element: (
          <Suspense fallback={<PageLoader />}>
            <LayoutsPage />
          </Suspense>
        )
      },
      { 
        path: 'organisms/gantt', 
        element: (
          <Suspense fallback={<PageLoader />}>
            <GanttShowcase />
          </Suspense>
        ) 
      },
      { 
        path: 'organisms/editor', 
        element: (
          <Suspense fallback={<PageLoader />}>
            <KEditorShowcase />
          </Suspense>
        ) 
      },
      { 
        path: 'guardian', 
        element: (
          <Suspense fallback={<PageLoader />}>
            <KhorGuardianPage />
          </Suspense>
        ) 
      },
      { 
        path: 'icons', 
        element: (
          <Suspense fallback={<PageLoader />}>
            <IconExplorerPage />
          </Suspense>
        ) 
      },
      { 
        path: 'figma-export', 
        element: (
          <Suspense fallback={<PageLoader />}>
            <FigmaExportPage />
          </Suspense>
        ) 
      },
      { 
        path: 'ai-export', 
        element: (
          <Suspense fallback={<PageLoader />}>
            <AIExportPage />
          </Suspense>
        ) 
      },
      { 
        path: 'inspiration', 
        element: (
          <Suspense fallback={<PageLoader />}>
            <InspirationPage />
          </Suspense>
        ) 
      },
      {
        path: 'changelog',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ChangelogPage />
          </Suspense>
        )
      },
      {
        path: 'organisms/charts',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ChartsPage />
          </Suspense>
        )
      },
      {
        path: 'antd-bridge',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AntdBridgePage />
          </Suspense>
        )
      },
    ],
  },
]);