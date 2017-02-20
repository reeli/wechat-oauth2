import * as qs from 'qs';
import * as config from 'config';
import {get} from '../utils/requests';

export const getAccessTokenByCode = (code: string) => {
    const baseUrl = '/sns/oauth2/access_token';
    return get(baseUrl, {
        appid: config.get('APP_ID'),
        secret: config.get('APP_SECRET'),
        code,
        grant_type: config.get('AUTHORIZATION_CODE'),
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
        appid: config.get('APP_ID'),
        redirect_uri: redirectUri,
        response_type: 'code',
        scope,
        state
    };
    return `${config.get('OAUTH2_BASE_URL')}/authorize?${qs.stringify(queries)}#wechat_redirect`;
};
