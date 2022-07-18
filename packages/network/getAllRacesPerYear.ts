import { RaceType } from '@packages/types';

type RacesTableType = {
  MRData: {
    RaceTable: {
      Races: {
        raceName: string;
        Circuit: {
          circuitId: string;
          Location: {
            locality: string;
            country: string;
          };
        };
        date: string;
        time: string;
      }[];
    };
  };
};

export const getAllRacesPerYear = async (year: string | string[]) => {
  const races: RaceType[] = [];
  const currentDate = new Date();

  return { races: [], error: undefined, status: 200 };

  try {
    const res = await fetch(`${process.env.F1_API_URL}/races?year=${year}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.error(
        'Something when wrong when fetching all races from year ' + year,
      );
      return {
        races: [],
        error: `Status returned: ${res.status}`,
        status: res.status,
      };
    }

    const data: RacesTableType = await res.json();
    const allRaces = data.MRData.RaceTable.Races;

    allRaces.forEach((race) => {
      const raceDate = new Date(`${race.date}T${race.time}`);

      if (currentDate.getTime() > raceDate.getTime()) {
        races.push({
          circuitId: race.Circuit.circuitId,
          locality: race.Circuit.Location.locality,
          country: race.Circuit.Location.country,
        });
      }
    });

    return { races, error: null, status: res.status };
  } catch (error: any) {
    console.error(error);
    return { races: [], error: error.message, status: 500 };
  }
};
