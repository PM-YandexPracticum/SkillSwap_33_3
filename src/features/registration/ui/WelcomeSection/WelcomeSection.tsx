import React from 'react';
import styles from './WelcomeSection.module.css';

interface WelcomeSectionProps {
  icon: string;
  title: string;
  description: string;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <img
          src={icon}
          className={styles.lightBulbIcon}
          alt="Иллюстрация текущего шага регистрации"
        />
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
};
