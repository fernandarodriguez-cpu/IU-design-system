import * as React from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from './utils';
import { Button } from './button';

export type NotificationPlacement =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'bottom-center';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface NotificationConfig {
  key?: string;
  type?: NotificationType;
  title: string;
  description?: string;
  duration?: number;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void;
  placement?: NotificationPlacement;
}

interface NotificationItem extends NotificationConfig {
  id: string;
  createdAt: number;
}

const NotificationContext = React.createContext<{
  notifications: NotificationItem[];
  addNotification: (config: NotificationConfig) => string;
  removeNotification: (id: string) => void;
  updateNotification: (key: string, config: Partial<NotificationConfig>) => void;
  clearAll: () => void;
} | null>(null);

export function useNotification() {
  const context = React.useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
}

const typeIcons: Record<NotificationType, React.ReactNode> = {
  success: <CheckCircle className="h-5 w-5 text-green-500" />,
  error: <AlertCircle className="h-5 w-5 text-red-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
  warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
};

const placementClasses: Record<NotificationPlacement, string> = {
  'top-left': 'top-4 left-4',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
};

function NotificationItem({
  notification,
  onClose,
}: {
  notification: NotificationItem;
  onClose: () => void;
}) {
  const { type = 'info', title, description, icon, action } = notification;

  return (
    <div
      className={cn(
        'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-card shadow-lg ring-1 ring-black ring-opacity-5',
        'animate-in slide-in-from-top-5 fade-in duration-300'
      )}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">{icon || typeIcons[type]}</div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-foreground">
              {title}
            </p>
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {description}
              </p>
            )}
            {action && (
              <div className="mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    action.onClick();
                    onClose();
                  }}
                >
                  {action.label}
                </Button>
              </div>
            )}
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <button
              type="button"
              className="inline-flex rounded-md bg-card text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onClick={onClose}
              aria-label="Cerrar notificación"
            >
              <span className="sr-only">Cerrar</span>
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface NotificationProviderProps {
  children: React.ReactNode;
  maxCount?: number;
  defaultPlacement?: NotificationPlacement;
}

export function NotificationProvider({
  children,
  maxCount = 5,
  defaultPlacement = 'top-right',
}: NotificationProviderProps) {
  const [notifications, setNotifications] = React.useState<NotificationItem[]>([]);

  const addNotification = React.useCallback(
    (config: NotificationConfig): string => {
      const id = config.key || `notification-${Date.now()}-${Math.random()}`;
      const notification: NotificationItem = {
        ...config,
        id,
        createdAt: Date.now(),
        placement: config.placement || defaultPlacement,
      };

      setNotifications((prev) => {
        const newNotifications = [notification, ...prev];
        return newNotifications.slice(0, maxCount);
      });

      if (config.duration !== 0) {
        setTimeout(() => {
          removeNotification(id);
        }, config.duration || 4500);
      }

      return id;
    },
    [maxCount, defaultPlacement]
  );

  const removeNotification = React.useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const updateNotification = React.useCallback(
    (key: string, config: Partial<NotificationConfig>) => {
      setNotifications((prev) =>
        prev.map((n) =>
          n.key === key || n.id === key ? { ...n, ...config } : n
        )
      );
    },
    []
  );

  const clearAll = React.useCallback(() => {
    setNotifications([]);
  }, []);

  // Group notifications by placement
  const notificationsByPlacement = React.useMemo(() => {
    const groups: Record<NotificationPlacement, NotificationItem[]> = {
      'top-left': [],
      'top-right': [],
      'bottom-left': [],
      'bottom-right': [],
      'top-center': [],
      'bottom-center': [],
    };

    notifications.forEach((notification) => {
      const placement = notification.placement || defaultPlacement;
      groups[placement].push(notification);
    });

    return groups;
  }, [notifications, defaultPlacement]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        updateNotification,
        clearAll,
      }}
    >
      {children}
      {(Object.keys(notificationsByPlacement) as NotificationPlacement[]).map(
        (placement) => {
          const items = notificationsByPlacement[placement];
          if (items.length === 0) return null;

          return (
            <div
              key={placement}
              className={cn(
                'pointer-events-none fixed z-50 flex flex-col gap-2',
                placementClasses[placement]
              )}
            >
              {items.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onClose={() => {
                    removeNotification(notification.id);
                    notification.onClose?.();
                  }}
                />
              ))}
            </div>
          );
        }
      )}
    </NotificationContext.Provider>
  );
}

// Simplified notification API
export const notification = {
  success: (config: Omit<NotificationConfig, 'type'>) => {
    // This will be implemented via hook in components
    console.log('Success notification:', config);
  },
  error: (config: Omit<NotificationConfig, 'type'>) => {
    console.log('Error notification:', config);
  },
  info: (config: Omit<NotificationConfig, 'type'>) => {
    console.log('Info notification:', config);
  },
  warning: (config: Omit<NotificationConfig, 'type'>) => {
    console.log('Warning notification:', config);
  },
};