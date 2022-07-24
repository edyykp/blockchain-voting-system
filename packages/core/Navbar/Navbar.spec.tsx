import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { AuthUser } from 'next-firebase-auth';

import { Navbar } from './Navbar';
import { createMockRouter } from 'test-utils/createMockRouter';

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
};

const setup = (user: AuthUser = mockedLoggedInUser) => {
  return {
    ...render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Navbar {...mockProps} user={user} />
      </RouterContext.Provider>,
    ),
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

  it('renders log out button if user is logged in', () => {
    const { getByText } = setup();

    expect(getByText('Log out')).toBeInTheDocument();
  });

  it('renders sign up button if user is not logged in', () => {
    const { getByText } = setup(mockedLoggedOutUser);

    expect(getByText('Sign up')).toBeInTheDocument();
  });
});
