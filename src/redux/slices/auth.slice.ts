import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    token: string | null;
    user: { id: string; email: string } | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    token: typeof localStorage !== "undefined" ? localStorage.getItem("token") : null,
    user: null,
    isAuthenticated: typeof localStorage !== "undefined" ? !!localStorage.getItem("token") : false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isAuthenticated = true;
            if (typeof localStorage !== "undefined") {
                localStorage.setItem("token", action.payload);
            }
        },
        setUser: (state, action: PayloadAction<{ id: string; email: string }>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            if (typeof localStorage !== "undefined") {
                localStorage.removeItem("token");
            }
        },
    },
});

export const { setToken, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
