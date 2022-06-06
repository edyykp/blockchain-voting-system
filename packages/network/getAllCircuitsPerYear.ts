import { parseString } from 'xml2js';
import { RaceType } from '@packages/types';

type CircuitTableType = {
  MRData: {
    CircuitTable: [
      {
        Circuit: {
          $: {
            circuitId: string;
            url: string;
          };
          CircuitName: [string];
          Location: [
            {
              lat: string;
              long: string;
              Locality: [string];
              Country: [string];
            },
          ];
        }[];
      },
    ];
  };
};

export const getAllCircuitsPerYear = async (year?: string | string[]) => {
  const races: RaceType[] = [];

  const res = await fetch(
    `http://ergast.com/api/f1/${year ?? 'current'}/circuits`,
    {
      headers: {
        'Content-Type': 'application/xml',
      },
    },
  );

  const textRes = await res.text();

  parseString(textRes, async (err, result: CircuitTableType) => {
    if (err) {
      return;
    }
    result.MRData.CircuitTable[0].Circuit.forEach((race) => {
      races.push({
        locality: race.Location[0].Locality[0],
        country: race.Location[0].Country[0],
        circuitId: race.$.circuitId,
      });
    });
  });

  return races;
};
