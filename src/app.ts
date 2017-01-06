import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as serve from 'koa-static';
import {getAuthorizeUri} from './wechat';

const app = new Koa();
const router = new Router();

router.get('/user/:id', async(ctx) => {
    ctx.body = {
        ...ctx.params,
        name: 'rui',
        age: 18,
    };
    ctx.status = 200;
});

router.get('/authorize', (ctx) => {
    const {scope, state, origin} = ctx;
    const authorizeUri = getAuthorizeUri(scope, state, origin);
    ctx.redirect(authorizeUri);
});

app.use(serve('.'));
app
    .use(router.routes())
    .use(router.allowedMethods());


app.listen(3000, () => {
    console.log('listen at 3000...');
});

export default app;
