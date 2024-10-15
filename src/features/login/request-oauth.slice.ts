import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/*
Google Oauth Request

https://accounts.google.com/o/oauth2/v2/auth?
scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly &
prompt=consent &
response_type=token &
redirect_uri=http://localhost:5173 &
client_id=CLIENT_ID
*/

/*

Google Oauth Response

http://localhost:5173/
#access_token=ya29.a0AcM612yt00zFIkT00v1ZLVwobbfFYEJG7CI67MM8Arb51kXJWOArUu84wG0HvcYwUJqw15iCguDOjJr1cJfx4M_l3uZTl2XbOuM_-92W5ow1kIXz5GOFxNBgred4yRydpVAKPSF87hu8kw_BRYadIx-6tmLPTw9MIcbOCf7FaCgYKAUgSARASFQHGX2Mi6QGiG68Jhv77rwBpA4lUNQ0175 &
token_type=Bearer &
expires_in=3599 &
scope=https://www.googleapis.com/auth/drive.metadata.readonly
*/



interface OauthState {
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: OauthState = {
    loading: 'idle',
}

export const getOauthUrl = createAsyncThunk<string, { platform: string }>(
    'oauth',
    async (_data) => {
        const authURl = import.meta.env.VITE_GOOGLE_OAUTH_AUTH_URL as string;
        const clientId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID as string;
        const redirectUri = import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT_URI as string;
        const scope = import.meta.env.VITE_GOOGLE_OAUTH_SCOPE;
        const responseType = import.meta.env.VITE_GOOGLE_OAUTH_RESPONSE_TYPE;
        const prompt = import.meta.env.VITE_GOOGLE_OAUTH_PROMPT;

        const fullUrl = new URL(authURl);

        fullUrl.searchParams.append("client_id", clientId);
        fullUrl.searchParams.append("redirect_uri", redirectUri);
        fullUrl.searchParams.append("scope", scope);
        fullUrl.searchParams.append("response_type", responseType);
        fullUrl.searchParams.append("prompt", prompt);


        window.location.href = fullUrl.toString();

        return fullUrl.toString();
    }
)



const oauthSlice = createSlice({
    name: 'oauth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getOauthUrl.fulfilled, (state) => {
            state.loading = 'succeeded';

        })

        .addCase(getOauthUrl.pending, (state) => {
            state.loading = 'pending';
        })

        .addCase(getOauthUrl.rejected, (state) => {
            state.loading = 'failed';
        })

    },

});



// export const { getOAuthUrl: getOuathUrl } = oauthSlice.actions;
export default oauthSlice.reducer;