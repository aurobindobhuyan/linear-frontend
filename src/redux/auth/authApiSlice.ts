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

          // Storing the date in localStorage for 1 day;
          const expirationDate = new Date();
          expirationDate.setTime(
            expirationDate.getTime() + 1000 * 60 * 60 * 24
          );
          localStorage.setItem(
            "refreshToken",
            JSON.stringify(expirationDate.toUTCString())
          );

          dispatch(setToken(data));
        } catch (error) {
          console.log("error", error);
        }
      },
    }),
    register: build.mutation({
      query: (formData: any) => ({
        url: "/user",
        method: "POST",
        body: formData,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          localStorage.removeItem("refreshToken");
          dispatch(logout());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
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
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useRegisterMutation,
} = authApiSlice;
