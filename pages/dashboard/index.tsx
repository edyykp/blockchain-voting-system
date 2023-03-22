import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { AuthAction, withAuthUser, useAuthUser } from 'next-firebase-auth';
import { useEffect } from 'react';

import { RaceType } from '@packages/types';
import { Layout } from '@packages/components';
import { VotedModalWrapper, Web3Wrapper } from '@packages/config';
import { CardsList, YearSelector, YearStandingsButton } from '@packages/core';
import { getAllRacesPerYear } from '@packages/network';

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
    <Web3Wrapper>
      <VotedModalWrapper>
        <Layout user={user}>
          <main id="dashboard">
            <div className={styles.container}>
              <YearSelector year={String(currentYear)} />
              <div className={styles.contentWrapper}>
                <YearStandingsButton year={String(currentYear)} allRaces={races} />
                <CardsList races={races} />
              </div>
            </div>
          </main>
        </Layout>
      </VotedModalWrapper>
    </Web3Wrapper>
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

export default withAuthUser<DashboardProps>({
  authPageURL: '/',
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Dashboard);
