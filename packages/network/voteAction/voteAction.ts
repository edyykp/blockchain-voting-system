import type { NextApiRequest, NextApiResponse } from 'next';

type Response = {
  success: boolean;
};

export interface Request extends NextApiRequest {
  candidate: number;
  voter: number;
}

export default function vote(req: Request, res: NextApiResponse<Response>) {
  res.status(200).json({ success: true });
}
