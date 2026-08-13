import authReducer, { setToken, setUser, logout } from "./auth.slice";

import type { User } from "./auth.slice";
import type { AuthState } from "./auth.slice";

describe("authSlice", () => {
    beforeEach(() => {
        const localStorageMock = {
            getItem: vi.fn(),
            setItem: vi.fn(),
            removeItem: vi.fn(),
            clear: vi.fn(),
        }
        globalThis.localStorage = localStorageMock as any;
    });

    afterAll(() => {
        vi.clearAllMocks();
    });

    const initialState: AuthState = {
        token: null,
        user: null,
        isAuthenticated: false,
    };

    it("should return the initial state", () => {
        expect(authReducer(undefined, { type: "unknown" })).toEqual(initialState);
    });

    describe("setToken", () => {
        it("should set token and mark as authenticated", () => {
            const token = "test-token-123";
            const state = authReducer(initialState, setToken(token));

            expect(state.token).toBe(token);
            expect(state.isAuthenticated).toBe(true);
        });
    });

    describe("setUser", () => {
        it("should set user info", () => {
            const user: User = { id: "1", email: "test@example.com" };
            const state = authReducer(initialState, setUser(user));

            expect(state.user).toEqual(user);
        });
    });

    describe("logout", () => {
        it("should clear token, user, and auth status", () => {
            const stateWithAuth: AuthState = {
                token: "test-token-456",
                user: { id: "1", email: "test@example.com" },
                isAuthenticated: true,
            };

            const state = authReducer(stateWithAuth, logout());

            expect(state.token).toBeNull();
            expect(state.user).toBeNull();
            expect(state.isAuthenticated).toBe(false);
        });
    });
});
