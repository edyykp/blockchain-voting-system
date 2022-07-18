import { setAuthCookies } from 'next-firebase-auth';
import { NextApiRequest, NextApiResponse } from 'next';

import { initAuth } from '@packages/config';

initAuth();

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    await setAuthCookies(req, res);
  } catch (e) {
    return res.status(500).json({ error: 'Unexpected error.' });
  }
  return res.status(200).json({ success: true });
};

export default handler;
