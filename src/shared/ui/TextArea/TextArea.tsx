import React, { useId } from 'react';
import styles from './TextArea.module.css';

export interface TextAreaProps {
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  svg?: React.ReactNode;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  svg,
}) => {
  const id = useId();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      {!svg ? (
        <textarea
          id={id}
          className={styles.textarea}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
        />
      ) : (
        <div className={styles['svg-wrapper']}>
          <textarea
            id={id}
            className={styles.textarea}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
          />
          {svg}
        </div>
      )}
    </div>
  );
};
