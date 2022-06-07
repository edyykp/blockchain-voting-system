import styles from './YearStandingsButton.module.css';
import { useSiteProperties } from '../../config/SiteProperties/useSiteProperties';

type YearStandingsButtonProps = {
  year: string;
};

export const YearStandingsButton = ({ year }: YearStandingsButtonProps) => {
  const valueOf = useSiteProperties();

  const text = {
    buttonText: valueOf('standings_button_text'),
  };

  return (
    <button className={styles.button} data-testid="year-standings-button">
      {text.buttonText} {year}
    </button>
  );
};
