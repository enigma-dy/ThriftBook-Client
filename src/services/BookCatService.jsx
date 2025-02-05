import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/category",
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
