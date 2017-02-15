import * as axios from 'axios';

const instance = () => {
    return axios.create({
        baseURL: 'https://api.weixin.qq.com',
        timeout: 1000,
    });
};

const request = instance();

export const get = (url, query) => request.get(url, {params: query});
export const post = (url, data) => request.post(url, {params: data});
export const put = (url, data) => request.put(url, {params: data});
export const del = (url, data) => request.delete(url, {params: data});
