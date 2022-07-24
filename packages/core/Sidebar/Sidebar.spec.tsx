import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthUser } from 'next-firebase-auth';

import { Sidebar } from './Sidebar';

const mockedLoggedInUser: AuthUser = {
  id: '2345',
  email: 'edy@gmail.com',
  emailVerified: false,
  phoneNumber: '234',
  displayName: 'Eduard',
  photoURL: 'url',
  claims: {
    something: true,
  },
  getIdToken: async (_?: boolean) => {
    return '23';
  },
  clientInitialized: true,
  firebaseUser: null,
  signOut: async () => {},
};

const mockedLoggedOutUser: AuthUser = {
  id: null,
  email: null,
  emailVerified: false,
  phoneNumber: null,
  displayName: null,
  photoURL: null,
  claims: {},
  getIdToken: async (_?: boolean) => {
    return null;
  },
  clientInitialized: false,
  firebaseUser: null,
  signOut: async () => {},
};

const mockProps = {
  toggle: () => {},
  isOpen: true,
};

const setup = (user: AuthUser = mockedLoggedInUser) => {
  return {
    ...render(<Sidebar {...mockProps} user={user} />),
  };
};

describe('Sidebar→', () => {
  it('renders', () => {
    const { container, getByTestId } = setup();

    expect(getByTestId('sidebar')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('renders log out button when user is logged in', () => {
    const { getByText } = setup();

    expect(getByText('Log out')).toBeInTheDocument();
  });

  it('renders sign up button when not logged in', () => {
    const { getByText } = setup(mockedLoggedOutUser);

    expect(getByText('Sign up')).toBeInTheDocument();
  });
});
