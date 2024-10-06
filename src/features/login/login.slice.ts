import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {axios} from '../../api-client';
import { AxiosError } from 'axios';

interface LoginResponse {
    status: {is_success: boolean, message: string};
    auth_cookie : string;
}


interface LoginState {
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    status: {is_success: boolean, message: string};
}


export const loginUser = createAsyncThunk<LoginResponse| undefined, {username:string, password:string}>(
    'login',
    async (data) => {
        try {
            const response = await axios.post(`/account/login`, data, {
                headers: {
                    'Content-Type' : 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            return (error as AxiosError).response?.data;
        }
    }
)

const initialState: LoginState = {
    status: {is_success: false, message: ''},
    loading: 'idle'
}



const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setStatus(state, action) {
            state.status = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            if (state.status && action.payload) {
                state.status = action.payload.status;
                localStorage.setItem('auth_key', action.payload.auth_cookie);
                state.loading = 'succeeded';
            }

        })

        .addCase(loginUser.pending, (state) => {
            state.loading = 'pending';
        })

        .addCase(loginUser.rejected, (state) => {
            state.loading = 'failed';
        })
    },
});


export default loginSlice.reducer;
export const {setStatus} = loginSlice.actions;