import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { Modal } from '@packages/components';
import { DriverType } from '@packages/types';

import styles from './VotingModal.module.css';

export type VotingModalProps = {
  show: boolean;
  raceName: string;
  circuitId: string;
  setShowModal: (show: boolean) => void;
};

export const VotingModal = ({
  show,
  raceName,
  circuitId,
  setShowModal,
}: VotingModalProps) => {
  const [drivers, setDrivers] = useState<DriverType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { query } = useRouter();
  const currentYear = new Date().getFullYear();

  const getDrivers = async () => {
    const data = await fetch(
      `/api/getDrivers?year=${query.year ?? currentYear}&circuit=${circuitId}`,
    );

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
      return `public/${source}.jpg`;
    } catch (error) {
      return 'public/placeholder.png';
    }
  };

  const DriversList = (driversList: DriverType[]) => (
    <div className={styles.container} data-testid="drivers-container">
      {driversList.map((driver, key) => (
        <div
          className={styles.driverWrapper}
          key={key}
          data-testid="driver-button"
        >
          <div className={styles.positionWrapper}>
            {key + 1}.
            <span
              className={`${styles.arrow} ${
                driver.startingPosition < driver.finalPosition ||
                !driver.finalPosition
                  ? styles.redArrow
                  : styles.greenArrow
              }`}
            >
              {positionMovement(driver.startingPosition, key + 1)}
            </span>
          </div>
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
                src={require(setImageSource(driver.Constructor.constructorId))}
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
      title={`Vote for ${raceName}`}
    />
  );
};
