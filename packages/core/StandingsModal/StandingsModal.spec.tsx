import { cleanup, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { createMockRouter } from 'test-utils/createMockRouter';

import { BlockchainDriverType, StandingsModal, StandingsModalProps } from './StandingsModal';

type ImageProps = {
  src: string;
  alt: string;
};

const MOCK_PROPS_NO_SHOW = {
  show: false,
  raceName: 'Monaco',
  circuitId: 'monaco',
  setShowModal: () => { },
};

const MOCK_PROPS_SHOW = {
  show: true,
  raceName: 'Monaco',
  circuitId: 'monaco',
  setShowModal: () => { },
};

const MOCK_FETCHED_DATA: { error: any, drivers: BlockchainDriverType[] } = {
  error: null,
  drivers: [
    {
      permanentNumber: '6',
      driverId: 'latifi',
      givenName: 'Nicholas',
      familyName: 'Latifi',
      nationality: 'Canadian',
      constructorName: 'Williams',
      constructorId: 'williams',
      votes: 2,
    },
    {
      permanentNumber: '14',
      driverId: 'alonso',
      givenName: 'Fernando',
      familyName: 'Alonso',
      nationality: 'Spanish',
      votes: 3,
      constructorId: 'alpine',
      constructorName: 'Alpine F1 Team',
    },
    {
      permanentNumber: '33',
      driverId: 'max_verstappen',
      givenName: 'Max',
      familyName: 'Verstappen',
      nationality: 'Dutch',
      constructorId: 'red_bull',
      constructorName: 'Red Bull',
      votes: 4
    },
    {
      permanentNumber: '5',
      driverId: 'vettel',
      givenName: 'Sebastian',
      familyName: 'Vettel',
      nationality: 'German',
      constructorId: 'aston_martin',
      constructorName: 'Aston Martin',
      votes: 0
    },
    {
      permanentNumber: '55',
      driverId: 'sainz',
      givenName: 'Carlos',
      familyName: 'Sainz',
      nationality: 'Spanish',
      constructorId: 'ferrari',
      constructorName: 'Ferrari',
      votes: 10
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
    .mockReturnValue({
      account: 'hello', votingContract: {
        deployed: jest.fn().mockReturnValue({
          getRace: jest.fn().mockReturnValue({
            error: null,
            drivers: [
              {
                permanentNumber: '6',
                driverId: 'latifi',
                givenName: 'Nicholas',
                familyName: 'Latifi',
                nationality: 'Canadian',
                constructorName: 'Williams',
                constructorId: 'williams',
                votes: 2,
              },
              {
                permanentNumber: '14',
                driverId: 'alonso',
                givenName: 'Fernando',
                familyName: 'Alonso',
                nationality: 'Spanish',
                votes: 3,
                constructorId: 'alpine',
                constructorName: 'Alpine F1 Team',
              },
              {
                permanentNumber: '33',
                driverId: 'max_verstappen',
                givenName: 'Max',
                familyName: 'Verstappen',
                nationality: 'Dutch',
                constructorId: 'red_bull',
                constructorName: 'Red Bull',
                votes: 4
              },
              {
                permanentNumber: '5',
                driverId: 'vettel',
                givenName: 'Sebastian',
                familyName: 'Vettel',
                nationality: 'German',
                constructorId: 'aston_martin',
                constructorName: 'Aston Martin',
                votes: 0
              },
              {
                permanentNumber: '55',
                driverId: 'sainz',
                givenName: 'Carlos',
                familyName: 'Sainz',
                nationality: 'Spanish',
                constructorId: 'ferrari',
                constructorName: 'Ferrari',
                votes: 10
              },
            ],
          })
        })
      }
    }),
}));

const setup = (props: StandingsModalProps) => {
  return {
    ...render(
      <RouterContext.Provider value={createMockRouter({})}>
        <StandingsModal {...props} />
      </RouterContext.Provider>,
    ),
  };
};

describe('StandingsModal→', () => {
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
      expect(getByTestId('standings-container')).toBeInTheDocument();
    });
    expect(container).toMatchSnapshot();
  });

  it('renders nothing if show is false', async () => {
    const { container, queryByTestId } = setup(MOCK_PROPS_NO_SHOW);

    await waitFor(() => { });
    expect(queryByTestId('standings-container')).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('renders one row for each driver received', async () => {
    const { queryAllByTestId } = setup(MOCK_PROPS_SHOW);

    await waitFor(() => {
      expect(queryAllByTestId('driver-row')).toHaveLength(5);
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

    await waitFor(() => { });

    expect(queryByTestId('standings-container')).not.toBeInTheDocument();
  });
});
