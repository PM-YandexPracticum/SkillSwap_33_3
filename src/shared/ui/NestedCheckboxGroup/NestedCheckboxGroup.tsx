import { useState } from 'react';
import styles from './NestedCheckboxGroup.module.css';
import ChevronDownIcon from '../../../assets/svg/icons/chevron-down.svg?react';
import CheckboxEmptyIcon from '../../../assets/svg/icons/checkbox-empty.svg?react';
import CheckboxDoneIcon from '../../../assets/svg/icons/checkbox-done.svg?react';
import CheckboxSomeIcon from '../../../assets/svg/icons/subtract.svg?react';
import clsx from 'clsx';

interface NestedCheckboxGroupProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  mode: 'none' | 'some' | 'all';
  onChange: (title: string, mode: 'none' | 'some' | 'all') => void;
}

export const NestedCheckboxGroup = ({
  title,
  children,
  className,
  mode,
  onChange,
}: NestedCheckboxGroupProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(title, mode);
  };

  const getCheckboxIcon = () => {
    switch (mode) {
      case 'all':
        return (
          <CheckboxDoneIcon
            className={styles.checkboxIcon}
            style={{ fill: 'var(--accent-primary)' }}
          />
        );
      case 'some':
        return (
          <CheckboxSomeIcon
            className={`${styles.checkboxIcon} ${styles.subtractIcon}`}
            style={{ fill: 'var(--accent-primary)' }}
          />
        );
      case 'none':
        return <CheckboxEmptyIcon className={styles.checkboxIcon} />;
      default:
        return <CheckboxEmptyIcon className={styles.checkboxIcon} />;
    }
  };

  return (
    <div className={`${styles.group} ${className || ''}`}>
      <div className={styles.header}>
        <div
          className={clsx(styles.checkboxArea)}
          onClick={handleCheckboxClick}
        >
          {getCheckboxIcon()}
        </div>

        <span className={styles.titleArea} onClick={toggleExpand}>
          <span className={styles.title}>{title}</span>
          <div className={styles.arrowWrapper}>
            <ChevronDownIcon
              className={clsx(styles.chevronIcon, expanded && styles.rotated)}
              onClick={toggleExpand}
            />
          </div>
        </span>
      </div>

      {expanded && <div className={styles.children}>{children}</div>}
    </div>
  );
};

export type { NestedCheckboxGroupProps };
