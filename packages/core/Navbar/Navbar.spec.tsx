import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Navbar } from './Navbar';

describe('Navbar component', () => {
  it('renders', () => {
    render(<Navbar />);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});
