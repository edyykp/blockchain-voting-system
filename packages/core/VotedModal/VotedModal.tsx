import { Modal } from '@packages/components';
import { useSiteProperties } from '@packages/config';

import styles from './VotedModal.module.css';

export type VotedModalProps = {
  show: boolean;
  setShowModal: (show: boolean) => void;
  driverName: string;
};
export const VotedModal = ({
  show,
  setShowModal,
  driverName,
}: VotedModalProps) => {
  const valueOf = useSiteProperties();

  const text = {
    title: valueOf('voted_modal_title', [driverName || '']),
  };
  return (
    <Modal
      show={show}
      onClose={() => setShowModal(false)}
      children={
        <h1 className={styles.title} data-testid="voted-modal">
          {text.title}
        </h1>
      }
    />
  );
};
