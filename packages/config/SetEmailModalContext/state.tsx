import React from 'react';
import { createContext, useContext, useState } from 'react';

import { EmailModal } from '@packages/core';

interface EmailModalContextInterface {
  setShow: (set: boolean) => void;
  setWalletAddress: (_: string) => void;
}
const EmailModalContext = createContext<EmailModalContextInterface>({
  setShow: (_: boolean) => {},
  setWalletAddress: (_: string) => {},
});

interface EmailModalWrapperProps {
  children: React.ReactNode;
}

export const EmailModalWrapper = ({ children }: EmailModalWrapperProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | undefined>();

  return (
    <EmailModalContext.Provider
      value={{
        setShow,
        setWalletAddress,
      }}
    >
      <EmailModal
        show={show}
        setShowModal={setShow}
        walletAddress={walletAddress}
      />
      {children}
    </EmailModalContext.Provider>
  );
};

export const useEmailModalContext = () => {
  return useContext(EmailModalContext);
};
