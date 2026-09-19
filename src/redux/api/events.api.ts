import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Event {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  timezone: string;
  created_by_id: number;
  created_at: string;
  updated_at: string;
}

export type EventsRequest = Omit<Event, 'id' | 'created_at' | 'updated_at'>;
export type EventsResponse = Array<Event>;

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: 'include',
  }),
  tagTypes: ['Events'],
  endpoints: (builder) => ({
    getEvents: builder.query<EventsResponse, void>({
      query: () => '/events',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Events' as const, id })),
              'Events',
            ]
          : ['Events'],
    }),
  }),
});

export const { useGetEventsQuery } = eventsApi;
