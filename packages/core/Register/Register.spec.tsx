import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Register } from './Register';

const setup = () => {
  return {
    ...render(<Register />),
  };
};

describe('Register→', () => {
  it('renders', () => {
    const { container, getByTestId } = setup();

    expect(getByTestId('register')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
