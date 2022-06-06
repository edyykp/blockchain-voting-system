import { render } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import '@testing-library/jest-dom';

import { Layout } from './Layout';
import { createMockRouter } from 'test-utils/createMockRouter';

const setup = () => {
  return {
    ...render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Layout>
          <div>This is a test</div>
        </Layout>
      </RouterContext.Provider>,
    ),
  };
};

describe('Layout→', () => {
  it('should render Navbar', () => {});

  it('should render children', () => {
    const { container, getByText } = setup();

    expect(getByText('This is a test')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render navigation bar', () => {
    const { getByTestId } = setup();

    expect(getByTestId('navigation-bar')).toBeInTheDocument();
  });
});
