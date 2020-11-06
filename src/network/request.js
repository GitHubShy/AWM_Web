/**
 * Base file to encapsulat network requests
 *
 * @author Yao Shi
 * @version 1.0
 * @date 2020/09/30 11:47 pm
 */
import axios from 'axios';

export const request = function (config) {

    const instance = axios.create({
        //baseURL: 'http://47.104.167.88:8082/awm_server',//China Server
        //baseURL: 'http://localhost:8082/awm_server',//Local Computer Server
        baseURL: 'http://47.74.88.228:8082/awm_server',//Sydney Server
        timeout: 5000,
        headers:{
            "token": localStorage.getItem('token'),
        }
    })

    // instance.defaults.headers.post['Content-Type'] = 'form-data'

    //intercept request
    instance.interceptors.request.use(config => {
        console.log(config);
        return config;
    },err => {
        console.log(config);
        return err;
    })
    //intercept response
    instance.interceptors.response.use(res => {
        console.log(res.data);
        return res;
    },err => {
        console.log(err);
        return err;
    })

    return instance(config);

}


