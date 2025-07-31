import {
  useState,
  useRef,
  Children,
  cloneElement,
  isValidElement,
} from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './ComboInput.module.css';
import ArrowIcon from '../../../assets/svg/icons/chevron-down.svg?react';
import CloseIcon from '../../../assets/svg/icons/cross.svg?react';
import { useClickOutside } from '../../hooks/useClickOutside';

interface ComboInputProps {
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  children?: ReactNode;
}

type ListItemProps = {
  value?: string;
  children?: ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
} & Record<string, unknown>;

export function ComboInput({
  label,
  placeholder,
  defaultValue = '',
  onChange,
  children,
}: ComboInputProps) {
  const [query, setQuery] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside(wrapperRef, () => setIsOpen(false));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
    onChange?.(e.target.value);
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

  const handleItemSelect = (value: string, label: string) => {
    setQuery(label);
    setIsOpen(false);
    onChange?.(value);
    inputRef.current?.focus();
  };

  const enhancedChildren = Children.map(children, (child) => {
    if (!isValidElement<ListItemProps>(child)) return child;

    const props = child.props as ListItemProps;
    const value = props.value || String(props.children);
    const label = String(props.children);

    return cloneElement<ListItemProps>(child, {
      ...props,
      onMouseDown: (e: React.MouseEvent) => {
        e.preventDefault();
        handleItemSelect(value, label);
        props.onClick?.(e);
      },
      className: clsx(styles.option, props.className),
    });
  });

  return (
    <div
      ref={wrapperRef}
      className={clsx(styles.wrapper, isOpen && styles.active)}
    >
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          className={clsx(styles.input, isOpen && styles.input_open)}
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
            aria-label={
              isOpen ? 'Список вариантов закрыт' : 'Список вариантов открыт'
            }
            onMouseDown={(e) => {
              e.preventDefault();
              handleToggle();
            }}
          >
            <ArrowIcon className={clsx(isOpen && styles.arrow_open)} />
          </button>
        )}
      </div>
      <ul className={clsx(styles.list, isOpen && styles.list_visible)}>
        {enhancedChildren?.length ? (
          enhancedChildren
        ) : (
          <li className={clsx(styles.option, styles.option_inactive)}>
            Ничего не найдено
          </li>
        )}
      </ul>
    </div>
  );
}
