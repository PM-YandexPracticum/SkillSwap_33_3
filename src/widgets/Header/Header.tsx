import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../shared/ui/Button';
import styles from './Header.module.css';
import logoUrl from '../../assets/svg/logo.svg';
import chevronDownIcon from '../../assets/svg/icons/chevron-down.svg';
import moonIcon from '../../assets/svg/icons/moon.svg';

export const Header = () => {
  return (
    <header className={styles['header-wrapper']}>
      <div className={styles['header-container']}>
        <Link to="/" className={styles['header-logo']}>
          <img
            src={logoUrl}
            alt="SkillSwap Logo"
            className={styles['logo-icon']}
          />
          <div>SkillSwap</div>
        </Link>

        <nav className={styles['header-nav']}>
          <Link to="/about" className={styles['nav-link']}>
            О проекте
          </Link>
          <div className={styles['dropdown']}>
            <Button
              variant="transparent"
              onClick={() => {
                /* Логика открытия меню */
              }}
              aria-haspopup="true"
              aria-expanded="false"
            >
              Все навыки
              <img
                src={chevronDownIcon}
                alt="Стрелка вниз для выпадающего меню"
                className={styles['chevron-down']}
              />
            </Button>
          </div>
        </nav>

        <div className={styles['header-search']}>
          <div className={styles['search-container']}>
            <input
              type="search"
              placeholder="Искать навык"
              className={styles['search-input']}
            />
          </div>
        </div>

        <div className={styles.moonContainer}>
          <img src={moonIcon} alt="Иконка луны" className={styles.moonIcon} />
        </div>

        <div className={styles['header-auth']}>
          <Button variant="secondary">Войти</Button>
          <Button variant="primary">Зарегистрироваться</Button>
        </div>
      </div>
    </header>
  );
};
