import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/category",
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
