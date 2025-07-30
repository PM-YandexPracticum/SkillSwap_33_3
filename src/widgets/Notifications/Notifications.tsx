import React from 'react';
import './Notifications.css';
import Lamp from '@assets/svg/icons/lamp.svg?react';
import Cross from '@assets/svg/icons/cross.svg?react';
// import { useNavigate } from 'react-router-dom';

export type Notification = {
  id: string;
  notification: string;
};

interface NotificationProps {
  notifications: Notification[];
  onClose: (id: string) => void;
}

const Notifications: React.FC<NotificationProps> = ({
  notifications,
  onClose,
}) => {
  // const navigate = useNavigate();

  return (
    <div className="notifications-container">
      {notifications.map((note) => (
        <div key={note.id} className="notification-item">
          <div className="notification-content">
            <Lamp />
            <span className="notification-text">{note.notification}</span>
          </div>
          <a
            href="/"
            className="notification-go-container"
            aria-label="Перейти на главную страницу"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="notification-go-text">Перейти</span>
          </a>
          {/* Если будет использоваться Router */}
          {/* <a
            href="/"
            className="notification-go-container"
            aria-label="Перейти на главную страницу"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate('/');
            }}
          >
            <span className="notification-go-text">Перейти</span>
          </a> */}
          <button
            className="notification-close"
            onClick={(e) => {
              e.preventDefault();
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
