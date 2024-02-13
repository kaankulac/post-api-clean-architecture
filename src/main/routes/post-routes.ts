import { adaptRoute } from '@main/adapters';
import { makeCraetePostController, makeLoadPostsController } from '@main/factories';
import { auth } from '@main/middlewares';
import { Router } from 'express';

export default (router: Router): void => {
    router.post('/post/create', [auth], adaptRoute(makeCraetePostController()));
    router.get('/posts', [auth], adaptRoute(makeLoadPostsController()));
};
