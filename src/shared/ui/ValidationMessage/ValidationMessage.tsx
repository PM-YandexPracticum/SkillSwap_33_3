import type { FC } from 'react';
import styles from './ValidationMessage.module.css';

interface ValidationMessageProps {
  error?: string;
}

export const ValidationMessage: FC<ValidationMessageProps> = ({ error }) => {
  return error && <span className={styles.validationMessage}>{error}</span>;
};
