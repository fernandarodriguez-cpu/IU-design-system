import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from './utils';

export interface StepItem {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  status?: 'wait' | 'process' | 'finish' | 'error';
}

export interface StepsProps {
  current?: number;
  onChange?: (current: number) => void;
  direction?: 'horizontal' | 'vertical';
  size?: 'small' | 'middle' | 'large';
  status?: 'wait' | 'process' | 'finish' | 'error';
  items: StepItem[];
  className?: string;
}

export const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  (
    {
      current = 0,
      onChange,
      direction = 'horizontal',
      size = 'middle',
      status = 'process',
      items,
      className,
      ...props
    },
    ref
  ) => {
    const handleStepClick = (index: number) => {
      const step = items[index];
      if (step.disabled) return;
      onChange?.(index);
    };

    const getStepStatus = (index: number): 'wait' | 'process' | 'finish' | 'error' => {
      const step = items[index];
      
      // Use explicit step status if provided
      if (step.status) return step.status;
      
      // Otherwise determine based on current
      if (index < current) return 'finish';
      if (index === current) return status;
      return 'wait';
    };

    const isHorizontal = direction === 'horizontal';
    const sizeMap = {
      small: 24,
      middle: 32,
      large: 40,
    };
    const iconSize = sizeMap[size];

    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          isHorizontal ? 'flex-row items-start' : 'flex-col',
          className
        )}
        {...props}
      >
        {items.map((step, index) => {
          const stepStatus = getStepStatus(index);
          const isLast = index === items.length - 1;
          const isClickable = onChange && !step.disabled;

          return (
            <div
              key={index}
              className={cn(
                'flex',
                isHorizontal ? 'flex-col items-center flex-1' : 'flex-row',
                isClickable && 'cursor-pointer'
              )}
              onClick={() => isClickable && handleStepClick(index)}
            >
              {/* Step content wrapper */}
              <div className={cn('flex', isHorizontal ? 'flex-col items-center w-full' : 'flex-row items-start')}>
                {/* Icon and connector */}
                <div className={cn('flex', isHorizontal ? 'flex-col items-center' : 'flex-col')}>
                  {/* Step icon */}
                  <StepIcon
                    index={index}
                    status={stepStatus}
                    icon={step.icon}
                    size={iconSize}
                  />

                  {/* Connector line */}
                  {!isLast && (
                    <div
                      className={cn(
                        'bg-gray-200',
                        isHorizontal ? 'h-0.5 w-full flex-1' : 'w-0.5 h-full min-h-[48px] ml-4',
                        stepStatus === 'finish' && 'bg-primary'
                      )}
                      style={isHorizontal ? { marginTop: '16px', marginBottom: '16px' } : undefined}
                    />
                  )}
                </div>

                {/* Step content */}
                <div
                  className={cn(
                    'flex flex-col',
                    isHorizontal ? 'items-center text-center mt-2' : 'ml-4 flex-1'
                  )}
                >
                  <div
                    className={cn(
                      'font-medium transition-colors',
                      stepStatus === 'process' && 'text-primary',
                      stepStatus === 'finish' && 'text-foreground',
                      stepStatus === 'wait' && 'text-muted-foreground',
                      stepStatus === 'error' && 'text-red-500',
                      isSmall ? 'text-sm' : 'text-base'
                    )}
                  >
                    {step.title}
                  </div>
                  {step.description && (
                    <div
                      className={cn(
                        'text-muted-foreground mt-1',
                        isSmall ? 'text-xs' : 'text-sm'
                      )}
                    >
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

Steps.displayName = 'Steps';

interface StepIconProps {
  index: number;
  status: 'wait' | 'process' | 'finish' | 'error';
  icon?: React.ReactNode;
  size: number;
}

const StepIcon: React.FC<StepIconProps> = ({ index, status, icon, size }) => {
  const baseClasses = cn(
    'flex items-center justify-center rounded-full border-2 transition-all',
    'font-semibold'
  );

  const sizeStyles = {
    width: size,
    height: size,
    fontSize: size * 0.5,
  };

  if (status === 'finish') {
    return (
      <div
        className={cn(baseClasses, 'bg-primary border-primary text-white')}
        style={sizeStyles}
      >
        {icon || <Check className="w-4 h-4" />}
      </div>
    );
  }

  if (status === 'process') {
    return (
      <div
        className={cn(baseClasses, 'bg-primary border-primary text-white')}
        style={sizeStyles}
      >
        {icon || index + 1}
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div
        className={cn(baseClasses, 'bg-red-500 border-red-500 text-white')}
        style={sizeStyles}
      >
        {icon || '!'}
      </div>
    );
  }

  // wait status
  return (
    <div
      className={cn(baseClasses, 'bg-card border-border text-muted-foreground')}
      style={sizeStyles}
    >
      {icon || index + 1}
    </div>
  );
};