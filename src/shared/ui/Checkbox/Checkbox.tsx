import React from 'react';

import styles from './Checkbox.module.css';

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Checkbox: React.FC<CheckboxProps> = ({
  ...props
}: CheckboxProps) => {
  return <input type="checkbox" className={styles.checkbox} {...props} />;
};
