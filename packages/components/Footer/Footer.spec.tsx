import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Footer } from './Footer';

const setup = () => {
  return {
    ...render(<Footer />),
  };
};

describe('Footer→', () => {
  it('renders', () => {
    const { container, getByTestId } = setup();

    expect(getByTestId('footer')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
