import firebase from 'firebase';

export const registerUser = async (
  email: string,
  password: string,
  walletAddress?: string | null,
) => {
  try {
    await firebase
      .auth(firebase.app())
      .createUserWithEmailAndPassword(
        email,
        walletAddress ? 'defaultMetamask' : password,
      );

    await firebase
      .firestore(firebase.app())
      .collection('users')
      .add({
        email: email,
        wallet_address: walletAddress ?? null,
      });

    return { error: undefined, status: 201 };
  } catch (error: any) {
    return { error: error.message, status: error.code };
  }
};
