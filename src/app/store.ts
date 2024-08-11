import {configureStore} from '@reduxjs/toolkit';
import AboutRouterReducer from "../features/about/about.routing.slice"
import { postApiSlice } from '../features/writing/writing.slice';


export const store = configureStore({
    reducer: {
        counter: AboutRouterReducer,
        [postApiSlice.reducerPath]: postApiSlice.reducer
    },

    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(postApiSlice.middleware);
    }

});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;