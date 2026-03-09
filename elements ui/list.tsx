import * as React from 'react';
import { cn } from './utils';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Button } from './button';
import { Skeleton } from './skeleton';

export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  grid?: boolean;
  gridCols?: number;
  bordered?: boolean;
  split?: boolean;
  size?: 'small' | 'middle' | 'large';
}

export function List({
  children,
  grid = false,
  gridCols = 3,
  bordered = false,
  split = true,
  size = 'middle',
  className,
  ...props
}: ListProps) {
  const sizeClasses = {
    small: 'gap-2',
    middle: 'gap-3',
    large: 'gap-4'
  };

  return (
    <div
      className={cn(
        'w-full',
        grid && `grid gap-4`,
        grid && `grid-cols-${gridCols}`,
        !grid && 'flex flex-col',
        !grid && sizeClasses[size],
        bordered && 'border rounded-lg',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  actions?: React.ReactNode;
  extra?: React.ReactNode;
}

export function ListItem({
  children,
  actions,
  extra,
  className,
  ...props
}: ListItemProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 py-3 px-4',
        'hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors',
        'border-b last:border-b-0',
        className
      )}
      {...props}
    >
      <div className="flex-1 flex items-center gap-3">
        {children}
      </div>
      {extra && <div className="flex-shrink-0">{extra}</div>}
      {actions && (
        <div className="flex-shrink-0 flex items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}

export interface ListItemMetaProps {
  avatar?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
}

export function ListItemMeta({
  avatar,
  title,
  description
}: ListItemMetaProps) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      {avatar && <div className="flex-shrink-0">{avatar}</div>}
      <div className="flex-1 min-w-0">
        {title && (
          <div className="font-medium text-gray-900 dark:text-gray-100 truncate">
            {title}
          </div>
        )}
        {description && (
          <div className="text-sm text-muted-foreground truncate">
            {description}
          </div>
        )}
      </div>
    </div>
  );
}

export interface InfiniteListProps extends ListProps {
  loading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  loadingText?: string;
}

export function InfiniteList({
  children,
  loading = false,
  hasMore = false,
  onLoadMore,
  loadingText = 'Cargando más...',
  ...props
}: InfiniteListProps) {
  const observerTarget = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          onLoadMore?.();
        }
      },
      { threshold: 1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading, onLoadMore]);

  return (
    <div>
      <List {...props}>{children}</List>
      {(loading || hasMore) && (
        <div ref={observerTarget} className="py-4 text-center">
          {loading ? (
            <div className="flex flex-col gap-2 items-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <p className="text-sm text-gray-500">{loadingText}</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export interface ListSkeletonProps {
  count?: number;
  avatar?: boolean;
  actions?: boolean;
}

export function ListSkeleton({
  count = 3,
  avatar = false,
  actions = false
}: ListSkeletonProps) {
  return (
    <List>
      {Array.from({ length: count }).map((_, index) => (
        <ListItem key={index}>
          <div className="flex items-center gap-3 flex-1">
            {avatar && <Skeleton className="h-10 w-10 rounded-full" />}
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
          {actions && (
            <div className="flex gap-2">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
            </div>
          )}
        </ListItem>
      ))}
    </List>
  );
}

// Grid Item for Grid Layout
export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GridItem({ children, className, ...props }: GridItemProps) {
  return (
    <div
      className={cn(
        'border rounded-lg p-4',
        'hover:shadow-md transition-shadow',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}