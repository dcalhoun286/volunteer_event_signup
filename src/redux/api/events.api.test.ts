import { eventsApi } from './events.api';

describe('eventsApi', () => {
  describe('endpoints', () => {
    it('should have getEvents query', () => {
      expect(eventsApi.endpoints.getEvents).toBeDefined();
    });
  });

  describe('getEvents query', () => {
    it('should build correct query', () => {
      const query = eventsApi.endpoints.getEvents.initiate();
      expect(query).toBeDefined();
    });
  });
});
