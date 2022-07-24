import firebase from 'firebase';

import { setAuthCookies } from 'next-firebase-auth';
import { NextApiRequest, NextApiResponse } from 'next';

import { initAuth } from '@packages/config';

initAuth();
try {
  firebase.initializeApp({
    apiKey: 'AIzaSyD9sUbajIjQUxJxNheqHH2h4sZnxWW5Kp0',
    authDomain: process.env.NEXT_PUBLIC_HOSTNAME,
    projectId: 'voting-system-cca07',
    storageBucket: 'voting-system-cca07.appspot.com',
  });
} catch (e: any) {
  console.error(e.message);
}

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    await setAuthCookies(req, res);
  } catch (e: any) {
    return res.status(e.code).json({ error: e.message });
  }
  return res.status(200).json({ success: true });
};

export default handler;
