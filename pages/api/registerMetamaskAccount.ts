import { getFirebaseAdmin } from 'next-firebase-auth';
import { NextApiRequest, NextApiResponse } from 'next';

import { initAuth } from '@packages/config';

initAuth();

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (!req.body.email) {
    return res.status(500).json({ error: 'Unexpected error' });
  }

  const reqEmail = req.body.email;

  const db = getFirebaseAdmin().firestore();
  //getFirebaseAdmin().auth().
  const users = await db.collection('users').get();

  if (users.docs.find((user) => user.data()['email'] === reqEmail)) {
    return res.status(409).json({ error: 'Email is already in use' });
  }

  //users.docs.push({email: reqEmail})

  return res
    .status(401)
    .json({ error: 'No email associated with this wallet' });
};

export default handler;
