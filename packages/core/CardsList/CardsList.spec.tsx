import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

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
    ...render(<CardsList {...mockRaces} />),
  };
};

describe('CardsList→', () => {
  it('renders', () => {
    const { container, getByTestId } = setup();

    expect(getByTestId('cards-list')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
