import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'http://localhost:5000/';

const getAuthToken = () => {
  return `Bearer ${localStorage.getItem('jwtToken')}`;
};

export const testsApi = createApi({
  reducerPath: 'testsApi',
  tagTypes: ['Tests'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: headers => {
      headers.set('Authorization', getAuthToken());
      return headers;
    },
  }),
  endpoints: builder => ({
    getAllTests: builder.query({
      query: () => ({
        url: '/tests/getAllTests',
        method: 'GET',
      }),
    }),
    getTestById: builder.query({
      query: testId => ({
        url: `/tests/getTestById/${testId}`,
        method: 'GET',
      }),
    }),
    createTest: builder.mutation({
      query: testInput => ({
        url: '/tests/createTest',
        method: 'POST',
        body: testInput,
      }),
    }),
  }),
});

export const {
  useGetAllTestsQuery,
  useGetTestByIdQuery,
  useCreateTestMutation,
} = testsApi;
