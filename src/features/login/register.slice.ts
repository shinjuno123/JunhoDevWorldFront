import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {axios} from '../../api-client';
import { AxiosError } from 'axios';

interface RegisterResponse {
    status: {is_success: boolean, message: string};
}


interface RegisterState {
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    status: {is_success: boolean, message: string};
}


export const registerUser = createAsyncThunk<RegisterResponse| undefined, {username:string, password:string}>(
    'register',
    async (data) => {
        try {
            const response = await axios.post(`/account/register`, data, {
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

const initialState: RegisterState = {
    status: {is_success: false, message: ''},
    loading: 'idle'
}



const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setStatus(state, action) {
            state.status = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.fulfilled, (state, action) => {
            if (state.status && action.payload) {
                state.status = action.payload.status;
                state.loading = 'succeeded';
            }

        })

        .addCase(registerUser.pending, (state) => {
            state.loading = 'pending';
        })

        .addCase(registerUser.rejected, (state) => {
            state.loading = 'failed';
        })
    },
});


export default registerSlice.reducer;
export const {setStatus} = registerSlice.actions;