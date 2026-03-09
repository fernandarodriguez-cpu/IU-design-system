import * as React from 'react';
import { X, ZoomIn, ZoomOut, RotateCw, Download, Maximize2 } from 'lucide-react';
import { cn } from './utils';
import { Dialog, DialogContent, DialogTitle } from './dialog';
import { Button } from './button';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  preview?: boolean;
  placeholder?: React.ReactNode;
  wrapperClassName?: string;
  onError?: () => void;
}

export function Image({
  src,
  alt,
  fallback = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23f0f0f0"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%23999"%3EError%3C/text%3E%3C/svg%3E',
  preview = true,
  placeholder,
  wrapperClassName,
  className,
  onError,
  ...props
}: ImageProps) {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [scale, setScale] = React.useState(1);
  const [rotation, setRotation] = React.useState(0);

  const handleError = () => {
    setError(true);
    setLoading(false);
    onError?.();
  };

  const handleLoad = () => {
    setLoading(false);
  };

  const handlePreview = () => {
    if (preview && !error) {
      setPreviewOpen(true);
    }
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.5, 0.5));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = alt || 'image';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const resetTransform = () => {
    setScale(1);
    setRotation(0);
  };

  React.useEffect(() => {
    if (previewOpen) {
      resetTransform();
    }
  }, [previewOpen]);

  const displaySrc = error ? fallback : src;

  return (
    <>
      <div className={cn('relative inline-block', wrapperClassName)}>
        {loading && !error && placeholder && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            {placeholder}
          </div>
        )}
        <img
          src={displaySrc}
          alt={alt}
          className={cn(
            'block',
            preview && !error && 'cursor-pointer hover:opacity-80 transition-opacity',
            loading && 'opacity-0',
            className
          )}
          onError={handleError}
          onLoad={handleLoad}
          onClick={handlePreview}
          {...props}
        />
      </div>

      {preview && (
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-hidden bg-black/95">
            <VisuallyHidden>
              <DialogTitle>Vista previa de imagen</DialogTitle>
            </VisuallyHidden>
            <div className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
              <img
                src={displaySrc}
                alt={alt}
                className="max-w-full max-h-full object-contain transition-transform duration-200"
                style={{
                  transform: `scale(${scale}) rotate(${rotation}deg)`,
                }}
              />

              {/* Toolbar */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/80 rounded-lg p-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={handleZoomOut}
                  disabled={scale <= 0.5}
                >
                  <ZoomOut className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={handleZoomIn}
                  disabled={scale >= 3}
                >
                  <ZoomIn className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={handleRotate}
                >
                  <RotateCw className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={resetTransform}
                >
                  <Maximize2 className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={handleDownload}
                >
                  <Download className="h-5 w-5" />
                </Button>
              </div>

              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20"
                onClick={() => setPreviewOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>

              {/* Scale indicator */}
              <div className="absolute top-4 left-4 bg-black/80 rounded px-3 py-1 text-white text-sm">
                {Math.round(scale * 100)}%
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export interface ImageGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function ImageGroup({ children, className }: ImageGroupProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [scale, setScale] = React.useState(1);
  const [rotation, setRotation] = React.useState(0);

  const images = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === Image
  );

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setPreviewOpen(true);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setScale(1);
    setRotation(0);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setScale(1);
    setRotation(0);
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.5, 0.5));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const resetTransform = () => {
    setScale(1);
    setRotation(0);
  };

  const currentImage = images[currentIndex] as React.ReactElement<ImageProps>;

  return (
    <>
      <div className={cn('flex flex-wrap gap-2', className)}>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child) && child.type === Image) {
            return React.cloneElement(child as React.ReactElement<ImageProps>, {
              preview: false,
              onClick: () => handleImageClick(index),
              className: cn(child.props.className, 'cursor-pointer'),
            });
          }
          return child;
        })}
      </div>

      {currentImage && (
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-hidden bg-black/95">
            <VisuallyHidden>
              <DialogTitle>Galería de imágenes - {currentIndex + 1} de {images.length}</DialogTitle>
            </VisuallyHidden>
            <div className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
              <img
                src={currentImage.props.src}
                alt={currentImage.props.alt}
                className="max-w-full max-h-full object-contain transition-transform duration-200"
                style={{
                  transform: `scale(${scale}) rotate(${rotation}deg)`,
                }}
              />

              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                    onClick={handlePrevious}
                  >
                    ←
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                    onClick={handleNext}
                  >
                    →
                  </Button>
                </>
              )}

              {/* Toolbar */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/80 rounded-lg p-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={handleZoomOut}
                  disabled={scale <= 0.5}
                >
                  <ZoomOut className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={handleZoomIn}
                  disabled={scale >= 3}
                >
                  <ZoomIn className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={handleRotate}
                >
                  <RotateCw className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={resetTransform}
                >
                  <Maximize2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20"
                onClick={() => setPreviewOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>

              {/* Counter */}
              <div className="absolute top-4 left-4 bg-black/80 rounded px-3 py-1 text-white text-sm">
                {currentIndex + 1} / {images.length}
              </div>

              {/* Scale indicator */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/80 rounded px-3 py-1 text-white text-sm">
                {Math.round(scale * 100)}%
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
