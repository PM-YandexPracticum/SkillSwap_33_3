import React from 'react';
import { Link } from 'react-router-dom';
import './Notifications.css';
import Lamp from '@assets/svg/icons/lamp.svg?react';
import Cross from '@assets/svg/icons/cross.svg?react';

export type Notification = {
  id: string;
  title: string;
  description: string;
  date: string;
  viewed: boolean;
};

interface NotificationProps {
  notifications: Notification[];
  onClose: (id: string) => void;
  className?: string;
}

export const Notifications: React.FC<NotificationProps> = ({
  notifications,
  onClose,
}) => {
  return (
    <div className="notifications-container">
      {notifications.map((note) => (
        <div key={note.id} className="notification-item">
          <Link
            to="/"
            className="notification-link"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Уведомление: ${note.title}`}
          >
            <div className="notification-content">
              <Lamp className="notification-icon" />
              <span className="notification-text">{note.description}</span>
            </div>
            <div className="notification-go-container">
              <span className="notification-go-text">Перейти</span>
            </div>
          </Link>
          <button
            className="notification-close"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose(note.id);
            }}
            aria-label="Закрыть уведомление"
          >
            <Cross />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
