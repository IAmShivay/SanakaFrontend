import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Leads } from "../api/leadApi";

interface Credentials {
  name: string;
  email: string;
  phoneNumber: string;
}

interface AuthState {
  user: Credentials | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const leadRegister = createAsyncThunk(
  "auth/leadRegister",
  async (credentials: Credentials, thunkAPI) => {
    try {
      const data = await Leads(credentials);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(leadRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(leadRegister.fulfilled, (state, action: PayloadAction<Credentials>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(leadRegister.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;

// Optionally, export the actions if you have any
// export const {} = authSlice.actions;

// Selector to get the auth state from the store
export const selectAuth = (state: RootState) => state.auth;
