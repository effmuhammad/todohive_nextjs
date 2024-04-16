import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { create } from "domain";

export interface UserSliceState {
    sessionUserId: number;
  }
  
  const initialState: UserSliceState = {
    sessionUserId: 0,
  };

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: (create) => ({
    setSessionUser: create.reducer((state, action: PayloadAction<number>) => {
      state.sessionUserId = action.payload;
      localStorage.setItem("userId", JSON.stringify(state.sessionUserId));
    }),
  }),
  selectors:{
    selectSessionUserId: (user) => user.sessionUserId,
  }
});

export const { setSessionUser } = userSlice.actions;

export const { selectSessionUserId } = userSlice.selectors;