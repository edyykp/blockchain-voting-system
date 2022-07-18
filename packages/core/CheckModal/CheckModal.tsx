import { Button, Modal } from '@packages/components';
import { useSiteProperties } from '@packages/config';

import styles from './CheckModal.module.css';

export type CheckModalProps = {
  show: boolean;
  setShowModal: (show: boolean) => void;
  voteFinishedCallback: () => void;
  driverName?: string;
};
export const CheckModal = ({
  show,
  setShowModal,
  voteFinishedCallback,
  driverName,
}: CheckModalProps) => {
  const valueOf = useSiteProperties();
  const text = {
    title: valueOf('check_modal_title', [driverName || '']),
    voteButton: valueOf('check_modal_yes_button'),
    discardButton: valueOf('check_modal_no_button'),
  };

  const modalContent = (
    <div className={styles.container} data-testid="check-modal">
      <h1 className={styles.title}>{text.title}</h1>
      <div className={styles.buttonsWrapper}>
        <Button
          theme="primary"
          size="md"
          buttonText={text.voteButton}
          onClick={() => {
            setShowModal(false);
            voteFinishedCallback();
          }}
        />
        <Button
          theme="ternary"
          size="md"
          buttonText={text.discardButton}
          onClick={() => setShowModal(false)}
        />
      </div>
    </div>
  );

  return (
    <Modal
      children={modalContent}
      show={show}
      onClose={() => setShowModal(false)}
      theme="light"
    />
  );
};
