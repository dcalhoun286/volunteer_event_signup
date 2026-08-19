import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../api/auth.api";

export interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Login
        builder.addMatcher(
            authApi.endpoints.login.matchPending,
            (state) => {
                state.isLoading = true;
                state.error = null;
            }
        );
        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state) => {
                state.isLoading = false;
                state.isAuthenticated = true;
            }
        );
        builder.addMatcher(
            authApi.endpoints.login.matchRejected,
            (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Login failed";
                state.isAuthenticated = false;
            }
        );

        // Register
        builder.addMatcher(
            authApi.endpoints.register.matchPending,
            (state) => {
                state.isLoading = true;
                state.error = null;
            }
        );
        builder.addMatcher(
            authApi.endpoints.register.matchFulfilled,
            (state) => {
                state.isLoading = false;
                state.isAuthenticated = true;
            }
        );
        builder.addMatcher(
            authApi.endpoints.register.matchRejected,
            (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Registration failed";
            }
        );

        // Logout
        builder.addMatcher(
            authApi.endpoints.logout.matchFulfilled,
            (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.error = null;
            }
        );
    },
});

export const { clearError, setAuthenticated } = authSlice.actions;
export default authSlice.reducer;
