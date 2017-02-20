import * as axios from 'axios';
import * as config from 'config';

const instance = () => {
    const client = axios.create({
        baseURL: global.process
            ? `${config.get('OAUTH2_HOST')}${config.get('API_BASE_URL')}`
            : config.get('API_BASE_URL'),
        timeout: 1000,
    });

    client.interceptors.request.use((conf) => {
        // console.log(conf);
        return conf;
    });

    return client;
};

const request = instance();

export const get = (url, query) => request.get(url, {params: query});
export const post = (url, data) => request.post(url, {params: data});
export const put = (url, data) => request.put(url, {params: data});
export const del = (url, data) => request.delete(url, {params: data});
