import { useState, useRef } from 'react';
import clsx from 'clsx';
import styles from './ComboInput.module.css';
import ArrowIcon from '../../../assets/svg/icons/chevron-down.svg?react';
import CloseIcon from '../../../assets/svg/icons/cross.svg?react';
import { useClickOutside } from '../../hooks/useClickOutside';
import { ValidationMessage } from '../ValidationMessage/ValidationMessage';
import { SelectOption } from '../SelectOption';

interface Option {
  label: string;
  value: string;
}

interface ComboInputProps {
  label?: string;
  placeholder?: string;
  options: Option[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  error?: string;
}

export function ComboInput({
  label,
  placeholder,
  options,
  defaultValue = '',
  onChange,
  error,
}: ComboInputProps) {
  const [query, setQuery] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside(wrapperRef, () => setIsOpen(false));

  const filtered = options.filter((opt) =>
    opt.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
    onChange?.(e.target.value);
  };

  const handleSelect = ({ value, label }: Option) => {
    setQuery(label);
    setIsOpen(false);
    onChange?.(value);
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
    onChange?.('');
  };

  const handleToggle = () => {
    setIsOpen((open) => !open);
    inputRef.current?.focus();
  };

  return (
    <div
      ref={wrapperRef}
      className={clsx(styles.wrapper, isOpen && styles.active)}
    >
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          className={clsx(
            styles.input,
            isOpen && styles.input_open,
            error && styles.error
          )}
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
        />
        {query ? (
          <button
            type="button"
            className={styles.input__button}
            aria-label="Clear input"
            onClick={handleClear}
          >
            <CloseIcon />
          </button>
        ) : (
          <button
            type="button"
            className={styles.input__button}
            aria-label={isOpen ? 'Close dropdown' : 'Open dropdown'}
            onClick={handleToggle}
          >
            <ArrowIcon className={clsx(isOpen && styles.arrow_open)} />
          </button>
        )}
      </div>
      <ul
        className={clsx(styles.list, 'scrollY', isOpen && styles.list_visible)}
      >
        {filtered.length > 0 ? (
          filtered.map((opt) => (
            <li key={opt.value}>
              <SelectOption value={opt.value} onClick={() => handleSelect(opt)}>
                {opt.label}
              </SelectOption>
            </li>
          ))
        ) : (
          <li className={clsx(styles.option, styles.option_inactive)}>
            Ничего не найдено
          </li>
        )}
      </ul>
      <ValidationMessage error={error} />
    </div>
  );
}
