import React from 'react';
import { Notification } from '../../shared/ui/Notification/Notification';
import styles from './NotificationsMenu.module.css';

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  date: string;
  viewed: boolean;
}

interface NotificationsMenuProps {
  notifications: NotificationItem[];
  onRead: (ids: string[]) => void;
  onRemove: (ids: string[]) => void;
  onFollowLink: (id: string) => void;
}

export const NotificationsMenu: React.FC<NotificationsMenuProps> = ({
  notifications,
  onRead,
  onRemove,
  onFollowLink,
}) => {
  const newNotifications = notifications.filter((n) => !n.viewed);
  const viewedNotifications = notifications.filter((n) => n.viewed);

  return (
    <div className={styles.menu}>
      {newNotifications.length > 0 && (
        <>
          <div className={styles.sectionHeader}>
            <h2 className={styles.title}>Новые уведомления</h2>
            <button
              className={styles.action}
              onClick={() => onRead(newNotifications.map((n) => n.id))}
            >
              Прочитать все
            </button>
          </div>

          <div className={styles.list}>
            {newNotifications.map((n) => (
              <Notification key={n.id} {...n} onFollowLink={onFollowLink} />
            ))}
          </div>
        </>
      )}

      {viewedNotifications.length > 0 && (
        <>
          <div className={styles.sectionHeader}>
            <h2 className={styles.title}>Просмотренные</h2>
            <button
              className={styles.action}
              onClick={() => onRemove(viewedNotifications.map((n) => n.id))}
            >
              Очистить
            </button>
          </div>

          <div className={styles.list}>
            {viewedNotifications.map((n) => (
              <Notification key={n.id} {...n} onFollowLink={onFollowLink} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
