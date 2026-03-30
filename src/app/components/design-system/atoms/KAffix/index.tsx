import React, { useState, useRef, useEffect } from 'react';

export interface KAffixProps {
  offsetTop?: number;
  offsetBottom?: number;
  children: React.ReactNode;
  className?: string;
}

/**
 * KAffix: Fija un elemento en una posición específica de la pantalla (Sticky).
 * Refinado para evitar fugas de props al DOM (variant, size, fullWidth).
 */
export function KAffix({ 
  offsetTop, offsetBottom, children, className, 
  variant, size, fullWidth 
}: KAffixProps & { variant?: any, size?: any, fullWidth?: any }) {
  const [affixed, setAffixed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current || !placeholderRef.current) return;
      const rect = placeholderRef.current.getBoundingClientRect();
      if (offsetTop !== undefined) setAffixed(rect.top <= offsetTop);
      else if (offsetBottom !== undefined) setAffixed(window.innerHeight - rect.bottom <= offsetBottom);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [offsetTop, offsetBottom]);

  return (
    <>
      <div 
        ref={placeholderRef} 
        style={affixed ? { height: ref.current?.offsetHeight } : undefined} 
      />
      <div 
        ref={ref} 
        className={className} 
        style={affixed ? {
          position: 'fixed', 
          top: offsetTop, 
          bottom: offsetBottom, 
          zIndex: 50,
          left: placeholderRef.current?.getBoundingClientRect().left, 
          width: placeholderRef.current?.offsetWidth,
        } : undefined}
      >
        {children}
      </div>
    </>
  );
}

export default KAffix;
