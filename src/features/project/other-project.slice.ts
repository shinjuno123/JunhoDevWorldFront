import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


interface OtherProjectResponse {
    projects: OtherProject[],
    status: {is_success: boolean, message: string};  
}

interface OtherProject {
    id: number;
    title: string;
    excerpt: string;
    background: string;
    github_link: string;
    isOutstandingProject: boolean; 
}

interface OtherProjectState {
    projects: Record<number, OtherProject>;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: OtherProjectState = {
    projects: {},
    loading: 'idle',
}

export const fetchOtherProjects = createAsyncThunk<OtherProjectResponse| undefined>(
    'project/FetchOutstandingProjects',
    async () => {
        try {
            const response = await axios.get(`/project/v1/other-projects`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
)


const otherProjectSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        emptyProjects(state) {
            state.projects = {};
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchOtherProjects.fulfilled, (state, action) => {
            if (state.projects&& action.payload) {
                action.payload.projects.forEach((post) => {
                    state.projects = [];
                    state.projects[post.id] = post;
                });
                state.loading = 'succeeded';
            }
        })

        .addCase(fetchOtherProjects.pending, (state) => {
            state.loading = 'pending';
        })

        .addCase(fetchOtherProjects.rejected, (state) => {
            state.loading = 'failed';
        })
    },
});


export default otherProjectSlice.reducer;
export const {emptyProjects} = otherProjectSlice.actions;




