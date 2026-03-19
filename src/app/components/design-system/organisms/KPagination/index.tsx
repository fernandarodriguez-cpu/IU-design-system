import React from 'react';
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KPaginationProps extends PaginationProps { }

export function KPagination({ style, ...rest }: KPaginationProps) {
  return (
    <Pagination
      style={{
        fontFamily: font,
        ...style
      }}
      {...rest}
    />
  );
}

export default KPagination;
