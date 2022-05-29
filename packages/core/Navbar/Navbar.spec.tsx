import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Navbar } from './Navbar';

const mockProps = {
  toggle: () => {},
};

const setup = () => {
  return {
    ...render(<Navbar {...mockProps} />),
  };
};

describe('Navbar→', () => {
  it('renders', () => {
    const { container, getByTestId } = setup();

    expect(getByTestId('navigation-bar')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('renders the logo', () => {
    const { getByTestId } = setup();

    expect(getByTestId('navigation-bar-logo')).toBeInTheDocument();
  });

  it('renders the menu', () => {
    const { getByTestId } = setup();

    expect(getByTestId('navigation-bar-menu')).toBeInTheDocument();
  });

  it('renders the mobile menu icon', () => {
    const { getByTestId } = setup();

    expect(getByTestId('mobile-menu-icon')).toBeInTheDocument();
  });

  it('renders the cta', () => {
    const { getByTestId } = setup();

    expect(getByTestId('navigation-bar-cta')).toBeInTheDocument();
  });
});
