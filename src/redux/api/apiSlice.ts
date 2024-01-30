import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { setToken } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState() as RootState;
    if (token) {
      headers.set("Authorization", `Bearer ${token.token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: any,
  api: any,
  extraOptions: any
): Promise<any> => {
  try {
    let result = await baseQuery(args, api, extraOptions);

    if (
      result.meta?.response?.status &&
      result.meta?.response?.status === 403
    ) {
      // Send the refresh token to get the access token
      const refreshResult: any = await baseQuery(
        "/auth/refresh",
        api,
        extraOptions
      );

      if (refreshResult?.data) {
        // Store the new access token
        api.dispatch(setToken(refreshResult.data));

        // Retry the original request with the new access token
        result = await baseQuery(args, api, extraOptions);
      }
      return refreshResult;
    }
    return result;
  } catch (error) {
    console.log("Error fetching base query", error);
  }
};

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Users", "Notes"],
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
