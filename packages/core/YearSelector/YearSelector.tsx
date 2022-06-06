import { useRouter } from 'next/router';

import styles from './YearSelector.module.css';

const currentYear = new Date().getFullYear();
const listOfYears: number[] = [];
for (let year = 2015; year <= currentYear; year++) {
  listOfYears.push(year);
}

export const YearSelector = () => {
  const router = useRouter();

  return (
    <span className={styles.container}>
      <hr className={styles.leftLine}></hr>
      <select
        name="years"
        id="years"
        onChange={(event) =>
          router.replace(`/dashboard?year=${event.target.value}`)
        }
        defaultValue={router.query.year ?? currentYear}
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
