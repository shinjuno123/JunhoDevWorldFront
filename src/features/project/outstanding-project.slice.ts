import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


interface OutstandingProjectResponse {
    outstandingProjects: OutstandingProject[],
    status: {is_success: boolean, message: string};  
}

interface OutstandingProject {
    id: number;
    title: string;
    description: string;
    skills: string[],
    background: string;
    github_link: string;
    isOutstandingProject: boolean; 
}

interface OutstandingProjectState {
    outstandingProjects: Record<number, OutstandingProject>;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: OutstandingProjectState = {
    outstandingProjects: {},
    loading: 'idle',
}

export const fetchOutstandingProjects = createAsyncThunk<OutstandingProjectResponse| undefined>(
    'FetchOutstandingProjects',
    async () => {
        try {
            const response = await axios.get(`/project/v1/outstanding-projects`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
)


const outstandingProjectSlice = createSlice({
    name: 'FetchOutstandingProjects',
    initialState,
    reducers: {
        emptyProjects(state) {
            state.outstandingProjects = {};
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchOutstandingProjects.fulfilled, (state, action) => {
            if (action.payload&& action.payload.outstandingProjects) {
                action.payload.outstandingProjects.forEach((post) => {
                    state.outstandingProjects[post.id] = post;
                });
                state.loading = 'succeeded';
            }
        })

        .addCase(fetchOutstandingProjects.pending, (state) => {
            state.loading = 'pending';
        })

        .addCase(fetchOutstandingProjects.rejected, (state) => {
            state.loading = 'failed';
        })
    },
});


export default outstandingProjectSlice.reducer;
export const {emptyProjects} = outstandingProjectSlice.actions;




