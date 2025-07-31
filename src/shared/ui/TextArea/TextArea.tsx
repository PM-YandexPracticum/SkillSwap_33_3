import React, { useId } from 'react';
import styles from './TextArea.module.css';

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  svg?: React.ReactNode;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, svg, ...props }) => {
  const id = useId();

  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      {!svg ? (
        <textarea id={id} className={styles.textarea} {...props} />
      ) : (
        <div className={styles['svg-wrapper']}>
          <textarea id={id} className={styles.textarea} {...props} />
          {svg}
        </div>
      )}
    </div>
  );
};
