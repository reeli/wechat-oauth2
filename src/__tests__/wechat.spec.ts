import {getAuthorizeUri} from '../wechat/oauth';
import {test} from 'ava';

test('getRedirectUrigetRedirectUri', (t) => {
    const scope = 'snsapi_userinfo';
    const state = 'STATE';
    const redirectUri = 'http://nba.bluewebgame.com/oauth_response.php';
    const expect = 'http://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe7e06b80112e41ea&redirect_uri=http%3A%2F%2Fnba.bluewebgame.com%2Foauth_response.php&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
    const result = getAuthorizeUri(scope, state, redirectUri);

    t.is(result, expect);
});
