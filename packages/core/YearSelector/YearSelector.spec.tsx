import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { YearSelector } from './YearSelector';

const setup = (year: string) => {
  return {
    ...render(<YearSelector year={year} />),
  };
};

describe('YearSelector→', () => {
  it('renders', () => {
    const { container, getByTestId } = setup('2017');

    expect(getByTestId('year-selector')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('renders correct year as selected', () => {
    const { getByRole } = setup('2019');

    expect(
      getByRole('option', { name: 'Year 2019' }).getAttribute('selected'),
    ).toBe('');
    expect(
      getByRole('option', { name: 'Year 2022' }).getAttribute('selected'),
    ).toBeNull();
  });
});
