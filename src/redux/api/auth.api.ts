import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface RegisterRequest {
    email: string;
    password: string;
    password_confirmation: string;
    first_name: string;
    last_name: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    success: boolean;
}

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        getCurrentUser: builder.query<{ success: boolean }, void>({
            query: () => "users/me",
        }),
        register: builder.mutation<AuthResponse, RegisterRequest>({
            query: (userData) => ({
                url: "/users",
                method: "POST",
                body: { user: userData },
            }),
        }),
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (credentials) => ({
                url: "/users/login",
                method: "POST",
                body: { user: credentials },
            }),
        }),
        logout: builder.mutation<AuthResponse, void>({
            query: () => ({
                url: "/users/logout",
                method: "POST",
            }),
        }),
    }),
});

export const {
    useGetCurrentUserQuery,
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation
} = authApi;
