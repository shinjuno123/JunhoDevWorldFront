import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {axios} from '../../api-client';


interface ProjectResponse {
    projects: Project[],
    status: {is_success: boolean, message: string};  
}

interface Project {
    id: number;
    title: string;
    description: string;
    skills: string[],
    background: string;
    github_link: string;
    isOutstandingProject: boolean; 
}

interface ProjectState {
    projects: Record<number, Project>;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: ProjectState = {
    projects: {},
    loading: 'idle',
}

export const fetchProjects = createAsyncThunk<ProjectResponse| undefined, {skillId: number}>(
    'Projects',
    async (data) => {
        try {
            const response = await axios.get(`/project/v1/projects?skill=${data.skillId}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
)


const projectSlice = createSlice({
    name: 'Projects',
    initialState,
    reducers: {
        emptyProjects(state) {
            state.projects = {};
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchProjects.fulfilled, (state, action) => {
            if (action.payload&& action.payload.projects) {
                action.payload.projects.forEach((post) => {
                    state.projects[post.id] = post;
                });
                state.loading = 'succeeded';
            }
        })

        .addCase(fetchProjects.pending, (state) => {
            state.loading = 'pending';
        })

        .addCase(fetchProjects.rejected, (state) => {
            state.loading = 'failed';
        })
    },
});


export default projectSlice.reducer;
export const {emptyProjects} = projectSlice.actions;




