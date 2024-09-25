import { setupCache } from "axios-cache-interceptor";
import Axios from "axios";

const instance = Axios.create();

export const axios = setupCache(instance);

axios.interceptors.request.use((config) => {
    if (!config.url?.includes('http')) {
        config.url = 'http://localhost:10004/wp-json' + config.url;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

