import firebase from 'firebase';

export const getUserByEmail = async (email: string) => {
  const db = firebase.firestore();
  const users = await db.collection('users').get();
  const user = users.docs.find((user) => user.data()['email'] === email);

  return user;
};
