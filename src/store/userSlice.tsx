
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export { }
export interface Users {
    id: number;
    username: string;
    email: string;
    address: Address;
    company: Company;
}

export interface Address {
    street: string;
    city: string;
}

export interface Company {
    name: string;
}

export interface RootState {
    users: {
        data: Users[];
        loading: boolean;
        error: string | null;
    };
}

export const fetchUsers = createAsyncThunk<Users[], void>('users/fetchUsers', async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch users.');
    }
});

const usersSlice = createSlice({
    name: 'users',
      initialState: {
        data: [] as Users[],
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch users.';
        });
    },
});

export default usersSlice.reducer;

