import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {axios} from '../../api-client';

export interface SelectedPost {
    post: {
        ID: number;
        post_title: string;
        post_content: string;
        post_date: string;
        post_modified: string;
    };
    status: {is_success: boolean, message: string, category: string};
}

interface SelectedPostState {
    postData: SelectedPost;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}


const initialState: SelectedPostState = {
    postData: {
        post: {
            ID: 0,
            post_title: '',
            post_content: '',
            post_date: '',
            post_modified: ''
        },
        status: {
            is_success: false,
            message: '',
            category: ''
        }
    },
    loading: 'idle',
} 


export const fetchSelectedPost = createAsyncThunk<SelectedPost|undefined, {id: number}>(
    'fetchSelectedPost',
    async (data) => {
        try {
            const response = await axios.get(`/writing/v1/posts/${data.id}/`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
)


const selectedPostSlice = createSlice({
    name: 'fetchSelectedPost',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchSelectedPost.fulfilled, (state, action) => {
            if (state.postData && action.payload) {
                state.postData = action.payload;
                state.loading = 'succeeded';
            }
        })

        .addCase(fetchSelectedPost.pending, (state) => {
            state.loading = 'pending';
        })

        .addCase(fetchSelectedPost.rejected, (state) => {
            state.loading = 'failed';
        })
    },
});


export default selectedPostSlice.reducer;