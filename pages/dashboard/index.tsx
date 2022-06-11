import { GetStaticProps, NextPage } from 'next';

import { RaceType } from '@packages/types';
import { CardsList, YearSelector, YearStandingsButton } from '@packages/core';
import { getAllRacesPerYear } from '@packages/network';

import styles from '../../styles/Dashboard.module.css';
import { useRouter } from 'next/router';
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
  const { replace } = useRouter();

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
      <YearSelector year={String(currentYear)} />
      <div className={styles.contentWrapper}>
        <YearStandingsButton year={String(currentYear)} />
        <CardsList races={races} />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { races, error, status } = await getAllRacesPerYear(
    String(currentYear),
  );

  return {
    props: { races, error, status },
    revalidate: 240,
  };
};

export default Dashboard;
