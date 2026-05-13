/**
 * ╔═══════════════════════════════════════════╗
 * ║  KHOR EDITOR TYPES — Config                ║
 * ║  Elite Rich Text Architecture              ║
 * ╚═══════════════════════════════════════════╝
 */

export interface KEditorProps {
  initialValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  minHeight?: number | string;
  maxHeight?: number | string;
  readonly?: boolean;
  className?: string;
  toolbarPosition?: 'top' | 'bottom';
  showToolbar?: boolean;
}
