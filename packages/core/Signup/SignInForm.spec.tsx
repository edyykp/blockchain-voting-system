import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SignInForm } from './SignInForm';

const setup = () => {
  return {
    ...render(<SignInForm />),
  };
};

describe('SignInForm→', () => {
  it('renders', () => {
    const { container, getByTestId } = setup();

    expect(getByTestId('signinform')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
