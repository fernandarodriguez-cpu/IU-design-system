/**
 * ╔═══════════════════════════════════════════╗
 * ║  KHOR GANTT SHOWCASE — Prototype           ║
 * ║  Configurable Agenda & Timeline View       ║
 * ╚═══════════════════════════════════════════╝
 */
import React, { useState, useCallback } from 'react';
import { addMinutes, addHours, startOfDay } from 'date-fns';
import { Settings2, Zap, Layout, Calendar, Layers, Lock, Unlock } from 'lucide-react';
import { KGantt, KGanttTask } from '../components/design-system/organisms/KGantt';
import { KButton, KText, KBadge, KSwitch } from '../components/design-system/atoms';

const INITIAL_TASKS: KGanttTask[] = [
  {
    id: '1',
    label: 'Diseño de UI Pro',
    subtitle: 'Dan Steinhoff',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dani',
    start: addHours(startOfDay(new Date()), 9),
    end: addHours(startOfDay(new Date()), 11),
    progress: 80,
    color: 'primary',
  },
  {
    id: '2',
    label: 'Revisión de Arquitectura',
    subtitle: 'AI Agent',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=AI',
    start: addHours(startOfDay(new Date()), 11),
    end: addHours(startOfDay(new Date()), 13),
    progress: 30,
    color: 'accent',
    dependencies: ['1'],
  },
  {
    id: '3',
    label: 'Despliegue de Tokens',
    subtitle: 'Infra Team',
    start: addHours(startOfDay(new Date()), 14),
    end: addHours(startOfDay(new Date()), 17),
    progress: 10,
    color: 'success',
    dependencies: ['2'],
  },
  {
    id: '4',
    label: 'Auditoría de Accesibilidad',
    subtitle: 'Khor Guardian',
    start: addHours(startOfDay(new Date()), 12),
    end: addHours(startOfDay(new Date()), 15),
    color: 'warning',
    dependencies: ['1'],
  },
];

export function GanttShowcase() {
  const [tasks, setTasks] = useState<KGanttTask[]>(INITIAL_TASKS);
  const [interval, setIntervalVal] = useState(15);
  const [rowHeight, setRowHeight] = useState(72);
  const [showProgress, setShowProgress] = useState(true);
  const [showDependencies, setShowDependencies] = useState(true);
  const [isLocked, setIsLocked] = useState(false);

  const handleTaskChange = useCallback((taskId: string, updates: Partial<KGanttTask>) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, ...updates } : t));
  }, []);

  return (
    <div className="py-12 space-y-12 max-w-[1600px] mx-auto px-6">
      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div className="space-y-4">
          <KBadge label="Advanced Organism" color="purple" />
          <KText variant="display-1" className="font-black">KGantt <span className="text-khor-primary italic">Pro</span></KText>
          <KText variant="body-lg" className="max-w-2xl opacity-60">
            Interactúa con la línea de tiempo: arrastra para mover, estira para redimensionar y observa las dependencias dinámicas.
          </KText>
        </div>

        <div className="flex gap-2">
          <KButton
            variant={isLocked ? 'danger' : 'primary'}
            icon={isLocked ? <Lock size={18} /> : <Unlock size={18} />}
            onClick={() => setIsLocked(!isLocked)}
          >
            {isLocked ? 'Modo Lectura' : 'Modo Edición'}
          </KButton>
          <KButton variant="primary" icon={<Zap size={18} />}>Nueva Tarea</KButton>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* CONFIG PANEL */}
        <aside className="col-span-3 space-y-6 khor-glass p-8 rounded-[2.5rem] border border-khor-border-default h-fit sticky top-24">
          <div className="flex items-center gap-3 mb-4">
            <Settings2 className="text-khor-primary" />
            <KText variant="h4" className="font-bold text-khor-primary">Control Panel</KText>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <KText variant="small" className="font-bold opacity-50 uppercase tracking-widest">Resolución Temporal</KText>
              <div className="grid grid-cols-3 gap-2">
                {[5, 10, 15, 30, 60].map(val => (
                  <KButton
                    key={val}
                    variant={interval === val ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setIntervalVal(val)}
                  >
                    {val}m
                  </KButton>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <KText variant="small" className="font-bold opacity-50 uppercase tracking-widest">Visualización</KText>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                  <KText variant="small">Mostrar Progreso</KText>
                  <KSwitch checked={showProgress} onCheckedChange={setShowProgress} />
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                  <KText variant="small">Mostrar Dependencias</KText>
                  <KSwitch checked={showDependencies} onCheckedChange={setShowDependencies} />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <KText variant="small" className="font-bold opacity-50 uppercase tracking-widest">Densidad</KText>
              <div className="px-2">
                <input
                  type="range" min={56} max={100} value={rowHeight}
                  onChange={(e) => setRowHeight(Number(e.target.value))}
                  className="w-full accent-khor-primary"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN DISPLAY */}
        <main className="col-span-9 space-y-6">
          <div className="h-[700px] shadow-2xl rounded-3xl overflow-hidden border border-khor-border-default">
            <KGantt
              tasks={tasks}
              initialInterval={interval}
              onTaskChange={handleTaskChange}
              config={{
                rowHeight,
                showProgress,
                showDependencies,
                enableDrag: !isLocked,
                enableResize: !isLocked
              }}
            />
          </div>

          <div className="flex gap-4 items-center p-6 khor-glass rounded-3xl border border-khor-border-default">
            <div className="p-3 rounded-full bg-khor-primary/10 text-khor-primary">
              <Zap size={24} />
            </div>
            <div>
              <KText variant="body-md" className="font-bold text-khor-primary">Motor Agéntico Activo</KText>
              <KText variant="small" className="opacity-50">
                Cualquier cambio en la línea de tiempo se sincroniza instantáneamente con el estado de la aplicación.
              </KText>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
