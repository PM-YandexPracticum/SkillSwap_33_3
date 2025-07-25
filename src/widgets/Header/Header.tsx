import { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../shared/ui/Button';
import { DropdownBase } from '../../shared/ui/DropdownBase';
import { SkillsMenu } from '../SkillsMenu';
import styles from './Header.module.css';
import logoUrl from '../../assets/svg/logo.svg';
import chevronDownIcon from '../../assets/svg/icons/chevron-down.svg';
import moonIcon from '../../assets/svg/icons/moon.svg';

export const Header = () => {
  const [isSkillsMenuOpen, setIsSkillsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const skillsButtonRef = useRef<HTMLButtonElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
            className={styles['dropdown']}
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
              <SkillsMenu />
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
