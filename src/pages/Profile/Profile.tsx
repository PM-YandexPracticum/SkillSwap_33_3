import { Outlet } from 'react-router-dom';
import { Header } from '../../widgets/Header';
import { Footer } from '../../widgets/Footer';
import { ProfileNavigation } from '../../widgets/ProfileNavigation';
import styles from './Profile.module.css';

export default function ProfilePage() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.navContainer}>
          <ProfileNavigation />
        </div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
