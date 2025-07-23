import { useState } from 'react';
import styles from './NestedCheckboxGroup.module.css';
import ArrowDownIcon from '../../../assets/svg/icons/chevron-down.svg';
import ArrowUpIcon from '../../../assets/svg/icons/chevron-up.svg';

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
  const [isHovered, setIsHovered] = useState(false);

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newMode = mode === 'none' ? 'all' : 'none';
    onChange(title, newMode);
  };

  return (
    <div className={`${styles.group} ${className || ''}`}>
      <div
        className={styles.header}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {}
        <div className={styles.checkboxArea} onClick={handleCheckboxClick}>
          <input
            type="checkbox"
            className={styles.triStateCheckbox}
            checked={mode === 'all'}
            ref={(el) => {
              if (el) {
                el.indeterminate = mode === 'some';
              }
            }}
            onChange={() => {}}
          />
          <span className={styles.checkboxVisual} />
        </div>

        {}
        <span className={styles.titleArea} onClick={toggleExpand}>
          <span className={styles.title}>{title}</span>

          {/* Стрелка */}
          <div className={styles.arrowWrapper}>
            {expanded ? (
              <ArrowUpIcon className={styles.arrow} />
            ) : isHovered ? (
              <ArrowDownIcon className={styles.arrow} />
            ) : null}
          </div>
        </span>
      </div>

      {expanded && <div className={styles.children}>{children}</div>}
    </div>
  );
};

export type { NestedCheckboxGroupProps };
