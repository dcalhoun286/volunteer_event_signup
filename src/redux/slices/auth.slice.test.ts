import authReducer, { setUser, logout } from "./auth.slice";

import type { User } from "./auth.slice";
import type { AuthState } from "./auth.slice";

describe("authSlice", () => {
    const initialState: AuthState = {
        user: null,
        isAuthenticated: false,
    };

    it("should return the initial state", () => {
        expect(authReducer(undefined, { type: "unknown" })).toEqual(initialState);
    });

    describe("setUser", () => {
        it("should set user info and mark as authenticated", () => {
            const user: User = { id: "1", email: "test@example.com" };
            const state = authReducer(initialState, setUser(user));

            expect(state.user).toEqual(user);
            expect(state.isAuthenticated).toBe(true);
        });
    });

    describe("logout", () => {
        it("should clear user and auth status", () => {
            const stateWithAuth: AuthState = {
                user: { id: "1", email: "test@example.com" },
                isAuthenticated: true,
            };

            const state = authReducer(stateWithAuth, logout());

            expect(state.user).toBeNull();
            expect(state.isAuthenticated).toBe(false);
        });
    });
});
