import firebase from 'firebase';

export const getUserByWalletAddress = async (walletAddress: string) => {
  const db = firebase.firestore();
  const users = await db.collection('users').get();
  const user = users.docs.find(
    (user) => user.data()['walletAddress'] === walletAddress,
  );

  return user;
};
