import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


interface OtherProjectResponse {
    otherProjects: OtherProject[],
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
    otherProjects: Record<number, OtherProject>;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: OtherProjectState = {
    otherProjects: {},
    loading: 'idle',
}

export const fetchOtherProjects = createAsyncThunk<OtherProjectResponse| undefined, {page: number, limit: number}>(
    'project/FetchOutstandingProjects',
    async ({page, limit}) => {
        try {
            const response = await axios.get(`/project/v1/other-projects?page=${page}&limit=${limit}`);
            console.log(response);
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
            state.otherProjects = {};
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchOtherProjects.fulfilled, (state, action) => {
            if (state.otherProjects&& action.payload && action.payload.otherProjects) {
                action.payload.otherProjects.forEach((post) => {
                    state.otherProjects[post.id] = post;
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




