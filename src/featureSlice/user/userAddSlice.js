import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userAdd } from "../../api/authApi";

export const userAddMethod = createAsyncThunk('user/add', async (credentials, thunkAPI) => {
    try {
        const response = await userAdd(credentials);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

const userAddSlice = createSlice({
    name: 'userAdd',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userAddMethod.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userAddMethod.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.error = null;
            })
            .addCase(userAddMethod.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.payload?.message || 'Failed to add user';
            });
    },
});

export default userAddSlice.reducer;
