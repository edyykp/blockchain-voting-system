import Web3 from 'web3';

export const useWeb3 = () => {
  if (process.env.BLOCKCHAIN_URL) {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_URL),
    );

    const accounts = web3.eth.getAccounts();

    return {
      accounts,
      web3,
    };
  }

  return {
    accounts: undefined,
    web3: undefined,
  };
};

export const useContracts = () => {
  const { web3 } = useWeb3();

  if (!web3) {
    return {
      voters: undefined,
      candidate: undefined,
    };
  }

  return {
    voters: new web3.eth.Contract(
      CONTACT_ABI.CONTACT_ABI,
      CONTACT_ADDRESS.CONTACT_ADDRESS,
    ),
    candidate: new web3.eth.Contract(
      CONTACT_ABI.CONTACT_ABI,
      CONTACT_ADDRESS.CONTACT_ADDRESS,
    ),
  };
};
