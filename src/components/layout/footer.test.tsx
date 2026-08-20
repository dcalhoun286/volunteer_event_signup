import { render, screen } from '@testing-library/react';
import { Footer } from './footer';

describe('Footer', () => {
  test('loads and displays the footer', () => {
    render(<Footer />);

    const year: number = new Date().getFullYear();
    expect(screen.getByText(`© Dar-Ci Calhoun ${year}`)).toBeInTheDocument();
  });
});
