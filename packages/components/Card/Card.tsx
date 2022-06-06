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

  const setSource = () => {
    try {
      return require(`public/${race.circuitId}.jpg`);
    } catch (error) {
      return require('public/placeholder.png');
    }
  };

  const src = setSource();

  return (
    <div className={styles.container}>
      <div className={styles.imgWrap}>
        <Image
          src={src}
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
