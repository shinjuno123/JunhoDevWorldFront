import axios from "axios";

axios.interceptors.request.use((config)=> {
    config.url = 'http://localhost:10004/wp-json' + config.url;
    return config;
}, (error) => {
    return Promise.reject(error);
});