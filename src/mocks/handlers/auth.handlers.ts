import { http, HttpResponse } from 'msw';
import type {
  AuthResponse,
  CurrentUserResponse,
} from '../../redux/api/auth.api';

type UnauthorizedResponse = {
  error: string;
};

type UnsuccessfulRegisterResponse = {
  errors: string[];
};

export const authHandlers = [
  http.post('http://localhost:3001/api/v1/users/login', () => {
    return HttpResponse.json({ success: true });
  }),
  http.post('http://localhost:3001/api/v1/users', () => {
    return HttpResponse.json({ success: true });
  }),
  http.post('http://localhost:3001/api/v1/users/logout', () => {
    return HttpResponse.json({ success: true });
  }),
  http.get('http://localhost:3001/api/v1/users/me', () => {
    return HttpResponse.json({ success: true });
  }),
];

const createGetCurrentUserHandler = (authenticated: boolean=true): ReturnType<typeof http.get> => {
  return http.get<never, never, CurrentUserResponse | UnauthorizedResponse>('http://localhost:3001/api/v1/users/me', () => {
    if (!authenticated) {
      return HttpResponse.json<UnauthorizedResponse>(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    return HttpResponse.json<CurrentUserResponse>({ success: true });
  });
};

const createLoginHandler = (authenticated: boolean=true): ReturnType<typeof http.post> => {
  return http.post<never, never, AuthResponse | UnauthorizedResponse>('http://localhost:3001/api/v1/users/login', () => {
    if (!authenticated) {
      return HttpResponse.json<UnauthorizedResponse>(
        { error: 'Incorrect username and/or password' },
        { status: 401 }
      );
    }
    return HttpResponse.json<AuthResponse>({ success: true });
  });
};

const createLogoutHandler = (authenticated: boolean=true): ReturnType<typeof http.post> => {
  return http.post<never, never, AuthResponse | UnauthorizedResponse>('http://localhost:3001/api/v1/users/logout', () => {
    if (!authenticated) {
      return HttpResponse.json<UnauthorizedResponse>(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    return HttpResponse.json<AuthResponse>({ success: true });
  });
};

const createRegisterHandler = (errors: string[] = []): ReturnType<typeof http.post> => {
  return http.post<never, never, AuthResponse | UnsuccessfulRegisterResponse>('http://localhost:3001/api/v1/users', () => {
    if (errors.length > 0) {
      return HttpResponse.json<UnsuccessfulRegisterResponse>(
        { errors },
        { status: 422 }
      );
    }
    return HttpResponse.json<AuthResponse>({ success: true });
  });
};
