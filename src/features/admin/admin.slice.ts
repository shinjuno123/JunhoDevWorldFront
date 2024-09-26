import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {axios} from '../../api-client';

interface AdminInfoResponse {
    adminInfo: AdminInfo;
    status: {is_success: boolean, message: string};    
}


interface AdminInfo {
    name: string;
    description: string;
    avatarUrl: string;
}

interface AdminInfoState {
    adminInfo: AdminInfo,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}


export const fetchAdminInfo = createAsyncThunk<AdminInfoResponse| undefined>(
    'adminInfo',
    async () => {
        try {
            const response = await axios.get(`/admin/v1/admin-info`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
)

const initialState: AdminInfoState = {
    adminInfo: {
        name: '',
        description: '',
        avatarUrl: ''
    },
    loading: 'idle'
}



const adminInfoSlice = createSlice({
    name: 'adminInfo',
    initialState,
    reducers: {
        emptyNotes(state) {
            state.adminInfo = {
                name: '',
                description: '',
                avatarUrl: ''
            };
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAdminInfo.fulfilled, (state, action) => {
            if (state.adminInfo && action.payload) {
                state.adminInfo = action.payload.adminInfo;
                state.loading = 'succeeded';
            }
        })

        .addCase(fetchAdminInfo.pending, (state) => {
            state.loading = 'pending';
        })

        .addCase(fetchAdminInfo.rejected, (state) => {
            state.loading = 'failed';
        })
    },
});


export default adminInfoSlice.reducer;
export const {emptyNotes} = adminInfoSlice.actions;