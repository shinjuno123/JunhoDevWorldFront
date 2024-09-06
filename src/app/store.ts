import {configureStore} from '@reduxjs/toolkit';
import AboutRouterReducer from "../features/about/about.routing.slice"
import postsReducer from '../features/writing/writing-posts.slice';
import selectedPostReducer from '../features/writing/writing-selected-post.slice.ts';
import noteReducter from '../features/note/note.slice.ts'


export const store = configureStore({
    reducer: {
        counter: AboutRouterReducer,
        postFetcher: postsReducer,
        selectedPostFetcher: selectedPostReducer,
        noteManager: noteReducter
    },
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;