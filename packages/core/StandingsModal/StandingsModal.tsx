import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { Modal } from '@packages/components';
import { DriverType } from '@packages/types';

import styles from './StandingsModal.module.css';

export type StandingsModalProps = {
  show: boolean;
  setShowModal: (show: boolean) => void;
  raceName?: string;
  circuitId?: string;
};

export const StandingsModal = ({
  show,
  raceName,
  circuitId,
  setShowModal,
}: StandingsModalProps) => {
  const [drivers, setDrivers] = useState<DriverType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { query } = useRouter();
  const currentYear = new Date().getFullYear();
  const renderedYear = query.year ?? currentYear;

  const getDrivers = async () => {
    const url = circuitId
      ? `/api/getDrivers?year=${renderedYear}&circuit=${circuitId}`
      : `/api/getDrivers?year=${renderedYear}`;
    const data = await fetch(url);
    const text: { drivers: DriverType[]; error: string | null } =
      await data.json();

    setDrivers(text.drivers);
    setError(text.error);
  };

  useEffect(() => {
    if (show) {
      getDrivers();
    }

    if (!show) {
      setError(null);
    }
  }, [show]);

  useEffect(() => {
    if (error) {
      setShowModal(false);
    }
  }, [error]);

  const positionMovement = (
    startingPosition: number,
    finalPosition: number,
  ) => {
    if (startingPosition === 0) {
      return undefined;
    }
    const difference = Math.abs(
      Number(startingPosition) - Number(finalPosition),
    );

    if (difference === 0) {
      return undefined;
    }

    if (startingPosition > finalPosition) {
      return '▲' + String(difference);
    }

    return '▼' + String(difference);
  };

  const setImageSource = (source: string) => {
    try {
      return require(`public/${source}.jpg`);
    } catch (error) {
      return require('public/placeholder.png');
    }
  };

  const DriversList = (driversList: DriverType[]) => (
    <div className={styles.container} data-testid="standings-container">
      {driversList.map((driver, key) => (
        <div
          className={`${styles.driverWrapper} ${
            key % 2 === 1 ? styles.greyBackground : ''
          }`}
          key={key}
          data-testid="driver-row"
        >
          <div className={styles.positionWrapper}>{key + 1}.</div>
          <div className={styles.nameWrapper}>
            <span className={styles.permanentNumber}>
              {driver.Driver.permanentNumber}
            </span>{' '}
            {driver.Driver.givenName} {driver.Driver.familyName}
          </div>
          <div className={styles.nationalityWrapper}>
            {driver.Driver.nationality}
          </div>
          <div className={styles.teamWrapper}>
            <span className={styles.imageWrapper}>
              <Image
                src={setImageSource(driver.Constructor.constructorId)}
                loading="lazy"
                alt={driver.Constructor.constructorId}
                width={15}
                height={20}
                className={styles.img}
              />
            </span>

            <span className={styles.constructorWrapper}>
              {driver.Constructor.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

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
