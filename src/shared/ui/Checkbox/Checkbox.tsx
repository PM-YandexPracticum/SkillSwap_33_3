import React, { useState } from 'react';
import styles from './Checkbox.module.css';
import CheckboxEmptyIcon from '../../../assets/svg/icons/checkbox-empty.svg?react';
import CheckboxDoneIcon from '../../../assets/svg/icons/checkbox-done.svg?react';

interface IconProps {
  className?: string;
}

const TypedCheckboxEmptyIcon = CheckboxEmptyIcon as React.FC<IconProps>;
const TypedCheckboxDoneIcon = CheckboxDoneIcon as React.FC<IconProps>;

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  children,
  checked,
  onChange,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(
    checked || props.defaultChecked || false
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <label className={styles.wrapper}>
      <input
        type="checkbox"
        className={styles.checkboxInput}
        checked={checked !== undefined ? checked : isChecked}
        onChange={handleChange}
        {...props}
      />
      {checked !== undefined ? (
        checked ? (
          <TypedCheckboxDoneIcon className={styles.checkboxIcon} />
        ) : (
          <TypedCheckboxEmptyIcon className={styles.checkboxIcon} />
        )
      ) : isChecked ? (
        <TypedCheckboxDoneIcon className={styles.checkboxIcon} />
      ) : (
        <TypedCheckboxEmptyIcon className={styles.checkboxIcon} />
      )}
      {children && <span className={styles.label}>{children}</span>}
    </label>
  );
};
