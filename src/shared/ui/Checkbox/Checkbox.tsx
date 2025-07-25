import React from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({ children, ...props }) => {
  return (
    <label className={styles.wrapper}>
      <input type="checkbox" className={styles.checkbox} {...props} />
      {children && <span className={styles.label}>{children}</span>}
    </label>
  );
};
