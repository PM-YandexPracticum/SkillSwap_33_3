import React, { useId } from 'react';
import styles from './TextArea.module.css';
import { ValidationMessage } from '../ValidationMessage/ValidationMessage';

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  svg?: React.ReactNode;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  svg,
  error,
  ...props
}) => {
  const id = useId();

  return (
    <>
      <div className={styles.container}>
        {label && (
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
        )}
        {!svg ? (
          <textarea
            id={id}
            className={`${styles.textarea} ${error ? styles.error : ''}`}
            {...props}
          />
        ) : (
          <div className={styles['svg-wrapper']}>
            <textarea
              id={id}
              className={`${styles.textarea} ${error ? styles.error : ''}`}
              {...props}
            />
            {svg}
          </div>
        )}
      </div>
      <ValidationMessage error={error} />
    </>
  );
};
