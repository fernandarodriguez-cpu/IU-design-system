import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../../../../imports/utils';
import { KTooltip } from '../../molecules/KTooltip/index';

export interface KRateProps {
  count?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  allowHalf?: boolean;
  character?: React.ReactNode | ((props: { index: number }) => React.ReactNode);
  tooltips?: string[];
  className?: string;
  style?: React.CSSProperties;
}

/**
 * KRate — Sistema de puntuación por estrellas (Headless v4)
 * Paridad con AntD v5: Soporta allowHalf, tooltips y character function/node.
 */
export function KRate({
  count = 5,
  value,
  defaultValue = 0,
  onChange,
  disabled,
  allowHalf = false,
  character,
  tooltips = [],
  className,
  style,
}: KRateProps) {
  const [internalValue, setInternalValue] = useState(value !== undefined ? value : defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  useEffect(() => {
    if (value !== undefined) setInternalValue(value);
  }, [value]);

  const activeValue = hoverValue !== null ? hoverValue : internalValue;

  const handleClick = (val: number) => {
    if (disabled) return;
    if (value === undefined) setInternalValue(val);
    onChange?.(val);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    if (disabled) return;
    if (allowHalf) {
      const target = e.currentTarget;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      if (x < rect.width / 2) {
        setHoverValue(index - 0.5);
      } else {
        setHoverValue(index);
      }
    } else {
      setHoverValue(index);
    }
  };

  const stars = Array.from({ length: count }, (_, i) => i + 1);

  return (
    <div 
      className={cn("flex items-center gap-1 font-primary", disabled && "cursor-not-allowed opacity-70", className)} 
      style={style}
      onMouseLeave={() => !disabled && setHoverValue(null)}
    >
      {stars.map((star) => {
        const isFullActive = star <= activeValue;
        const isHalfActive = allowHalf && Math.ceil(activeValue) === star && activeValue % 1 !== 0;
        const isActive = isFullActive || isHalfActive;

        // Tooltip logic needs to use Math.ceil to point to the correct text 
        const tooltipVal = hoverValue !== null ? Math.ceil(hoverValue) : star;
        const tooltipText = tooltips.length > 0 ? tooltips[tooltipVal - 1] : undefined;
        
        const renderChar = () => {
          const charContent = typeof character === 'function' ? character({ index: star - 1 }) : character;

          if (charContent !== undefined) {
             return (
               <div className={cn("relative inline-block", isActive ? "text-khor-accent" : "text-khor-neutral-200")}>
                  {/* Background content */}
                  <span className={cn("opacity-30", !isActive && "opacity-100")}>{charContent}</span>
                  {/* Foreground active content */}
                  {(isFullActive || isHalfActive) && (
                    <span className="absolute top-0 left-0 overflow-hidden text-khor-accent" style={{ width: isHalfActive ? '50%' : '100%', whiteSpace: 'nowrap' }}>
                      {charContent}
                    </span>
                  )}
               </div>
             );
          }

          return (
            <div className="relative flex items-center justify-center">
               <Star className="w-5 h-5 fill-transparent text-khor-neutral-200" />
               {(isFullActive || isHalfActive) && (
                 <div className="absolute top-0 left-0 overflow-hidden" style={{ width: isHalfActive ? '50%' : '100%' }}>
                   <Star className="w-5 h-5 fill-current text-khor-accent" />
                 </div>
               )}
            </div>
          );
        };

        const Button = (
          <button
            key={star}
            type="button"
            disabled={disabled}
            onMouseMove={(e) => handleMouseMove(e, star)}
            onClick={() => handleClick(hoverValue !== null ? hoverValue : star)}
            className={cn(
              "p-0.5 transition-all focus:outline-none relative",
              !disabled && "hover:scale-110 active:scale-95",
              isActive ? "animate-in zoom-in-50 duration-200" : ""
            )}
          >
            {renderChar()}
          </button>
        );

        if (tooltipText) {
          return (
            <KTooltip key={star} title={tooltipText} placement="top">
              {Button}
            </KTooltip>
          );
        }

        return Button;
      })}
    </div>
  );
}

export default KRate;
