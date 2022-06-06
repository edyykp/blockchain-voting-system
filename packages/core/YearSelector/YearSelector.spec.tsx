import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RouterContext } from 'next/dist/shared/lib/router-context';

import { YearSelector } from './YearSelector';
import { createMockRouter } from '../../../test-utils/createMockRouter';

const setup = (year?: string) => {
  return {
    ...render(
      <RouterContext.Provider value={createMockRouter({ query: { year } })}>
        <YearSelector />
      </RouterContext.Provider>,
    ),
  };
};

describe('YearSelector→', () => {
  const currentYear = String(new Date().getFullYear());

  it('renders', () => {
    const { container, getByTestId } = setup();

    expect(getByTestId('year-selector')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('renders current year if no search parameter is defined', () => {
    const { getByRole } = setup();

    expect(
      getByRole('option', { name: currentYear }).getAttribute('selected'),
    ).toBe('');
    expect(
      getByRole('option', { name: '2021' }).getAttribute('selected'),
    ).toBeNull();
  });

  it('renders year from parameter if search parameter is defined', () => {
    const { getByRole } = setup('2017');

    expect(getByRole('option', { name: '2017' }).getAttribute('selected')).toBe(
      '',
    );

    expect(getByRole('option', { name: currentYear }).getAttribute('selected'))
      .toBeNull;
  });
});
