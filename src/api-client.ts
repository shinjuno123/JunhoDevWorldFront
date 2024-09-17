import axios from "axios";

axios.interceptors.request.use((config)=> {
    if (!config.url?.includes('http')) {
        config.url = 'http://localhost:10004/wp-json' + config.url;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});