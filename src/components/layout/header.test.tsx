import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../redux/slices/auth.slice';
import { authApi } from '../../redux/api/auth.api';
import { authHandlers } from '../../redux/handlers/auth-handlers';
import { Header } from './header';
import type { ReactNode } from 'react';

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
      [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMidleware) =>
      getDefaultMidleware().concat(authApi.middleware),
    preloadedState: initialState,
  });
};

const renderWithRedux = (component: ReactNode, initialState = {}) => {
  const store = createTestStore(initialState);
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe('Header', () => {
  const server = setupServer(...authHandlers);

  beforeAll(() => {
    // Mock matchMedia for react-bootstrap
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
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => {
    // @ts-expect-error matchMedia is a mock and needs to be deleted
    delete window.matchMedia;
    server.close();
  });

  it('loads and displays header content', () => {
    renderWithRedux(<Header />);
    expect(
      screen.getByRole('heading', { name: 'Volunteer Event Signup' })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Here's where you can register to give your time to help for our events, all in one place!"
      )
    ).toBeInTheDocument();
  });

  describe('when not authenticated', () => {
    it('should not render navbar button', () => {
      renderWithRedux(<Header />, {
        auth: { isAuthenticated: false, isLoading: false, error: null },
      });

      expect(screen.queryByTestId('navbar-button')).not.toBeInTheDocument();
    });

    it('should not render logout button', () => {
      renderWithRedux(<Header />, {
        auth: { isAuthenticated: false, isLoading: false, error: null },
      });

      expect(
        screen.queryByRole('button', { name: 'Logout' })
      ).not.toBeInTheDocument();
    });
  });

  describe('when authenticated', () => {
    it('should render the navbar button', async () => {
      const store = createTestStore({
        auth: { isAuthenticated: true, isLoading: false, error: null },
      });

      render(
        <Provider store={store}>
          <Header />
        </Provider>
      );

      await vi.waitFor(() => {
        expect(screen.getByTestId('navbar-button')).toBeInTheDocument();
      });
    });

    it('should render the logout button', async () => {
      const store = createTestStore({
        auth: { isAuthenticated: true, isLoading: false, error: null },
      });

      render(
        <Provider store={store}>
          <Header />
        </Provider>
      );

      await vi.waitFor(() => {
        expect(
          screen.getByRole('button', { name: 'Logout' })
        ).toBeInTheDocument();
      });
    });

    it('should call logout mutation when logout button is clicked', async () => {
      const user = userEvent.setup();
      const result = renderWithRedux(<Header />, {
        auth: { isAuthenticated: true, isLoading: false, error: null },
      });

      const logoutButton = screen.getByRole('button', { name: 'Logout' });
      await user.click(logoutButton);

      // Logout mutation should be called
      // Check that isAuthenticated is now false after logout
      await vi.waitFor(() => {
        const state = result.store.getState();
        expect(state.auth.isAuthenticated).toBe(false);
      });
      await vi.waitFor(() => {
        expect(
          screen.queryByRole('button', { name: 'Logout' })
        ).not.toBeInTheDocument();
      });
    });
  });
});
