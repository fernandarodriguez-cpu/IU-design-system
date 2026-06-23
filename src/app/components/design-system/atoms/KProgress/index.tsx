import React from 'react';
import { Progress as AntProgress } from 'antd';
import { cn } from '@/utils/cn';

/* ─── KProgress ─────────────────────────────────────────────────
   Migrated to Ant Design (was @radix-ui/react-progress).
   Khor color treatment preserved: in-progress = navy (#051758),
   complete = success green, exception = error red. line / circle /
   steps all map onto AntD Progress.
──────────────────────────────────────────────────────────────── */

export interface KProgressProps {
  value?: number;
  max?: number;
  showInfo?: boolean;
  type?: 'line' | 'circle';
  size?: 'sm' | 'md' | 'lg';
  status?: 'active' | 'success' | 'exception';
  strokeColor?: string;
  steps?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Fuerza el estado hover (útil para previews/playgrounds) */
  isHovered?: boolean;
}

// Khor line heights (sm/md/lg) and circle widths
const LINE_HEIGHT: Record<string, number> = { sm: 4, md: 8, lg: 12 };
const CIRCLE_SIZE: Record<string, number> = { sm: 24, md: 40, lg: 64 };

export const KProgress = React.forwardRef<HTMLDivElement, KProgressProps>(function KProgress(
  {
    value = 0,
    max = 100,
    showInfo = true,
    type = 'line',
    size = 'md',
    status,
    strokeColor,
    steps,
    className,
    style,
    isHovered,
  },
  ref,
) {
  const percent = Math.round((Math.min(Math.max(value, 0), max) / max) * 100);
  const isComplete = percent === 100;
  const hasError = status === 'exception';

  // Khor brand color treatment (overridable via strokeColor)
  const resolvedColor =
    strokeColor ?? (hasError ? 'var(--khor-error)' : isComplete ? 'var(--khor-success)' : 'var(--khor-primary)');

  // Map Khor status → AntD status (drop 'active' so our navy color wins instead of AntD's blue)
  const antStatus = hasError ? 'exception' : isComplete ? 'success' : undefined;

  return (
    <div
      ref={ref}
      className={cn('font-primary transition-transform', isHovered && 'scale-105', className)}
      style={style}
    >
      <AntProgress
        type={type === 'circle' ? 'circle' : 'line'}
        percent={percent}
        showInfo={showInfo}
        status={antStatus}
        strokeColor={resolvedColor}
        trailColor="var(--khor-neutral-200)"
        steps={type === 'line' && steps ? steps : undefined}
        size={type === 'circle' ? CIRCLE_SIZE[size] : { height: LINE_HEIGHT[size] }}
        format={(p) => <span className="font-bold">{p}%</span>}
      />
    </div>
  );
});

KProgress.displayName = 'KProgress';
export default KProgress;
