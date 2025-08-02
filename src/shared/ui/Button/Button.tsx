import clsx from 'clsx';
import React from 'react';

import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'transparent' | 'outline';
  startIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', children, startIcon, ...props }, ref) => {
    const className = clsx(styles.button, {
      [styles['button-primary']]: variant === 'primary',
      [styles['button-secondary']]: variant === 'secondary',
      [styles['button-tertiary']]: variant === 'tertiary',
      [styles['button-transparent']]: variant === 'transparent',
      [styles['button-outline']]: variant === 'outline',
    });

    return (
      <button ref={ref} className={className} {...props}>
        {startIcon && <span className={styles.startIcon}>{startIcon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
