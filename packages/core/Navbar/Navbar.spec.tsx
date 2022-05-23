import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Navbar } from './Navbar';

const setup = () => {
  return {
    ...render(<Navbar />),
  };
};

describe('Navbar component', () => {
  it('renders', () => {
    const { container, getByText } = setup();
    expect(container).toMatchSnapshot();
  });
});
