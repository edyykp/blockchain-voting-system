import { useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { Button, Input, Modal } from '@packages/components';
import { registerUser } from '@packages/network';

import styles from './EmailModal.module.css';
import { useEmailModalContext } from '../../config/SetEmailModalContext/state';

export type EmailModalProps = {
  show: boolean;
  setShowModal: (show: boolean) => void;
  walletAddress?: string;
};

export const EmailModal = ({
  show,
  setShowModal,
  walletAddress,
}: EmailModalProps) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | undefined>();
  const router = useRouter();
  const { setShow } = useEmailModalContext();

  const storeEmail = async () => {
    if (!emailRef.current?.value) {
      setError('Please insert an email address');
    }
    const { error, status } = await registerUser(
      emailRef.current?.value!,
      '',
      walletAddress || null,
    );

    if (status === 201) {
      setShow(false);
      router.push('/dashboard');
      return;
    }

    if (status !== 201) {
      setError(error);
    }
  };

  return (
    <Modal
      show={show}
      onClose={() => setShowModal(false)}
      title="Set up your email"
      children={
        <div className={styles.container} data-testid="email-modal">
          {error && <div className={styles.errorWrapper}>{error}</div>}
          <Input field="email" type="text" isRequired inputRef={emailRef} />
          <Button
            theme="primary"
            size="lg"
            buttonText="Set email and log in"
            onClick={(event) => {
              event?.preventDefault();
              storeEmail();
            }}
          />
        </div>
      }
      theme="dark"
    />
  );
};
