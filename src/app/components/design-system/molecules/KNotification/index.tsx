import { notification } from 'antd';
import type { NotificationArgsProps } from 'antd';

export function showKNotification(args: NotificationArgsProps) {
  notification.open({
    ...args,
    style: {
      fontFamily: 'Raleway, sans-serif',
      ...args.style,
    },
  });
}

export default showKNotification;
