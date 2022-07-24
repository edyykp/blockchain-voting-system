import firebase from 'firebase';

export const signInUser = async (userEmail: string, password: string) => {
  try {
    const idToken = await (
      await firebase
        .auth(firebase.app())
        .signInWithEmailAndPassword(userEmail, password)
    ).user?.getIdToken();

    const data = await fetch('/login', {
      method: 'POST',
      headers: {
        Authorization: idToken || '',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const res = await data.json();

    return {
      status: data.status,
      error: res.error,
    };
  } catch (error: any) {
    return { error: error.message, code: error.code };
  }
};
