import { useState } from 'react';
import { Checkbox } from '../Checkbox';
import styles from './NestedCheckboxGroup.module.css';
import ArrowDownIcon from '../../assets/svg/chevron-down.svg';
import ArrowUpIcon from '../../assets/svg/chevron-up.svg';

interface NestedCheckboxGroupProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}

export const NestedCheckboxGroup = ({
  title,
  children,
  defaultExpanded = false,
  className,
}: NestedCheckboxGroupProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [isHovered, setIsHovered] = useState(false);

  const toggleExpand = () => setExpanded(!expanded);

  return (
    <div className={`${styles.group} ${className || ''}`}>
      <div
        className={styles.header}
        onClick={toggleExpand}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Checkbox className={styles.checkbox} />
        <span className={styles.title}>{title}</span>

        <div className={styles.arrowWrapper}>
          {expanded ? (
            <ArrowUpIcon className={styles.arrow} />
          ) : isHovered ? (
            <ArrowDownIcon className={styles.arrow} />
          ) : null}
        </div>
      </div>

      {expanded && <div className={styles.children}>{children}</div>}
    </div>
  );
};
export type { NestedCheckboxGroupProps };
