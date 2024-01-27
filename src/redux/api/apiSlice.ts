import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Users", "Notes"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/v1",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      
    },
  }),
  endpoints: () => ({}),
});

// "https://jsonplaceholder.typicode.com",
// "http://localhost:5000/v1",
