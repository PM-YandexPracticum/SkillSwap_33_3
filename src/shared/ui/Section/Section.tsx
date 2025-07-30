import React from 'react';

import styles from './Section.module.css';

interface SectionProps {
  title?: React.ReactNode;
  button?: React.ReactNode;
  children?: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  title,
  button,
  children,
}) => {
  const hasHeader = Boolean(title || button);

  return (
    <section className={styles['section-wrapper']}>
      {hasHeader && (
        <div className={styles['title-wrapper']}>
          {typeof title === 'string' ? (
            <h2 className={styles['section-title']}>{title}</h2>
          ) : (
            title
          )}
          {button}
        </div>
      )}
      {children && <div className={styles['card-wrapper']}>{children}</div>}
    </section>
  );
};
