import * as React from 'react';
import { Star } from 'lucide-react';
import { cn } from './utils';

export interface RateProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  count?: number;
  allowHalf?: boolean;
  allowClear?: boolean;
  character?: React.ReactNode;
  disabled?: boolean;
  tooltips?: string[];
  size?: 'small' | 'middle' | 'large';
  className?: string;
}

export const Rate = React.forwardRef<HTMLDivElement, RateProps>(
  (
    {
      value: controlledValue,
      defaultValue = 0,
      onChange,
      count = 5,
      allowHalf = false,
      allowClear = true,
      character,
      disabled = false,
      tooltips = [],
      size = 'middle',
      className,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [hoverValue, setHoverValue] = React.useState<number | null>(null);

    const value = controlledValue !== undefined ? controlledValue : internalValue;

    const handleClick = (index: number, isHalf: boolean) => {
      if (disabled) return;

      const newValue = isHalf ? index + 0.5 : index + 1;
      
      // Allow clearing if clicking the same value
      const finalValue = allowClear && newValue === value ? 0 : newValue;

      if (controlledValue === undefined) {
        setInternalValue(finalValue);
      }
      onChange?.(finalValue);
    };

    const handleMouseEnter = (index: number, isHalf: boolean) => {
      if (disabled) return;
      setHoverValue(isHalf ? index + 0.5 : index + 1);
    };

    const handleMouseLeave = () => {
      setHoverValue(null);
    };

    const getStarFill = (index: number): 'full' | 'half' | 'empty' => {
      const displayValue = hoverValue !== null ? hoverValue : value;
      
      if (displayValue >= index + 1) return 'full';
      if (allowHalf && displayValue >= index + 0.5) return 'half';
      return 'empty';
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {Array.from({ length: count }).map((_, index) => {
          const fill = getStarFill(index);
          const tooltip = tooltips[index];

          return (
            <div
              key={index}
              className="relative cursor-pointer"
              title={tooltip}
            >
              {/* Full star container */}
              <div className="relative flex">
                {allowHalf ? (
                  <>
                    {/* Left half */}
                    <div
                      className="relative overflow-hidden"
                      style={{ width: '50%' }}
                      onClick={() => handleClick(index, true)}
                      onMouseEnter={() => handleMouseEnter(index, true)}
                    >
                      <StarIcon
                        character={character}
                        filled={fill === 'full' || fill === 'half'}
                        disabled={disabled}
                        size={size}
                      />
                    </div>
                    {/* Right half */}
                    <div
                      className="relative overflow-hidden"
                      style={{ width: '50%', marginLeft: '-50%' }}
                      onClick={() => handleClick(index, false)}
                      onMouseEnter={() => handleMouseEnter(index, false)}
                    >
                      <StarIcon
                        character={character}
                        filled={fill === 'full'}
                        disabled={disabled}
                        size={size}
                        style={{ marginLeft: '-100%' }}
                      />
                    </div>
                  </>
                ) : (
                  <div
                    onClick={() => handleClick(index, false)}
                    onMouseEnter={() => handleMouseEnter(index, false)}
                  >
                    <StarIcon
                      character={character}
                      filled={fill === 'full'}
                      disabled={disabled}
                      size={size}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

Rate.displayName = 'Rate';

interface StarIconProps {
  character?: React.ReactNode;
  filled: boolean;
  disabled?: boolean;
  size?: 'small' | 'middle' | 'large';
  style?: React.CSSProperties;
}

const StarIcon: React.FC<StarIconProps> = ({ character, filled, disabled, size = 'middle', style }) => {
  const sizeMap = {
    small: { icon: 'w-4 h-4', char: 'text-base' },
    middle: { icon: 'w-5 h-5', char: 'text-xl' },
    large: { icon: 'w-6 h-6', char: 'text-2xl' },
  };

  if (character) {
    return (
      <span
        className={cn(
          sizeMap[size].char,
          'transition-colors',
          filled ? 'text-yellow-400' : 'text-gray-300',
          !disabled && 'hover:scale-110'
        )}
        style={style}
      >
        {character}
      </span>
    );
  }

  return (
    <Star
      className={cn(
        sizeMap[size].icon,
        'transition-all',
        filled ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-300',
        !disabled && 'hover:scale-110'
      )}
      style={style}
    />
  );
};
