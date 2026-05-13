/**
 * ╔═══════════════════════════════════════════╗
 * ║  KHOR GANTT — Elite Organism               ║
 * ║  High-Fidelity Timeline & Agenda System    ║
 * ╚═══════════════════════════════════════════╝
 */
import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { format, addMinutes, differenceInMinutes, startOfDay, endOfDay } from 'date-fns';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Settings2, Calendar, GripVertical } from 'lucide-react';
import { KGanttTask, KGanttZoomLevel, KGanttConfig, GANTT_ZOOM_CONFIG } from './types';
export type { KGanttTask, KGanttZoomLevel, KGanttConfig };
import { KButton, KText, KAvatar, KBadge } from '../../atoms';
import { khorTokens } from '../../../../theme/khor-theme';

export interface KGanttProps {
  tasks: KGanttTask[];
  startDate?: Date;
  endDate?: Date;
  initialZoom?: KGanttZoomLevel;
  initialInterval?: number;
  config?: Partial<KGanttConfig>;
  onTaskChange?: (taskId: string, updates: Partial<KGanttTask>) => void;
  className?: string;
}

export const KGantt: React.FC<KGanttProps> = ({
  tasks,
  startDate = startOfDay(new Date()),
  endDate = endOfDay(new Date()),
  initialZoom = 'hours',
  initialInterval = 15,
  config: userConfig,
  onTaskChange,
  className = '',
}) => {
  const [zoom, setZoom] = useState<KGanttZoomLevel>(initialZoom);
  const [interval, setIntervalVal] = useState(initialInterval);
  const [draggingTask, setDraggingTask] = useState<{ id: string, initialStart: Date, initialEnd: Date, mouseStartX: number } | null>(null);
  const [resizingTask, setResizingTask] = useState<{ id: string, side: 'left' | 'right', initialDate: Date, mouseStartX: number } | null>(null);
  
  const config: KGanttConfig = {
    rowHeight: 64,
    sidebarWidth: 280,
    intervalMinutes: interval,
    showProgress: true,
    showDependencies: true,
    enableDrag: true,
    enableResize: true,
    ...userConfig
  };

  const zoomConfig = GANTT_ZOOM_CONFIG[zoom];
  const totalMinutes = differenceInMinutes(endDate, startDate);
  const totalWidth = (totalMinutes / interval) * zoomConfig.unitWidth;

  const getPosition = useCallback((date: Date) => {
    const minutesFromStart = differenceInMinutes(date, startDate);
    return (minutesFromStart / interval) * zoomConfig.unitWidth;
  }, [startDate, interval, zoomConfig.unitWidth]);

  const getWidth = useCallback((start: Date, end: Date) => {
    const minutes = differenceInMinutes(end, start);
    return (minutes / interval) * zoomConfig.unitWidth;
  }, [interval, zoomConfig.unitWidth]);

  const pixelToMinutes = useCallback((pixels: number) => {
    return (pixels / zoomConfig.unitWidth) * interval;
  }, [interval, zoomConfig.unitWidth]);

  // Handle Dragging
  useEffect(() => {
    if (!draggingTask && !resizingTask) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (draggingTask) {
        const deltaX = e.clientX - draggingTask.mouseStartX;
        const deltaMinutes = pixelToMinutes(deltaX);
        const newStart = addMinutes(draggingTask.initialStart, deltaMinutes);
        const duration = differenceInMinutes(draggingTask.initialEnd, draggingTask.initialStart);
        const newEnd = addMinutes(newStart, duration);
        onTaskChange?.(draggingTask.id, { start: newStart, end: newEnd });
      } else if (resizingTask) {
        const deltaX = e.clientX - resizingTask.mouseStartX;
        const deltaMinutes = pixelToMinutes(deltaX);
        if (resizingTask.side === 'left') {
          const newStart = addMinutes(resizingTask.initialDate, deltaMinutes);
          onTaskChange?.(resizingTask.id, { start: newStart });
        } else {
          const newEnd = addMinutes(resizingTask.initialDate, deltaMinutes);
          onTaskChange?.(resizingTask.id, { end: newEnd });
        }
      }
    };

    const handleMouseUp = () => {
      setDraggingTask(null);
      setResizingTask(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingTask, resizingTask, pixelToMinutes, onTaskChange]);

  // Wheel Zoom logic
  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const levels: KGanttZoomLevel[] = ['minutes', 'hours', 'days', 'weeks', 'months', 'years'];
      const idx = levels.indexOf(zoom);
      if (e.deltaY < 0 && idx > 0) {
        setZoom(levels[idx - 1]);
      } else if (e.deltaY > 0 && idx < levels.length - 1) {
        setZoom(levels[idx + 1]);
      }
    }
  };

  // Dependency Line logic
  const renderDependencies = () => {
    if (!config.showDependencies) return null;
    
    return (
      <svg className="absolute inset-0 pointer-events-none z-10" style={{ width: totalWidth, height: tasks.length * config.rowHeight }}>
        {tasks.map(task => {
          const depIds = task.dependencies || (task.dependency ? [task.dependency] : []);
          if (depIds.length === 0) return null;

          return depIds.map(depId => {
            const depTask = tasks.find(t => t.id === depId);
            if (!depTask) return null;

            const startX = getPosition(depTask.end);
            const startY = (tasks.indexOf(depTask) * config.rowHeight) + (config.rowHeight / 2);
            const endX = getPosition(task.start);
            const endY = (tasks.indexOf(task) * config.rowHeight) + (config.rowHeight / 2);

            // Curve logic
            const cp1X = startX + 20;
            const cp2X = endX - 20;

            return (
              <g key={`${task.id}-${depId}`}>
                <path 
                  d={`M ${startX} ${startY} C ${cp1X} ${startY}, ${cp2X} ${endY}, ${endX} ${endY}`}
                  fill="none"
                  stroke="var(--khor-primary)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  opacity="0.4"
                />
                <circle cx={endX} cy={endY} r="3" fill="var(--khor-primary)" />
              </g>
            );
          });
        })}
      </svg>
    );
  };

  return (
    <div className={`flex flex-col h-full bg-white dark:bg-khor-surface-card rounded-3xl border border-khor-border-default overflow-hidden ${className}`}>
      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between p-4 border-b border-khor-border-default bg-khor-neutral-50/50 dark:bg-white/5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <KButton variant="ghost" size="sm" icon={<ChevronLeft size={16} />} />
            <KText variant="body-md" className="font-bold min-w-[140px] text-center">
              {format(startDate, 'dd MMM')} - {format(endDate, 'dd MMM yyyy')}
            </KText>
            <KButton variant="ghost" size="sm" icon={<ChevronRight size={16} />} />
          </div>
          <KBadge label={`${tasks.length} Tareas`} color="blue" />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-khor-neutral-100 dark:bg-white/10 p-1 rounded-xl">
            <KButton 
              variant="ghost" size="sm" 
              icon={<ZoomOut size={16} />} 
              onClick={() => {
                const levels: KGanttZoomLevel[] = ['minutes', 'hours', 'days', 'weeks', 'months', 'years'];
                const idx = levels.indexOf(zoom);
                if (idx < levels.length - 1) setZoom(levels[idx + 1]);
              }}
            />
            <span className="px-3 text-[10px] font-black uppercase opacity-60 tracking-widest">{zoom}</span>
            <KButton 
              variant="ghost" size="sm" 
              icon={<ZoomIn size={16} />} 
              onClick={() => {
                const levels: KGanttZoomLevel[] = ['minutes', 'hours', 'days', 'weeks', 'months', 'years'];
                const idx = levels.indexOf(zoom);
                if (idx > 0) setZoom(levels[idx - 1]);
              }}
            />
          </div>
          <KButton variant="outline" size="sm" icon={<Settings2 size={16} />}>Config</KButton>
        </div>
      </div>

      {/* ── Main Canvas ── */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <div 
          className="flex-shrink-0 border-r border-khor-border-default bg-khor-neutral-50/30 dark:bg-black/10 z-20"
          style={{ width: config.sidebarWidth }}
        >
          <div className="h-16 border-b border-khor-border-default flex items-center px-6">
            <KText variant="small" className="font-bold uppercase tracking-widest opacity-40 text-xs text-khor-primary">Recursos / Tareas</KText>
          </div>
          <div className="overflow-y-auto" style={{ height: 'calc(100% - 64px)' }}>
            {tasks.map(task => (
              <div 
                key={task.id} 
                className="flex items-center gap-3 px-4 border-b border-khor-border-default/50 hover:bg-khor-primary/5 transition-colors"
                style={{ height: config.rowHeight }}
              >
                <KAvatar src={task.avatar} name={task.label} size="sm" />
                <div className="min-w-0">
                  <KText variant="small" className="font-bold truncate">{task.label}</KText>
                  {task.subtitle && <KText variant="small" className="opacity-50 truncate">{task.subtitle}</KText>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Area */}
        <div 
          className="flex-1 overflow-x-auto relative scrollbar-hide"
          onWheel={handleWheel}
        >
          <div style={{ width: totalWidth, height: '100%' }}>
            {/* Header */}
            <div className="h-16 border-b border-khor-border-default flex sticky top-0 bg-white/80 dark:bg-khor-surface-card/80 backdrop-blur-md z-30">
              <div className="flex">
                {Array.from({ length: Math.ceil(totalMinutes / interval) }).map((_, i) => {
                  const date = addMinutes(startDate, i * interval);
                  const isMajor = i % 4 === 0;
                  return (
                    <div 
                      key={i} 
                      className={`flex-shrink-0 border-r border-khor-border-default/30 flex flex-col justify-center px-3 ${isMajor ? 'bg-khor-primary/5' : ''}`}
                      style={{ width: zoomConfig.unitWidth }}
                    >
                      <KText variant="small" className={`font-black ${isMajor ? 'text-khor-primary' : 'opacity-40 text-[10px]'}`}>
                        {format(date, zoomConfig.labelFormat)}
                      </KText>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Grid & Bars */}
            <div className="relative" style={{ height: 'calc(100% - 64px)' }}>
              {/* Background Grid Lines */}
              <div className="absolute inset-0 flex pointer-events-none">
                {Array.from({ length: Math.ceil(totalMinutes / interval) }).map((_, i) => (
                  <div 
                    key={i} 
                    className="flex-shrink-0 border-r border-khor-border-default/10 h-full"
                    style={{ width: zoomConfig.unitWidth }}
                  />
                ))}
              </div>

              {/* Dependency Layer */}
              {renderDependencies()}

              {/* Task Bars */}
              {tasks.map((task, idx) => {
                const left = getPosition(task.start);
                const width = getWidth(task.start, task.end);
                return (
                  <div 
                    key={task.id}
                    className="absolute border-b border-khor-border-default/10 flex items-center"
                    style={{ 
                      top: idx * config.rowHeight, 
                      left: 0, 
                      width: totalWidth, 
                      height: config.rowHeight 
                    }}
                  >
                    <div 
                      className={`
                        h-12 rounded-2xl flex items-center px-4 relative group transition-shadow
                        ${draggingTask?.id === task.id ? 'z-50 ring-2 ring-khor-primary shadow-2xl' : 'z-20 shadow-khor-md'}
                        ${task.color === 'primary' ? 'bg-khor-primary text-white' : 
                          task.color === 'success' ? 'bg-khor-success text-white' :
                          task.color === 'accent' ? 'bg-khor-accent text-white' :
                          'bg-khor-neutral-200 dark:bg-white/10 dark:text-white'}
                      `}
                      style={{ left, width, minWidth: 60 }}
                      onMouseDown={(e) => {
                        if (config.enableDrag) {
                          setDraggingTask({ id: task.id, initialStart: task.start, initialEnd: task.end, mouseStartX: e.clientX });
                        }
                      }}
                    >
                      {/* Drag Handle Icon */}
                      <div className="mr-2 opacity-30 group-hover:opacity-100 cursor-grab active:cursor-grabbing">
                        <GripVertical size={14} />
                      </div>

                      <KText variant="small" className="font-bold truncate group-hover:text-khor-primary transition-colors">{task.label}</KText>
                      
                      {/* Resize Handles */}
                      {config.enableResize && (
                        <>
                          <div 
                            className="absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-white/20 rounded-l-2xl" 
                            onMouseDown={(e) => {
                              e.stopPropagation();
                              setResizingTask({ id: task.id, side: 'left', initialDate: task.start, mouseStartX: e.clientX });
                            }}
                          />
                          <div 
                            className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-white/20 rounded-r-2xl" 
                            onMouseDown={(e) => {
                              e.stopPropagation();
                              setResizingTask({ id: task.id, side: 'right', initialDate: task.end, mouseStartX: e.clientX });
                            }}
                          />
                        </>
                      )}

                      {/* Progress Bar overlay */}
                      {config.showProgress && task.progress !== undefined && (
                        <div className="absolute bottom-1.5 left-4 right-4 h-1 bg-black/10 dark:bg-white/20 rounded-full overflow-hidden">
                          <div className="h-full bg-white/60" style={{ width: `${task.progress}%` }} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
