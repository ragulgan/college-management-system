import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userUpdate } from "../../api/authApi";

export const userUpdateMethod = createAsyncThunk('user/update', async ({ id, credentials }, thunkAPI) => {
    try {
        const response = await userUpdate(id, credentials);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

const userUpdateSlice = createSlice({
    name: 'userUpdate',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userUpdateMethod.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userUpdateMethod.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.error = null;
            })
            .addCase(userUpdateMethod.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.payload?.message || 'Failed to add user';
            });
    },
});

export default userUpdateSlice.reducer;
