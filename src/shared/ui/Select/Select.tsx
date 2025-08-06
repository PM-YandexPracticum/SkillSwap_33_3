import { useState, useRef, useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import styles from './Select.module.css';
import chevronDownIcon from '../../../assets/svg/icons/chevron-down.svg';
import clsx from 'clsx';
import { useUpdateEffect } from '../../hooks/useUpdateEffect.ts';
import { ValidationMessage } from '../ValidationMessage/ValidationMessage.tsx';

interface SelectProps {
  label?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
  dropdownClassName?: string;
  valueClassName?: string;
  error?: string;
}

export const Select: FC<SelectProps> = ({
  label,
  value,
  placeholder = 'Выберите вариант',
  disabled = false,
  children,
  className,
  valueClassName,
  dropdownClassName,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => !disabled && setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useUpdateEffect(() => {
    closeDropdown();
  }, [value]);

  return (
    <div
      className={clsx(styles.selectContainer, isOpen && styles.active)}
      ref={selectRef}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
    >
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.selectWrapper}>
        <div
          className={clsx(
            styles.select,
            disabled && styles.disabled,
            error && styles.error,
            className
          )}
          onClick={toggleDropdown}
          role="combobox"
          aria-disabled={disabled}
        >
          <div className={clsx(styles.selectedValue, valueClassName)}>
            {value ? (
              value
            ) : (
              <span className={styles.placeholder}>{placeholder}</span>
            )}
          </div>
          <div className={clsx(styles.arrow, isOpen && styles.open)}>
            <img src={chevronDownIcon} alt="Стрелка вниз" aria-hidden="true" />
          </div>
        </div>
        <div
          className={clsx(
            styles.dropdown,
            isOpen && styles.open,
            dropdownClassName
          )}
          role="listbox"
        >
          {children}
        </div>
      </div>
      <ValidationMessage error={error} />
    </div>
  );
};
