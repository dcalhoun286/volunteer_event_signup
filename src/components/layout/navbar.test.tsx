import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Navbar } from './navbar';
import { useToggle } from '../../hooks/useToggle';

// Mock matchMedia for react-bootstrap
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

// Mock the useToggle hook
vi.mock('../../hooks/useToggle', () => ({
  useToggle: vi.fn(() => ({
    toggle: false,
    handleToggle: vi.fn(),
  })),
}));

describe('Navbar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    // @ts-expect-error matchMedia is a mock and needs to be deleted
    delete window.matchMedia;
    vi.restoreAllMocks();
  });

  it('should render the navbar button', () => {
    render(<Navbar />);

    const navbarButton = screen.getByTestId('navbar-button');
    expect(navbarButton).toBeInTheDocument();
  });

  it('should render Nav Menu title when opened', async () => {
    const mockHandleToggle = vi.fn();

    vi.mocked(useToggle).mockReturnValue({
      toggle: true,
      handleToggle: mockHandleToggle,
    });

    render(<Navbar />);

    expect(screen.getByText('Nav Menu')).toBeInTheDocument();
  });

  it('should render body with placeholder text when opened', () => {
    const mockHandleToggle = vi.fn();

    vi.mocked(useToggle).mockReturnValue({
      toggle: true,
      handleToggle: mockHandleToggle,
    });

    render(<Navbar />);

    expect(screen.getByText('WHERE THE NAV ITEMS BELONG')).toBeInTheDocument();
  });

  it('should call setShowNavbar when navbar button is clicked', async () => {
    const user = userEvent.setup();
    const mockSetShowNavbar = vi.fn();

    vi.mocked(useToggle).mockReturnValue({
      toggle: false,
      handleToggle: mockSetShowNavbar,
    });

    render(<Navbar />);

    const navbarButton = screen.getByTestId('navbar-button');
    await user.click(navbarButton);

    expect(mockSetShowNavbar).toHaveBeenCalled();
  });

  it('should properly open navbar when navbar button is clicked', async () => {
    const user = userEvent.setup();
    const mockHandleToggle = vi.fn();

    vi.mocked(useToggle).mockReturnValue({
      toggle: false,
      handleToggle: mockHandleToggle,
    });

    render(<Navbar />);

    const navbarButton = screen.getByTestId('navbar-button');
    await user.click(navbarButton);

    expect(mockHandleToggle).toHaveBeenCalledTimes(1);
  });

  it('should properly close navbar when close button is clicked', async () => {
    const user = userEvent.setup();
    const mockHandleToggle = vi.fn();

    vi.mocked(useToggle).mockReturnValue({
      toggle: true,
      handleToggle: mockHandleToggle,
    });

    render(<Navbar />);

    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);

    expect(mockHandleToggle).toHaveBeenCalledTimes(1);
  });
});
