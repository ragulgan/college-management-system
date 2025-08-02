import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userList } from '../../api/authApi';

export const fetchUserList = createAsyncThunk('user/fetchUserList', async (params, { rejectWithValue }) => {
    try {
        const response = await userList({ params });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
}
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        count: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserList.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.data || [];
                state.count = action.payload.count || 0;
                state.error = null;
            })
            .addCase(fetchUserList.rejected, (state, action) => {
                state.loading = false;
                state.users = [];
                state.count = 0;
                state.error = action.payload?.message || 'Failed to fetch users';
            });
    },
});

export default userSlice.reducer;