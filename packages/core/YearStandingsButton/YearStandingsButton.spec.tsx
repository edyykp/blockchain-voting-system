import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { createMockRouter } from 'test-utils/createMockRouter';

import { YearStandingsButton } from './YearStandingsButton';

const setup = (year: string) => {
  return {
    ...render(
      <RouterContext.Provider value={createMockRouter({})}>
        <YearStandingsButton year={year} />
      </RouterContext.Provider>,
    ),
  };
};

jest.mock('@packages/config/Web3Context', () => ({
  ...jest.requireActual('@packages/config/Web3Context'),
  useWeb3: jest
    .fn()
    .mockResolvedValue({ account: 'hello', votingContract: 'string' }),
}));

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
