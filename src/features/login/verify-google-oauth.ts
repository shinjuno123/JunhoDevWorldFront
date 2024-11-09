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
        azp: string,
        aud: string,
        scope: string,
        exp: string,
        expires_in: string,
        access_type: string
    };
}

export interface VerifyResponse {
    userInfo: {
        azp: string,
        aud: string,
        scope: string,
        exp: string,
        expires_in: string,
        access_type: string
    } | null;
    status: {is_success: boolean, message: string};
}

const initialState: VerifyState = {
    loading: 'idle',
    userInfo: {
        azp: '',
        aud: '',
        scope: '',
        exp: '',
        expires_in: '',
        access_type: ''
    }
}

export const verifyAccessToken = createAsyncThunk<VerifyResponse, string>(
    'google-verify',
    async (accessToken: string) => {

        try{
            return (await axios.post('/oauth/platforms/google', {accessToken: accessToken}, {
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
            state.userInfo = action.payload.userInfo as {
                azp: string,
                aud: string,
                scope: string,
                exp: string,
                expires_in: string,
                access_type: string
            };
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