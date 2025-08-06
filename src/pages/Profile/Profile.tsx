import { Outlet } from 'react-router-dom';
import { ProfileNavigation } from '../../widgets/ProfileNavigation';
import styles from './Profile.module.css';

function ProfilePage() {
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

export const Component = ProfilePage;
