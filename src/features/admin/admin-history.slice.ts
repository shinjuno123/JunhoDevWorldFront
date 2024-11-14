import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {axios} from '../../api-client';

interface AdminHistoryResponse {
    histories: History[];
    workHistories: workExperience[];
    status: {is_success: boolean, message: string};    
}


interface History {
    id: number;
    title: string;
    description: string;
    icon: string;
    place: string;
    date: string;
}

interface workExperience {
    id: number;
    title: string;
    description: string;
    icon: string;
    company: string;
    from: string;
    to: string; 
}

interface HistoryState {
    histories: Record<string, History>;
    experiences: Record<string, workExperience>
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}


export const fetchAdminHistory = createAsyncThunk<AdminHistoryResponse| undefined>(
    'history',
    async () => {
        try {
            const response = await axios.get(`/admin/v1/admin-info/history`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
)

const initialState: HistoryState = {
    histories: {},
    experiences: {},
    loading: 'idle'
}



const adminHistorySlice = createSlice({
    name: 'adminInfo',
    initialState,
    reducers: {
        emptyNotes(state) {
            state.histories = {};
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAdminHistory.fulfilled, (state, action) => {
            if (state.histories && action.payload) {
                action.payload.histories.forEach((history) => {
                    state.histories[history.date] = history;
                });
     
            }

            if (state.experiences && action.payload) { 
                action.payload.workHistories.forEach((experience) => {
                    state.experiences[experience.id] = experience;
                })

            }

            if (state.experiences && state.histories) {
                state.loading = 'succeeded';
            }


        })

        .addCase(fetchAdminHistory.pending, (state) => {
            state.loading = 'pending';
        })

        .addCase(fetchAdminHistory.rejected, (state) => {
            state.loading = 'failed';
        })
    },
});


export default adminHistorySlice.reducer;
export const {emptyNotes} = adminHistorySlice.actions;