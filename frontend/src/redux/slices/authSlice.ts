import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    host: null,
  },
  reducers: {},
});

export default authSlice.reducer;
