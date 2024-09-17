import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import store from '../../app/store';
import { useAppSelector } from '../../app/hooks';


interface OtherProjectResponse {
    otherProjects: OtherProject[],
    status: {is_success: boolean, message: string};  
    next_page_url: string;
    prev_page_url: string;
    maxPage: number;
    currentPage: number;
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
    nextPageUrl: string;
    previousPageUrl: string;
    maxPage: number;
    currentPage: number;
}

const initialState: OtherProjectState = {
    otherProjects: {},
    nextPageUrl: '',
    previousPageUrl: '',
    loading: 'idle',
    maxPage: 0,
    currentPage: 1
}

export const fetchOtherProjects = createAsyncThunk<OtherProjectResponse| undefined, {page: number, limit: number, nextPage: {activated: boolean, url: string}}>(
    'project/FetchOutstandingProjects',
    async ({page, limit, nextPage={activated: false, url: ''}}) => {
        try {
            if (nextPage.activated && nextPage.url) {
                return (await axios.get(nextPage.url)).data;
            } else {
                return (await axios.get(`/project/v1/other-projects?page=${page}&limit=${limit}`)).data;
            }
        } catch (error) {
            console.error(error);
        }
    }
)


const otherProjectSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        emptyOtherProjects(state) {
            state.otherProjects = {};
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchOtherProjects.fulfilled, (state, action) => {
            if (state.otherProjects&& action.payload && action.payload.otherProjects) {
                action.payload.otherProjects.forEach((post) => {
                    state.otherProjects[post.id] = post;
                });

                state.nextPageUrl = action.payload.next_page_url;
                state.previousPageUrl = action.payload.prev_page_url;
                state.maxPage = action.payload.maxPage
                state.currentPage = action.payload.currentPage;
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
export const {emptyOtherProjects} = otherProjectSlice.actions;




