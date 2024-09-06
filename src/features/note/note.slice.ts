import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface NoteResponse {
    notes: Note[];
    currentPage: number;
    maxPage: number;
    status: {is_success: boolean, message: string};    
}


interface Note {
    id: number;
    title: string;
    content: string;
    created: string;
    author: {
        nickname: string,
        name: string,
        profileImage: string
    }
}

interface NoteState {
    notes: Record<number, Note>;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    maxPage: number,
    currentPage: number
}


export const fetchNotes = createAsyncThunk<NoteResponse| undefined, {page: number, limit: number}>(
    'note/FetchNotes',
    async ({page, limit}) => {
        try {
            const response = await axios.get(`http://junho-dev-world.local/wp-json/note/v1/notes?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
)

const initialState: NoteState = {
    notes: {},
    loading: 'idle',
    maxPage: 1,
    currentPage: 1
}



const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        emptyNotes(state) {
            state.notes = {};
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchNotes.fulfilled, (state, action) => {
            if (state.notes && action.payload) {
                action.payload.notes.forEach((post) => {
                    state.notes[post.id] = post;
                });

                state.maxPage = action.payload.maxPage;
                state.currentPage = action.payload.currentPage;
                state.loading = 'succeeded';
            }
        })

        .addCase(fetchNotes.pending, (state) => {
            state.loading = 'pending';
        })

        .addCase(fetchNotes.rejected, (state) => {
            state.loading = 'failed';
        })
    },
});


export default noteSlice.reducer;
export const {emptyNotes} = noteSlice.actions;