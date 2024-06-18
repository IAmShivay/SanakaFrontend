import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Leads } from "../api/leadApi";

interface Credentials {
    name: string;
    email: string;
    phoneNumber: string;
  }



export const leadRegister = createAsyncThunk(
    "auth/registerUser",
    async (credentials: Credentials, thunkAPI) => {
      try {
        const data = await Leads(credentials);
        return data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  