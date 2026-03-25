import React from 'react';
import { Tree } from 'antd';
import type { TreeProps, TreeDataNode } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';
import { ChevronRight, Folder, FolderOpen, File } from 'lucide-react';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KTree — Vista de árbol (Wave 3)
   ═══════════════════════════════════════════════ */
export interface KTreeNode extends TreeDataNode {
  // We extend TreeDataNode for AntD compatibility
}

export interface KTreeProps extends Omit<TreeProps, 'treeData'> {
  data: KTreeNode[];
  showIcon?: boolean;
}

export function KTree({
  data,
  checkable,
  showLine,
  showIcon = true,
  defaultExpandAll,
  className,
  style,
  ...rest
}: KTreeProps) {
  
  // Custom icons mapping
  const renderIcon = (props: any) => {
    const { expanded, isLeaf } = props;
    if (isLeaf) return <File size={14} style={{ marginTop: 4, color: t.colors.neutral[400] }} />;
    return expanded ? 
      <FolderOpen size={16} style={{ marginTop: 3, color: t.colors.neutral[400] }} /> : 
      <Folder size={16} style={{ marginTop: 3, color: t.colors.neutral[400] }} />;
  };

  return (
    <div 
      className={className} 
      style={{ 
        fontFamily: font,
        ...style 
      }}
    >
      <Tree
        treeData={data}
        checkable={checkable}
        showLine={showLine ? { showLeafIcon: false } : false}
        showIcon={showIcon}
        icon={showIcon ? renderIcon : undefined}
        switcherIcon={<ChevronRight size={14} />}
        defaultExpandAll={defaultExpandAll}
        blockNode
        style={{
          backgroundColor: 'transparent',
          fontFamily: font,
          fontSize: 14,
        }}
        {...rest}
      />
      <style>{`
        .ant-tree .ant-tree-node-content-wrapper:hover {
          background-color: ${t.colors.neutral[100]} !important;
        }
        .ant-tree .ant-tree-node-selected {
          background-color: rgba(224, 77, 38, 0.08) !important;
          color: ${t.colors.brand.primary} !important;
        }
        .ant-tree-checkbox-checked .ant-tree-checkbox-inner {
          background-color: ${t.colors.brand.primary} !important;
          border-color: ${t.colors.brand.primary} !important;
        }
      `}</style>
    </div>
  );
}

export default KTree;
