import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {axios} from '../../api-client';
import { AxiosError } from "axios";

interface EmailResponse {
  status: "success" | "failed";
}

interface Email {
  email: string;
  name: string;
  message: string;
}

interface EmailState {
  loading: "idle" | "pending" | "succeeded" | "failed";
}

export const sendEmail = createAsyncThunk<EmailResponse, Email>(
  "contact",
  async (email) => {
    try {
      const response = await axios.post(`/email/v1/send-email`, email, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return (error as AxiosError).response?.data;
    }
  }
);

const initialState: EmailState = {
  loading: "idle",
};


const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {},
  /**
   * Handles the extra reducers for the sendEmail thunk.
   *
   * Three cases are handled: pending, fulfilled and rejected.
   * - Pending: sets the loading state to "pending".
   * - Fulfilled: sets the loading state to "succeeded".
   * - Rejected: sets the loading state to "failed".
   */
  extraReducers: (builder) => {
    builder
      .addCase(sendEmail.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(sendEmail.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(sendEmail.rejected, (state) => {
        state.loading = "failed";
      });
  },
});


export default emailSlice.reducer;
