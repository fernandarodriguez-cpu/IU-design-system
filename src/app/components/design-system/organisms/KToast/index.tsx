import React from 'react';
import { message } from 'antd';
import type { MessageArgsProps } from 'antd';
export interface KToastProps extends Omit<MessageArgsProps, 'content'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  content?: React.ReactNode;
}

export function kToast({ title, description, content, ...rest }: KToastProps) {
  const finalContent = content || (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {title && <div style={{ fontWeight: 600, fontSize: 14 }}>{title}</div>}
      {description && <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>{description}</div>}
    </div>
  );

  message.open({
    ...rest,
    content: finalContent,
    style: {
      fontFamily: 'Raleway, sans-serif',
      ...rest.style,
    },
  });
}

export function KToastProvider() {
  return null; // AntD 5 messages don't strictly require a provider unless using context bridge
}

export default kToast;
