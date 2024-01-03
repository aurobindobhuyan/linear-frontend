import {
  createEntityAdapter,
  createSelector,
  EntityState,
} from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { RootState } from "../store";

interface INote {
  body: string;
  completed: boolean;
  createdAt: string;
  createdUserId: string;
  ticket: number;
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

const notesAdapter = createEntityAdapter({
  selectId: (note: INote) => note._id,
});

const initialState = notesAdapter.getInitialState();

export const extendedNotesSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/note",
      transformResponse: (response: { success: boolean; data: INote[] }) => {
        return notesAdapter.upsertMany(initialState, response.data);
      },
      providesTags: (data: EntityState<INote, string> | undefined): any => {
        const ids = data?.ids || [];
        return [
          { type: "Notes", id: "LIST" },
          ...(ids as string[]).map((id) => ({ type: "Notes", id })),
        ];
      },
    }),
  }),
});

export const { useGetPostsQuery } = extendedNotesSlice;

const getResponse = extendedNotesSlice.endpoints.getPosts.select({});

const memorizedNotes = createSelector(
  [getResponse],
  (response) => response.data
);

export const { selectAll: selectAllNotes, selectById: selectNoteById } = notesAdapter.getSelectors(
  (state: RootState) => memorizedNotes(state) ?? initialState
);
