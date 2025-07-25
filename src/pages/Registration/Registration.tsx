import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Registration.module.css';
import logoIcon from '../../assets/svg/logo.svg';
import { Button } from '../../shared/ui/Button';

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
  const progressPercentage = (stepNumber / totalSteps) * 100;

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
        <Button variant="tertiary" onClick={handleClose} type="button">
          Закрыть ✕
        </Button>
      </header>

      {/* Индикатор прогресса */}
      <div className={styles.progressSection}>
        <p className={styles.stepText}>
          Шаг {stepNumber} из {totalSteps}
        </p>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progressPercentage}%` }}
          />
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
