import React, { useState } from 'react';
import clsx from 'clsx';
import { Button } from '../Button';
import styles from './FilterSection.module.css';
import chevronDownIcon from '../../../assets/svg/icons/chevron-down.svg';

interface FilterSectionProps {
  title?: string;
  buttonTitle?: string;
  maxVisible?: number;
  children: React.ReactNode;
  isExpandedByDefault?: boolean;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  buttonTitle = 'Показать все',
  maxVisible = Infinity,
  children,
  isExpandedByDefault = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(isExpandedByDefault);
  const childrenArray = React.Children.toArray(children);
  const hasHiddenItems = childrenArray.length > maxVisible;
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, maxVisible);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.section}>
      {title && (
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
        </div>
      )}
      <div className={styles.content}>{visibleChildren}</div>
      {hasHiddenItems && (
        <Button
          variant="transparent"
          onClick={toggleExpand}
          className={styles.button}
        >
          {isExpanded ? 'Свернуть' : buttonTitle}
          <img
            src={chevronDownIcon}
            alt="Стрелка вниз"
            className={clsx(styles.chevronIcon, isExpanded && styles.rotated)}
            onClick={toggleExpand}
          />
        </Button>
      )}
    </div>
  );
};
