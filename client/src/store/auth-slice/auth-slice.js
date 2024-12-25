import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
  isError: false,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData) => {
    const responce = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/register`,
      formData,
      {
        withCredentials: true,
      }
    );

    return responce.data;
  }
);

export const loginUser = createAsyncThunk("auth/login", async (formData) => {
  const responce = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/login`,
    formData,
    {
      withCredentials: true,
    }
  );
  return responce.data;
});


export const logoutUser = createAsyncThunk(
  "/auth/logout",

  async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);


export const checkAuth = createAsyncThunk(
  "/auth/checkauth",

  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
      {
        withCredentials: true,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );

    return response.data;
  }
);

const authSlicer = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => { },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
        state.user = null;
        state.isError = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.isError = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.isError = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.isError = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.success;
        state.user = action.payload.success ? action.payload.user : null;
        state.isError = action.payload.success;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.isError = true;
      }).addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
        state.user = null;
        state.isError = false;
      }).addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
        state.isError = false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.isError = false;
      }).addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.isError = false;
      });
  },
});

export default authSlicer.reducer;
