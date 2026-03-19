import React from 'react';
import { Skeleton } from 'antd';
import type { SkeletonProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;

export interface KSkeletonProps extends SkeletonProps {
  lines?: number;
  circle?: boolean;
  width?: number | string;
  height?: number | string;
}

export function KSkeleton({ lines, circle, width, height, paragraph, avatar, loading = true, ...rest }: KSkeletonProps) {
  if ((width || height || circle) && !rest.children) {
    const h = height ?? 16;
    return (
      <div
        className="ant-skeleton-element"
        style={{
          display: 'inline-block',
          width: circle ? h : (width ?? '100%'),
          height: h,
          borderRadius: circle ? '50%' : t.radius.sm,
          backgroundColor: t.colors.neutral[200],
          animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }}
      />
    );
  }

  return (
    <Skeleton
      active
      loading={loading}
      paragraph={lines ? { rows: lines } : paragraph}
      avatar={circle ? true : avatar}
      {...rest}
    />
  );
}

KSkeleton.Button = Skeleton.Button;
KSkeleton.Input = Skeleton.Input;
KSkeleton.Image = Skeleton.Image;
KSkeleton.Avatar = Skeleton.Avatar;
KSkeleton.Node = Skeleton.Node;

export default KSkeleton;
