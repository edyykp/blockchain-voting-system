import { cleanup, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { createMockRouter } from 'test-utils/createMockRouter';

import { VotingModal, VotingModalProps } from './VotingModal';

type ImageProps = {
  src: string;
  alt: string;
};

const MOCK_PROPS_NO_SHOW = {
  show: false,
  raceName: 'Monaco',
  circuitId: 'monaco',
  setShowModal: () => {},
};

const MOCK_PROPS_SHOW = {
  show: true,
  raceName: 'Monaco',
  circuitId: 'monaco',
  setShowModal: () => {},
};

const MOCK_FETCHED_DATA = {
  error: null,
  drivers: [
    {
      startingPosition: 18,
      finalPosition: 16,
      Driver: {
        permanentNumber: '6',
        driverId: 'latifi',
        givenName: 'Nicholas',
        familyName: 'Latifi',
        nationality: 'Canadian',
      },
      Constructor: {
        constructorId: 'williams',
        name: 'Williams',
      },
    },
    {
      startingPosition: 10,
      finalPosition: 17,
      Driver: {
        permanentNumber: '14',
        driverId: 'alonso',
        givenName: 'Fernando',
        familyName: 'Alonso',
        nationality: 'Spanish',
      },
      Constructor: {
        constructorId: 'alpine',
        name: 'Alpine F1 Team',
      },
    },
    {
      startingPosition: 2,
      finalPosition: null,
      Driver: {
        permanentNumber: '33',
        driverId: 'max_verstappen',
        givenName: 'Max',
        familyName: 'Verstappen',
        nationality: 'Dutch',
      },
      Constructor: {
        constructorId: 'red_bull',
        name: 'Red Bull',
      },
    },
    {
      startingPosition: 17,
      finalPosition: null,
      Driver: {
        permanentNumber: '5',
        driverId: 'vettel',
        givenName: 'Sebastian',
        familyName: 'Vettel',
        nationality: 'German',
      },
      Constructor: {
        constructorId: 'aston_martin',
        name: 'Aston Martin',
      },
    },
    {
      startingPosition: 9,
      finalPosition: null,
      Driver: {
        permanentNumber: '55',
        driverId: 'sainz',
        givenName: 'Carlos',
        familyName: 'Sainz',
        nationality: 'Spanish',
      },
      Constructor: {
        constructorId: 'ferrari',
        name: 'Ferrari',
      },
    },
  ],
};

jest.mock(
  'next/image',
  () =>
    function Image({ src, alt }: ImageProps) {
      return <img src={src} alt={alt} />;
    },
);

jest.mock('@packages/config/Web3Context', () => ({
  ...jest.requireActual('@packages/config/Web3Context'),
  useWeb3: jest
    .fn()
    .mockResolvedValue({ account: 'hello', votingContract: 'string' }),
}));

const setup = (props: VotingModalProps) => {
  return {
    ...render(
      <RouterContext.Provider value={createMockRouter({})}>
        <VotingModal {...props} />
      </RouterContext.Provider>,
    ),
  };
};

describe('VotingModal→', () => {
  beforeEach(
    (global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(MOCK_FETCHED_DATA),
      }),
    ) as jest.Mock),
  );

  afterEach(cleanup);

  it('renders', async () => {
    const { container, getByTestId } = setup(MOCK_PROPS_SHOW);

    await waitFor(() => {
      expect(getByTestId('drivers-container')).toBeInTheDocument();
    });
    expect(container).toMatchSnapshot();
  });

  it('renders nothing if show is false', async () => {
    const { container, queryByTestId } = setup(MOCK_PROPS_NO_SHOW);

    await waitFor(() => {});
    expect(queryByTestId('drivers-container')).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('renders one button for each driver received', async () => {
    const { queryAllByTestId } = setup(MOCK_PROPS_SHOW);

    await waitFor(() => {
      expect(queryAllByTestId('driver-button')).toHaveLength(5);
    });
  });

  it('renders nothing if fetching data failed', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => ({
          drivers: [],
          error: 'This is an error',
        }),
      }),
    ) as jest.Mock;
    const { queryByTestId } = setup(MOCK_PROPS_NO_SHOW);

    await waitFor(() => {});

    expect(queryByTestId('drivers-container')).not.toBeInTheDocument();
  });
});
