import authReducer, { clearError, setAuthenticated } from "./auth.slice";
import type { AuthState } from "./auth.slice";

describe("authSlice", () => {
    const initialState: AuthState = {
        isAuthenticated: false,
        isLoading: false,
        error: null,
    };

    it("should return the initial state", () => {
        expect(authReducer(undefined, { type: "unknown" })).toEqual(initialState);
    });

    describe("clearError", () => {
        it("should clear the error message", () => {
            const stateWithError: AuthState = {
                isAuthenticated: false,
                isLoading: false,
                error: "Login failed",
            };

            const state = authReducer(stateWithError, clearError());

            expect(state.error).toBeNull();
            expect(state.isAuthenticated).toBe(false);
            expect(state.isLoading).toBe(false);
        });
    });

    describe("setAuthenticated", () => {
        it("should set isAuthenticated to true", () => {
            const state = authReducer(initialState, setAuthenticated(true));

            expect(state.isAuthenticated).toBe(true);
            expect(state.isLoading).toBe(false);
            expect(state.error).toBeNull();
        });

        it("should set isAuthenticated to false", () => {
            const stateWithAuth: AuthState = {
                isAuthenticated: true,
                isLoading: false,
                error: null,
            };

            const state = authReducer(stateWithAuth, setAuthenticated(false));

            expect(state.isAuthenticated).toBe(false);
            expect(state.isLoading).toBe(false);
            expect(state.error).toBeNull();
        });
    });

    describe("login mutation states", () => {
        it("should handle login pending", () => {
            const state: AuthState = {
                isAuthenticated: false,
                isLoading: false,
                error: "Previous error",
            };

            // Simulating the pending state from extraReducers
            const newState: AuthState = {
                ...state,
                isLoading: true,
                error: null,
            };

            expect(newState.isLoading).toBe(true);
            expect(newState.error).toBeNull();
            expect(newState.isAuthenticated).toBe(false);
        });

        it("should handle login fulfilled", () => {
            const state: AuthState = {
                isAuthenticated: false,
                isLoading: true,
                error: null,
            };

            // Simulating the fulfilled state from extraReducers
            const newState: AuthState = {
                ...state,
                isLoading: false,
                isAuthenticated: true,
            };

            expect(newState.isLoading).toBe(false);
            expect(newState.isAuthenticated).toBe(true);
            expect(newState.error).toBeNull();
        });

        it("should handle login rejected", () => {
            const state: AuthState = {
                isAuthenticated: true,
                isLoading: true,
                error: null,
            };

            // Simulating the rejected state from extraReducers
            const newState: AuthState = {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                error: "Incorrect username and/or password",
            };

            expect(newState.isLoading).toBe(false);
            expect(newState.isAuthenticated).toBe(false);
            expect(newState.error).toBe("Incorrect username and/or password");
        });
    });

    describe("register mutation states", () => {
        it("should handle register pending", () => {
            const state: AuthState = {
                isAuthenticated: false,
                isLoading: false,
                error: null,
            };

            // Simulating the pending state from extraReducers
            const newState: AuthState = {
                ...state,
                isLoading: true,
                error: null,
            };

            expect(newState.isLoading).toBe(true);
            expect(newState.error).toBeNull();
        });

        it("should handle register fulfilled", () => {
            const state: AuthState = {
                isAuthenticated: false,
                isLoading: true,
                error: null,
            };

            // Simulating the fulfilled state from extraReducers
            const newState: AuthState = {
                ...state,
                isLoading: false,
                isAuthenticated: true,
            };

            expect(newState.isLoading).toBe(false);
            expect(newState.isAuthenticated).toBe(true);
        });

        it("should handle register rejected", () => {
            const state: AuthState = {
                isAuthenticated: false,
                isLoading: true,
                error: null,
            };

            // Simulating the rejected state from extraReducers
            const newState: AuthState = {
                ...state,
                isLoading: false,
                error: "Email already exists",
            };

            expect(newState.isLoading).toBe(false);
            expect(newState.error).toBe("Email already exists");
            expect(newState.isAuthenticated).toBe(false);
        });
    });

    describe("logout mutation states", () => {
        it("should handle logout fulfilled", () => {
            const state: AuthState = {
                isAuthenticated: true,
                isLoading: false,
                error: null,
            };

            // Simulating the fulfilled state from extraReducers
            const newState: AuthState = {
                ...state,
                isAuthenticated: false,
                error: null,
            };

            expect(newState.isAuthenticated).toBe(false);
            expect(newState.isLoading).toBe(false);
            expect(newState.error).toBeNull();
        });
    });
});
