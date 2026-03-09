import * as React from 'react';
import { cn } from './utils';
import { ArrowUp, MessageCircle, Phone, Mail, Plus, X } from 'lucide-react';
import { Button } from './button';

export interface FloatButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  description?: string;
  tooltip?: string;
  shape?: 'circle' | 'square';
  type?: 'default' | 'primary';
  href?: string;
  target?: string;
}

export function FloatButton({
  icon,
  description,
  tooltip,
  shape = 'circle',
  type = 'default',
  href,
  target,
  className,
  onClick,
  ...props
}: FloatButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (href) {
      window.open(href, target);
    }
    onClick?.(e);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title={tooltip}
      className={cn(
        'group flex flex-col items-center justify-center gap-1 shadow-lg transition-all hover:shadow-xl',
        'bg-card border border-border',
        'hover:scale-110 active:scale-95',
        shape === 'circle' && 'rounded-full h-12 w-12',
        shape === 'square' && 'rounded-lg p-3',
        type === 'primary' && 'bg-primary text-primary-foreground border-primary',
        description && 'h-auto w-auto px-3 py-2',
        className
      )}
      {...props}
    >
      <span className="flex-shrink-0">{icon}</span>
      {description && (
        <span className="text-xs whitespace-nowrap">{description}</span>
      )}
    </button>
  );
}

// BackTop Component
export interface BackTopProps {
  visibilityHeight?: number;
  duration?: number;
  target?: () => HTMLElement | Window;
  onClick?: () => void;
  className?: string;
}

export function BackTop({
  visibilityHeight = 400,
  duration = 450,
  target,
  onClick,
  className
}: BackTopProps) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = target
        ? (target() as HTMLElement).scrollTop
        : window.pageYOffset || document.documentElement.scrollTop;
      
      setVisible(scrollTop > visibilityHeight);
    };

    const scrollElement = target ? target() : window;
    scrollElement.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, [target, visibilityHeight]);

  const scrollToTop = () => {
    const scrollElement = target ? (target() as HTMLElement) : window;
    
    if (scrollElement instanceof Window) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      scrollElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    onClick?.();
  };

  if (!visible) return null;

  return (
    <FloatButton
      icon={<ArrowUp className="h-5 w-5" />}
      onClick={scrollToTop}
      tooltip="Volver arriba"
      type="primary"
      className={className}
    />
  );
}

// FloatButton Group
export interface FloatButtonGroupProps {
  trigger?: 'click' | 'hover';
  icon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function FloatButtonGroup({
  trigger = 'click',
  icon = <Plus className="h-5 w-5" />,
  closeIcon = <X className="h-5 w-5" />,
  children,
  className
}: FloatButtonGroupProps) {
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    if (trigger === 'click') {
      setOpen(!open);
    }
  };

  return (
    <div
      className={cn('relative', className)}
      onMouseEnter={() => trigger === 'hover' && setOpen(true)}
      onMouseLeave={() => trigger === 'hover' && setOpen(false)}
    >
      {/* Children */}
      {open && (
        <div className="absolute bottom-16 right-0 flex flex-col gap-2 animate-in slide-in-from-bottom-4">
          {children}
        </div>
      )}

      {/* Main Button */}
      <FloatButton
        icon={open ? closeIcon : icon}
        onClick={handleToggle}
        type="primary"
      />
    </div>
  );
}

// Preset FloatButtons
export function FloatButtonMessage(props: Omit<FloatButtonProps, 'icon'>) {
  return <FloatButton icon={<MessageCircle className="h-5 w-5" />} {...props} />;
}

export function FloatButtonPhone(props: Omit<FloatButtonProps, 'icon'>) {
  return <FloatButton icon={<Phone className="h-5 w-5" />} {...props} />;
}

export function FloatButtonMail(props: Omit<FloatButtonProps, 'icon'>) {
  return <FloatButton icon={<Mail className="h-5 w-5" />} {...props} />;
}