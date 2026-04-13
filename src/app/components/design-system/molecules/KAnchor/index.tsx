import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../../../../imports/utils';

export interface KAnchorLink {
  key: string;
  href: string;
  title: React.ReactNode;
  children?: KAnchorLink[];
}

export interface KAnchorProps {
  items: KAnchorLink[];
  offsetTop?: number;
  bounds?: number;
  onClick?: (e: React.MouseEvent<HTMLElement>, link: KAnchorLink) => void;
  className?: string;
  style?: React.CSSProperties;
  affix?: boolean;
}

/**
 * KAnchor — Navegación interna por scroll (Headless v4)
 */
export function KAnchor({
  items,
  offsetTop = 0,
  bounds = 5,
  onClick,
  className,
  style,
  affix = true,
}: KAnchorProps) {
  const [activeLink, setActiveLink] = useState<string>('');

  const handleScroll = useCallback(() => {
    const ids = items.map(item => item.href.replace('#', ''));
    let currentActive = '';

    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= offsetTop + bounds) {
          currentActive = `#${id}`;
        } else {
          break;
        }
      }
    }

    if (currentActive) {
      setActiveLink(currentActive);
    }
  }, [items, offsetTop, bounds]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleClick = (e: React.MouseEvent<HTMLElement>, item: KAnchorLink) => {
    e.preventDefault();
    const id = item.href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -offsetTop;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setActiveLink(item.href);
    onClick?.(e, item);
  };

  const renderLinks = (links: KAnchorLink[], depth = 0) => {
    return (
      <ul className={cn("flex flex-col gap-1", depth > 0 && "pl-4 mt-1 border-l border-khor-neutral-100")}>
        {links.map((item) => {
          const isActive = activeLink === item.href;
          return (
            <li key={item.key} className="relative">
              {isActive && depth === 0 && (
                <motion.div
                  layoutId="anchor-indicator"
                  className="absolute left-0 w-0.5 h-full bg-khor-primary rounded-full -ml-[1px]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <a
                href={item.href}
                onClick={(e) => handleClick(e, item)}
                className={cn(
                  "block py-1 pr-4 text-xs transition-all font-primary",
                  isActive 
                    ? "text-khor-primary font-bold pl-4" 
                    : "text-khor-neutral-500 hover:text-khor-neutral-800 pl-4",
                  depth > 0 && "py-0.5"
                )}
              >
                {item.title}
              </a>
              {item.children && renderLinks(item.children, depth + 1)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <nav 
      className={cn("relative border-l border-khor-neutral-100 py-1", className)} 
      style={style}
    >
      {renderLinks(items)}
    </nav>
  );
}

export default KAnchor;
