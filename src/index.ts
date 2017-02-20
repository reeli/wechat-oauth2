import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as serve from 'koa-static';
import {
    authorize,
    authorizeCallback,
} from './wechat/authorize';
import * as qs from 'qs';

const app = new Koa();
const router = new Router();

router.get('/authorize', authorize);
router.get('/authorize/callback', authorizeCallback);


router.get('/wechat/connect/oauth2/authorize', (ctx) => {
    ctx.status = 200;
    ctx.query.code = 'mock code';
    const {query:{scope, state, code}, origin} = ctx;
    const authorizeCallbackUri = `${origin}/authorize/callback?${qs.stringify({scope, state, code})}`;
    ctx.redirect(authorizeCallbackUri);
});

router.get('/wechat/sns/oauth2/access_token', (ctx) => {
    if (!ctx.request.query.code) {
        return;
    }
    ctx.status = 200;
    ctx.body = {
        access_token: 'token',
        openid: 'openid',
    }
});

router.get('/wechat/sns/userinfo', (ctx) => {
    if (!ctx.request.query.openid || !ctx.request.query.access_token) {
        return;
    }
    ctx.status = 200;
    ctx.body = {
        nikename: 'Tony',
        age: 20,
    }
});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.use(serve('assets'));

app.listen(3000, () => {
    console.log('listen at 3000...');
});

export default app;
