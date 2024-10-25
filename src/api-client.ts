import { setupCache } from "axios-cache-interceptor";
import Axios from "axios";

const instance = Axios.create();

export const axios = setupCache(instance);

axios.interceptors.request.use((config) => {
    console.log(config.url)
    if (!config.url?.includes('http')) {
        config.url = import.meta.env.VITE_SERVER_URL + config.url;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

