import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../../api/authApi";

export const login = createAsyncThunk('login/admin', async (credentials, thunkAPI) => {
    try {
      const response = await loginUser(credentials);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  });

  const authSlice = createSlice({
    name: 'auth',
    initialState: {
      user: null,
      token: localStorage.getItem('adminInfo'),
      status: 'idle',
      error: null,
    },
    reducers: {
      logout: (state) => {
        state.token = null;
        state.user = null;
        localStorage.removeItem('adminInfo');
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(login.fulfilled, (state, action) => {
          state.token = action.payload.data;
          localStorage.setItem('adminInfo', JSON.stringify(action.payload.data));
          state.user = action.payload.data;
        })
        .addCase(login.rejected, (state, action) => {
          state.error = action.payload;
        });
    },
  });
  
  export const { logout } = authSlice.actions;
  export default authSlice.reducer;
