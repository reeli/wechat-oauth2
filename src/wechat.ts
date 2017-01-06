import config from './config';
import * as qs from 'qs';

export const getAuthorizeUri = (scope: string, state: string, redirectUri: string): string => {
    const queries = {
        appid: config.appId,
        redirect_uri: encodeURI(redirectUri),
        response_type: 'code',
        scope,
        state
    };
    return `http://open.weixin.qq.com/connect/oauth2/authorize?${qs.stringify(queries)}#wechat_redirect`;
};

