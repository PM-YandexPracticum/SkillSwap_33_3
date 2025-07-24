import clsx from 'clsx';
import React from 'react';

import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'transparent';
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', children, ...props }, ref) => {
    const className = clsx(styles.button, {
      [styles['button-primary']]: variant === 'primary',
      [styles['button-secondary']]: variant === 'secondary',
      [styles['button-tertiary']]: variant === 'tertiary',
      [styles['button-transparent']]: variant === 'transparent',
    });

    return (
      <button ref={ref} className={className} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
