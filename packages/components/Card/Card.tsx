import { useState } from 'react';
import Image from 'next/image';

import { useSiteProperties } from '@packages/config';
import { RaceType } from '@packages/types';
import { VotingModal } from '@packages/core';

import styles from './Card.module.css';

type CardProps = {
  race: RaceType;
};

export const Card = ({ race }: CardProps) => {
  const [voteShow, setShowVotingModal] = useState(false);
  const valueOf = useSiteProperties();

  const text = {
    votingButton: valueOf('vote_button_text'),
    standingsButton: valueOf('standings_button_text'),
  };

  const setImageSource = () => {
    try {
      return require(`public/${race.circuitId}.jpg`);
    } catch (error) {
      return require('public/placeholder.png');
    }
  };

  return (
    <div className={styles.container}>
      <VotingModal
        show={voteShow}
        setShowModal={setShowVotingModal}
        raceName={`${race.country}, ${race.locality}`}
        circuitId={race.circuitId}
      />
      <div className={styles.imgWrap}>
        <Image
          src={setImageSource()}
          loading="lazy"
          alt={race.circuitId}
          className={styles.image}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className={styles.body}>
        <h1 className={styles.locality}>{race.locality},</h1>
        <h2 className={styles.country}>{race.country}</h2>
        <button
          className={`${styles.button} ${styles.votingButton}`}
          onClick={() => setShowVotingModal(true)}
        >
          {text.votingButton}
        </button>
        <button className={`${styles.button} ${styles.standingsButton}`}>
          {text.standingsButton}
        </button>
      </div>
    </div>
  );
};
