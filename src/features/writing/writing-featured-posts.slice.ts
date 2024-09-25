import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {axios} from '../../api-client';

export interface FeaturedPost {
    id: number;
    title: string;
    excerpt: string;
    created: string;
    modified: string;
    background_image: string;
}

export interface FeaturedPosts {
    next_page_url: string;
    prev_page_url: string;
    modified: string;
    data: FeaturedPost[];
    maxPage: number;
    currentPage: number;
    status: {is_success:boolean, message: string};
}


interface FeaturedPostsState {
    featuredPosts: Record<number, FeaturedPost>;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    maxPage: number,
    currentPage: number
}


const initialState: FeaturedPostsState = {
    featuredPosts: {},
    loading: 'idle',
    maxPage: 1,
    currentPage: 1
} 


export const fetchFeaturedPosts = createAsyncThunk<FeaturedPosts|undefined>(
    'featuredPosts',
    async () => {
        try {
            const response = await axios.get(`/writing/v1/posts?onlyFeaturedPosts=TRUE`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
)

const featuredPostsSlice = createSlice({
    name: 'featuredPosts',
    initialState,
    reducers: {
        emptyPosts(state) {
            state.featuredPosts = {};
        }


    },
    extraReducers: (builder) => {
        builder.addCase(fetchFeaturedPosts.fulfilled, (state, action) => {
            if (state.featuredPosts && action.payload) {
                
                action.payload.data.forEach((post) => {
                    state.featuredPosts[post.id] = post;
                });

                state.maxPage = action.payload.maxPage;
                state.currentPage = action.payload.currentPage;
                state.loading = 'succeeded';
            }
        })

        .addCase(fetchFeaturedPosts.pending, (state) => {
            state.loading = 'pending';
        })

        .addCase(fetchFeaturedPosts.rejected, (state) => {
            state.loading = 'failed';
        })
    },
});


export default featuredPostsSlice.reducer;
export const {emptyPosts} = featuredPostsSlice.actions;