import { getFirebaseAdmin } from 'next-firebase-auth';

export const connect = async (onConnected: (userAdress: string) => void) => {
  if (!window.ethereum) {
    throw new Error('MetaMask extension needs to be installed');
  }

  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });

  const selectedAccount = accounts[0];

  onConnected(selectedAccount);
};

export const checkIfWalletIsConnected = async (
  onConnected: (userAdress: string) => void,
) => {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({
      method: 'eth_accounts',
    });

    if (accounts.length > 0) {
      const account = accounts[0];
      onConnected(account);
      return;
    }
  }
};
