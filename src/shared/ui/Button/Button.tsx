import clsx from 'clsx';
import React from 'react';

import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'transparent';
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  ...props
}: ButtonProps) => {
  const className = clsx(styles.button, {
    [styles['button-primary']]: variant === 'primary',
    [styles['button-secondary']]: variant === 'secondary',
    [styles['button-tertiary']]: variant === 'tertiary',
    [styles['button-transparent']]: variant === 'transparent',
  });

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};
