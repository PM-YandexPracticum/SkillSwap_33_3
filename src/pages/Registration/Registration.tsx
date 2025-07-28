import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Registration.module.css';
import logoIcon from '../../assets/svg/logo.svg';
import { Button } from '../../shared/ui/Button';
import CrossIcon from '../../assets/svg/icons/cross.svg?react';

interface RegistrationProps {
  children: React.ReactNode;
  stepNumber: number;
  totalSteps?: number;
  rightSideImage: React.ReactNode;
  onCloseClick?: () => void;
}

export const Registration: React.FC<RegistrationProps> = ({
  children,
  stepNumber,
  totalSteps = 3,
  rightSideImage,
  onCloseClick,
}) => {
  const handleClose = () => {
    if (onCloseClick) {
      onCloseClick();
    }
  };

  return (
    <div className={styles.container}>
      {/* Шапка */}
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          <img src={logoIcon} alt="SkillSwap" className={styles.logoIcon} />
          <span className={styles.logoText}>SkillSwap</span>
        </Link>
        <div className={styles.closeButtonContainer}>
          <Button variant="tertiary" onClick={handleClose} type="button">
            <span className={styles.closeButtonText}>
              Закрыть
              <CrossIcon width="24" height="24" />
            </span>
          </Button>
        </div>
      </header>

      {/* Индикатор прогресса */}
      <div className={styles.progressSection}>
        <p className={styles.stepText}>
          Шаг {stepNumber} из {totalSteps}
        </p>
        <div className={styles.progressBar}>
          {Array.from({ length: totalSteps }, (_, index) => (
            <div
              key={index}
              className={`${styles.progressStep} ${
                index < stepNumber ? styles.active : ''
              }`}
            />
          ))}
        </div>
      </div>

      {/* Основное содержимое */}
      <div className={styles.mainContent}>
        <div className={styles.contentGrid}>
          {/* Левая часть - Форма */}
          <div className={styles.formSection}>{children}</div>

          {/* Правая часть - Изображение */}
          <div className={styles.imageSection}>{rightSideImage}</div>
        </div>
      </div>
    </div>
  );
};
