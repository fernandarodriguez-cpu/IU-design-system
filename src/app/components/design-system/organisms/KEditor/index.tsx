/**
 * ╔═══════════════════════════════════════════╗
 * ║  KHOR EDITOR — Elite Organism              ║
 * ║  Beyond UI Inspired Rich Text System       ║
 * ╚═══════════════════════════════════════════╝
 */
import React, { useState, useRef, useEffect } from 'react';
import { 
  Bold, Italic, Underline, List, ListOrdered, 
  AlignLeft, AlignCenter, AlignRight, Link, 
  Type, Palette, Eraser, Maximize2, Minimize2,
  Heading1, Heading2, Quote, Code
} from 'lucide-react';
import { KButton, KText, KBadge } from '../../atoms';
import { KEditorProps } from './types';
import { cn } from '../../../../../imports/utils';

export const KEditor: React.FC<KEditorProps> = ({
  initialValue = '',
  placeholder = 'Empieza a escribir algo asombroso...',
  onChange,
  minHeight = 300,
  maxHeight,
  readonly = false,
  className = '',
  toolbarPosition = 'top',
  showToolbar = true,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [wordCount, setWordCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (editorRef.current && initialValue) {
      editorRef.current.innerHTML = initialValue;
    }
  }, []);

  const handleInput = () => {
    const content = editorRef.current?.innerHTML || '';
    const text = editorRef.current?.innerText || '';
    setWordCount(text.trim().split(/\s+/).filter(x => x.length > 0).length);
    onChange?.(content);
  };

  const exec = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleLink = () => {
    const url = prompt('Introduce la URL:');
    if (url) exec('createLink', url);
  };

  const ToolbarButton = ({ icon, cmd, val, onClick, label }: { icon: React.ReactNode, cmd?: string, val?: string, onClick?: () => void, label?: string }) => (
    <KButton 
      variant="ghost" 
      size="sm" 
      icon={icon} 
      onClick={onClick || (() => cmd && exec(cmd, val))}
      className="h-8 w-8 !p-0 rounded-lg hover:bg-khor-primary/10 hover:text-khor-primary transition-all"
    />
  );

  return (
    <div className={cn(
      "flex flex-col border border-khor-border-default rounded-3xl bg-white dark:bg-khor-surface-card transition-all overflow-hidden",
      isFullscreen ? "fixed inset-4 z-[999] shadow-2xl" : "relative shadow-khor-sm",
      className
    )}>
      {/* ── Toolbar ── */}
      {showToolbar && (
        <div className={cn(
          "flex flex-wrap items-center gap-1 p-2 bg-khor-neutral-50/50 dark:bg-white/5 backdrop-blur-md border-khor-border-default",
          toolbarPosition === 'top' ? "border-b" : "order-2 border-t"
        )}>
          <div className="flex items-center gap-1 px-2 border-r border-khor-border-default mr-1">
            <ToolbarButton icon={<Heading1 size={16} />} cmd="formatBlock" val="H1" />
            <ToolbarButton icon={<Heading2 size={16} />} cmd="formatBlock" val="H2" />
            <ToolbarButton icon={<Type size={16} />} cmd="formatBlock" val="P" />
          </div>

          <div className="flex items-center gap-1 px-2 border-r border-khor-border-default mr-1">
            <ToolbarButton icon={<Bold size={16} />} cmd="bold" />
            <ToolbarButton icon={<Italic size={16} />} cmd="italic" />
            <ToolbarButton icon={<Underline size={16} />} cmd="underline" />
          </div>

          <div className="flex items-center gap-1 px-2 border-r border-khor-border-default mr-1">
            <ToolbarButton icon={<List size={16} />} cmd="insertUnorderedList" />
            <ToolbarButton icon={<ListOrdered size={16} />} cmd="insertOrderedList" />
            <ToolbarButton icon={<Quote size={16} />} cmd="formatBlock" val="blockquote" />
          </div>

          <div className="flex items-center gap-1 px-2 border-r border-khor-border-default mr-1">
            <ToolbarButton icon={<AlignLeft size={16} />} cmd="justifyLeft" />
            <ToolbarButton icon={<AlignCenter size={16} />} cmd="justifyCenter" />
            <ToolbarButton icon={<AlignRight size={16} />} cmd="justifyRight" />
          </div>

          <div className="flex items-center gap-1 px-2">
            <ToolbarButton icon={<Link size={16} />} onClick={handleLink} />
            <ToolbarButton icon={<Eraser size={16} />} cmd="removeFormat" />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <KButton 
              variant="ghost" size="sm" 
              icon={isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />} 
              onClick={() => setIsFullscreen(!isFullscreen)}
            />
          </div>
        </div>
      )}

      {/* ── Editor Canvas ── */}
      <div 
        ref={editorRef}
        contentEditable={!readonly}
        onInput={handleInput}
        className={cn(
          "flex-1 p-8 outline-none prose dark:prose-invert max-w-none font-primary",
          "selection:bg-khor-primary/20 selection:text-khor-primary",
          "placeholder:text-khor-neutral-400"
        )}
        style={{ 
          minHeight, 
          maxHeight: isFullscreen ? 'calc(100vh - 120px)' : maxHeight,
          overflowY: 'auto'
        }}
        data-placeholder={placeholder}
      />

      {/* ── Status Bar ── */}
      <div className="px-6 py-2 border-t border-khor-border-default bg-khor-neutral-50/30 dark:bg-black/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <KBadge label={`${wordCount} palabras`} color="blue" />
          <KText variant="small" className="opacity-40 italic">Guardado automáticamente</KText>
        </div>
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-khor-success animate-pulse" />
           <KText variant="small" className="font-bold opacity-60">Live</KText>
        </div>
      </div>

      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: var(--khor-neutral-400);
          cursor: text;
        }
        [contenteditable] h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; color: var(--khor-primary); }
        [contenteditable] h2 { font-size: 1.8rem; font-weight: 700; margin-bottom: 0.75rem; }
        [contenteditable] blockquote { border-left: 4px solid var(--khor-primary); padding-left: 1.5rem; font-style: italic; opacity: 0.8; }
        [contenteditable] ul { list-style-type: disc; padding-left: 1.5rem; }
        [contenteditable] ol { list-style-type: decimal; padding-left: 1.5rem; }
      `}</style>
    </div>
  );
};
