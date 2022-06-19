import { VotedModal } from '@packages/core';
import React from 'react';
import { createContext, useContext, useState } from 'react';

interface VotedModalContextInterface {
  setVotedDriver: (name: string) => void;
}
const VotedModalContext = createContext<VotedModalContextInterface>({
  setVotedDriver: (_: string) => {},
});

interface VotedModalWrapperProps {
  children: React.ReactNode;
}

export const VotedModalWrapper = ({ children }: VotedModalWrapperProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [votedDriver, setVotedDriver] = useState<string | undefined>();

  React.useEffect(() => {
    if (votedDriver) {
      setShow(true);
    }
  }, [votedDriver]);

  return (
    <VotedModalContext.Provider
      value={{
        setVotedDriver,
      }}
    >
      <VotedModal
        show={show}
        setShowModal={setShow}
        driverName={votedDriver || ''}
      />
      {children}
    </VotedModalContext.Provider>
  );
};

export const useVotedModalContext = () => {
  return useContext(VotedModalContext);
};
