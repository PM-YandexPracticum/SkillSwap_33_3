import type React from 'react';

import { Button } from '../Button';

import ChevronRightIcon from '../../../assets/svg/icons/chevron-right.svg?react';

import styles from './Section.module.css';

interface SectionProps {
  title: string;
  buttonTitle: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  title,
  buttonTitle,
  onClick,
  children,
}) => {
  return (
    <section className={styles['section-wrapper']}>
      <div className={styles['title-wrapper']}>
        <h2>{title}</h2>
        <Button
          style={{
            width: 'fit-content',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          onClick={onClick}
          variant="tertiary"
        >
          {buttonTitle}
          <ChevronRightIcon />
        </Button>
      </div>
      <div className={styles['card-wrapper']}>{children}</div>
    </section>
  );
};
