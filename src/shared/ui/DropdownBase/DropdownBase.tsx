import React, { useEffect, useRef, useState } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import styles from './DropdownBase.module.css';

type DropdownBaseProps = {
  onClose: () => void;
  children: React.ReactNode;
  isOpen?: boolean;
  triggerRef?: React.RefObject<HTMLElement | null>;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
};

export const DropdownBase: React.FC<DropdownBaseProps> = ({
  onClose,
  children,
  isOpen = true,
  onMouseEnter,
  onMouseLeave,
  className,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useClickOutside(dropdownRef, onClose);

  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        setVisible(true);
      }, 10);
      return () => clearTimeout(timeout);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`${styles.dropdown} ${className || ''}`}
      data-visible={visible}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};
