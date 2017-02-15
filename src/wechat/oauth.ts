import * as qs from 'qs';
import config from './config';
import {get} from '../utils/requests';

export const getAccessTokenByCode = (code: string) => {
    const baseUrl = '/sns/oauth2/access_token';
    return get(baseUrl, {
        appid: config.APP_ID,
        secret: config.APP_SECRET,
        code,
        grant_type: config.GRANT_TYPES.AUTHORIZATION_CODE,
    })
};

interface IAccessTokenAndOpenId {
    access_token: string;
    openid: string;
}

export const getUserInfo = ({access_token, openid}:IAccessTokenAndOpenId) => {
    const baseUrl = '/sns/userinfo';
    return get(baseUrl, {
        access_token,
        openid,
        lang: 'zh_CN',
    })
};

export const getAuthorizeUri = (scope: string = 'snsapi_userinfo', state: string, redirectUri: string): string => {
    const queries = {
        appid: config.APP_ID,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope,
        state
    };
    return `http://open.weixin.qq.com/connect/oauth2/authorize?${qs.stringify(queries)}#wechat_redirect`;
};
