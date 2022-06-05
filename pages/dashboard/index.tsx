import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { parseString } from 'xml2js';

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

type RaceType = {
  circuitId: string;
  locality: string;
  country: string;
};

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

type DashboardProps = {
  races: {
    locality: string;
    country: string;
  }[];
};

const Dashboard: NextPage<DashboardProps> = ({ races }: DashboardProps) => {
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const listOfYears = [];
  for (let year = 2015; year <= currentYear; year++) {
    listOfYears.push(year);
  }

  return (
    <>
      <main>
        <select
          name="years"
          id="years"
          onChange={(event) =>
            router.replace(`/dashboard?year=${event.target.value}`)
          }
          defaultValue={currentYear}
        >
          {listOfYears.map((year) => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </select>
        <div>
          {races.map((race, key) => (
            <div key={key}>
              <div>
                {key} {race.locality} {race.country}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=604800, stale-while-revalidate=59',
  );
  const { year } = context.query;
  const currentYear = new Date().getFullYear();
  const isCurrentYearRequested = year === String(currentYear) || !year;
  const races: RaceType[] = [];
  const finishedRaces: RaceType[] = [];

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

  if (isCurrentYearRequested) {
    await Promise.all(
      races.map(async (race) => {
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
            finishedRaces.push(race);
          }
        });
      }),
    );
  }

  return {
    props: {
      races: isCurrentYearRequested ? finishedRaces : races,
    },
  };
};

export default Dashboard;
