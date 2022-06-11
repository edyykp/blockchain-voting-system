import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { RaceType } from '@packages/types';
import { CardsList, YearSelector, YearStandingsButton } from '@packages/core';
import { getAllRacesPerYear } from '@packages/network';

import styles from '../../styles/Dashboard.module.css';
import { useEffect } from 'react';

type DashboardProps = {
  races: RaceType[];
  error: any;
  status: number;
};

const currentYear = new Date().getFullYear();

const Dashboard: NextPage<DashboardProps> = ({
  races,
  error,
  status,
}: DashboardProps) => {
  const { query, replace } = useRouter();

  useEffect(() => {
    if (error) {
      if (status > 499) {
        replace('/500');
      }

      replace('/404');
    }
  }, [error, status]);

  return (
    <div className={styles.container}>
      <YearSelector year={String(query.year)} />
      <div className={styles.contentWrapper}>
        <YearStandingsButton year={String(query.year)} />
        <CardsList races={races} />
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const years: { params: { year: string } }[] = [];

  for (let y = Number(process.env.OLDEST_YEAR); y <= currentYear; y++) {
    years.push({ params: { year: String(y) } });
  }
  return {
    paths: years,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const year = context.params?.year;

  const isCurrentYearRequested = year === String(currentYear) || !year;

  if (
    !year ||
    !Number.isInteger(Number(year)) ||
    Number(year) < Number(process.env.OLDEST_YEAR) ||
    Number(year) > currentYear
  ) {
    return {
      props: { races: [], error: 'Parameter year is invalid', status: 404 },
    };
  }

  const { races, error, status } = await getAllRacesPerYear(String(year));

  if (isCurrentYearRequested) {
    return {
      props: { races, error, status },
      revalidate: 120,
    };
  } else {
    return {
      props: {
        races,
        error,
        status,
      },
    };
  }
};

export default Dashboard;
