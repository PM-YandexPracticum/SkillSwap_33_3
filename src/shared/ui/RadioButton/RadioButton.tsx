import React from 'react';

import styles from './RadioButton.module.css';

type RadioProps = React.InputHTMLAttributes<HTMLInputElement>;

export const RadioButton: React.FC<RadioProps> = ({ ...props }: RadioProps) => {
  return <input type="radio" className={styles.radio} {...props} />;
};
