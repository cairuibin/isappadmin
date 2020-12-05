"use strict";

import Vue from 'vue';
import axios from "axios";

import Router from 'vue-router'
import routes from '../router/routers'
const router = new Router({
    routes,
    mode: 'hash'
  })
const _axios = axios.create({
    // baseURL:'',
    baseURL: process.env.NODE_ENV === 'development' ? "" : "https://test.iskatesports.com"
});

_axios.interceptors.request.use(

    (config) => {

        config.headers.Authorization = 'Bearer' + " " + localStorage.token

        return config;
    },
    (error) => {

        return Promise.reject(error);
    }
);
_axios.interceptors.response.use(
    (response) => {
        if (response.data.code === 402) {
        router.replace('/login')
            setTimeout(()=>{   
                window.location.reload('/login')
            },1000)
      
        }
        return response;
    },
    (error) => {

        return Promise.reject(error);
    }
);

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
