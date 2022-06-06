import { parseString } from 'xml2js';
import { RaceType } from '@packages/types';

type RaceStatusType = {
  MRData: {
    StatusTable: [
      {
        Status?: {
          _: string;
        }[];
      },
    ];
  };
};

export const isCircuitFinished = async (race: RaceType, year?: string) => {
  let isFinished = false;

  const status = await fetch(
    `http://ergast.com/api/f1/${year ?? 'current'}/circuits/${
      race.circuitId
    }/status`,
  );

  const textStatus = await status.text();

  parseString(textStatus, (err, result: RaceStatusType) => {
    if (err) {
      return;
    }

    if (result.MRData.StatusTable[0].Status) {
      isFinished = true;
    }
  });

  return isFinished;
};
