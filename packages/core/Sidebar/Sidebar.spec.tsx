import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Sidebar } from './Sidebar';

const mockProps = {
  toggle: () => {},
  isOpen: true,
};

const setup = () => {
  return {
    ...render(<Sidebar {...mockProps} />),
  };
};

describe('Sidebar→', () => {
  it('renders', () => {
    const { container, getByTestId } = setup();

    expect(getByTestId('sidebar')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
