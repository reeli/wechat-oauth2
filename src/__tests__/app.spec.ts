import {test} from 'ava';
import app from '../app';
import * as supertest from 'supertest';

const request = supertest.agent(app.listen());

test('koa test success', async(t: any) => {
    const result = await request.get('/user/123');
    const expect = {
        id: '123',
        name: 'rui',
        age: 18,
    };

    t.is(result.status, 200);
    t.deepEqual(result.body, expect);
});

test('koa test failed', async(t: any) => {
    const result = await request.get('/user');
    t.is(result.status, 404);
});

