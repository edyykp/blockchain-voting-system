// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  drivers: DriversTableType['MRData']['DriverTable']['Drivers'];
  error: string | null;
};

type DriversTableType = {
  MRData: {
    DriverTable: {
      Drivers: {
        driverId: string;
        givenName: string;
        familyName: string;
        nationality: string;
      }[];
    };
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (!req.query.year || !req.query.circuit) {
    res
      .status(400)
      .json({ drivers: [], error: 'Missing parameter year/circuit' });
  }
  try {
    const result = await fetch(
      `${process.env.F1_API_URL}/drivers?year=${req.query.year}&circuit=${req.query.circuit}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!result.ok) {
      console.error(
        `Something when wrong when fetching all drivers for race ${req.query.circuit} and year ${req.query.year}`,
      );
      res
        .status(result.status)
        .json({ drivers: [], error: `Status returned: ${res.status}` });
    }

    const data: DriversTableType = await result.json();

    res
      .status(result.status)
      .json({ drivers: data.MRData.DriverTable.Drivers, error: null });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ drivers: [], error: error.message });
  }
}
