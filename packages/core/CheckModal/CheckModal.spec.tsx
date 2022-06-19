import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { CheckModal, CheckModalProps } from './CheckModal';

const MOCK_PROPS_NO_SHOW = {
  show: false,
  driverName: 'Charles Leclerc',
  setShowModal: () => {},
  voteFinishedCallback: () => {},
};

const MOCK_PROPS_SHOW = {
  show: true,
  driverName: 'Charles Leclerc',
  setShowModal: () => {},
  voteFinishedCallback: () => {},
};

const setup = (props: CheckModalProps) => {
  return {
    ...render(<CheckModal {...props} />),
  };
};

describe('StandingsModal→', () => {
  it('renders', async () => {
    const { container, getByTestId } = setup(MOCK_PROPS_SHOW);

    expect(getByTestId('check-modal')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('renders nothing if show is false', async () => {
    const { container, queryByTestId } = setup(MOCK_PROPS_NO_SHOW);

    expect(queryByTestId('check-modal')).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
