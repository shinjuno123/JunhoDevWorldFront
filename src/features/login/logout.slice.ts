import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {axios} from '../../api-client';
import { AxiosError } from 'axios';

export interface LogoutResponse {
    status: {is_success: boolean, message: string};
}


interface LogoutState {
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    status: {is_success: boolean, message: string};
}


export const logoutUser = createAsyncThunk<LogoutResponse| undefined>(
    'logout',
    async () => {
        const authKey = localStorage.getItem('auth_key');
        try {
            const response = await axios.post(`/account/logout`, {auth_cookie: authKey}, {
                headers: {
                    'Content-Type' : 'application/json'
                }
            });
            localStorage.removeItem('auth_key');
            return response.data;
        } catch (error) {
            return (error as AxiosError).response?.data;
        }
    }
)

const initialState: LogoutState = {
    status: {is_success: false, message: ''},
    loading: 'idle'
}



const logoutSlice = createSlice({
    name: 'logout',
    initialState,
    reducers: {
        setStatus(state, action) {
            state.status = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            if (state.status && action.payload) {
                state.status = action.payload.status;
                state.loading = 'succeeded';
            }


        })

        .addCase(logoutUser.pending, (state) => {
            state.loading = 'pending';
        })

        .addCase(logoutUser.rejected, (state) => {
            state.loading = 'failed';
        })
    },
});


export default logoutSlice.reducer;
export const {setStatus} = logoutSlice.actions;