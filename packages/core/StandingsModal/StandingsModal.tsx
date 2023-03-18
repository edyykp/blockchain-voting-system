import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { Modal } from '@packages/components';
import { useWeb3 } from '@packages/config';

import styles from './StandingsModal.module.css';
import { useToast } from '../../config/ToastContext/state';

export type StandingsModalProps = {
  show: boolean;
  setShowModal: (show: boolean) => void;
  raceName?: string;
  circuitId?: string;
};

export type BlockchainDriverType = {
  driverId: string;
  givenName: string;
  familyName: string;
  nationality: string;
  permanentNumber: string;
  constructorId: string;
  constructorName: string;
  votes: number;
};

export const StandingsModal = ({
  show,
  raceName,
  circuitId,
  setShowModal,
}: StandingsModalProps) => {
  const [drivers, setDrivers] = useState<BlockchainDriverType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { query } = useRouter();
  const { setToast } = useToast()
  const { account, votingContract } = useWeb3();
  const currentYear = new Date().getFullYear();
  const renderedYear = query.year ?? currentYear;

  const getDrivers = async () => {
    const instance = await votingContract.deployed();

    const raceYear = query.year ? Number(query.year) : currentYear

    try {
      const currentRace = await instance.getRace(
        raceYear,
        circuitId,
        {
          from: account,
        },
      );
      setDrivers(currentRace['drivers']);

    } catch (err: any) {
      setToast(err.message.split('revert')[1])
    }
  };

  useEffect(() => {
    if (show) {
      getDrivers();
    }

    if (!show) {
      setError(null);
      setToast(null);
    }
  }, [show]);

  useEffect(() => {
    if (error) {
      setShowModal(false);
    }
  }, [error]);

  const setImageSource = (source: string) => {
    try {
      return require(`public/${source}.jpeg`);
    } catch (error) {
      return require('public/placeholder.png');
    }
  };

  const DriversList = (driversList: BlockchainDriverType[]) => {
    const driversListSorted = [...driversList];

    return (
      <div className={styles.container} data-testid="standings-container">
        {driversListSorted
          .sort((driverA, driverB) => driverB.votes - driverA.votes)
          .map((driver, key) => (
            <div
              className={`${styles.driverWrapper} ${key % 2 === 1 ? styles.greyBackground : ''
                }`}
              key={key}
              data-testid="driver-row"
            >
              <div className={styles.positionWrapper}>{key + 1}.</div>
              <div className={styles.nameWrapper}>
                <span className={styles.permanentNumber}>
                  {driver.permanentNumber}
                </span>{' '}
                {driver.givenName} {driver.familyName}
              </div>
              <div className={styles.nationalityWrapper}>
                {driver.nationality}
              </div>
              <div className={styles.teamWrapper}>
                <span className={styles.imageWrapper}>
                  <Image
                    src={setImageSource(driver.constructorId)}
                    loading="lazy"
                    alt={driver.constructorId}
                    width={15}
                    height={20}
                    className={styles.img}
                  />
                </span>

                <span className={styles.constructorWrapper}>
                  {driver.constructorName}
                </span>
              </div>

              <div className={styles.votesWrapper}>{driver.votes} votes</div>
            </div>
          ))}
      </div>
    );
  };

  return (
    <Modal
      show={show}
      onClose={() => setShowModal(false)}
      children={DriversList(drivers)}
      title={`Standings for ${raceName ?? renderedYear}`}
      theme="light"
    />
  );
};
