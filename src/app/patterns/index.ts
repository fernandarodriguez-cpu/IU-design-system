import { Pattern } from './types';
import { DashboardStatsPattern } from './DashboardStatsPattern';
import { OnboardingPattern } from './OnboardingPattern';
import { BillingPattern } from './BillingPattern';
import { AdvancedFiltersPattern } from './AdvancedFiltersPattern';
import { EmptyStateGalleryPattern } from './EmptyStateGalleryPattern';
import { SaaSDashboardPattern } from './SaaSDashboardPattern';
import { SaaSLoginPattern } from './SaaSLoginPattern';
import { SaaSCRUDTablePattern } from './SaaSCRUDTablePattern';
import { SaaSWizardPattern } from './SaaSWizardPattern';
import { FilterableListPattern } from './FilterableListPattern';
import { PaginatedTablePattern } from './PaginatedTablePattern';

export const patterns: Pattern[] = [
  // core Dashboard & Stat Metrics
  DashboardStatsPattern,
  SaaSDashboardPattern,
  
  // High-Fidelity SaaS Recipes (Successors of TPL: patterns)
  SaaSLoginPattern,
  SaaSCRUDTablePattern,
  SaaSWizardPattern,
  BillingPattern,
  OnboardingPattern,
  
  // Data Exploration & UI Patterns
  AdvancedFiltersPattern,
  FilterableListPattern,
  PaginatedTablePattern,
  EmptyStateGalleryPattern,
];

export const allPatterns = patterns;

export const categories = [
  'Todos',
  'SaaS',
  'Dashboard',
  'Datos',
  'Feedback'
];

export * from './types';
export * from './DashboardStatsPattern';
export * from './OnboardingPattern';
export * from './BillingPattern';
export * from './AdvancedFiltersPattern';
export * from './EmptyStateGalleryPattern';
export * from './SaaSDashboardPattern';
export * from './SaaSLoginPattern';
export * from './SaaSCRUDTablePattern';
export * from './SaaSWizardPattern';
export * from './FilterableListPattern';
export * from './PaginatedTablePattern';
