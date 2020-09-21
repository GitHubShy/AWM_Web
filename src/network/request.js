import axios from 'axios';

export const request = function (config) {

    const instance = axios.create({
        // baseURL: 'http://47.104.167.88:8080/',
        baseURL: 'http://localhost:8080/',
        timeout: 5000
    })

    // instance.defaults.headers.post['Content-Type'] = 'form-data'

    instance.interceptors.request.use(config => {
        console.log(config);
        return config;
    },err => {
        console.log(config);
    })

    instance.interceptors.response.use(res => {
        console.log(res.data);
        return res;
    },err => {
        console.log(err);
    })

    return instance(config);

}


