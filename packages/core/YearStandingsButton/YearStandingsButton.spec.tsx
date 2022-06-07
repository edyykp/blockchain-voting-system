import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { YearStandingsButton } from './YearStandingsButton';

const setup = (year: string) => {
  return {
    ...render(<YearStandingsButton year={year} />),
  };
};

describe('YearStandingsButton→', () => {
  it('renders', () => {
    const { container, getByTestId } = setup('2017');

    expect(getByTestId('year-standings-button')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('renders with correct year', () => {
    const { getByText } = setup('2022');

    expect(getByText('Standings 2022')).toBeInTheDocument();
  });
});
