import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Navbar } from './navbar';
import { useToggle } from '../../hooks/useToggle';
import authReducer from '../../redux/slices/auth.slice';
import { authApi } from '../../redux/api/auth.api';
import { eventsApi } from '../../redux/api/events.api';
import { authHandlers } from '../../redux/handlers/auth-handlers';
import { eventsHandlers } from '../../mocks/handlers/events.handlers';
import type { ReactNode } from 'react';

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

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
      [authApi.reducerPath]: authApi.reducer,
      [eventsApi.reducerPath]: eventsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware),
    preloadedState: initialState,
  });
};

const renderWithRedux = (component: ReactNode, initialState = {}) => {
  const store = createTestStore(initialState);
  return render(
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={component} />
          <Route path="/events" element={<div>Events</div>} />
        </Routes>
      </Router>
    </Provider>
  );
};

describe('Navbar', () => {
  const [createGetEventsHandlerWithDelay] = eventsHandlers;
  const server = setupServer(
    ...authHandlers,
    ...createGetEventsHandlerWithDelay([])
  );

  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useToggle).mockReturnValue({
      toggle: false,
      handleToggle: vi.fn(),
    });
  });

  afterEach(() => {
    cleanup();
    server.resetHandlers();
    vi.clearAllMocks();
  });

  afterAll(() => {
    server.close();
    // @ts-expect-error matchMedia is a mock and needs to be deleted
    delete window.matchMedia;
    vi.restoreAllMocks();
  });

  it('should render the navbar button', async () => {
    await vi.waitFor(() => {
      renderWithRedux(<Navbar />);
    });

    const navbarButton = screen.getByTestId('navbar-button');
    expect(navbarButton).toBeInTheDocument();
  });

  it('should render Nav Menu title when opened', async () => {
    const mockHandleToggle = vi.fn();

    vi.mocked(useToggle).mockReturnValue({
      toggle: true,
      handleToggle: mockHandleToggle,
    });

    renderWithRedux(<Navbar />);

    expect(screen.getByText('Nav Menu')).toBeInTheDocument();
  });

  it('should render nav links when opened', () => {
    const mockHandleToggle = vi.fn();

    vi.mocked(useToggle).mockReturnValue({
      toggle: true,
      handleToggle: mockHandleToggle,
    });

    renderWithRedux(<Navbar />);
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Events' })).toBeInTheDocument();
  });

  it('should call setShowNavbar when navbar button is clicked', async () => {
    const user = userEvent.setup();
    const mockSetShowNavbar = vi.fn();

    vi.mocked(useToggle).mockReturnValue({
      toggle: false,
      handleToggle: mockSetShowNavbar,
    });

    renderWithRedux(<Navbar />);

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

    renderWithRedux(<Navbar />);

    const navbarButton = screen.getByTestId('navbar-button');
    await user.click(navbarButton);

    expect(mockHandleToggle).toHaveBeenCalledTimes(1);
  });

  it('should call handleToggle when navbar nav link is clicked', async () => {
    const user = userEvent.setup();
    const mockHandleToggle = vi.fn();

    vi.mocked(useToggle).mockReturnValue({
      toggle: true,
      handleToggle: mockHandleToggle,
    });

    renderWithRedux(<Navbar />);

    const eventsLink = screen.getByRole('link', { name: 'Events' });
    await user.click(eventsLink);

    expect(mockHandleToggle).toHaveBeenCalledTimes(1);
  });

  it('should properly close navbar when close button is clicked', async () => {
    const user = userEvent.setup();
    const mockHandleToggle = vi.fn();

    vi.mocked(useToggle).mockReturnValue({
      toggle: true,
      handleToggle: mockHandleToggle,
    });

    renderWithRedux(<Navbar />);

    expect(screen.getByText('Nav Menu')).toBeInTheDocument();
    const closeButton = await screen.findByRole('button', { name: /close/i });
    await user.click(closeButton);

    expect(mockHandleToggle).toHaveBeenCalledTimes(1);
  });
});
