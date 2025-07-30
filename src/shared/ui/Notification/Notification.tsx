import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import calendar from 'dayjs/plugin/calendar';
import IdeaIcon from '../../../assets/svg/icons/idea-new.svg?react';
import { Button } from '../Button';
import styles from './Notification.module.css';

dayjs.extend(calendar);
dayjs.locale('ru');

interface NotificationProps {
  id: string;
  title: string;
  description: string;
  date: string;
  viewed: boolean;
  onFollowLink: (id: string) => void;
}

export const Notification: React.FC<NotificationProps> = ({
  id,
  title,
  description,
  date,
  viewed,
  onFollowLink,
}) => {
  const formattedDate = dayjs(date).calendar(undefined, {
    sameDay: '[сегодня]',
    nextDay: '[завтра]',
    lastDay: '[вчера]',
    sameElse: 'D MMMM',
  });

  return (
    <div className={styles.notification}>
      <div className={styles.icon}>
        <IdeaIcon />
      </div>

      <div className={styles.textBlock}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>

      <div>
        {!viewed && (
          <div className={styles.buttonWrapper}>
            <Button variant="primary" onClick={() => onFollowLink(id)}>
              Перейти
            </Button>
          </div>
        )}
      </div>

      <div className={styles.date}>{formattedDate}</div>
    </div>
  );
};
