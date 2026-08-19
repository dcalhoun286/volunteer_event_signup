import { http, HttpResponse } from "msw";

export const authHandlers = [
    http.post(
        "http://localhost:3001/api/v1/users/login",
        () => {
            return HttpResponse.json({ success: true });
        }
    ),
    http.post(
        "http://localhost:3001/api/v1/users",
        () => {
            return HttpResponse.json({ success: true });
        }
    ),
    http.post(
        "http://localhost:3001/api/v1/users/logout",
        () => {
            return HttpResponse.json({ success: true });
        }
    ),
    http.get(
        "http://localhost:3001/api/v1/users/me",
        () => {
            return HttpResponse.json({ success: true });
        }
    ),
];
