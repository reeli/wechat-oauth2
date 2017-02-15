import * as qs from 'qs';
import {
    getAccessTokenByCode,
    getUserInfo,
    getAuthorizeUri
} from './oauth';

export const authorize = (ctx) => {
    const {query:{scope, state}, origin} = ctx;
    const authorizeUri = getAuthorizeUri(scope, state, `${origin}/authorize/callback`);
    ctx.redirect(authorizeUri);
};

export const authorizeCallback = async(ctx) => {
    const {query:{state}} = ctx;
    const result = await getAccessTokenByCode(ctx.query.code);
    const access_token = result.data['access_token'];
    const openid = result.data['openid'];
    const result2 = await getUserInfo({access_token, openid});
    const userInfo = result2.data;
    ctx.redirect(`${state}?${qs.stringify(userInfo)}`);
};

