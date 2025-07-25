import type { FC, InputHTMLAttributes } from 'react';
import styles from './FormInput.module.css';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  placeholder: string;
  error?: string;
}

export const FormInput: FC<FormInputProps> = ({
  title,
  placeholder,
  className,
  error,
  ...props
}) => {
  return (
    <label className={`${styles.label} ${className || ''}`}>
      <span className={styles.title}>{title}</span>
      <input
        type="text"
        className={`${styles.input} ${error ? styles.error : ''}`}
        placeholder={placeholder}
        {...props}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </label>
  );
};
