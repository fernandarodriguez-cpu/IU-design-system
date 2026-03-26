import { DashboardStatsPattern } from './DashboardStatsPattern';
import { FormValidationPattern } from './FormValidationPattern';
import { FilterableListPattern } from './FilterableListPattern';
import { LoginFormPattern } from './LoginFormPattern';
import { PaginatedTablePattern } from './PaginatedTablePattern';
import { WizardPattern } from './WizardPattern';
import { SettingsPattern } from './SettingsPattern';
import { SidebarPattern } from './SidebarPattern';

export const patterns = [
  DashboardStatsPattern,
  FormValidationPattern,
  FilterableListPattern,
  LoginFormPattern,
  PaginatedTablePattern,
  WizardPattern,
  SettingsPattern,
  SidebarPattern,
];

// Helper to extract unique categories dynamically
export const categories = ['Todos', ...new Set(patterns.map((p) => p.category))];

// Re-export the interface to be used across the app
export * from './types';
