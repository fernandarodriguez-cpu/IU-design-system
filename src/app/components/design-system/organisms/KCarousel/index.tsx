import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../../../../imports/utils';

export interface KCarouselProps {
  children: React.ReactNode[];
  autoplay?: boolean;
  autoplayDelay?: number;
  dots?: boolean;
  arrows?: boolean;
  loop?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * KCarousel — Carrusel de contenido premium (Headless v4)
 * Utiliza Embla Carousel para un deslizamiento fluido y nativo, con soporte para autoplay y navegación.
 */
export function KCarousel({
  children,
  autoplay = false,
  autoplayDelay = 3000,
  dots = true,
  arrows = true,
  loop = true,
  className,
  style,
}: KCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop, align: 'start' }, 
    autoplay ? [Autoplay({ delay: autoplayDelay, stopOnInteraction: false })] : []
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div 
      className={cn("relative group overflow-hidden rounded-xl bg-[var(--khor-neutral-50)]", className)} 
      style={style}
    >
      {/* Contenedor del Carrusel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex backface-hidden touch-pan-y">
          {React.Children.map(children, (child, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 relative">
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Flechas de Navegación */}
      {arrows && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm border border-[var(--khor-neutral-200)] rounded-full shadow-lg text-[var(--khor-neutral-800)] hover:bg-white hover:text-[var(--khor-primary)] transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm border border-[var(--khor-neutral-200)] rounded-full shadow-lg text-[var(--khor-neutral-800)] hover:bg-white hover:text-[var(--khor-primary)] transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Indicadores (Dots) */}
      {dots && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === selectedIndex 
                  ? "w-6 bg-[var(--khor-primary)] shadow-[0_0_8px_rgba(var(--khor-primary-rgb),0.5)]" 
                  : "bg-[var(--khor-neutral-300)] hover:bg-[var(--khor-neutral-400)]"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default KCarousel;
