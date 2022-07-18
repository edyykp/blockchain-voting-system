import { EmailModal } from '@packages/core';
import React from 'react';
import { createContext, useContext, useState } from 'react';

interface EmailModalContextInterface {
  setShow: (set: boolean) => void;
}
const EmailModalContext = createContext<EmailModalContextInterface>({
  setShow: (_: boolean) => {},
});

interface VotedModalWrapperProps {
  children: React.ReactNode;
}

export const EmailModalWrapper = ({ children }: VotedModalWrapperProps) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <EmailModalContext.Provider
      value={{
        setShow,
      }}
    >
      <EmailModal show={show} setShowModal={setShow} />
      {children}
    </EmailModalContext.Provider>
  );
};

export const useEmailModalContext = () => {
  return useContext(EmailModalContext);
};
