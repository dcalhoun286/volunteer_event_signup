import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useAuthState } from './useAuthState';
import authReducer from '../redux/slices/auth.slice';
import type { AuthState } from '../redux/slices/auth.slice';
import { authApi } from '../redux/api/auth.api';

const createTestStore = (authState?: Partial<AuthState>) => {
  return configureStore({
    reducer: {
      auth: authReducer,
      [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware),
    preloadedState: authState
      ? {
          auth: {
            isAuthenticated: false,
            isLoading: false,
            error: null,
            ...authState,
          },
        }
      : undefined,
  });
};

describe('useAuthState', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
  });

  it('should return initial auth state with default values', () => {
    const { result } = renderHook(() => useAuthState(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current).toEqual({
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  });

  it('should return isAuthenticated as true when authenticated', () => {
    store = createTestStore({ isAuthenticated: true });

    const { result } = renderHook(() => useAuthState(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should return isLoading as true when loading', () => {
    store = createTestStore({ isLoading: true });

    const { result } = renderHook(() => useAuthState(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should return error message when authentication fails', () => {
    const errorMessage = 'Invalid credentials';
    store = createTestStore({ error: errorMessage });

    const { result } = renderHook(() => useAuthState(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle authenticated user state', () => {
    store = createTestStore({
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useAuthState(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current).toEqual({
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });
  });

  it('should handle loading state', () => {
    store = createTestStore({
      isAuthenticated: false,
      isLoading: true,
      error: null,
    });

    const { result } = renderHook(() => useAuthState(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current).toEqual({
      isAuthenticated: false,
      isLoading: true,
      error: null,
    });
  });

  it('should handle error state', () => {
    const errorMessage = 'Network error';
    store = createTestStore({
      isAuthenticated: false,
      isLoading: false,
      error: errorMessage,
    });

    const { result } = renderHook(() => useAuthState(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current).toEqual({
      isAuthenticated: false,
      isLoading: false,
      error: errorMessage,
    });
  });

  it('should select only auth-related properties from state', () => {
    store = createTestStore({
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useAuthState(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(Object.keys(result.current).sort()).toEqual([
      'error',
      'isAuthenticated',
      'isLoading',
    ]);
  });

  it('should handle null error state', () => {
    store = createTestStore({
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useAuthState(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.error).toBeNull();
  });

  it('should handle combined loading and authenticated state', () => {
    store = createTestStore({
      isAuthenticated: false,
      isLoading: true,
      error: null,
    });

    const { result } = renderHook(() => useAuthState(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();
  });
});
