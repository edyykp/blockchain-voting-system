import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { RaceType } from '@packages/types';
import { CardsList, YearSelector, YearStandingsButton } from '@packages/core';
import { getAllCircuitsPerYear, isCircuitFinished } from '@packages/network';

import styles from '../../styles/Dashboard.module.css';

type DashboardProps = {
  races: RaceType[];
};

const Dashboard: NextPage<DashboardProps> = ({ races }: DashboardProps) => {
  const { query } = useRouter();
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.container}>
      <YearSelector
        year={query.year ? String(query.year) : String(currentYear)}
      />
      <div className={styles.contentWrapper}>
        <YearStandingsButton
          year={query.year ? String(query.year) : String(currentYear)}
        />

        <CardsList races={races} />
      </div>
    </div>
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

  const races = await getAllCircuitsPerYear(year);
  const finishedRaces: RaceType[] = [];

  if (isCurrentYearRequested) {
    await Promise.all(
      races.map(async (race) => {
        const isFinished = await isCircuitFinished(race, year);

        if (isFinished) {
          finishedRaces.push(race);
        }
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
