import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'http://localhost:5000/';

const getAuthToken = () => {
  return `Bearer ${localStorage.getItem('jwtToken')}`;
};

export const usersApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['Users'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: headers => {
      headers.set('Authorization', getAuthToken());
      return headers;
    },
  }),
  endpoints: builder => ({
    registration: builder.mutation({
      query: data => ({
        url: '/auth/registration',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: data => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    getUserById: builder.query({
      query: userId => ({
        url: `/users/getUserById/${userId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useRegistrationMutation,
  useLoginMutation,
  useGetUserByIdQuery,
} = usersApi;
