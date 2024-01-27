import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IAuth {
  token: string | null;
}

const initialState: IAuth = {
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state: IAuth, action: PayloadAction<string>) => {
      const token = action.payload;
      state.token = token;
    },
    logout: (state: IAuth) => {
      state.token = null;
    },
  },
});

export const { setToken, logout } = authSlice.actions;

export default authSlice.reducer;

export const getToken = (state: RootState) => state.token;
