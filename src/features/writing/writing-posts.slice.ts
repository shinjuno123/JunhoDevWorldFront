import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Post {
    id: number,
    title: string,
    excerpt: string,
    categories: string[],
    created: string,
    modified: string 
}

export interface Posts {
    next_page_url: string;
    prev_page_url: string;
    modified: string;
    data: Post[];
    maxPage: number;
    allCategories: string[];
    currentPage: number;
    status: {is_success:boolean, message: string};
}


interface PostsState {
    posts: Record<number, Post>;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    categories: string[];
    maxPage: number,
    currentPage: number
}


const initialState: PostsState = {
    posts: {},
    loading: 'idle',
    categories: [],
    maxPage: 1,
    currentPage: 1
} 


export const fetchPosts = createAsyncThunk<Posts|undefined, {page: number, limit: number, categoryName:string}>(
    'etchPosts',
    async ({page, limit, categoryName}) => {
        try {
            const response = await axios.get(`/writing/v1/posts?page=${page}&limit=${limit}&category=${categoryName}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
)

const postsSlice = createSlice({
    name: 'fetchPosts',
    initialState,
    reducers: {
        emptyPosts(state) {
            state.posts = {};
        }


    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            if (state.posts && action.payload) {
                action.payload.data.forEach((post) => {
                    state.posts[post.id] = post;
                });

                state.categories = action.payload.allCategories;
                state.maxPage = action.payload.maxPage;
                state.currentPage = action.payload.currentPage;
                state.loading = 'succeeded';
            }
        })

        .addCase(fetchPosts.pending, (state) => {
            state.loading = 'pending';
        })

        .addCase(fetchPosts.rejected, (state) => {
            state.loading = 'failed';
        })
    },
});


export default postsSlice.reducer;
export const {emptyPosts} = postsSlice.actions;