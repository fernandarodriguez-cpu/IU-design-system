/**
 * ╔═══════════════════════════════════════════╗
 * ║  KHOR GANTT TYPES — Configuration         ║
 * ║  Elite Enterprise Scaling Logic           ║
 * ╚═══════════════════════════════════════════╝
 */

export type KGanttZoomLevel = 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years';

export interface KGanttTask {
  id: string;
  label: string;
  subtitle?: string;
  avatar?: string;
  start: Date;
  end: Date;
  progress?: number; // 0-100
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'error' | 'warning' | 'info' | string;
  tags?: string[];
  dependencies?: string[]; // IDs of tasks that must be completed before this one
  dependency?: string; // legacy support for single dependency
  data?: any; // generic meta
}

export interface KGanttConfig {
  rowHeight: number;
  sidebarWidth: number;
  intervalMinutes: number; // 5, 10, 15, 30, 60
  showProgress: boolean;
  showDependencies: boolean;
  enableDrag: boolean;
  enableResize: boolean;
}

export const GANTT_ZOOM_CONFIG: Record<KGanttZoomLevel, { 
  unitWidth: number; 
  labelFormat: string;
  subLabelFormat: string;
}> = {
  minutes: { unitWidth: 100, labelFormat: 'HH:mm', subLabelFormat: 'EEE dd' },
  hours: { unitWidth: 150, labelFormat: 'HH:00', subLabelFormat: 'EEE dd MMM' },
  days: { unitWidth: 200, labelFormat: 'EEE dd', subLabelFormat: 'MMMM yyyy' },
  weeks: { unitWidth: 250, labelFormat: "'Semana' w", subLabelFormat: 'MMM yyyy' },
  months: { unitWidth: 300, labelFormat: 'MMMM', subLabelFormat: 'yyyy' },
  years: { unitWidth: 400, labelFormat: 'yyyy', subLabelFormat: "'Era'" },
};
