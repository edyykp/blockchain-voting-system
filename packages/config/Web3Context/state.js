import { createContext, useContext, useState } from 'react';
import React from 'react';
import Web3 from 'web3';
import contract from '@truffle/contract';

const Web3Context = createContext();

export const Web3Wrapper = ({ children }) => {
  const [ account, setAccount ] = useState();

  const web3 = new Web3(process.env.NEXT_PUBLIC_BLOCKCHAIN_URL);

  web3.eth
    .getAccounts()
    .then((accounts) => setAccount(accounts[ 0 ]))
    .catch((error) => console.error(error.message));

  const contractArtifact = require('../../../build/contracts/Voting.json');
  const votingContract = contract(contractArtifact);
  votingContract.setProvider(process.env.NEXT_PUBLIC_BLOCKCHAIN_URL);

  return (
    <Web3Context.Provider value={{ votingContract, account }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  return useContext(Web3Context);
};
