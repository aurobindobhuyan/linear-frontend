import { apiSlice } from "../api/apiSlice";
import { logout, setToken } from "./authSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (formData: { email: string; password: string }) => ({
        url: "/auth",
        method: "POST",
        body: { ...formData },
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const expirationDate = new Date();
          expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000);
          document.cookie = `accessToken="${data}; expires=${expirationDate.toUTCString()}`;
          dispatch(setToken(data));
        } catch (error) {
          console.log("error", error);
        }
      },
    }),
    logout: build.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_args, { dispatch, getState, queryFulfilled }) {
        try {
          await queryFulfilled;
          console.log(getState());
          dispatch(logout());
          dispatch(apiSlice.util.resetApiState());
        } catch (error) {
          console.log("error", error);
        }
      },
    }),
    refreshToken: build.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRefreshTokenMutation } =
  authApiSlice;
