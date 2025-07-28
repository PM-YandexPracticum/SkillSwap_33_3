import React, { FC, ReactNode, useState, useRef, useEffect } from 'react';
import styles from './Select.module.css';
import chevronDownIcon from '../../../assets/svg/icons/chevron-down.svg';
import clsx from 'clsx';
import { Checkbox } from '../Checkbox';

interface SelectProps {
  label?: string;
  value?: string | string[];
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  children: ReactNode;
  onChange?: (value: string | string[]) => void;
}

export const Select: FC<SelectProps> = ({
  label,
  value,
  placeholder = 'Выберите вариант',
  disabled = false,
  multiple = false,
  children,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => !disabled && setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleOptionClick = (optionValue: string) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValue = currentValues.includes(optionValue)
        ? currentValues.filter((v) => v !== optionValue)
        : [...currentValues, optionValue];
      onChange?.(newValue);
    } else {
      onChange?.(optionValue);
      closeDropdown();
    }
  };

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

  const displayValue = multiple
    ? Array.isArray(value) && value.length > 0
      ? `Выбрано: ${value.length}`
      : placeholder
    : value || placeholder;

  const isOptionSelected = (optionValue: string) => {
    return multiple
      ? Array.isArray(value) && value.includes(optionValue)
      : value === optionValue;
  };

  return (
    <div
      className={clsx(styles.selectContainer, isOpen && styles.active)}
      ref={selectRef}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
    >
      {label && (
        <label className={styles.label} id={`${label}-label`}>
          {label}
        </label>
      )}
      <div className={styles.selectWrapper}>
        <div
          className={clsx(styles.select, disabled && styles.disabled)}
          onClick={toggleDropdown}
          role="combobox"
          aria-labelledby={`${label}-label`}
          aria-controls="select-dropdown"
          aria-disabled={disabled}
        >
          <div className={styles.selectedValue}>
            {!value ? (
              <span className={styles.placeholder}>{displayValue}</span>
            ) : (
              displayValue
            )}
          </div>
          <div className={clsx(styles.arrow, isOpen && styles.open)}>
            <img src={chevronDownIcon} alt="Стрелка вниз" aria-hidden="true" />
          </div>
        </div>
        <div
          className={clsx(styles.dropdown, isOpen && styles.open)}
          id="select-dropdown"
          role="listbox"
        >
          {React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return child;

            if (child.type === Checkbox) {
              return React.cloneElement(child, {
                checked: isOptionSelected(child.props.value),
                onChange: () => handleOptionClick(child.props.value),
                onClick: (e: React.MouseEvent) => e.stopPropagation(),
                role: 'option',
                'aria-selected': isOptionSelected(child.props.value),
              });
            }

            const optionValue =
              child.props['data-value'] ||
              child.props.children?.toString() ||
              '';
            return React.cloneElement(child, {
              onClick: (e: React.MouseEvent) => {
                e.stopPropagation();
                handleOptionClick(optionValue);
              },
              className: clsx(child.props.className, styles.option),
              role: 'option',
              'aria-selected': isOptionSelected(optionValue),
              'data-value': optionValue,
            });
          })}
        </div>
      </div>
    </div>
  );
};
