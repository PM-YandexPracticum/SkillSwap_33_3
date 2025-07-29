import React, { useState } from 'react';
import styles from './Slider.module.css';
import ChevronIcon from '../../assets/svg/icons/chevron-right.svg?react';

interface SliderProps {
  label?: string;
  visible: number;
  children: React.ReactNode;
}

export const Slider: React.FC<SliderProps> = ({ label, visible, children }) => {
  const [startingPoint, setStartingPoint] = useState(0);
  const childrenArray = React.Children.toArray(children);
  const hasHiddenItems = childrenArray.length > visible;
  const visibleChildren = childrenArray.slice(
    startingPoint,
    startingPoint + visible
  );

  const canScrollNext =
    hasHiddenItems && startingPoint + visible < childrenArray.length;
  const canScrollPrev = startingPoint > 0;

  const handleNext = () => {
    if (canScrollNext) {
      setStartingPoint((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (canScrollPrev) {
      setStartingPoint((prev) => prev - 1);
    }
  };

  return (
    <div className={styles.container}>
      {label && <h2 className={styles.label}>{label}</h2>}

      <div className={styles.sliderWrapper}>
        {hasHiddenItems && canScrollPrev && (
          <button
            className={`${styles.button} ${styles.buttonPrev}`}
            onClick={handlePrev}
            aria-label="Previous cards"
          >
            <ChevronIcon className={styles.chevronIcon} />
          </button>
        )}

        <div className={styles.slider}>
          <div className={styles.items}>{visibleChildren}</div>
        </div>

        {hasHiddenItems && canScrollNext && (
          <button
            className={`${styles.button} ${styles.buttonNext}`}
            onClick={handleNext}
            aria-label="Next cards"
          >
            <ChevronIcon className={styles.chevronIcon} />
          </button>
        )}
      </div>
    </div>
  );
};
