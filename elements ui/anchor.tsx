import * as React from 'react';
import { cn } from './utils';

export interface AnchorLinkProps {
  href: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}

export interface AnchorProps {
  items?: AnchorLinkProps[];
  offsetTop?: number;
  targetOffset?: number;
  onChange?: (currentActiveLink: string) => void;
  children?: React.ReactNode;
  className?: string;
  affix?: boolean;
}

export function Anchor({
  items = [],
  offsetTop = 0,
  targetOffset,
  onChange,
  children,
  className,
  affix = true
}: AnchorProps) {
  const [activeLink, setActiveLink] = React.useState<string>('');

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + (targetOffset || window.innerHeight / 2);
      
      // Get all anchor targets
      const allLinks = items.map(item => item.href);
      let currentActive = '';

      for (const href of allLinks) {
        const element = document.querySelector(href);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          
          if (scrollPosition >= elementTop) {
            currentActive = href;
          }
        }
      }

      if (currentActive !== activeLink) {
        setActiveLink(currentActive);
        onChange?.(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [items, activeLink, targetOffset, onChange]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - offsetTop;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const renderLink = (item: AnchorLinkProps, level = 0) => {
    const isActive = activeLink === item.href;
    
    return (
      <div key={item.href} style={{ paddingLeft: level * 16 }}>
        <a
          href={item.href}
          onClick={(e) => handleClick(e, item.href)}
          className={cn(
            'block py-1 px-3 text-sm transition-colors border-l-2',
            isActive
              ? 'border-primary text-primary font-medium'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          )}
        >
          {item.title}
        </a>
        {item.children && (
          <div>
            {React.Children.map(item.children, (child) =>
              React.isValidElement(child) ? renderLink(child.props, level + 1) : null
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={cn(
        'py-2',
        affix && 'sticky',
        className
      )}
      style={affix ? { top: offsetTop } : undefined}
    >
      <nav className="space-y-1">
        {items.map(item => renderLink(item))}
        {children}
      </nav>
    </div>
  );
}

export function AnchorLink({ href, title, children }: AnchorLinkProps) {
  return (
    <div data-href={href} data-title={title}>
      {children}
    </div>
  );
}