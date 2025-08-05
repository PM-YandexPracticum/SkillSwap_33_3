import React from 'react';
import clsx from 'clsx';
import styles from './SelectOption.module.css';

interface SelectOptionProps {
  children: React.ReactNode;
  value: string;
  onClick: (value: string) => void;
}

export const SelectOption: React.FC<SelectOptionProps> = ({
  children,
  value,
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick(e.currentTarget.value);
  };

  return (
    <button
      type="button"
      className={clsx(styles.option)}
      value={value}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
