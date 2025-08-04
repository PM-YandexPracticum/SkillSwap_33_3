import { Outlet } from 'react-router-dom';
import { ProfileNavigation } from '../../widgets/ProfileNavigation';
import styles from './Profile.module.css';
import { useDispatch } from '@/app/store';
import { useEffect } from 'react';
import { fetchUser } from '@/features/slices/authSlice';

export default function ProfilePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  });

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.navContainer}>
          <ProfileNavigation />
        </div>
        <Outlet />
      </div>
    </>
  );
}
