import { useState, useRef, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Header.module.css';

import logoUrl from '../../assets/svg/logo.svg';
import chevronDownIcon from '../../assets/svg/icons/chevron-down.svg';

import MoonIcon from '../../assets/svg/icons/moon.svg?react';
import LikeIcon from '../../assets/svg/icons/like-hollow.svg?react';
import NotificationIcon from '../../assets/svg/icons/notification.svg?react';
import LogoutIcon from '../../assets/svg/icons/logout.svg?react';

import { useDispatch, useSelector } from '../../app/store';
import { selectAllSkills } from '../../features/slices/skillsSlice';
import {
  fetchUser,
  logout,
  selectAuthUser,
  selectIsAuth,
} from '../../features/slices/authSlice';

import { SkillsMenu } from '../SkillsMenu';
import { Button } from '../../shared/ui/Button';
import type { Category } from '../../shared/lib/types';
import { DropdownBase } from '../../shared/ui/DropdownBase';
import { reorderArrayByRows } from '../../shared/lib/utils';

export const Header = () => {
  const [isSkillsMenuOpen, setIsSkillsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const headerRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const skillsButtonRef = useRef<HTMLButtonElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const skillsRaw = useSelector(selectAllSkills);
  const reorderedSkills = reorderArrayByRows<Category>(skillsRaw, 3);

  const isAuth = useSelector(selectIsAuth);
  const user = useSelector(selectAuthUser);

  const handleSkillsMenuOpen = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsSkillsMenuOpen(true);
  }, []);

  const handleSkillsMenuClose = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    // Задержка перед закрытием для плавного перехода между элементами
    hoverTimeoutRef.current = setTimeout(() => {
      setIsSkillsMenuOpen(false);
    }, 150);
  }, []);

  const handleSkillsMenuToggle = useCallback(() => {
    setIsSkillsMenuOpen((prev) => !prev);
  }, []);

  // Обработчики hover для кнопки
  const handleButtonMouseEnter = useCallback(() => {
    handleSkillsMenuOpen();
  }, [handleSkillsMenuOpen]);

  const handleButtonMouseLeave = useCallback(() => {
    handleSkillsMenuClose();
  }, [handleSkillsMenuClose]);

  // Обработчики hover для dropdown
  const handleDropdownMouseEnter = useCallback(() => {
    handleSkillsMenuOpen();
  }, [handleSkillsMenuOpen]);

  const handleDropdownMouseLeave = useCallback(() => {
    handleSkillsMenuClose();
  }, [handleSkillsMenuClose]);

  const handleLogout = () => {
    dispatch(logout());
    setIsProfileMenuOpen(false);
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // Обработка клика вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsSkillsMenuOpen(false);
      }
    };

    if (isSkillsMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isSkillsMenuOpen]);

  // Обработка клика вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    if (isProfileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isProfileMenuOpen]);

  // Cleanup timeout при размонтировании
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className={styles['header-wrapper']} ref={headerRef}>
      <div className={styles['header-container']}>
        <div className={styles['header-navigation-container']}>
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
            <div
              onMouseEnter={handleButtonMouseEnter}
              onMouseLeave={handleButtonMouseLeave}
            >
              <Button
                ref={skillsButtonRef}
                variant="transparent"
                onClick={handleSkillsMenuToggle}
                aria-haspopup="true"
                aria-expanded={isSkillsMenuOpen}
              >
                Все навыки
                <img
                  src={chevronDownIcon}
                  alt="Стрелка вниз для выпадающего меню"
                  className={styles['chevron-down']}
                />
              </Button>

              <DropdownBase
                isOpen={isSkillsMenuOpen}
                onClose={handleSkillsMenuClose}
                triggerRef={skillsButtonRef}
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
                className={styles.skillsMenuDropdown}
              >
                <SkillsMenu skillsData={reorderedSkills} />
              </DropdownBase>
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
        </div>

        {!isAuth ? (
          <>
            <button className={styles['icon-container']} onClick={() => {}}>
              <MoonIcon />
            </button>

            <div className={styles['header-auth']}>
              <Button variant="secondary">Войти</Button>
              <Button variant="primary">Зарегистрироваться</Button>
            </div>
          </>
        ) : (
          <div className={styles['header-profile']}>
            <button className={styles['icon-container']} onClick={() => {}}>
              <MoonIcon />
            </button>
            <button className={styles['icon-container']} onClick={() => {}}>
              <NotificationIcon />
            </button>
            <button className={styles['icon-container']} onClick={() => {}}>
              <LikeIcon />
            </button>
            <div className={styles['profile']} ref={avatarRef}>
              <p className={styles['profile__username']}>{user?.name}</p>
              <div
                className={styles['avatar-container']}
                onClick={() => setIsProfileMenuOpen((prev) => !prev)}
              >
                <img
                  className={styles.avatar}
                  src={user?.avatar}
                  alt={user?.name}
                />
              </div>

              <DropdownBase
                isOpen={isProfileMenuOpen}
                onClose={() => setIsProfileMenuOpen(false)}
                triggerRef={avatarRef}
                className={styles['profile__dropdown']}
              >
                <div className={styles['dropdown__content']}>
                  <button
                    onClick={() => navigate('/profile/info')}
                    className={styles['dropdown__button']}
                  >
                    Личный кабинет
                  </button>
                  <button
                    onClick={handleLogout}
                    className={styles['dropdown__button']}
                  >
                    Выйти из аккаунта <LogoutIcon />
                  </button>
                </div>
              </DropdownBase>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
