import styles from './CardsList.module.css';

import { RaceType } from '@packages/types';
import { Card } from '@packages/components';

type CardsListProps = {
  races: RaceType[];
};

export const CardsList = ({ races }: CardsListProps) => {
  return (
    <div className={styles.container} data-testid="cards-list">
      {races.map((race, key) => (
        <Card race={race} key={key} />
      ))}
    </div>
  );
};
