import * as React from 'react';
import { cn } from './utils';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '../../utils/clipboard';

// Base Typography Props
interface BaseTypographyProps {
  children: React.ReactNode;
  className?: string;
  copyable?: boolean;
  delete?: boolean;
  disabled?: boolean;
  editable?: boolean;
  ellipsis?: boolean | { rows?: number; expandable?: boolean };
  mark?: boolean;
  underline?: boolean;
  strong?: boolean;
  italic?: boolean;
  keyboard?: boolean;
  code?: boolean;
  type?: 'default' | 'secondary' | 'success' | 'warning' | 'danger';
}

// Title Component
export interface TitleProps extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'type'>, BaseTypographyProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Title({
  level = 1,
  children,
  className,
  copyable,
  delete: deleted,
  disabled,
  ellipsis,
  mark,
  underline,
  strong,
  type = 'default',
  ...props
}: TitleProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (typeof children === 'string') {
      copyToClipboard(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Title typeClasses
  const typeClasses = {
    default: 'text-foreground',
    secondary: 'text-muted-foreground',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    danger: 'text-red-600 dark:text-red-400'
  };

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const content = (
    <Tag
      className={cn(
        typeClasses[type],
        disabled && 'opacity-50 cursor-not-allowed',
        deleted && 'line-through',
        underline && 'underline',
        ellipsis && 'truncate',
        'flex items-center gap-2',
        className
      )}
      {...props}
    >
      {mark ? <mark className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">{children}</mark> : children}
      {copyable && (
        <button
          onClick={handleCopy}
          className="inline-flex items-center justify-center p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        </button>
      )}
    </Tag>
  );

  return content;
}

// Text Component
export interface TextProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'type'>, BaseTypographyProps {}

export function Text({
  children,
  className,
  copyable,
  delete: deleted,
  disabled,
  mark,
  underline,
  strong,
  keyboard,
  code,
  type = 'default',
  ...props
}: TextProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (typeof children === 'string') {
      copyToClipboard(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Text typeClasses
  const typeClasses = {
    default: 'text-foreground',
    secondary: 'text-muted-foreground',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    danger: 'text-red-600 dark:text-red-400'
  };

  let content = children;

  if (mark) {
    content = <mark className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">{content}</mark>;
  }

  if (code) {
    content = (
      <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">
        {content}
      </code>
    );
  }

  if (keyboard) {
    content = (
      <kbd className="px-2 py-1 bg-card border border-border rounded shadow-sm font-mono text-sm">
        {content}
      </kbd>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1',
        typeClasses[type],
        disabled && 'opacity-50 cursor-not-allowed',
        deleted && 'line-through',
        underline && 'underline',
        strong && 'font-semibold',
        className
      )}
      {...props}
    >
      {content}
      {copyable && (
        <button
          onClick={handleCopy}
          className="inline-flex items-center justify-center p-0.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        </button>
      )}
    </span>
  );
}

// Paragraph Component
export interface ParagraphProps extends Omit<React.HTMLAttributes<HTMLParagraphElement>, 'type'>, BaseTypographyProps {}

export function Paragraph({
  children,
  className,
  copyable,
  delete: deleted,
  disabled,
  ellipsis,
  mark,
  underline,
  strong,
  type = 'default',
  ...props
}: ParagraphProps) {
  const [copied, setCopied] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleCopy = () => {
    if (typeof children === 'string') {
      copyToClipboard(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Paragraph typeClasses
  const typeClasses = {
    default: 'text-foreground',
    secondary: 'text-muted-foreground',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    danger: 'text-red-600 dark:text-red-400'
  };

  const isEllipsisObject = typeof ellipsis === 'object';
  const rows = isEllipsisObject ? ellipsis.rows || 3 : undefined;
  const expandable = isEllipsisObject ? ellipsis.expandable : false;

  const ellipsisClasses = ellipsis
    ? rows
      ? `line-clamp-${rows}`
      : 'truncate'
    : '';

  return (
    <div className="flex items-start gap-2">
      <p
        className={cn(
          typeClasses[type],
          disabled && 'opacity-50 cursor-not-allowed',
          deleted && 'line-through',
          underline && 'underline',
          strong && 'font-semibold',
          !expanded && ellipsisClasses,
          className
        )}
        {...props}
      >
        {mark ? <mark className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">{children}</mark> : children}
      </p>
      {copyable && (
        <button
          onClick={handleCopy}
          className="inline-flex items-center justify-center p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded flex-shrink-0"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        </button>
      )}
      {expandable && ellipsis && !expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="text-primary hover:underline text-sm flex-shrink-0"
        >
          Expandir
        </button>
      )}
      {expandable && expanded && (
        <button
          onClick={() => setExpanded(false)}
          className="text-primary hover:underline text-sm flex-shrink-0"
        >
          Contraer
        </button>
      )}
    </div>
  );
}

// Link Component
export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'type'> {
  href: string;
  type?: 'default' | 'secondary' | 'success' | 'warning' | 'danger';
  underline?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Link({
  href,
  children,
  type = 'default',
  underline = true,
  disabled,
  className,
  ...props
}: LinkProps) {
  // Link typeClasses
  const typeClasses = {
    default: 'text-primary hover:text-primary/80',
    secondary: 'text-muted-foreground hover:text-foreground',
    success: 'text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200',
    warning: 'text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-200',
    danger: 'text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200'
  };

  return (
    <a
      href={disabled ? undefined : href}
      className={cn(
        typeClasses[type],
        underline && 'underline',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        'transition-colors',
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

// Export as namespace
export const Typography = {
  Title,
  Text,
  Paragraph,
  Link
};