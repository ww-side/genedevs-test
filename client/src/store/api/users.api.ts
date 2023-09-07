import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'http://localhost:5000/';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['Users'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: builder => ({
    registration: builder.mutation({
      query: data => ({
        url: '/auth/registration',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useRegistrationMutation } = usersApi;
