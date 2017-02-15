import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as serve from 'koa-static';
import {
    authorize,
    authorizeCallback
} from './wechat/authorize';

const app = new Koa();
const router = new Router();

router.get('/authorize', authorize);
router.get('/authorize/callback', authorizeCallback);

app.use(serve('.'));

app
    .use(router.routes())
    .use(router.allowedMethods());


app.listen(3000, () => {
    console.log('listen at 3000...');
});

export default app;
