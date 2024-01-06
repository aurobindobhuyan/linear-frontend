import {
  createEntityAdapter,
  createSelector,
  EntityState,
} from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { RootState } from "../store";

export interface IUser {
  createdAt: string;
  email: string;
  isActive: true;
  roles: string;
  updatedAt: string;
  username: string;
  __v: number;
  _id: string;
}

const userAdapter = createEntityAdapter({
  selectId: (user: IUser) => user._id,
});

const initialState = userAdapter.getInitialState();

export const extendedUserSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/user",
      transformResponse: (response: { success: boolean; data: IUser[] }) => {
        return userAdapter.addMany(initialState, response.data);
      },
      providesTags: (data: EntityState<IUser, string> | undefined): any => {
        const ids = data?.ids || [];
        return [
          { type: "Users", id: "LIST" },
          ...(ids as string[]).map((id) => ({ type: "Users", id })),
        ];
      },
    }),
  }),
});

export const { useGetUserQuery } = extendedUserSlice;

// Returns the response object
const userResult = extendedUserSlice.endpoints.getUser.select({});

 // Returns the memorized data
const userData = createSelector([userResult], (result) => result.data);

export const { selectAll: selectAllUsers, selectById: selectUserById } = userAdapter.getSelectors(
  (state: RootState) => userData(state) ?? initialState
);
