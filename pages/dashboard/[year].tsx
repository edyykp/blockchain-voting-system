import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AuthAction, withAuthUser, useAuthUser } from 'next-firebase-auth';

import { RaceType } from '@packages/types';
import { Layout } from '@packages/components';
import { CardsList, YearSelector, YearStandingsButton } from '@packages/core';
import { getAllRacesPerYear } from '@packages/network';
import { VotedModalWrapper, Web3Wrapper } from '@packages/config';

import styles from '../../styles/Dashboard.module.css';

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
  const user = useAuthUser();
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
    <Web3Wrapper>
      <VotedModalWrapper>
        <Layout user={user}>
          <main id="dashboard">
            <div className={styles.container}>
              <YearSelector year={String(query.year)} />
              <div className={styles.contentWrapper}>
                <YearStandingsButton year={String(query.year)} allRaces={races} />
                <CardsList races={races} />
              </div>
            </div>
          </main>

        </Layout>
      </VotedModalWrapper>
    </Web3Wrapper>
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

export default withAuthUser<DashboardProps>({
  authPageURL: '/',
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Dashboard);
