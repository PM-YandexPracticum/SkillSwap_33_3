import React from 'react';

import styles from './Radio.module.css';

type RadioProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Radio: React.FC<RadioProps> = ({ ...props }: RadioProps) => {
  return <input type="radio" className={styles.radio} {...props} />;
};
