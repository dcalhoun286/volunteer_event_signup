import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/auth.api';
import { eventsApi } from './api/events.api';
import authReducer from './slices/auth.slice';

const apis = [authApi, eventsApi];

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apis.map((api) => api.middleware)),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
