import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (queryParams) => ({
        url: "/book/all",
        params: queryParams,
      }),
    }),

    getSingleBook: builder.query({
      query: ({ id }) => ({
        url: `/book/single/${id}`,
      }),
    }),
    getTopBooks: builder.query({
      query: ({ id }) => ({
        url: "/access/stats/most-purchased-books",
      }),
    }),

    initiatePayment: builder.mutation({
      query: (paymentData) => ({
        url: "/payment/initiate",
        method: "POST",
        body: paymentData,
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetSingleBookQuery,
  useInitiatePaymentMutation,
  useGetTopBooksQuery,
} = bookApi;
