import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface RegisterRequest {
    email: string;
    password: string;
    password_confirmation: string;
    first_name: string;
    last_name: string;
}

interface LoginRequest {
    email: string;
    password: string;
}

interface AuthResponse {
    token: string;
}

const baseUrl = import.meta.env.VITE_API_URL;

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl,
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
    }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
