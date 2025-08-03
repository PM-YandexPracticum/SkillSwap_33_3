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
        <img src={icon} alt="Иконка шага" className={styles.lightBulbIcon} />
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
};
