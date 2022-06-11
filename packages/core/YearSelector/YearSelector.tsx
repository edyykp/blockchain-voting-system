import styles from './YearSelector.module.css';

type YearSelectorProps = {
  year: string;
};

export const YearSelector = ({ year }: YearSelectorProps) => {
  const listOfYears: number[] = [];
  for (let y = 2015; y <= new Date().getFullYear(); y++) {
    listOfYears.push(y);
  }

  return (
    <span className={styles.container}>
      <hr className={styles.leftLine}></hr>
      <select
        name="years"
        id="years"
        onChange={(event) =>
          window.location.replace(
            `/dashboard/${encodeURIComponent(event.target.value)}`,
          )
        }
        defaultValue={year}
        data-testid="year-selector"
        className={styles.selector}
      >
        {listOfYears.map((year) => (
          <option value={year} key={year} className={styles.option}>
            Year {year}
          </option>
        ))}
      </select>

      <hr className={styles.rightLine}></hr>
    </span>
  );
};
