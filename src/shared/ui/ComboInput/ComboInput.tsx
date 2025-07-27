import clsx from 'clsx';
import React, { useState, useRef, useEffect } from 'react';

import styles from './ComboInput.module.css';

import ChevronDown from '../../../assets/svg/icons/chevron-down.svg?react';
import Cross from '../../../assets/svg/icons/cross.svg?react';

interface Option {
  label: string;
  value: string;
}

interface ComboInputProps {
  label?: string;
  defaultValue?: string;
  options: Option[];
  placeholder?: string;
  onChange?: (value: string) => void;
}

export const ComboInput: React.FC<ComboInputProps> = ({
  label,
  defaultValue,
  options,
  placeholder,
  onChange,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(query.toLowerCase())
  );

  const limitedOptions = filteredOptions.slice(0, 30);

  const handleInputChange = (value: string) => {
    setQuery(value);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleSelect = (option: Option) => {
    setQuery(option.label);
    setIsOpen(false);
    setHighlightedIndex(-1);
    onChange?.(option.value);
  };

  const handleClear = () => {
    setQuery('');
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % limitedOptions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev <= 0 ? limitedOptions.length - 1 : prev - 1
      );
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelect(limitedOptions[highlightedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  const scrollToHighlighted = () => {
    const list = wrapperRef.current?.querySelector('ul');
    const item = list?.children[highlightedIndex] as HTMLElement | undefined;
    if (item && list) {
      const itemTop = item.offsetTop;
      const itemBottom = itemTop + item.offsetHeight;
      const listTop = list.scrollTop;
      const listHeight = list.clientHeight;

      if (itemTop < listTop) list.scrollTop = itemTop;
      else if (itemBottom > listTop + listHeight)
        list.scrollTop = itemBottom - listHeight;
    }
  };

  useEffect(() => {
    if (highlightedIndex !== -1) scrollToHighlighted();
  }, [highlightedIndex]);

  useEffect(() => {
    if (defaultValue) {
      const defaultOpt = options.find((opt) => opt.value === defaultValue);
      if (defaultOpt) setQuery(defaultOpt.label);
    }
  }, [defaultValue, options]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <label>
        {label}
        <div className={styles.inputWrapper}>
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            className={clsx(styles.input, {
              [styles.input_open]: isOpen,
            })}
            autoComplete="off"
          />
          <button
            type="button"
            className={styles.input__button}
            onClick={isOpen ? handleClear : () => setIsOpen(true)}
          >
            {isOpen ? <Cross /> : <ChevronDown />}
          </button>
        </div>
      </label>

      <ul
        className={clsx(styles.list, {
          [styles.list_visible]: isOpen,
        })}
      >
        {limitedOptions.length > 0 ? (
          limitedOptions.map((opt, i) => (
            <li
              key={opt.value}
              onClick={() => handleSelect(opt)}
              onMouseEnter={() => setHighlightedIndex(i)}
              className={clsx(styles.list__item, {
                [styles.list__item_highlighted]: i === highlightedIndex,
              })}
            >
              {opt.label}
            </li>
          ))
        ) : (
          <li className={styles.list__item_inactive}>Ничего не найдено</li>
        )}
      </ul>
    </div>
  );
};
