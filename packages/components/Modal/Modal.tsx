import { MouseEvent, ReactNode, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';

import styles from './Modal.module.css';

type ModalProps = {
  show: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export const Modal = ({ show, onClose, children, title }: ModalProps) => {
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
      <div className={styles.wrapper} ref={modalWrapper}>
        <div className={styles.header}>
          {title}
          <FaTimes className={styles.icon} onClick={handleCloseClick} />
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};
