import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { EmailModal, EmailModalProps } from './EmailModal';

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

const setup = (props: EmailModalProps) => {
  return {
    ...render(<EmailModal {...props} />),
  };
};

describe('EmailModal→', () => {
  it('renders', async () => {
    const { container, getByTestId } = setup(MOCK_PROPS_SHOW);

    expect(getByTestId('email-modal')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('renders nothing if show is false', async () => {
    const { container, queryByTestId } = setup(MOCK_PROPS_NO_SHOW);

    expect(queryByTestId('email-modal')).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
