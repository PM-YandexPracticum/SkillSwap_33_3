import clsx from 'clsx';
import React, { useState, useRef, useEffect } from 'react';

import styles from './ComboInput.module.css';

interface Option {
  label: string;
  value: string;
}

interface ComboInput {
  label?: string;
  defaultValue?: string;
  options: Option[];
  placeholder?: string;
  onChange?: (value: string) => void;
}

export const ComboInput: React.FC<ComboInput> = ({
  label,
  defaultValue,
  options,
  placeholder,
  onChange,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(query.toLowerCase())
  );

  const limitedOptions = filteredOptions.slice(0, 30);

  const handleSelect = (option: Option) => {
    setQuery(option.label);
    setIsOpen(false);
    setHighlightedIndex(-1);
    onChange?.(option.value);
  };

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

  useEffect(() => {
    if (defaultValue) {
      const defaultOption = options.find((opt) => opt.value === defaultValue);
      if (defaultOption) {
        setQuery(defaultOption.label);
      }
    }
  }, [defaultValue, options]);

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < limitedOptions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : limitedOptions.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < limitedOptions.length) {
        handleSelect(limitedOptions[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  useEffect(() => {
    if (highlightedIndex === -1) return;
    const list = wrapperRef.current?.querySelector('ul');
    const item = list?.children[highlightedIndex] as HTMLElement | undefined;
    if (item && list) {
      const itemTop = item.offsetTop;
      const itemBottom = itemTop + item.offsetHeight;
      const listScrollTop = list.scrollTop;
      const listHeight = list.clientHeight;

      if (itemTop < listScrollTop) {
        list.scrollTop = itemTop;
      } else if (itemBottom > listScrollTop + listHeight) {
        list.scrollTop = itemBottom - listHeight;
      }
    }
  }, [highlightedIndex]);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <label>
        {label}
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setHighlightedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={onInputKeyDown}
          className={clsx(styles.input, {
            [styles.input_open]: isOpen,
          })}
          autoComplete="off"
        />
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
              className={clsx(styles.list__item, {
                [styles.list__item_highlighted]: i === highlightedIndex,
              })}
              onMouseEnter={() => setHighlightedIndex(i)}
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
