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
    token: string;
}

const baseUrl = import.meta.env.VITE_API_URL;

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl,
        credentials: "include"
    }),
    endpoints: (builder) => ({
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
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "/users/logout",
                method: "POST",
            }),
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = authApi;
