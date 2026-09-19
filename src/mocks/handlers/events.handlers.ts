import { http, HttpResponse } from 'msw';
import type { EventsResponse } from '../../redux/api/events.api';

export const createGetEventsHandlerWithDelay = (
  events: EventsResponse,
  delayMs: number = 0
) => [
  http.get(
    'http://localhost:3001/api/v1/events',
    async (): Promise<HttpResponse<EventsResponse>> => {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      return HttpResponse.json(events);
    }
  ),
];

export const eventsHandlers = [createGetEventsHandlerWithDelay];
