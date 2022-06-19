import { useState } from 'react';

import styles from './YearStandingsButton.module.css';

import { useSiteProperties } from '@packages/config';
import { StandingsModal } from '@packages/core';

type YearStandingsButtonProps = {
  year: string;
};

export const YearStandingsButton = ({ year }: YearStandingsButtonProps) => {
  const [modalShow, setShowModal] = useState(false);
  const valueOf = useSiteProperties();

  const text = {
    buttonText: valueOf('standings_button_text'),
  };

  return (
    <>
      <StandingsModal show={modalShow} setShowModal={setShowModal} />
      <button
        className={styles.button}
        data-testid="year-standings-button"
        onClick={() => setShowModal(true)}
      >
        {text.buttonText} {year}
      </button>
    </>
  );
};
