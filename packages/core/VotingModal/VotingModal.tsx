import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { default as web3 } from 'web3'
import Image from 'next/image';
import { useAuthUser } from 'next-firebase-auth';

import { Modal } from '@packages/components';
import { DriverType } from '@packages/types';
import { CheckModal } from '@packages/core';
import { useVotedModalContext, useWeb3 } from '@packages/config';

import styles from './VotingModal.module.css';
import { useToast } from '../../config/ToastContext/state';

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
  const { setToast } = useToast();
  const [showCheckModal, setShowCheckModal] = useState<boolean>(false);
  const user = useAuthUser();
  const { setVotedDriver } = useVotedModalContext();
  const { account, votingContract } = useWeb3();
  const [selectedDriver, setSelectedDriver] = useState<
    DriverType | undefined
  >();
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
    setToast(text.error);
  };

  useEffect(() => {
    if (show) {
      getDrivers();
    }

    if (!show) {
      setError(null);
      setToast(null)
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
      return require(`public/${source}.jpeg`);
    } catch (error) {
      return require('public/placeholder.png');
    }
  };

  const sendVote = async () => {
    const instance = await votingContract.deployed();

    const raceYear = query.year ? Number(query.year) : currentYear

    instance
      .vote(
        raceYear,
        circuitId,
        {
          driverId: web3.utils.padLeft(web3.utils.asciiToHex(selectedDriver?.Driver.driverId!), 64),
          givenName: selectedDriver?.Driver.givenName,
          familyName: selectedDriver?.Driver.familyName,
          nationality: selectedDriver?.Driver.nationality,
          permanentNumber: selectedDriver?.Driver.permanentNumber,
          constructorId: selectedDriver?.Constructor.constructorId,
          constructorName: selectedDriver?.Constructor.name,
          votes: 1,
        },
        user.email,
        {
          from: account,
        },
      )
      .then((_: any) => setVotedDriver(
        `${selectedDriver?.Driver.givenName} ${selectedDriver?.Driver.familyName}`,
      ))
      .catch((error: any) => setToast(error.message.split('revert')[1]));
  };

  const DriversList = (driversList: DriverType[]) => (
    <div className={styles.container} data-testid="drivers-container">
      <CheckModal
        show={showCheckModal}
        setShowModal={setShowCheckModal}
        driverName={`${selectedDriver?.Driver.givenName} ${selectedDriver?.Driver.familyName}`}
        voteFinishedCallback={() => {
          setShowModal(false);
          sendVote();
        }}
      />
      {driversList.map((driver, key) => (
        <div
          className={styles.driverWrapper}
          key={key}
          data-testid="driver-button"
          onClick={() => {
            setShowCheckModal(true);
            setSelectedDriver(driver);
          }}
        >
          <div className={styles.positionWrapper}>
            {key + 1}.
            <span
              className={`${styles.arrow} ${driver.startingPosition < driver.finalPosition ||
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
                src={setImageSource(driver.Constructor.constructorId)}
                loading="lazy"
                alt={driver.Constructor.constructorId}
                width={35}
                height={23}
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
      theme="light"
    />
  );
};
