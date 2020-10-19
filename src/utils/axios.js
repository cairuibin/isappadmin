"use strict";

import Vue from 'vue';
import axios from "axios";
console.log(process.env.NODE_ENV)
const _axios = axios.create({
    baseURL:'',
    baseURL:process.env.NODE_ENV==='development'?"":"https://test.iskatesports.com"
});

_axios.interceptors.request.use(

    (config) => {
        console.log(config)
        config.headers.Authorization = 'Bearer' + " " + localStorage.token
        // Do something before request is sent
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    (response) => {
        // Do something with response data
        return response;
    },
    (error) => {
        // Do something with response error
        return Promise.reject(error);
    }
);
// options
Plugin.install = (Vue) => {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios;
            },
            post() {
                return _axios
            }
        },
        $axios: {
            get() {
                return _axios;
            },
            post() {
                return _axios
            }
        },
    });
};

Vue.use(Plugin)

export default Plugin;
