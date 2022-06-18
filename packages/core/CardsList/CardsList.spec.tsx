import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { createMockRouter } from 'test-utils/createMockRouter';

import { CardsList } from './CardsList';

const mockRaces = {
  races: [
    {
      circuitId: 'imola',
      locality: 'Imola',
      country: 'Italy',
    },
    {
      circuitId: 'miami',
      locality: 'Miami',
      country: 'USA',
    },
    {
      circuitId: 'monaco',
      locality: 'Monaco',
      country: 'Monaco',
    },
  ],
};

const setup = () => {
  return {
    ...render(
      <RouterContext.Provider value={createMockRouter({})}>
        <CardsList {...mockRaces} />
      </RouterContext.Provider>,
    ),
  };
};

describe('CardsList→', () => {
  it('renders', () => {
    const { container, getByTestId } = setup();

    expect(getByTestId('cards-list')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
