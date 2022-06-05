import Image from 'next/image';

import { useSiteProperties } from '@packages/config';
import { RaceType } from '@packages/types';

import styles from './Card.module.css';

type CardProps = {
  race: RaceType;
};

export const Card = ({ race }: CardProps) => {
  const valueOf = useSiteProperties();

  const text = {
    votingButton: valueOf('vote_button_text'),
    standingsButton: valueOf('standings_button_text'),
  };

  return (
    <div className={styles.container}>
      <Image
        src={`/${race.circuitId}.png`}
        loading="lazy"
        alt={race.circuitId}
        className={styles.image}
        layout="fill"
      />
      <div className={styles.body}>
        <h1 className={styles.locality}>{race.locality}</h1>
        <h2 className={styles.contry}>{race.country}</h2>
        <button className={`${styles.button} ${styles.votingButton}`}>
          {text.votingButton}
        </button>
        <button className={`${styles.button} ${styles.standingsButton}`}>
          {text.standingsButton}
        </button>
      </div>
    </div>
  );
};
