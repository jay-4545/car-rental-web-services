import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUser: (state, actions) => {},
    unSetUser: (state, actions) => {},
  },
});

export const { setUser, unSetUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
