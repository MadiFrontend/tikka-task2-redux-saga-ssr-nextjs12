import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  data: Array<{ id: number; name: string }>;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsersStart: (state) => {
      state.loading = true;
    },
    fetchUsersSuccess: (
      state,
      action: PayloadAction<Array<{ id: number; name: string }>>
    ) => {
      state.data = action.payload;
      state.loading = false;
    },
    fetchUsersFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure } =
  userSlice.actions;
export default userSlice.reducer;
