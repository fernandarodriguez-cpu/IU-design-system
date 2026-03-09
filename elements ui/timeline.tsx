import * as React from 'react';
import { Clock } from 'lucide-react';
import { cn } from './utils';

export interface TimelineItem {
  children: React.ReactNode;
  color?: string;
  dot?: React.ReactNode;
  label?: React.ReactNode;
  className?: string;
}

export interface TimelineProps {
  mode?: 'left' | 'alternate' | 'right';
  pending?: boolean | React.ReactNode;
  reverse?: boolean;
  items: TimelineItem[];
  className?: string;
}

export const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  (
    {
      mode = 'left',
      pending = false,
      reverse = false,
      items,
      className,
      ...props
    },
    ref
  ) => {
    const displayItems = reverse ? [...items].reverse() : items;

    return (
      <div
        ref={ref}
        className={cn('relative', className)}
        {...props}
      >
        {displayItems.map((item, index) => {
          const isAlternate = mode === 'alternate';
          const isRight = mode === 'right' || (isAlternate && index % 2 === 1);
          const isLast = index === displayItems.length - 1;

          return (
            <TimelineItemComponent
              key={index}
              item={item}
              isLast={isLast && !pending}
              isRight={isRight}
              mode={mode}
            />
          );
        })}

        {/* Pending item */}
        {pending && (
          <TimelineItemComponent
            item={{
              children: typeof pending === 'boolean' ? 'Loading...' : pending,
              color: '#94a3b8',
              dot: <Clock className="w-3 h-3" />,
            }}
            isLast={true}
            isPending={true}
            isRight={mode === 'right'}
            mode={mode}
          />
        )}
      </div>
    );
  }
);

Timeline.displayName = 'Timeline';

interface TimelineItemComponentProps {
  item: TimelineItem;
  isLast: boolean;
  isRight?: boolean;
  isPending?: boolean;
  mode: 'left' | 'alternate' | 'right';
}

const TimelineItemComponent: React.FC<TimelineItemComponentProps> = ({
  item,
  isLast,
  isRight = false,
  isPending = false,
  mode,
}) => {
  const color = item.color || '#7428F5';
  const isAlternate = mode === 'alternate';

  return (
    <div
      className={cn(
        'relative flex gap-4 pb-8',
        isLast && 'pb-0',
        isRight && 'flex-row-reverse',
        item.className
      )}
    >
      {/* Label (for alternate mode) */}
      {isAlternate && (
        <div className={cn('flex-1', isRight ? 'text-right' : 'text-left')}>
          {isRight && item.label && (
            <div className="text-sm text-gray-500">{item.label}</div>
          )}
        </div>
      )}

      {/* Timeline line and dot */}
      <div className="relative flex flex-col items-center">
        {/* Dot */}
        <div
          className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 bg-white"
          style={{ borderColor: color }}
        >
          {item.dot ? (
            <div style={{ color }}>{item.dot}</div>
          ) : (
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color }}
            />
          )}
        </div>

        {/* Vertical line */}
        {!isLast && (
          <div
            className={cn(
              'absolute top-8 w-0.5 h-full',
              isPending ? 'bg-gray-300' : 'bg-gray-200'
            )}
          />
        )}
      </div>

      {/* Content */}
      <div className={cn('flex-1', isAlternate && 'flex-1')}>
        {/* Label for left/right mode or alternate left side */}
        {!isAlternate && item.label && (
          <div className="text-sm text-gray-500 mb-1">{item.label}</div>
        )}
        {isAlternate && !isRight && item.label && (
          <div className="text-sm text-gray-500 mb-1">{item.label}</div>
        )}

        {/* Content */}
        <div className={cn('text-foreground', isPending && 'text-muted-foreground')}>
          {item.children}
        </div>
      </div>

      {/* Empty space for alternate mode alignment */}
      {isAlternate && (
        <div className="flex-1">
          {!isRight && item.label && (
            <div className="text-sm text-gray-500">{item.label}</div>
          )}
        </div>
      )}
    </div>
  );
};

// Preset colors
export const TimelineColors = {
  primary: '#7428F5',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  gray: '#6b7280',
} as const;