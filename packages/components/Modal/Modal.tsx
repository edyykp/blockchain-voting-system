import { MouseEvent, ReactNode, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';

import styles from './Modal.module.css';

type ModalProps = {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
  theme: 'dark' | 'light';
  title?: string;
};

export const Modal = ({
  show,
  onClose,
  children,
  title,
  theme,
}: ModalProps) => {
  const modalWrapper = useRef<HTMLDivElement | null>(null);

  const handleCloseClick = (event: globalThis.MouseEvent | MouseEvent) => {
    onClose();
    event.preventDefault();
  };

  useEffect(() => {
    function handleClickOutside(event: globalThis.MouseEvent) {
      if (
        modalWrapper.current &&
        !modalWrapper.current.contains(event.target as HTMLDivElement)
      ) {
        handleCloseClick(event);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalWrapper]);

  if (!show) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div
        className={`${styles.wrapper} ${
          theme === 'dark' && styles.darkBackground
        }`}
        ref={modalWrapper}
      >
        <div className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          <FaTimes className={styles.icon} onClick={handleCloseClick} />
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};
