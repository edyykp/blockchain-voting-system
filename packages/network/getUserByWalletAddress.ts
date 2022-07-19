import firebase from 'firebase';

export const getUserByWalletAddress = async (walletAddress: string) => {
  const db = firebase.firestore();
  const users = await db.collection('users').get();

  console.log(users.size);
  console.log(walletAddress);
  const user = users.docs.find(
    (user) => user.data()['walletAddress'] === walletAddress,
  );

  return user;
};
