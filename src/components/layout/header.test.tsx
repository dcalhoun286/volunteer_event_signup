import { render, screen } from '@testing-library/react';
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
  return render(<Provider store={store}>{component}</Provider>);
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

  afterAll(() => {
    // @ts-expect-error matchMedia is a mock and needs to be deleted
    delete window.matchMedia;
    server.close();
  });

  test('loads and displays header content', () => {
    renderWithRedux(<Header />, {
      auth: { isAuthenticated: false, isLoading: false, error: null },
    });

    expect(
      screen.getByRole('heading', { name: 'Volunteer Event Signup' })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Here's where you can register to give your time to help for our events, all in one place!"
      )
    ).toBeInTheDocument();
  });

  test('navbar button is not visible when user is not logged in', () => {
    renderWithRedux(<Header />, {
      auth: { isAuthenticated: false, isLoading: false, error: null },
    });

    expect(screen.queryByTestId('navbar-button')).not.toBeInTheDocument();
  });

  test('navbar button is visible when user is logged in', async () => {
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
});
