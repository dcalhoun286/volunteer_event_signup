import { act, render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../redux/slices/auth.slice';
import { authApi } from '../../redux/api/auth.api';
import { eventsApi } from '../../redux/api/events.api';
import { authHandlers } from '../../redux/handlers/auth-handlers';
import { eventsHandlers } from '../../mocks/handlers/events.handlers';
import { Events } from './events';
import type { EventsResponse } from '../../redux/api/events.api';
import type { ReactNode } from 'react';

const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
      [authApi.reducerPath]: authApi.reducer,
      [eventsApi.reducerPath]: eventsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([authApi.middleware, eventsApi.middleware]),
    preloadedState,
  });
};

const renderWithRedux = (component: ReactNode, preloadedState = {}) => {
  const store = createTestStore(preloadedState);
  return render(<Provider store={store}>{component}</Provider>);
};

describe('Events', () => {
  const testEvents: EventsResponse = [
    {
      id: 1,
      name: 'Community Cleanup',
      description: 'Help clean up the local park',
      start_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      end_date: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000
      ).toISOString(),
      location: 'Central Park',
      timezone: 'America/New_York',
      created_by_id: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'Food Bank Drive',
      description: 'Volunteer at the local food bank',
      start_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      end_date: new Date(
        Date.now() + 14 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000
      ).toISOString(),
      location: 'Downtown Food Bank',
      timezone: 'America/New_York',
      created_by_id: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  const [createGetEventsHandlerWithDelay] = eventsHandlers;

  const server = setupServer();

  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('renders page title and description', () => {
    server.use(...authHandlers, ...createGetEventsHandlerWithDelay(testEvents));

    renderWithRedux(<Events />);

    expect(
      screen.getByRole('heading', { name: 'Events Page' })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Below are all of our upcoming events/)
    ).toBeInTheDocument();
  });

  it('renders loading state while fetching events', async () => {
    server.use(
      ...authHandlers,
      ...createGetEventsHandlerWithDelay(testEvents, 1000)
    );

    renderWithRedux(<Events />);
    expect(screen.getByText('Events Loading...')).toBeInTheDocument();

    await act(async () => {
      await vi.waitFor(
        () => {
          expect(
            screen.queryByText('Events Loading...')
          ).not.toBeInTheDocument();
        },
        { timeout: 2000 }
      );
    });
  });

  it('renders events after loading completes', async () => {
    server.use(...authHandlers, ...createGetEventsHandlerWithDelay(testEvents));

    renderWithRedux(<Events />);

    await act(async () => {
      await vi.waitFor(() => {
        expect(screen.getByText('Community Cleanup')).toBeInTheDocument();
        expect(screen.getByText('Food Bank Drive')).toBeInTheDocument();
      });
    });
  });

  it('renders empty state when no events available', async () => {
    server.use(...authHandlers, ...createGetEventsHandlerWithDelay([]));

    renderWithRedux(<Events />);

    await act(async () => {
      await vi.waitFor(() => {
        expect(screen.getByText('No events available.')).toBeInTheDocument();
      });
    });
  });
});
