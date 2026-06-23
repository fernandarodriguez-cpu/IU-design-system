import React from 'react';
import { Tree as AntTree } from 'antd';
import { cn } from '@/utils/cn';

/* ─── KTree — Migrado a Ant Design ───────────────────────────────
   Wrapper sobre AntD Tree. KTreeNode coincide con el DataNode de AntD
   (key/title/children/disabled/selectable/checkable/icon), así que se
   pasa como treeData directamente. API pública conservada. */

export interface KTreeNode {
  key: string | number;
  title: React.ReactNode;
  children?: KTreeNode[];
  disabled?: boolean;
  selectable?: boolean;
  checkable?: boolean;
  icon?: React.ReactNode;
}

export interface KTreeProps {
  data: KTreeNode[];
  checkable?: boolean;
  checkedKeys?: (string | number)[];
  onCheck?: (keys: (string | number)[], info: { checked: boolean; node: KTreeNode }) => void;
  selectedKeys?: (string | number)[];
  onSelect?: (keys: (string | number)[], info: { node: KTreeNode }) => void;
  expandedKeys?: (string | number)[];
  onExpand?: (keys: (string | number)[]) => void;
  showLine?: boolean;
  showIcon?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function KTree({
  data,
  checkable,
  checkedKeys,
  onCheck,
  selectedKeys,
  onSelect,
  expandedKeys,
  onExpand,
  showLine,
  showIcon,
  className,
  style,
}: KTreeProps) {
  return (
    <AntTree
      treeData={data as any}
      checkable={checkable}
      checkedKeys={checkedKeys}
      onCheck={(ck, info) =>
        onCheck?.(
          (Array.isArray(ck) ? ck : ck.checked) as (string | number)[],
          { checked: (info as any).checked, node: info.node as unknown as KTreeNode },
        )
      }
      selectedKeys={selectedKeys}
      onSelect={(keys, info) => onSelect?.(keys as (string | number)[], { node: info.node as unknown as KTreeNode })}
      expandedKeys={expandedKeys}
      onExpand={(keys) => onExpand?.(keys as (string | number)[])}
      showLine={showLine}
      showIcon={showIcon}
      className={cn('font-primary', className)}
      style={style}
    />
  );
}

export default KTree;
