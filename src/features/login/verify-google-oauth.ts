import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

interface VerifyResponse {
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

export const verifyAccessToken = createAsyncThunk<VerifyState['userInfo'], string>(
    'google-verify',
    async (accessToken) => {
        const result =  {
            name: '',
            given_name: '',
            family_name: '',
            picture: ''
        };

        const response: VerifyResponse = await axios.post(`/oauth/google`, {accessToken: accessToken}, {
            headers: {
                'Content-Type' : 'application/json'
            }
        });

        if (response.userInfo) {
            result.family_name = response.userInfo.family_name;
            result.given_name = response.userInfo.given_name;
            result.name = response.userInfo.name;
            result.picture = response.userInfo.picture;
        }

        return result;
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