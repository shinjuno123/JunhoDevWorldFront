import {configureStore} from '@reduxjs/toolkit';
import AboutRouterReducer from "../features/about/about.routing.slice"
import postsReducer from '../features/writing/writing.slice';


export const store = configureStore({
    reducer: {
        counter: AboutRouterReducer,
        postFetcher: postsReducer
    },
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;