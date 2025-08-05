import { Outlet } from 'react-router-dom';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import { Notifications } from '../Notifications';
import { useEffect } from 'react';
import {
  fetchUser,
  markNotificationsAsRead,
  selectAuthUser,
  selectIsAuth,
} from '@/features/slices/authSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from '@/app/store';

export function Layout() {
  const user = useSelector(selectAuthUser);

  const notifications =
    user?.notifications?.filter((note) => !note.viewed) || [];

  // Функция для имитации закрытия уведомления
  const handleClose = (id: string) => {
    dispatch(markNotificationsAsRead([id]));
  };

  const isAuthenticated = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    // Вызываем проверку аутентификации при монтировании компонента
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-grow">
        <Outlet />
      </div>

      {/* Отображаем уведомления только если пользователь аутентифицирован */}
      {isAuthenticated && (
        <Notifications notifications={notifications} onClose={handleClose} />
      )}

      <Footer />
    </div>
  );
}
