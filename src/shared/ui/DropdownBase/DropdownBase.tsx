import React, { useEffect, useRef, useState } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import styles from './DropdownBase.module.css';

type DropdownBaseProps = {
  onClose: () => void;
  children: React.ReactNode;
};

export const DropdownBase: React.FC<DropdownBaseProps> = ({
  onClose,
  children,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useClickOutside(dropdownRef, onClose);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 10);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div ref={dropdownRef} className={styles.dropdown} data-visible={visible}>
      {children}
    </div>
  );
};
