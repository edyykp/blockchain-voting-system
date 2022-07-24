import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { VotedModal, VotedModalProps } from './VotedModal';

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

const setup = (props: VotedModalProps) => {
  return {
    ...render(<VotedModal {...props} />),
  };
};

describe('VotedModal→', () => {
  it('renders', async () => {
    const { container, getByTestId } = setup(MOCK_PROPS_SHOW);

    await waitFor(() => {
      expect(getByTestId('voted-modal')).toBeInTheDocument();
    });
    expect(container).toMatchSnapshot();
  });

  it('renders nothing if show is false', async () => {
    const { container, queryByTestId } = setup(MOCK_PROPS_NO_SHOW);

    await waitFor(() => {});
    expect(queryByTestId('voted-modal')).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
