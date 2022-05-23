import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Layout } from './Layout';

const setup = () => {
  return {
    ...render(
      <Layout>
        <div>This is a test</div>
      </Layout>,
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

  it('should render footer', () => {});
});
