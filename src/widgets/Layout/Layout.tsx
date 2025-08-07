import { Outlet } from 'react-router-dom';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import { Notifications } from '../Notifications';
import {
  markNotificationsAsRead,
  selectAuthUser,
  selectIsAuth,
} from '@/features/slices/authSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from '@/app/store';

function Layout() {
  const user = useSelector(selectAuthUser);

  const notifications =
    user?.notifications?.filter((note) => !note.viewed) || [];

  // Функция для имитации закрытия уведомления
  const handleClose = (id: string) => {
    dispatch(markNotificationsAsRead([id]));
  };

  const isAuthenticated = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  return (
    <>
      <Header />

      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <Outlet />
      </div>

      {/* Отображаем уведомления только если пользователь аутентифицирован */}
      {isAuthenticated && (
        <Notifications notifications={notifications} onClose={handleClose} />
      )}

      <Footer />
    </>
  );
}

export const Component = Layout;
