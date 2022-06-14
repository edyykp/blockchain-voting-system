import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { Modal } from '@packages/components';
import { DriverType } from '@packages/types';

import styles from './VotingModal.module.css';

type VotingModalProps = {
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

    console.log(text.drivers);
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
    return Math.abs(Number(startingPosition) - Number(finalPosition));
  };

  const setImageSource = (source: string) => {
    try {
      return require(`public/${source}.jpg`);
    } catch (error) {
      return require('public/placeholder.png');
    }
  };

  const DriversList = (driversList: DriverType[]) => (
    <div className={styles.container}>
      {driversList.map((driver, key) => (
        <div className={styles.driverWrapper} key={key}>
          <div>
            {driver.finalPosition}{' '}
            <span>{positionMovement(driver.startingPosition, key + 1)}</span>
          </div>
          <div>
            <span>{driver.Driver.permanentNumber}</span>
            {driver.Driver.givenName} {driver.Driver.familyName}
          </div>
          <div>{driver.Driver.nationality}</div>
          <div>
            <span>
              <Image
                src={setImageSource(driver.Constructor.constructorId)}
                loading="lazy"
                alt={driver.Constructor.constructorId}
              />
            </span>
            {driver.Constructor.name}
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
