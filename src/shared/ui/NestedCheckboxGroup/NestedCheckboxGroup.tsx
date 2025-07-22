import React, { useState } from 'react';
import { Checkbox } from '../Checkbox';
import styles from './NestedCheckboxGroup.module.css';
import type { NestedCheckboxGroupProps } from './types';

export const NestedCheckboxGroup: React.FC<NestedCheckboxGroupProps> = ({
  title,
  children,
  defaultExpanded = false,
  className,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [hovered, setHovered] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={`${styles.group} ${className || ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.header} onClick={toggleExpand}>
        <Checkbox className={styles.checkbox} />

        <span className={styles.title}>{title}</span>

        <span className={styles.arrow}>
          {expanded ? '↑' : hovered ? '↓' : null}
        </span>
      </div>

      {expanded && <div className={styles.children}>{children}</div>}
    </div>
  );
};
