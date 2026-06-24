import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { AuthUser } from "@/types/auth.types";

interface AuthState {
  user: AuthUser | null;
}

const initialState: AuthState = {
  user: localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth")!)
    : null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setAuth: (
      state,
      action: PayloadAction<AuthUser>
    ) => {
      state.user = action.payload;

      localStorage.setItem(
        "auth",
        JSON.stringify(action.payload)
      );
    },

    logout: (state) => {
      state.user = null;

      localStorage.removeItem("auth");
    },
  },
});

export const {
  setAuth,
  logout,
} = authSlice.actions;

export default authSlice.reducer;