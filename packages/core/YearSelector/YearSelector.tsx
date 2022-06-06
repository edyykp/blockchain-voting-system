import { useRouter } from 'next/router';

const currentYear = new Date().getFullYear();
const listOfYears: number[] = [];
for (let year = 2015; year <= currentYear; year++) {
  listOfYears.push(year);
}

export const YearSelector = () => {
  const router = useRouter();

  return (
    <select
      name="years"
      id="years"
      onChange={(event) =>
        router.replace(`/dashboard?year=${event.target.value}`)
      }
      defaultValue={router.query.year ?? currentYear}
      data-testid="year-selector"
    >
      {listOfYears.map((year) => (
        <option value={year} key={year}>
          {year}
        </option>
      ))}
    </select>
  );
};
