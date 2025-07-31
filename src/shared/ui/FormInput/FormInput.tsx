import type { FC, InputHTMLAttributes } from 'react';
import styles from './FormInput.module.css';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  error?: string;
  svg?: React.ReactNode;
}

export const FormInput: FC<FormInputProps> = ({
  title,
  className,
  error,
  svg,
  ...props
}) => {
  return (
    <label className={`${styles.label} ${className || ''}`}>
      <span className={styles.title}>{title}</span>
      {!svg ? (
        <input
          type="text"
          className={`${styles.input} ${error ? styles.error : ''}`}
          {...props}
        />
      ) : (
        <div className={styles['svg-wrapper']}>
          <input
            type="text"
            className={`${styles.input} ${error ? styles.error : ''}`}
            {...props}
          />
          {svg}
        </div>
      )}
      {error && <span className={styles.errorMessage}>{error}</span>}
    </label>
  );
};
