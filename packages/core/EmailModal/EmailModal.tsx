import { Button, Input, Modal } from '@packages/components';

import styles from './EmailModal.module.css';

export type EmailModalProps = {
  show: boolean;
  setShowModal: (show: boolean) => void;
};
export const EmailModal = ({ show, setShowModal }: EmailModalProps) => {
  return (
    <Modal
      show={show}
      onClose={() => setShowModal(false)}
      title="Set up your email"
      children={
        <div className={styles.container} data-testid="email-modal">
          <Input field="email" type="text" isRequired />
          <Button theme="primary" size="lg" buttonText="Set email and log in" />
        </div>
      }
      theme="dark"
    />
  );
};
