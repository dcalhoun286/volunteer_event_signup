import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_URL;

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl,
    }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userData) => ({
                url: "/users",
                method: "POST",
                body: { user: userData },
            }),
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: "/users/login",
                method: "POST",
                body: { user: credentials },
            }),
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
