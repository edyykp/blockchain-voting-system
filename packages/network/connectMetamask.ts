export const connect = async (onConnected: (userAdress: string) => void) => {
  if (!window.ethereum) {
    alert('Get MetaMask!');
    return;
  }

  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });

  onConnected(accounts[0]);
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
