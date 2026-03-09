import * as React from 'react';
import { cn } from './utils';

export interface QRCodeProps {
  value: string;
  size?: number;
  level?: 'L' | 'M' | 'Q' | 'H';
  bgColor?: string;
  fgColor?: string;
  icon?: string;
  iconSize?: number;
  bordered?: boolean;
  errorLevel?: 'L' | 'M' | 'Q' | 'H';
  status?: 'active' | 'expired' | 'loading';
  onRefresh?: () => void;
  className?: string;
}

export function QRCode({
  value,
  size = 160,
  level = 'M',
  bgColor = '#ffffff',
  fgColor = '#000000',
  icon,
  iconSize = 40,
  bordered = true,
  status = 'active',
  onRefresh,
  className
}: QRCodeProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (status !== 'active' || !value) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Simple QR code generation (you'd use a library like qrcode in production)
    // This is a placeholder implementation
    canvas.width = size;
    canvas.height = size;

    // Fill background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);

    // Draw simple pattern (replace with actual QR generation)
    ctx.fillStyle = fgColor;
    const moduleSize = size / 25;
    
    // Simple pattern for demonstration
    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        if (Math.random() > 0.5) {
          ctx.fillRect(i * moduleSize, j * moduleSize, moduleSize, moduleSize);
        }
      }
    }

    // Draw icon if provided
    if (icon) {
      const img = new Image();
      img.onload = () => {
        const iconX = (size - iconSize) / 2;
        const iconY = (size - iconSize) / 2;
        
        // White background for icon
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(iconX - 4, iconY - 4, iconSize + 8, iconSize + 8);
        
        ctx.drawImage(img, iconX, iconY, iconSize, iconSize);
      };
      img.src = icon;
    }
  }, [value, size, level, bgColor, fgColor, icon, iconSize, status]);

  if (status === 'loading') {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-gray-100 dark:bg-gray-800',
          bordered && 'border-8 border-white dark:border-gray-900',
          className
        )}
        style={{ width: size, height: size }}
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (status === 'expired') {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-2 bg-gray-50 dark:bg-gray-800',
          bordered && 'border-8 border-white dark:border-gray-900',
          className
        )}
        style={{ width: size, height: size }}
      >
        <p className="text-sm text-muted-foreground">Código expirado</p>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="text-sm text-primary hover:underline"
          >
            Renovar código
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={cn('inline-block', className)}>
      <canvas
        ref={canvasRef}
        className={cn(
          'block',
          bordered && 'border-8 border-white dark:border-gray-900'
        )}
      />
    </div>
  );
}

// Note: In production, you should use a proper QR code library like:
// import QRCodeLib from 'qrcode'
// and generate the QR code properly with error correction levels