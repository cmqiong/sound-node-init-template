import {Request} from 'express';
import axios from 'axios';
import appConfig from '../config/app.config';
// import {isNullOrUndefined} from "util";

// let instanceAxios:any = axios.create();

// instanceAxios.defaults.baseURL = appConfig.baseURL;
// axios.interceptors.response.use(function (response) {
//     console.log('------ instanceAxios ---- response----');
//     console.log(response);
//     return response;
// }, function (error) {
//     if (error.response.status === 401) {
//         throw error;
//     }
//     return Promise.reject(error);
// });

function generatorUrl(url, data) {
    if (JSON.stringify(data) == '{}') return url;
    let queryArr = [];
    for (let i in data) {
        queryArr.push(`${i}=${data[i]}`)
    }
    return `${url}?${queryArr.join('&')}`
}

function transformRequest(data) {
    let ret = ''
    for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
}

function ajax(req, options) {
    const method = options.method || 'get';
    const data = options.data || {};
    const url = method == 'get' ? generatorUrl(options.url, data) : options.url;
    const headers = Object.assign({}, req.headers, options.headers);
    const httpObj = {
        url,
        method,
        baseURL: appConfig.baseURL,
        data,
        headers,
    };

    console.log('------ httpObj ------');
    console.log(httpObj);

    return axios(httpObj).then(function (resData) {
        console.log('------ axioscb ---- response ----');
        return resData;
    }, function (resErr) {
        console.log('------ axioscb ---- resErr ----');
        console.log(resErr);
        return resErr;
    });
}

export function get(req, url, options) {
    return ajax(req, {
        url: url,
        data: options.data || {},
        headers: options.headers || {},
        withCredentials: true
    })
}

export function post(req, url, options, type) {
    type = type || 'form';
    const contentType = {
        'form': 'application/x-www-form-urlencoded',
        'data': 'application/form-data',
        'json': 'application/json;charset=UTF-8'
    };
    const headers = Object.assign({}, options.headers, {
        'content-type': contentType[type]
    });

    const data = options.data || {};

    return ajax(req, {
        url: url,
        method: 'post',
        data: type == 'form' ? transformRequest(data) : data,
        headers: headers || {},
    })
}

export function deleteAjax(req, url, options) {
    return ajax(req, {
        url: url,
        method: 'delete',
        headers: options.headers || {},
    })
}

export function patch(req, url, options) {
    return ajax(req, {
        url: url,
        method: 'patch',
        data: options.data || {},
        headers: options.headers || {},
    })
}

export function put(req, url, options) {
    return ajax(req, {
        url: url,
        method: 'put',
        data: options.data || {},
        headers: options.headers || {},
    })
}
