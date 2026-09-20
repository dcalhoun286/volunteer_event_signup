import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { NotFound } from './not-found';
import type { ReactNode } from 'react';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

import * as RouterModule from 'react-router-dom';

const renderWithRouter = (component: ReactNode) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe('NotFound', () => {
  it('should render the 404 heading', () => {
    renderWithRouter(<NotFound />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Page not found'
    );
  });

  it('should display error message', () => {
    renderWithRouter(<NotFound />);

    expect(
      screen.getByText("The page you're looking for doesn't exist.")
    ).toBeInTheDocument();
  });

  it('should render Go to Home button', () => {
    renderWithRouter(<NotFound />);

    expect(
      screen.getByRole('button', { name: 'Go to Home' })
    ).toBeInTheDocument();
  });

  it('should render Go Back button', () => {
    renderWithRouter(<NotFound />);

    expect(screen.getByRole('button', { name: 'Go Back' })).toBeInTheDocument();
  });

  it('should navigate to home with Go to Home button is clicked', async () => {
    const user = userEvent.setup();
    const mockNavigate = vi.fn();

    vi.mocked(RouterModule.useNavigate).mockReturnValue(mockNavigate);

    render(<NotFound />);

    const homeButton = screen.getByRole('button', { name: 'Go to Home' });
    await user.click(homeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should navigate back when Go Back button is clicked', async () => {
    const user = userEvent.setup();
    const mockNavigate = vi.fn();

    vi.mocked(RouterModule.useNavigate).mockReturnValue(mockNavigate);

    renderWithRouter(<NotFound />);

    const homeButton = screen.getByRole('button', { name: 'Go Back' });
    await user.click(homeButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
