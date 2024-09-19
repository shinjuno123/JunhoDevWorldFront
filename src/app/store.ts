import {configureStore} from '@reduxjs/toolkit';
import AboutRouterReducer from "../features/about/about.routing.slice"
import postsReducer from '../features/writing/writing-posts.slice';
import selectedPostReducer from '../features/writing/writing-selected-post.slice.ts';
import noteReducter from '../features/note/note.slice.ts'
import outstandingProjectReducer from '../features/project/outstanding-project.slice.ts';
import otherProjectReducer from "../features/project/other-project.slice.ts";
import featuredPostReducer  from '../features/writing/writing-featured-posts.slice.ts';
import skillReducer from '../features/skills/skills.slice.ts';

export const store = configureStore({
    reducer: {
        counter: AboutRouterReducer,
        postFetcher: postsReducer,
        selectedPostFetcher: selectedPostReducer,
        noteManager: noteReducter,
        outstandingProjectManager: outstandingProjectReducer,
        otherProjectManager: otherProjectReducer,
        featuredPostManager: featuredPostReducer,
        skillManager: skillReducer
    },
    middleware: (getDefaultMiddleware) => { 
        return getDefaultMiddleware();
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
