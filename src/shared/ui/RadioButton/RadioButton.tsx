import React from 'react';
import styles from './RadioButton.module.css';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
}

export const RadioButton: React.FC<RadioProps> = ({ children, ...props }) => {
  return (
    <label className={styles.wrapper}>
      <input type="radio" className={styles.radio} {...props} />
      {children && <span className={styles.label}>{children}</span>}
    </label>
  );
};
