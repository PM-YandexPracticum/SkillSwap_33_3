import React from 'react';
import styles from './WelcomeSection.module.css';
import lightBulbIcon from '../../assets/svg/light-bulb.svg';

interface WelcomeSectionProps {
  title: string;
  description: string;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  title,
  description,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <img src={lightBulbIcon} alt="Идея" className={styles.lightBulbIcon} />
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
};
