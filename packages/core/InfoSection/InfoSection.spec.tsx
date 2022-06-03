import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { InfoSection } from './InfoSection';

const mockData = {
  heading: 'heading',
  subtitle: 'subtitle',
  topline: 'topline',
  svgPath: '/svg.svg',
  id: 'about',
  href: 'https://www.google.com',
  buttonText: 'Find out more',
};

const setup = (theme: 'primary' | 'secondary') => {
  return {
    ...render(<InfoSection {...mockData} theme={theme} />),
  };
};

describe('InfoSection→', () => {
  it('renders', () => {
    const { container, getByTestId } = setup('primary');

    expect(getByTestId('info-section')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
