import { NavLink } from 'react-router-dom';
import styles from './ProfileNavigation.module.css';
import requestIcon from '../../assets/svg/icons/request.svg';
import massageTextIcon from '../../assets/svg/icons/message-text.svg';
import likeHollowIcon from '../../assets/svg/icons/like-hollow.svg';
import ideaIcon from '../../assets/svg/icons/idea.svg';
import userIcon from '../../assets/svg/icons/user.svg';

interface ProfileNavigationProps {
  className?: string;
}

export const ProfileNavigation = ({ className }: ProfileNavigationProps) => {
  return (
    <nav className={`${styles.navigation} ${className || ''}`}>
      <ul className={styles.menu}>
        <li>
          <img src={requestIcon} alt="Иконка заявки" />
          <NavLink
            to="/applications"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            Заявки
          </NavLink>
        </li>
        <li>
          <img src={massageTextIcon} alt="Иконка обмена" />
          <NavLink
            to="/exchanges"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            Мои обмены
          </NavLink>
        </li>
        <li>
          <img src={likeHollowIcon} alt="Иконка избранного" />
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            Избранное
          </NavLink>
        </li>
        <li>
          <img src={ideaIcon} alt="Иконка навыков" />
          <NavLink
            to="/skills"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            Мои навыки
          </NavLink>
        </li>
        <li>
          <img src={userIcon} alt="Иконка профиля" />
          <NavLink
            to="/profile/info"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            Личные данные
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
