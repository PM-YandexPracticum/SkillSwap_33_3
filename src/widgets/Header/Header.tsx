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

  const handleSkillsMenuToggle = useCallback(() => {
    setIsSkillsMenuOpen((prev) => !prev);
  }, []);

  const handleSkillsMenuClose = useCallback(() => {
    setIsSkillsMenuOpen(false);
  }, []);

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
          <div className={styles['dropdown']}>
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
