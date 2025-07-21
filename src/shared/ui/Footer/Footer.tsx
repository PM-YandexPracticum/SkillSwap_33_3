import { NavLink, Link } from 'react-router-dom';
import styles from './Footer.module.css';
import logo from '../../../assets/svg/logo.svg';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link to="/" className={styles.logo_link}>
        <div className={styles.logo_container}>
          <img src={logo} className={styles.logo_img} alt="Logo" />
          <p className={styles.logo_name}>SkillSwap</p>
        </div>
      </Link>

      <div className={styles.links}>
        <ul className={styles.column}>
          <li>
            <NavLink to="/about" className={styles.links_item}>
              О проекте
            </NavLink>
          </li>
          <li>
            <NavLink to="/skills" className={styles.links_item}>
              Все навыки
            </NavLink>
          </li>
        </ul>
        <ul className={styles.column}>
          <li>
            <NavLink to="/contacts" className={styles.links_item}>
              Контакты
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" className={styles.links_item}>
              Блог
            </NavLink>
          </li>
        </ul>
        <ul className={styles.column}>
          <li>
            <NavLink to="/privacy" className={styles.links_item}>
              Политика конфиденциальности
            </NavLink>
          </li>
          <li>
            <NavLink to="/terms" className={styles.links_item}>
              Пользовательское соглашение
            </NavLink>
          </li>
        </ul>
      </div>

      <div className={styles.copyright}>
        <p>SkillSwap – 2025</p>
      </div>
    </footer>
  );
};
