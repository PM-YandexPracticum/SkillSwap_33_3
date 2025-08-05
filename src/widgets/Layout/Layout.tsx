import { Outlet } from 'react-router-dom';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import { authApiClient } from '@/api/authClient';
import { Notifications } from '../Notifications';
import { useEffect, useState } from 'react';

export function Layout() {
  // Состояние для хранения уведомлений
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      notification: 'Николай принял ваш обмен',
    },
    {
      id: '2',
      notification: 'Татьяна предлагает вам обмен',
    },
  ]);

  // Функция для имитации закрытия уведомления
  const handleClose = (id: string) => {
    setNotifications(notifications.filter((note) => note.id !== id));
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Проверяем аутентификацию при загрузке
    const checkAuth = async () => {
      try {
        // Пытаемся проверить аутентификацию
        await authApiClient.checkAuth();
        setIsAuthenticated(true);
      } catch {
        // Если произошла ошибка - пользователь не аутентифицирован
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-grow">
        <Outlet />
      </div>

      {/* Отображаем уведомления только если пользователь аутентифицирован */}
      {!isAuthenticated && (
        <Notifications notifications={notifications} onClose={handleClose} />
      )}

      <Footer />
    </div>
  );
}
