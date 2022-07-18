import firebase from 'firebase';
import { NextApiRequest, NextApiResponse } from 'next';
import { getFirebaseAdmin, setAuthCookies } from 'next-firebase-auth';

import { initAuth } from '@packages/config';

initAuth();

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  console.log(req.headers.host);
  try {
    firebase.initializeApp({
      apiKey: 'AIzaSyD9sUbajIjQUxJxNheqHH2h4sZnxWW5Kp0',
      authDomain: req.headers.host,
      projectId: 'voting-system-cca07',
      storageBucket: 'voting-system-cca07.appspot.com',
    });
  } catch (e: any) {
    console.log(e.message);
  }

  if (!req.body.userAddress) {
    return res.status(500).json({ error: 'Unexpected error' });
  }
  const reqAddress = req.body.userAddress;

  const db = getFirebaseAdmin().firestore();
  const users = await db.collection('users').get();

  const user = users.docs.find(
    (user) => user.data()['wallet_address'] === reqAddress,
  );

  const userEmail = user?.data()['email'];

  if (user && userEmail) {
    try {
      const idToken = await (
        await firebase
          .auth(firebase.app())
          .signInWithEmailAndPassword(userEmail, 'defaultMetamask')
      ).user?.getIdToken();

      req.headers.authorization = idToken;
      await setAuthCookies(req, res);
    } catch (e: any) {
      console.error(e);
      return res.status(e.code).json({ error: e.message });
    }

    return res.status(200).json({ success: true });
  }

  return res
    .status(401)
    .json({ error: 'No email associated with this wallet' });
};

export default handler;
