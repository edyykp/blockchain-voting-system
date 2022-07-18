// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { DriverType } from '@packages/types';

type Data = {
  drivers: DriverType[];
  error: string | null;
};

type DriversTableType = {
  MRData: {
    RaceTable: {
      Races: [
        {
          Results: {
            position: number;
            grid: number;
            Driver: {
              permanentNumber: string;
              driverId: string;
              givenName: string;
              familyName: string;
              nationality: string;
            };
            Constructor: {
              constructorId: string;
              name: string;
            };
          }[];
        },
      ];
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
    return;
  }

  return [];
  // try {
  //   const result = await fetch(
  //     `${process.env.F1_API_URL}/results?year=${req.query.year}&circuit=${req.query.circuit}`,
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     },
  //   );

  //   if (!result.ok) {
  //     console.error(
  //       `Something when wrong when fetching all drivers for race ${req.query.circuit} and year ${req.query.year}`,
  //     );
  //     res
  //       .status(result.status)
  //       .json({ drivers: [], error: `Status returned: ${res.status}` });
  //     return;
  //   }

  //   const data: DriversTableType = await result.json();

  //   res.status(result.status).json({
  //     drivers: data.MRData.RaceTable.Races[0].Results.map((driver) => ({
  //       startingPosition: Number(driver.grid),
  //       finalPosition: Number(driver.position),
  //       Driver: {
  //         permanentNumber: driver.Driver.permanentNumber,
  //         driverId: driver.Driver.driverId,
  //         givenName: driver.Driver.givenName,
  //         familyName: driver.Driver.familyName,
  //         nationality: driver.Driver.nationality,
  //       },
  //       Constructor: {
  //         constructorId: driver.Constructor.constructorId,
  //         name: driver.Constructor.name,
  //       },
  //     })),
  //     error: null,
  //   });
  // } catch (error: any) {
  //   console.error(error);
  //   res.status(500).json({ drivers: [], error: error.message });
  // }
}
