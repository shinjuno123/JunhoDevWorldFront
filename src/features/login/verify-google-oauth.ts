import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {axios} from '../../api-client';

/*
Server access token verification Response

{
    "userInfo": {
        "sub": "",
        "name": "",
        "given_name": "",
        "family_name": "",
        "picture": ""
    } | null,
    "status": {
        "is_success": true|false,
        "message": "user_verified"
    }
}
*/


interface VerifyState {
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    userInfo: {
        name: string,
        given_name: string,
        family_name: string,
        picture: string
    };
}

export interface VerifyResponse {
    userInfo: {
        name: string,
        given_name: string,
        family_name: string,
        picture: string
    } | null;
    status: {is_success: boolean, message: string};
}

const initialState: VerifyState = {
    loading: 'idle',
    userInfo: {
        name: '',
        given_name: '',
        family_name: '',
        picture: ''
    }
}

export const verifyAccessToken = createAsyncThunk<VerifyResponse, string>(
    'google-verify',
    async (accessToken: string) => {

        try{
            const result: VerifyResponse =  {
                userInfo: {
                    name: '',
                    given_name: '',
                    family_name: '',
                    picture: ''
                },
                status: {is_success: false, message: ''}
            };


            return (await axios.post('/oauth/google', {accessToken: accessToken}, {
                headers: {
                    'Content-Type' : 'application/json'
                }
            })).data;

            
        }
        catch (error) {
            return (error as AxiosError).response?.data;
        }

       
    }
)



const googleVerifySlice = createSlice({
    name: 'google-verify',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(verifyAccessToken.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.userInfo = action.payload;
        })

        .addCase(verifyAccessToken.pending, (state) => {
            state.loading = 'pending';
        })

        .addCase(verifyAccessToken.rejected, (state) => {
            state.loading = 'failed';
        })

    },

});


export default googleVerifySlice.reducer;